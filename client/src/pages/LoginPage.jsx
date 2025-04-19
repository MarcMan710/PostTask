import Login from '../features/auth/Login';
import AuthPageLayout from '../features/auth/AuthPageLayout';

const LoginPage = () => {
  return (
    <AuthPageLayout>
      <Login />
    </AuthPageLayout>
  );
};

export default LoginPage;
