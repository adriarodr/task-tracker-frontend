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
        <h3>Edit Task</h3>

        {editing && <TaskForm task={task} onSubmit={handleModal} />}
      </FormModal>

      {/* task card */}
      <article className='task-card'>
        <div className='container'>
          <h3>{task.title}</h3>

          <div className='task-card-btns'>
            <button
              className='btn'
              onClick={() => setEditing(true)}
              aria-label='Edit Task'
            >
              <img src={editIcon} alt='' className='icon' />
            </button>

            <button
              className='btn'
              onClick={() => onDelete(task._id)}
              aria-label='Delete Task'
            >
              <img src={deleteIcon} alt='' className='icon' />
            </button>
          </div>
        </div>
        <p>{task.isCompleted ? 'Complete' : 'Not Complete'}</p>
        {task.dueDate && (
          <p>
            Due at <span className='bold'>{formatDate(task.dueDate)}</span>
          </p>
        )}

        {task.description && <p>{task.description}</p>}

        {task.updatedAt && <p>Last updated at {formatDate(task.updatedAt)}</p>}
      </article>
    </>
  );
}
