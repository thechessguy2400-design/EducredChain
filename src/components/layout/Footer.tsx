import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Twitter, Linkedin } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white border-t border-gray-700 dark:border-gray-700">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="text-primary-400 w-6 h-6" />
              <span className="text-xl font-bold text-primary-400">EduCred Chain</span>
            </div>
            <p className="text-gray-300 dark:text-gray-400 text-sm mb-4">
              Securely verify and share your learning credentials using blockchain technology and AI.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/yourusername/educredchain" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h4 className="text-white font-medium mb-4">Platform</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mr-2"></span>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/upload" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mr-2"></span>
                  Upload Credentials
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mr-2"></span>
                  Documentation
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mr-2"></span>
                  API Reference
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mr-2"></span>
                  Tutorials
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mr-2"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mr-2"></span>
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mr-2"></span>
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 text-center md:text-left">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} EduCred Chain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;