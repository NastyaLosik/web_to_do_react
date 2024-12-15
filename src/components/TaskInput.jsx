import React, { useState } from 'react';

function TaskInput({onaddTask}){
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');

  function handleAddTask(){
    if (title && about) {
        onaddTask(title, about);
        setTitle('');
        setAbout('');
    } else {
        alert('Поля не должны быть пустыми.');
    }
  };

  return (
    <div className="task-input-container">
        <div className="input-container">
            <input className="title-input" placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input className="about-input" placeholder="About..." value={about} onChange={(e) => setAbout(e.target.value)}/>
        </div>
        <button className="add-button" onClick={handleAddTask}>+</button>
    </div>
  );
};

export default TaskInput;
