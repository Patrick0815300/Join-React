import { supabase } from './client.ts';

export async function getInstruments() {
    const { data, error } = await supabase.from('instruments').select();
    if (error) throw error;
    return data;
}
