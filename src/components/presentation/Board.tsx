import { Task } from "../../types/Task";
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
            <h1>board</h1>
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

        </>
    )
}