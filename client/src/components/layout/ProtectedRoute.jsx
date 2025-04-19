import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}
export default ProtectedRoute
