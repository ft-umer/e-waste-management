import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Bike } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const RiderLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Call your rider login endpoint
      const { data } = await axios.post(
        'https://backend-e-waste.vercel.app/api/riders/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // 2. Persist token + userType
      localStorage.setItem('token', data.token);
      localStorage.setItem('userType', 'rider');
      
      window.dispatchEvent(new Event('authChange')); // Trigger update for header
      

      // 4. Redirect to rider dashboard
      navigate('/rider/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : 'Failed to sign in. Please check your credentials.';
      alert(errorMessage);
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
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Bike className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Rider Login</h1>
            <p className="text-gray-600 mt-2">Sign in to your rider account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              startIcon={<Mail className="h-5 w-5" />}
              fullWidth
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              startIcon={<Lock className="h-5 w-5" />}
              fullWidth
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>

              <Link
                to="/rider/forgot-password"
                className="text-sm text-green-600 hover:text-green-500"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              icon={<Bike className="h-5 w-5" />}
            >
              Sign In as Rider
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have a rider account?{' '}
            <Link
              to="/rider/signup"
              className="text-green-600 hover:text-green-500 font-medium"
            >
              Sign up as rider
            </Link>
          </p>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Looking to recycle e-waste?{' '}
              <Link
                to="/signin"
                className="text-green-600 hover:text-green-500 font-medium"
              >
                Sign in as user
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RiderLoginPage;
