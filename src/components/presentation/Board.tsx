import { useEffect, useRef, useState } from "react";
import { Task } from "../../types/Task";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { TaskCardSmall } from '../UI/TaskCardSmall';
import styles from './Board.module.scss'
import { TaskContainer } from "../containers/TaskContainer";

interface TaskProps {
    todos: Task[];
    done: Task[];
    inProgress: Task[];
    awaitFeedback: Task[];
}

export function Board({ todos, done, inProgress, awaitFeedback }: TaskProps) {
    const table = [
        { title: 'To Do', tasks: todos },
        { title: 'In Progress', tasks: inProgress },
        { title: 'Await Feedback', tasks: awaitFeedback },
        { title: 'Done', tasks: done },
    ];
    const [showAddTask, setShowAddTask] = useState(false);
    const addTaskRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

    }, [showAddTask])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                addTaskRef.current &&
                !addTaskRef.current.contains(event.target as Node)
            ) {
                setShowAddTask(false);
            }
        };
        if (showAddTask) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showAddTask]);


    const addTask = () => {
        setShowAddTask(prevState => !prevState);
    }

    return (
        <>
            <div className={styles.top}>
                <h1>Board</h1>
                <div className={styles.search}>
                    <Input />
                    <Button onClick={addTask}>Add Task +</Button>
                </div>
            </div>

            <div className={styles.table}>
                {table.map(({ title, tasks }) => (
                    <div key={title} className={styles.column}>
                        <div className={styles.phase}>
                            <h2>{title}</h2>
                            <button className={styles.addTaskBtn} onClick={addTask}>+</button>
                        </div>

                        {tasks.length === 0 ? (
                            <span className={styles.noTask}>No Tasks {title}</span>
                        ) : (
                            tasks.map(task => (
                                <TaskCardSmall
                                    key={task.id}
                                    taskId={task.id}
                                    category={task.category}
                                    title={task.title}
                                    description={task.description}
                                    subtasks={task.subtasks}
                                    assigned_to={task.assigned_to}
                                    priority={task.priority}
                                />
                            ))
                        )}
                    </div>
                ))}
            </div>

            {showAddTask && (
                <div className={styles.overlay}>
                    <div ref={addTaskRef} className={styles.overlayAddTask}>
                        <TaskContainer />
                    </div>
                </div>

            )}

        </>
    )
}