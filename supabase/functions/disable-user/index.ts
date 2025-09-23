/// <reference types="deno.ns" />
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SupabaseTables } from '../shared/constants/supabase-tables.constants.ts';
import { TokenDomain } from '../shared/domains/token.domain.ts';
import { HttpHandleDomain } from '../shared/domains/http.handle.domain.ts';
import { Strings } from '../shared/constants/strings.constants.ts';

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

// -------------------------------------------------
// Lógica habilitar / deshabilitar usuario
// -------------------------------------------------
async function setUserStatus(email: string, enable: boolean) {
  console.log('🚩 [disable-user] Inicio de habilitar / deshabilitar usuario', email, enable);
  // 1. Buscar el usuario en Accounts
  const { data: account, error: accountError } = await supabase
    .from(SupabaseTables.Accounts)
    .select('*')
    .eq('Email', email)
    .maybeSingle();

  if (accountError || !account) {
    console.log('⛔ [disable-user] Usuario no encontrado en Accounts', email);
    throw { message: Strings.errorNotFound, status: 404 };
  }

  // 2. Actualizar el campo Disabled en Accounts
  const { error: updateError } = await supabase
    .from(SupabaseTables.Accounts)
    .update({ Disabled: !enable })
    .eq('id', account.id);

  if (updateError) {
    console.log('⛔ [disable-user] Error al actualizar el campo Disabled en Accounts', updateError);
    throw { message: Strings.errorInternalServer, status: 400 };
  }

  // 3. Obtener usuario con getUserById (según docs) – opcional si ya tienes user
  const { data: authUser, error: getUserError } = await supabase.auth.admin.getUserById(account.UserId);
  if (getUserError || !authUser) {
    console.log('⛔ [disable-user] Usuario no encontrado en Auth', email);
    throw { message: Strings.errorNotFound, status: 404 };
  }

  // 5. Actualizar el usuario en Auth con ban / sign out
  const banDuration = enable ? 'none' : '876000h'; // "100y" ~ ban indefinido
  console.log('🚩 [disable-user] Ban duration', banDuration);
  const { error: authError } = await supabase.auth.admin.updateUserById(account.UserId, {
    ban_duration: banDuration,
  });
  if (authError) {
    console.log('⛔ [disable-user] Error al actualizar el usuario en Auth', authError);
    throw { message: Strings.errorInternalServer, status: 400 };
  }

  if (!enable) {
    const { error: signOutError } = await supabase.auth.admin.signOut(account.UserId);
    if (signOutError) {
      console.log('ℹ️ [disable-user] Warning al desbloquear el usuario en Auth on backend side', signOutError);
    }
  }

  return { email, enabled: enable };
}

// -------------------------------------------------
// Serve
// -------------------------------------------------
Deno.serve(async (req) => {
  try {
    const preflight = await HttpHandleDomain.handlePreflight(req);
    if (preflight) return preflight;

    const user = await TokenDomain.verifyJWT(req);
    console.log('🔐 [disable-user] Usuario autenticado:', user);

    const body = await req.json();
    const { action, email } = body;
    console.log('🚩 [disable-user] Peticion recibida payload', body);

    if (!action) throw { message: Strings.errorRequired, status: 400 };
    if (!email) throw { message: Strings.errorRequired, status: 400 };

    let enable = false;
    if (action === 'enable') enable = true;
    else if (action === 'disable') enable = false;
    else throw { message: Strings.errorInvalid, status: 400 };

    const data = await setUserStatus(email, enable);
    return HttpHandleDomain.successResponse(data, `Usuario ${enable ? 'habilitado' : 'deshabilitado'} correctamente`);
  } catch (err: any) {
    console.error('⛔ [disable-user] error', err);
    return HttpHandleDomain.errorResponse(Strings.errorInternalServer, err.status || 500);
  }
});
