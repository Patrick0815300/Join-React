import { getTime, getUrgentDate } from '../../utils/date';
import type { Task } from '../containers/DashboardContainer';
import './Dashboard.modules.scss'

interface DashboardProps {
    todos: Task[];
    inProgress: Task[];
    awaitFeedback: Task[];
    done: Task[];
    nextUrgent: Task | null;
    name: string
}

export function Dashboard({ todos, inProgress, awaitFeedback, done, nextUrgent, name }: DashboardProps) {

    const countAllTasks = (): number => {
        const count = todos.length + inProgress.length + awaitFeedback.length + done.length;
        return count
    }

    return (
        <>
            <header>
                <h1>Join 360</h1>
                <span className='description'>Key Metrics at a Glance</span>
            </header>
            <div className="container">
                <div className="card-container">
                    <div className="single-row row-1">
                        <div className="card">
                            <img className='icon' src="#" alt="icon" />
                            <div>
                                <span className="count">{todos.length}</span>
                                <span className='category'>To Do</span>
                            </div>
                        </div>
                        <div className="card">
                            <img className='icon' src="#" alt="icon" />
                            <div>
                                <span className="count">{done.length}</span>
                                <span className='category'>Done</span>
                            </div>
                        </div>
                    </div>

                    <div className="single-row row-2">
                        <div className="card">
                            <img className='icon' src="#" alt="icon" />
                            <div>
                                <span className="count"></span>
                                <span className='category'>Urgent</span>
                            </div>
                            <div>
                                <span className="date">
                                    {nextUrgent ? getUrgentDate(nextUrgent.due_date) : 'No Urgent Task available'}
                                </span>
                                <span>Upcoming Deadline</span>
                            </div>
                        </div>
                    </div>

                    <div className="single-row row-3">
                        <div className="card">
                            <div>
                                <span className="count">{countAllTasks()}</span>
                                <span className='category'>Task in Board</span>
                            </div>
                        </div>
                        <div className="card">
                            <div>
                                <span className="count">{inProgress.length}</span>
                                <span className='category'>Tasks in Progress</span>
                            </div>
                        </div>
                        <div className="card">
                            <div>
                                <span className="count">{awaitFeedback.length}</span>
                                <span className='category'>Awaiting Feedback</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-container">
                    <span className="greeting">{getTime()}</span>
                    <span className="name">{name}</span>
                </div>
            </div>
        </>
    )
}