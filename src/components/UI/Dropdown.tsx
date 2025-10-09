import { useEffect, useRef, useState } from 'react';
import { getContactColor, getInitials } from '../../utils/user';
import styles from './Dropdown.module.scss'
import { getSingleColumn } from '../../api/supabase/data';

interface DropdownProps {
    label: string;
    placeholder: string;
    subs: string[];
    flag: string;
    required?: boolean;
    selected?: string[];
    onSelect?: (selected: string[]) => void;
}

const Dropdown = ({ label, placeholder, subs, selected = [], flag, required, onSelect }: DropdownProps) => {
    const [showSub, setShowSub] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleSub = () => {
        setShowSub(prevState => !prevState);
    };

    // Outside click close
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
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSub]);

    const handleCheckbox = (sub: string) => {
        let updated: string[];
        if (selected.includes(sub)) {
            updated = selected.filter(item => item !== sub);
        } else {
            updated = [...selected, sub];
        }
        onSelect?.(updated);
    };

    getContactColor('Thomas Neumann')

    return (

        <div>
            <div ref={dropdownRef} className={styles.dropdownContainer}>
                <span className={styles.label}>{label} {required && <span className={styles.required}>*</span>}</span>
                <div className={styles.input} onClick={toggleSub}>
                    <span>{placeholder}</span>
                    <img
                        src="src/assets/icons/arrow_drop_down.svg"
                        alt="dropdown"
                        style={{
                            transform: showSub && subs.length > 0 ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s'
                        }}
                    />
                </div>
                {showSub && subs.length > 0 && (
                    <div className={styles.subs}>
                        {flag === 'contacts' ? (
                            subs.map((sub, index) => (
                                <label
                                    htmlFor={`dropdown-checkbox-${sub}`}
                                    className={styles.singleSub}
                                    style={{ cursor: 'pointer' }}
                                    key={index}
                                >
                                    <div className={styles.subName}>
                                        <span style={{ backgroundColor: getContactColor(sub) }} className={styles.initials}>{getInitials(sub)}</span>
                                        <span>{sub}</span>
                                    </div>

                                    <input
                                        type="checkbox"
                                        checked={selected.includes(sub)}
                                        onChange={() => handleCheckbox(sub)}
                                        value={sub}
                                        id={`dropdown-checkbox-${sub}`}
                                    />

                                </label>

                            ))
                        ) : (
                            subs.map((sub, index) => (
                                <label
                                    htmlFor={`dropdown-checkbox-${sub}`}
                                    className={styles.singleSub}
                                    style={{ cursor: 'pointer' }}
                                    key={index}
                                >
                                    {sub}
                                    <input
                                        className={styles.dNone}
                                        type="checkbox"
                                        checked={selected.includes(sub)}
                                        onChange={() => handleCheckbox(sub)}
                                        value={sub}
                                        id={`dropdown-checkbox-${sub}`}
                                    />
                                </label>

                            ))
                        )

                        }
                    </div>
                )}
            </div>
            <div className={styles.listedChecked}>
                {selected.length > 0 ? selected.join(', ') : null}
            </div>
        </div>
    );
};

export default Dropdown;
