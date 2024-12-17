import React, { useState } from 'react';
import TaskInput from './TaskInput';
import Task from './Task';
import DeleteTask from './deleteTask'; 
import { getTasks, saveTasks } from './storage';

function MainPage() {
    const [tasks, setTasks] = useState(getTasks() || []); 
    const [deleteIndex, setDeleteIndex] = useState(null); 
    const [showDelete, setShowDelete] = useState(false); 

    function handleEditTask(index, updatedTask) {
        const updatedTasks = [...tasks];
        updatedTasks[index] = updatedTask; 
        setTasks(updatedTasks);
        saveTasks(updatedTasks); 
    }

    function handleAddTask(title, about) {
        const newTask = { title, about };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    }

    function confirmDeleteTask(index) {
        setDeleteIndex(index);
        setShowDelete(true);
    }

    function handleDeleteConfirmed() {
        const updatedTasks = tasks.filter((_, i) => i !== deleteIndex);
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
        setShowDelete(false);
        setDeleteIndex(null);
    }

    function handleDeleteCancelled() {
        setShowDelete(false);
        setDeleteIndex(null);
    }

    function handleDragStart(e, index) {
        e.dataTransfer.setData("text/plain", index);
        e.dataTransfer.effectAllowed = "move";
    }

    function handleDrop(e) {
        e.preventDefault();
        const draggedIndex = e.dataTransfer.getData("text/plain");
        const dropIndex = e.target.closest('.task-element')?.dataset.index;
        if (dropIndex !== undefined && draggedIndex !== dropIndex) {
            const updatedTasks = [...tasks];
            const fromIndex = parseInt(draggedIndex, 10);
            const toIndex = parseInt(dropIndex, 10);
            if (fromIndex !== toIndex) {
                const [removed] = updatedTasks.splice(fromIndex, 1);
                updatedTasks.splice(toIndex, 0, removed);
                setTasks(updatedTasks);
                saveTasks(updatedTasks);
            }
        }
    }

    function allowDrop(e) {
        e.preventDefault();  
    }

    return (
        <div className="page">
            <TaskInput onaddTask={handleAddTask} />
            {tasks.length > 0 ? (
                <div className="task-list" onDragOver={allowDrop} onDrop={handleDrop}>
                    {tasks.map((task, index) => (
                        <Task index={index} task={task} deleteTasks={confirmDeleteTask} editTask={handleEditTask} handleDragStart={handleDragStart}/>
                    ))}
                </div>
            ) : (
                <div className="main-container">
                    <div className="text-main-container">
                        <span>No tasks</span>
                    </div>
                </div>
            )}
            {showDelete && (
                <DeleteTask 
                    onConfirm={handleDeleteConfirmed}
                    onCancel={handleDeleteCancelled}
                />
            )}
        </div>
    );
}

export default MainPage;