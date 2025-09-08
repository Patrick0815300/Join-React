import { SignUpContainer } from "../components/containers/SignUpContainer"
import { Link } from 'react-router-dom';
import styles from './LoginPage.module.scss'

export function SignUpPage() {

    return (
        <>
            <section>
                <img className={styles.logo} src="src/assets/icons/logo.svg" alt="Logo" />
                <SignUpContainer />
                <footer>
                    <Link to="/privacy">Legal Notice</Link>
                    <Link to="/legal">Privacy Policy</Link>
                </footer>
            </section>

        </>
    )
}