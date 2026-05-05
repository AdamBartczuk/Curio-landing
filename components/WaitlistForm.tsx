import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface WaitlistFormProps {
  placeholder?: string;
  buttonText?: string;
  variant?: 'hero' | 'footer';
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ 
  placeholder = "Your email...", 
  buttonText = "Join waitlist",
  variant = 'hero'
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      const res = await fetch(
        'https://trexuhtydiwygtxugqfb.supabase.co/rest/v1/waitlist',
        {
          method: 'POST',
          headers: {
            'apikey': 'sb_publishable_AYOYUV4jWCtJalPF8UkGCQ_CcSSP59F',
            'Authorization': 'Bearer sb_publishable_AYOYUV4jWCtJalPF8UkGCQ_CcSSP59F',
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({ email }),
        }
      );

      if (res.ok || res.status === 201 || res.status === 409) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('idle');
        alert('Something went wrong. Please try again.');
      }
    } catch {
      setStatus('idle');
      alert('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-curio-green font-bold p-4 bg-white rounded-full shadow-sm animate-fade-in">
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
          <Check className="w-4 h-4" />
        </div>
        <span>You're on the list! Talk soon.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-xl relative">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className={`flex-1 px-6 py-3 rounded-full border-2 text-lg outline-none transition-all placeholder:text-gray-400
          ${variant === 'hero' 
            ? 'bg-curio-cream border-transparent text-curio-green focus:border-curio-yellow focus:ring-4 focus:ring-curio-yellow/20' 
            : 'bg-white border-transparent text-curio-green focus:border-curio-orange focus:ring-4 focus:ring-curio-orange/20'}`}
        required
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`px-8 py-3 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0
          ${variant === 'hero'
            ? 'bg-curio-yellow text-curio-green hover:bg-[#FFE066]'
            : 'bg-curio-orange text-white hover:bg-[#FF7D5C]'
          }`}
      >
        {status === 'loading' ? '...' : buttonText}
        {!status && <ArrowRight className="w-5 h-5" />}
      </button>
    </form>
  );
};

export default WaitlistForm;