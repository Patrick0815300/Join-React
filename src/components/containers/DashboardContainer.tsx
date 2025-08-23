import { useEffect, useState } from "react";
import { getData } from "../../api/supabase/data.ts";
import { Dashboard } from "../presentation/Dashboard.tsx";
import { getUser } from "../../api/supabase/user.ts";
import { getUserName } from "../../utils/user.ts";

export interface Task {
    id: number;
    created_at: string;
    title: string;
    description: string;
    due_date: string;
    assignet_to: string[] | number[];
    subtasks: string[] | number[];
    phase: Phase;
    priority: Priority;
    category: Category
}

type Priority = 'Urgent' | 'Medium' | 'Low';
type Category = 'User Story' | 'Technical Task' | 'Business'
type Phase = 'todo' | 'in_progress' | 'await_feedback' | 'done'

export function DashboardContainer() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [todos, setTodos] = useState<Task[]>([])
    const [inProgress, setInProgress] = useState<Task[]>([])
    const [awaitFeedback, setAwaitFeedback] = useState<Task[]>([])
    const [done, setDone] = useState<Task[]>([])
    const [nextUrgent, setNextUrgent] = useState<Task | null>(null);
    const [name, setName] = useState<string>('');
    const [countUrgent, setCountUrgent] = useState<number>(0);


    const getTaskData = async () => {
        const data = await getData('tasks')
        const todos = data.filter(tasks => tasks.phase === 'todo');
        const inProgress = data.filter(tasks => tasks.phase === 'in_progress');
        const awaitFeedback = data.filter(tasks => tasks.phase === 'await_feedback');
        const done = data.filter(tasks => tasks.phase === 'done');
        setTodos(todos);
        setInProgress(inProgress);
        setAwaitFeedback(awaitFeedback);
        setDone(done);

        getNextUrgent(data);
        getUrgentLength(data);
    }

    const getUserData = async () => {
        const nameObj = await getUserName();
        const name = nameObj.firstname + ' ' + nameObj.lastname
        setName(name)
    }

    const getNextUrgent = (tasks: Task[]) => {
        const urgents = tasks.filter(tasks => tasks.priority === 'Urgent');
        if (urgents.length > 0) {
            const newestTask = urgents.reduce((latest, current) => {
                const latestTime = new Date(latest.due_date).getTime();
                const currentTime = new Date(current.due_date).getTime();
                return currentTime > latestTime ? current : latest;
            });
            setNextUrgent(newestTask);
        } else { setNextUrgent(null) }
    }

    const getUrgentLength = (tasks: Task[]) => {
        const urgents = tasks.filter(tasks => tasks.priority === 'Urgent');
        setCountUrgent(urgents.length);
    }


    useEffect(() => {
        getTaskData();
        getUserData();
    }, [])

    return (
        <>
            <Dashboard
                todos={todos}
                inProgress={inProgress}
                awaitFeedback={awaitFeedback}
                done={done}
                nextUrgent={nextUrgent}
                name={name}
                countUrgent={countUrgent}
            />
        </>
    )
}