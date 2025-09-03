export interface Task {
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