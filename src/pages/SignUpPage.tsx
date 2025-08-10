import SignUp from "../components/Auth/SignUp"
import './LoginPage.modules.scss'

export function SignUpPage() {

    return (
        <>
            <section>
                <img className="logo" src="src/assets/icons/logo.svg" alt="Logo" />
                <SignUp />
                <footer>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Legal notice</a>
                </footer>
            </section>

        </>
    )
}