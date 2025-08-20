import { useEffect, useState } from "react";
import { getData } from "../../api/supabase/data.ts";
import { Dashboard } from "../presentation/Dashboard.tsx";

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

    const getTaskData = async () => {
        const data = await getData('tasks')
        const todos = data.filter(tasks => tasks.phase === 'todo');
        setTodos(todos);
        console.log(todos.length);
    }


    useEffect(() => {
        getTaskData()
    }, [])

    return (
        <>
            <Dashboard
                todos={todos}
            />
        </>
    )
}