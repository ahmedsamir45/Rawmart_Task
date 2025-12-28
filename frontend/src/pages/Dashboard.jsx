import { useState, useEffect } from 'react';
import api from '../api/axios';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/tasks/?page=${page}&per_page=5`);
            if (response.data.tasks) {
                setTasks(response.data.tasks);
                setTotalPages(response.data.pages);
            } else {
                // Handle non-paginated response gracefully if needed
                setTasks(response.data);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [page]);

    const handleCreateTask = async (taskData) => {
        try {
            await api.post('/tasks/', taskData);
            fetchTasks();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleUpdateTask = async (taskData) => {
        if (!editingTask) return;
        try {
            await api.put(`/tasks/${editingTask.id}`, taskData);
            setEditingTask(null);
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">My Tasks</h1>

            <TaskForm
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                initialData={editingTask || {}}
                onCancel={() => setEditingTask(null)}
            />

            {loading ? (
                <p>Loading tasks...</p>
            ) : (
                <div className="space-y-4">
                    {tasks.length === 0 ? (
                        <p className="text-gray-500 text-center">No tasks found. Create one above!</p>
                    ) : (
                        tasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onEdit={setEditingTask}
                                onDelete={handleDeleteTask}
                            />
                        ))
                    )}

                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-6">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
                            >
                                Previous
                            </button>
                            <span className="px-3 py-1">Page {page} of {totalPages}</span>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
