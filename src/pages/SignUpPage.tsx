import { SignUpContainer } from "../components/containers/SignUpContainer"
import './LoginPage.modules.scss'

export function SignUpPage() {

    return (
        <>
            <section>
                <img className="logo" src="src/assets/icons/logo.svg" alt="Logo" />
                <SignUpContainer />
                <footer>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Legal notice</a>
                </footer>
            </section>

        </>
    )
}