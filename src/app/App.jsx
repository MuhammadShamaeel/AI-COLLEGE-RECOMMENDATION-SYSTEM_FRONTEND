import { useState, useEffect, useRef } from 'react'; // Add useRef
import Hero from './components/Hero';
import SearchSection from './components/SearchSection';
import FeaturesSection from './components/FeaturesSection';
import ChatbotInterface from './components/ChatbotInterface';
import CollegeGrid from './components/CollegeGrid';
import AnimatedBackground from './components/AnimatedBackground';
import ScrollAnimations from './components/ScrollAnimations';
import FloatingParticles from './components/FloatingParticles';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import { authAPI } from './services/api';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  // Create ref for results section
  const resultsRef = useRef(null);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Verify token is still valid
      authAPI.getProfile()
        .then(() => setIsAuthenticated(true))
        .catch(() => {
          localStorage.clear();
          setIsAuthenticated(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleAuth = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage onAuth={handleAuth} />;
  }

  // Updated handleSearch with scroll functionality
  const handleSearch = (course, location) => {
    const mockColleges = [
      {
        id: 1,
        name: "Al Ameen College",
        location: "Bangalore",
        course: course || "BCA",
        rating: 4.8,
        fees: "₹3,95,000 Total",
        placements: "92%",
        image: ""
      },
      {
        id: 2,
        name: "Global Engineering Academy",
        location: "Chennai",
        course: "Artificial Intelligence",
        rating: 4.6,
        fees: "₹3,00,000/year",
        placements: "92%",
        image: ""
      },
      {
        id: 3,
        name: "Future Skills University",
        location: "Mangalore",
        course: "Data Science",
        rating: 4.7,
        fees: "₹2,75,000/year",
        placements: "94%",
        image: ""
      },
      {
        id: 4,
        name: "Quantum Tech College",
        location: "Kerala",
        course: "Machine Learning",
        rating: 4.9,
        fees: "₹3,20,000/year",
        placements: "97%",
        image: ""
      }
    ];

    setSearchResults(mockColleges);
    setShowResults(true);
    
    // Scroll to results section after state update
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ fontFamily: 'var(--font-primary)' }}>
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="fixed top-4 left-320 z-50 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-md border border-purple-500/30 text-white font-medium text-sm hover:from-purple-500/30 hover:to-cyan-500/30 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group overflow-hidden relative"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
        <span className="relative flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400 group-hover:text-purple-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </span>
      </button>
      
      <ScrollAnimations />
      <AnimatedBackground />
      <FloatingParticles />

      <div className="relative z-10">
        <Hero onOpenChat={() => setShowChat(true)} />
        <SearchSection onSearch={handleSearch} />
        
        {/* Results section with ref */}
        <div ref={resultsRef}>
          {showResults && <CollegeGrid colleges={searchResults} />}
        </div>
        
        <FeaturesSection />
        <Footer />
      </div>

      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
        style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--neon-cyan)] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--neon-cyan)]"></span>
        </span>
      </button>

      {showChat && <ChatbotInterface onClose={() => setShowChat(false)} />}
    </div>
  );
}