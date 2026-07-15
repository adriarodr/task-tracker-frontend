import { useState, useEffect, useCallback } from 'react';

import Modal from './ui/Modal';

// import task specific components
import TaskForm from './tasks/TaskForm';
import TaskList from './tasks/TaskList';

const apiUrl = import.meta.env.VITE_API_URL;

export default function TaskContainer({ token, onAuthError }) {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  // Stores the task items returned from the API
  const [tasks, setTasks] = useState([]);

  // Tracks whether the API request is still loading
  const [loading, setLoading] = useState(true);

  // Stores an error message if something goes wrong
  const [error, setError] = useState('');

  useEffect(() => {
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
        } else if (response.status == 401) {
          onAuthError();
        } else {
          console.log(result.message);
          setError(result.message);
        }
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [token, onAuthError]);

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
    <>
      {/* Add a new task */}
      <div id='update-task'>
        <button className='btn' onClick={() => setAddModalOpen(true)}>
          Add Task
        </button>
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          id='add-task-modal'
        >
          <p>Add task</p>
          <TaskForm onSuccess={handleAddTask} />
        </Modal>
      </div>

      <TaskList tasks={tasks} />

      {/* Update a task */}
      <div id='update-task'>
        <button className='btn' onClick={() => setUpdateModalOpen(true)}>
          Update Task
        </button>
        <Modal
          id='update-task'
          isOpen={isUpdateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
        >
          <p>Update Task</p>
          <TaskForm onSuccess={handleAddTask} />
        </Modal>
      </div>
    </>
  );
}
