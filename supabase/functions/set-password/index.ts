/// <reference types="deno.ns" />
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { TokenDomain } from '../shared/domains/token.domain.ts';
import { Strings } from '../shared/constants/strings.constants.ts';
import { HttpHandleDomain } from '../shared/domains/http.handle.domain.ts';
import { SupabaseTables } from '../shared/constants/supabase-tables.constants.ts';

// Cliente con service_role (permite modificar usuarios)
const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

// ---------------------
// Lógica principal
// ---------------------

// 1️⃣ Usuario establece contraseña con token del correo de invitación
async function setPassword(password: string, user: any) {
  if (!password) throw { message: Strings.errorRequired, status: 400 };

  console.log('🔑 Actualizando contraseña para el usuario:', user.id);
  const { data, error } = await supabase.auth.admin.updateUserById(user.id, {
    password,
  });

  if (error) {
    console.log('⛔ [set-password] error', error);
    throw { message: Strings.errorInternalServer, status: 400 };
  }

  //Actualiza tabla Accounts
  const { data: account, error: accountError } = await supabase
    .from(SupabaseTables.Accounts)
    .update({ UserId: user.id, VerifiedEmail: true })
    .eq('Email', user.email);

  if (accountError) {
    console.log('⛔ [set-password] accountError', accountError);
    throw { message: Strings.errorInternalServer, status: 400 };
  }
  return data;
}

// 2️⃣ Administrador cambia directamente la contraseña (sin token)
async function adminSetPassword(userId: string, password: string) {
  if (!userId) throw { message: Strings.errorRequired, status: 400 };
  if (!password) throw { message: Strings.errorRequired, status: 400 };

  console.log('🔑 [set-password] AdminSetPassword Actualizando contraseña para el usuario:', userId);
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    password,
  });

  if (error) {
    console.log('⛔ [set-password] AdminSetPassword error', error);
    throw { message: Strings.errorInternalServer, status: 500 };
  }

  //Actualiza tabla Accounts
  const { data: account, error: accountError } = await supabase
    .from(SupabaseTables.Accounts)
    .update({ UserId: userId, VerifiedEmail: true })
    .eq('Email', data.user?.email);

  if (accountError) {
    console.log('⛔ [set-password] AdminSetPassword accountError', accountError);
    throw { message: Strings.errorInternalServer, status: 500 };
  }
  return data;
}

// ---------------------
// Handler
// ---------------------

Deno.serve(async (req) => {
  try {
    const preflight = await HttpHandleDomain.handlePreflight(req);
    if (preflight) return preflight;

    console.log('🚩 [set-password] 1. Inicio de seteo de contraseña');

    const jwtUser = await TokenDomain.verifyJWT(req);
    console.log('🔐 [set-password] 2. Usuario de session de petición:', jwtUser);

    const body = await req.json();
    const { password, userId, email } = body;
    console.log('🚩 [set-password] 3. Peticion recibida payload', body);

    let data;
    if (userId) {
      // ✅ flujo de administrador
      console.log('🚩 [set-password] 4. Flujo de administrador', userId, password);
      data = await adminSetPassword(userId, password);
    } else if (jwtUser.id) {
      // ✅ flujo de invitación
      console.log('🚩 [set-password] 4.1 Flujo de invitación', jwtUser, password);
      data = await setPassword(password, jwtUser);
    } else {
      console.log('⛔ [set-password] Ningun flujo valido', jwtUser, userId);
      throw { message: Strings.errorBadRequest, status: 400 };
    }
    return HttpHandleDomain.successResponse(data, 'Contraseña actualizada correctamente');
  } catch (err: any) {
    console.log('⛔ [set-password] error', err);
    return HttpHandleDomain.errorResponse(Strings.errorInternalServer, err?.status || 500);
  }
});
