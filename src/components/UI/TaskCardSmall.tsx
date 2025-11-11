import classNames from 'classnames';
import Urgent from '../../assets/icons/urgent.svg?react';
import styles from './TaskCard.module.scss'
import { getContactColorSync, getInitials } from '../../utils/user';
import { useEffect, useState } from 'react';
import { TaskCardProps } from '../../types/Task';


export function TaskCardSmall({ taskId, category, title, description, assigned_to, priority, sub }: TaskCardProps) {
    const firstCategory = category && category.length > 0 ? category[0]?.toLowerCase() : '';
    const categoryClasses = classNames(styles.category, {
        [styles.technicalCat]: firstCategory === 'technical',
        [styles.businessCat]: firstCategory === 'business',
        [styles.designCat]: firstCategory === 'design',
        [styles.marketingCat]: firstCategory === 'marketing',
    });
    const [taskProgress, setTaskProgress] = useState({ total: 0, completed: 0, percentage: 0 })
    console.log(taskProgress);


    useEffect(() => {
        if (sub) {
            const completed = sub.filter(s => s.done).length;
            const total = sub.length;
            const percentage = total > 0 ? (completed / total) * 100 : 0;

            setTaskProgress({ completed, total, percentage });
        }
    }, [sub]);


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
            {sub && sub.length > 0 ?
                (<div className={styles.subtasks}>
                    <div className={styles.subtasksBar}>
                        {sub && sub.map((subtask, index) => (
                            <span
                                key={index}
                                className={classNames(
                                    styles.singleSubtaskBar,
                                    { [styles.completed]: subtask.done }
                                )}
                            ></span>
                        ))}

                        { }
                    </div>
                    <span className={styles.subtaskCount}>
                        {taskProgress.completed}/{taskProgress.total}
                    </span>
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