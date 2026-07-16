import { useCallback, useState } from 'react';

import Modal from '../ui/Modal';

import TaskList from '../tasks/TaskList';

export default function ProtectedLayout({ token, onReject }) {
  const [authError, setAuthError] = useState(false);

  const handleAuthError = useCallback(() => {
    setAuthError(true);
  }, []);

  return (
    <>
      {!authError && (
        <div className='container'>
          <TaskList token={token} onAuthError={handleAuthError} />
        </div>
      )}

      {authError && (
        <Modal
          isOpen={authError}
          onClose={() => {
            onReject();
            setAuthError(false);
          }}
        >
          <p>Your log session has expired. Please logged in.</p>
        </Modal>
      )}
    </>
  );
}
