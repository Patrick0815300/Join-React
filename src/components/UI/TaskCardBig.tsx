import { useEffect, useState } from "react";
import { Subtask, TaskCardProps } from "../../types/Task";
import { getColumn } from "../../api/supabase/data";
import Urgent from '../../assets/icons/urgent.svg?react';
import styles from "./TaskCardBig.module.scss"



export function TaskCardBig({ taskId, category, title, description, assigned_to, priority, due_date }: TaskCardProps) {
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
                return null;
        }
    };

    console.log(due_date);


    return (
        <>
            <div className={styles.bigCard}>
                <div className={styles.dFl}>
                    <span className={styles.category}>{category}</span>
                    <button className={styles.closeBtn}>x</button>
                </div>
                <h1>{title}</h1>
                <span>{description}</span>
                <div>Due Date: <span>{ }</span></div>
                <div>Priority: <span>{priority}  {getPriorityIcon()}</span></div>
                <div>Assignet to:
                    {assigned_to.map((name, index) => (
                        <div key={index}>
                            <span className={styles.initials}></span>
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
