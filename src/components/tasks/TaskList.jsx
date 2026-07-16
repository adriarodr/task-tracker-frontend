import { useState, useEffect } from 'react';
import { getTasks, addTasks, updateTask, deleteTasks } from '../../utils/api';

import Message from '../ui/Message';
import FormModal from '../ui/FormModal';

import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

import plusIcon from '../../assets/icons/plus-circle.svg';

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

  return (
    <section id='taskList'>
      <Message type='error' text={error} />

      <div className='task-actions'>
        <h2>All Tasks</h2>

        {/* ability to add a new task */}
        <button className='btn add-task' onClick={() => setAddModalOpen(true)}>
          <img src={plusIcon} alt='' className='icon' /> Add Task
        </button>
      </div>

      <FormModal
        isOpen={isAddModalOpen}
        onCancel={() => setAddModalOpen(false)}
        className='form-modal'
      >
        <h3>Add Task</h3>

        {isAddModalOpen && <TaskForm onSubmit={handleAddTask} />}
      </FormModal>

      {/* list of all the tasks */}
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
