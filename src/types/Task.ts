export interface Task {
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