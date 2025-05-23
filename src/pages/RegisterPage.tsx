import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { signUp } from '../services/auth';
import { toast } from 'react-toastify';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await signUp(
        formData.email,
        formData.password,
        formData.name,
        formData.address,
        formData.phone
      );

      if (response?.token) {
        // ✅ Dispatch the custom auth change event
        window.dispatchEvent(new Event('authChange'));
        navigate('/signin');
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Registration failed. Please try again.'
      );
      setErrorMessage(error?.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 flex-grow flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Create an Account</h1>
            <p className="text-gray-600 mt-2">Join our e-waste recycling community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <p className="text-red-600 text-sm text-center">{errorMessage}</p>
            )}
            <div>
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                startIcon={<User className="h-5 w-5" />}
                fullWidth
              />
            </div>

            <div>
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                startIcon={<Mail className="h-5 w-5" />}
                fullWidth
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                startIcon={<Lock className="h-5 w-5" />}
                fullWidth
              />
            </div>

            <div>
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                startIcon={<Lock className="h-5 w-5" />}
                fullWidth
              />
            </div>

            <div>
              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                startIcon={<Phone className="h-5 w-5" />}
                fullWidth
              />
            </div>

            <div>
              <Input
                label="Address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                startIcon={<MapPin className="h-5 w-5" />}
                fullWidth
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="text-green-600 hover:text-green-500 font-medium">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
