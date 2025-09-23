/// <reference types="deno.ns" />
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SupabaseTables } from '../shared/constants/supabase-tables.constants.ts';
import { TokenDomain } from '../shared/domains/token.domain.ts';
import { HttpHandleDomain } from '../shared/domains/http.handle.domain.ts';
import { Strings } from '../shared/constants/strings.constants.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

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

  if (accountError || !account) throw { message: Strings.errorNotFound, status: 404 };

  // 2. Actualizar el campo Disabled en Accounts
  const { error: updateError } = await supabase
    .from(SupabaseTables.Accounts)
    .update({ Disabled: !enable })
    .eq('id', account.id);

  if (updateError) throw { message: Strings.errorInternalServer, status: 400 };

  // 3. Obtener usuario de Auth por lista, si no tienes user_id guardado
  const { data: listResult, error: listError } = await supabase.auth.admin.listUsers({
    email,
  });
  if (listError || !listResult?.users?.length) {
    throw { message: Strings.errorNotFound, status: 404 };
  }

  const user = listResult.users[0];

  // 4. Obtener usuario con getUserById (según docs) – opcional si ya tienes user
  const { data: authUser, error: getUserError } = await supabase.auth.admin.getUserById(user.id);
  if (getUserError || !authUser) {
    throw { message: Strings.errorNotFound, status: 404 };
  }

  // 5. Actualizar el usuario en Auth con ban / sign out
  const { error: authError } = await supabase.auth.admin.updateUserById(user.id, {
    ban_duration: enable ? null : 'indefinite',
  });
  if (authError) throw { message: Strings.errorInternalServer, status: 400 };

  if (!enable) {
    const { error: signOutError } = await supabase.auth.admin.signOut(user.id);
    if (signOutError) throw { message: Strings.errorInternalServer, status: 400 };
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
    return HttpHandleDomain.errorResponse(err.message || 'Error desconocido', err.status || 500);
  }
});
