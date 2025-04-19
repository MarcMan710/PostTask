import Register from '../features/auth/Register';
import AuthPageLayout from '../features/auth/AuthPageLayout';

const RegisterPage = () => {
  return (
    <AuthPageLayout>
      <Register />
    </AuthPageLayout>
  );
};

export default RegisterPage;
