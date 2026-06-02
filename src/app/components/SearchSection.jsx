import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, BookOpen, GraduationCap, TrendingUp, Filter, Loader2, ChevronDown } from 'lucide-react';
import { collegesAPI } from '../services/api';

export default function SearchSection({ onSearch }) {
  const [filters, setFilters] = useState({
    state: '',
    location: '',
    program_level: '',
    course: '',
    sort_by: 'fee_asc'
  });
  const [filterOptions, setFilterOptions] = useState({
    states: [],
    locations: [],
    program_levels: [],
    specializations: []
  });
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  // Fetch filter options on mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        console.log('Fetching filter options...');
        const response = await collegesAPI.getFilterOptions();
        console.log('Filter options response:', response.data);
        
        if (response.data.success) {
          setFilterOptions({
            states: response.data.data.states || [],
            locations: response.data.data.locations || [],
            program_levels: response.data.data.program_levels || [],
            specializations: response.data.data.specializations || []
          });
        }
      } catch (err) {
        console.error('Error fetching filter options:', err);
        setError('Failed to load filter options. Please make sure the backend is running.');
      }
    };
    fetchFilterOptions();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSearching(true);
    setError('');
    
    try {
      // Build search params - only include non-empty values
      const searchParams = {};
      if (filters.course) searchParams.course = filters.course;
      if (filters.state) searchParams.state = filters.state;
      if (filters.location) searchParams.location = filters.location;
      if (filters.program_level) searchParams.program_level = filters.program_level;
      if (filters.sort_by) searchParams.sort_by = filters.sort_by;
      
      console.log('Searching with params:', searchParams);
      
      const response = await collegesAPI.getAll(searchParams);
      console.log('Search response:', response.data);
      
      if (response.data.success) {
        onSearch(response.data.data || [], filters);
      } else {
        setError('No colleges found');
        onSearch([], filters);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err.response?.data?.message || 'Failed to search colleges. Please make sure the backend is running on port 8000.');
      onSearch([], filters);
    } finally {
      setIsSearching(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      state: '',
      location: '',
      program_level: '',
      course: '',
      sort_by: 'fee_asc'
    });
  };

  return (
    <div id="search-section" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-3">
            Find Your Perfect College
          </h2>
          <p className="text-[var(--muted-foreground)]">
            Search by state, location, program, or course specialization
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[rgba(25,25,55,0.8)] to-[rgba(15,15,45,0.9)] backdrop-blur-xl rounded-2xl border border-[var(--border)] overflow-hidden"
        >
          {/* Search Input Row */}
          <div className="p-5 border-b border-[var(--border)]">
            <div className="relative">
              <input
                type="text"
                value={filters.course}
                onChange={(e) => handleFilterChange('course', e.target.value)}
                placeholder="Search by college, course, or specialization..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[var(--input-background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-base"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
            </div>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full px-5 py-3 flex items-center justify-between text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors border-b border-[var(--border)]"
          >
            <span className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Advanced Filters
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Filter Row */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-5 border-b border-[var(--border)]"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* State Filter */}
                <div>
                  <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wider">
                    STATE
                  </label>
                  <select
                    value={filters.state}
                    onChange={(e) => handleFilterChange('state', e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] text-sm"
                  >
                    <option value="">All States</option>
                    {filterOptions.states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wider">
                    LOCATION / CITY
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] text-sm"
                  >
                    <option value="">All Locations</option>
                    {filterOptions.locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Program Level Filter */}
                <div>
                  <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wider">
                    PROGRAM LEVEL
                  </label>
                  <select
                    value={filters.program_level}
                    onChange={(e) => handleFilterChange('program_level', e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] text-sm"
                  >
                    <option value="">All Programs</option>
                    {filterOptions.program_levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Sort and Action Row */}
          <div className="p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm text-[var(--muted-foreground)] flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Sort by Fee:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleFilterChange('sort_by', 'fee_asc')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filters.sort_by === 'fee_asc'
                      ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white'
                      : 'bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--primary)]'
                  }`}
                >
                  Lowest to Highest
                </button>
                <button
                  onClick={() => handleFilterChange('sort_by', 'fee_desc')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filters.sort_by === 'fee_desc'
                      ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white'
                      : 'bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--primary)]'
                  }`}
                >
                  Highest to Lowest
                </button>
              </div>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={clearFilters}
                className="px-5 py-2 rounded-lg border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--primary)] transition-all text-sm"
              >
                Clear Filters
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSearching}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2 text-sm"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Search Colleges
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="px-5 pb-5">
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center">
                {error}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}