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

    const [form, setForm] = useState(
        {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            checked: false
        });

    const handleAuthSubmit = async (formData: { email: string; password: string }) => {
        console.log("Daten vom Formular:", formData);
        // z.B. Service aufrufen
        try {
            //const session = await getSession(formData.email, formData.password);
            //console.log("Login erfolgreich", session);
            // z.B. Weiterleitung oder Zustand setzen
        } catch (error) {
            console.error("Login fehlgeschlagen", error);
        }
    };


    return (
        <>
            <section>
                <AuthForm
                    mode="login"
                    onSubmit={handleAuthSubmit}
                />
                <button onClick={() => getUser()}>Los</button>
                <footer>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Legal Notice</a>
                </footer>
            </section>
        </>
    )

}

export default Login