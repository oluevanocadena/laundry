/// <reference types="deno.ns" />
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SupabaseTables } from '../shared/constants/supabase-tables.constants.js';
import { TokenDomain } from '../shared/domains/token.domain.js';

// Cliente con service_role
const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
const urlInviteConfirmation = `${Deno.env.get('FRONTEND_URL')}/invitation-confirmation?type=invite`;

// ---------------------
// Helpers CORS / Respuestas
// ---------------------
function corsHeaders() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // ⚠️ Desarrollo local
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
  };
}

async function handlePreflight(req: Request): Promise<Response | null> {
  if (req.method === 'OPTIONS') {
    console.log('💡 Preflight CORS detectado');
    return new Response(null, { status: 204, headers: corsHeaders() });
  }
  return null;
}

function errorResponse(message: string, statusCode = 400): Response {
  console.log('❌ ErrorResponse:', message);
  return new Response(JSON.stringify({ success: false, error: true, message, statusCode }), {
    status: statusCode,
    headers: corsHeaders(),
  });
}

function successResponse(data: any, message = 'OK', statusCode = 200): Response {
  console.log('✅ SuccessResponse:', message);
  return new Response(JSON.stringify({ success: true, error: false, message, statusCode, data }), {
    status: statusCode,
    headers: corsHeaders(),
  });
}

// ---------------------
// Validación JWT y autorización
// ---------------------

async function verifyOwner(userId: string) {
  const { data: account, error } = await supabase.from('Accounts').select('*').eq('user_id', userId).eq('owner', true).single();

  if (error || !account) throw { message: 'Forbidden: usuario no autorizado', status: 403 };

  console.log('👑 Usuario autorizado como owner:', userId);
  return account;
}

// ---------------------
// Lógica de invitación
// ---------------------
async function invite(email: string) {
  const { data: account } = await supabase.from(SupabaseTables.Accounts).select('*').eq('Email', email).maybeSingle();

  if (account?.invitation_sent) {
    console.log('💡 Usuario ya invitado previamente:', email);
    return { alreadySent: true, invited_at: account.invited_at };
  }

  console.log('🚩 Enviando invitación a:', email);
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: urlInviteConfirmation,
  });
  if (error) throw { message: error.message, status: 400 };

  await supabase
    .from(SupabaseTables.Accounts)
    .update({ invitation_sent: true, invited_at: new Date().toISOString() })
    .eq('id', account.id);

  console.log('✅ Invitación enviada y marcada en la tabla Accounts:', email);
  return data;
}

async function resendInvitation(email: string) {
  console.log('🔄 Reenviando invitación a:', email);
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: urlInviteConfirmation,
  });
  if (error) throw { message: error.message, status: 400 };

  const { data: account } = await supabase.from(SupabaseTables.Accounts).select('*').eq('Email', email).maybeSingle();
  console.log('👉🏽 account', account);
  if (!account) throw { message: 'Usuario no encontrado', status: 400 };

  await supabase
    .from(SupabaseTables.Accounts)
    .update({ invitation_sent: true, invited_at: new Date().toISOString() })
    .eq('id', account.id);

  console.log('✅ Invitación reenviada y tabla actualizada:', email);
  return data;
}

// ---------------------
// Serve
// ---------------------
Deno.serve(async (req) => {
  try {
    const preflight = await handlePreflight(req);
    if (preflight) return preflight;

    const user = await TokenDomain.verifyJWT(req);
    // await verifyOwner(user.id);

    const body = await req.json();
    const { action, email } = body;

    if (!action) throw { message: 'Action requerida', status: 400 };
    if (!email) throw { message: 'Email requerido', status: 400 };

    let data;
    switch (action) {
      case 'invite':
        data = await invite(email);
        return successResponse(data, 'Invitación enviada correctamente');
      case 'resend':
        data = await resendInvitation(email);
        return successResponse(data, 'Invitación reenviada correctamente');
      default:
        throw { message: 'Action no válida', status: 400 };
    }
  } catch (err: any) {
    console.log('⛔ error', err);
    const status = err.status || 500;
    const message = 'Error desconocido';
    return errorResponse(message, status);
  }
});
