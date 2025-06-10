import React from 'react';
import { X, Crown, Check, CreditCard } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  if (!isOpen) return null;

  const handlePayment = () => {
    // Mock payment processing
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 2000);
  };

  const features = [
    'Unlimited video summaries',
    'Priority processing speed',
    'Advanced AI insights',
    'Export summaries (PDF, DOCX)',
    'Batch processing up to 10 videos',
    'Custom summary length control',
    'Priority customer support',
    'No advertisements'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-lg">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Upgrade to Premium</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl mb-4">
              <div className="text-3xl font-bold">$9.99</div>
              <div className="text-sm opacity-90">per month</div>
            </div>
            <p className="text-gray-600">
              Unlock unlimited summaries and advanced features
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="bg-green-100 p-1 rounded-full">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <button
              onClick={handlePayment}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all flex items-center justify-center space-x-2"
            >
              <CreditCard className="h-5 w-5" />
              <span>Subscribe Now</span>
            </button>
            
            <button
              onClick={onClose}
              className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-all"
            >
              Maybe Later
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Cancel anytime. No questions asked. 30-day money-back guarantee.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;