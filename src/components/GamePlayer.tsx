"use client";

import { useState, useRef } from 'react';

interface GamePlayerProps {
  iframeUrl: string;
  title: string;
  thumbnail: string;
}

export default function GamePlayer({ iframeUrl, title, thumbnail }: GamePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full rounded-2xl overflow-hidden bg-black shadow-lg border border-outline-variant/10 flex flex-col"
    >
      <div className="relative w-full aspect-[16/9] max-sm:aspect-[9/16] bg-black">
        {!isPlaying ? (
          <div 
            className="absolute inset-0 bg-cover bg-center flex items-center justify-center cursor-pointer transition-all duration-300"
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${thumbnail})` }}
            onClick={handlePlay}
          >
            <div className="text-center p-6 flex flex-col items-center">
              <button 
                className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-electric-purple hover:from-primary-container hover:to-electric-purple/90 flex items-center justify-center shadow-[0_0_30px_rgba(0,92,172,0.6)] hover:shadow-[0_0_40px_rgba(0,92,172,0.9)] hover:scale-110 active:scale-95 transition-all duration-300 mb-6"
                aria-label={`Play ${title}`}
              >
                {/* SVG Play Triangle */}
                <svg className="w-8 h-8 text-white fill-current ml-1" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <h2 className="text-white text-2xl font-extrabold tracking-tight mb-2">Play {title} Now</h2>
              <p className="text-gray-300 text-sm font-medium">Free, instant play in your browser</p>
            </div>
          </div>
        ) : (
          <iframe
            src={iframeUrl}
            title={title}
            allow="autoplay; fullscreen; gamepad"
            className="absolute inset-0 w-full h-full border-none"
          ></iframe>
        )}
      </div>
      
      {/* Player Controls Bar */}
      <div className="flex justify-between items-center px-6 py-3 bg-surface-container border-t border-outline-variant/10">
        <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span>Online Play</span>
        </div>
        
        <button 
          className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5"
          onClick={handleFullscreen}
          title="Fullscreen"
        >
          <span className="material-symbols-outlined text-sm">fullscreen</span>
          Fullscreen
        </button>
      </div>
    </div>
  );
}
