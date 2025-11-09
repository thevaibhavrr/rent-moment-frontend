import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login, setUserName, isAuthenticated, user } = useAuth();
  const [step, setStep] = useState<'mobile' | 'otp' | 'name'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (!user.name) {
        setStep('name');
      } else {
        onSuccess();
        handleClose();
      }
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleClose = () => {
    setStep('mobile');
    setMobile('');
    setOtp('');
    setName('');
    setOtpSent(false);
    setError('');
    setOtpTimer(0);
    onClose();
  };

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!mobile || mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true);
      setOtpTimer(60); // 60 seconds timer
      setStep('otp');
      setLoading(false);
    }, 1000);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    const success = await login(mobile, otp);
    setLoading(false);

    if (success) {
      setStep('name');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || name.trim().length < 2) {
      setError('Please enter a valid name (at least 2 characters)');
      return;
    }

    setUserName(name.trim());
    onSuccess();
    handleClose();
  };

  const handleResendOtp = () => {
    setOtp('');
    setOtpTimer(60);
    setError('');
    // Simulate resending OTP
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {step === 'mobile' && 'Register / Login'}
            {step === 'otp' && 'Enter OTP'}
            {step === 'name' && 'Enter Your Name'}
          </h2>

          {step === 'mobile' && (
            <form onSubmit={handleMobileSubmit} className="space-y-4">
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDBAC] focus:border-transparent"
                  maxLength={10}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FFDBAC] text-gray-900 font-semibold py-3 rounded-lg hover:bg-[#e6c59a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP sent to {mobile}
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDBAC] focus:border-transparent text-center text-2xl tracking-widest"
                  maxLength={6}
                  required
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Dummy OTP: Enter any 6-digit number (e.g., 123456)
                </p>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#FFDBAC] text-gray-900 font-semibold py-3 rounded-lg hover:bg-[#e6c59a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                {otpTimer > 0 ? (
                  <button
                    type="button"
                    disabled
                    className="px-4 py-3 border border-gray-300 rounded-lg text-gray-400 cursor-not-allowed"
                  >
                    Resend ({otpTimer}s)
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Resend
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => setStep('mobile')}
                className="w-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Change Mobile Number
              </button>
            </form>
          )}

          {step === 'name' && (
            <form onSubmit={handleNameSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDBAC] focus:border-transparent"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-[#FFDBAC] text-gray-900 font-semibold py-3 rounded-lg hover:bg-[#e6c59a] transition-colors"
              >
                Continue
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;

