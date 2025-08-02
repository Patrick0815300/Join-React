import React from 'react';
import './Input.modules.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    imgSrc?: string;
    imgAlt?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            id,
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
            <img src={imgSrc} alt={imgAlt} />
        </div>
    )
);

export default Input;