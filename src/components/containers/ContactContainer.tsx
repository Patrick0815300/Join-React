import { useEffect, useState } from "react"
import { getData, getDataByColumns, subscribeToTable } from "../../api/supabase/data.ts"
import { Contact } from "../presentation/Contact.tsx"
import { ContactColor, SingleContact } from "../../types/Contact.ts"
import { setContactColors } from "../../utils/user.ts"


export function ContactContainer() {
    const [contacts, setContacts] = useState<SingleContact[]>([])
    const [sortedContacts, setSortedContacts] = useState<SingleContact[]>([])

    const getContactData = async () => {
        const data = await getData('contacts')
        if (data) {
            setContacts(data);
            sortContacts(data);
        }
    }

    const getContactsColors = async () => {
        const data = await getDataByColumns<ContactColor>('contacts', ['lastname', 'firstname', 'color']);
        if (!data) return;
        setContactColors(data);
    }

    const sortContacts = (data: SingleContact[]) => {
        const sorted = data.sort((a, b) => a.firstname.localeCompare(b.firstname))
        setSortedContacts(sorted);
    }

    useEffect(() => {
        getContactData();
        getContactsColors();

        const unsubscribeContacts = subscribeToTable(
            'contacts',
            (payload) => {
                if (payload.eventType === 'INSERT' ||
                    payload.eventType === 'UPDATE' ||
                    payload.eventType === 'DELETE') {
                    getContactData();
                }
            },
            (error) => {
                console.error('Subscribe Error:', error);
            }
        );
        return unsubscribeContacts;
    }, [])


    return (
        <>
            <Contact
                contacts={contacts}
                sortedContacts={sortedContacts}
            />
        </>
    )
}