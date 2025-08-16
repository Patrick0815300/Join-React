import { AuthForm } from "./AuthForm";

type Toast = {
    msg: string;
    show: boolean;
};

type LoginProps = {
    toast: Toast;
    handleAuthSubmit: (formData: { email: string; password: string }) => Promise<void>;
};


export function Login({ toast, handleAuthSubmit }: LoginProps) {
    return (
        <>
            <section>
                {toast.show === true ?
                    <div className="toast">{toast.msg}</div> : null
                }
                <AuthForm
                    mode="login"
                    onSubmit={handleAuthSubmit}
                />
            </section>
        </>
    )
}