/// <reference types="deno.ns" />
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SupabaseTables } from '../shared/constants/supabase-tables.constants.js';
import { TokenDomain } from '../shared/domains/token.domain.js';
import { HttpHandleDomain } from '../shared/domains/http.handle.domain.js';

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

// -------------------------------------------------
// Lógica borrar usuario
// -------------------------------------------------
async function deleteUser(email: string) {
  // 1. Buscar usuario en Accounts
  const { data: account, error: accountError } = await supabase
    .from(SupabaseTables.Accounts)
    .select('*')
    .eq('Email', email)
    .maybeSingle();

  if (accountError || !account) {
    throw { message: 'Usuario no encontrado en Accounts', status: 404 };
  }

  // 2. Borrar roles en AccountRoles
  const { error: rolesError } = await supabase.from(SupabaseTables.AccountRoles).delete().eq('AccountId', account.id);

  if (rolesError) {
    throw { message: 'Error al borrar roles', status: 400 };
  }

  // 3. Borrar el registro en Accounts
  const { error: accountDeleteError } = await supabase.from(SupabaseTables.Accounts).delete().eq('id', account.id);

  if (accountDeleteError) {
    throw { message: 'Error al borrar de Accounts', status: 400 };
  }

  // 4. Borrar el usuario en Auth
  const { data: user, error: userError } = await supabase.auth.admin.getUserByEmail(email);
  if (userError || !user) {
    throw { message: 'Usuario no encontrado en Auth', status: 404 };
  }

  const { error: deleteAuthError } = await supabase.auth.admin.deleteUser(user.user.id);
  if (deleteAuthError) {
    throw { message: 'Error al borrar en Auth', status: 400 };
  }

  return { email, deleted: true };
}

// -------------------------------------------------
// Serve
// -------------------------------------------------
Deno.serve(async (req) => {
  try {
    const preflight = await HttpHandleDomain.handlePreflight(req);
    if (preflight) return preflight;

    const user = await TokenDomain.verifyJWT(req); // opcional: validar permisos
    console.log('🔐 Usuario autenticado:', user?.id);

    const body = await req.json();
    const { email } = body;

    if (!email) throw { message: 'Email requerido', status: 400 };

    const data = await deleteUser(email);
    return HttpHandleDomain.successResponse(data, 'Usuario eliminado correctamente');
  } catch (err: any) {
    console.error('⛔ error', err);
    return HttpHandleDomain.errorResponse(err.message || 'Error desconocido', err.status || 500);
  }
});
