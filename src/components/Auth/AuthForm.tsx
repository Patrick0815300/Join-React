import Button from '../UI/Button';
import Input from '../UI/Input';
import Mail from '../../assets/icons/mail.svg'
import Lock from '../../assets/icons/lock.svg'
import Person from '../../assets/icons/person.svg'
import './AuthForm.modules.scss'
import { useState } from 'react';
import { validateEmail, validatePassword, checkConfirmPassword } from '../../utils/validation';


type AuthFormProps = {
    mode: 'login' | 'signup';
    onGuestLogin?: () => void;
    onSubmit?: (data: any) => void;
};

const AuthForm = ({ mode, onGuestLogin, onSubmit }: AuthFormProps) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
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
        if (validateEmail(form.email) && validatePassword(form.password) && checkConfirmPassword(form.password, form.passwordConfirm, mode)) {
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

    const showError = (field: keyof typeof errors, msg: string) => (
        touched[field] && errors[field] ? <label htmlFor={field}>{msg}</label> : null
    );


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
                            {showError('name', "Name required with min. 3 letters.")}
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
                    {showError('email', "Check your email. Please try again.")}


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
                    {showError('password', "Check your Password. Please try again.")}

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
                            {showError('passwordConfirm', "Passwords do not match.")}
                        </>
                    )}
                </div>

                {mode === 'signup' ? <div><input type="checkbox" /> I accept the <a href="#">Privacy policy</a></div> : null}

                <div className="button-container">
                    <Button
                        disabled={
                            errors.email ||
                            errors.password ||
                            (mode === 'signup' && (errors.name || errors.passwordConfirm)) ||
                            form.email.trim() === '' ||
                            form.password.trim() === '' ||
                            (mode === 'signup' && (form.name.trim() === '' || form.passwordConfirm.trim() === ''))
                        }
                    >
                        {mode === 'signup' ? 'Sign Up' : 'Log In'}
                    </Button>

                    {mode === 'login' && (
                        <Button
                            style={{ backgroundColor: 'white', color: 'black' }}
                            type="button"
                            onClick={onGuestLogin}
                        >
                            Guest Log In
                        </Button>
                    )}
                </div>


            </form >
        </>
    )
};

export default AuthForm;