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
                    <div className={styles.phase}>
                        <h2>To do</h2>
                        <button className={styles.addTaskBtn}>+</button>
                    </div>

                    {todos.length === 0 ? (
                        <span className={styles.noTask}>No Tasks To do</span>
                    ) : (
                        todos.map((task, _) => (
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

                <div className={styles.column}>
                    <h2>in progess</h2>
                    {inProgress.length === 0 ? (
                        <span className={styles.noTask}>No Tasks in progress</span>
                    ) : (
                        inProgress.map((task, _) => (
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

                <div className={styles.column}>
                    <h2>Await Feedback</h2>
                    {awaitFeedback.length === 0 ? (
                        <span className={styles.noTask}>No Tasks in await Feedback</span>
                    ) : (
                        awaitFeedback.map((task, _) => (
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



                <div className={styles.column}>
                    <h2>Done</h2>
                    {done.length === 0 ? (
                        <span className={styles.noTask}>No Tasks Done</span>
                    ) : (
                        done.map((task, _) => (
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
            </div>



        </>
    )
}