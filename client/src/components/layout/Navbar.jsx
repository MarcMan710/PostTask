import { useAuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import ThemeToggle from '../common/ThemeToggle';

const Navbar = () => {
  const { user, logout } = useAuthContext();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">PostTask</h1>
      <ThemeToggle />
      {user ? (
        <div className="flex items-center gap-4">
          <span>{user.email}</span>
          <Button onClick={logout} className="bg-red-500 hover:bg-red-600">Logout</Button>
        </div>
      ) : (<Link to="/login" className="text-blue-500 hover:underline">Login</Link>)}
    </nav>
  );
};

export default Navbar
