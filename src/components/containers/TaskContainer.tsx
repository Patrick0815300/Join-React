import { useState } from "react";
import { Task } from "../presentation/Task";

export function TaskContainer() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [assignedContacts, setAssignedContacts] = useState<string[]>([]);
    const [taskCategory, setTaskCategory] = useState<string[]>([]);

    const handleTitleChange = (newTitle: string) => setTitle(newTitle);
    const handleDescriptionChange = (newDesc: string) => setDescription(newDesc);
    const handleDateChange = (newDate: string) => setDate(newDate);
    const handleContactsChange = (contacts: string[]) => setAssignedContacts(contacts);
    const handleCategoryChange = (categories: string[]) => setTaskCategory(categories);

    const contacts = [
        'Max Muster',
        'Peter Meier'
    ]

    const category = [
        'Technical',
        'Business'
    ]

    return (
        <>
            <Task
                title={title}
                description={description}
                date={date}
                contacts={contacts}
                category={category}
                onTitleChange={handleTitleChange}
                onDescriptionChange={handleDescriptionChange}
                onDateChange={handleDateChange}
                onContactsChange={handleContactsChange}
                onCategoryChange={handleCategoryChange}
            />
        </>
    )
}