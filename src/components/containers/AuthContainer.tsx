import { useState } from "react";
import { checkConfirmPassword, validateEmail, validatePassword } from "../../utils/validation";
import { AuthForm } from "../presentation/AuthForm";

type AuthFormProps = {
    mode: 'login' | 'signup';
    onGuestLogin?: () => void;
    onSubmit?: (data: any) => void;
};

export function AuthFormContainer({ mode, onGuestLogin, onSubmit }: AuthFormProps) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        checked: false
    })

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        password: false,
        passwordConfirm: false,
    });

    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
        passwordConfirm: false,
    });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

        switch (name) {
            case "email":
                setErrors(prev => ({ ...prev, email: !validateEmail(value) }));
                break;
            case "password":
                setErrors(prev => ({
                    ...prev,
                    password: !validatePassword(value),
                    passwordConfirm: !checkConfirmPassword(value, form.passwordConfirm, mode), // Falls Passwort geändert, auch Bestätigung prüfen!
                }));
                break;
            case "name":
                setErrors(prev => ({ ...prev, name: value.trim().length < 3 }));
                break;
            case "passwordConfirm":
                setErrors(prev => ({ ...prev, passwordConfirm: !checkConfirmPassword(form.password, value, mode) }));
                break;
        }
    };


    const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        if (name === 'passwordConfirm') {
            setErrors(prev => ({
                ...prev,
                passwordConfirm: !checkConfirmPassword(form.password, form.passwordConfirm, mode)
            }));
        }
    };


    const onSubmitChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailOk = validateEmail(form.email);
        const pwOk = validatePassword(form.password);
        const confirmOk = mode === "signup"
            ? checkConfirmPassword(form.password, form.passwordConfirm, mode)
            : true; // <- immer true beim Login
        const checkedOk = mode === "signup" ? form.checked : true;
        if (emailOk && pwOk && confirmOk && checkedOk) {
            if (onSubmit) onSubmit(form)
            setForm({
                name: '',
                email: '',
                password: '',
                passwordConfirm: '',
                checked: false
            })
        } else {
            // Toast Error Meldung
            console.log('Schade');
        }
    };


    const showError = (field: keyof typeof errors, msg: string) => (
        touched[field] && errors[field] ? <label htmlFor={field}>{msg}</label> : null
    );

    const onCheckedChange = (checked: boolean) => {
        setForm(prev => ({ ...prev, checked }));
    };



    return (
        <>
            <AuthForm
                mode={mode}
                form={form}
                errors={errors}
                onSubmitChange={onSubmitChange}
                onInputChange={onInputChange}
                onInputBlur={onInputBlur}
                showError={showError}
                onGuestLogin={onGuestLogin}
                onCheckedChange={onCheckedChange}
            />
        </>
    )
}