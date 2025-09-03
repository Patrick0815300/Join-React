import styles from './Board.module.scss'
import { Task } from "../../types/Task";

interface TaskProps {
    todos: Task[];
    done: Task[];
    inProgress: Task[];
    awaitFeedback: Task[];
}

export function Board({ todos, done, inProgress, awaitFeedback }: TaskProps) {
    return (
        <>
            {todos.map((task, index) => {
                <p key={index}>{task.title}</p>
            })}
        </>
    )
}