import { AuthFormContainer } from "../containers/AuthContainer";
import styles from './Login.module.scss'

export function SignUp({ toast, handleAuthSubmit }: any) {
    return (
        <>
            <section>
                {toast.show === true ?
                    <div className={styles.toast}>{toast.msg}</div> : null
                }

                <AuthFormContainer
                    mode="signup"
                    onSubmit={handleAuthSubmit}
                />
            </section>
        </>
    )
}