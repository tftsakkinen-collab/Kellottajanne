import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';
import { Activity, RotateCcw } from 'lucide-react';

interface Props {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onReset: () => void;
}

export const NavbarHeader: React.FC<Props> = ({ language, onLanguageChange, onReset }) => {
  const t = getTranslation(language);

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Activity className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">{t.appName}</h1>
              <span className="px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-400 border border-teal-500/30 text-[10px] font-mono font-bold uppercase">
                Clinical
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">{t.appSubTitle}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          
          {/* Reset Button */}
          <button
            type="button"
            onClick={onReset}
            title="Tyhjennä tiedot / Reset Form"
            className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Language Switcher */}
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => onLanguageChange('fi')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'fi'
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🇫🇮 FI
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🇬🇧 EN
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};
