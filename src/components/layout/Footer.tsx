import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Recycle className="h-8 w-8 text-green-400" />
              <span className="text-xl font-bold">E-Cycle</span>
            </div>
            <p className="text-gray-400 max-w-xs">
              Helping individuals and organizations responsibly dispose of electronic waste to protect our environment.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-green-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-green-400 transition-colors">Services</Link></li>
              <li><Link to="/education" className="text-gray-400 hover:text-green-400 transition-colors">Education</Link></li>
              <li><Link to="/locations" className="text-gray-400 hover:text-green-400 transition-colors">Recycling Locations</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-green-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/pickup" className="text-gray-400 hover:text-green-400 transition-colors">E-Waste Pickup</Link></li>
              <li><Link to="/services/dropoff" className="text-gray-400 hover:text-green-400 transition-colors">Drop-off Locations</Link></li>
              <li><Link to="/services/business" className="text-gray-400 hover:text-green-400 transition-colors">Business Solutions</Link></li>
              <li><Link to="/services/events" className="text-gray-400 hover:text-green-400 transition-colors">Recycling Events</Link></li>
              <li><Link to="/services/data" className="text-gray-400 hover:text-green-400 transition-colors">Data Destruction</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">123 Recycling Way, Green City, Earth 10101</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-400">info@ecycle.example.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} E-Cycle. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-4 text-sm">
            <Link to="/privacy" className="text-gray-400 hover:text-green-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-green-400 transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-400 hover:text-green-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;