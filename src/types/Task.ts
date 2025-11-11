export interface Task {
    id: string;
    createdAt: Date;
    title: string;
    description: string;
    due_date: string;
    priority: string;
    assigned_to: string[];
    category: string[];
    subtasks: Subtask[];
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
    sub?: Subtask[];
    assigned_to: string[];
    priority: string;
    due_date?: string;
    onClose?: () => void;
}

export interface TaskProps {
    todos: Task[];
    done: Task[];
    inProgress: Task[];
    awaitFeedback: Task[];
    subtasks: Subtask[]
}