import { useState, useEffect, useRef, useCallback } from 'react';
import { AudioMode, Language } from '../types';

interface UseMetronomeOptions {
  language: Language;
}

export function useMetronome({ language }: UseMetronomeOptions) {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [audioMode, setAudioMode] = useState<AudioMode>('both');
  const [volume, setVolume] = useState<number>(0.8); // 0.0 - 1.0
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeBeat, setActiveBeat] = useState<number>(0); // 0, 1, 2, 3
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Audio Context and Scheduling Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const timerIdRef = useRef<number | null>(null);
  const elapsedTimerIdRef = useRef<number | null>(null);
  
  const nextNoteTimeRef = useRef<number>(0);
  const currentBeatInBarRef = useRef<number>(0);
  
  // Refs for current settings to prevent stale closures in async scheduler
  const audioModeRef = useRef<AudioMode>(audioMode);
  const volumeRef = useRef<number>(volume);
  const isMutedRef = useRef<boolean>(isMuted);
  const languageRef = useRef<Language>(language);

  // Sync refs with state
  useEffect(() => { audioModeRef.current = audioMode; }, [audioMode]);
  useEffect(() => { volumeRef.current = volume; }, [volume]);
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);
  useEffect(() => { languageRef.current = language; }, [language]);

  // Update Master Gain when volume or mute changes
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      const effectiveGain = isMuted ? 0 : volume;
      masterGainRef.current.gain.setValueAtTime(effectiveGain, audioCtxRef.current.currentTime);
    }
  }, [volume, isMuted]);

  // Lazy Initialization of AudioContext
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtxClass();
      const masterGain = ctx.createGain();
      masterGain.gain.value = isMutedRef.current ? 0 : volumeRef.current;
      masterGain.connect(ctx.destination);

      audioCtxRef.current = ctx;
      masterGainRef.current = masterGain;
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    return { ctx: audioCtxRef.current, masterGain: masterGainRef.current! };
  }, []);

  const playBeep = useCallback((time: number, isUp: boolean) => {
    if (audioModeRef.current === 'speech' || isMutedRef.current) return;
    if (!audioCtxRef.current || !masterGainRef.current) return;

    try {
      const osc = audioCtxRef.current.createOscillator();
      const envelope = audioCtxRef.current.createGain();
      
      // Frequency: 800 Hz for Up, 400 Hz for Down
      osc.frequency.value = isUp ? 800 : 400;
      
      envelope.gain.setValueAtTime(1, time);
      envelope.gain.exponentialRampToValueAtTime(1, time + 0.03);
      envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

      osc.connect(envelope);
      envelope.connect(masterGainRef.current);

      osc.start(time);
      osc.stop(time + 0.1);
    } catch {
      // Ignore audio scheduling errors during context state changes
    }
  }, []);

  const speakBeat = useCallback((beatIndex: number) => {
    if (audioModeRef.current === 'beep' || isMutedRef.current) return;
    if (!('speechSynthesis' in window)) return;

    const currentLang = languageRef.current;
    const words = currentLang === 'fi' ? ['Ylös', 'Ylös', 'Alas', 'Alas'] : ['Up', 'Up', 'Down', 'Down'];
    
    // Clear previous pending utterances to avoid queuing delay
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(words[beatIndex]);
    utterance.lang = currentLang === 'fi' ? 'fi-FI' : 'en-US';
    utterance.rate = 1.7; // Fast rate to fit 120 BPM tempo
    utterance.pitch = beatIndex < 2 ? 1.2 : 0.8;
    utterance.volume = volumeRef.current;

    window.speechSynthesis.speak(utterance);
  }, []);

  const nextNote = useCallback(() => {
    const secondsPerBeat = 60.0 / 120; // 120 BPM = 0.5s per step
    nextNoteTimeRef.current += secondsPerBeat;
    currentBeatInBarRef.current = (currentBeatInBarRef.current + 1) % 4;
  }, []);

  const scheduler = useCallback(() => {
    if (!audioCtxRef.current) return;

    const lookahead = 25.0; // ms
    const scheduleAheadTime = 0.1; // seconds

    while (nextNoteTimeRef.current < audioCtxRef.current.currentTime + scheduleAheadTime) {
      const beat = currentBeatInBarRef.current;
      const isUp = beat < 2;

      playBeep(nextNoteTimeRef.current, isUp);
      speakBeat(beat);

      // Schedule UI beat highlight
      const delayMs = Math.max(0, (nextNoteTimeRef.current - audioCtxRef.current.currentTime) * 1000);
      setTimeout(() => {
        setActiveBeat(beat);
      }, delayMs);

      nextNote();
    }

    timerIdRef.current = window.setTimeout(scheduler, lookahead);
  }, [nextNote, playBeep, speakBeat]);

  const startMetronome = useCallback(() => {
    const { ctx } = getAudioContext();

    currentBeatInBarRef.current = 0;
    nextNoteTimeRef.current = ctx.currentTime + 0.05;
    setActiveBeat(0);
    setElapsedSeconds(0);
    setIsRunning(true);

    // Start beat scheduler
    scheduler();

    // Start elapsed seconds counter
    if (elapsedTimerIdRef.current) clearInterval(elapsedTimerIdRef.current);
    elapsedTimerIdRef.current = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
  }, [getAudioContext, scheduler]);

  const stopMetronome = useCallback(() => {
    if (timerIdRef.current !== null) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
    if (elapsedTimerIdRef.current !== null) {
      clearInterval(elapsedTimerIdRef.current);
      elapsedTimerIdRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsRunning(false);
  }, []);

  const toggleMetronome = useCallback(() => {
    if (isRunning) {
      stopMetronome();
    } else {
      startMetronome();
    }
  }, [isRunning, startMetronome, stopMetronome]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIdRef.current !== null) clearTimeout(timerIdRef.current);
      if (elapsedTimerIdRef.current !== null) clearInterval(elapsedTimerIdRef.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return {
    isRunning,
    audioMode,
    setAudioMode,
    volume,
    setVolume,
    isMuted,
    setIsMuted,
    activeBeat,
    elapsedSeconds,
    startMetronome,
    stopMetronome,
    toggleMetronome,
  };
}
