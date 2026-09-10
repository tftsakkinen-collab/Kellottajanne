import React, { useState } from 'react';
import { Language, PatientInfo, TestResult } from '../types';
import { getTranslation } from '../i18n/translations';
import { FITNESS_CATEGORIES, formatMedicalRecordText } from '../utils/harvardTest';
import { Award, Copy, Check, AlertCircle } from 'lucide-react';

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

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
        <div className="p-2 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/20">
          <Award className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-bold text-white">{t.resultsTitle}</h3>
      </div>

      {result.score !== null && activeCategory ? (
        <div className="space-y-6">
          
          {/* Score & Badge Display */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
              {t.fitnessIndex}
            </div>
            
            <div className="text-5xl sm:text-6xl font-black font-mono text-white my-2 tracking-tight">
              {result.score}
            </div>

            {/* Classification badge */}
            <div
              className={`mt-2 px-4 py-1.5 rounded-full border text-sm font-extrabold tracking-wide ${activeCategory.badgeBg}`}
            >
              {language === 'fi' ? activeCategory.labelFi : activeCategory.labelEn}
            </div>
          </div>

          {/* Fitness Reference Legend */}
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Kuntoluokituksen viitearvot
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
              {FITNESS_CATEGORIES.map((cat) => {
                const isSelected = activeCategory?.key === cat.key;
                return (
                  <div
                    key={cat.key}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      isSelected
                        ? `${cat.badgeBg} font-bold scale-[1.02] shadow-sm`
                        : 'bg-slate-950/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="font-semibold">{language === 'fi' ? cat.labelFi.split(' ')[0] : cat.labelEn.split(' ')[0]}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">
                      {cat.key === 'excellent' ? '> 90' : cat.key === 'good' ? '80–89' : cat.key === 'average' ? '65–79' : cat.key === 'below_average' ? '55–64' : '< 55'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
              copied
                ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                : 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/20 border border-teal-400/30'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-5 w-5" />
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
      ) : (
        /* Empty State */
        <div className="p-8 bg-slate-950/50 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
          <AlertCircle className="h-8 w-8 text-slate-600" />
          <p className="text-sm text-slate-400 max-w-xs">{t.noDataYet}</p>
        </div>
      )}

    </div>
  );
};
