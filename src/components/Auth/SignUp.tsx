import { useState } from "react"
import AuthForm from "./AuthForm.tsx"
import { getSession, signUp, } from "../../api/supabase/user.ts"
import { addContact } from "../../api/supabase/data.ts"
import { useNavigate } from "react-router-dom"

type FormDataProp = {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
    checked: false
}
const SignUp = ({ }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState(
        {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            checked: false
        });

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
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error: any) {
            console.error("SignUp fehlgeschlagen", error);
            //error.message übergeben an Toast !
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