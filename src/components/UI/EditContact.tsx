import { useState } from "react";
import Button from "./Button"
import Input from "./Input"
import { validateEmail, validatePhone } from "../../utils/validation";
import { getContactColorSync, getInitials, splitName } from "../../utils/user";
import { deleteData, updateFields } from "../../api/supabase/data";
import JoinLogoVerctorIcon from '../../assets/icons/join_logo_vector.svg'
import CloseIcon from '../../assets/icons/close.svg'
import PersonIcon from '../../assets/icons/person.svg'
import MailIcon from '../../assets/icons/mail.svg'
import CallIcon from '../../assets/icons/call.svg'
import styles from "./AddContact.module.scss"

interface EditContactProps {
    form: {
        name: string;
        email: string;
        phone: string;
    };
    cId: string;
    close: () => void;
}

export function EditContact({ form, cId, close }: EditContactProps) {
    const [newForm, setNewForm] = useState({
        name: form.name,
        email: form.email,
        phone: form.phone,
    })

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewForm(prev => ({ ...prev, [name]: value }));
    }

    const isDifferent =
        newForm.name !== form.name ||
        newForm.email !== form.email ||
        newForm.phone !== form.phone;

    const getChangedFields = () => {
        const changes: any = {};

        if (newForm.name !== form.name) {
            const { firstname, lastname } = splitName(newForm.name);
            changes.firstname = firstname;
            changes.lastname = lastname;
        }
        if (newForm.email !== form.email) changes.email = newForm.email;
        if (newForm.phone !== form.phone) changes.phone = newForm.phone;

        return changes;
    };

    const deleteContact = async (cId: string) => {
        await deleteData('contacts', 'id', cId)
        close();
    }

    const onSubmitChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nameOk = newForm.name.length > 3;
        const emailOk = validateEmail(newForm.email);
        const phoneOk = validatePhone(newForm.phone)

        if (nameOk && emailOk && phoneOk && isDifferent) {
            const changedFields = getChangedFields();
            await updateFields('contacts', changedFields, cId);
            // Success Toast
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
                        <img src={JoinLogoVerctorIcon} alt="Join Icon" />
                        <button onClick={close}><img src={CloseIcon} alt="Close Add Contact overlay" /></button>
                    </div>
                    <h1>Edit Contact</h1>
                    <span className={styles.line}></span>
                </div>

                <div className={styles.rightside}>
                    <div className={styles.mobileIcon} style={{ display: 'flex' }}>
                        <div className={styles.personIcon} style={{ backgroundColor: getContactColorSync(form.name) }}>{getInitials(form.name)}</div>
                    </div>
                    <form onSubmit={onSubmitChange}>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={newForm.name}
                            onChange={handleInput}
                            required
                            imgSrc={PersonIcon}
                            imgAlt="Person Icon"
                        />
                        <Input
                            id="email"
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={newForm.email}
                            onChange={handleInput}
                            required
                            imgSrc={MailIcon}
                            imgAlt="Person Icon"
                        />
                        <Input
                            id="phone"
                            name="phone"
                            placeholder="Phone"
                            type="tel"
                            value={`+${newForm.phone}`}
                            onChange={handleInput}
                            required
                            imgSrc={CallIcon}
                            imgAlt="Person Icon"
                        />
                        <div className={styles.formBtns}>
                            <Button className={styles.cancel} type="button" onClick={() => deleteContact(cId)}>Delete</Button>
                            <Button type="submit" disabled={!isDifferent}>Save</Button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}