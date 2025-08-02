import Button from '../UI/Button';
import Input from '../UI/Input';
import Mail from '../../assets/icons/mail.svg'
import Lock from '../../assets/icons/lock.svg'
import './AuthForm.modules.scss'
import { useState } from 'react';


type AuthFormProps = {
    title: string;
}

const AuthForm = ({ title }: AuthFormProps) => {
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(email)
    }

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return passwordRegex.test(password)
    }

    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

        if (name === "email") setEmailError(!validateEmail(value));
        if (name === "password") setPasswordError(!validatePassword(value));
    };

    // Mark as touched when leaving field (first blur triggers error display)
    const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        if (name === "email") setEmailTouched(true);
        if (name === "password") setPasswordTouched(true);
    };

    const onSubmitChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateEmail(form.email) && validatePassword(form.password)) {
            console.log("Formulareingaben sind gültig:", form);
            setForm({
                email: '',
                password: ''
            })
        } else { console.log('Schade'); }

    }

    return (
        <>
            <form onSubmit={onSubmitChange} className="form-container">
                <div className="header-container">
                    <h1>{title}</h1>
                    <span className='underline'></span>
                </div>
                <div className="inputs">
                    <Input
                        placeholder='Email'
                        id='email'
                        name='email'
                        value={form.email}
                        onChange={onInputChange}
                        onBlur={onInputBlur}
                        imgSrc={Mail}
                        imgAlt='Mail-Icon'
                    />
                    {emailTouched && emailError && (
                        <label htmlFor="email">Check your email. Please try again.</label>
                    )}

                    <Input
                        placeholder='Password'
                        type='password'
                        id='password'
                        name='password'
                        value={form.password}
                        onBlur={onInputBlur}
                        onChange={onInputChange}
                        imgSrc={Lock}
                        imgAlt='Lock-Icon'
                    />
                    {passwordTouched && passwordError && (
                        <label htmlFor="email">Check your Password. Please try again.</label>
                    )}
                </div>

                <div className="button-container">
                    <Button disabled={emailError || passwordError}>Submit</Button>
                </div>

            </form>
        </>
    )
};

export default AuthForm;