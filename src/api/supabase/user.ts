import { supabase } from './client.ts'

export async function getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user
}

export async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data;
}

export async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
}

export async function login(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
    if (error) throw error;
}

export async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error;
}

export async function inviteUser(email: string) {
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);
    if (error) throw error
    return data
}

export async function passwordRecovery(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error
    return data
}