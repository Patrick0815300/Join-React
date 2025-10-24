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

export async function insertMultipleRows(table: string, rowsData: any[]) {
    const { data, error } = await supabase
        .from(table)
        .insert(rowsData)
        .select()
    if (error) throw error;
    return data;
}

export async function addContact(userId: string, lastname: string, firstname: string, mail: string, color: string) {
    const { data, error } = await supabase
        .from('contacts')
        .insert([
            { user_id: userId, lastname: lastname, firstname: firstname, mail: mail, color: color },
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

export async function getSingleColumn(tableName: string, column: string, id: string, select?: string) {
    const { data, error } = await supabase
        .from(tableName)
        .select(select || '*')
        .eq(column, id)
        .single()
    if (error) throw error;
    return data;
}

export async function getSingleColumnWithTwoFilters(
    tableName: string,
    column1: string,
    id1: string,
    column2: string,
    id2: string,
    select?: string
) {
    const { data, error } = await supabase
        .from(tableName)
        .select(select || '*')
        .eq(column1, id1)
        .eq(column2, id2)
        .single();
    if (error) throw error;
    return data;
}

export const getTaskProgress = async (taskId: string) => {
    const { data: subtasks } = await supabase
        .from('subtasks')
        .select('completed')
        .eq('task_id', taskId);

    const total = subtasks?.length || 0;
    const completed = subtasks?.filter(s => s.completed).length || 0;

    return { total, completed, percentage: (completed / total) * 100 };
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
