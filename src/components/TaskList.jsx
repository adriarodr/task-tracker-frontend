import { useCallback, useEffect, useState } from 'react';

import { formatDate } from '../utils/utils';

import TaskForm from './tasks/TaskForm';

import deleteIcon from '../assets/icons/trash.svg';
import editIcon from '../assets/icons/pencil.svg';

const apiUrl = import.meta.env.VITE_API_URL;

export default function TaskList() {
  // Stores the task items returned from the API
  const [tasks, setTasks] = useState([]);

  // Tracks whether the API request is still loading
  const [loading, setLoading] = useState(true);

  // Stores an error message if something goes wrong
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function fetchTasks() {
      try {
        const response = await fetch(`${apiUrl}/api/tasks`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (response.ok) {
          setTasks(result);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  const handleAddTask = useCallback((newTask) => {
    setTasks((prevTask) => [...prevTask, newTask]);
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <section>
        <h2>Add Tasks</h2>

        <TaskForm onSuccess={handleAddTask} />
      </section>
      <section>
        <h2>All Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <div className='task-item'>
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
                {task.dueDate && <p>Due at {formatDate(task.dueDate)}</p>}
                <p>{task.isCompleted ? 'Complete' : 'Not Complete'}</p>

                <div className='task-actions'>
                  <button className='btn'>
                    <img src={editIcon} alt='Pencil Icon' className='icon' />
                  </button>

                  <button className='btn'>
                    <img src={deleteIcon} alt='Trash Icon' className='icon' />
                  </button>
                </div>
                {task.updatedAt && (
                  <p>Last updated at {formatDate(task.updatedAt)}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
