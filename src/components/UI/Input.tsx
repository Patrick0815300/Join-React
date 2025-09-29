import React from 'react';
import styles from './Input.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    imgSrc?: string;
    imgAlt?: string
    label?: string;
    labelClassName?: string;
    symbol?: string;
    onSymbolClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            id,
            label,
            labelClassName,
            name,
            type = "text",
            value,
            onChange,
            onBlur,
            placeholder,
            required,
            disabled,
            readOnly,
            autoComplete,
            className = "",
            imgSrc,
            imgAlt,
            symbol,
            onSymbolClick,
            ...props
        },
        ref
    ) => (
        <div className={styles.container}>
            {label && (
                <label
                    htmlFor={id}
                    className={`input-label ${labelClassName || ''}`}
                >
                    {label}
                    {required && <span className={styles.required}> *</span>}
                </label>

            )}
            <div className={styles.inputContainer}>
                <input
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    readOnly={readOnly}
                    autoComplete={autoComplete}
                    ref={ref}
                    className={`${styles.input} ${className}`}
                    {...props}
                />
                {imgSrc && <img src={imgSrc} alt={imgAlt || ''} />}
                {symbol && <button type='button' className={styles.button} onClick={onSymbolClick}>{symbol}</button>}
            </div>
        </div>

    )
);

export default Input;