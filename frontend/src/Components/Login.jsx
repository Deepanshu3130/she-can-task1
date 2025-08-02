import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ onLogin }) => {  // Changed from setUser to onLogin for consistency
  const [email, setEmail] = useState('john@example.com');  // Pre-filled for testing
  const [password, setPassword] = useState('password123');  // Pre-filled for testing
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // Added loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/login', 
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Login response:', response.data);  // Debug log
      
      if (response.data.success) {
        onLogin(response.data.user);  // Changed to use onLogin prop
        navigate('/dashboard');
      } else {
        setError(response.data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', {
        message: err.message,
        response: err.response?.data,
        stack: err.stack
      });
      
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Login</h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="mt-4 text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;