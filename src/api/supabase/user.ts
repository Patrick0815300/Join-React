import { supabase } from './client.ts'

export async function addUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email: 'example@email.com',
        password: 'example-password',
    })
}