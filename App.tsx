import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import CitiesAndPricing from './components/CitiesAndPricing';
import Footer from './components/Footer';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      const progress = totalHeight > 0 ? scrollPosition / totalHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-curio-cream min-h-screen text-curio-green-dark selection:bg-curio-orange selection:text-curio-cream overflow-x-hidden relative">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] pointer-events-none bg-transparent">
        <div 
          className="h-full bg-curio-orange origin-left transition-transform duration-100 ease-out shadow-[0_0_10px_rgba(255,92,53,0.5)]"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      <div className="grain-overlay texture-grain"></div>
      <Header />
      <div className="relative z-10">
        <Hero />
        <HowItWorks />
        <Features />
        <CitiesAndPricing />
        <Footer />
      </div>
    </main>
  );
}

export default App;