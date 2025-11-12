import { useState } from "react";
import styles from "./AddContact.module.scss"
import Button from "./Button"
import Input from "./Input"

export function AddContact() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
    })

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target);
        // const { name, value } = e.target;
        // setForm(prev => ({ ...prev, [name]: value }));
    }


    return (
        <>
            <div className={styles.leftside}>
                <img src="src/assets/icons/join_logo_vector.svg" alt="Join Icon" />
                <h1>Add Contact</h1>
                <span className={styles.desc}>Task are better with a team!</span>
                <span className={styles.line}></span>
            </div>

            <div className={styles.rightside}>
                <div style={{ display: 'flex' }}>
                    <img src="src/assets/icons/person.svg" alt="Person Icon" />
                </div>
                <form action="">
                    <Input
                        placeholder="Name"
                        value={form.name}
                        onChange={handleInput}
                        required
                        imgSrc="src/assets/icons/person.svg"
                        imgAlt="Person Icon"
                    />
                    <Input
                        placeholder="Email"
                        type="email"
                        value={form.email}
                        onChange={handleInput}
                        required
                        imgSrc="src/assets/icons/mail.svg"
                        imgAlt="Person Icon"
                    />
                    <Input
                        placeholder="Name"
                        type="tel"
                        value={form.phone}
                        onChange={handleInput}
                        required
                        imgSrc="src/assets/icons/call.svg"
                        imgAlt="Person Icon"
                    />
                    <div>
                        <Button>Cancel</Button>
                        <Button>Create Contact</Button>
                    </div>
                </form>
            </div>
        </>
    )
}