import { useEffect, useState } from "react"
import { deleteData, getData, getDataByColumns, subscribeToTable } from "../../api/supabase/data.ts"
import { Contact } from "../presentation/Contact.tsx"
import { ContactColor, SingleContact } from "../../types/Contact.ts"
import { setContactColors } from "../../utils/user.ts"


export function ContactContainer() {
    const [contacts, setContacts] = useState<SingleContact[]>([])
    const [sortedContacts, setSortedContacts] = useState<SingleContact[]>([])
    const [showToast, setShowToast] = useState(false)

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
        if (showToast) {
            console.log('GEHT');

            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast, setShowToast]);

    useEffect(() => {
        getContactData();
        getContactsColors();

        const unsubscribeContacts = subscribeToTable(
            'contacts',
            (payload) => {
                if (payload.eventType === 'INSERT') {
                    getContactData();
                    getContactsColors();
                    setShowToast(true);
                    console.log('INSERT');

                } else if (
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

    const handleDeleteContact = async (cId: string) => {
        await deleteData('contacts', 'id', cId)
    }


    return (
        <>
            <Contact
                contacts={contacts}
                sortedContacts={sortedContacts}
                ondelete={handleDeleteContact}
                toast={showToast}
            />
        </>
    )
}