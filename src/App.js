import './App.css';
import { useState } from 'react';
import logo from './logo-4.svg';


function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (!task.trim()) { return; }
    setTasks([...tasks, { id: Date.now(), text: task, status: false }]);
    setTask('');
  }

  const completeTask = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, status: true } : t
    ));
  }

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return t.status === false;
    if (filter === 'completed') return t.status === true;
    return true;
  });

  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="logo" className="app-logo" />
        <h1 className='head'>ToDo LIST</h1>
      </div>
      
      <input className='input' type="text" placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') addTask(); }}
      />
      <button className='addbtn' onClick={addTask}>Add Task</button>

      <div className="filterbtns">
        <button className="allbtn" onClick={() => setFilter('all')}>All Tasks</button>
        <button className="penbtn" onClick={() => setFilter('pending')}>Pending</button>
        <button className="combtn" onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <div className="list">
        {filteredTasks.map(t => (
          <div className="tasks" key={t.id}
            style={t.status ? { opacity: 0.6, textDecoration: 'line-through' } : {}}>
            {t.text}
            <div className="btns">
              <button className="completebtn" onClick={() => completeTask(t.id)}>✔</button>
              <button className="rmbtn" onClick={() => setTasks(tasks.filter(task => task.id !== t.id))}>X</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;