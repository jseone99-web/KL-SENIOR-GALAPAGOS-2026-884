import React from 'react';
import { LOGO_URL } from '../constants';

export const LogoHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 relative z-10">
      <div className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center">
        <img 
          src={LOGO_URL} 
          alt="Koh Lanta Senior Logo" 
          className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,140,0,0.4)] hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="mt-2 text-center">
        <p className="font-tribal text-koh-sand tracking-[0.2em] text-sm md:text-base uppercase opacity-80">
          L'Aventure n'a pas d'âge
        </p>
      </div>
    </div>
  );
};