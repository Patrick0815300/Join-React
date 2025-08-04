import AuthForm from "./AuthForm"
import './Login.modules.scss'

const Login = ({ }) => (
    <>
        <section>
            <AuthForm mode="login" />
            <footer>
                <a href="#">Privacy Policy</a>
                <a href="#">Legal otice</a>
            </footer>
        </section>
    </>

)

export default Login