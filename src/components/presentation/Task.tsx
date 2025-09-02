import { useEffect, useState } from 'react';
import Dropdown from '../UI/Dropdown';
import Input from '../UI/Input'
import Button from '../UI/Button';
import styles from './Task.module.scss'
import { Toast } from '../UI/Toast';

interface TaskProps {
    title: string;
    description: string;
    date: string;
    priority: string;
    contacts: string[];
    categoryOptions: string[];
    selectedContacts: string[];
    selectedCategories: string[];
    subtasks: string[];
    onTitleChange?: (newTitle: string) => void;
    onDescriptionChange?: (newDescription: string) => void;
    onDateChange?: (newDate: string) => void;
    onPriorityChange?: (priority: string) => void;
    onContactsChange?: (selectedContacts: string[]) => void;
    onCategoryChange?: (selectedCategories: string[]) => void;
    onSubtaskChange?: (subtasks: string[]) => void;
    onSubmitChange?: (e: React.FormEvent<HTMLFormElement>) => void;
    clearForm: () => void;
    showToast: boolean;
    toastMsg: string;
    setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Task({ title, description, date, priority, contacts, selectedContacts, categoryOptions, selectedCategories, subtasks,
    onTitleChange, onDescriptionChange, onDateChange, onPriorityChange, onContactsChange, onCategoryChange, onSubtaskChange, onSubmitChange, clearForm, showToast, toastMsg, setShowToast }: TaskProps) {

    const [newSubtask, setNewSubtask] = useState('');

    const addSubtask = () => {
        if (newSubtask.trim() && onSubtaskChange) {
            onSubtaskChange([...subtasks, newSubtask.trim()]);
            setNewSubtask('');
        }
    };

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast, setShowToast]);

    return (
        <>
            <h1>Add Task</h1>
            <form onSubmit={onSubmitChange}>
                <div className={styles.container}>
                    <div className={styles.side}>
                        <Input
                            id='title'
                            name='title'
                            label='Title'
                            labelClassName={styles.label}
                            className={styles.input}
                            placeholder='Enter a title'
                            required
                            value={title}
                            onChange={e => onTitleChange?.(e.target.value)}
                        />

                        <div className={styles.textarea}>
                            <label className={styles.label} htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                placeholder='Enter a Description'
                                value={description}
                                onChange={e => onDescriptionChange?.(e.target.value)}
                            />
                        </div>

                        <Input
                            id='date'
                            name='date'
                            label='Due Date'
                            labelClassName={styles.label}
                            className={styles.date}
                            type='date'
                            value={date}
                            onChange={e => onDateChange?.(e.target.value)}
                            imgSrc=''
                            required
                        />
                    </div>
                    <div className={styles.line}></div>

                    <div className={styles.side}>
                        <fieldset className={styles.priorityFieldset}>
                            <legend>Priority</legend>
                            <div className={styles.priority}>
                                <button
                                    type="button"
                                    className={priority === 'Urgent' ? styles.redActive : styles.red}
                                    onClick={e => {
                                        e.preventDefault();
                                        onPriorityChange?.('Urgent');
                                    }}
                                >
                                    Urgent <img src="#" alt="Urgent" />
                                </button>
                                <button
                                    type="button"
                                    className={priority === 'Medium' ? styles.yellowActive : styles.yellow}
                                    onClick={e => {
                                        e.preventDefault();
                                        onPriorityChange?.('Medium');
                                    }}
                                >
                                    Medium <img src="#" alt="Medium" />
                                </button>
                                <button
                                    type="button"
                                    className={priority === 'Low' ? styles.greenActive : styles.green}
                                    onClick={e => {
                                        e.preventDefault();
                                        onPriorityChange?.('Low');
                                    }}
                                >
                                    Low <img src="#" alt="Low" />
                                </button>
                            </div>
                        </fieldset>

                        <div className={styles.dropdownContainer}>
                            <Dropdown
                                label='Assignet to'
                                placeholder='Select contacts to assign'
                                subs={contacts}
                                selected={selectedContacts}
                                onSelect={onContactsChange}
                            />
                            <div className={styles.selectedContacts}>

                            </div>
                        </div>

                        <div className={styles.dropdownContainer}>
                            <Dropdown
                                label='Category'
                                placeholder='Select a task category'
                                subs={categoryOptions}
                                selected={selectedCategories}
                                onSelect={onCategoryChange}
                                required
                            />
                        </div>

                        <Input
                            id='subtasks'
                            name='subtasks'
                            label='Subtasks'
                            labelClassName={styles.label}
                            className={styles.input}
                            placeholder='Add a new subtask'
                            value={newSubtask}
                            onChange={e => setNewSubtask(e.target.value)}
                            onSymbolClick={addSubtask}
                            symbol='+'
                        />
                        <ul>
                            {subtasks.map((subtask, index) => (
                                <li key={index}>{subtask}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <span><span className={styles.red}>* </span>This field is required</span>
                    <div className={styles.addTaskButton}>
                        <Button
                            type='button'
                            className={styles.backroundNone}
                            onClick={clearForm}
                        >Clear X</Button>
                        <Button type='submit' disabled={selectedCategories.length < 0}>
                            Create Task <img src="src/assets/icons/check.svg" alt="Check" />
                        </Button>
                    </div>
                </div>
            </form>
            {showToast && <Toast content={toastMsg} />}

        </>
    )
}