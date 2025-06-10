import React from 'react';
import { Video, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    onViewChange('auth');
  };

  if (!isAuthenticated) {
    return (
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Video className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Video Insight
            </h1>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
            <Video className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Video Insight
          </h1>
        </div>

        <nav className="flex items-center space-x-6">
          <button
            onClick={() => onViewChange('dashboard')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentView === 'dashboard'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onViewChange('summarize')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentView === 'summarize'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Summarize
          </button>
          {user?.role === 'admin' && (
            <button
              onClick={() => onViewChange('admin')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentView === 'admin'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Settings className="h-4 w-4 inline mr-1" />
              Admin
            </button>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">
                {user?.isPremium ? (
                  <span className="text-green-600 font-medium">Premium</span>
                ) : (
                  <span>Free - {3 - (user?.dailyUsage || 0)}/3 left today</span>
                )}
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;