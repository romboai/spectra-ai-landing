import React from 'react';
import { Feature } from '../types';

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
      {feature.icon}
      <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  );
};

export default FeatureCard; 