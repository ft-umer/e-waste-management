import axios from 'axios';
const API_URL = 'https://backend-e-waste-management.vercel.app/api/auth';

// Sign In function using axios
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
    localStorage.setItem('user', JSON.stringify(user)); // Save user data to localStorage
    return user;
  } catch (error: any) {
    console.error('Sign in error:', error.response?.data); // Log the response error
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Sign Up function using axios (Updated)
export const signUp = async (
  email: string,
  password: string,
  name: string,
  address: string,
  phone: string
) => {
  console.log("Sending to backend:", { email, password, name, address, phone });

  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
      name,
      address,
      phone
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const { token, user } = response.data;
    localStorage.setItem('token', token); // Save token to localStorage
    localStorage.setItem('user', JSON.stringify(user)); // Save user data to localStorage

    return { token, user };
  } catch (error: any) {
    console.error('Sign up error:', error.response?.data); // Log the response error
    throw new Error(error.response?.data?.message || 'Failed to register');
  }
};

// Logout function to clear stored data
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user'); // Remove user from localStorage
  window.dispatchEvent(new Event('authChange')); // Notify components that auth changed
};
