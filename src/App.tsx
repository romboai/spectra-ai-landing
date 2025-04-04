function App() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-secondary mb-8">
          AI-Powered Spectroscopy Analysis
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Join our early adopter program and be among the first to experience the future of spectroscopy analysis.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-accent transition-colors">
            Join Early Access
          </button>
          <button className="border border-primary text-primary px-8 py-3 rounded-lg hover:bg-gray-light transition-colors">
            Learn More
          </button>
        </div>
      </main>
    </div>
  );
}

export default App; 