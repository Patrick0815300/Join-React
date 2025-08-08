import { supabase } from './client.ts'

const { data, error } = await supabase.auth.signUp({
    email: 'example@email.com',
    password: 'example-password',
})