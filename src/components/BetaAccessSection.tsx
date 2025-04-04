import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Benefit } from '../types';

const BetaAccessSection: React.FC = () => {
  const benefits: Benefit[] = [
    { text: "Full free access to all features" },
    { text: "Early access to new features" },
    { text: "Direct input into product development" },
    { text: "Priority support" }
  ];

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-3xl font-bold mb-8">
          Join the beta. Shape the future of spectroscopy.
        </h2>
        <div className="max-w-2xl mx-auto">
          <p className="text-lg text-gray-600 mb-8">
            Subscribe now to secure:
          </p>
          <ul className="text-left space-y-4 mb-8">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight className="w-5 h-5 text-blue-600 mr-2" />
                <span>{benefit.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BetaAccessSection; 