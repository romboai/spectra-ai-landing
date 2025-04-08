import React, { useState, useEffect, useRef } from 'react';
import { 
  Microscope, 
  Users, 
  Github,
  Mail,
  CheckCircle2,
  FileUp,
  MessageCircle,
  BarChart3,
  Sparkles,
  ChevronDown,
  Shield,
  Zap,
  Clock,
  Lock,

} from 'lucide-react';

// Import the logo
import logo from '@assets/logo.svg';
// Add this import at the top of the file with other imports
import peakPickingVideo from '@assets/videos/peak_picking.mov';

const FormComponent: React.FC<{
  actionUrl: string;
  formData: { name: string; email: string };
  isSubmitting: boolean;
  error: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ actionUrl, formData, isSubmitting, error, handleInputChange }) => (
  <form action={actionUrl} method="POST" className="max-w-md mx-auto space-y-4 animate-fade-in-up">
    <div className="relative">
      <input
        type="text"
        name="name"
        placeholder="Your name"
        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300"
        value={formData.name}
        onChange={handleInputChange}
        disabled={isSubmitting}
        required
      />
    </div>
    <div className="relative">
      <input
        type="email"
        name="email"
        placeholder="Your email"
        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300"
        value={formData.email}
        onChange={handleInputChange}
        disabled={isSubmitting}
        required
      />
    </div>
    <button
      type="submit"
      className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <span className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Submitting...
        </span>
      ) : (
        'Get Free Early Access'
      )}
    </button>
    {error && <p className="text-red-600 text-sm animate-fade-in">{error}</p>}
  </form>
);

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Add refs for each section
  const sections = {
    hero: useRef<HTMLElement>(null),
    features: useRef<HTMLElement>(null),
    'how-it-works': useRef<HTMLElement>(null),
    beta: useRef<HTMLElement>(null)
  };

  // Add scroll position tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header

      // Find which section is in view
      for (const [sectionId, ref] of Object.entries(sections)) {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add smooth scroll function
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Add scroll to top function
  const scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (success) {
      setSuccessMessage('Thank you for joining our beta program! We will contact you soon.');
      timeout = setTimeout(() => {
        setSuccess(false);
        setSuccessMessage('');
      }, 5000); // Auto-dismiss after 5 seconds
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [success]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
      const formEvent = new Event('submit', { bubbles: true, cancelable: true }) as unknown as React.FormEvent<HTMLFormElement>;
      handleSubmit(formEvent);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    console.log('Form submitted with data:', formData);
    setSuccess(true);
    setSuccessMessage('Thank you for joining our beta program! We will contact you soon.');
    setFormData({ name: '', email: '' });
    setIsSubmitting(false);

  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={scrollToTop}
            >
              <img src={logo} alt="SpectraAI Logo" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-slate-800">SpectraAI</span>
            </div>
            <div className="flex items-center space-x-6">
              <a 
                href="#features" 
                onClick={(e) => scrollToSection(e, 'features')}
                className={`text-slate-600 hover:text-indigo-600 transition-all duration-200 relative ${
                  activeSection === 'features' 
                    ? 'text-indigo-600 font-medium after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 after:rounded-full' 
                    : 'hover:after:absolute hover:after:bottom-[-8px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-indigo-600/50 hover:after:rounded-full'
                }`}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                onClick={(e) => scrollToSection(e, 'how-it-works')}
                className={`text-slate-600 hover:text-indigo-600 transition-all duration-200 relative ${
                  activeSection === 'how-it-works' 
                    ? 'text-indigo-600 font-medium after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 after:rounded-full' 
                    : 'hover:after:absolute hover:after:bottom-[-8px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-indigo-600/50 hover:after:rounded-full'
                }`}
              >
                How It Works
              </a>
              <a 
                href="#hero" 
                onClick={(e) => scrollToSection(e, 'hero')}
                className={`text-slate-600 hover:text-indigo-600 transition-all duration-200 relative ${
                  activeSection === 'beta' 
                    ? 'text-indigo-600 font-medium after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 after:rounded-full' 
                    : 'hover:after:absolute hover:after:bottom-[-8px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-indigo-600/50 hover:after:rounded-full'
                }`}
              >
                Join Beta
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" ref={sections.hero} className="relative px-6 lg:px-8 pt-32 pb-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-50"></div>
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <img src={logo} alt="SpectraAI Logo" className="h-16 w-auto" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4 animate-fade-in">
              Spectral data analysis. Reimagined.
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 animate-fade-in-up">
              Upload. Ask. Analyze. All via chat. No code needed.
            </p>
            <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up">
              <p className="text-lg text-slate-600">
                Transform your spectral data analysis workflow with AI-powered chat. Simply upload your spectra and ask questions in plain English. Get instant insights without writing a single line of code.
              </p>
            </div>
            {!success ? (
              <FormComponent
                actionUrl="https://app.99inbound.com/api/e/PxRbnqEW"
                formData={formData}
                isSubmitting={isSubmitting}
                error={error}
                handleInputChange={handleInputChange}
              />
            ) : (
              <div className="max-w-md mx-auto text-center animate-fade-in-up">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 shadow-lg">
                  <div className="flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
                  <p className="text-green-700">{successMessage}</p>
                </div>
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-6 mt-8 animate-fade-in-up">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                <span className="text-sm text-slate-600">Open source core</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                <span className="text-sm text-slate-600">No spam</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                <span className="text-sm text-slate-600">Forever free for early users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="features" ref={sections.features} className="bg-white px-6 py-16 shadow-sm">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in text-slate-900">
            The Future of Spectral Analysis is Here
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-slate-50 animate-fade-in-up">
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Traditional Analysis</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✕</span>
                  Complex software with steep learning curves
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✕</span>
                  Time-consuming manual processing
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✕</span>
                  Requires programming knowledge
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✕</span>
                  Expensive licenses and maintenance
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-indigo-50 animate-fade-in-up">
              <h3 className="text-xl font-semibold mb-4 text-slate-800">SpectraAI Analysis</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">✓</span>
                  Natural language interface
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">✓</span>
                  Instant analysis and insights
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">✓</span>
                  No coding required
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">✓</span>
                  Affordable and accessible
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" ref={sections['how-it-works']} className="px-6 py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in text-slate-900">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileUp className="w-12 h-12 text-indigo-600" />,
                title: "Upload Your Data",
                description: "Simply drag and drop your spectral data files. We support all major formats including .spc, .dpt, .jdx, and more."
              },
              {
                icon: <MessageCircle className="w-12 h-12 text-indigo-600" />,
                title: "Ask Questions",
                description: "Use natural language to ask questions about your data. No technical jargon needed."
              },
              {
                icon: <BarChart3 className="w-12 h-12 text-indigo-600" />,
                title: "Get Insights",
                description: "Receive instant analysis, visualizations, and explanations in plain English."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="p-8 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-indigo-50 p-4 rounded-lg w-fit mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-3 text-slate-800">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="bg-white px-6 py-16 shadow-sm">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in text-slate-900">
            Perfect For
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Microscope className="w-12 h-12 text-indigo-600" />,
                title: "Research Scientists",
                description: "Accelerate your research with instant spectral analysis and pattern recognition."
              },
              {
                icon: <Users className="w-12 h-12 text-indigo-600" />,
                title: "Lab Technicians",
                description: "Streamline routine analysis and reporting with simple chat commands."
              },
              {
                icon: <Sparkles className="w-12 h-12 text-indigo-600" />,
                title: "Data Analysts",
                description: "Focus on insights rather than coding with our AI-powered analysis tools."
              }
            ].map((user, index) => (
              <div 
                key={index} 
                className="text-center p-8 rounded-xl bg-slate-50 hover:bg-white transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-indigo-50 p-4 rounded-full">
                    {user.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">{user.title}</h3>
                <p className="text-slate-600">{user.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Shape the Future of Spectroscopy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Multi-Format Support</h3>
              <p className="text-gray-600">Support for over 50+ file formats including CSV, TXT, SPC, JDX, and proprietary instrument formats. Import and export data with multiple columns and metadata.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Advanced Plotting</h3>
              <p className="text-gray-600">Interactive plots with zoom, pan, and data point selection. Support for multiple plot types including line, scatter, waterfall, and 3D surface plots with customizable colors and styles.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Data Processing</h3>
              <p className="text-gray-600">Comprehensive analysis tools including peak finding, baseline correction, smoothing, normalization, and mathematical operations. Support for advanced processing like derivatives and spectral transformations.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Export & Sharing</h3>
              <p className="text-gray-600">Export data and plots in various formats including CSV, PNG, PDF, and SVG. Share your analysis with colleagues through multiple export options and clipboard integration.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Batch Processing</h3>
              <p className="text-gray-600">Process multiple files simultaneously with batch operations. Apply the same analysis to multiple datasets efficiently with automated workflows and customizable processing sequences.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Python Integration</h3>
              <p className="text-gray-600">Extend functionality with custom Python scripts. Automate repetitive tasks and create custom analysis workflows with full Python support for advanced data processing.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Demo Video Section */}
      <section className="px-6 py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in text-slate-900">
            See SpectraAI in Action
          </h2>
          <div className="relative aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl animate-fade-in-up">
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent pointer-events-none">
                <p className="text-white text-lg font-medium">Watch how SpectraAI transforms spectral data analysis</p>
              </div>
            <video
              className="w-full h-full object-cover"
              controls
              autoPlay={false}
              playsInline
              preload="metadata"
            >
              <source src={peakPickingVideo} type="video/mp4" />
              <source src={peakPickingVideo} type="video/quicktime" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>


      {/* Enhanced FAQ Section */}
      <section className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                question: "What types of spectral data can I analyze?",
                answer: "SpectraAI supports various spectral data formats including IR, Raman, UV-Vis, and NMR spectra. We're continuously adding support for more formats.",
                icon: <FileUp className="w-5 h-5 text-indigo-600" />
              },
              {
                question: "Do I need programming knowledge to use SpectraAI?",
                answer: "No programming knowledge is required. You can interact with SpectraAI using natural language, just like having a conversation with an expert.",
                icon: <MessageCircle className="w-5 h-5 text-indigo-600" />
              },
              {
                question: "How accurate are the AI-powered analyses?",
                answer: "Our AI models are trained on extensive spectral databases and validated by domain experts. While no analysis is perfect, we strive for high accuracy and provide confidence scores for our predictions.",
                icon: <Zap className="w-5 h-5 text-indigo-600" />
              },
              {
                question: "Is my data secure?",
                answer: "Yes, we take data security seriously. All data is encrypted in transit and at rest. We never share your data with third parties without explicit consent.",
                icon: <Shield className="w-5 h-5 text-indigo-600" />
              },
              {
                question: "How fast can I get results?",
                answer: "Most analyses are completed within seconds. Complex analyses might take a few minutes, but you'll always get real-time updates on the progress.",
                icon: <Clock className="w-5 h-5 text-indigo-600" />
              },
              {
                question: "What happens to my data after analysis?",
                answer: "You retain full ownership of your data. We store it securely for your convenience but you can delete it at any time. We never use your data for training without explicit permission.",
                icon: <Lock className="w-5 h-5 text-indigo-600" />
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="border border-slate-200 rounded-lg overflow-hidden animate-fade-in-up hover:border-indigo-200 transition-colors duration-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors duration-200"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-50 p-2 rounded-lg">
                      {faq.icon}
                    </div>
                    <span className="font-medium text-slate-800">{faq.question}</span>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`px-6 py-4 bg-slate-50 transition-all duration-200 ${
                    openFaq === index ? 'block' : 'hidden'
                  }`}
                >
                  <p className="text-slate-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Final CTA Section */}
      <section className="bg-white px-6 py-16 shadow-sm">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold mb-8 animate-fade-in text-slate-900">
            Ready to Transform Your Spectral Analysis?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Join the beta today and experience the future of spectral data analysis. No coding required, just upload and ask.
          </p>
          <FormComponent
            actionUrl="https://app.99inbound.com/api/e/PxRbnqEW"
            formData={formData}
            isSubmitting={isSubmitting}
            error={error}
            handleInputChange={handleInputChange}
          />
          <div className="flex flex-wrap justify-center gap-6 mt-8 animate-fade-in-up">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <span className="text-sm text-slate-600">Open source core</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <span className="text-sm text-slate-600">No spam</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <span className="text-sm text-slate-600">Forever free for early users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 px-6 py-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center">
          <div 
            className="flex items-center mb-4 md:mb-0 cursor-pointer hover:opacity-80 transition-opacity duration-200"
            onClick={scrollToTop}
          >
            <img src={logo} alt="SpectraAI Logo" className="h-8 w-auto mr-2" />
            <span className="text-2xl font-bold text-indigo-600">SpectraAI</span>
          </div>
          <div className="flex space-x-6">
            <a href="mailto:contact@rombo.ai" className="flex items-center text-slate-600 hover:text-indigo-600 transition-colors duration-200">
              <Mail className="w-4 h-4 mr-1" />
              Contact
            </a>
            <a href="https://github.com/romboai" className="flex items-center text-slate-600 hover:text-indigo-600 transition-colors duration-200">
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