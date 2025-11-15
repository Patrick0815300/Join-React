import { useEffect, useRef, useState } from "react";
import { Login } from "../presentation/Login.tsx";
import { login, logout } from "../../api/supabase/user.ts";
import { useNavigate } from "react-router-dom";

const AUTO_LOGOUT_TIME = 60 * 60 * 1000;

export function LoginContainer() {
    const timeoutRef = useRef<number | null>(null);
    const navigate = useNavigate();
    const [toast, setToast] = useState({
        msg: '',
        show: false
    })

    const resetTimer = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(async () => {
            await logout();
            // z.B. redirect to login page
        }, AUTO_LOGOUT_TIME);
    };

    useEffect(() => {
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keypress', resetTimer);
        window.addEventListener('touchstart', resetTimer);
        resetTimer();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keypress', resetTimer);
            window.removeEventListener('touchstart', resetTimer);
        };
    }, []);

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

    const handleGuestLogin = async () => {
        await login('guest@user.com', 'Ofenrohr300#')
        navigate('/dashboard')
    }


    return (
        <>
            <Login
                toast={toast}
                handleAuthSubmit={handleAuthSubmit}
                onGuestLogin={handleGuestLogin}
            />
        </>
    )
}