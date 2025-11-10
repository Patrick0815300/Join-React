import { useEffect, useState } from "react";
import { getData, getDataByColumns, subscribeToTable } from "../../api/supabase/data"
import { Board } from "../presentation/Board"
import { Task } from "../../types/Task";
import { Contact } from "../../types/Contact";
import { setContactColors } from "../../utils/user";

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

    const getContactsColors = async () => {
        const data = await getDataByColumns<Contact>('contacts', ['lastname', 'firstname', 'color']);
        if (!data) return;

        setContactColors(data);
    }

    useEffect(() => {
        getTasks();
        getContactsColors();

        const unsubscribe = subscribeToTable(
            'tasks',
            (payload) => {
                if (payload.eventType === 'INSERT') {
                    getTasks();
                    console.log('geht');

                }
            },
            (error) => {
                console.error('Subscribe Error:', error);
            }
        );
        return unsubscribe;
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