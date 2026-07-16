import { useState } from 'react';

import AlertModal from '../ui/AlertModal';

import TaskList from '../tasks/TaskList';

export default function ProtectedLayout({ token, onReject }) {
  const [authError, setAuthError] = useState(false);

  const handleAuthError = () => {
    setAuthError(true);
  };

  const handleOnClose = () => {
    setAuthError(false);
    onReject();
  };

  return (
    <main>
      {!authError && (
        <div className='container'>
          <TaskList token={token} onAuthError={handleAuthError} />
        </div>
      )}

      {authError && (
        <AlertModal
          isOpen={authError}
          onClose={handleOnClose}
          message='Your login session has expired. Please log in again.'
        />
      )}
    </main>
  );
}
