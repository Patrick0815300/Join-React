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
    const getInitials = (fullName: string) => {
        return fullName
            .split(' ')
            .map(name => name.charAt(0).toUpperCase())
            .join('');
    }

    return (
        <div className={styles.smallCard}>
            <span className={styles.category}>{category ? category.join(', ') : 'Keine Kategorie vorhanden'}</span>
            <span className={styles.title}>{title}</span>
            <span className={styles.description}>{description}</span>
            <div className={styles.subtasks}>
                <span className={styles.subtasksBar}></span>
                <span className={styles.subtaskCount}>{subtasks ? subtasks.length : null}</span>
            </div>
            <div className={styles.bottom}>
                <div className={styles.assignetTo}>
                    {assignetTo && assignetTo.map((name, index) => (
                        <span key={index} className={styles.initials}>
                            {getInitials(name)}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
