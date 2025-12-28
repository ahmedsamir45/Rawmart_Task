import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-blue-600">Task Manager</Link>
                <div>
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600">Hi, {user.user?.name || user.name}</span>
                            <button onClick={logout} className="text-red-500 hover:text-red-700">Logout</button>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
                            <Link to="/register" className="text-blue-500 hover:text-blue-700">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
