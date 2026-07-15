import { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, children }) {
  const dialogRef = useRef();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className='modal'>
      <button className='cancel-btn' onClick={onClose}>
        Ok
      </button>

      <div>{children}</div>
    </dialog>
  );
}
