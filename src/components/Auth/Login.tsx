import { useState, useEffect } from "react"
import AuthForm from "./AuthForm"
import { getData } from "../../api/supabase/data"
import './Login.modules.scss'
import { getSession, getUser, signUp } from "../../api/supabase/user"

const Login = ({ }) => {
    const [instrument, setInstrument] = useState<any[]>([]);
    useEffect(() => {
        getData('contacts')
            .then(data => setInstrument(data))
            .catch(e => console.error(e))
    }, [])

    console.log(instrument);





    return (
        <>
            <section>
                <AuthForm mode="login" />
                <button onClick={() => getUser()}>Los</button>
                <footer>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Legal otice</a>
                </footer>
            </section>
        </>
    )

}

export default Login