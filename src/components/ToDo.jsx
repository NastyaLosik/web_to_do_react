import React, { useState } from 'react';
import TaskInput from './TaskInput';
import TaskElement from './TaskElement';

function ToDo () {
    const [hasTasks, setHasTasks] = useState(false);
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);

    const addTask = (title, about) => {
        const newTask = { title, about };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setHasTasks(true);
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((task, i) => i !== index);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        if (updatedTasks.length === 0) {
            setHasTasks(false);
        }
    };

    return (
        <div>
            <TaskInput addTask={addTask} />
            {tasks.length > 0 ? (
                tasks.map((task, index) => (
                <TaskElement key={index} index={index} task={task} deleteTask={deleteTask} />
                ))
            ) : (
                <div className="main-container">
                    <div className="text-main-container">
                        <span>No tasks</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ToDo;
