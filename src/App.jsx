import { useState } from 'react';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProtectedLayout from './components/layout/ProtectedLayout';

const tokenKey = import.meta.env.VITE_TOKEN_KEY;

function App() {
  const [token, setToken] = useState(localStorage.getItem(tokenKey));

  const handleLogin = (newToken) => {
    localStorage.setItem(tokenKey, newToken);
    setToken(newToken);
  };

  const handleReset = () => {
    localStorage.removeItem(tokenKey);
    setToken(null);
  };

  return (
    <main>
      {!token && (
        <div className='container'>
          <RegisterForm />
          <LoginForm onSuccess={handleLogin} />
        </div>
      )}

      {token && (
        <ProtectedLayout
          token={token}
          onLogout={handleReset}
          onReject={handleReset}
        />
      )}
    </main>
  );
}

export default App;
