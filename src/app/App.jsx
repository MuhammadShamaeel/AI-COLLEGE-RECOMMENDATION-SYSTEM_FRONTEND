import { useState, useEffect, useRef } from 'react';
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
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [lastFilters, setLastFilters] = useState({});
  const searchSectionRef = useRef(null);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const isDemo = localStorage.getItem('demoMode');
    const isAuth = localStorage.getItem('isAuthenticated');
    
    if (token || isDemo || isAuth) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleAuth = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  const handleSearch = (colleges, filters) => {
    setSearchResults(colleges);
    setLastFilters(filters);
    setShowResults(colleges.length > 0);
    
    if (colleges.length > 0) {
      setTimeout(() => {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const scrollToSearch = () => {
    if (searchSectionRef.current) {
      searchSectionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-md border border-purple-500/30 text-white text-sm hover:from-purple-500/30 transition-all"
      >
        Logout
      </button>
      
      <ScrollAnimations />
      <AnimatedBackground />
      <FloatingParticles />

      <div className="relative z-10">
        <Hero onOpenChat={() => setShowChat(true)} onExplore={scrollToSearch} />
        
        <div ref={searchSectionRef}>
          <SearchSection onSearch={handleSearch} />
        </div>
        
        <div id="results-section">
          {showResults && searchResults.length > 0 && (
            <CollegeGrid colleges={searchResults} filters={lastFilters} />
          )}
          {showResults && searchResults.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[var(--muted-foreground)]">No colleges found. Try different search criteria.</p>
            </div>
          )}
        </div>
        
        <FeaturesSection />
        <Footer />
      </div>

      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300"
        style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {showChat && (
        <ChatbotInterface 
          onClose={() => setShowChat(false)} 
          searchFilters={lastFilters}
        />
      )}
    </div>
  );
}