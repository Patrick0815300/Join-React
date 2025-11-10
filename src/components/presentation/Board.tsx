import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Task } from "../../types/Task";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { TaskCardSmall } from '../UI/TaskCardSmall';
import styles from './Board.module.scss'
import { TaskContainer } from "../containers/TaskContainer";
import React from 'react';
import { updateData } from "../../api/supabase/data";
import { TaskCardBig } from "../UI/TaskCardBig";

interface TaskProps {
    todos: Task[];
    done: Task[];
    inProgress: Task[];
    awaitFeedback: Task[];
}

export function Board({ todos, done, inProgress, awaitFeedback }: TaskProps) {
    const columnMapping = {
        'To Do': 'todo',
        'In Progress': 'inProgress',
        'Await Feedback': 'awaitFeedback',
        'Done': 'done',
    };

    // State für Columns - wird mit Props initialisiert und bei Änderungen synchronisiert
    const [columns, setColumns] = useState({
        'To Do': todos,
        'In Progress': inProgress,
        'Await Feedback': awaitFeedback,
        'Done': done,
    });

    const [showAddTask, setShowAddTask] = useState(false);
    const addTaskRef = useRef<HTMLDivElement>(null);
    const taskCardRef = useRef<HTMLDivElement>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showBigCard, setShowBigCard] = useState(false)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    // Synchronisiere State mit Props wenn sich Props ändern
    useEffect(() => {
        setColumns({
            'To Do': todos,
            'In Progress': inProgress,
            'Await Feedback': awaitFeedback,
            'Done': done,
        });
    }, [todos, inProgress, awaitFeedback, done]);

    // Table Array basierend auf State
    const table = [
        { title: 'To Do', tasks: columns['To Do'] },
        { title: 'In Progress', tasks: columns['In Progress'] },
        { title: 'Await Feedback', tasks: columns['Await Feedback'] },
        { title: 'Done', tasks: columns['Done'] },
    ];

    // Click Outside Handler für AddTask + BigCard Overlay
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                addTaskRef.current &&
                !addTaskRef.current.contains(event.target as Node) ||
                taskCardRef.current &&
                !taskCardRef.current.contains(event.target as Node)
            ) {
                setShowAddTask(false);
                handleCloseBigCard();
            }
        };
        if (showAddTask || showBigCard) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showAddTask, showBigCard]);

    const addTask = () => {
        setShowAddTask(prevState => !prevState);
    }

    // Drag Start - speichert Task ID und Source Column
    const handleDragStart = (
        event: React.DragEvent<HTMLDivElement>,
        taskId: string,
        sourceColumn: string
    ) => {
        event.dataTransfer.setData('taskId', taskId);
        event.dataTransfer.setData('sourceColumn', sourceColumn);
    };

    // Drag Over - erlaubt das Ablegen
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    // Drop - verschiebt die Task in die neue Column
    const handleDrop = async (
        event: React.DragEvent<HTMLDivElement>,
        targetColumn: string
    ) => {
        event.preventDefault();

        const taskId = event.dataTransfer.getData('taskId');
        const sourceColumn = event.dataTransfer.getData('sourceColumn');

        // Wenn Source und Target gleich sind, nichts tun
        if (sourceColumn === targetColumn) return;

        // Finde die Task in der Source Column
        const task = columns[sourceColumn as keyof typeof columns].find(
            (t: Task) => t.id === taskId
        );

        if (!task) return;

        setColumns({
            ...columns,
            [sourceColumn]: columns[sourceColumn as keyof typeof columns].filter(
                (t: Task) => t.id !== taskId
            ),
            [targetColumn]: [...columns[targetColumn as keyof typeof columns], task],
        });

        try {
            const dbColumnName = columnMapping[targetColumn as keyof typeof columnMapping]
            await updateData('tasks', 'phase', dbColumnName, taskId);
        } catch (error) {
            console.error('Update failed, rolling back:', error);
            setColumns({
                ...columns,
                [targetColumn]: columns[targetColumn as keyof typeof columns].filter(
                    (t: Task) => t.id !== taskId
                ),
                [sourceColumn]: [...columns[sourceColumn as keyof typeof columns], task],
            });
        }
    };

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
    };

    const displayData = useMemo(() => {
        if (searchQuery.length >= 3) {
            const lowerQuery = searchQuery.trim().toLowerCase();
            return table.map(category => ({
                ...category,
                tasks: category.tasks.filter(task =>
                    task.title?.toLowerCase().includes(lowerQuery)
                )
            }));
        }
        return table;
    }, [searchQuery, table]);

    const openBigCard = (task: Task) => {
        setSelectedTask(task);
        setShowBigCard(true);
    };

    const handleCloseBigCard = () => {
        setSelectedTask(null);
        setShowBigCard(false);
    }


    return (
        <>
            <div className={styles.top}>
                <h1>Board</h1>
                <div className={styles.search}>
                    <Input
                        placeholder="Find Task"
                        value={searchQuery}
                        onChange={handleInput}
                    />
                    <Button onClick={addTask}>Add Task +</Button>
                </div>
            </div>

            <div className={styles.table}>
                {displayData.map(({ title, tasks }) => (
                    <div
                        key={title}
                        className={styles.column}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, title)}
                    >
                        <div className={styles.phase}>
                            <h2>{title}</h2>
                            <button className={styles.addTaskBtn} onClick={addTask}>+</button>
                        </div>

                        {tasks.length === 0 ? (
                            <span className={styles.noTask}>No Tasks {title}</span>
                        ) : (
                            tasks.map((task) => (
                                <div className={styles.draggable}
                                    key={task.id}
                                    draggable={true}
                                    onDragStart={(e) => handleDragStart(e, task.id, title)}
                                    style={{ cursor: 'grab' }}
                                    onClick={() => openBigCard(task)}
                                >
                                    <TaskCardSmall
                                        taskId={task.id}
                                        category={task.category}
                                        title={task.title}
                                        description={task.description}
                                        subtasks={task.subtasks}
                                        assigned_to={task.assigned_to}
                                        priority={task.priority}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                ))}
            </div>

            {showAddTask && (
                <div className={styles.overlay}>
                    <div ref={addTaskRef} className={styles.overlayAddTask}>
                        <TaskContainer />
                    </div>
                </div>
            )}

            {showBigCard && selectedTask && (
                <div className={styles.overlay}>
                    <div ref={taskCardRef} className={styles.overlayTaskCard}>
                        <TaskCardBig
                            taskId={selectedTask.id}
                            category={selectedTask.category}
                            title={selectedTask.title}
                            description={selectedTask.description}
                            subtasks={selectedTask.subtasks}
                            assigned_to={selectedTask.assigned_to}
                            priority={selectedTask.priority}
                            due_date={selectedTask.due_date}
                            onClose={handleCloseBigCard}
                        />
                    </div>
                </div>
            )}

        </>
    )
}
