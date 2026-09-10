import React from 'react';
import { AudioMode, Language } from '../types';
import { getTranslation } from '../i18n/translations';
import { Volume2, VolumeX, Play, Square, Info, Activity, Mic, Volume2 as AudioIcon, MessageSquare } from 'lucide-react';

interface Props {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isRunning: boolean;
  onToggleRun: () => void;
  audioMode: AudioMode;
  onAudioModeChange: (mode: AudioMode) => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
  isMuted: boolean;
  onMuteToggle: () => void;
  activeBeat: number;
  elapsedSeconds: number;
}

export const MetronomeModule: React.FC<Props> = ({
  language,
  onLanguageChange,
  isRunning,
  onToggleRun,
  audioMode,
  onAudioModeChange,
  volume,
  onVolumeChange,
  isMuted,
  onMuteToggle,
  activeBeat,
  elapsedSeconds,
}) => {
  const t = getTranslation(language);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const steps = [
    { num: 1, label: t.step1, isUp: true },
    { num: 2, label: t.step2, isUp: true },
    { num: 3, label: t.step3, isUp: false },
    { num: 4, label: t.step4, isUp: false },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/20">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">{t.metronomeTitle}</h2>
            <p className="text-xs text-slate-400">Harvard Step Test • 2.0 Hz (120 Steps/min)</p>
          </div>
        </div>

        {/* Stopwatch badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 font-mono text-sm text-teal-400 font-semibold">
          <span className={`h-2 w-2 rounded-full ${isRunning ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
          <span>{formatTime(elapsedSeconds)}</span>
          <span className="text-slate-500 text-xs">/ 05:00</span>
        </div>
      </div>

      {/* 1. TOP: 4 STEP CYCLE INDICATOR BOXES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {steps.map((step, idx) => {
          const isActive = isRunning && activeBeat === idx;
          const isUpStep = step.isUp;

          return (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-2xl p-4 flex flex-col items-center justify-center border transition-all duration-150 ${
                isActive
                  ? isUpStep
                    ? 'bg-gradient-to-b from-teal-500/30 to-teal-600/40 border-teal-400 text-white shadow-lg shadow-teal-500/20 scale-[1.03]'
                    : 'bg-gradient-to-b from-cyan-500/30 to-cyan-600/40 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 scale-[1.03]'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:border-slate-600'
              }`}
            >
              {isActive && (
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    isUpStep ? 'bg-teal-400' : 'bg-cyan-400'
                  }`}
                />
              )}
              <span className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isActive ? 'text-teal-200' : 'text-slate-500'}`}>
                {isUpStep ? 'YLÖS / UP' : 'ALAS / DOWN'}
              </span>
              <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isActive ? 'text-white' : 'text-slate-300'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* 2. MIDDLE: 3 AUDIO MODE BUTTONS */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Äänitila / Audio Mode
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onAudioModeChange('both')}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-medium text-sm transition-all cursor-pointer ${
              audioMode === 'both'
                ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-md shadow-teal-500/10 font-semibold'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
            }`}
          >
            <Mic className="h-4 w-4 text-teal-400" />
            <span>{t.audioModeBoth}</span>
          </button>

          <button
            type="button"
            onClick={() => onAudioModeChange('speech')}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-medium text-sm transition-all cursor-pointer ${
              audioMode === 'speech'
                ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-md shadow-teal-500/10 font-semibold'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
            }`}
          >
            <MessageSquare className="h-4 w-4 text-teal-400" />
            <span>{t.audioModeSpeech}</span>
          </button>

          <button
            type="button"
            onClick={() => onAudioModeChange('beep')}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-medium text-sm transition-all cursor-pointer ${
              audioMode === 'beep'
                ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-md shadow-teal-500/10 font-semibold'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
            }`}
          >
            <AudioIcon className="h-4 w-4 text-teal-400" />
            <span>{t.audioModeBeep}</span>
          </button>
        </div>
      </div>

      {/* 3. EXPLANATION TEXT */}
      <div className="flex items-start gap-2.5 p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl mb-6 text-xs text-slate-400">
        <Info className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">{t.audioExplanation}</p>
      </div>

      {/* START / STOP BUTTON */}
      <div className="mb-6">
        <button
          type="button"
          onClick={onToggleRun}
          className={`w-full py-4 px-6 rounded-2xl font-extrabold text-lg tracking-wider flex items-center justify-center gap-3 transition-all duration-200 shadow-lg cursor-pointer ${
            isRunning
              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 border border-rose-400/40 active:scale-[0.99]'
              : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/30 border border-teal-300/40 active:scale-[0.99]'
          }`}
        >
          {isRunning ? (
            <>
              <Square className="h-6 w-6 fill-current" />
              <span>{t.stopMetronome}</span>
            </>
          ) : (
            <>
              <Play className="h-6 w-6 fill-current" />
              <span>{t.startMetronome}</span>
            </>
          )}
        </button>
      </div>

      {/* 4. BOTTOM CONTROL BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 bg-slate-950/40 -mx-6 -mb-6 p-6 rounded-b-3xl">
        
        {/* Language Toggle: [FI] / [EN] */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            type="button"
            onClick={() => onLanguageChange('fi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🇬🇧 EN
          </button>
        </div>

        {/* Mute Toggle & Volume Slider */}
        <div className="flex items-center gap-3 flex-1 max-w-xs justify-end">
          <button
            type="button"
            onClick={onMuteToggle}
            title={isMuted ? t.soundMuted : t.soundOn}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isMuted
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                : 'bg-slate-800 text-teal-400 border-slate-700 hover:border-slate-600'
            }`}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-2 flex-1">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                if (isMuted) onMuteToggle(); // Auto-unmute on volume slide
                onVolumeChange(parseFloat(e.target.value));
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
            />
            <span className="text-xs font-mono text-slate-400 w-8 text-right">
              {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
