import React from 'react';
import { Github, Mail } from 'lucide-react';
import SignupForm from './SignupForm';
import { FormData } from '../types';

interface FooterSectionProps {
  formData: FormData;
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FooterSection: React.FC<FooterSectionProps> = ({
  formData,
  isSubmitting,
  error,
  success,
  handleSubmit,
  handleChange
}) => {
  return (
    <footer>
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold mb-8">
            Ready to revolutionize your spectral analysis?
          </h2>
          <SignupForm
            formData={formData}
            isSubmitting={isSubmitting}
            error={error}
            success={success}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
        </div>
      </section>
      
      <div className="bg-gray-800 text-white py-8 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-300">© 2023 SpectraAI. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com" className="text-gray-300 hover:text-white">
              <Github className="w-5 h-5" />
            </a>
            <a href="mailto:info@example.com" className="text-gray-300 hover:text-white">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection; 