import Dropdown from '../UI/Dropdown';
import Input from '../UI/Input'
import styles from './Task.module.scss'

interface TaskProps {
    title: string;
    description: string;
    date: string
}

export function Task({ title, description, date }: TaskProps) {
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
                    />

                    <div className={styles.textarea}>
                        <label className={styles.label} htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder='Enter a Description'
                            value={description}
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
                        subs={['Test 1', 'Test 2', 'Test 3']}
                    />
                </div>

            </div>
        </>
    )
}