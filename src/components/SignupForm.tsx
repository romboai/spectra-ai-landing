import React from 'react';
import { FormData } from '../types';

interface SignupFormProps {
  formData: FormData;
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  formData,
  isSubmitting,
  error,
  success,
  onSubmit,
  onChange
}) => {
  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto space-y-4">
      <input
        type="text"
        placeholder="Your name"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={formData.name}
        onChange={(e) => onChange(e, 'name')}
        disabled={isSubmitting}
        required
      />
      <input
        type="email"
        placeholder="Your email"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={formData.email}
        onChange={(e) => onChange(e, 'email')}
        disabled={isSubmitting}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Get Free Early Access'}
      </button>
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
      {success && (
        <p className="text-green-600 text-sm">Thanks for subscribing! Check your email for confirmation.</p>
      )}
    </form>
  );
};

export default SignupForm; 