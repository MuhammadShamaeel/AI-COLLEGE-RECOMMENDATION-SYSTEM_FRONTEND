import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, BookOpen } from 'lucide-react';


const locations = ['Bangalore', 'Mangalore', 'Chennai', 'Coimbatore', 'Kerala'];

export default function SearchSection({ onSearch }) {
  const [course, setCourse] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (course && location) {
      onSearch(course, location);
    }
  };

  return (
    <div id="search-section" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="text-4xl md:text-5xl text-center mb-4 text-[var(--foreground)]"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: '700' }}
          >
            Find Your Perfect College
          </h2>
          <p
            className="text-center text-[var(--muted-foreground)] mb-12 text-lg"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Search by course and location to discover the best institutions
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1]
          }}
          onSubmit={handleSubmit}
          className="relative backdrop-blur-xl rounded-2xl p-8 border border-[var(--border)]"
          style={{
            background: 'rgba(15, 15, 45, 0.4)',
            boxShadow: '0 0 60px rgba(139, 92, 246, 0.2)'
          }}
        >
          <div className="space-y-8 mb-8">
            <div className="relative">
              <label
                className="block mb-3 text-[var(--foreground)]"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: '500' }}
              >
                <BookOpen className="inline mr-2 h-5 w-5 text-[var(--neon-purple)]" />
                Course
              </label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="e.g., Computer Science, AI, Data Science"
                className="w-full px-4 py-3 rounded-xl bg-[var(--input-background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                style={{ fontFamily: 'var(--font-body)' }}
              />
            </div>

            <div className="relative">
              <label
                className="block mb-4 text-[var(--foreground)]"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: '500' }}
              >
                <MapPin className="inline mr-2 h-5 w-5 text-[var(--neon-cyan)]" />
                Select Location
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {locations.map((loc, index) => (
                  <motion.button
                    key={loc}
                    type="button"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLocation(loc)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 relative overflow-hidden ${
                      location === loc
                        ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white border-2 border-transparent'
                        : 'bg-[var(--input-background)] text-[var(--foreground)] border-2 border-[var(--border)] hover:border-[var(--primary)]'
                    }`}
                    style={{
                      fontFamily: 'var(--font-primary)',
                      boxShadow: location === loc ? '0 0 25px rgba(139, 92, 246, 0.5)' : 'none'
                    }}
                  >
                    <span className="relative z-10">{loc}</span>
                    {location === loc && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] opacity-50"
                        layoutId="locationHighlight"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!course || !location}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] text-white font-semibold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              boxShadow: '0 0 40px rgba(139, 92, 246, 0.4)',
              fontFamily: 'var(--font-primary)'
            }}
          >
            <Search className="h-5 w-5" />
            Search Colleges
          </button>
        </motion.form>
      </div>
    </div>
  );
}
