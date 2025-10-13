import classNames from 'classnames';
import Urgent from '../../assets/icons/urgent.svg?react';
import styles from './TaskCard.module.scss'
import { getContactColorSync, getInitials } from '../../utils/user';

interface TaskCardSmallProps {
    category: string[];
    title: string;
    description: string;
    subtasks: string[];
    assigned_to: string[];
    priority: string;
}

export function TaskCardSmall({ category, title, description, subtasks, assigned_to, priority }: TaskCardSmallProps) {
    const firstCategory = category && category.length > 0 ? category[0]?.toLowerCase() : '';
    const categoryClasses = classNames(styles.category, {
        [styles.technicalCat]: firstCategory === 'technical',
        [styles.businessCat]: firstCategory === 'business',
        [styles.designCat]: firstCategory === 'design',
        [styles.marketingCat]: firstCategory === 'marketing',
    });


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
            {subtasks && subtasks.length > 0 ?
                (<div className={styles.subtasks}>
                    <div className={styles.subtasksBar}>
                        {subtasks && subtasks.map((sub, index) => (
                            <span key={index} className={styles.singleSubtaskBar}></span>
                        ))}
                    </div>
                    <span className={styles.subtaskCount}>0/{subtasks.length}</span>
                </div>
                ) : null}
            <div className={styles.bottom}>
                <div className={styles.assignetTo}>
                    {assigned_to && assigned_to.map((name, index) => (
                        <span
                            key={index}
                            className={styles.initials}
                            style={{ backgroundColor: getContactColorSync(name) }}
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