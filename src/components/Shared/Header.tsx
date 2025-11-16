import { useEffect, useRef, useState } from 'react'
import { logout } from '../../api/supabase/user';
import { Link } from 'react-router-dom';
import { getUserName, shortFormatName } from '../../utils/user';
import LogoIcon from '../../assets/icons/logo.svg'
import styles from './Header.module.scss'

export function Header() {
    const [name, setName] = useState('');
    const [showSubmenu, setShowSubmenu] = useState(false);
    const submenuRef = useRef<HTMLDivElement>(null);


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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                submenuRef.current &&
                !submenuRef.current.contains(event.target as Node)
            ) {
                toggleSubmenu();
            }
        };
        if (showSubmenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSubmenu]);


    return (
        <>
            <header className={styles.header}>
                <span className={styles.title}>Kanban Project Management Tool</span>
                <img className={styles.logo} src={LogoIcon} alt="JOIN-Logo" />
                <div className={styles.headerBtns}>
                    <button className={styles.help}>?</button>
                    <button onClick={toggleSubmenu} className={styles.loggedUser}>
                        {name}
                        {showSubmenu ?
                            <div ref={submenuRef} className={styles.submenuContainer}>
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