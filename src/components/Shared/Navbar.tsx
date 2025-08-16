import { Link } from "react-router-dom";
import './Navbar.modules.scss'

export function Navbar() {
    return (
        <>
            <nav>
                <img src="src/assets/icons/join_logo_vector.svg" alt="Logo" />
                <ul className="nav-links">
                    <li><Link to="/dashboard"><img src="src/assets/icons/dashboard.svg" alt="Dashboard" /> Summary</Link></li>
                    <li><Link to="/addtask"><img src="src/assets/icons/edit.svg" alt="Board" /> Add Task</Link></li>
                    <li><Link to="/board"><img src="src/assets/icons/dashboard.svg" alt="Board" /> Board</Link></li>
                    <li><Link to="/contacts"><img src="src/assets/icons/contacts.svg" alt="Contacts" /> Contacts</Link></li>
                </ul>
                <ul>
                    <li><Link to="/privacy">Privacy Policy</Link></li>
                    <li><Link to="/legal">Legal notice</Link></li>
                </ul>
            </nav>
        </>
    )
}