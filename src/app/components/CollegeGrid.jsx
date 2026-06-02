import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, DollarSign, GraduationCap, ChevronRight, X, Building2, TrendingUp } from 'lucide-react';

// College Modal
function CollegeModal({ college, onClose }) {
  const primaryCourse = college.courses?.[0];
  const allCourses = college.courses || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl rounded-2xl border border-[var(--border)] overflow-hidden"
          style={{ background: 'rgba(15, 15, 45, 0.98)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-[var(--border)] bg-gradient-to-r from-[var(--primary)]/10 to-transparent">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h2 className="text-2xl font-bold text-[var(--foreground)]">{college.name}</h2>
                <div className="flex items-center gap-2 mt-1 text-sm text-[var(--muted-foreground)]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{college.location}, {college.state}</span>
                </div>
              </div>
              <button onClick={onClose} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4">
            {primaryCourse && (
              <div className="rounded-xl p-4 border border-[var(--primary)]/30" style={{ background: 'rgba(139,92,246,0.05)' }}>
                <h3 className="font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2 text-sm">
                  <GraduationCap className="w-4 h-4 text-[var(--neon-purple)]" />
                  Primary Program
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b border-[var(--border)] text-sm">
                    <span className="text-[var(--muted-foreground)]">Program Level:</span>
                    <span className="text-[var(--foreground)]">{primaryCourse.program_level || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border)] text-sm">
                    <span className="text-[var(--muted-foreground)]">Specialization:</span>
                    <span className="text-[var(--foreground)]">{primaryCourse.specialization || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-1 text-sm">
                    <span className="text-[var(--muted-foreground)]">Total Fee:</span>
                    <span className="text-[var(--neon-cyan)] font-bold">₹{primaryCourse.total_fee}</span>
                  </div>
                </div>
              </div>
            )}

            {allCourses.length > 1 && (
              <div className="rounded-xl p-4 border border-[var(--border)]">
                <h3 className="font-semibold text-[var(--foreground)] mb-2 text-sm">Other Programs ({allCourses.length - 1})</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {allCourses.slice(1, 5).map((course, idx) => (
                    <div key={idx} className="text-sm py-1 border-b border-[var(--border)] last:border-0">
                      <div className="flex justify-between">
                        <span className="text-[var(--muted-foreground)]">{course.program_level}</span>
                        <span className="text-[var(--neon-cyan)] text-xs">₹{course.total_fee}</span>
                      </div>
                      {course.specialization && (
                        <div className="text-xs text-[var(--muted-foreground)] mt-1">{course.specialization}</div>
                      )}
                    </div>
                  ))}
                  {allCourses.length > 5 && (
                    <p className="text-xs text-[var(--muted-foreground)] text-center pt-2">
                      +{allCourses.length - 5} more programs
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              {college.hostel_available && (
                <span className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-400 border border-green-500/30">
                  🏠 Hostel Available
                </span>
              )}
              {college.placement_available && (
                <span className="px-3 py-1 rounded-full text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  💼 Placement Support
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Helper functions
const getPrimaryCourse = (college) => {
  if (college.courses && college.courses.length > 0) {
    const firstCourse = college.courses[0];
    // Show specialization if available, otherwise program level
    if (firstCourse.specialization && firstCourse.specialization !== 'N/A') {
      return firstCourse.specialization;
    }
    return firstCourse.program_level || 'Various Programs';
  }
  return 'Various Programs';
};

const getDisplayFee = (college) => {
  if (college.courses && college.courses.length > 0) {
    // Get min and max fees
    const fees = college.courses.map(c => {
      const match = c.total_fee?.match(/[\d,]+/);
      if (match) {
        return parseInt(match[0].replace(/,/g, ''));
      }
      return null;
    }).filter(f => f !== null);
    
    if (fees.length === 0) {
      return college.courses[0].total_fee;
    }
    
    const minFee = Math.min(...fees);
    const maxFee = Math.max(...fees);
    
    if (minFee === maxFee) {
      if (minFee >= 100000) {
        return `₹${(minFee / 100000).toFixed(1)}L`;
      }
      return `₹${minFee.toLocaleString()}`;
    }
    
    // Show range
    const minFormatted = minFee >= 100000 ? `${(minFee / 100000).toFixed(1)}L` : minFee.toLocaleString();
    const maxFormatted = maxFee >= 100000 ? `${(maxFee / 100000).toFixed(1)}L` : maxFee.toLocaleString();
    
    return `₹${minFormatted} - ₹${maxFormatted}`;
  }
  return 'Contact college';
};

const getCourseCount = (college) => {
  return college.courses?.length || 0;
};

export default function CollegeGrid({ colleges, filters }) {
  const [selectedCollege, setSelectedCollege] = useState(null);
  const collegesList = Array.isArray(colleges) ? colleges : [];

  if (collegesList.length === 0) {
    return (
      <div className="py-20 px-4 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">No Colleges Found</h3>
        <p className="text-[var(--muted-foreground)]">Try different search criteria or clear filters</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            Colleges Found
            <span className="text-sm text-[var(--muted-foreground)] ml-2">({collegesList.length} colleges)</span>
          </h2>
          {filters?.course && (
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              Showing colleges with <span className="text-[var(--neon-cyan)]">"{filters.course}"</span> courses
            </p>
          )}
        </div>

        {/* College Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {collegesList.map((college, index) => (
            <motion.div
              key={college.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
              whileHover={{ y: -4 }}
              className="group rounded-xl overflow-hidden border border-[var(--border)] cursor-pointer transition-all duration-300 hover:border-[var(--primary)]/50 hover:shadow-lg"
              style={{ background: 'rgba(20, 20, 50, 0.6)' }}
              onClick={() => setSelectedCollege(college)}
            >
              <div className="p-5">
                {/* College Name */}
                <h3 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--neon-cyan)] transition-colors mb-2 line-clamp-1">
                  {college.name}
                </h3>
                
                {/* Location */}
                <div className="flex items-center gap-1.5 mb-3 text-xs text-[var(--muted-foreground)]">
                  <MapPin className="w-3 h-3 text-[var(--neon-purple)]" />
                  <span>{college.location}</span>
                  {college.state && <span>({college.state})</span>}
                </div>
                
                {/* Course Count Badge */}
                <div className="inline-flex items-center gap-1.5 mb-3 px-2 py-1 rounded-md bg-[var(--muted)]/30 border border-[var(--border)]">
                  <GraduationCap className="w-3 h-3 text-[var(--neon-blue)]" />
                  <span className="text-xs text-[var(--foreground)]">
                    {getCourseCount(college)} Programs Available
                  </span>
                </div>
                
                {/* Primary Course */}
                <div className="mb-3">
                  <p className="text-xs text-[var(--muted-foreground)] mb-1">Primary Course:</p>
                  <p className="text-sm text-[var(--foreground)] font-medium line-clamp-2">
                    {getPrimaryCourse(college)}
                  </p>
                </div>
                
                {/* Fee */}
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--muted-foreground)]">Fee Range</span>
                    <span className="text-base font-bold text-[var(--neon-cyan)]">{getDisplayFee(college)}</span>
                  </div>
                </div>
                
                {/* Features */}
                <div className="flex gap-2 mb-4">
                  {college.hostel_available && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                      Hostel
                    </span>
                  )}
                  {college.placement_available && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      Placement
                    </span>
                  )}
                </div>
                
                {/* View Button */}
                <button className="w-full py-2 rounded-lg bg-[var(--primary)]/10 text-[var(--neon-cyan)] text-sm font-medium transition-all duration-200 hover:bg-[var(--primary)] hover:text-white flex items-center justify-center gap-1">
                  View Details
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCollege && (
        <CollegeModal
          college={selectedCollege}
          onClose={() => setSelectedCollege(null)}
        />
      )}
    </div>
  );
}