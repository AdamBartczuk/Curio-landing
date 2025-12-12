import React from 'react';
import WaitlistForm from './WaitlistForm';
import { Instagram, Twitter } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const Footer: React.FC = () => {
  return (
    <footer className="bg-curio-green pt-24 pb-12 px-4 md:px-6 rounded-t-[3rem] mt-10 relative overflow-hidden">
      {/* Grain Texture */}
      <div className="absolute inset-0 texture-grain opacity-20 mix-blend-soft-light pointer-events-none z-0"></div>

      <div className="container mx-auto relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-20 items-center lg:items-start text-center lg:text-left">
          <div className="lg:w-1/2">
            <RevealOnScroll>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-curio-cream mb-6 leading-[0.9]">
                Want to walk <br />
                <span className="text-curio-yellow">first?</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <p className="text-xl text-curio-cream/80 mb-10 font-medium max-w-md mx-auto lg:mx-0">
                Be in the first wave of Curio walks. Tell us your favourite city and we’ll ping you the moment it goes live.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <div className="w-full max-w-md mx-auto lg:mx-0">
                <WaitlistForm variant="footer" buttonText="Join waitlist" placeholder="Your email..." />
                <p className="text-sm text-curio-cream/60 mt-4 font-medium">
                  ✦ Zero spam. Just launch dates and early‑access perks.
                </p>
              </div>
            </RevealOnScroll>
          </div>

          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
             <RevealOnScroll delay={300}>
               <div className="bg-curio-cream p-8 rounded-[2rem] max-w-sm rotate-3 hover:rotate-0 transition-all duration-500 shadow-xl hover:shadow-2xl animate-float-slow cursor-grab active:cursor-grabbing">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(i => <span key={i} className="text-curio-orange text-xl animate-pulse" style={{ animationDelay: `${i*200}ms` }}>★</span>)}
                  </div>
                  <p className="text-curio-green-dark text-lg font-medium italic mb-6">
                    "Finally an app that lets me put my phone in my pocket and just be in the city."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-curio-orange">
                      <img src="https://i.pravatar.cc/150?img=32" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-curio-green-dark">Anna K.</p>
                      <p className="text-sm text-gray-500">early tester, Berlin</p>
                    </div>
                  </div>
               </div>
             </RevealOnScroll>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
            <div className="w-8 h-8 bg-curio-cream rounded-full animate-breathe"></div>
            <span className="font-display font-bold text-2xl text-curio-cream">Curio</span>
          </div>
          
          <div className="flex gap-8 text-curio-cream/70 font-medium">
            <a href="#" className="hover:text-curio-yellow transition-colors hover:translate-y-[-2px] inline-block">Privacy</a>
            <a href="#" className="hover:text-curio-yellow transition-colors hover:translate-y-[-2px] inline-block">Terms</a>
            <a href="#" className="hover:text-curio-yellow transition-colors hover:translate-y-[-2px] inline-block">Contact</a>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full text-curio-cream hover:bg-curio-yellow hover:text-curio-green transition-all hover:scale-110">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full text-curio-cream hover:bg-curio-yellow hover:text-curio-green transition-all hover:scale-110">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="text-center mt-10 text-curio-cream/40 text-sm font-medium">
          © {new Date().getFullYear()} Curio App. Designed for wanderers.
        </div>
      </div>
    </footer>
  );
};

export default Footer;