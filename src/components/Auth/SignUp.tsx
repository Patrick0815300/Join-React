import AuthForm from "./AuthForm.tsx"
import { getSession, signUp, } from "../../api/supabase/user.ts"
import { addContact } from "../../api/supabase/data.ts"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import './Login.modules.scss'

type FormDataProp = {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
    checked: false
}
const SignUp = ({ }) => {
    const navigate = useNavigate();

    const [toast, setToast] = useState({
        msg: '',
        show: false
    })




    function splitName(fullName: string): { firstName: string; lastName: string } {
        const parts = fullName.trim().split(' ');
        const firstName = parts[0] || '';
        const lastName = parts.slice(1).join(' ') || '';
        return { lastName, firstName };
    }

    const handleAuthSubmit = async (formData: FormDataProp) => {
        const name = splitName(formData.name);
        try {
            await signUp(formData.email, formData.password)
            await addContact(name.lastName, name.firstName, formData.email)
            setToast({ msg: 'You successfully Sign Up.', show: true })
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error: any) {
            console.error("SignUp fehlgeschlagen", error);
            setToast({ msg: error.message, show: true })
        }
    };

    return (
        <>
            <section>
                {toast.show === true ?
                    <div className="toast">{toast.msg}</div> : null
                }

                <AuthForm
                    mode="signup"
                    onSubmit={handleAuthSubmit}
                />
            </section>
        </>
    )

}

export default SignUp