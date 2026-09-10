import React from 'react';
import { Language } from '../types';
import { Activity, Globe } from 'lucide-react';

interface Props {
  onSelectLanguage: (lang: Language) => void;
}

export const LanguageSelectorScreen: React.FC<Props> = ({ onSelectLanguage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-6 text-slate-100">
      <div className="max-w-xl w-full text-center space-y-8 bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-2xl shadow-teal-500/5">
        
        {/* Header Icon */}
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-lg shadow-teal-500/10">
            <Activity className="h-10 w-10 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Kellottajanne – Kliininen ajastin
          </h1>
          <p className="text-slate-400 text-sm sm:text-base flex items-center justify-center gap-2">
            <Globe className="h-4 w-4 text-teal-400" />
            <span>Valitse kieli / Select Language</span>
          </p>
        </div>

        {/* Language Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <button
            onClick={() => onSelectLanguage('fi')}
            className="group relative overflow-hidden flex flex-col items-center justify-center p-6 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xl tracking-wide transition-all duration-200 shadow-lg shadow-teal-600/25 hover:scale-[1.02] active:scale-[0.98] border border-teal-400/30 cursor-pointer"
          >
            <span className="text-3xl mb-1">🇫🇮</span>
            <span>Suomi</span>
            <span className="text-xs font-normal text-teal-100/80 mt-1">Kliininen käyttöliittymä</span>
          </button>

          <button
            onClick={() => onSelectLanguage('en')}
            className="group relative overflow-hidden flex flex-col items-center justify-center p-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xl tracking-wide transition-all duration-200 shadow-lg shadow-indigo-600/25 hover:scale-[1.02] active:scale-[0.98] border border-indigo-400/30 cursor-pointer"
          >
            <span className="text-3xl mb-1">🇬🇧</span>
            <span>English</span>
            <span className="text-xs font-normal text-indigo-100/80 mt-1">Clinical Interface</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-slate-800 text-xs text-slate-500">
          Harvard Step Test • 120 BPM High-Precision AudioContext Pacer
        </div>

      </div>
    </div>
  );
};
