import React, { useState, useMemo } from 'react';
import { HeartRateState, Language, PatientInfo } from './types';
import { calculateHarvardIndex } from './utils/harvardTest';
import { useMetronome } from './hooks/useMetronome';
import { LanguageSelectorScreen } from './components/LanguageSelectorScreen';
import { NavbarHeader } from './components/NavbarHeader';
import { MetronomeModule } from './components/MetronomeModule';
import { PatientInfoCard } from './components/PatientInfoCard';
import { HeartRateCard } from './components/HeartRateCard';
import { ResultsCard } from './components/ResultsCard';
import { ShieldCheck, HeartPulse } from 'lucide-react';

export const App: React.FC = () => {
  // 1. Initial Language Selection State
  const [language, setLanguage] = useState<Language | null>(null);

  // 2. Metronome Hook
  const activeLanguage = language || 'fi';
  const metronome = useMetronome({ language: activeLanguage });

  // 3. Patient Information State
  const [patient, setPatient] = useState<PatientInfo>({
    id: '',
    age: '',
    gender: 'male',
    stepHeight: '50 cm',
    date: new Date().toISOString().split('T')[0],
  });

  // 4. Heart Rate & Formula State
  const [hrState, setHrState] = useState<HeartRateState>({
    durationSeconds: 300, // 5 min standard
    formula: 'long',
    inputMode: 'bpm',
    rawHr1: '',
    rawHr2: '',
    rawHr3: '',
  });

  // Calculate Harvard Fitness Index result on the fly
  const result = useMemo(() => calculateHarvardIndex(hrState), [hrState]);

  // Reset form handler
  const handleReset = () => {
    setPatient({
      id: '',
      age: '',
      gender: 'male',
      stepHeight: '50 cm',
      date: new Date().toISOString().split('T')[0],
    });
    setHrState({
      durationSeconds: 300,
      formula: 'long',
      inputMode: 'bpm',
      rawHr1: '',
      rawHr2: '',
      rawHr3: '',
    });
  };

  // Render initial language selection screen if language is not set
  if (!language) {
    return (
      <LanguageSelectorScreen
        onSelectLanguage={(lang) => {
          setLanguage(lang);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      {/* Header */}
      <NavbarHeader
        language={language}
        onLanguageChange={setLanguage}
        onReset={handleReset}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Metronome / Pacer Card (Primary Clinical Module) */}
        <section>
          <MetronomeModule
            language={language}
            onLanguageChange={setLanguage}
            isRunning={metronome.isRunning}
            onToggleRun={metronome.toggleMetronome}
            audioMode={metronome.audioMode}
            onAudioModeChange={metronome.setAudioMode}
            volume={metronome.volume}
            onVolumeChange={metronome.setVolume}
            isMuted={metronome.isMuted}
            onMuteToggle={() => metronome.setIsMuted(!metronome.isMuted)}
            activeBeat={metronome.activeBeat}
            elapsedSeconds={metronome.elapsedSeconds}
          />
        </section>

        {/* Harvard Step Test Calculator Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Patient Details */}
          <PatientInfoCard
            language={language}
            patient={patient}
            onChange={setPatient}
          />

          {/* Card 2: Heart Rate Inputs & Formula */}
          <HeartRateCard
            language={language}
            hrState={hrState}
            onChange={setHrState}
          />

          {/* Card 3: Results & Clinical Classification */}
          <ResultsCard
            language={language}
            patient={patient}
            result={result}
          />

        </section>

      </main>

      {/* Clinical Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-4 w-4 text-teal-400" />
            <span>Kellottajanne • Kliininen Harvard-step-testi ja 120 BPM tahdistin</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Web Audio API Engine
            </span>
            <span>v1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
