import styles from './Toast.module.scss'

interface ToastProp {
    content: string
    imgSrc?: string,
    imgAlt?: string
}

export function Toast({ content, imgSrc, imgAlt }: ToastProp) {
    return (
        <>
            <div className={styles.toast}>
                <span>{content}</span>
                {imgSrc && <img src={imgSrc} alt={imgAlt} />}
            </div>
        </>
    )
}