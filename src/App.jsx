import { useState } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import ProtectedLayout from './components/layout/ProtectedLayout';
import PublicLayout from './components/layout/PublicLayout';

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
    <>
      <Header token={token} onLogout={handleReset} />

      {!token && <PublicLayout onLogin={handleLogin} />}

      {token && <ProtectedLayout token={token} onReject={handleReset} />}

      <Footer />
    </>
  );
}

export default App;
