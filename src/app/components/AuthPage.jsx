import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Star, Zap, BookOpen, Award } from 'lucide-react';
import { authAPI } from "../services/api";

const TITLE = "EDUNOVA";

/* Scanline sweep animation */
function ScanSweep({ delay }) {
  return (
    <motion.span
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-sm"
      style={{ display: 'block' }}
    >
      <motion.span
        className="absolute left-0 right-0 h-[3px]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.9), rgba(6,182,212,0.9), transparent)',
          boxShadow: '0 0 12px 4px rgba(139,92,246,0.5)',
          top: '-4px',
        }}
        initial={{ top: '-4px', opacity: 0 }}
        animate={{ top: ['-4px', '110%'], opacity: [0, 1, 1, 0] }}
        transition={{
          delay,
          duration: 0.55,
          ease: 'linear',
          times: [0, 0.05, 0.9, 1],
        }}
      />
    </motion.span>
  );
}

function AnimatedTitle() {
  const [phase, setPhase] = useState('idle');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [revealedSet, setRevealedSet] = useState(new Set());
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setPhase('scanning'), 400);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  useEffect(() => {
    if (phase !== 'scanning') return;
    if (activeIndex >= TITLE.length - 1) {
      setPhase('revealed');
      return;
    }
    const next = activeIndex + 1;
    timerRef.current = setTimeout(() => {
      setActiveIndex(next);
      setRevealedSet(prev => new Set([...prev, next]));
    }, activeIndex === -1 ? 0 : 160);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase, activeIndex]);

  useEffect(() => {
    if (phase !== 'revealed') return;
    const loop = setInterval(() => setPhase('pulse'), 3500);
    return () => clearInterval(loop);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'pulse') return;
    const t = setTimeout(() => setPhase('revealed'), 600);
    return () => clearTimeout(t);
  }, [phase]);

  const isPulse = phase === 'pulse';

  return (
    <div className="relative select-none">
      <h1
        className="relative text-6xl xl:text-7xl font-black tracking-[0.15em] leading-none z-10"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {TITLE.split('').map((char, i) => {
          const isRevealed = revealedSet.has(i);
          const isScanning = activeIndex === i;

          return (
            <motion.span
              key={i}
              className="relative inline-block overflow-visible"
              style={{ perspective: '400px' }}
              animate={
                isPulse && isRevealed
                  ? {
                      scale: [1, 1.08, 1],
                      filter: [
                        'brightness(1)',
                        'brightness(1.8) drop-shadow(0 0 12px rgba(139,92,246,1))',
                        'brightness(1)',
                      ],
                    }
                  : {}
              }
              transition={isPulse ? { duration: 0.5, delay: i * 0.04, ease: 'easeInOut' } : {}}
            >
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, rotateY: -90, scaleX: 0.3 }}
                animate={
                  isRevealed
                    ? { opacity: 1, rotateY: 0, scaleX: 1 }
                    : { opacity: 0, rotateY: -90, scaleX: 0.3 }
                }
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  color: 'var(--foreground)',
                  textShadow: isRevealed
                    ? '0 0 30px rgba(139,92,246,0.7), 0 0 60px rgba(139,92,246,0.3), 0 0 100px rgba(6,182,212,0.15)'
                    : 'none',
                  display: 'inline-block',
                  transformOrigin: 'left center',
                }}
              >
                {char}
              </motion.span>
              {isScanning && <ScanSweep delay={0} />}
              {isRevealed && (
                <motion.span
                  aria-hidden
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                  style={{
                    background: i % 2 === 0
                      ? 'linear-gradient(90deg, transparent, rgba(139,92,246,0.8), transparent)'
                      : 'linear-gradient(90deg, transparent, rgba(6,182,212,0.8), transparent)',
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: [0, 1, 0.4] }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
              )}
            </motion.span>
          );
        })}
      </h1>
    </div>
  );
}

