import { useEffect, useState } from "react";
import { getData, getDataByColumns, subscribeToTable } from "../../api/supabase/data"
import { Board } from "../presentation/Board"
import { Subtask, Task } from "../../types/Task";
import { ContactColor } from "../../types/Contact";
import { setContactColors } from "../../utils/user";

export function BoardContainer() {
    const [todos, setTodos] = useState<Task[]>([]);
    const [done, setDone] = useState<Task[]>([]);
    const [inProgress, setInProgress] = useState<Task[]>([]);
    const [awaitFeedback, setAwaitFeedback] = useState<Task[]>([]);
    const [subtasks, setSubtasks] = useState<Subtask[]>([])

    const getTasks = async () => {
        const data = await getData('tasks');
        if (data) {
            setTodos(data.filter(task => task.phase === 'todo'));
            setDone(data.filter(task => task.phase === 'done'));
            setInProgress(data.filter(task => task.phase === 'inProgress'));
            setAwaitFeedback(data.filter(task => task.phase === 'awaitFeedback'));
        }
    }

    const getSubtasks = async () => {
        const data = await getData('subtasks')
        if (data) { setSubtasks(data); }
    }

    const getContactsColors = async () => {
        const data = await getDataByColumns<ContactColor>('contacts', ['lastname', 'firstname', 'color']);
        if (!data) return;

        setContactColors(data);
    }

    useEffect(() => {
        getTasks();
        getSubtasks();
        getContactsColors();

        const unsubscribeTasks = subscribeToTable(
            'tasks',
            (payload) => {
                if (payload.eventType === 'INSERT') {
                    getTasks();
                }
            },
            (error) => {
                console.error('Subscribe Error:', error);
            }
        );

        const unsubscribeSubtasks = subscribeToTable(
            'subtasks',
            (payload) => {
                if (payload.eventType === 'UPDATE') {
                    getSubtasks();
                }
            },
            (error) => {
                console.error('Subscribe Error:', error);
            }
        );

        return () => {
            unsubscribeTasks();
            unsubscribeSubtasks();
        };
    }, [])

    return (
        <>
            <Board
                todos={todos}
                done={done}
                inProgress={inProgress}
                awaitFeedback={awaitFeedback}
                subtasks={subtasks}
            />
        </>
    )
}