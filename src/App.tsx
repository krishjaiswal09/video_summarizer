import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Summarizer from './components/Summarizer';
import AdminPanel from './components/AdminPanel';
import PaymentModal from './components/PaymentModal';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading, user, updateUser } = useAuth();
  const [currentView, setCurrentView] = useState<'dashboard' | 'summarize' | 'admin'>('dashboard');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleAuthSuccess = () => {
    setCurrentView('dashboard');
  };

  const handleUpgradeClick = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    if (user) {
      const updatedUser = {
        ...user,
        isPremium: true
      };
      updateUser(updatedUser);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl inline-block mb-4">
            <div className="h-8 w-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      <main>
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'summarize' && <Summarizer onUpgradeClick={handleUpgradeClick} />}
        {currentView === 'admin' && user?.role === 'admin' && <AdminPanel />}
      </main>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;