export default function AuthPage({ onAuth }) {
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '', password2: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (mode === 'signup' && !form.username.trim()) e.username = 'Username is required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (mode === 'signup' && form.password !== form.password2) {
      e.password2 = 'Passwords do not match';
    }
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      if (mode === 'login') {
        console.log('Attempting login with:', form.email);
        const response = await authAPI.login({
          email: form.email,
          password: form.password,
        });
        
        console.log('Login response:', response.data);
        
        // Check if login was successful (status 200 and has tokens)
        if (response.status === 200) {
          // Store tokens if they exist
          if (response.data.access && response.data.refresh) {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
          }
          // Also store a simple auth flag
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', form.email);
          console.log('Login successful');
          onAuth();
        } else {
          setErrors({ general: 'Invalid email or password' });
        }
      } else {
        console.log('Attempting registration for:', form.email);
        const response = await authAPI.register({
          username: form.username,
          email: form.email,
          password: form.password,
          password2: form.password2,
        });
        
        console.log('Register response:', response.data);
        
        if (response.status === 201 || response.data.success) {
          // Auto login after successful registration
          const loginResponse = await authAPI.login({
            email: form.email,
            password: form.password,
          });
          
          if (loginResponse.status === 200) {
            if (loginResponse.data.access && loginResponse.data.refresh) {
              localStorage.setItem('access_token', loginResponse.data.access);
              localStorage.setItem('refresh_token', loginResponse.data.refresh);
            }
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userEmail', form.email);
            console.log('Registration and login successful');
            onAuth();
          } else {
            setErrors({ general: 'Registration successful but login failed. Please try logging in manually.' });
          }
        } else if (response.data.errors) {
          setErrors(response.data.errors);
        } else if (response.data.email) {
          setErrors({ email: response.data.email });
        } else if (response.data.username) {
          setErrors({ username: response.data.username });
        } else if (response.data.password) {
          setErrors({ password: response.data.password });
        } else {
          setErrors({ general: response.data.message || response.data.detail || 'Registration failed' });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      console.error('Error details:', error.response?.data);
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        if (errorData.errors) {
          setErrors(errorData.errors);
        } else if (errorData.username) {
          setErrors({ username: Array.isArray(errorData.username) ? errorData.username[0] : errorData.username });
        } else if (errorData.email) {
          setErrors({ email: Array.isArray(errorData.email) ? errorData.email[0] : errorData.email });
        } else if (errorData.password) {
          setErrors({ password: Array.isArray(errorData.password) ? errorData.password[0] : errorData.password });
        } else if (errorData.detail) {
          setErrors({ general: errorData.detail });
        } else if (errorData.message) {
          setErrors({ general: errorData.message });
        } else if (errorData.non_field_errors) {
          setErrors({ general: errorData.non_field_errors[0] });
        } else {
          setErrors({ general: 'Authentication failed. Please try again.' });
        }
      } else if (error.request) {
        setErrors({ general: 'Unable to connect to server. Please make sure the backend is running on port 8000.' });
      } else {
        setErrors({ general: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  // Demo login - bypass authentication for testing
  const handleDemoLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('demoMode', 'true');
    onAuth();
  };

  const features = [
    { icon: Zap, text: 'AI-powered college matching' },
    { icon: Star, text: 'Ratings & placement insights' },
    { icon: BookOpen, text: 'Detailed college profiles' },
    { icon: Award, text: 'Personalized recommendations' },
  ];

  return (
    <div className="min-h-screen flex overflow-hidden bg-[var(--background)]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--primary)] opacity-10 blur-[130px] animate-pulse" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[var(--accent)] opacity-10 blur-[130px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-col justify-center px-16 xl:px-24 w-[55%] relative z-10 overflow-hidden">
        <div
          className="absolute right-0 top-0 h-full w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(139,92,246,0.4) 30%, rgba(6,182,212,0.4) 70%, transparent)' }}
        />

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm font-semibold tracking-[0.3em] uppercase text-[var(--neon-cyan)] mb-4"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Welcome to
          </motion.p>

          <AnimatedTitle />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-6 text-lg text-[var(--muted-foreground)] leading-relaxed max-w-md"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Your AI-powered guide to discovering the perfect college — tailored to your goals, location, and ambitions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.7 }}
            className="mt-10 space-y-4"
          >
            {features.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 + i * 0.12, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)]/30 to-[var(--accent)]/20 border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[var(--neon-purple)]" />
                </div>
                <span className="text-sm text-[var(--muted-foreground)]" style={{ fontFamily: 'var(--font-body)' }}>{text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.7 }}
            className="mt-12 flex gap-4 flex-wrap"
          >
            {[['500+', 'Colleges'], ['5', 'Cities'], ['97%', 'Match Rate']].map(([val, label]) => (
              <div
                key={label}
                className="px-4 py-3 rounded-xl border border-[var(--border)] backdrop-blur-md"
                style={{ background: 'rgba(139,92,246,0.08)' }}
              >
                <div className="text-xl font-bold text-[var(--foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>{val}</div>
                <div className="text-xs text-[var(--muted-foreground)]" style={{ fontFamily: 'var(--font-body)' }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-4xl font-black tracking-widest text-[var(--foreground)]" style={{ fontFamily: 'var(--font-heading)', textShadow: '0 0 30px rgba(139,92,246,0.6)' }}>
              ED
            </h1>
            <p className="text-sm text-[var(--muted-foreground)] mt-1" style={{ fontFamily: 'var(--font-body)' }}>AI-Powered College Discovery</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="backdrop-blur-2xl rounded-3xl border border-[var(--border)] p-8"
            style={{
              background: 'rgba(15, 15, 45, 0.75)',
              boxShadow: '0 0 80px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)'
            }}
          >
            <div className="mb-6">
              <h2
                className="text-2xl font-bold text-[var(--foreground)]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] mt-1" style={{ fontFamily: 'var(--font-body)' }}>
                {mode === 'login' ? "Welcome back — let's find your college." : 'Join EduNova and start your journey.'}
              </p>
            </div>

            <div className="flex mb-6 p-1 rounded-xl bg-[var(--muted)] gap-1">
              {['login', 'signup'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setMode(tab); setErrors({}); }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    mode === tab
                      ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-md'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                  }`}
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  {tab === 'login' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>

            {/* General Error Message */}
            {errors.general && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wider" style={{ fontFamily: 'var(--font-primary)' }}>
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                    <input
                      type="text"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      placeholder="Your username"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--input-background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all text-sm"
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                  </div>
                  {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
                </motion.div>
              )}

              <div>
                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wider" style={{ fontFamily: 'var(--font-primary)' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--input-background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all text-sm"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wider" style={{ fontFamily: 'var(--font-primary)' }}>
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-xl bg-[var(--input-background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all text-sm"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>

              {mode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wider" style={{ fontFamily: 'var(--font-primary)' }}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password2}
                      onChange={(e) => setForm({ ...form, password2: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--input-background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all text-sm"
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                  </div>
                  {errors.password2 && <p className="text-red-400 text-xs mt-1">{errors.password2}</p>}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 mt-8 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  fontFamily: 'var(--font-primary)',
                  boxShadow: '0 0 30px rgba(139,92,246,0.35)'
                }}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    {mode === 'login' ? 'Enter EduNova' : 'Create Account'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Demo Login Button */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-3.5 rounded-xl border-2 border-[var(--primary)] text-[var(--neon-cyan)] font-semibold flex items-center justify-center gap-2 hover:bg-[var(--primary)]/10 transition-all duration-200 text-sm"
              >
                Continue as Guest (Demo)
              </button>
            </form>

            <p className="text-center text-xs text-[var(--muted-foreground)] mt-5" style={{ fontFamily: 'var(--font-body)' }}>
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setErrors({}); }}
                className="text-[var(--neon-purple)] hover:text-[var(--primary)] transition-colors font-medium"
              >
                {mode === 'login' ? 'Sign up free' : 'Sign in'}
              </button>
            </p>
          </motion.div>

          <p className="text-center text-xs text-[var(--muted-foreground)] mt-4 opacity-40" style={{ fontFamily: 'var(--font-body)' }}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}