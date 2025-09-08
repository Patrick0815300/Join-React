import { useEffect, useState } from 'react'
import { logout } from '../../api/supabase/user';
import { Link } from 'react-router-dom';
import { getUserName, shortFormatName } from '../../utils/user';
import styles from './Header.module.scss'


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
            <header className={styles.header}>
                <span>Kanban Project Management Tool</span>
                <div className={styles.headerBtns}>
                    <button className={styles.help}>?</button>
                    <button onClick={toggleSubmenu} className={styles.loggedUser}>
                        {name}
                        {showSubmenu ?
                            <div className={styles.submenuContainer}>
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