import React from 'react';
import { Language, PatientInfo } from '../types';
import { getTranslation } from '../i18n/translations';
import { User, Calendar, Ruler, UserCheck } from 'lucide-react';

interface Props {
  language: Language;
  patient: PatientInfo;
  onChange: (updated: PatientInfo) => void;
}

export const PatientInfoCard: React.FC<Props> = ({ language, patient, onChange }) => {
  const t = getTranslation(language);

  const updateField = (field: keyof PatientInfo, value: string) => {
    onChange({ ...patient, [field]: value });
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800/90 backdrop-blur-xl rounded-3xl p-5 sm:p-7 shadow-2xl shadow-slate-950/40 space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80">
        <div className="p-2.5 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/20 shadow-inner">
          <UserCheck className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-wide">{t.patientTitle}</h3>
          <p className="text-xs text-slate-400">Subject Demographics & Bench</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Name / ID */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-teal-400" />
            <span>{t.patientId}</span>
          </label>
          <input
            type="text"
            value={patient.id}
            onChange={(e) => updateField('id', e.target.value)}
            placeholder={t.patientIdPlaceholder}
            className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all min-h-[48px]"
          />
        </div>

        {/* Age & Gender in 2 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {t.patientAge}
            </label>
            <input
              type="number"
              inputMode="numeric"
              min="1"
              max="120"
              value={patient.age}
              onChange={(e) => updateField('age', e.target.value)}
              placeholder="esim. 45"
              className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all min-h-[48px]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {t.patientGender}
            </label>
            <select
              value={patient.gender}
              onChange={(e) => updateField('gender', e.target.value as PatientInfo['gender'])}
              className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all min-h-[48px]"
            >
              <option value="">-- Valitse / Select --</option>
              <option value="male">{t.genderMale}</option>
              <option value="female">{t.genderFemale}</option>
              <option value="other">{t.genderOther}</option>
            </select>
          </div>
        </div>

        {/* Step Height & Test Date in 2 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Ruler className="h-3.5 w-3.5 text-teal-400" />
              <span>{t.stepHeight}</span>
            </label>
            <select
              value={patient.stepHeight}
              onChange={(e) => updateField('stepHeight', e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all min-h-[48px]"
            >
              <option value="50 cm">{t.stepHeightMen}</option>
              <option value="40 cm">{t.stepHeightWomen}</option>
              <option value="45 cm">45 cm</option>
              <option value="33 cm">33 cm</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-teal-400" />
              <span>{t.testDate}</span>
            </label>
            <input
              type="date"
              value={patient.date}
              onChange={(e) => updateField('date', e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all min-h-[48px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
