import React from 'react';
import SignupForm from './SignupForm';
import { FormData } from '../types';

interface HeroSectionProps {
  formData: FormData;
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  formData,
  isSubmitting,
  error,
  success,
  handleSubmit,
  handleChange
}) => {
  return (
    <section className="relative px-6 lg:px-8 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-4">
            Spectral data analysis. Reimagined.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Upload. Ask. Analyze. All via chat. No code needed.
          </p>
          <SignupForm
            formData={formData}
            isSubmitting={isSubmitting}
            error={error}
            success={success}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
          <p className="mt-4 text-sm text-gray-600">
            Beta users get full access — forever, for free.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 