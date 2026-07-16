import { useState } from 'react';

import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';

export default function PublicLayout({ onLogin }) {
  const [isRegister, setRegister] = useState(true);

  const handleToggle = () => {
    setRegister((prev) => !prev);
  };

  return (
    <main>
      <button onClick={handleToggle} className='btn'>
        {isRegister ? 'Register' : 'Login'}
      </button>

      {isRegister ? <RegisterForm /> : <LoginForm onSuccess={onLogin} />}
    </main>
  );
}
