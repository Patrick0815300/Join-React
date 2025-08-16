import { useState } from "react";
import { login } from "../../api/supabase/user.tsx";
import { Login } from "../presentation/Login.tsx";

export function LoginContainer() {
    const [toast, setToast] = useState({
        msg: '',
        show: false
    })

    const handleAuthSubmit = async (formData: { email: string; password: string }) => {
        console.log("Daten vom Formular:", formData);
        try {
            await login(formData.email, formData.password)
            setToast({ msg: 'Successfull Log In.', show: true })
        } catch (error: any) {
            setToast({ msg: error?.message || 'Logged in failed.', show: true })
            console.error("Login fehlgeschlagen", error);
        }
    };

    return (
        <>
            <Login
                toast={toast}
                handleAuthSubmit={handleAuthSubmit}
            />
        </>
    )
}