import { AuthFormContainer } from "../containers/AuthContainer";
import './Login.modules.scss'

export function SignUp({ toast, handleAuthSubmit }: any) {
    return (
        <>
            <section>
                {toast.show === true ?
                    <div className="toast">{toast.msg}</div> : null
                }

                <AuthFormContainer
                    mode="signup"
                    onSubmit={handleAuthSubmit}
                />
            </section>
        </>
    )
}