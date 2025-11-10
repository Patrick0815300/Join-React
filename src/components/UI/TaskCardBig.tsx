import { useEffect, useState } from "react";
import { Subtask, TaskCardProps } from "../../types/Task";
import { getColumn } from "../../api/supabase/data";
import Urgent from '../../assets/icons/urgent.svg?react';
import styles from "./TaskCardBig.module.scss"
import { formatDate } from "../../utils/date";
import { getContactColorSync, getInitials } from "../../utils/user";



export function TaskCardBig({ taskId, category, title, description, assigned_to, priority, due_date, onClose }: TaskCardProps) {
    const [subtasks, setSubtasks] = useState<Subtask[]>([])


    useEffect(() => {
        const fetchData = async () => {
            const subtaskData = await getColumn<Subtask>('subtasks', 'task_id', taskId);
            setSubtasks(subtaskData);
        }
        fetchData();
    }, [taskId]);

    const getPriorityIcon = () => {
        switch (priority) {
            case 'Urgent':
                return <Urgent className={styles.urgentIcon} />;
            case 'Medium':
                return <span className={styles.mediumIcon}>=</span>;
            case 'Low':
                return <Urgent className={styles.lowIcon} />;
            default:
                console.log('No match found, falling to default');
                return null;
        }
    };

    console.log(assigned_to);


    // const getColor = () => {
    //     getContactColor()
    // }

    return (
        <>
            <div className={styles.bigCard}>
                <div className={styles.dFl}>
                    <span className={styles.category}>{category}</span>
                    <button className={styles.closeBtn} onClick={onClose}>x</button>
                </div>
                <h1>{title}</h1>
                <span>{description}</span>
                <div>Due Date: <span>{formatDate(due_date)}</span></div>
                <div className={styles.priority}>Priority: <span className={styles.priorityIcon}>{priority}  {getPriorityIcon()}</span></div>
                <div className={styles.assigent}>Assignet to:
                    {assigned_to.map((name, index) => (
                        <div className={styles.names} key={index}>
                            <span
                                className={styles.initials}
                                style={{
                                    backgroundColor: getContactColorSync(name),
                                    backgroundImage: 'none'
                                }}
                            >{getInitials(name)}</span>
                            <span className={styles.name}>{name}</span>
                        </div>
                    ))}
                </div>
                <span>Subtasks</span>
                {subtasks && subtasks.map((subtask) => (
                    <div key={subtask.id}>
                        <input
                            type="checkbox"
                            id={subtask.id}
                            checked={subtask.done}
                            onChange={() => { }}
                        />
                        <span>{subtask.task}</span>
                    </div>
                ))}
            </div>
        </>
    )
}
