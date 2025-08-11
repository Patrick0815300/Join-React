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

export async function updateContact(column: string, content: string, mail: string) {
    const { error } = await supabase
        .from('contacts')
        .update({ column, content })
        .eq('mail', mail)
}