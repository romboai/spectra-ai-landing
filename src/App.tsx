import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Mail,
  CheckCircle2,
  ChevronDown,
  Clock,
  Search,
  Eye,
  FlaskConical,
  Layers,
  ScanLine,
  GitCompare,
  Workflow,
  Target,
  ShieldCheck,
  Database,
  FileCheck2,
} from 'lucide-react';

// Import the logo
import logo from '@assets/logo.svg';

const BRAND = 'SpectraAI';

// Make.com custom webhook for lead submissions
const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/xlhmjh1moriuwsf2ky8pqvwgeh4agfgw';
const MAKE_WEBHOOK_KEY = 'geTba5-bicxej-wacsep';

// KPI / product metrics — easily editable values here
const KPIS: { value: string; label: string; description: string }[] = [
  {
    value: '82%',
    label: 'Top-1 Accuracy',
    description: 'The correct candidate ranked first across our benchmarks.'
  },
  {
    value: '97%',
    label: 'Top-10 Accuracy',
    description: 'The correct candidate within the top ten results.'
  },
  {
    value: '<30 sec',
    label: 'Average Identification Time',
    description: 'From raw spectrum to an explainable shortlist.'
  },
  {
    value: '21+',
    label: 'Chemical Classes',
    description: 'Chemical classes covered by the identification models.'
  },
  {
    value: '100%',
    label: 'Explainable Results',
    description: 'Every result with an evidence score, assignments and traceable logs.'
  },
  {
    value: '94M+',
    label: 'Retrieval Space',
    description: 'Molecules searchable across experimental and simulated libraries.'
  }
];

interface LeadFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  phone: string;
  message: string;
}

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300';

const FormComponent: React.FC<{
  onSubmit: (e: React.FormEvent) => void;
  formData: LeadFormData;
  isSubmitting: boolean;
  error: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}> = ({ onSubmit, formData, isSubmitting, error, handleInputChange }) => (
  <form onSubmit={onSubmit} className="max-w-md mx-auto space-y-4 animate-fade-in-up">
    <div className="relative">
      <input
        type="text"
        name="name"
        placeholder="Full name *"
        className={INPUT_CLASS}
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
        placeholder="Work email *"
        className={INPUT_CLASS}
        value={formData.email}
        onChange={handleInputChange}
        disabled={isSubmitting}
        required
      />
    </div>
    <div className="grid sm:grid-cols-2 gap-4">
      <input
        type="text"
        name="company"
        placeholder="Company *"
        className={INPUT_CLASS}
        value={formData.company}
        onChange={handleInputChange}
        disabled={isSubmitting}
        required
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        className={INPUT_CLASS}
        value={formData.role}
        onChange={handleInputChange}
        disabled={isSubmitting}
      />
    </div>
    <div className="relative">
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        className={INPUT_CLASS}
        value={formData.phone}
        onChange={handleInputChange}
        disabled={isSubmitting}
      />
    </div>
    <div className="relative">
      <textarea
        name="message"
        placeholder="What would you like to identify? (optional)"
        rows={3}
        className={`${INPUT_CLASS} resize-none`}
        value={formData.message}
        onChange={handleInputChange}
        disabled={isSubmitting}
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
        'Request a demo'
      )}
    </button>
    <p className="text-xs text-slate-500 text-center">
      Or evaluate a pilot on your own data. No spam — we'll reach out to you.
    </p>
    {error && <p className="text-red-600 text-sm animate-fade-in">{error}</p>}
  </form>
);

