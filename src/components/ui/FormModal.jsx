import Modal from './Modal';

import closeIcon from '../../assets/icons/x-circle.svg';

export default function FormModal({ isOpen, onCancel, className, children }) {
  return (
    <Modal isOpen={isOpen} className={className}>
      <button className='cancel-btn' onClick={onCancel} aria-label='Cancel'>
        <img src={closeIcon} alt='Close Icon' className='icon' />
      </button>
      {children}
    </Modal>
  );
}
