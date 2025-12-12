import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToWaitlist = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4 md:py-6'}`}>
      <div className={`container mx-auto px-4 md:px-6 transition-all duration-300 ${isScrolled ? 'max-w-4xl' : ''}`}>
        <div className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 
          ${isScrolled 
            ? 'bg-curio-green/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] border border-white/20' 
            : 'bg-transparent'}`}>
          
          <div className="flex items-center gap-2 group cursor-pointer">
            {/* Logo Icon */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:animate-breathe ${isScrolled ? 'bg-curio-cream' : 'bg-curio-green'}`}>
              <div className={`w-3 h-3 rounded-full ${isScrolled ? 'bg-curio-green' : 'bg-curio-cream'}`}></div>
            </div>
            <span className={`text-xl font-bold tracking-tight font-display transition-transform duration-300 group-hover:animate-breathe ${isScrolled ? 'text-curio-cream' : 'text-curio-green'}`}>Curio</span>
          </div>

          <button 
            onClick={scrollToWaitlist}
            className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0
              ${isScrolled 
                ? 'bg-curio-orange text-curio-cream hover:bg-[#FF7D5C]' 
                : 'bg-curio-orange text-curio-cream'}`}
          >
            Early Access
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;