import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { Menu, X, Recycle, User, LogOut } from 'lucide-react';
import Button from '../ui/Button';
import { logout } from '../../services/auth'; // Import the logout function

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
  const navigate = useNavigate(); // Hook to handle redirection

  // Check authentication state on load
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    setIsAuthenticated(true);
  }

  // 👇 Listen for auth state change (login or logout)
  const handleAuthChange = () => {
    const newToken = localStorage.getItem('token');
    setIsAuthenticated(!!newToken);
  };

  window.addEventListener('authChange', handleAuthChange);

  return () => {
    window.removeEventListener('authChange', handleAuthChange);
  };
}, []);


  // Handle logout logic
  const handleLogout = () => {
    logout(); // Call logout function to remove token from localStorage
    setIsAuthenticated(false); // Update state to reflect user is logged out
    localStorage.removeItem("token"); // Remove token from localStorage

    navigate('/signin'); 
  };


  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Scroll event listener for changing navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true); // Set scrolled state when window scroll position is greater than 10px
      } else {
        setIsScrolled(false); // Reset scrolled state
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Recycle className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold text-gray-900">E-Cycle</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-500 font-medium">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-500 font-medium">About</Link>
            <Link to="/services" className="text-gray-700 hover:text-green-500 font-medium">Services</Link>
            <Link to="/education" className="text-gray-700 hover:text-green-500 font-medium">Education</Link>
            <Link to="/seminars" className="text-gray-700 hover:text-green-500 font-medium">Seminars</Link>
            <Link to="/waste" className="text-gray-700 hover:text-green-500 font-medium">Waste products</Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-gray-700 hover:text-green-500 font-medium">Dashboard</Link>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<LogOut className="h-4 w-4" />}
                  onClick={handleLogout} // Use the handleLogout function
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/signin')} // Navigate to login page
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={<User className="h-4 w-4" />}
                  onClick={() => navigate('/register')} // Navigate to register page
                >
                  Register
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-green-500"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4 px-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-green-500 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-green-500 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/services"
                className="text-gray-700 hover:text-green-500 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/education"
                className="text-gray-700 hover:text-green-500 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Education
              </Link>
             
              <Link
                to="/seminars"
                className="text-gray-700 hover:text-green-500 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Seminars
              </Link>
              <Link
                to="/waste"
                className="text-gray-700 hover:text-green-500 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Waste
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-green-500 font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button
                    variant="outline"
                    fullWidth
                    icon={<LogOut className="h-4 w-4" />}
                    onClick={() => {
                      handleLogout(); // Logout on mobile too
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/signin'); // Navigate to login page on mobile
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="primary"
                    fullWidth
                    icon={<User className="h-4 w-4" />}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/register'); // Navigate to register page on mobile
                    }}
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
