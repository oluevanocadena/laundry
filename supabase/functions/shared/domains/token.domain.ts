import { User } from 'https://esm.sh/@supabase/supabase-js@2';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export class TokenDomain {
  static async verifyJWT(req: Request): Promise<User> {
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) throw { message: 'Unauthorized: falta token', status: 401 };

    const { data, error } = await supabase.auth.getUser(token);
    console.log('💡 user verifyJWT found', data);
    if (error || !data) throw { message: 'Unauthorized: token inválido', status: 401 };

    console.log('🔑 JWT verificado para user:', data);
    return data.user;
  }
}
