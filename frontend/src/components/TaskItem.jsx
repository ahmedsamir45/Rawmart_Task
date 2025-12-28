import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid'; // Note: Heroicons might need install or use text

const TaskItem = ({ task, onEdit, onDelete, onStatusChange }) => {
    return (
        <div className="bg-white p-4 rounded shadow flex justify-between items-center border-l-4 border-blue-500">
            <div>
                <h3 className={`font-bold text-lg ${task.status === 'done' ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                </h3>
                <p className="text-gray-600">{task.description}</p>
                <span className={`text-xs px-2 py-1 rounded mt-2 inline-block ${task.status === 'done' ? 'bg-green-100 text-green-800' :
                        task.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                    }`}>
                    {task.status.replace('_', ' ')}
                </span>
            </div>
            <div className="flex gap-2">
                <button onClick={() => onEdit(task)} className="text-blue-500 hover:text-blue-700 p-2">
                    Edit
                </button>
                <button onClick={() => onDelete(task.id)} className="text-red-500 hover:text-red-700 p-2">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
