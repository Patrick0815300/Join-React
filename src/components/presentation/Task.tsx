import Dropdown from '../UI/Dropdown';
import Input from '../UI/Input'
import styles from './Task.module.scss'

interface TaskProps {
    title: string;
    description: string;
    date: string;
    contacts: string[];
    category: string[];
    subtasks: string[];
    onTitleChange?: (newTitle: string) => void;
    onDescriptionChange?: (newDescription: string) => void;
    onDateChange?: (newDate: string) => void;
    onContactsChange?: (selectedContacts: string[]) => void;
    onCategoryChange?: (selectedCategories: string[]) => void;
    onSubtaskChange?: (selectedSubtasks: string[]) => void;
}

export function Task({ title, description, date, contacts, category, subtasks,
    onTitleChange, onDescriptionChange, onDateChange, onContactsChange, onCategoryChange, onSubtaskChange }: TaskProps) {
    return (
        <>
            <h1>Add Task</h1>

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
                            <button className={styles.red}>Urgent <img src="#" alt="Urgent" /></button>
                            <button className={styles.yellow}>Medium <img src="#" alt="Medium" /></button>
                            <button className={styles.green}>Low <img src="#" alt="Low" /></button>
                        </div>
                    </fieldset>

                    <Dropdown
                        label='Assignet to'
                        placeholder='Select contacts to assign'
                        subs={contacts}
                        onSelect={onContactsChange}
                    />

                    <Dropdown
                        label='Category'
                        placeholder='Select a task category'
                        subs={category}
                        onSelect={onCategoryChange}
                        required
                    />

                    <Input
                        id='subtasks'
                        name='subtasks'
                        label='Subtasks'
                        labelClassName={styles.label}
                        className={styles.input}
                        placeholder='Add a new subtask'
                        value={subtasks}
                        onChange={e => onSubtaskChange?.(e.target.value)}
                    />
                </div>

            </div>
        </>
    )
}