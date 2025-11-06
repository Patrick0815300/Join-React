export interface Task {
    id: string;
    createdAt: Date;
    title: string;
    description: string;
    due_date: Date;
    priority: string;
    assigned_to: string[];
    category: string[];
    subtasks: string[];
    phase: string;
}

export interface Subtask {
    id: string;
    task_id: string;
    created_at: string;
    task: string;
    done: boolean
}

export interface TaskCardProps {
    taskId: string;
    category: string[];
    title: string;
    description: string;
    subtasks: string[];
    assigned_to: string[];
    priority: string;
    due_date?: string;
}