import React from 'react';
import { Sliders, PlayCircle, Coffee, Music, Mic } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: <Sliders className="w-8 h-8 text-curio-green transition-transform duration-300 group-hover:rotate-180" />,
      title: "Set the vibe",
      desc: "Architecture, street food, dark stories, or just chill? Pick a mood and time, Curio shapes the plan for you.",
      color: "bg-curio-cream",
      textColor: "text-curio-green"
    },
    {
      id: 2,
      icon: <PlayCircle className="w-8 h-8 text-curio-cream transition-transform duration-300 group-hover:scale-125" />,
      title: "Play & Walk",
      desc: "Put on your headphones and hit Start. Curio curates a route in real time, adapting to your pace.",
      color: "bg-curio-orange",
      textColor: "text-curio-cream"
    },
    {
      id: 3,
      icon: <Coffee className="w-8 h-8 text-curio-green transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-12" />,
      title: "Listen & Discover",
      desc: "Listen to stories, uncover hidden gems, and turn each walk into your own travel memory.",
      color: "bg-curio-yellow",
      textColor: "text-curio-green"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-6 relative z-10" id="how-it-works">
      <div className="container mx-auto">
        <RevealOnScroll className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-curio-green">
            Play, walk, <span className="text-curio-orange underline decoration-wavy decoration-4 underline-offset-4">listen.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Forget rigid itineraries. Let the city guide you in real time while you just walk and listen.
          </p>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <RevealOnScroll key={step.id} delay={index * 150} className="h-full">
              <div className={`${step.color} ${step.textColor} p-8 md:p-10 rounded-[2.5rem] relative group transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl shadow-xl shadow-gray-200/50 h-full flex flex-col`}>
                <div className="absolute top-8 right-8 text-5xl font-display font-bold opacity-10 transition-all duration-300 group-hover:opacity-20 group-hover:scale-110">
                  0{step.id}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8 border border-white/20 shadow-sm group-hover:shadow-md transition-all">
                  {step.icon}
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">{step.title}</h3>
                <p className={`text-lg leading-relaxed font-medium opacity-90`}>
                  {step.desc}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={400}>
          <div className="mt-6 bg-curio-green rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-curio-cream relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
            {/* Grain Texture */}
            <div className="absolute inset-0 texture-grain opacity-20 mix-blend-soft-light pointer-events-none z-0"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-curio-green-dark/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10 flex-1">
               <div className="flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                  <span className="font-bold uppercase tracking-widest text-sm text-curio-yellow">Smart Audio</span>
               </div>
               <h4 className="text-3xl font-display font-bold mb-3">
                Smart audio, your own music.
              </h4>
              <p className="opacity-80 text-lg">
                Keep Spotify or Apple Music playing. Curio gently fades it out when you’re passing something worth a story.
              </p>
            </div>
            
            <div className="flex -space-x-4 relative z-10 group-hover:scale-105 transition-transform duration-300">
               <div className="w-16 h-16 rounded-full bg-green-800 border-4 border-curio-green flex items-center justify-center text-white shadow-lg relative z-0 transform group-hover:-translate-x-2 transition-transform">
                  <Music className="w-8 h-8" />
               </div>
               <div className="w-16 h-16 rounded-full bg-curio-orange border-4 border-curio-green flex items-center justify-center text-white z-10 shadow-lg transform group-hover:translate-x-2 transition-transform">
                  <Mic className="w-8 h-8" />
               </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default HowItWorks;