import React, { useState } from 'react';

function TaskElement ({ index, task, deleteTask }) {
    const [showEditMenu, setShowEditMenu] = useState(false);

    const handleDelete = () => {
        deleteTask(index);
    };

    const toggleEditMenu = () => {
        setShowEditMenu(!showEditMenu);
    };

    return (
        <div className="task-element">
            <div className="task-container" onClick={toggleEditMenu}>
                <div className="task-container-text">
                    <h3>{task.title}</h3>
                    <p>{task.about}</p>
                </div>
                <button className="delete-button" onClick={handleDelete}>x</button>
            </div>
            {showEditMenu && (
                <div className="edit-menu">
                    <button>Share</button>
                    <button>i</button>
                    <button>Edit</button>
                </div>
            )}
        </div>
    );
};

export default TaskElement;
