import { Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'

const NotFound = () => {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-6 text-gray-600">The page you're looking for doesn't exist.</p>
        <Link to="/" className="text-blue-500 hover:underline">Go back home</Link>
      </div>
    </PageLayout>
  )
}

export default NotFound
