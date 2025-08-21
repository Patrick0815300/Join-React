import { useEffect, useState } from 'react'
import { logout } from '../../api/supabase/user';
import { Link } from 'react-router-dom';
import { getUserName, shortFormatName } from '../../utils/user';
import './Header.modules.scss'


export function Header() {
    const [name, setName] = useState('');
    const [showSubmenu, setShowSubmenu] = useState(false);

    useEffect(() => {
        getName();
    }, [name])


    const getName = async () => {
        const name = await getUserName();
        const shortName = shortFormatName(name.firstname, name.lastname)
        setName(shortName)
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