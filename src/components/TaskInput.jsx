import React, { useState } from 'react';

function TaskInput({ addTask }){
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');

  const handleAddTask = () => {
    if (title && about) {
        addTask(title, about);
        setTitle('');
        setAbout('');
    } else {
        alert('Поля не должны быть пустыми.');
    }
  };

  return (
    <div className="task-input-container">
        <div className="input-container">
            <input placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input placeholder="About..." value={about} onChange={(e) => setAbout(e.target.value)}/>
        </div>
        <button onClick={handleAddTask}>+</button>
    </div>
  );
};

export default TaskInput;
