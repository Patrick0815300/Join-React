import { useState } from "react"
import AuthForm from "./AuthForm"
import { getSession, signUp, } from "../../api/supabase/user"

type FormDataProp = {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
    checked: false
}
const SignUp = ({ }) => {
    const [form, setForm] = useState(
        {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            checked: false
        });

    const handleAuthSubmit = async (formData: FormDataProp) => {
        console.log("Daten vom Formular:", formData);
        signUp(formData.email, formData.password)
        try {
            const session = await getSession();
            console.log("SignUp erfolgreich", session);
            // z.B. Weiterleitung oder Zustand setzen
        } catch (error) {
            console.error("SignUp fehlgeschlagen", error);
        }
    };


    return (
        <>
            <section>
                <AuthForm
                    mode="signup"
                    onSubmit={handleAuthSubmit}
                />
            </section>
        </>
    )

}

export default SignUp