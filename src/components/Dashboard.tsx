import React, { useState } from 'react';
import { Calendar, Clock, ExternalLink, Trash2, Search, Filter } from 'lucide-react';
import { mockSummaries } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  
  // Filter summaries by current user
  const userSummaries = mockSummaries.filter(summary => summary.userId === user?.id);
  
  // Apply search filter
  const filteredSummaries = userSummaries.filter(summary =>
    summary.videoTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    summary.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort summaries
  const sortedSummaries = filteredSummaries.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = (summaryId: string) => {
    // In a real app, this would make an API call
    console.log('Delete summary:', summaryId);
  };

  if (sortedSummaries.length === 0 && searchTerm === '') {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center py-16">
          <div className="bg-gray-100 p-6 rounded-full inline-block mb-6">
            <Calendar className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No summaries yet</h2>
          <p className="text-gray-600 mb-8">
            Start by summarizing your first YouTube video to see your history here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Video Summaries</h1>
        <p className="text-gray-600">
          You've summarized {userSummaries.length} video{userSummaries.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Summaries</p>
              <p className="text-2xl font-bold text-gray-900">{userSummaries.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Usage</p>
              <p className="text-2xl font-bold text-gray-900">{user?.dailyUsage || 0}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Remaining Today</p>
              <p className="text-2xl font-bold text-gray-900">
                {user?.isPremium ? '∞' : Math.max(0, 3 - (user?.dailyUsage || 0))}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Filter className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Account Type</p>
              <p className="text-lg font-bold text-gray-900">
                {user?.isPremium ? 'Premium' : 'Free'}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${user?.isPremium ? 'bg-yellow-100' : 'bg-gray-100'}`}>
              <span className={`text-2xl ${user?.isPremium ? 'text-yellow-600' : 'text-gray-600'}`}>
                {user?.isPremium ? '★' : '○'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search summaries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Summaries List */}
      {sortedSummaries.length === 0 ? (
        <div className="text-center py-16">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No summaries found</h3>
          <p className="text-gray-600">Try adjusting your search terms</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedSummaries.map((summary) => (
            <div key={summary.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-64 flex-shrink-0">
                    <img
                      src={summary.videoThumbnail}
                      alt={summary.videoTitle}
                      className="w-full h-36 object-cover rounded-lg"
                    />
                    <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                      <span>{summary.videoDuration}</span>
                      <a
                        href={summary.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Watch
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                        {summary.videoTitle}
                      </h3>
                      <button
                        onClick={() => handleDelete(summary.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete summary"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(summary.createdAt)}
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed line-clamp-4">
                      {summary.summary}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;