import { useEffect, useState } from "react";
import { Task } from "../presentation/Task";
import { getDataByColumns, insertMultipleRows, insertSingleRow } from "../../api/supabase/data";
import { setContactColors } from "../../utils/user";

interface Contact {
    firstname: string;
    lastname: string;
    color: string | '#FF0000';
}

export function TaskContainer() {
    const [contacts, setContacts] = useState<string[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [assignedContacts, setAssignedContacts] = useState<string[]>([]);
    const [taskCategory, setTaskCategory] = useState<string[]>([]);
    const [subtasks, setSubtasks] = useState<string[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');


    const handleTitleChange = (newTitle: string) => setTitle(newTitle);
    const handleDescriptionChange = (newDesc: string) => setDescription(newDesc);
    const handleDateChange = (newDate: string) => setDate(newDate);
    const handleContactsChange = (contacts: string[]) => setAssignedContacts(contacts);
    const handleCategoryChange = (selectedCategories: string[]) => setTaskCategory(selectedCategories);
    const handleSubtaskChange = (newSubtasks: string[]) => setSubtasks(newSubtasks);

    const getContacts = async () => {
        const data = await getDataByColumns<Contact>('contacts', ['lastname', 'firstname', 'color']);
        if (!data) return;

        setContactColors(data);

        const contactNames = data.map((item: { lastname: string; firstname: string; }) => `${item.firstname} ${item.lastname}`);
        setContacts(contactNames);
    }

    const categoryOptions = [
        'Technical',
        'Business',
    ]

    useEffect(() => {
        getContacts();
    }, [])

    const setSubtasksToTable = async (): Promise<string[]> => {
        const subtaskIds = await Promise.all(
            subtasks.map(async (task) => {
                const subtask = { task: task };
                const result = await insertSingleRow('subtasks', subtask);
                return result[0].id;
            })
        );
        return subtaskIds;
    }

    const onSubmitChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (taskCategory.length > 0) {
            try {
                // SCHRITT 1: Task erstellen und UUID zurückbekommen
                const taskData = {
                    title: title,
                    description: description,
                    due_date: date,
                    priority: priority,
                    assigned_to: assignedContacts,
                    category: taskCategory,
                    phase: 'todo'
                }

                const insertedTask = await insertSingleRow('tasks', taskData);
                const taskId = insertedTask[0].id; // Die generierte UUID!
                console.log('Created task with ID:', taskId);

                // SCHRITT 2: Subtasks mit task_id erstellen
                if (subtasks.length > 0) {
                    const subtaskObjects = subtasks.map(task => ({
                        task: task,
                        task_id: taskId,
                    }));

                    await insertMultipleRows('subtasks', subtaskObjects);
                }

                //clearForm();
                setToastMsg('Task successfully created!');
                setShowToast(true);
            } catch (error) {
                setToastMsg('Error creating task.');
                setShowToast(true);
                console.error(error);
            }
        }
    };



    const clearForm = () => {
        setTitle('');
        setDescription('');
        setDate('');
        setPriority('Medium');
        setAssignedContacts([]);
        setTaskCategory([]);
        setSubtasks([]);
    }

    return (
        <>
            <Task
                title={title}
                description={description}
                date={date}
                priority={priority}
                contacts={contacts}
                selectedContacts={assignedContacts}
                categoryOptions={categoryOptions}
                selectedCategories={taskCategory}
                subtasks={subtasks}
                onTitleChange={handleTitleChange}
                onDescriptionChange={handleDescriptionChange}
                onDateChange={handleDateChange}
                onPriorityChange={setPriority}
                onContactsChange={handleContactsChange}
                onCategoryChange={handleCategoryChange}
                onSubtaskChange={handleSubtaskChange}
                onSubmitChange={onSubmitChange}
                clearForm={clearForm}
                showToast={showToast}
                toastMsg={toastMsg}
                setShowToast={setShowToast}
            />
        </>
    )
}