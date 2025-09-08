import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button"
import { LoginContainer } from "../components/containers/LoginContainer";
import { Link } from 'react-router-dom';
import styles from './LoginPage.module.scss'


export function LoginPage() {
    const navigate = useNavigate();



    return (
        <>
            <section>
                <img className={styles.logo} src="src/assets/icons/logo.svg" alt="Logo" />
                <header className={styles.head}>
                    <span>Not a Join user?</span>
                    <Button onClick={() => navigate('/signup')}>Sign up</Button>
                </header>
                <LoginContainer />
                <footer>
                    <Link to="/privacy">Legal Notice</Link>
                    <Link to="/legal">Privacy Policy</Link>
                </footer>
            </section>

        </>
    )
}