function App() {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    message: ''
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
    problem: useRef<HTMLElement>(null),
    'how-it-works': useRef<HTMLElement>(null),
    features: useRef<HTMLElement>(null),
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
      setSuccessMessage('Thanks! We will reach out shortly to set up your demo or pilot.');
      timeout = setTimeout(() => {
        setSuccess(false);
        setSuccessMessage('');
      }, 5000); // Auto-dismiss after 5 seconds
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [success]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-make-apikey': MAKE_WEBHOOK_KEY,
        },
        body: new URLSearchParams({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          role: formData.role,
          phone: formData.phone,
          message: formData.message,
        }),
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      setSuccess(true);
      setFormData({ name: '', email: '', company: '', role: '', phone: '', message: '' });
    } catch (err) {
      console.error('Form submission failed:', err);
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
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
              <img src={logo} alt={`${BRAND} Logo`} className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-slate-800">{BRAND}</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#problem"
                onClick={(e) => scrollToSection(e, 'problem')}
                className={`text-slate-600 hover:text-indigo-600 transition-all duration-200 relative ${
                  activeSection === 'problem'
                    ? 'text-indigo-600 font-medium after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 after:rounded-full'
                    : 'hover:after:absolute hover:after:bottom-[-8px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-indigo-600/50 hover:after:rounded-full'
                }`}
              >
                The problem
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
                How it works
              </a>
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
                href="#beta"
                onClick={(e) => scrollToSection(e, 'beta')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
              >
                Request a demo
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" ref={sections.hero} className="relative px-6 lg:px-8 pt-32 pb-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-50"></div>
        <div className="mx-auto max-w-5xl relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white border border-slate-200 shadow-sm animate-fade-in">
              <FlaskConical className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-slate-700">Scientific agent for NMR compound identification</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 animate-fade-in">
              From NMR spectrum to molecular identity, with traceable evidence.
            </h1>
            <p className="text-lg md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto animate-fade-in-up">
              A scientific agent for compound identification that combines large-scale retrieval,
              foundation models, physics-guided validation and step-by-step reasoning to reduce
              uncertainty and accelerate verification, dereplication and unknown identification.
            </p>

            {/* Three above-the-fold benefits */}
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12 animate-fade-in-up">
              {[
                {
                  icon: <Clock className="w-5 h-5 text-indigo-600" />,
                  text: 'Cut the time lost between spectra, libraries and separate software.'
                },
                {
                  icon: <Eye className="w-5 h-5 text-indigo-600" />,
                  text: 'Understand what truly supports each candidate and what stays ambiguous.'
                },
                {
                  icon: <Target className="w-5 h-5 text-indigo-600" />,
                  text: 'Find the next most useful experiment before acquiring useless data.'
                }
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-3 text-left bg-white/70 border border-slate-200 rounded-xl p-4">
                  <div className="bg-indigo-50 p-2 rounded-lg shrink-0">{b.icon}</div>
                  <span className="text-sm text-slate-700">{b.text}</span>
                </div>
              ))}
            </div>

            {!success ? (
              <FormComponent
                onSubmit={handleSubmit}
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
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Thank you!</h3>
                  <p className="text-green-700">{successMessage}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* KPI Section */}
      <section className="bg-white px-6 py-20 shadow-sm border-t border-slate-100">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in text-slate-900">
              Measurable results, not promises
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto animate-fade-in-up">
              Performance validated on public benchmarks and blind lab sets, with explainable
              evidence on every result.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {KPIS.map((kpi, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gradient-to-b from-indigo-50 to-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  {kpi.value}
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{kpi.label}</h3>
                <p className="text-sm text-slate-600">{kpi.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" ref={sections.problem} className="bg-white px-6 py-20 shadow-sm">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in text-slate-900">
            The problem isn't getting candidates. It's reaching a defensible conclusion.
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-3xl mx-auto animate-fade-in-up">
            Today's tools are good at processing data, matching libraries or accelerating
            verification. But when the sample is a mixture, the compound is unexpected, the spectrum
            is ambiguous or regulatory evidence is required, the work goes back to the expert. That's
            where the bottleneck reopens.
          </p>
          <div className="max-w-3xl mx-auto mb-6 text-left bg-indigo-50/60 border-l-4 border-indigo-500 rounded-r-xl p-6 animate-fade-in-up">
            <p className="text-lg text-slate-700 italic leading-relaxed">
              It's not about replacing chemists. It's about catching the mistake a tired analyst makes
              at 2 a.m. — on their fourth spectrum of the night, when they just want to go home. That's
              where an evidence-driven second pair of eyes saves real time and prevents costly errors.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" ref={sections['how-it-works']} className="px-6 py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in text-slate-900">
              An agentic workflow, step by step
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto animate-fade-in-up">
              The system classifies the case, checks data quality, separates components, searches for
              candidates and analogs, validates every hypothesis against the real spectrum and produces
              a readable evidence score. If residual uncertainty is still high, it suggests the next
              most informative experiment.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Workflow className="w-7 h-7 text-indigo-600" />,
                step: '01',
                title: 'Smart case triage',
                description: 'Understands whether you\'re doing verification, dereplication, impurity ID or de novo, and sets the right path.'
              },
              {
                icon: <ShieldCheck className="w-7 h-7 text-indigo-600" />,
                step: '02',
                title: 'Quality & preprocessing guardrails',
                description: 'Stops baseline, referencing or peak-extraction errors before they become wrong conclusions.'
              },
              {
                icon: <Layers className="w-7 h-7 text-indigo-600" />,
                step: '03',
                title: 'Mixture componentization',
                description: 'Separates components, solvents and unexplained signals where a "one compound only" ranking would fail.'
              },
              {
                icon: <Search className="w-7 h-7 text-indigo-600" />,
                step: '04',
                title: 'Hybrid retrieval',
                description: 'Searches experimental, simulated and customer-private databases: not just exact matches, but analogs and fragments.'
              },
              {
                icon: <GitCompare className="w-7 h-7 text-indigo-600" />,
                step: '05',
                title: 'Candidate generation + forward validation',
                description: 'Every candidate must regenerate the observed data with physics-guided validation.'
              },
              {
                icon: <Target className="w-7 h-7 text-indigo-600" />,
                step: '06',
                title: 'Evidence score & next-best experiment',
                description: 'Calibrated confidence, unexplained signals and a suggestion of the most informative experiment to acquire next.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up border border-slate-100"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="bg-indigo-50 p-3 rounded-lg w-fit">
                    {feature.icon}
                  </div>
                  <span className="text-2xl font-bold text-slate-200">{feature.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-800">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={sections.features} className="bg-white px-6 py-20 shadow-sm">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in text-slate-900">
              Not just candidates: confidence, context and the next experiment
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto animate-fade-in-up">
              We unify what's separate today: vendor workflows, large-scale retrieval, foundation
              models, physics-guided validation and enterprise trust.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <ScanLine className="w-6 h-6 text-indigo-600" />,
                title: 'Reads the spectrum, not just the peak list',
                description: 'Uses foundation encoders on raw 1D/2D signals together with retrieval and physicochemical constraints, so no useful information is lost early on.'
              },
              {
                icon: <Search className="w-6 h-6 text-indigo-600" />,
                title: 'Searches beyond the library',
                description: 'It\'s not limited to exact matches: it retrieves analogs, fragments, plausible scaffolds and the lab\'s private candidates.'
              },
              {
                icon: <BarChartIcon />,
                title: 'Explains why a candidate rises or falls',
                description: 'Every proposal shows the contribution of ¹H, ¹³C, HSQC, formula/MS context, unexplained signals and residual contradictions.'
              },
              {
                icon: <Target className="w-6 h-6 text-indigo-600" />,
                title: 'Tells you what to do next',
                description: 'When data isn\'t enough, it suggests the experiment that maximizes information value instead of piling up spectra "just in case".'
              },
              {
                icon: <Database className="w-6 h-6 text-indigo-600" />,
                title: 'Fits the real lab',
                description: 'Vendor-agnostic import, customer proprietary libraries, exportable reports, audit trail and a regulated-ready roadmap.'
              },
              {
                icon: <FileCheck2 className="w-6 h-6 text-indigo-600" />,
                title: 'Auditable evidence report',
                description: 'Every proposal comes with assignments, per-evidence scores, decision logs and model/dataset versions.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="flex gap-5 p-6 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-white transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="bg-indigo-50 p-3 rounded-lg w-fit h-fit shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-800">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in text-slate-900">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {[
              {
                question: 'What exactly does the product do?',
                answer: 'It guides the lab from NMR data to an explainable shortlist of molecular identities, with a confidence score, assignments, unexplained signals and a next-experiment suggestion.'
              },
              {
                question: 'Is it a replacement for Mnova, TopSpin or ACD/Labs?',
                answer: 'It doesn\'t have to be, from day one. The most credible strategy is to integrate with existing workflows and become the reasoning, ranking and evidence layer on top of the processing and acquisition already in use.'
              },
              {
                question: 'Is it only for pure compounds?',
                answer: 'No. The advantage grows precisely when there are impurities, multiple components or overlapping signals, even though the MVP starts from fairly well-controlled cases.'
              },
              {
                question: 'Does it only work with proprietary libraries?',
                answer: 'No. The distinctive value is combining experimental libraries, simulated libraries, the customer\'s internal databases and analogy-based retrieval.'
              },
              {
                question: 'Does it do verification or also unknown identification?',
                answer: 'Both, but with different levels of risk and confidence. Verification is the fastest entry point; impurity ID and dereplication are the next step; open-world de novo is the path to build progressively.'
              },
              {
                question: 'Does it only use NMR?',
                answer: 'No. When available, molecular formula, exact mass, MS, IR and synthesis context increase ranking quality and the robustness of the conclusion.'
              },
              {
                question: 'How do you avoid generative-model hallucinations?',
                answer: 'Generating plausible candidates isn\'t enough: every hypothesis is weighted by retrieval, chemical constraints and forward validation against the observed data.'
              },
              {
                question: 'How is confidence in a result assessed?',
                answer: 'With an evidence score broken down by modality, a calibrated confidence and an explicit list of explained, unexplained and contradictory signals.'
              },
              {
                question: 'Is it suitable for regulated labs?',
                answer: 'It can become so, but it must be designed with audit trail, roles, versioning, a validation package and data-integrity requirements from the first enterprise releases.'
              },
              {
                question: 'How long does it take to see value?',
                answer: 'A lot depends on onboarding your data and libraries, but the fastest path is to start with verification/dereplication on high-frequency cases and already-available datasets.'
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-lg overflow-hidden animate-fade-in-up hover:border-indigo-200 transition-colors duration-200 bg-white"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors duration-200"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-slate-800 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform duration-200 shrink-0 ${
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
      <section id="beta" ref={sections.beta} className="bg-white px-6 py-20 shadow-sm">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in text-slate-900">
            Bring a real case into a pilot
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto animate-fade-in-up">
            Evaluate the product on your own spectra and see how it integrates with your current stack.
            We'll show you how the evidence score works on one of your cases.
          </p>
          {!success ? (
            <FormComponent
              onSubmit={handleSubmit}
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
                <h3 className="text-xl font-semibold text-green-800 mb-2">Thank you!</h3>
                <p className="text-green-700">{successMessage}</p>
              </div>
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-6 mt-10 animate-fade-in-up">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <span className="text-sm text-slate-600">Vendor-agnostic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <span className="text-sm text-slate-600">Pilot on your data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <span className="text-sm text-slate-600">Cloud or private deployment</span>
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
            <img src={logo} alt={`${BRAND} Logo`} className="h-8 w-auto mr-2" />
            <span className="text-2xl font-bold text-indigo-600">{BRAND}</span>
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

// Small inline icon wrapper to represent the evidence-score bar chart
const BarChartIcon: React.FC = () => (
  <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 14h3v4H7zM12 9h3v9h-3zM17 5h3v13h-3z" />
  </svg>
);

export default App;
