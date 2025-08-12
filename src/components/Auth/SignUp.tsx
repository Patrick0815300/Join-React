import AuthForm from "./AuthForm.tsx"
import { signUp, } from "../../api/supabase/user.ts"
import { addContact } from "../../api/supabase/data.ts"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
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

    const signUpUser = async (formData: FormDataProp) => {
        const name = splitName(formData.name);
        const data = await signUp(formData.email, formData.password);
        if (data.user) {
            await addContact(data.user.id, name.lastName, name.firstName, formData.email);
        }
    }

    function splitName(fullName: string): { firstName: string; lastName: string } {
        const parts = fullName.trim().split(' ');
        const firstName = parts[0] || '';
        const lastName = parts.slice(1).join(' ') || '';
        return { lastName, firstName };
    }

    const handleAuthSubmit = async (formData: FormDataProp) => {
        try {
            await signUpUser(formData);
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