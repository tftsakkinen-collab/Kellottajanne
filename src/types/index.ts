export type Language = 'fi' | 'en';

export type AudioMode = 'both' | 'speech' | 'beep';

export type FormulaType = 'long' | 'short';

export type HRInputMode = 'bpm' | 'half_min';

export interface PatientInfo {
  id: string;
  age: string;
  gender: 'male' | 'female' | 'other' | '';
  stepHeight: string; // e.g. "50 cm" or "40 cm"
  date: string;
}

export interface HeartRateState {
  durationSeconds: number; // default 300s (5 min)
  formula: FormulaType;
  inputMode: HRInputMode; // 'bpm' (1 min) or 'half_min' (30 s)
  rawHr1: string;
  rawHr2: string;
  rawHr3: string;
}

export type FitnessCategoryKey = 'excellent' | 'good' | 'average' | 'below_average' | 'poor';

export interface FitnessCategory {
  key: FitnessCategoryKey;
  labelFi: string;
  labelEn: string;
  minScore: number;
  maxScore: number;
  colorClass: string;
  badgeBg: string;
}

export interface TestResult {
  score: number | null;
  categoryKey: FitnessCategoryKey | null;
  hr1Bpm: number | null;
  hr2Bpm: number | null;
  hr3Bpm: number | null;
  totalDurationSeconds: number;
  formula: FormulaType;
}
