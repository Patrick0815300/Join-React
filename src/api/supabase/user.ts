import { supabase } from './client.ts'

export async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        throw error;
    }
    console.log(data);
    return data;
}

export async function getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    console.log(user);
    return user
}

export async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        throw error;
    }
    console.log(data);
    return data;
}