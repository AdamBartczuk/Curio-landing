import React, { useState } from 'react';
import { Compass, Smartphone, Heart, CloudOff, Mic, Trophy, Music, Wifi, Battery, MapPin, Headphones, Map } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 0,
      icon: <Compass className="w-6 h-6" />,
      title: "Spontaneous Exploration",
      desc: "Routes build themselves around you and your pace.",
      bg: "bg-white",
      text: "text-curio-green-dark"
    },
    {
      id: 1,
      icon: <Smartphone className="w-6 h-6" />,
      title: "Audio-first",
      desc: "No staring at screens, just listen and walk.",
      bg: "bg-curio-orange",
      text: "text-white"
    },
    {
      id: 2,
      icon: <Heart className="w-6 h-6" />,
      title: "Personalization",
      desc: "From street food to architecture, Curio follows your interests.",
      bg: "bg-[#E6F4F1]",
      text: "text-curio-green-dark"
    },
    {
      id: 3,
      icon: <Mic className="w-6 h-6" />,
      title: "Mindfulness",
      desc: "Feel the atmosphere instead of memorising dry facts.",
      bg: "bg-curio-green",
      text: "text-curio-cream"
    },
    {
      id: 4,
      icon: <Trophy className="w-6 h-6" />,
      title: "Gamification",
      desc: "Collect badges, unlock quests and hidden spots.",
      bg: "bg-curio-yellow",
      text: "text-curio-green-dark"
    },
    {
      id: 5,
      icon: <CloudOff className="w-6 h-6" />,
      title: "Fully Offline",
      desc: "Download in the hotel, explore without roaming.",
      bg: "bg-white",
      text: "text-curio-green-dark"
    }
  ];

  // Mobile App Screen Component
  const MobileScreen = ({ active }: { active: number }) => {
    return (
      <div className="w-full h-full relative overflow-hidden bg-gray-100 font-sans">
        {/* Map Background Layer - Simplified generic map */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${active === 3 ? 'opacity-30' : 'opacity-80'}`}>
           <svg className="w-full h-full text-gray-300 fill-current" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0 H100 V100 H0 Z" fill="#f3f4f6"/>
              <path d="M20 0 V100 M40 0 V100 M60 0 V100 M80 0 V100" stroke="white" strokeWidth="2"/>
              <path d="M0 20 H100 M0 40 H100 M0 60 H100 M0 80 H100" stroke="white" strokeWidth="2"/>
              <rect x="25" y="25" width="15" height="15" fill="#e5e7eb" rx="2"/>
              <rect x="65" y="55" width="20" height="25" fill="#e5e7eb" rx="2"/>
              <rect x="15" y="75" width="25" height="10" fill="#e5e7eb" rx="2"/>
           </svg>
        </div>

        {/* Status Bar */}
        <div className="absolute top-0 w-full px-6 py-3 flex justify-between items-center z-20 text-xs font-bold text-gray-800">
          <span>9:41</span>
          <div className="flex gap-1">
            <Wifi className="w-3 h-3" />
            <Battery className="w-3 h-3" />
          </div>
        </div>

        {/* Dynamic Overlay Content based on Feature */}
        <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end pb-20">
          
          {/* Feature 0: Navigation Path */}
          {active === 0 && (
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full">
                <path 
                  d="M 50 80 Q 80 50 50 20" 
                  stroke="#FF5C35" 
                  strokeWidth="4" 
                  fill="none" 
                  strokeDasharray="100" 
                  strokeDashoffset="100"
                  className="animate-dash"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="80" r="6" fill="#005C45" className="animate-pulse" />
                <g transform="translate(42, 10)">
                  <MapPin className="text-curio-green fill-curio-yellow w-8 h-8 animate-bounce" />
                </g>
              </svg>
              <div className="absolute bottom-24 left-6 right-6 bg-white p-4 rounded-xl shadow-lg animate-float-up">
                <p className="text-xs text-gray-400 uppercase font-bold">Next Vibe</p>
                <p className="font-bold text-curio-green">Secret Garden Entrance</p>
                <p className="text-sm text-gray-500">2 mins walk • Quiet</p>
              </div>
            </div>
          )}

          {/* Feature 1: Audio Player */}
          {active === 1 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm animate-fade-in">
              <div className="w-24 h-24 bg-curio-orange rounded-full flex items-center justify-center mb-6 shadow-xl animate-pulse-ring">
                 <Headphones className="w-10 h-10 text-white" />
              </div>
              <div className="w-full px-8">
                 <div className="flex justify-between items-end h-8 gap-1 mb-4">
                    {[40, 70, 50, 90, 60, 30, 80, 40].map((h, i) => (
                      <div key={i} className="w-2 bg-curio-green rounded-full animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s`}}></div>
                    ))}
                 </div>
                 <p className="text-center font-bold text-curio-green-dark text-lg">The Hidden History</p>
                 <p className="text-center text-sm text-gray-600">Chapter 3 • 1:20 left</p>
              </div>
            </div>
          )}

          {/* Feature 2: Personalization Tags */}
          {active === 2 && (
            <div className="absolute inset-0 pointer-events-none">
               {/* Map POIs */}
               <div className="absolute top-1/4 left-1/4 animate-float-up" style={{ animationDelay: '0.1s' }}>
                  <div className="bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold text-curio-orange flex items-center gap-1 border border-curio-orange">
                    <Heart className="w-3 h-3 fill-curio-orange" /> Architecture
                  </div>
               </div>
               <div className="absolute top-1/2 right-1/4 animate-float-up" style={{ animationDelay: '0.3s' }}>
                  <div className="bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold text-curio-green flex items-center gap-1 border border-curio-green">
                    <Heart className="w-3 h-3 fill-curio-green" /> Coffee
                  </div>
               </div>
               <div className="absolute bottom-1/3 left-1/3 animate-float-up" style={{ animationDelay: '0.5s' }}>
                  <div className="bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold text-purple-600 flex items-center gap-1 border border-purple-600">
                    <Heart className="w-3 h-3 fill-purple-600" /> Street Art
                  </div>
               </div>
            </div>
          )}

          {/* Feature 3: Mindfulness */}
          {active === 3 && (
            <div className="absolute inset-0 bg-curio-green/90 flex flex-col items-center justify-center text-curio-cream animate-fade-in">
               <div className="w-40 h-40 border-4 border-curio-cream/30 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-32 h-32 border-4 border-curio-cream/60 rounded-full flex items-center justify-center">
                     <p className="font-display text-2xl">Breathe</p>
                  </div>
               </div>
               <p className="mt-8 text-center max-w-[200px] font-light">Look up. Notice the details on the facade.</p>
            </div>
          )}

          {/* Feature 4: Gamification */}
          {active === 4 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="bg-white p-6 rounded-2xl shadow-2xl text-center transform scale-110 animate-float-up border-4 border-curio-yellow">
                  <div className="w-16 h-16 bg-curio-yellow rounded-full mx-auto flex items-center justify-center mb-2 text-3xl">
                    🏆
                  </div>
                  <h4 className="font-bold text-curio-green-dark text-xl">New Badge!</h4>
                  <p className="text-sm text-gray-500 mb-2">Urban Explorer</p>
                  <div className="bg-gray-100 rounded-full h-2 w-full overflow-hidden">
                    <div className="bg-curio-orange h-full w-3/4"></div>
                  </div>
                  <p className="text-xs text-right mt-1 font-bold text-curio-orange">+50 XP</p>
               </div>
               
               {/* Confetti simplified */}
               <div className="absolute top-1/3 left-10 text-curio-orange text-xl animate-bounce">★</div>
               <div className="absolute top-1/4 right-10 text-curio-yellow text-xl animate-bounce" style={{ animationDelay: '0.2s'}}>★</div>
               <div className="absolute bottom-1/3 left-1/2 text-curio-green text-xl animate-bounce" style={{ animationDelay: '0.4s'}}>★</div>
            </div>
          )}

          {/* Feature 5: Offline */}
          {active === 5 && (
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 pointer-events-none">
               <div className="bg-curio-green text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 animate-float-up">
                 <div className="bg-white/20 p-1 rounded-full"><CloudOff className="w-4 h-4" /></div>
                 <div>
                   <p className="text-sm font-bold">Offline Mode Active</p>
                   <p className="text-xs opacity-80">Map & Audio downloaded</p>
                 </div>
                 <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
               </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation Mock */}
        <div className="absolute bottom-0 w-full bg-white h-20 border-t border-gray-200 flex justify-around items-center px-4 z-20 pb-4">
          <div className="p-2 opacity-50"><Map className="w-6 h-6" /></div>
          <div className="p-4 bg-curio-green rounded-full -mt-8 shadow-lg text-white">
             <div className="w-6 h-6 bg-white rounded-full"></div> 
          </div>
          <div className="p-2 opacity-50"><Heart className="w-6 h-6" /></div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 px-4 md:px-6 relative z-10">
      <div className="container mx-auto">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row items-start justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-curio-green leading-tight mb-4">
                Not just a map. <br />
                Your <span className="bg-curio-yellow px-2 inline-block transform -rotate-2 hover:rotate-0 transition-transform cursor-default">narrator.</span>
              </h2>
              <p className="text-xl text-gray-600 font-medium">
                Curio turns the city into an audio story tailored to you.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Feature Cards Grid */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((item, index) => (
              <RevealOnScroll key={index} delay={index * 100}>
                <div 
                  onMouseEnter={() => setActiveFeature(index)}
                  className={`
                    ${item.bg} ${item.text} 
                    p-8 rounded-[2rem] border border-black/5 
                    flex flex-col justify-between min-h-[220px] 
                    cursor-pointer transition-all duration-300
                    ${activeFeature === index ? 'ring-4 ring-curio-green/20 scale-[1.02] shadow-xl' : 'hover:scale-[1.01] hover:shadow-lg hover:-translate-y-1'}
                  `}
                >
                  <div className="flex justify-between items-start">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 ${activeFeature === index ? 'scale-110' : ''} ${item.text === 'text-white' || item.text === 'text-curio-cream' ? 'bg-white/20' : 'bg-black/5'}`}>
                      {item.icon}
                    </div>
                    {activeFeature === index && <div className="w-3 h-3 bg-curio-orange rounded-full animate-pulse"></div>}
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-display font-bold mb-2">{item.title}</h3>
                    <p className="text-lg opacity-80 font-medium leading-tight">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Right Column: Sticky Phone Mockup */}
          <div className="lg:w-1/2 hidden lg:flex justify-center items-start sticky top-24 h-[calc(100vh-6rem)]">
             <RevealOnScroll className="relative w-full flex justify-center" delay={200}>
               <div className="relative w-[320px] h-[640px] bg-curio-green-dark rounded-[3rem] border-8 border-curio-green-dark shadow-2xl overflow-hidden ring-4 ring-gray-200 transition-transform duration-500 hover:scale-[1.01]">
                  {/* Dynamic Screen Content */}
                  <MobileScreen active={activeFeature} />
                  
                  {/* Dynamic Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-curio-green-dark rounded-b-2xl z-30"></div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-400 rounded-full z-30"></div>
               </div>
               
               {/* Decorative blob behind phone */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-curio-yellow/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
             </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;