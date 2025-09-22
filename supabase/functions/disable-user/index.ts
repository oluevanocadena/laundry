/// <reference types="deno.ns" />
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SupabaseTables } from '../shared/constants/supabase-tables.constants.js';
import { TokenDomain } from '../shared/domains/token.domain.js';
import { HttpHandleDomain } from '../shared/domains/http.handle.domain.js';

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

// -------------------------------------------------
// Lógica habilitar / deshabilitar usuario
// -------------------------------------------------
async function setUserStatus(email: string, enable: boolean) {
  // 1. Buscar el usuario en Accounts
  const { data: account, error: accountError } = await supabase
    .from(SupabaseTables.Accounts)
    .select('*')
    .eq('Email', email)
    .maybeSingle();

  if (accountError || !account) throw { message: 'Usuario no encontrado en Accounts', status: 404 };

  // 2. Actualizar el campo Disabled en Accounts
  const { error: updateError } = await supabase
    .from(SupabaseTables.Accounts)
    .update({ Disabled: !enable })
    .eq('id', account.id);

  if (updateError) throw { message: 'Error al actualizar Accounts', status: 400 };

  // 3. Buscar el usuario en auth.users
  const { data: user, error: userError } = await supabase.auth.admin.getUserByEmail(email);
  if (userError || !user) throw { message: 'Usuario no encontrado en Auth', status: 404 };

  // 4. Habilitar / deshabilitar en auth
  const { error: authError } = await supabase.auth.admin.updateUserById(user.user.id, {
    banned_until: enable ? null : new Date().toISOString(), // si disable => se banea
  });

  if (enable === false) {
    await supabase.auth.admin.signOut(user.user.id);
  }

  if (authError) throw { message: 'Error al actualizar estado en Auth', status: 400 };

  return { email, enabled: enable };
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
    const { action, email } = body;

    if (!action) throw { message: 'Action requerida', status: 400 };
    if (!email) throw { message: 'Email requerido', status: 400 };

    let enable = false;
    if (action === 'enable') enable = true;
    else if (action === 'disable') enable = false;
    else throw { message: 'Action no válida. Usa "enable" o "disable"', status: 400 };

    const data = await setUserStatus(email, enable);
    return HttpHandleDomain.successResponse(data, `Usuario ${enable ? 'habilitado' : 'deshabilitado'} correctamente`);
  } catch (err: any) {
    console.error('⛔ error', err);
    return HttpHandleDomain.errorResponse(err.message || 'Error desconocido', err.status || 500);
  }
});
