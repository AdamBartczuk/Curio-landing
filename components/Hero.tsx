import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Headphones, WifiOff, Star, Play, Pause, RotateCcw, RotateCw } from 'lucide-react';
import WaitlistForm from './WaitlistForm';

const MiniPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Primary local file
  const localAudio = "ElevenLabs_NYC_Unveiling_the_Hidden_Gems.mp3";
  // Fallback stream (Ambient city sounds or music)
  const fallbackAudio = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  
  const [audioSrc, setAudioSrc] = useState(localAudio);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Playback prevented:", error);
            setIsPlaying(false);
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10);
    }
  };

  const skipBack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 15);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration || 1;
      setProgress((current / total) * 100);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handleAudioError = () => {
    if (audioSrc === localAudio) {
      console.warn("Local audio file not found. Switching to fallback audio.");
      setAudioSrc(fallbackAudio);
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-curio-cream/40 backdrop-blur-[32px] backdrop-saturate-[180%] w-full p-6 md:p-8 border-t border-white/40 shadow-[0_-4px_32px_rgba(0,0,0,0.1)] select-none transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] font-bold text-curio-orange uppercase tracking-wider mb-1">Now Playing</p>
          <p className="text-curio-green-dark font-display font-bold text-xl leading-tight">Manhattan's Secret</p>
        </div>
        <div className="flex gap-1 h-5 items-end">
          <div className={`w-1.5 bg-curio-green rounded-full ${isPlaying ? 'animate-[pulse_1s_ease-in-out_infinite]' : 'h-2'}`} style={{ height: isPlaying ? '16px' : '6px' }}></div>
          <div className={`w-1.5 bg-curio-green rounded-full ${isPlaying ? 'animate-[pulse_1.2s_ease-in-out_infinite]' : 'h-3'}`} style={{ height: isPlaying ? '24px' : '10px' }}></div>
          <div className={`w-1.5 bg-curio-green rounded-full ${isPlaying ? 'animate-[pulse_0.8s_ease-in-out_infinite]' : 'h-1.5'}`} style={{ height: isPlaying ? '14px' : '6px' }}></div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-6 mb-4 px-2">
        <button 
          onClick={skipBack}
          className="text-curio-green/70 hover:text-curio-green transition-colors flex flex-col items-center gap-1 group relative active:scale-95"
          title="Back 15s"
        >
          <RotateCcw className="w-6 h-6" />
          <span className="text-[10px] font-bold text-curio-green/50 group-hover:text-curio-green absolute top-full mt-1 transition-colors">15</span>
        </button>

        <button 
          onClick={togglePlay}
          className="w-16 h-16 bg-curio-orange text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl hover:bg-[#FF7D5C]"
        >
          {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
        </button>

        <button 
          onClick={skipForward}
          className="text-curio-green/70 hover:text-curio-green transition-colors flex flex-col items-center gap-1 group relative active:scale-95"
          title="Forward 10s"
        >
          <RotateCw className="w-6 h-6" />
          <span className="text-[10px] font-bold text-curio-green/50 group-hover:text-curio-green absolute top-full mt-1 transition-colors">10</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-1.5 bg-black/5 rounded-full overflow-hidden mt-2">
        <div 
          className="absolute top-0 left-0 h-full bg-curio-green rounded-full transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <audio 
        ref={audioRef} 
        src={audioSrc} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={handleAudioError}
      />
    </div>
  );
};

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="pt-28 pb-10 px-4 md:px-6 relative z-10">
      <div className="container mx-auto">
        
        {/* Main Bento Card */}
        <div className="bg-curio-green rounded-[2.5rem] p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl shadow-curio-green/20 text-curio-cream min-h-[85vh] flex flex-col justify-center">
          
          {/* Grain Texture */}
          <div className="absolute inset-0 texture-grain opacity-20 mix-blend-soft-light pointer-events-none z-0"></div>

          {/* Decorative shapes - Animated & Parallax */}
          {/* Yellow Shape - Moves slowly */}
          <div className="absolute top-10 right-10 z-0 pointer-events-none" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
            <div className="w-32 h-32 bg-curio-yellow rounded-full blur-[60px] opacity-20 animate-float"></div>
          </div>
          
          {/* Orange Shape - Moves slightly faster */}
          <div className="absolute bottom-10 left-10 z-0 pointer-events-none" style={{ transform: `translateY(${scrollY * 0.15}px)` }}>
            <div className="w-40 h-40 bg-curio-orange rounded-full blur-[80px] opacity-30 animate-float-slow"></div>
          </div>
          
          {/* White Center Shape - Very subtle move */}
          <div className="absolute top-1/2 left-1/2 z-0 pointer-events-none" style={{ transform: `translate(-50%, -50%) translateY(${scrollY * 0.1}px)` }}>
             <div className="w-56 h-56 bg-white rounded-full blur-[100px] opacity-10 animate-pulse"></div>
          </div>
          
          {/* Sticker Badge - Hover Effect Added */}
          <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10 hover:scale-110 transition-transform duration-500 cursor-pointer group">
            <div className="relative w-24 h-24 md:w-32 md:h-32 animate-[spin_10s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite]">
               <svg viewBox="0 0 100 100" className="w-full h-full fill-curio-orange">
                  <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent"/>
                  <text fontSize="13" fontWeight="bold" fill="#FFF9F0">
                    <textPath href="#curve" startOffset="0" letterSpacing="2">
                      • SHAPE YOUR OWN JOURNEY • 
                    </textPath>
                  </text>
               </svg>
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-3xl transition-transform duration-300 group-hover:scale-125">☺</div>
               </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Left Content */}
            <div className="flex flex-col gap-6 md:gap-8 max-w-xl mx-auto lg:mx-0 text-center lg:text-left pt-32 lg:pt-32">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-curio-cream/10 backdrop-blur-md rounded-full w-fit mx-auto lg:mx-0 border border-white/10 hover:bg-curio-cream/20 transition-colors cursor-default">
                  <span className="w-2 h-2 rounded-full bg-curio-yellow animate-pulse"></span>
                  <span className="text-sm font-bold uppercase tracking-wider text-curio-yellow">Coming soon 2026</span>
                </div>
              </div>

              <div>
                <h1 className="font-display font-bold leading-[0.9] tracking-tight">
                  <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl whitespace-nowrap">
                    Get <span className="text-curio-yellow inline-block animate-tilt-n-bounce">CURIO</span>us.
                  </span>
                  <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2">
                    Get lost on <span className="inline-block relative">
                      purpose.
                      <span className="absolute -right-4 -top-1 md:-right-8 md:top-0 text-curio-orange text-2xl md:text-5xl animate-bounce">✶</span>
                    </span>
                  </span>
                </h1>
              </div>
              
              <div>
                <svg className="w-32 h-4 mx-auto lg:mx-0 text-curio-orange my-2" viewBox="0 0 100 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                   <path d="M0 6C5 1 10 1 15 6S25 11 30 6S40 1 45 6S55 11 60 6S70 1 75 6S85 11 90 6S100 1 105 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div>
                <p className="text-xl md:text-2xl font-light text-curio-cream/90 leading-relaxed">
                  Leave the hotel without a plan. Curio shapes your walk as you go - <strong className="text-curio-yellow font-medium">spontaneous sightseeing, zero stress.</strong>
                </p>
              </div>

              <div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-sm font-medium">
                  {[
                    { icon: <Headphones className="w-4 h-4" />, text: "Audio-first" },
                    { icon: <MapPin className="w-4 h-4" />, text: "Spontaneous" },
                    { icon: <WifiOff className="w-4 h-4" />, text: "Offline" }
                  ].map((item, i) => (
                    <span key={i} className="px-4 py-2 bg-curio-cream/10 rounded-full flex items-center gap-2 hover:bg-curio-cream/20 hover:scale-105 transition-all duration-300 cursor-default">
                      {item.icon} {item.text}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="mt-4">
                   <WaitlistForm buttonText="Get early access" />
                </div>
              </div>
            </div>

            {/* Right Image/Graphic */}
            <div className="relative lg:h-full min-h-[400px] flex items-center justify-center">
               <div className="w-full flex justify-center">
                 <div className="relative w-full max-w-md aspect-[4/5] perspective-1000">
                    {/* Photo Card */}
                    <div className="absolute inset-0 bg-curio-cream rounded-[2rem] rotate-3 transform transition-all duration-700 hover:rotate-0 hover:scale-[1.02] overflow-hidden border-4 border-curio-cream shadow-2xl group z-0">
                       <img
                        src="https://images.unsplash.com/photo-1540835237482-cb9ca281c01f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Travel destination"
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 will-change-transform"
                       />
                       
                       {/* Mini Audio Player Overlay - Fixed Bottom Full Width */}
                       <div className="absolute bottom-0 left-0 right-0 z-20">
                         <MiniPlayer />
                       </div>
                    </div>

                    {/* Decorative Elements - Floating */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-curio-orange text-curio-cream rounded-full flex items-center justify-center font-display font-bold text-xl rotate-12 shadow-lg z-10 animate-float-delayed hover:rotate-45 transition-transform duration-500">
                      <div>
                        <span className="block text-xs uppercase opacity-80 text-center">Free</span>
                        Guide
                      </div>
                    </div>

                     <div className="absolute -bottom-8 -left-4 bg-curio-yellow text-curio-green px-6 py-3 rounded-full font-bold shadow-lg -rotate-6 flex items-center gap-2 z-10 animate-float hover:scale-110 transition-transform">
                       <Star className="w-5 h-5 fill-curio-green" /> Travel Buddy
                     </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;