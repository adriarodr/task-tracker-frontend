import { useState } from 'react';

export default function LoginForm({ onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${apiUrl}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          dueDate,
          isCompleted,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);
        onSuccess(result.task);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>
          title{' '}
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label htmlFor='description'>
          description{' '}
          <textarea
            name='description'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label htmlFor='dueDate'>
          Due Date{' '}
          <input
            type='date'
            name='dueDate'
            id='dueDate'
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        <label htmlFor='isCompleted'>
          Completed{' '}
          <input
            type='checkbox'
            name='isCompleted'
            id='isCompleted'
            value={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
        </label>

        <button type='submit' className='form-btn'>
          Add Task
        </button>
      </form>
    </div>
  );
}
