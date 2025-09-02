import { supabase } from './client.ts';

export async function getData(database: string) {
    const { data, error } = await supabase.from(database).select();
    if (error) throw error;
    return data;
}

export async function getDataByColumns<T>(table: string, columns: string | string[]): Promise<T[]> {
    const selectColumns = Array.isArray(columns) ? columns.join(',') : columns;

    const { data, error } = await supabase
        .from(table)
        .select(selectColumns);

    if (error) throw error;
    return data as T[];
}

export async function insertSingleRow(table: string, rowData: {}) {
    const { data, error } = await supabase
        .from(table)
        .insert([rowData])
        .select()
    if (error) throw error;
    return data
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

export async function updateContact(column: string, content: string, mail: string) {
    const { error } = await supabase
        .from('contacts')
        .update({ column, content })
        .eq('mail', mail)
}

export async function getSingleColumn(tableName: string, column: string, id: string) {
    const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq(column, id)
        .single()
    if (error) throw error;
    return data;
}

export async function subscribeChannel(table: string) {
    const channels = supabase.channel('custom-all-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: table },
            (payload) => {
                console.log('Change received!', payload)
            }
        )
        .subscribe()
}
