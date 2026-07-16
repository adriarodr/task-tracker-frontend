import { useState, useEffect } from 'react';
import { getTasks, addTasks, updateTask, deleteTasks } from '../../utils/api';

import Message from '../ui/Message';
import Modal from '../ui/Modal';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

export default function TaskList({ token, onAuthError }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const result = await getTasks(token);
        setTasks(result);
      } catch (err) {
        if (err.status === 401) {
          onAuthError();
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, [token, onAuthError]);

  const handleAddTask = async (task) => {
    try {
      const response = await addTasks(token, task);
      setAddModalOpen(false);

      setTasks((prevTask) => [...prevTask, response.task]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, newTask) => {
    try {
      const response = await updateTask(token, id, newTask);

      const updated = response.updatedTask;

      setTasks(
        tasks.map((task) => {
          if (task._id === updated._id) {
            return updated;
          } else {
            return task;
          }
        }),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteTasks(token, id);
      const deletedTask = response.deletedTask;

      setTasks(tasks.filter((task) => task._id !== deletedTask._id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <Message type='error' text={error} />;
  }

  return (
    <section>
      <h2>All Tasks</h2>

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
          <TaskForm onSubmit={handleAddTask} />
        </Modal>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <TaskCard
              task={task}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
