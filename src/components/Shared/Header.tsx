import { useEffect, useState } from 'react'
import './Header.modules.scss'
import { getSession, getUser, logout } from '../../api/supabase/user';
import { getSingleColumn } from '../../api/supabase/data';
import { Link } from 'react-router-dom';

export function Header() {
    const [name, setName] = useState('');
    const [showSubmenu, setShowSubmenu] = useState(false);

    useEffect(() => {
        getName();
    }, [name])

    const formatName = (firstname: string, lastname: string) => {
        if (!firstname && !lastname) return '';
        const firstInitial = firstname ? firstname.charAt(0).toUpperCase() : '';
        const lastInitial = lastname ? lastname.charAt(0).toUpperCase() : '';
        return firstInitial + lastInitial;
    };

    const getName = async () => {
        const user = await getUser();
        const data = await getSingleColumn('contacts', 'user_id', user!.id);
        const name = formatName(data.firstname, data.lastname)
        setName(name)
    }

    const toggleSubmenu = () => {
        setShowSubmenu(prevState => !prevState);
    };


    return (
        <>
            <header className='header'>
                <span>Kanban Project Management Tool</span>
                <div className='header-btns'>
                    <button className='help'>?</button>
                    <button onClick={toggleSubmenu} className='logged-user'>
                        {name}
                        {showSubmenu ?
                            <div className='submenu-container'>
                                <Link to="/privacy">Legal Notice</Link>
                                <Link to="/legal">Privacy Policy</Link>
                                <Link to="/login" onClick={logout}>Log out</Link>
                            </div> : null
                        }

                    </button>
                </div>
            </header>
        </>
    )
}