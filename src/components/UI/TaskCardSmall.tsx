import styles from './TaskCard.module.scss'

interface TaskCardSmallProps {
    category: string[];
    title: string;
    description: string;
    subtasks: string[];
    assignetTo: string[];
    priority: string;
}

export function TaskCardSmall({ category, title, description, subtasks, assignetTo, priority }: TaskCardSmallProps) {
    return (
        <>
            <div className={styles.smallCard}>
                <span className={styles.category}>{category}</span>
                <span className={styles.title}>{title}</span>
                <span className={styles.description}>{description}</span>
                <div className={styles.subtasks}>
                    <span className={styles.subtasksBar}></span>
                    <span className={styles.subtaskCount}></span>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.assignetTo}>
                        <span>ASS:{assignetTo}</span>
                    </div>
                </div>
            </div>
        </>
    )
}