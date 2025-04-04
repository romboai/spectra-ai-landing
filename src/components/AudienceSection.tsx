import React from 'react';
import { Microscope, Users, Brain } from 'lucide-react';
import { UserType } from '../types';

const AudienceSection: React.FC = () => {
  const userTypes: UserType[] = [
    {
      icon: <Microscope className="w-12 h-12 text-blue-600" />,
      title: "Researchers",
      description: "Speed up your research with automated analysis and batch processing."
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Lab Staff",
      description: "Process routine samples faster with no technical overhead."
    },
    {
      icon: <Brain className="w-12 h-12 text-blue-600" />,
      title: "Data Enthusiasts",
      description: "Explore spectral analysis with an intuitive interface."
    }
  ];

  return (
    <section className="bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          Built for scientists, students and lab technicians
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {userTypes.map((user, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{user.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{user.title}</h3>
              <p className="text-gray-600">{user.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection; 