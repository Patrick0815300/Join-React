import { supabase } from './client.ts';

export async function getData(database: string) {
    const { data, error } = await supabase.from(database).select();
    if (error) throw error;
    return data;
}

export async function addContact(lastname: string, firstname: string, mail: string) {
    const { data, error } = await supabase
        .from('contacts')
        .insert([
            { lastname: lastname, firstname: firstname, mail: mail },
        ])
        .select()
    if (error) throw error;
    return data
}