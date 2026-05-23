import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star, MapPin, DollarSign, TrendingUp, GraduationCap,
  X, Calendar, Users, Building2, Award, Globe, Phone, Mail, BookOpen,
  CreditCard, Shield, ChevronRight, CheckCircle, Filter, Sliders
} from 'lucide-react';

function CollegeModal({ college, onClose, searchedCourse }) {
  // Get course-specific details based on the searched course
  const getCourseDetails = (courseName) => {
    if (!courseName) {
      courseName = "bca";
    }
    
    const normalizeCourse = (str) => str?.toLowerCase().trim() || "";
    const searchedCourseNormalized = normalizeCourse(courseName);
    
    const courseFees = {
      "bca": {
        name: "BCA",
        duration: "3 Years (6 Semesters)",
        totalFees: "₹3,95,000",
        specialization: "Artificial Intelligence & Machine Learning",
        semesterWiseFees: [
          { semester: "Semester 1", amount: "₹1,30,000" },
          { semester: "Semester 2", amount: "₹59,500" },
          { semester: "Semester 3", amount: "₹50,900" },
          { semester: "Semester 4", amount: "₹40,900" },
          { semester: "Semester 5", amount: "₹36,400" },
          { semester: "Semester 6", amount: "₹26,500" }
        ],
        eligibility: "10+2 with minimum 50% marks in any stream",
        careerOpportunities: [
          "Software Developer", "AI/ML Engineer", "Data Scientist",
          "Cloud Architect", "Cybersecurity Analyst", "Database Administrator"
        ]
      },
      "bba": {
        name: "BBA",
        duration: "3 Years (6 Semesters)",
        totalFees: "₹3,70,000",
        specialization: "Aviation & Airport Management / Logistics & Supply Chain Management",
        semesterWiseFees: [
          { semester: "Semester 1", amount: "₹1,10,000" },
          { semester: "Semester 2", amount: "₹64,000" },
          { semester: "Semester 3", amount: "₹46,000" },
          { semester: "Semester 4", amount: "₹36,000" },
          { semester: "Semester 5", amount: "₹36,000" },
          { semester: "Semester 6", amount: "₹26,000" }
        ],
        eligibility: "10+2 with minimum 50% marks in any stream",
        careerOpportunities: [
          "Aviation Manager", "Airport Operations", "Supply Chain Manager",
          "Logistics Coordinator", "Business Analyst", "Marketing Manager"
        ]
      },
      "btech": {
        name: "B.Tech",
        duration: "4 Years (8 Semesters)",
        totalFees: "₹15,000 - ₹25,000 per semester",
        specialization: "Computer Science, ECE, EEE, Mechanical, Civil",
        semesterWiseFees: [
          { semester: "Per Semester (90%+ in +2)", amount: "₹15,000" },
          { semester: "Per Semester (60-89% in +2)", amount: "₹25,000" },
          { semester: "Lateral Entry (Per Semester)", amount: "₹15,000" }
        ],
        eligibility: "10+2 with PCM, minimum 60% marks",
        careerOpportunities: [
          "Software Engineer", "Hardware Engineer", "Network Engineer",
          "Civil Engineer", "Mechanical Engineer", "Electronics Engineer"
        ]
      }
    };
    
    let courseKey = "bca";
    if (searchedCourseNormalized.includes("bba") || searchedCourseNormalized.includes("b.b.a")) {
      courseKey = "bba";
    } else if (searchedCourseNormalized.includes("btech") || searchedCourseNormalized.includes("b.tech") || searchedCourseNormalized.includes("engineering")) {
      courseKey = "btech";
    }
    
    return courseFees[courseKey];
  };

  const courseDetails = getCourseDetails(searchedCourse);
  
  const collegeDetails = {
    name: college?.name || "College",
    location: college?.location || "Unknown",
    established: 1978,
    accreditation: "NAAC A+ | NBA Accredited",
    totalStudents: "5,000+",
    campusArea: "25 acres",
    address: "Hosur Road, Near Central Silk Board, Bengaluru, Karnataka 560027",
    phone: "+91 80 2223 4567",
    email: "admissions@alameen.edu.in",
    website: "www.alameen.edu.in",
    facilities: [
      "AI Research Lab", "Cloud Computing Center", "Cyber Security Lab",
      "Aviation Training Center", "Smart Classrooms", "Library with 50,000+ Books",
      "Hostel Facilities", "Sports Complex", "Cafeteria", "Transportation"
    ],
    topRecruiters: ["Infosys", "TCS", "Wipro", "Accenture", "Deloitte", "Amazon", "Microsoft"],
    placementStats: {
      highest: "₹24 LPA",
      average: "₹8.5 LPA",
      placementRate: college?.placements || "92%"
    },
    scholarships: [
      "Merit-based: Up to 50% fee waiver for 90%+ in +2",
      "Sports quota scholarships available",
      "Minority scholarship for eligible students"
    ]
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[var(--border)]"
          style={{
            background: 'rgba(10, 10, 31, 0.98)',
            boxShadow: '0 0 100px rgba(139, 92, 246, 0.3)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 p-6 border-b border-[var(--border)] bg-gradient-to-r from-[var(--primary)]/30 via-[var(--secondary)]/20 to-[var(--accent)]/30 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-lg">
                    {collegeDetails.accreditation}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
                    Established {collegeDetails.established}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/30">
                    {courseDetails.name} Course
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-[var(--foreground)] mt-2">
                  {collegeDetails.name}
                </h2>
                <div className="flex items-center gap-4 mt-2 flex-wrap">
                  <div className="flex items-center gap-1.5 text-[var(--muted-foreground)] text-sm">
                    <MapPin className="w-3.5 h-3.5 text-[var(--neon-purple)]" />
                    <span>{collegeDetails.location}</span>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-yellow-300 font-semibold text-sm">{college?.rating || "4.5"} ★</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[var(--neon-cyan)] text-sm">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Placement Rate: {collegeDetails.placementStats.placementRate}</span>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-white/10 rounded-xl p-2 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Users, label: "Total Students", value: collegeDetails.totalStudents, color: "var(--neon-purple)" },
                { icon: Building2, label: "Campus Area", value: collegeDetails.campusArea, color: "var(--neon-blue)" },
                { icon: TrendingUp, label: "Highest Package", value: collegeDetails.placementStats.highest, color: "var(--neon-cyan)" },
                { icon: Award, label: "Avg Package", value: collegeDetails.placementStats.average, color: "var(--neon-pink)" }
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="rounded-xl p-4 text-center border border-[var(--border)]" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <Icon className="w-5 h-5 mx-auto mb-2" style={{ color }} />
                  <div className="text-xs text-[var(--muted-foreground)] mb-1">{label}</div>
                  <div className="text-sm font-semibold text-[var(--foreground)]">{value}</div>
                </div>
              ))}
            </div>

            {/* Course Details Section */}
            <div className="rounded-xl p-5 border border-[var(--primary)]/30" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(6,182,212,0.05) 100%)' }}>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <h3 className="text-xl font-semibold text-[var(--foreground)] flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[var(--neon-purple)]" />
                  {courseDetails.name} Program Details
                </h3>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-[var(--primary)]/20 text-[var(--neon-purple)]">
                  Duration: {courseDetails.duration}
                </span>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-[var(--muted-foreground)]">
                  <strong className="text-[var(--neon-cyan)]">Specialization:</strong> {courseDetails.specialization}
                </p>
              </div>

              {/* Fee Structure */}
              <div className="mb-5">
                <h4 className="text-md font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[var(--neon-cyan)]" />
                  Fee Structure
                </h4>
                <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
                  <table className="w-full">
                    <thead className="bg-[var(--primary)]/10">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--foreground)]">Semester</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-[var(--foreground)]">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courseDetails.semesterWiseFees.map((fee, idx) => (
                        <tr key={idx} className="border-t border-[var(--border)]">
                          <td className="px-4 py-3 text-sm text-[var(--muted-foreground)]">{fee.semester}</td>
                          <td className="px-4 py-3 text-right text-sm font-semibold text-[var(--neon-cyan)]">{fee.amount}</td>
                        </tr>
                      ))}
                      <tr className="border-t border-[var(--primary)]/30 bg-[var(--primary)]/5">
                        <td className="px-4 py-3 text-sm font-semibold text-[var(--foreground)]">Total Course Fees</td>
                        <td className="px-4 py-3 text-right text-md font-bold text-[var(--neon-purple)]">{courseDetails.totalFees}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Eligibility */}
              <div className="mb-4 p-3 rounded-lg bg-[var(--muted)]/30">
                <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Eligibility Criteria
                </h4>
                <p className="text-sm text-[var(--muted-foreground)]">{courseDetails.eligibility}</p>
              </div>

              {/* Career Opportunities */}
              <div>
                <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[var(--neon-purple)]" />
                  Career Opportunities after {courseDetails.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {courseDetails.careerOpportunities.map((career, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-lg text-xs border border-[var(--accent)]/30 text-[var(--neon-cyan)] bg-[var(--accent)]/10">
                      {career}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[var(--neon-blue)]" />
                Campus Facilities
              </h3>
              <div className="flex flex-wrap gap-2">
                {collegeDetails.facilities.map((facility, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg text-xs border border-[var(--accent)]/30 text-[var(--neon-cyan)] bg-[var(--accent)]/10">
                    {facility}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Recruiters */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[var(--neon-purple)]" />
                Top Recruiters
              </h3>
              <div className="flex flex-wrap gap-2">
                {collegeDetails.topRecruiters.map((recruiter, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg text-xs border border-[var(--primary)]/30 text-[var(--neon-purple)] bg-[var(--primary)]/10 font-medium">
                    {recruiter}
                  </span>
                ))}
              </div>
            </div>

            {/* Scholarships */}
            <div className="rounded-xl p-4 border border-[var(--border)]" style={{ background: 'rgba(6,182,212,0.05)' }}>
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[var(--neon-cyan)]" />
                Scholarships & Financial Aid
              </h3>
              <ul className="space-y-2">
                {collegeDetails.scholarships.map((scholarship, idx) => (
                  <li key={idx} className="text-sm text-[var(--muted-foreground)] flex items-start gap-2">
                    <span className="text-[var(--neon-cyan)]">•</span>
                    {scholarship}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="rounded-xl p-4 border border-[var(--border)] space-y-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Contact Information</h3>
              {[
                { icon: MapPin, text: collegeDetails.address, color: "var(--neon-purple)" },
                { icon: Phone, text: collegeDetails.phone, color: "var(--neon-cyan)" },
                { icon: Mail, text: collegeDetails.email, color: "var(--neon-blue)" },
                { icon: Globe, text: collegeDetails.website, color: "var(--neon-pink)" }
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color }} />
                  <span className="text-sm text-[var(--muted-foreground)] break-all">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Helper function to extract numeric value from fee string
const getNumericFee = (feeString) => {
  if (!feeString) return Infinity;
  const match = feeString.match(/[\d,]+/);
  if (match) {
    return parseInt(match[0].replace(/,/g, ''));
  }
  return Infinity;
};

export default function CollegeGrid({ colleges, searchedCourse }) {
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedFeeRange, setSelectedFeeRange] = useState('all');
  const [showFilter, setShowFilter] = useState(false);

  const collegesList = Array.isArray(colleges) ? colleges : [];

  // Calculate actual min and max fees from colleges
  const allFees = collegesList.map(c => getNumericFee(c.fees)).filter(f => f !== Infinity);
  const actualMinFee = allFees.length > 0 ? Math.min(...allFees) : 0;
  const actualMaxFee = allFees.length > 0 ? Math.max(...allFees) : 500000;

  // Filter colleges based on selected fee range
  const filterByFeeRange = (college) => {
    const numericFee = getNumericFee(college.fees);
    
    switch(selectedFeeRange) {
      case 'under2':
        return numericFee < 200000;
      case '2to4':
        return numericFee >= 200000 && numericFee <= 400000;
      case 'above4':
        return numericFee > 400000;
      default:
        return true;
    }
  };

  const filteredColleges = collegesList.filter(filterByFeeRange);

  const formatCurrency = (value) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    return `₹${value.toLocaleString()}`;
  };

  if (collegesList.length === 0) {
    return null;
  }

  return (
    <div className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl text-center md:text-left text-[var(--foreground)]"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: '700' }}
          >
            Top Matches
            <span className="text-sm text-[var(--muted-foreground)] ml-3">
              ({filteredColleges.length} colleges)
            </span>
          </motion.h2>

          <button
            onClick={() => setShowFilter(!showFilter)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-md border border-purple-500/30 text-white font-medium text-sm hover:from-purple-500/30 hover:to-cyan-500/30 hover:border-purple-500/50 transition-all duration-300 flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filter by Fees
            {selectedFeeRange !== 'all' && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-[var(--neon-purple)] text-xs">Active</span>
            )}
          </button>
        </div>

        {/* Filter Panel with Simple Button Options */}
        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8 p-6 rounded-2xl border border-[var(--border)] backdrop-blur-xl"
              style={{ background: 'rgba(15, 15, 45, 0.6)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[var(--neon-cyan)]" />
                  <span className="text-sm font-semibold text-[var(--foreground)]">Filter by Fee Range</span>
                </div>
                {selectedFeeRange !== 'all' && (
                  <button
                    onClick={() => setSelectedFeeRange('all')}
                    className="text-xs text-[var(--neon-cyan)] hover:underline px-3 py-1 rounded-lg bg-[var(--muted)]/30"
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              {/* Fee Range Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                  onClick={() => setSelectedFeeRange('all')}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-between ${
                    selectedFeeRange === 'all'
                      ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-lg'
                      : 'bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--primary)]'
                  }`}
                >
                  <span>💰 All Fees</span>
                  <span className="text-xs opacity-70">{formatCurrency(actualMinFee)} - {formatCurrency(actualMaxFee)}</span>
                </button>
                
                <button
                  onClick={() => setSelectedFeeRange('under2')}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-between ${
                    selectedFeeRange === 'under2'
                      ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-lg'
                      : 'bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--primary)]'
                  }`}
                >
                  <span>🟢 Under ₹2 Lakhs</span>
                  <span className="text-xs opacity-70">{"< ₹2L"}</span>
                </button>
                
                <button
                  onClick={() => setSelectedFeeRange('2to4')}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-between ${
                    selectedFeeRange === '2to4'
                      ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-lg'
                      : 'bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--primary)]'
                  }`}
                >
                  <span>🟡 ₹2L - ₹4 Lakhs</span>
                  <span className="text-xs opacity-70">{"₹2L - ₹4L"}</span>
                </button>
                
                <button
                  onClick={() => setSelectedFeeRange('above4')}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-between ${
                    selectedFeeRange === 'above4'
                      ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-lg'
                      : 'bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--primary)]'
                  }`}
                >
                  <span>🔴 Above ₹4 Lakhs</span>
                  <span className="text-xs opacity-70">{"> ₹4L"}</span>
                </button>
              </div>

              {/* Fee Range Info */}
              <div className="mt-4 pt-3 border-t border-[var(--border)] text-center">
                <p className="text-xs text-[var(--muted-foreground)]">
                  {selectedFeeRange === 'all' && `Showing all colleges (${filteredColleges.length} colleges)`}
                  {selectedFeeRange === 'under2' && `Showing colleges with fees under ₹2 Lakhs (${filteredColleges.length} colleges)`}
                  {selectedFeeRange === '2to4' && `Showing colleges with fees between ₹2L - ₹4L (${filteredColleges.length} colleges)`}
                  {selectedFeeRange === 'above4' && `Showing colleges with fees above ₹4 Lakhs (${filteredColleges.length} colleges)`}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Colleges Grid - No badges on cards */}
        {filteredColleges.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="text-6xl mb-4">😅</div>
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">No colleges found in this fee range</h3>
            <p className="text-[var(--muted-foreground)]">Try selecting a different fee range</p>
            <button
              onClick={() => setSelectedFeeRange('all')}
              className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white text-sm hover:from-purple-500/30 transition-all"
            >
              Show All Colleges
            </button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredColleges.map((college, index) => (
              <motion.div
                key={college.id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover={{ scale: 1.02, y: -6 }}
                className="group relative backdrop-blur-xl rounded-2xl overflow-hidden border border-[var(--border)] cursor-pointer"
                style={{ background: 'rgba(15, 15, 45, 0.4)' }}
                onClick={() => setSelectedCollege(college)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]" />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--neon-cyan)] transition-colors">
                      {college.name}
                    </h3>
                    <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-300 font-bold text-sm">{college.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4 text-[var(--muted-foreground)] text-sm">
                    <MapPin className="w-3.5 h-3.5 text-[var(--neon-purple)]" />
                    <span>{college.location}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-lg bg-[var(--muted)] border border-[var(--border)]">
                    <GraduationCap className="w-4 h-4 text-[var(--neon-blue)]" />
                    <span className="text-sm text-[var(--foreground)]">{college.course}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="rounded-lg p-3 border border-[var(--border)]" style={{ background: 'rgba(6,182,212,0.05)' }}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <DollarSign className="w-3.5 h-3.5 text-[var(--neon-cyan)]" />
                        <span className="text-xs text-[var(--muted-foreground)]">Total Fees</span>
                      </div>
                      <div className="text-sm font-semibold text-[var(--foreground)]">{college.fees}</div>
                    </div>
                    <div className="rounded-lg p-3 border border-[var(--border)]" style={{ background: 'rgba(139,92,246,0.05)' }}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <TrendingUp className="w-3.5 h-3.5 text-[var(--neon-purple)]" />
                        <span className="text-xs text-[var(--muted-foreground)]">Placements</span>
                      </div>
                      <div className="text-sm font-semibold text-[var(--foreground)]">{college.placements}</div>
                    </div>
                  </div>
                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2">
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {selectedCollege && (
        <CollegeModal
          college={selectedCollege}
          searchedCourse={searchedCourse}
          onClose={() => setSelectedCollege(null)}
        />
      )}
    </div>
  );
}