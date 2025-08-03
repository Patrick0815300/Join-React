import Button from '../UI/Button';
import Input from '../UI/Input';
import Mail from '../../assets/icons/mail.svg'
import Lock from '../../assets/icons/lock.svg'
import Person from '../../assets/icons/person.svg'

import './AuthForm.modules.scss'
import { useState } from 'react';


type AuthFormProps = {
    mode: 'login' | 'signup';
    onGuestLogin?: () => void;
    onSubmit?: (data: any) => void;
};

const AuthForm = ({ mode, onGuestLogin, onSubmit }: AuthFormProps) => {
    mode = 'signup'
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(email)
    }

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return passwordRegex.test(password)
    }

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmError, setPasswordConfirmError] = useState(false)

    const [nameTouched, setNameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [passwordConfirmTouched, setPasswordConfirmTouched] = useState(false);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

        switch (name) {
            case "email":
                setEmailError(!validateEmail(value));
                break;
            case "password":
                setPasswordError(!validatePassword(value));
                setPasswordConfirmError(!checkConfirmPassword(value, form.passwordConfirm));
                break;
            case "name":
                setNameError(value.trim().length < 3);
                break;
            case "passwordConfirm":
                setPasswordConfirmError(!checkConfirmPassword(form.password, value));
                break;
        }
    };


    const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        if (name === "email") setEmailTouched(true);
        if (name === "password") setPasswordTouched(true);
        if (name === "name") setNameTouched(true);
        if (name === 'passwordConfirm') {
            setPasswordConfirmTouched(true);
            const isValid = checkConfirmPassword(form.password, form.passwordConfirm);
            setPasswordConfirmError(!isValid);
        }
    };

    const checkConfirmPassword = (pw: string, pwConfirm: string): boolean => {
        return pw === pwConfirm && pwConfirm.length > 0;
    }



    const onSubmitChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateEmail(form.email) && validatePassword(form.password) && checkConfirmPassword(form.password, form.passwordConfirm)) {
            setForm({
                name: '',
                email: '',
                password: '',
                passwordConfirm: ''
            })
        } else {
            // Toast Error Meldung
            console.log('Schade');
        }

    }

    return (
        <>
            <form onSubmit={onSubmitChange} className="form-container">
                <div className="header-container">
                    <h1>{mode === 'signup' ? 'Sign Up' : 'Log In'}</h1>

                    <span className='underline'></span>
                </div>
                <div className="inputs">
                    {mode === 'signup' && (
                        <>
                            <Input
                                placeholder='Name'
                                id='name'
                                name='name'
                                value={form.name}
                                onChange={onInputChange}
                                onBlur={onInputBlur}
                                imgSrc={Person}
                                imgAlt='Name-Icon'
                            />
                            {nameTouched && nameError && (
                                <label htmlFor="name">Name required with min. 3 letters</label>
                            )}
                        </>
                    )}
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
                        <label htmlFor="password">Check your Password. Please try again.</label>
                    )}

                    {mode === 'signup' && (
                        <>
                            <Input
                                placeholder='Confirm Password'
                                type='password'
                                id='passwordConfirm'
                                name='passwordConfirm'
                                value={form.passwordConfirm}
                                onChange={onInputChange}
                                onBlur={onInputBlur}
                                imgSrc={Lock}
                                imgAlt='Confirm-Password-Icon'
                            />
                            {passwordConfirmTouched && passwordConfirmError && (
                                <label htmlFor="passwordConfirm">Passwords do not match.</label>
                            )}
                        </>
                    )}
                </div>

                <div className="button-container">
                    <Button
                        disabled=
                        {emailError ||
                            passwordError ||
                            (mode === 'signup' && (nameError || passwordConfirmError))
                        }>{mode === 'signup' ? 'Sign Up' : 'Log In'}</Button>
                    {mode === 'signup' && (
                        <>
                            <Button style={{ backgroundColor: 'white', color: 'black' }}>Guest Log In</Button>
                        </>
                    )

                    }
                </div>

            </form >
        </>
    )
};

export default AuthForm;