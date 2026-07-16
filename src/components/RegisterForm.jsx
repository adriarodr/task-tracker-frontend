import { useState } from 'react';

import Message from './ui/Message';

const apiUrl = import.meta.env.VITE_API_URL;

export default function RegisterForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

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
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Signup successful. You can now log in.',
        });
      } else {
        const result = await response.json();

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
      setUser({
        name: '',
        email: '',
        password: '',
      });
    }
  };

  return (
    <div className='form-container'>
      <h2>Welcome</h2>

      {message && <Message type={message.type} text={message.text} />}

      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>
          Name <span className='required'>*</span>
        </label>
        <input
          type='text'
          name='name'
          id='name'
          value={user.name}
          onChange={handleChange}
          placeholder='John Smith'
        />

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

        <button type='submit' className='btn' disabled={pending}>
          {pending ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
