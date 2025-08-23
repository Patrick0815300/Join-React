import React from 'react';
import './Input.modules.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    imgSrc?: string;
    imgAlt?: string
    label?: string;
    labelClassName?: string;
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
            ...props
        },
        ref
    ) => (
        <div className="container">
            {label && (
                <label
                    htmlFor={id}
                    className={`input-label ${labelClassName || ''}`}
                >
                    {label}
                    {required && <span className='required'>*</span>}
                </label>





            )}
            <div className='input-container'>
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
                    className={`${'input'} ${className}`}
                    {...props}
                />
                {imgSrc && <img src={imgSrc} alt={imgAlt || ''} />}
            </div>
        </div>

    )
);

export default Input;