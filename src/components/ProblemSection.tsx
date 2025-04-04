import React from 'react';

const ProblemSection: React.FC = () => {
  return (
    <section className="bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-8">
          Tired of struggling with weird file formats and outdated software?
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
          Traditional spectral analysis tools are a nightmare: closed formats, clunky interfaces, 
          and sky-high prices. We're changing that with a modern, chat-based approach that just works.
        </p>
      </div>
    </section>
  );
};

export default ProblemSection; 