import { useNavigate } from "react-router-dom";
import { SignUp } from "../presentation/SignUp";
import { useState } from "react";
import { signUp } from "../../api/supabase/user";
import { addContact } from "../../api/supabase/data";
import { generateRandomDarkColor } from "../../utils/color";

type FormDataProp = {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
    checked: false
}

export function SignUpContainer() {
    const navigate = useNavigate();

    const [toast, setToast] = useState({
        msg: '',
        show: false
    })

    const signUpUser = async (formData: FormDataProp) => {
        const color = generateRandomDarkColor()
        const name = splitName(formData.name);
        const data = await signUp(formData.email, formData.password);
        if (data.user) {
            await addContact(data.user.id, name.lastName, name.firstName, formData.email, color);
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
            <SignUp
                toast={toast}
                handleAuthSubmit={handleAuthSubmit}
            />
        </>
    )
}