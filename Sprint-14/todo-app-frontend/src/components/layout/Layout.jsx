import { Outlet, Link, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../../hooks';
import { Button } from '../common';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/signin');
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link
                            to="/dashboard"
                            className="text-xl font-bold text-primary-600"
                        >
                            Todo App
                        </Link>

                        {/* Navigation */}
                        <nav className="flex items-center space-x-4">
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-primary-50 text-primary-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`
                                }
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-primary-50 text-primary-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`
                                }
                            >
                                Profile
                            </NavLink>
                        </nav>

                        {/* User Menu */}
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                                Welcome, <span className="font-medium">{user?.username}</span>
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <p className="text-center text-sm text-gray-500">
                        © 2026 Todo App. Built with React & Tailwind CSS.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
