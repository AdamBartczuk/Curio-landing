import React, { useState, useEffect } from 'react';

interface Props {
  onAccept: () => void;
  onDecline: () => void;
}

const CookieBanner: React.FC<Props> = ({ onAccept, onDecline }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    setVisible(false);
    setTimeout(onAccept, 300);
  };

  const handleDecline = () => {
    setVisible(false);
    setTimeout(onDecline, 300);
  };

  return (
    <div
      className={`fixed bottom-6 left-4 right-4 z-[200] flex justify-center transition-all duration-300 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-curio-green text-curio-cream rounded-2xl px-6 py-4 shadow-2xl max-w-2xl w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-white/20">
        <p className="text-sm flex-1 leading-relaxed opacity-90">
          🍪 We use cookies to understand how visitors use Curio. No personal data is sold or shared.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 rounded-full text-sm font-bold border border-curio-cream/40 text-curio-cream hover:bg-curio-cream/10 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-full text-sm font-bold bg-curio-yellow text-curio-green hover:bg-[#FFE066] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
