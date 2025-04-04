import React from 'react';
import { 
  Upload, 
  LineChart, 
  Brain, 
  FileSpreadsheet, 
  Microscope,
  MessageSquare
} from 'lucide-react';
import { Feature } from '../types';

const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <FileSpreadsheet className="w-8 h-8 text-blue-600" />,
      title: "Read Any Format",
      description: "Import .spc, .dpt, .jdx files and more without hassle."
    },
    {
      icon: <LineChart className="w-8 h-8 text-blue-600" />,
      title: "Advanced Processing",
      description: "Smooth, normalize, and baseline-correct your spectra instantly."
    },
    {
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: "Smart Analysis",
      description: "Run PCA & clustering with simple chat commands."
    },
    {
      icon: <Upload className="w-8 h-8 text-blue-600" />,
      title: "Browser-Based",
      description: "No installations needed. Works everywhere."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
      title: "Chat Interface",
      description: "Like ChatGPT, but for spectral analysis."
    },
    {
      icon: <Microscope className="w-8 h-8 text-blue-600" />,
      title: "Batch Processing",
      description: "Handle multiple spectra efficiently."
    }
  ];

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          What you'll get — right from day one
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 