import Modal from './Modal';

import closeIcon from '../../assets/icons/x-circle.svg';

export default function FormModal({ isOpen, onCancel, children }) {
  return (
    <Modal isOpen={isOpen}>
      <button className='btn' onClick={onCancel}>
        <img src={closeIcon} alt='Close Icon' className='icon' /> Cancel
      </button>
      {children}
    </Modal>
  );
}
