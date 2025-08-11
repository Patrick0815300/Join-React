import { useState } from 'react'
import './Header.modules.scss'
import { getSession, getUser } from '../../api/supabase/user';

export function Header() {
    const [name, setName] = useState();

    const getName = async () => {
        const user = await getUser()
        console.log(user?.id);
    }

    return (
        <>
            <header>
                <span>Kanban Project Management Tool</span>
                <div>
                    <button>?</button>
                    <button onClick={() => getName()}>{name}</button>
                </div>
            </header>
        </>
    )
}