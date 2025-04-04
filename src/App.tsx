import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  LineChart, 
  Brain, 
  FileSpreadsheet, 
  Microscope, 
  Users, 
  MessageSquare,
  ChevronRight,
  Github,
  Mail
} from 'lucide-react';
import { createContact } from './services/hubspot';

function App() {
  const [formData, setFormData] = useState({
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
      await createContact(formData.name, formData.email);
      setSuccess(true);
      setFormData({ name: '', email: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-4">
              Spectral data analysis. Reimagined.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Upload. Ask. Analyze. All via chat. No code needed.
            </p>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isSubmitting}
                required
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            <p className="mt-4 text-sm text-gray-600">
              Beta users get full access — forever, for free.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
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

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            What you'll get — right from day one
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                {feature.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Built for scientists, students and lab technicians
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
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
            ].map((user, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{user.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{user.title}</h3>
                <p className="text-gray-600">{user.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beta Access Section */}
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
              {[
                "Full free access to all features",
                "Early access to new features",
                "Direct input into product development",
                "Priority support"
              ].map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <ChevronRight className="w-5 h-5 text-blue-600 mr-2" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold mb-8">
            Ready to revolutionize your spectral analysis?
          </h2>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isSubmitting}
              required
            />
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold mb-4 md:mb-0">SpectraAI</div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a>
            <a href="mailto:contact@spectraai.ai" className="flex items-center text-gray-600 hover:text-gray-900">
              <Mail className="w-4 h-4 mr-1" />
              Contact
            </a>
            <a href="https://github.com/spectraai" className="flex items-center text-gray-600 hover:text-gray-900">
              <Github className="w-4 h-4 mr-1" />
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App; 