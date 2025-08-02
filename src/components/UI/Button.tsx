import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import './Button.modules.scss'

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

const Button = ({ className, children, ...props }: ButtonProps) => (
    <button className={` button ${className}`} {...props}>
        {children}
    </button>
);

export default Button;