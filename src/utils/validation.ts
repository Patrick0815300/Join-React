export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email)
}

export const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password)
}

export const checkConfirmPassword = (pw: string, pwConfirm: string, mode: string): boolean => {
    if (mode === 'signup') {
        return pw === pwConfirm && pwConfirm.length > 0;
    } return true
}
