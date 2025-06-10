import React, { useState } from 'react';
import { Youtube, Sparkles, Clock, AlertCircle, Crown, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SummarizerProps {
  onUpgradeClick: () => void;
}

const Summarizer: React.FC<SummarizerProps> = ({ onUpgradeClick }) => {
  const { user, updateUser } = useAuth();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<any>(null);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const canSummarize = user?.isPremium || (user?.dailyUsage || 0) < 3;

  const validateYouTubeUrl = (url: string) => {
    const patterns = [
      /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
      /^https?:\/\/youtu\.be\/[\w-]+/,
      /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]+/
    ];
    return patterns.some(pattern => pattern.test(url));
  };

  const extractVideoId = (url: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    if (!validateYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Mock video data fetch
      const videoId = extractVideoId(url);
      const mockVideoData = {
        title: 'Advanced React Patterns: Hooks, Context, and Performance Optimization',
        thumbnail: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=480&h=270&dpr=1',
        duration: '18:42',
        channelName: 'React Mastery',
        viewCount: '125,439',
        publishedAt: '2024-12-08'
      };

      await new Promise(resolve => setTimeout(resolve, 1000));
      setVideoData(mockVideoData);
    } catch (err) {
      setError('Failed to fetch video data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!canSummarize) {
      onUpgradeClick();
      return;
    }

    setIsLoading(true);
    setSummary('');

    try {
      // Mock AI summarization with streaming effect
      const mockSummary = `This comprehensive React tutorial explores advanced patterns that modern developers need to master. The video begins with an in-depth look at custom hooks, demonstrating how to extract and reuse stateful logic across components effectively.

The presenter then covers Context API optimization techniques, showing how to prevent unnecessary re-renders and structure context providers for maximum performance. Key topics include context splitting, memoization strategies, and when to use multiple contexts versus a single global state.

The final section focuses on performance optimization, covering React.memo, useMemo, useCallback, and the latest concurrent features. Real-world examples demonstrate how these techniques can dramatically improve application performance, especially in data-heavy applications.

Throughout the tutorial, the presenter shares best practices from production environments and common pitfalls to avoid when implementing these patterns.`;

      // Simulate streaming
      const words = mockSummary.split(' ');
      for (let i = 0; i < words.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setSummary(words.slice(0, i + 1).join(' '));
      }

      // Update user usage
      if (user) {
        const updatedUser = {
          ...user,
          dailyUsage: (user.dailyUsage || 0) + 1,
          totalUsage: (user.totalUsage || 0) + 1
        };
        updateUser(updatedUser);
      }

    } catch (err) {
      setError('Failed to generate summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl inline-block mb-4">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Video Summarizer</h1>
        <p className="text-gray-600">
          Get instant, intelligent summaries of any YouTube video
        </p>
      </div>

      {/* Usage Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${user?.isPremium ? 'bg-yellow-100' : 'bg-blue-100'}`}>
              {user?.isPremium ? (
                <Crown className="h-5 w-5 text-yellow-600" />
              ) : (
                <Clock className="h-5 w-5 text-blue-600" />
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {user?.isPremium ? 'Premium Account' : 'Free Account'}
              </p>
              <p className="text-sm text-gray-600">
                {user?.isPremium
                  ? 'Unlimited summaries'
                  : `${Math.max(0, 3 - (user?.dailyUsage || 0))} summaries remaining today`
                }
              </p>
            </div>
          </div>
          {!user?.isPremium && (
            <button
              onClick={onUpgradeClick}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all"
            >
              Upgrade to Premium
            </button>
          )}
        </div>
      </div>

      {/* URL Input */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <form onSubmit={handleUrlSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube URL
            </label>
            <div className="relative">
              <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your YouTube URL here..."
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading video...</span>
              </div>
            ) : (
              'Load Video'
            )}
          </button>
        </form>
      </div>

      {/* Video Preview */}
      {videoData && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 flex-shrink-0">
              <img
                src={videoData.thumbnail}
                alt={videoData.title}
                className="w-full h-36 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {videoData.title}
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Channel: {videoData.channelName}</p>
                <p>Duration: {videoData.duration}</p>
                <p>Views: {videoData.viewCount}</p>
                <p>Published: {videoData.publishedAt}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleSummarize}
              disabled={isLoading || !canSummarize}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!canSummarize ? (
                'Upgrade to Premium for More Summaries'
              ) : isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Generating summary...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Generate AI Summary</span>
                </div>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Summary Result */}
      {summary && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">AI Summary</h3>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {summary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summarizer;