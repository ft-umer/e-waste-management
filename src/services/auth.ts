import axios from 'axios';
const API_URL = 'https://e-waste-server-3kicixm72-syed-umer-mujahid-hassnis-projects.vercel.app/api/auth';

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

export const signUp = async (
  email: string,
  password: string,
  name: string,
  address: string,
  phone: string
) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      name,
      address,
      phone
    })
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Failed to register');
  }

  const result = await response.json();

  // Optional: store token and user in localStorage or context
  localStorage.setItem('token', result.token);
  localStorage.setItem('user', JSON.stringify(result.user));

  return result;
};

export const logout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChange')); // Notify components that auth changed
  };
  
  