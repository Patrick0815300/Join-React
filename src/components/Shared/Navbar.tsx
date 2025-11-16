import { NavLink, useLocation } from "react-router-dom";
import DashboardIcon from '../../assets/icons/dashboard.svg'
import EditIcon from '../../assets/icons/edit.svg'
import IconsIcon from '../../assets/icons/Icons.svg'
import ContatcsIcon from '../../assets/icons/contacts.svg'
import styles from './Navbar.module.scss'

export function Navbar() {
    const location = useLocation();

    return (
        <>
            <nav>
                <img className={styles.logo} src="src/assets/icons/join_logo_vector.svg" alt="Logo" />
                <ul className={styles.navLinks}>
                    <li className={location.pathname === '/dashboard' ? styles.active : ''}>
                        <NavLink to="/dashboard">
                            <img src={DashboardIcon} alt="Dashboard" />
                            Summary
                        </NavLink>
                    </li>
                    <li className={location.pathname === '/tasks' ? styles.active : ''}>
                        <NavLink to="/tasks">
                            <img src={EditIcon} alt="Board" />
                            Add Task
                        </NavLink>
                    </li>
                    <li className={location.pathname === '/board' ? styles.active : ''}>
                        <NavLink to="/board">
                            <img src={IconsIcon} alt="Board" />
                            Board
                        </NavLink>
                    </li>
                    <li className={location.pathname === '/contacts' ? styles.active : ''}>
                        <NavLink to="/contacts">
                            <img src={ContatcsIcon} alt="Contacts" />
                            Contacts
                        </NavLink>
                    </li>
                </ul>
                <ul className={styles.privacy}>
                    <li className={location.pathname === '/privacy' ? styles.active : ''}>
                        <NavLink to="/privacy">
                            Privacy Policy
                        </NavLink>
                    </li>
                    <li className={location.pathname === '/legal' ? styles.active : ''}>
                        <NavLink to="/legal">
                            Legal notice
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}
