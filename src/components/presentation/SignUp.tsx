import { AuthForm } from "./AuthForm";

export function SignUp({ toast, handleAuthSubmit }: any) {
    return (
        <>
            <section>
                {toast.show === true ?
                    <div className="toast">{toast.msg}</div> : null
                }

                <AuthForm
                    mode="signup"
                    onSubmit={handleAuthSubmit}
                />
            </section>
        </>
    )
}