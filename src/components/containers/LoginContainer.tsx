import { useEffect, useState } from "react";
import { Login } from "../presentation/Login.tsx";
import { login } from "../../api/supabase/user.ts";
import { useNavigate } from "react-router-dom";

export function LoginContainer() {
    const navigate = useNavigate();
    const [toast, setToast] = useState({
        msg: '',
        show: false
    })

    const handleAuthSubmit = async (formData: { email: string; password: string }) => {
        console.log("Daten vom Formular:", formData);
        try {
            await login(formData.email, formData.password)
            setToast({ msg: 'Successfull Log In.', show: true })
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error: any) {
            setToast({ msg: error?.message || 'Logged in failed.', show: true })
            console.error("Login fehlgeschlagen", error);
        }
    };

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast({ msg: '', show: false }), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast, setToast]);

    return (
        <>
            <Login
                toast={toast}
                handleAuthSubmit={handleAuthSubmit}
            />
        </>
    )
}