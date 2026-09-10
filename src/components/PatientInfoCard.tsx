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
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-800">
        <div className="p-2 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/20">
          <UserCheck className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-bold text-white">{t.patientTitle}</h3>
      </div>

      <div className="space-y-4">
        {/* Name / ID */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-teal-400" />
            <span>{t.patientId}</span>
          </label>
          <input
            type="text"
            value={patient.id}
            onChange={(e) => updateField('id', e.target.value)}
            placeholder={t.patientIdPlaceholder}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
          />
        </div>

        {/* Age & Gender in 2 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              {t.patientAge}
            </label>
            <input
              type="number"
              min="1"
              max="120"
              value={patient.age}
              onChange={(e) => updateField('age', e.target.value)}
              placeholder="esim. 45"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              {t.patientGender}
            </label>
            <select
              value={patient.gender}
              onChange={(e) => updateField('gender', e.target.value as PatientInfo['gender'])}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
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
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Ruler className="h-3.5 w-3.5 text-teal-400" />
              <span>{t.stepHeight}</span>
            </label>
            <select
              value={patient.stepHeight}
              onChange={(e) => updateField('stepHeight', e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
            >
              <option value="50 cm">{t.stepHeightMen}</option>
              <option value="40 cm">{t.stepHeightWomen}</option>
              <option value="45 cm">45 cm</option>
              <option value="33 cm">33 cm</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-teal-400" />
              <span>{t.testDate}</span>
            </label>
            <input
              type="date"
              value={patient.date}
              onChange={(e) => updateField('date', e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
