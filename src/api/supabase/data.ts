import { supabase } from './client.ts';

export async function getData(database: string) {
    const { data, error } = await supabase.from(database).select();
    if (error) throw error;
    return data;
}

export async function addContact(userId: string, lastname: string, firstname: string, mail: string) {
    console.log('userId addContact: ', userId);

    const { data, error } = await supabase
        .from('contacts')
        .insert([
            { user_id: userId, lastname: lastname, firstname: firstname, mail: mail },
        ])
        .select()
    if (error) throw error;
    return data
}