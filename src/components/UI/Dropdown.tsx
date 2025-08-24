import { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.scss'

interface DropdownProps {
    label: string
    placeholder: string;
    subs: string[];
    required?: boolean;
    onSelect?: (selected: string[]) => void;
}


const Dropdown = ({ label, placeholder, subs, required }: DropdownProps) => {
    const [showSub, setShowSub] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleSub = () => {
        setShowSub(prevState => !prevState);
    };

    // Klick außerhalb erkennen und Dropdown schließen
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowSub(false);
            }
        };

        if (showSub) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSub]);

    return (
        <>
            <div ref={dropdownRef} className={styles.dropdownContainer}>
                <span className={styles.label}>{label} {required && <span className={styles.required}>*</span>}</span>
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