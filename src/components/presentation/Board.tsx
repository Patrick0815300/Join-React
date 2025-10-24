import { Task } from "../../types/Task";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { TaskCardSmall } from '../UI/TaskCardSmall';
import styles from './Board.module.scss'

interface TaskProps {
    todos: Task[];
    done: Task[];
    inProgress: Task[];
    awaitFeedback: Task[];
}

export function Board({ todos, done, inProgress, awaitFeedback }: TaskProps) {
    return (
        <>
            <div className={styles.top}>
                <h1>Board</h1>
                <div className={styles.search}>
                    <Input />
                    <Button>Add Task +</Button>
                </div>
            </div>

            <div className={styles.table}>
                <div className={styles.column}>
                    <h2>To do</h2>
                    {todos.map((task, index) => (
                        <TaskCardSmall
                            key={index}
                            category={task.category}
                            title={task.title}
                            description={task.description}
                            subtasks={task.subtasks}
                            assigned_to={task.assigned_to}
                            priority={task.priority}
                        />
                    ))}
                </div>

                <div className={styles.column}>
                    <h2>Done</h2>
                    {done.map((task, index) => (
                        <TaskCardSmall
                            key={index}
                            category={task.category}
                            title={task.title}
                            description={task.description}
                            subtasks={task.subtasks}
                            assigned_to={task.assigned_to}
                            priority={task.priority}
                        />
                    ))}
                </div>

                <div className={styles.column}>
                    <h2>in Progress</h2>
                    {inProgress.map((task, index) => (
                        <TaskCardSmall
                            key={index}
                            category={task.category}
                            title={task.title}
                            description={task.description}
                            subtasks={task.subtasks}
                            assigned_to={task.assigned_to}
                            priority={task.priority}
                        />
                    ))}
                </div>

                <div className={styles.column}>
                    <h2>await Feedback</h2>
                    {awaitFeedback.map((task, index) => (
                        <TaskCardSmall
                            key={index}
                            category={task.category}
                            title={task.title}
                            description={task.description}
                            subtasks={task.subtasks}
                            assigned_to={task.assigned_to}
                            priority={task.priority}
                        />
                    ))}
                </div>
            </div>



        </>
    )
}