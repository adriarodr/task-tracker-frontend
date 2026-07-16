import { useEffect, useRef } from 'react';

export default function Modal({ isOpen, className, children }) {
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
    <dialog ref={dialogRef} className={`modal ${className}`}>
      {children}
    </dialog>
  );
}
