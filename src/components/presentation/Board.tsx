import styles from './Board.module.scss'
import { Task } from "../../types/Task";
import { TaskCardSmall } from '../UI/TaskCardSmall';
import { useState } from 'react';

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
                    assignetTo={task.assignetTo}
                    priority={task.priority}
                />
            ))}

        </>
    )
}