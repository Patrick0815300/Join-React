import { useState } from "react";
import { Subtask, TaskCardProps } from "../../types/Task";
import styles from "./TaskCardBig.module.scss"
import Input from "./Input";

export function TaskCardBig({ taskId, category, title, description, assigned_to, priority, due_date }: TaskCardProps) {
    const [subtasks, setSubtasks] = useState<Subtask[]>([])

    return (
        <>
            <div className={styles.bigCard}>
                <span className={styles.category}>{category}</span>
                <h1>{title}</h1>
                <span>{description}</span>
                <div>Due Date<span>{due_date}</span></div>
                <div>Priority<span>{priority} ICON</span></div>
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
