import React, { useState } from 'react';
import { Language, PatientInfo, TestResult } from '../types';
import { getTranslation } from '../i18n/translations';
import { FITNESS_CATEGORIES, formatMedicalRecordText } from '../utils/harvardTest';
import { Award, Copy, Check, AlertCircle, TrendingUp } from 'lucide-react';

interface Props {
  language: Language;
  patient: PatientInfo;
  result: TestResult;
}

export const ResultsCard: React.FC<Props> = ({ language, patient, result }) => {
  const t = getTranslation(language);
  const [copied, setCopied] = useState<boolean>(false);

  const activeCategory = result.categoryKey
    ? FITNESS_CATEGORIES.find((c) => c.key === result.categoryKey)
    : null;

  const handleCopy = () => {
    if (result.score === null) return;

    const formattedText = formatMedicalRecordText(patient, result, language);
    navigator.clipboard.writeText(formattedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  // Calculate percentage along the gauge line (min score 40, max score 110)
  const getMeterPercentage = (score: number) => {
    const min = 40;
    const max = 110;
    const clamped = Math.max(min, Math.min(max, score));
    return ((clamped - min) / (max - min)) * 100;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800/90 backdrop-blur-xl rounded-3xl p-5 sm:p-7 shadow-2xl shadow-slate-950/40 space-y-6 flex flex-col justify-between">
      
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/20 shadow-inner">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">{t.resultsTitle}</h3>
              <p className="text-xs text-slate-400">Harvard Fitness Index Score</p>
            </div>
          </div>
        </div>

        {result.score !== null && activeCategory ? (
          <div className="space-y-6">
            
            {/* Score Card Display */}
            <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-inner">
              
              {/* Background Glow */}
              <div className="absolute inset-0 bg-teal-500/5 blur-xl pointer-events-none" />

              <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-teal-400" />
                <span>{t.fitnessIndex}</span>
              </div>
              
              <div className="text-5xl sm:text-6xl font-black font-mono text-white my-2 tracking-tight drop-shadow-md">
                {result.score}
              </div>

              {/* Classification Badge */}
              <div
                className={`mt-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-extrabold tracking-wide shadow-md transition-all ${activeCategory.badgeBg}`}
              >
                {language === 'fi' ? activeCategory.labelFi : activeCategory.labelEn}
              </div>

              {/* Score Meter Visual Progress Bar */}
              <div className="w-full mt-6 pt-4 border-t border-slate-800/60">
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1.5">
                  <span>40 (Heikko)</span>
                  <span>65 (Keskitaso)</span>
                  <span>90+ (Erinomainen)</span>
                </div>
                <div className="relative h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-rose-500 via-amber-500 via-cyan-400 to-emerald-400" />
                  {/* Position Pin Marker */}
                  <div
                    className="absolute top-0 bottom-0 w-2.5 bg-white border-2 border-slate-950 rounded-full shadow-lg transition-all duration-500 transform -translate-x-1/2"
                    style={{ left: `${getMeterPercentage(result.score)}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Fitness Reference Legend */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                Viitearvoalueet (Reference Ranges)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-xs">
                {FITNESS_CATEGORIES.map((cat) => {
                  const isSelected = activeCategory?.key === cat.key;
                  return (
                    <div
                      key={cat.key}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        isSelected
                          ? `${cat.badgeBg} font-bold scale-[1.03] shadow-md border-teal-400/50`
                          : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-70'
                      }`}
                    >
                      <div className="font-semibold text-[11px] truncate">
                        {language === 'fi' ? cat.labelFi.split(' ')[0] : cat.labelEn.split(' ')[0]}
                      </div>
                      <div className="text-[10px] font-mono opacity-80 mt-0.5">
                        {cat.key === 'excellent' ? '> 90' : cat.key === 'good' ? '80–89' : cat.key === 'average' ? '65–79' : cat.key === 'below_average' ? '55–64' : '< 55'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        ) : (
          /* Empty State */
          <div className="p-8 bg-slate-950/50 border border-slate-800/80 rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
            <AlertCircle className="h-9 w-9 text-slate-600 animate-pulse" />
            <p className="text-sm text-slate-400 max-w-xs">{t.noDataYet}</p>
          </div>
        )}
      </div>

      {/* Copy Button at bottom */}
      {result.score !== null && (
        <div className="pt-4 border-t border-slate-800/80 mt-6">
          <button
            type="button"
            onClick={handleCopy}
            className={`w-full py-4 px-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer shadow-lg active:scale-[0.98] min-h-[48px] ${
              copied
                ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20 border border-emerald-400/50'
                : 'bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white shadow-teal-600/25 border border-teal-400/30'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-5 w-5 stroke-[2.5]" />
                <span>{t.copiedToClipboard}</span>
              </>
            ) : (
              <>
                <Copy className="h-5 w-5" />
                <span>{t.copyResults}</span>
              </>
            )}
          </button>
        </div>
      )}

    </div>
  );
};
