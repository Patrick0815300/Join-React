import { useEffect, useState } from "react";
import { Task } from "../presentation/Task";
import { getDataByColumns } from "../../api/supabase/data";

interface Contact {
    firstname: string;
    lastname: string;
}

export function TaskContainer() {
    const [contacts, setContacts] = useState<string[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [assignedContacts, setAssignedContacts] = useState<string[]>([]);
    const [taskCategory, setTaskCategory] = useState<string[]>([]);
    const [subtasks, setSubtasks] = useState<string[]>([]);

    const handleTitleChange = (newTitle: string) => setTitle(newTitle);
    const handleDescriptionChange = (newDesc: string) => setDescription(newDesc);
    const handleDateChange = (newDate: string) => setDate(newDate);
    const handleContactsChange = (contacts: string[]) => setAssignedContacts(contacts);
    const handleCategoryChange = (categories: string[]) => setTaskCategory(categories);
    const handleSubtaskChange = (newSubtasks: string[]) => setSubtasks(newSubtasks);


    const getContacts = async () => {
        const data = await getDataByColumns<Contact>('contacts', ['lastname', 'firstname']);
        if (!data) return;
        const names = data.map((item: { lastname: string; firstname: string }) => `${item.firstname} ${item.lastname}`);
        setContacts(names)
    }

    const category = [
        'Technical',
        'Business'
    ]

    useEffect(() => {
        getContacts();
    }, [])


    return (
        <>
            <Task
                title={title}
                description={description}
                date={date}
                contacts={contacts}
                category={category}
                subtasks={subtasks}
                onTitleChange={handleTitleChange}
                onDescriptionChange={handleDescriptionChange}
                onDateChange={handleDateChange}
                onContactsChange={handleContactsChange}
                onCategoryChange={handleCategoryChange}
                onSubtaskChange={handleSubtaskChange}
            />
        </>
    )
}