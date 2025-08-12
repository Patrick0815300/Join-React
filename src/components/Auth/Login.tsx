import { useState } from "react"
import AuthForm from "./AuthForm"
import './Login.modules.scss'
import { getSession, getUser, login } from "../../api/supabase/user"

const Login = ({ }) => {
    // const [instrument, setInstrument] = useState<any[]>([]);
    // useEffect(() => {
    //     getData('contacts')
    //         .then(data => setInstrument(data))
    //         .catch(e => console.error(e))
    // }, [])

    const [form, setForm] = useState(
        {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            checked: false
        });

    const [toast, setToast] = useState({
        msg: '',
        show: false
    })

    const handleAuthSubmit = async (formData: { email: string; password: string }) => {
        console.log("Daten vom Formular:", formData);
        login(formData.email, formData.password)
        try {
            const session = await getSession();
            console.log("Login erfolgreich", session);
            setToast({ msg: 'Successfull Log In.', show: true })
        } catch (error) {
            console.error("Login fehlgeschlagen", error);
        }
    };


    return (
        <>
            <section>
                {toast.show === true ?
                    <div className="toast">{toast.msg}</div> : null
                }
                <AuthForm
                    mode="login"
                    onSubmit={handleAuthSubmit}
                />
            </section>
        </>
    )

}

export default Login