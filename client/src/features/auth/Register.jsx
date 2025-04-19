import { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

const Register = () => {
  const { register } = useAuthContext();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <Input
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
      <Button type="submit" className="w-full">Register</Button>      
      <p className="text-center">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
    </form>
  );
};

export default Register;
