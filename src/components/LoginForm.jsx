import { useState } from 'react';

import Message from './ui/Message';

const apiUrl = import.meta.env.VITE_API_URL;

export default function LoginForm({ onSuccess }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setMessage({
      type: '',
      text: '',
    });

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();

      if (response.ok) {
        onSuccess(result.token);
        setUser({
          email: '',
          password: '',
        });
      } else {
        setMessage({
          type: 'error',
          text: result.message,
        });
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.message,
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <h2>Welcome Back</h2>

      {message && <Message type={message.type} text={message.text} />}

      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>
          Email Address <span className='required'>*</span>
        </label>
        <input
          type='email'
          name='email'
          id='email'
          value={user.email}
          onChange={handleChange}
          placeholder='example@email.com'
        />

        <label htmlFor='password'>
          Password <span className='required'>*</span>
        </label>
        <input
          type='password'
          name='password'
          id='password'
          value={user.password}
          onChange={handleChange}
        />

        <button type='submit' className='btn'>
          {pending ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </>
  );
}
