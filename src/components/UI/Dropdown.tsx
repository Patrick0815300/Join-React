import { useState } from 'react';
import styles from './Dropdown.module.scss'

interface DropdownProps {
    label: string
    placeholder: string;
    subs: string[];
}


const Dropdown = ({ label, placeholder, subs }: DropdownProps) => {
    const [showSub, setShowSub] = useState(false);
    const toggleSub = () => {
        setShowSub(prevState => !prevState);
    };

    return (
        <>
            <div className={styles.dropdownContainer}>
                <span className={styles.label}>{label}</span>
                <div className={styles.input} onClick={toggleSub}>{placeholder} <img
                    src="src/assets/icons/arrow_drop_down.svg"
                    alt="dropdown"
                    style={{
                        transform: showSub && subs.length > 0 ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s'
                    }} /></div>
                {showSub && subs.length > 0 && (
                    <div className={styles.subs}>
                        {subs.map((sub, index) => (
                            <span key={index} className={styles.singleSub}>{sub}</span>
                        ))}
                    </div>
                )

                }
            </div>
        </>

    )
}

export default Dropdown;