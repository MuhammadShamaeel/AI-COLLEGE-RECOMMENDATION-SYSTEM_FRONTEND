import { motion } from 'motion/react';


export default function Hero({ onOpenChat }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[var(--border)] opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[var(--border)] opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[var(--border)] opacity-20"></div>

      <div className="max-w-6xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-purple)] via-[var(--neon-blue)] to-[var(--neon-cyan)]"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: '800',
              letterSpacing: '0.02em',
              lineHeight: '1.1',
              textShadow: '0 0 80px rgba(139, 92, 246, 0.5)'
            }}
          >
            EDUNOVA
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p
            className="text-2xl md:text-4xl mb-8 text-[var(--foreground)]"
            style={{ fontFamily: 'var(--font-primary)', fontWeight: '500' }}
          >
            AI-Powered College Discovery Platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p
            className="text-lg md:text-xl mb-12 text-[var(--muted-foreground)] max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Discover your perfect college with intelligent RAG-powered search.
            Get instant answers about courses, fees, placements, and more.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex gap-6 justify-center flex-wrap"
        >
          <button
            onClick={() => {
              document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            style={{
              boxShadow: '0 0 40px rgba(139, 92, 246, 0.4)',
              fontFamily: 'var(--font-primary)'
            }}
          >
            Explore Colleges
          </button>

          <button
            onClick={onOpenChat}
            className="px-8 py-4 rounded-xl border-2 border-[var(--primary)] text-[var(--foreground)] font-semibold text-lg hover:bg-[var(--primary)] hover:text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Ask AI Assistant
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex items-center justify-center gap-8 flex-wrap"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-[var(--neon-cyan)] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              500+
            </div>
            <div className="text-sm text-[var(--muted-foreground)]" style={{ fontFamily: 'var(--font-body)' }}>
              Colleges
            </div>
          </div>

          <div className="w-px h-12 bg-gradient-to-b from-transparent via-[var(--border)] to-transparent"></div>

          <div className="text-center">
            <div className="text-4xl font-bold text-[var(--neon-purple)] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              95%
            </div>
            <div className="text-sm text-[var(--muted-foreground)]" style={{ fontFamily: 'var(--font-body)' }}>
              Accuracy
            </div>
          </div>

          <div className="w-px h-12 bg-gradient-to-b from-transparent via-[var(--border)] to-transparent"></div>

          <div className="text-center">
            <div className="text-4xl font-bold text-[var(--neon-blue)] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              24/7
            </div>
            <div className="text-sm text-[var(--muted-foreground)]" style={{ fontFamily: 'var(--font-body)' }}>
              AI Support
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>
    </div>
  );
}
