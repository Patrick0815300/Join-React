import classNames from 'classnames';
import Urgent from '../../assets/icons/urgent.svg?react';
import styles from './TaskCard.module.scss'

interface TaskCardSmallProps {
    category: string[];
    title: string;
    description: string;
    subtasks: string[];
    assigned_to: string[];
    priority: string;
}

export function TaskCardSmall({ category, title, description, subtasks, assigned_to, priority }: TaskCardSmallProps) {
    const getInitials = (fullName: string) => {
        return fullName
            .split(' ')
            .map(name => name.charAt(0).toUpperCase())
            .join('');
    }
    const firstCategory = category && category.length > 0 ? category[0]?.toLowerCase() : '';
    const categoryClasses = classNames(styles.category, {
        [styles.technicalCat]: firstCategory === 'technical',
        [styles.businessCat]: firstCategory === 'business',
        [styles.designCat]: firstCategory === 'design',
        [styles.marketingCat]: firstCategory === 'marketing',
    });

    const getRandomColor = () => { return '#' + Math.floor(Math.random() * 16777215).toString(16); }

    const getPriorityIcon = () => {
        switch (priority) {
            case 'Urgent':
                return <Urgent className={styles.urgentIcon} />;
            case 'Medium':
                return <span className={styles.mediumIcon}>=</span>;
            case 'Low':
                return <Urgent className={styles.lowIcon} />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.smallCard}>
            <span className={categoryClasses}>
                {category ? category.join(', ') : 'Keine Kategorie vorhanden'}
            </span>
            <span className={styles.title}>{title}</span>
            <span className={styles.description}>{description}</span>
            <div className={styles.subtasks}>
                <span className={styles.subtasksBar}></span>
                <span className={styles.subtaskCount}>{subtasks ? subtasks.length : null}</span>
            </div>
            <div className={styles.bottom}>
                <div className={styles.assignetTo}>
                    {assigned_to && assigned_to.map((name, index) => (
                        <span
                            key={index}
                            className={styles.initials}
                            style={{ backgroundColor: getRandomColor() }}
                        >
                            {getInitials(name)}
                        </span>
                    ))}
                </div>
                <div className={styles.priorityIcon}>
                    {getPriorityIcon()}
                </div>
            </div>
        </div>
    );
}