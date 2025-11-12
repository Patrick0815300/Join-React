import { useState } from "react";
import styles from "./AddContact.module.scss"
import Button from "./Button"
import Input from "./Input"
import { validateEmail, validatePhone } from "../../utils/validation";
import { getContactColorSync, getInitials, splitName } from "../../utils/user";
import { deleteData, updateFields } from "../../api/supabase/data";

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
                    <img src="src/assets/icons/join_logo_vector.svg" alt="Join Icon" />
                    <h1>Edit Contact</h1>
                    <span className={styles.line}></span>
                </div>

                <div className={styles.rightside}>
                    <div style={{ display: 'flex' }}>
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
                            imgSrc="src/assets/icons/person.svg"
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
                            imgSrc="src/assets/icons/mail.svg"
                            imgAlt="Person Icon"
                        />
                        <Input
                            id="phone"
                            name="phone"
                            placeholder="Phone"
                            type="tel"
                            value={newForm.phone}
                            onChange={handleInput}
                            required
                            imgSrc="src/assets/icons/call.svg"
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