import React from 'react';
import SignupForm from './SignupForm';
import { FormData } from '../types';

interface FinalCtaSectionProps {
  formData: FormData;
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
}

const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  formData,
  isSubmitting,
  error,
  success,
  handleSubmit,
  handleChange
}) => {
  return (
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
        <div className="flex justify-center space-x-8 mt-8">
          <span className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Open source core
          </span>
          <span className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            No spam
          </span>
          <span className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Forever free for early users
          </span>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection; 