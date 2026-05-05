import React, { useEffect, useState } from 'react';
import { Check, Ticket } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const CitiesAndPricing: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cities = [
    { name: "Amsterdam", flag: "🇳🇱" },
    { name: "Berlin", flag: "🇩🇪" },
    { name: "Paris", flag: "🇫🇷" },
    { name: "Prague", flag: "🇨🇿" },
    { name: "Krakow", flag: "🇵🇱" },
    { name: "Barcelona", flag: "🇪🇸" },
    { name: "Rome", flag: "🇮🇹" },
    { name: "Tokyo", flag: "🇯🇵" },
    { name: "New York", flag: "🇺🇸" }
  ];

  return (
    <section className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        
        {/* Cities Section - Tags Layout */}
        <RevealOnScroll className="w-full">
          <div className="bg-curio-green rounded-[3rem] p-8 md:p-12 text-center text-curio-cream mb-20 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            {/* Grain Texture */}
            <div className="absolute inset-0 texture-grain opacity-20 mix-blend-soft-light pointer-events-none z-0"></div>

            {/* Decorative blurs with Parallax */}
            <div className="absolute top-0 left-0 z-0 pointer-events-none" style={{ transform: `translate(-50%, -50%) translateY(${(scrollY - 2000) * 0.1}px)` }}>
              <div className="w-64 h-64 bg-curio-green-dark rounded-full blur-[80px] opacity-50 group-hover:scale-110 transition-transform duration-1000"></div>
            </div>
            
            <div className="absolute bottom-0 right-0 z-0 pointer-events-none" style={{ transform: `translate(50%, 50%) translateY(${(scrollY - 2000) * 0.12}px)` }}>
               <div className="w-64 h-64 bg-curio-orange rounded-full blur-[80px] opacity-20 group-hover:scale-125 transition-transform duration-1000"></div>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="bg-curio-orange text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block animate-pulse">Global Launch</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Where are we launching?</h2>
              <p className="text-xl opacity-90 mb-10 font-light">
                Curio starts in the biggest European city-break destinations, with more cities added all the time.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
                 {cities.map((city, idx) => (
                   <div 
                     key={city.name}
                     className="px-6 py-3 border border-curio-cream/20 bg-curio-cream/5 rounded-full backdrop-blur-sm font-display font-bold text-lg md:text-xl hover:bg-curio-cream hover:text-curio-green transition-all duration-300 cursor-default select-none shadow-sm hover:scale-110 animate-pop flex items-center gap-2"
                     style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
                   >
                     {city.name} <span className="opacity-80">{city.flag}</span>
                   </div>
                 ))}
                 <div className="px-6 py-3 border border-dashed border-curio-cream/30 rounded-full font-display font-bold text-lg md:text-xl text-curio-cream/50 animate-pop" style={{ animationDelay: `${cities.length * 100}ms`, animationFillMode: 'both' }}>
                   + more cities soon
                 </div>
              </div>

              <p className="text-lg opacity-90 font-medium max-w-xl mx-auto">
                Join the waitlist to get early access and a free premium weekend in one of the first cities.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Pricing Section */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
          
          {/* Free Tier */}
          <RevealOnScroll className="h-full" delay={100}>
            <div className="p-10 rounded-[2.5rem] bg-white border-2 border-gray-100 flex flex-col h-full hover:border-curio-green/20 transition-all hover:shadow-xl duration-300 group">
              <h3 className="text-3xl font-display font-bold text-curio-green mb-2 group-hover:translate-x-1 transition-transform">Free</h3>
              <p className="text-gray-500 font-medium mb-8">Feel the city vibe.</p>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  "Smart route planning",
                  "Access to available cities and sample routes",
                  "Limited number of listenings"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-curio-green-dark text-lg">
                    <div className="bg-gray-100 p-1 rounded-full group-hover:bg-curio-green/10 transition-colors"><Check className="w-4 h-4" /></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>

          {/* Premium Tier */}
          <RevealOnScroll className="h-full" delay={300}>
            <div className="relative p-10 rounded-[2.5rem] bg-curio-orange text-white flex flex-col shadow-2xl shadow-curio-orange/30 transform md:-rotate-1 hover:rotate-0 hover:-translate-y-2 hover:shadow-orange-500/40 transition-all duration-500 h-full animate-float-delayed">
              <div className="absolute -top-4 -right-4 bg-curio-yellow text-curio-green text-sm font-bold px-4 py-2 rounded-full border-2 border-curio-green shadow-lg animate-bounce">
                Best for city breaks ✦
              </div>
              <h3 className="text-4xl font-display font-bold mb-2 flex items-center gap-2">
                Premium 
              </h3>
              <p className="text-white/80 font-medium mb-8">Full immersion in the city.</p>
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  "Full narratives & unlimited listening",
                  "Full offline mode (maps & audio)",
                  "Famous & signature voices",
                  "City games, quests & special events"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white text-lg font-medium">
                    <div className="bg-white/20 p-1 rounded-full"><Check className="w-4 h-4" /></div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/20 mt-auto">
                <p className="text-sm text-white/80 flex items-center gap-2">
                  <Ticket className="w-4 h-4" />
                  Coming soon: buy attraction tickets in‑app.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>

      </div>
    </section>
  );
};

export default CitiesAndPricing;