import { useEffect, useState } from 'react'
import './Header.modules.scss'
import { getSession, getUser } from '../../api/supabase/user';
import { getSingleColumn } from '../../api/supabase/data';

export function Header() {
    const [name, setName] = useState('');

    useEffect(() => {
        getName();
    }, [name])


    const getName = async () => {
        const user = await getUser();
        const data = await getSingleColumn('contacts', 'user_id', user!.id);
        const name = data.firstname + ' ' + data.lastname
        setName(name)
    }


    return (
        <>
            <header>
                <span>Kanban Project Management Tool</span>
                <div>
                    <button>?</button>
                    <button>{name}</button>
                </div>
            </header>
        </>
    )
}