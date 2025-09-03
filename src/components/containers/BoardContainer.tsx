import { useEffect, useState } from "react";
import { getData } from "../../api/supabase/data"
import { Board } from "../presentation/Board"
import { Task } from "../../types/Task";

export function BoardContainer() {
    const [todos, setTodos] = useState<Task[]>([]);
    const [done, setDone] = useState<Task[]>([]);
    const [inProgress, setInProgress] = useState<Task[]>([]);
    const [awaitFeedback, setAwaitFeedback] = useState<Task[]>([]);

    const getTasks = async () => {
        const data = await getData('tasks');
        if (data) {
            setTodos(data.filter(task => task.phase === 'todo'));
            setDone(data.filter(task => task.phase === 'done'));
            setInProgress(data.filter(task => task.phase === 'inProgress'));
            setAwaitFeedback(data.filter(task => task.phase === 'awaitFeedback'));
        }
    }

    useEffect(() => {
        getTasks();
    }, [])


    return (
        <>
            <Board
                todos={todos}
                done={done}
                inProgress={inProgress}
                awaitFeedback={awaitFeedback}
            />
        </>
    )
}