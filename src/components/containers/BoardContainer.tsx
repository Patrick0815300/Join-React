import { useEffect } from "react";
import { getData } from "../../api/supabase/data"
import { Board } from "../presentation/Board"

interface Task {
    createdAt: Date;
    title: string;
    description: string;
    due_date: Date;
    priority: string;
    assignetTo: string[];
    category: string[];
    subtasks: string[];
    phase: string;
}

export function BoardContainer() {
    const getTask = async () => {
        const data = await getData('tasks');
        if (data) {
            const todos = data.filter(todos => todos.phase === 'todo');
            const done = data.filter(todos => todos.phase === 'done');
            const inProgress = data.filter(todos => todos.phase === 'inProgress');
            const awaitFeedback = data.filter(todos => todos.phase === 'awaitFeedback');
        }
    }

    useEffect(() => {
        getTask();
    }, [])


    return (
        <>
            <Board />
        </>
    )
}