import { getSingleColumn } from "../api/supabase/data";
import { getUser } from "../api/supabase/user";

export async function getUserName() {
    const user = await getUser();
    const data = await getSingleColumn('contacts', 'user_id', user!.id);
    return {
        firstname: data.firstname,
        lastname: data.lastname
    };
}

export function shortFormatName(firstname: string, lastname: string): string {
    if (!firstname && !lastname) return '';
    const firstInitial = firstname ? firstname.charAt(0).toUpperCase() : '';
    const lastInitial = lastname ? lastname.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;
};