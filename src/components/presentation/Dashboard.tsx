import { getTime, getUrgentDate } from '../../utils/date';
import type { Task } from '../containers/DashboardContainer';
import Pen from '../../assets/icons/pen.svg?react';
import Check from '../../assets/icons/check.svg?react';
import styles from './Dashboard.module.scss'

interface DashboardProps {
    todos: Task[];
    inProgress: Task[];
    awaitFeedback: Task[];
    done: Task[];
    nextUrgent: Task | null;
    name: string,
    countUrgent: number;
}

export function Dashboard({ todos, inProgress, awaitFeedback, done, nextUrgent, name, countUrgent }: DashboardProps) {

    const countAllTasks = (): number => {
        const count = todos.length + inProgress.length + awaitFeedback.length + done.length;
        return count
    }

    return (
        <>
            <header className={styles.header}>
                <h1>Join 360</h1>
                <span className={styles.description}>Key Metrics at a Glance</span>
            </header>
            <div className={styles.container}>
                <div className={styles.cardContainer}>
                    <div className={styles.singleRow}>
                        <div className={styles.card}>
                            <Pen className={styles.icon} />
                            <div>
                                <span className={styles.count}>{todos.length}</span>
                                <span className={styles.category}>To Do</span>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <Check className={styles.icon} />
                            <div>
                                <span className={styles.count}>{done.length}</span>
                                <span className={styles.category}>Done</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.singleRow}>
                        <div className={styles.card}>
                            <img className={`${styles.icon} ${styles.urgent}`} src="src/assets/icons/urgent.svg" alt="icon" />
                            <div>
                                <span className={styles.count}>{countUrgent}</span>
                                <span className={styles.category}>Urgent</span>
                            </div>
                            <div>
                                <span className={styles.date}>
                                    {nextUrgent ? getUrgentDate(nextUrgent.due_date) : 'No Urgent Task available'}
                                </span>
                                <span>Upcoming Deadline</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.singleRow}>
                        <div className={styles.card}>
                            <div>
                                <span className={styles.count}>{countAllTasks()}</span>
                                <span className={styles.category}>Task in Board</span>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div>
                                <span className={styles.count}>{inProgress.length}</span>
                                <span className={styles.category}>Tasks in Progress</span>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div>
                                <span className={styles.count}>{awaitFeedback.length}</span>
                                <span className={styles.category}>Awaiting Feedback</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.userContainer}>
                    <span className={styles.greeting}>{getTime()}</span>
                    <span className={styles.name}>{name}</span>
                </div>
            </div >
        </>
    )
}