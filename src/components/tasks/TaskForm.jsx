import { useState } from 'react';

import Message from '../ui/Message';

export default function TaskForm({ task, onSubmit }) {
  const initialTask = {
    title: task?.title ?? '',
    description: task?.description ?? '',
    dueDate: task?.dueDate?.slice(0, 10) ?? '',
    isCompleted: task?.isCompleted ?? false,
  };

  const [newTask, setNewTask] = useState(initialTask);
  const [error, setError] = useState('');

  const isSame =
    newTask.title === initialTask.title &&
    newTask.description === initialTask.description &&
    newTask.dueDate === initialTask.dueDate &&
    newTask.isCompleted === initialTask.isCompleted;

  const handleChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newTask.title) {
      setError('Please provide a title');
      return;
    }

    onSubmit(newTask);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      isCompleted: false,
    });
  };

  return (
    <>
      <Message type='error' text={error} />

      <form onSubmit={handleSubmit}>
        <label htmlFor='isCompleted'>
          Completed{' '}
          <input
            type='checkbox'
            name='isCompleted'
            id='isCompleted'
            checked={newTask.isCompleted}
            onChange={handleChange}
          />
        </label>

        <label htmlFor='title'>
          title{' '}
          <input
            type='text'
            name='title'
            id='title'
            value={newTask.title}
            onChange={handleChange}
          />
        </label>

        <label htmlFor='description'>
          description{' '}
          <textarea
            name='description'
            id='description'
            value={newTask.description}
            onChange={handleChange}
          />
        </label>

        <label htmlFor='dueDate'>
          Due Date{' '}
          <input
            type='date'
            name='dueDate'
            id='dueDate'
            value={newTask.dueDate}
            onChange={handleChange}
          />
        </label>

        <button type='submit' className='btn' disabled={isSame}>
          {task ? 'Update' : 'Add'} Task
        </button>
      </form>
    </>
  );
}
