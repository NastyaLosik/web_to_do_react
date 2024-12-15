import React, { useState } from 'react';
import TaskInput from './TaskInput';
import Task from './Task';
import DeleteTask from './deleteTask'; 
import { getTasks, saveTasks } from './storage';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

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

    function onDragEnd(result) {
        if (!result.destination) return;

        const updatedTasks = Array.from(tasks);
        const [removed] = updatedTasks.splice(result.source.index, 1);
        updatedTasks.splice(result.destination.index, 0, removed);

        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    }


    return (
        <div className="page">
            <TaskInput onaddTask={handleAddTask} />
            {tasks.length > 0 ? (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="taskList">
                        {(provided) => (
                            <div className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
                                {tasks.map((task, index) => (
                                    <Task 
                                        key={index} 
                                        index={index} 
                                        task={task} 
                                        deleteTasks={confirmDeleteTask} 
                                        editTask={handleEditTask} 
                                    />
                                ))}
                                
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
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