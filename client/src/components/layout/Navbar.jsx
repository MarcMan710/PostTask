import { useAuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import Button from '../common/Button'

const Navbar = () => {
  const { user, logout } = useAuthContext()

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow-sm">
      <h1 className="text-xl font-semibold">Taskify</h1>
      {user ? (
        <div className="flex items-center gap-4">
          <span>{user.email}</span>
          <Button onClick={logout} className="bg-red-500 hover:bg-red-600">
            Logout
          </Button>
        </div>
      ) : (
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      )}
    </nav>
  )
}
export default Navbar
