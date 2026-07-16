import { useState } from 'react';
import { formatDate } from '../../utils/utils';

import FormModal from '../ui/FormModal';
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
    <>
      <FormModal
        isOpen={editing}
        onCancel={() => setEditing(false)}
        className='form-modal'
      >
        <h3>Update Task</h3>

        {editing && <TaskForm task={task} onSubmit={handleModal} />}
      </FormModal>

      {/* task card */}
      <article className='task-card'>
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        {task.dueDate && (
          <p>
            Due at <span className='bold'>{formatDate(task.dueDate)}</span>
          </p>
        )}
        <p>{task.isCompleted ? 'Complete' : 'Not Complete'}</p>

        <div className='task-card-btns'>
          <button className='btn' onClick={() => setEditing(true)}>
            <img src={editIcon} alt='Pencil Icon' className='icon' />
          </button>

          <button className='btn' onClick={() => onDelete(task._id)}>
            <img src={deleteIcon} alt='Trash Icon' className='icon' />
          </button>
        </div>

        {task.updatedAt && <p>Last updated at {formatDate(task.updatedAt)}</p>}
      </article>
    </>
  );
}
