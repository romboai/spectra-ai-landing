import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import FeaturesSection from './components/FeaturesSection';
import AudienceSection from './components/AudienceSection';
import BetaAccessSection from './components/BetaAccessSection';
import FinalCtaSection from './components/FinalCtaSection';
import Footer from './components/Footer';
import { FormData } from './types';

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if we have the required environment variables
    const hubspotApiKey = import.meta.env.VITE_HUBSPOT_API_KEY;
    if (!hubspotApiKey) {
      console.warn('HubSpot API key is not set');
    }
    setIsLoaded(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const hubspotApiKey = import.meta.env.VITE_HUBSPOT_API_KEY;
      if (!hubspotApiKey) {
        throw new Error('HubSpot API key is not configured');
      }
      // Simulate API call
      setTimeout(() => {
        setSuccess(true);
        setFormData({ name: '', email: '' });
        setIsSubmitting(false);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Layout>
      <HeroSection 
        formData={formData}
        isSubmitting={isSubmitting}
        error={error}
        success={success}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <ProblemSection />
      <FeaturesSection />
      <AudienceSection />
      <BetaAccessSection />
      <FinalCtaSection 
        formData={formData}
        isSubmitting={isSubmitting}
        error={error}
        success={success}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <Footer />
    </Layout>
  );
}

export default App; 