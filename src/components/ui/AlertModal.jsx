import Modal from './Modal';

export default function AlertModal({ isOpen, onClose, message }) {
  return (
    <Modal isOpen={isOpen}>
      <p>{message}</p>
      <button onClick={onClose} className='btn'>
        OK
      </button>
    </Modal>
  );
}
