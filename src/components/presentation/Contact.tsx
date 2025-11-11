import { ContactProp } from "../../types/Contact";
import { getInitials } from "../../utils/user";
import Button from "../UI/Button";
import styles from "./Contact.module.scss"

export function Contact({ contacts, sortedContacts }: ContactProp) {
    return (
        <>
            <div className={styles.contactListContainer}>
                <Button>Add new Contact</Button>
                {sortedContacts && sortedContacts.map((c, _) => (
                    <div key={c.id} className={styles.singleContact}>
                        <span className={styles.initials} style={{}}>{getInitials(`${c.firstname} ${c.lastname}`)}</span>
                        <div>
                            <span className={styles.name}>{c.firstname} {c.lastname}</span>
                            <a className={styles.mail}>{c.mail}</a>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.viewContactContainer}>

            </div>
        </>
    )
}