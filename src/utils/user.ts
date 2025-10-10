import { getSingleColumn, getSingleColumnWithTwoFilters } from "../api/supabase/data";
import { getUser } from "../api/supabase/user";

const colorCache: Record<string, string> = {};

export async function getUserName() {
    const user = await getUser();
    const data = await getSingleColumn('contacts', 'user_id', user!.id) as any;
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

export const getInitials = (fullName: string) => {
    return fullName
        .split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .join('');
}

export const getContactColor = async (fullname: string) => {
    const name = splitName(fullname)
    const color = await getSingleColumnWithTwoFilters('contacts', 'lastname', name.lastname, 'firstname', name.firstname, 'color');
    return color;
}

export const getContactColorSync = (fullname: string): string => {
    return colorCache[fullname] || '#cccccc';
}

export const setContactColors = (contacts: Array<{ firstname: string; lastname: string; color: string }>) => {
    contacts.forEach(contact => {
        const fullname = `${contact.firstname} ${contact.lastname}`;
        colorCache[fullname] = contact.color || '#cccccc';
    });
}

export const splitName = (fullName: string) => {
    if (!fullName || typeof fullName !== 'string') {
        return { firstname: '', lastname: '' };
    }

    const nameParts = fullName.trim().split(' ');
    const firstname = nameParts[0] || '';
    const lastname = nameParts.slice(1).join(' ') || '';

    return { firstname, lastname };
};
