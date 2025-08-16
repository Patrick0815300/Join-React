import Button from "../UI/Button.tsx";
import Input from "../UI/Input.tsx";
import Mail from '../../assets/icons/mail.svg'
import Lock from '../../assets/icons/lock.svg'
import Person from '../../assets/icons/person.svg'
import './AuthForm.modules.scss'

// Typ für das Formular-Objekt
type FormData = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    checked: boolean;
};

// Typ für Fehlerstatus
type FormErrors = {
    name: boolean;
    email: boolean;
    password: boolean;
    passwordConfirm: boolean;
};

// Typ für "berührte" Felder
type FormTouched = {
    name: boolean;
    email: boolean;
    password: boolean;
    passwordConfirm: boolean;
};

// Props für die Präsentationskomponente
type AuthFormPresentationProps = {
    mode: 'login' | 'signup';
    form: FormData;
    errors: FormErrors;
    onSubmitChange: (e: React.FormEvent<HTMLFormElement>) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInputBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    showError: (field: keyof FormErrors, msg: string) => React.ReactNode;
    onGuestLogin?: () => void;
    onCheckedChange: (checked: boolean) => void;
};


export function AuthForm({ mode, form, errors, onSubmitChange, onInputChange, onInputBlur, showError, onGuestLogin, onCheckedChange }: AuthFormPresentationProps) {
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
                        value={form?.email}
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

                {mode === 'signup' ? (
                    <div>
                        <input
                            type="checkbox"
                            checked={form.checked}
                            onChange={e => onCheckedChange && onCheckedChange(e.target.checked)}
                        />
                        I accept the <a href="#">Privacy policy</a>
                    </div>
                ) : null}

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
}