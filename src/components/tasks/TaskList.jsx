import deleteIcon from '../../assets/icons/trash.svg';
import editIcon from '../../assets/icons/pencil.svg';

import { formatDate } from '../../utils/utils';

export default function TaskList({ tasks }) {
  return (
    <div>
      <section>
        <h2>All Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <div className='task-item'>
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
                {task.dueDate && <p>Due at {formatDate(task.dueDate)}</p>}
                <p>{task.isCompleted ? 'Complete' : 'Not Complete'}</p>

                <div className='task-actions'>
                  <button className='btn'>
                    <img src={editIcon} alt='Pencil Icon' className='icon' />
                  </button>

                  <button className='btn'>
                    <img src={deleteIcon} alt='Trash Icon' className='icon' />
                  </button>
                </div>
                {task.updatedAt && (
                  <p>Last updated at {formatDate(task.updatedAt)}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
