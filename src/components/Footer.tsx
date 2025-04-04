import React from 'react';
import { Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-8">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center">
        <div className="text-2xl font-bold mb-4 md:mb-0">SpectraAI</div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a>
          <a href="mailto:contact@spectraai.ai" className="flex items-center text-gray-600 hover:text-gray-900">
            <Mail className="w-4 h-4 mr-1" />
            Contact
          </a>
          <a href="https://github.com/spectraai" className="flex items-center text-gray-600 hover:text-gray-900">
            <Github className="w-4 h-4 mr-1" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 