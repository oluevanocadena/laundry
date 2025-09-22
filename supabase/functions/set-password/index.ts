/// <reference types="deno.ns" />
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { TokenDomain } from '../shared/domains/token.domain';

// Cliente con service_role (permite modificar usuarios)
const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

// ---------------------
// Helpers
// ---------------------

function corsHeaders() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // ⚠️ solo desarrollo
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
  };
}

async function handlePreflight(req: Request): Promise<Response | null> {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(),
    });
  }
  return null;
}

function errorResponse(message: string, statusCode = 400): Response {
  return new Response(
    JSON.stringify({
      success: false,
      error: true,
      message,
      statusCode,
    }),
    { status: statusCode, headers: corsHeaders() },
  );
}

function successResponse(data: any, message = 'OK', statusCode = 200): Response {
  return new Response(
    JSON.stringify({
      success: true,
      error: false,
      message,
      statusCode,
      data,
    }),
    { status: statusCode, headers: corsHeaders() },
  );
}

// ---------------------
// Lógica principal
// ---------------------

// 1️⃣ Usuario establece contraseña con token del correo de invitación
async function setPassword(password: string, user: any) {
  if (!password) throw { message: 'Contraseña requerida', status: 400 };

  console.log('🔑 Actualizando contraseña para el usuario:', user.user.id);
  const { data, error } = await supabase.auth.admin.updateUserById(user.user.id, {
    password,
  });

  if (error) throw { message: error.message, status: 400 };
  return data;
}

// 2️⃣ Administrador cambia directamente la contraseña (sin token)
async function adminSetPassword(userId: string, password: string) {
  if (!userId) throw { message: 'userId requerido', status: 400 };
  if (!password) throw { message: 'Contraseña requerida', status: 400 };

  console.log('🔑 [ADMIN] Actualizando contraseña para el usuario:', userId);
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    password,
  });

  if (error) throw { message: error.message, status: 400 };
  return data;
}

// ---------------------
// Handler
// ---------------------

Deno.serve(async (req) => {
  try {
    const preflight = await handlePreflight(req);
    if (preflight) return preflight;

    const user = await TokenDomain.verifyJWT(req);

    const { password, userId } = await req.json();

    let data;
    if (userId) {
      // ✅ flujo de administrador
      data = await adminSetPassword(userId, password);
    } else if (user.id) {
      // ✅ flujo de invitación
      data = await setPassword(password, user);
    } else {
      console.log('⛔ user no encontrado', user, userId);
      throw { message: 'Bad Request', status: 400 };
    }
    return successResponse(data, 'Contraseña actualizada correctamente');
  } catch (err: any) {
    console.log('⛔ error', err);
    return errorResponse('Error desconocido', err.status || 500);
  }
});
