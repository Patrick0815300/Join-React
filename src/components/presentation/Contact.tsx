import { useEffect, useRef, useState } from "react";
import { ContactProp, SingleContact } from "../../types/Contact";
import { getContactColorSync, getInitials } from "../../utils/user";
import Button from "../UI/Button";
import styles from "./Contact.module.scss"
import { AddContact } from "../UI/AddContact";
import { EditContact } from "../UI/EditContact";

export function Contact({ sortedContacts, ondelete }: ContactProp) {
    const [selectedContact, setSelectedContact] = useState<SingleContact | null>(null)
    const [showAddContact, setShowAddContact] = useState(false);
    const [showEditContact, setShowEditContact] = useState(false);
    const addContactRef = useRef<HTMLDivElement>(null);
    const editContactRef = useRef<HTMLDivElement>(null);


    const handleDelte = () => {
        if (selectedContact) {
            ondelete(selectedContact.id)
            setSelectedContact(null)
        }
    }

    const handleAddContact = () => {
        setShowAddContact(prevState => !prevState)
    }

    const handleEditContact = () => {
        setShowEditContact(prevState => !prevState)
    }

    const handleCloseEdit = () => {
        setShowEditContact(false);
        setSelectedContact(null);
    }

    // Click Outside Handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                addContactRef.current &&
                !addContactRef.current.contains(event.target as Node) ||
                editContactRef.current &&
                !editContactRef.current.contains(event.target as Node)
            ) {
                setShowAddContact(false);
                setShowEditContact(false)
            }
        };
        if (showAddContact || showEditContact) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showAddContact, showEditContact]);

    return (
        <>
            <div className={styles.section}>
                <div className={styles.contactListContainer}>
                    <Button onClick={handleAddContact}>Add new Contact</Button>

                    {sortedContacts && sortedContacts.map((c, index) => {
                        const currentLetter = c.firstname.charAt(0).toUpperCase();
                        const previousLetter = index > 0
                            ? sortedContacts[index - 1].firstname.charAt(0).toUpperCase()
                            : null;

                        const showLetterHeader = currentLetter !== previousLetter;

                        return (
                            <div key={c.id} className={styles.singleContactContainer}>
                                {showLetterHeader && (
                                    <div className={styles.letterContainer}>
                                        <span className={styles.letter}>{currentLetter}</span>
                                        <span className={styles.letterLine}></span>
                                    </div>
                                )}
                                <div className={styles.singleContact} onClick={() => setSelectedContact(c)}>
                                    <span className={styles.initials}
                                        style={{ backgroundColor: getContactColorSync(`${c.firstname} ${c.lastname}`) }}
                                    >{getInitials(`${c.firstname} ${c.lastname}`)}</span>
                                    <div>
                                        <span className={styles.name}>{c.firstname} {c.lastname}</span>
                                        <a href={`mailto:${c.mail}`} className={styles.mail}>{c.mail}</a>
                                    </div>
                                </div>
                            </div>

                        )
                    })}
                </div>


                <div className={styles.viewContactContainer}>
                    <div className={styles.header}>
                        <h1>Contacts</h1>
                        <span className={styles.headerLine}></span>
                        <span>Better with a team</span>
                    </div>
                    {selectedContact && (
                        <div className={styles.contactInfo}>
                            <div className={styles.nameInfo}>
                                <span className={styles.bigInitials}
                                    style={{ backgroundColor: getContactColorSync(`${selectedContact.firstname} ${selectedContact.lastname}`) }}
                                >{getInitials(`${selectedContact.firstname} ${selectedContact.lastname}`)}</span>
                                <div className={styles.nameAndBtn}>
                                    <h2>{`${selectedContact.firstname} ${selectedContact.lastname}`}</h2>
                                    <div className={styles.btns}>
                                        <button onClick={handleEditContact}>Edit</button>
                                        <button onClick={handleDelte}>Delete</button>
                                    </div>
                                </div>
                            </div>

                            <span style={{ fontSize: '20px', marginBlock: '24px' }}>Contact Information</span>

                            <div className={styles.emailContainer}>
                                <span>Email</span>
                                <a href={`mailto:${selectedContact.mail}`}>{selectedContact.mail}</a>
                            </div>

                            <div className={styles.emailContainer}>
                                <span>Email</span>
                                <a>{selectedContact.phone || 'Keine Telefonnummer'}</a>
                            </div>
                        </div>
                    )}
                </div>



            </div>

            {showAddContact &&
                (<div className={styles.overlay}>
                    <div ref={addContactRef}>
                        <AddContact />
                    </div>

                </div>
                )
            }

            {showEditContact && selectedContact &&
                (<div className={styles.overlay}>
                    <div ref={editContactRef}>
                        <EditContact
                            form={{
                                name: `${selectedContact.firstname} ${selectedContact.lastname}`,
                                email: selectedContact.mail,
                                phone: selectedContact.phone
                            }}
                            cId={selectedContact.id}
                            close={handleCloseEdit}
                        />
                    </div>

                </div>
                )
            }


        </>
    )
}