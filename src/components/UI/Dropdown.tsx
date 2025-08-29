import { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.scss'

interface DropdownProps {
    label: string;
    placeholder: string;
    subs: string[];
    required?: boolean;
    onSelect?: (selected: string[]) => void;
}

const Dropdown = ({ label, placeholder, subs, required, onSelect }: DropdownProps) => {
    const [showSub, setShowSub] = useState(false);
    const [selectedSub, setSelectedSub] = useState<string[]>([]);
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
        if (selectedSub.includes(sub)) {
            updated = selectedSub.filter(item => item !== sub);
        } else {
            updated = [...selectedSub, sub];
        }
        setSelectedSub(updated);
        onSelect?.(updated);
    };

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
                        {subs.map((sub, index) => (
                            <div className={styles.singleSub} key={index}>
                                <input
                                    type="checkbox"
                                    checked={selectedSub.includes(sub)}
                                    onChange={() => handleCheckbox(sub)}
                                    value={sub}
                                    id={`dropdown-checkbox-${sub}`}
                                />
                                <label htmlFor={`dropdown-checkbox-${sub}`}>{sub}</label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.listedChecked}>
                {selectedSub.length > 0 ? selectedSub.join(', ') : null}
            </div>
        </div>
    );
};

export default Dropdown;
