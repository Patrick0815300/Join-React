import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from './Button.module.scss'

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

const Button = ({ className, children, ...props }: ButtonProps) => (
    <button className={` ${styles.button} ${className}`} {...props}>
        {children}
    </button>
);

export default Button;