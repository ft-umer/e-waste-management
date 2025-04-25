import axios from 'axios';
const API_URL = 'http://localhost:3000/api/auth';

export const signIn = async (email: string, password: string) => {
  console.log("Sending to backend:", { email, password });

  try {
    const res = await axios.post(`${API_URL}/login`, { email, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const { token, user } = res.data;
    localStorage.setItem('token', token); // Save token to localStorage
    return user;
  } catch (error: any) {
    console.error('Sign in error:', error.response?.data); // Log the response error
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
export const logout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChange')); // Notify components that auth changed
  };
  