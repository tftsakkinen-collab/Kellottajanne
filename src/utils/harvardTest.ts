import { FitnessCategory, HRInputMode, HeartRateState, Language, PatientInfo, TestResult } from '../types';
import { getTranslation } from '../i18n/translations';

export const FITNESS_CATEGORIES: FitnessCategory[] = [
  {
    key: 'excellent',
    labelFi: 'Erinomainen (>90)',
    labelEn: 'Excellent (>90)',
    minScore: 90.0001,
    maxScore: Infinity,
    colorClass: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  {
    key: 'good',
    labelFi: 'Hyvä (80–89)',
    labelEn: 'Good (80–89)',
    minScore: 80,
    maxScore: 90,
    colorClass: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  },
  {
    key: 'average',
    labelFi: 'Keskitaso (65–79)',
    labelEn: 'Average (65–79)',
    minScore: 65,
    maxScore: 79.9999,
    colorClass: 'text-amber-400',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  {
    key: 'below_average',
    labelFi: 'Välttävä (55–64)',
    labelEn: 'Below Average (55–64)',
    minScore: 55,
    maxScore: 64.9999,
    colorClass: 'text-orange-400',
    badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
  },
  {
    key: 'poor',
    labelFi: 'Heikko (<55)',
    labelEn: 'Poor (<55)',
    minScore: -Infinity,
    maxScore: 54.9999,
    colorClass: 'text-rose-400',
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
  },
];

export function getFitnessCategory(score: number): FitnessCategory {
  if (score > 90) return FITNESS_CATEGORIES[0]; // excellent
  if (score >= 80) return FITNESS_CATEGORIES[1]; // good
  if (score >= 65) return FITNESS_CATEGORIES[2]; // average
  if (score >= 55) return FITNESS_CATEGORIES[3]; // below average
  return FITNESS_CATEGORIES[4]; // poor
}

export function parseHRValue(raw: string, inputMode: HRInputMode): number | null {
  const num = parseFloat(raw.replace(',', '.'));
  if (isNaN(num) || num <= 0) return null;
  return inputMode === 'half_min' ? Math.round(num * 2) : Math.round(num);
}

export function calculateHarvardIndex(hrState: HeartRateState): TestResult {
  const { durationSeconds, formula, inputMode, rawHr1, rawHr2, rawHr3 } = hrState;
  
  const hr1 = parseHRValue(rawHr1, inputMode);
  const hr2 = parseHRValue(rawHr2, inputMode);
  const hr3 = parseHRValue(rawHr3, inputMode);

  if (formula === 'short') {
    if (hr1 === null) {
      return {
        score: null,
        categoryKey: null,
        hr1Bpm: null,
        hr2Bpm: null,
        hr3Bpm: null,
        totalDurationSeconds: durationSeconds,
        formula,
      };
    }

    // Short formula: (100 * duration_in_seconds) / (5.5 * hr1)
    const score = (100 * durationSeconds) / (5.5 * hr1);
    const category = getFitnessCategory(score);

    return {
      score: Math.round(score * 10) / 10,
      categoryKey: category.key,
      hr1Bpm: hr1,
      hr2Bpm: null,
      hr3Bpm: null,
      totalDurationSeconds: durationSeconds,
      formula,
    };
  } else {
    // Long formula: (100 * duration_in_seconds) / (2 * (hr1 + hr2 + hr3))
    if (hr1 === null || hr2 === null || hr3 === null) {
      return {
        score: null,
        categoryKey: null,
        hr1Bpm: hr1,
        hr2Bpm: hr2,
        hr3Bpm: hr3,
        totalDurationSeconds: durationSeconds,
        formula,
      };
    }

    const hrSum = hr1 + hr2 + hr3;
    const score = (100 * durationSeconds) / (2 * hrSum);
    const category = getFitnessCategory(score);

    return {
      score: Math.round(score * 10) / 10,
      categoryKey: category.key,
      hr1Bpm: hr1,
      hr2Bpm: hr2,
      hr3Bpm: hr3,
      totalDurationSeconds: durationSeconds,
      formula,
    };
  }
}

export function formatMedicalRecordText(
  patient: PatientInfo,
  result: TestResult,
  lang: Language
): string {
  const t = getTranslation(lang);
  const durationMin = (result.totalDurationSeconds / 60).toFixed(1);
  const formulaName = result.formula === 'long' ? t.formulaLong : t.formulaShort;
  
  let ratingText = '-';
  if (result.categoryKey) {
    const category = FITNESS_CATEGORIES.find((c) => c.key === result.categoryKey);
    ratingText = lang === 'fi' ? category?.labelFi || '' : category?.labelEn || '';
  }

  let hrString = '';
  if (result.formula === 'short') {
    hrString = `HR1 (1–1.5 min): ${result.hr1Bpm || '-'} BPM`;
  } else {
    hrString = `HR1 (1–1.5 min): ${result.hr1Bpm || '-'} BPM | HR2 (2–2.5 min): ${result.hr2Bpm || '-'} BPM | HR3 (3–3.5 min): ${result.hr3Bpm || '-'} BPM`;
  }

  const lines = [
    t.medicalNoteHeader,
    `${t.medDate}: ${patient.date || new Date().toISOString().split('T')[0]}`,
    `${t.medPatient}: ${patient.id || '-'}`,
    `${t.medAge}: ${patient.age ? patient.age + ' v' : '-'}`,
    `${t.medGender}: ${patient.gender === 'male' ? t.genderMale : patient.gender === 'female' ? t.genderFemale : patient.gender === 'other' ? t.genderOther : '-'}`,
    `${t.medStepHeight}: ${patient.stepHeight || '-'}`,
    `----------------------------------------`,
    `${t.medDuration}: ${result.totalDurationSeconds} s (${durationMin} min)`,
    `${t.medFormula}: ${formulaName}`,
    `${t.medHeartRates}: ${hrString}`,
    `${t.medIndexScore}: ${result.score !== null ? result.score : '-'}`,
    `${t.medRating}: ${ratingText}`,
    `----------------------------------------`,
  ];

  return lines.join('\n');
}
