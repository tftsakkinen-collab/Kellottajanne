import React from 'react';
import { HeartRateState, Language } from '../types';
import { getTranslation } from '../i18n/translations';
import { parseHRValue } from '../utils/harvardTest';
import { Heart, Clock, Calculator, Sliders } from 'lucide-react';

interface Props {
  language: Language;
  hrState: HeartRateState;
  onChange: (updated: HeartRateState) => void;
}

export const HeartRateCard: React.FC<Props> = ({ language, hrState, onChange }) => {
  const t = getTranslation(language);

  const updateField = <K extends keyof HeartRateState>(field: K, value: HeartRateState[K]) => {
    onChange({ ...hrState, [field]: value });
  };

  const hr1Bpm = parseHRValue(hrState.rawHr1, hrState.inputMode);
  const hr2Bpm = parseHRValue(hrState.rawHr2, hrState.inputMode);
  const hr3Bpm = parseHRValue(hrState.rawHr3, hrState.inputMode);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
        <div className="p-2 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/20">
          <Heart className="h-5 w-5 animate-pulse" />
        </div>
        <h3 className="text-lg font-bold text-white">{t.testSettingsTitle}</h3>
      </div>

      {/* 1. Test Duration Selection */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-teal-400" />
          <span>{t.durationLabel}</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => updateField('durationSeconds', 300)}
            className={`px-4 py-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              hrState.durationSeconds === 300
                ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-semibold shadow-md shadow-teal-500/10'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            {t.durationFull}
          </button>

          <div className="relative">
            <input
              type="number"
              min="10"
              max="300"
              value={hrState.durationSeconds === 300 ? '' : hrState.durationSeconds}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                updateField('durationSeconds', isNaN(val) ? 300 : Math.min(300, Math.max(10, val)));
              }}
              placeholder={t.durationCustom}
              className={`w-full h-full bg-slate-950/80 border rounded-xl px-3.5 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500 transition-all ${
                hrState.durationSeconds !== 300 ? 'border-teal-500 text-teal-300 font-semibold' : 'border-slate-800'
              }`}
            />
            {hrState.durationSeconds !== 300 && (
              <span className="absolute right-3 top-3 text-xs text-teal-400 font-mono">
                {hrState.durationSeconds} s
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Formula Selection */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Calculator className="h-3.5 w-3.5 text-teal-400" />
          <span>{t.formulaLabel}</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => updateField('formula', 'long')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
              hrState.formula === 'long'
                ? 'bg-teal-500/20 border-teal-500 text-white shadow-md shadow-teal-500/10'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="font-bold text-sm text-slate-200 mb-1">{t.formulaLong}</div>
            <div className="text-xs text-slate-400">{t.formulaLongSub}</div>
          </button>

          <button
            type="button"
            onClick={() => updateField('formula', 'short')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
              hrState.formula === 'short'
                ? 'bg-teal-500/20 border-teal-500 text-white shadow-md shadow-teal-500/10'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="font-bold text-sm text-slate-200 mb-1">{t.formulaShort}</div>
            <div className="text-xs text-slate-400">{t.formulaShortSub}</div>
          </button>
        </div>
      </div>

      {/* 3. Measurement Mode Switch (BPM vs 30s) */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sliders className="h-3.5 w-3.5 text-teal-400" />
          <span>{t.inputModeLabel}</span>
        </label>

        <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => updateField('inputMode', 'bpm')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              hrState.inputMode === 'bpm'
                ? 'bg-teal-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.inputModeBpm}
          </button>
          <button
            type="button"
            onClick={() => updateField('inputMode', 'half_min')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              hrState.inputMode === 'half_min'
                ? 'bg-teal-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.inputMode30s}
          </button>
        </div>
      </div>

      {/* 4. Heart Rate Inputs */}
      <div className="space-y-4 pt-2 border-t border-slate-800">
        
        {/* HR 1 */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-slate-300">
              {t.hr1Label}
            </label>
            {hrState.inputMode === 'half_min' && hr1Bpm !== null && (
              <span className="text-xs font-mono text-teal-400">
                {t.autoCalculatedBpm.replace('{bpm}', hr1Bpm.toString())}
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type="number"
              min="30"
              max="250"
              value={hrState.rawHr1}
              onChange={(e) => updateField('rawHr1', e.target.value)}
              placeholder={hrState.inputMode === 'half_min' ? 'esim. 35' : 'esim. 70'}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all font-mono"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-sans">
              {hrState.inputMode === 'half_min' ? 'lyöntiä / 30s' : 'BPM'}
            </span>
          </div>
        </div>

        {/* HR 2 & HR 3 (Only shown for Long formula) */}
        {hrState.formula === 'long' && (
          <>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {t.hr2Label}
                </label>
                {hrState.inputMode === 'half_min' && hr2Bpm !== null && (
                  <span className="text-xs font-mono text-teal-400">
                    {t.autoCalculatedBpm.replace('{bpm}', hr2Bpm.toString())}
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="30"
                  max="250"
                  value={hrState.rawHr2}
                  onChange={(e) => updateField('rawHr2', e.target.value)}
                  placeholder={hrState.inputMode === 'half_min' ? 'esim. 32' : 'esim. 64'}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all font-mono"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-sans">
                  {hrState.inputMode === 'half_min' ? 'lyöntiä / 30s' : 'BPM'}
                </span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {t.hr3Label}
                </label>
                {hrState.inputMode === 'half_min' && hr3Bpm !== null && (
                  <span className="text-xs font-mono text-teal-400">
                    {t.autoCalculatedBpm.replace('{bpm}', hr3Bpm.toString())}
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="30"
                  max="250"
                  value={hrState.rawHr3}
                  onChange={(e) => updateField('rawHr3', e.target.value)}
                  placeholder={hrState.inputMode === 'half_min' ? 'esim. 30' : 'esim. 60'}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all font-mono"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-sans">
                  {hrState.inputMode === 'half_min' ? 'lyöntiä / 30s' : 'BPM'}
                </span>
              </div>
            </div>
          </>
        )}

      </div>

    </div>
  );
};
