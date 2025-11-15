import { useState } from "react";
import styles from "./AddContact.module.scss"
import Button from "./Button"
import Input from "./Input"
import { validateEmail, validatePhone } from "../../utils/validation";
import { generateRandomDarkColor } from "../../utils/color";
import { splitName } from "../../utils/user";
import { signUp } from "../../api/supabase/user";
import { addContact } from "../../api/supabase/data";

type FormDataProp = {
    name: string,
    email: string,
    password: string,
}

type AddContactProp = {
    close: () => void
}

export function AddContact({ close }: AddContactProp) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: 'Ofenrohr300#',
    })

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    const signUpUser = async (formData: FormDataProp) => {
        const color = generateRandomDarkColor();
        const name = splitName(formData.name);
        const data = await signUp(formData.email, formData.password);
        if (data.user) {
            await addContact(data.user.id, name.lastname, name.firstname, formData.email, color);
        }
    }

    const clearForm = () => {
        setForm({
            name: '',
            email: '',
            phone: '',
            password: 'Ofenrohr300#',
        })
    }

    const onSubmitChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nameOk = form.name.length > 3;
        const emailOk = validateEmail(form.email);
        const phoneOk = validatePhone(form.phone)

        if (nameOk && emailOk && phoneOk) {
            await signUpUser(form)
            setForm({
                name: '',
                email: '',
                phone: '',
                password: 'Ofenrohr300#',
            })
        } else {
            // Zeige Fehlermeldungen
            console.log('Validation failed');
        }
    };


    return (
        <>
            <div className={styles.container}>
                <div className={styles.leftside}>
                    <div className={styles.mobileLogo}>
                        <img src="src/assets/icons/join_logo_vector.svg" alt="Join Icon" />
                        <button onClick={close}><img src="src/assets/icons/close.svg" alt="Close Add Contact overlay" /></button>
                    </div>
                    <h1>Add Contact</h1>
                    <span className={styles.desc}>Task are better with a team!</span>
                    <span className={styles.line}></span>
                </div>

                <div className={styles.rightside}>
                    <div className={styles.mobileIcon} style={{ display: 'flex' }}>
                        <div className={styles.personIcon}>
                            <img src="src/assets/icons/person.svg" alt="Person Icon" />
                        </div>
                    </div>
                    <form onSubmit={onSubmitChange}>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleInput}
                            required
                            imgSrc="src/assets/icons/person.svg"
                            imgAlt="Person Icon"
                        />
                        <Input
                            id="email"
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={form.email}
                            onChange={handleInput}
                            required
                            imgSrc="src/assets/icons/mail.svg"
                            imgAlt="Person Icon"
                        />
                        <Input
                            id="phone"
                            name="phone"
                            placeholder="Name"
                            type="tel"
                            value={form.phone}
                            onChange={handleInput}
                            required
                            imgSrc="src/assets/icons/call.svg"
                            imgAlt="Person Icon"
                        />
                        <div className={styles.formBtns}>
                            <Button className={styles.cancel} type="button" onClick={clearForm}>Cancel</Button>
                            <Button type="submit">Create Contact <img src="src/assets/icons/check.svg" /></Button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}