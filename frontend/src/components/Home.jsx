import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Brain, Search, ArrowRight, History, Clock, X, Menu } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      setSearchHistory(prev => [searchQuery, ...prev].slice(0, 10)); // Limit to 10 items

      // Simulate an API call
      setTimeout(() => {
        setIsLoading(false);
        setSearchQuery('');
      }, 2000); // Replace with actual API call
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#B13314]">
      {/* Backdrop for mobile history sidebar */}
      {isHistoryOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsHistoryOpen(false)}
        />
      )}

      {/* Navigation */}
      <nav className="bg-[#B13314] fixed w-full z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">AcademIQ</span>
            </div>
            <button
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              className="text-white hover:text-[#E9A240] focus:outline-none md:hidden"
              aria-label="Toggle history"
              aria-expanded={isHistoryOpen}
            >
              {isHistoryOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-16 flex">
        {/* History Sidebar */}
        <div
          className={`md:static md:translate-x-0 fixed inset-y-0 left-0 transform ${
            isHistoryOpen ? 'translate-x-0' : '-translate-x-full'
          } w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-20 pt-16 md:pt-0 md:h-[calc(100vh-4rem)] md:mt-16`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <History className="w-5 h-5 mr-2 text-[#B13314]" />
                <h2 className="text-lg font-semibold text-gray-900">Search History</h2>
              </div>
              <button
                onClick={() => setSearchHistory([])}
                className="text-sm text-[#B13314] hover:text-[#E9A240]"
              >
                Clear
              </button>
            </div>
            <div className="space-y-3">
              {searchHistory.map((query, index) => (
                <div
                  key={index}
                  className="flex items-center text-gray-600 hover:text-[#B13314] group cursor-pointer p-2 rounded-lg hover:bg-gray-50"
                  onClick={() => {
                    setSearchQuery(query);
                    setIsHistoryOpen(false);
                  }}
                >
                  <Clock className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100" />
                  <span className="text-sm truncate">{query}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <main className="bg-white min-h-[calc(100vh-4rem)] p-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-2">
                  Learn Smarter with AI
                </h1>
                <em className='mb-10 text-[#B13314]'>Smart learning for smarter students.</em>
                <p className="text-xl text-gray-600 mb-12 mt-8 max-w-2xl mx-auto">
                  Explore any subject with personalized lessons and interactive quizzes generated in real-time.
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-16">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter any topic to start learning..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E9A240] focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-2 bg-[#B13314] text-white px-4 py-1.5 rounded-md hover:bg-[#E9A240] transition flex items-center"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          Learn <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                    <div className="bg-[#E9A240] w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="text-white w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Structured Lessons</h3>
                    <p className="text-gray-600">
                      Complex topics broken down into digestible key points with real-world examples and practical applications.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                    <div className="bg-[#E9A240] w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Brain className="text-white w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Interactive Quizzes</h3>
                    <p className="text-gray-600">
                      Test your knowledge with AI-generated quizzes that adapt to your learning progress.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;