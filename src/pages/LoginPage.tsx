import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button"
import './LoginPage.modules.scss'
import { LoginContainer } from "../components/containers/LoginContainer";

export function LoginPage() {
    const navigate = useNavigate();



    return (
        <>
            <section>
                <img className="logo" src="src/assets/icons/logo.svg" alt="Logo" />
                <header className="head">
                    <span>Not a Join user?</span>
                    <Button onClick={() => navigate('/signup')}>Sign up</Button>
                </header>
                <LoginContainer />
                <footer>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Legal notice</a>
                </footer>
            </section>

        </>
    )
}