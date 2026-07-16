import { useState } from 'react';
import { formatDate } from '../../utils/utils';

import Modal from '../ui/Modal';
import TaskForm from '../tasks/TaskForm';

import deleteIcon from '../../assets/icons/trash.svg';
import editIcon from '../../assets/icons/pencil.svg';

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  const handleModal = (newTask) => {
    setEditing(false);
    onUpdate(task._id, newTask);
  };

  return (
    <div>
      <Modal
        isOpen={editing}
        onClose={() => setEditing(false)}
        id='add-task-modal'
      >
        <TaskForm task={task} onSubmit={handleModal} />
      </Modal>

      {/* task card */}
      <div className='task-card'>
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        {task.dueDate && <p>Due at {formatDate(task.dueDate)}</p>}
        <p>{task.isCompleted ? 'Complete' : 'Not Complete'}</p>

        {/* Update a task */}
        <button className='btn' onClick={() => setEditing(true)}>
          <img src={editIcon} alt='Pencil Icon' className='icon' />
        </button>

        <button className='btn' onClick={() => onDelete(task._id)}>
          <img src={deleteIcon} alt='Trash Icon' className='icon' />
        </button>

        {task.updatedAt && <p>Last updated at {formatDate(task.updatedAt)}</p>}
      </div>
    </div>
  );
}
