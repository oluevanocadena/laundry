/// <reference types="deno.ns" />
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SupabaseTables } from '../shared/constants/supabase-tables.constants.ts';
import { TokenDomain } from '../shared/domains/token.domain.ts';
import { HttpHandleDomain } from '../shared/domains/http.handle.domain.ts';
import { Strings } from '../shared/constants/strings.constants.ts';

// Cliente con service_role
const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
const urlInviteConfirmation = `${Deno.env.get('FRONTEND_URL')}/invitation-confirmation?type=invite`;

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
  const { data: userInvite, error } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: urlInviteConfirmation,
  });
  if (error) throw { message: error.message, status: 400 };

  await supabase
    .from(SupabaseTables.Accounts)
    .update({ invitation_sent: true, invited_at: new Date().toISOString(), UserId: userInvite.user.id })
    .eq('id', account.id);

  console.log('✅ Invitación enviada y marcada en la tabla Accounts:', email);
  return userInvite;
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
    const preflight = await HttpHandleDomain.handlePreflight(req);
    if (preflight) return preflight;

    const user = await TokenDomain.verifyJWT(req);
    console.log('🔐 [InviteUser] Usuario de session de petición:', user);

    const body = await req.json();
    const { action, email } = body;

    if (!action) throw { message: 'Parametro Action requerido', status: 400 };
    if (!email) throw { message: 'Parametro Email requerido', status: 400 };

    let data;
    switch (action) {
      case 'invite':
        data = await invite(email);
        return HttpHandleDomain.successResponse({ Email: email }, 'Invitación enviada correctamente');
      case 'resend':
        data = await resendInvitation(email);
        return HttpHandleDomain.successResponse({ Email: email }, 'Invitación reenviada correctamente');
      default:
        throw { message: Strings.errorInvalid, status: 400 };
    }
  } catch (err: any) {
    console.log('⛔ [InviteUser] error', err);
    const status = err.status || 500;
    return HttpHandleDomain.errorResponse(Strings.errorInternalServer, status);
  }
});
