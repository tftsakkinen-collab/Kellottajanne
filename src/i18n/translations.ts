import { Language } from '../types';

export const translations = {
  fi: {
    appName: "Kellottajanne",
    appSubTitle: "Kliininen ajastin & Harvard-step-testi",
    selectLanguage: "Valitse kieli",
    selectLanguageSub: "Aloita valitsemalla käyttöliittymän kieli",
    fiLang: "Suomi",
    enLang: "English",
    
    // Metronome
    metronomeTitle: "Tahdistin - 120 BPM",
    step1: "1 Ylös",
    step2: "2 Ylös",
    step3: "3 Alas",
    step4: "4 Alas",
    
    audioModeBoth: "Puhe + klikki",
    audioModeSpeech: "Vain puhe",
    audioModeBeep: "Vain askellusäänet",
    
    audioExplanation: "Askellusäänet (korkea = ylös, matala = alas) pysyvät tasan 120 BPM:ssä myös laitteilla, joilla puhesynteesi on hidas.",
    
    startMetronome: "KÄYNNISTÄ TAHDISTIN",
    stopMetronome: "PÄÄTÄ TAHDISTIN",
    metronomeActive: "Tahdistin käynnissä...",
    
    soundOn: "Ääni päällä",
    soundMuted: "Mykistetty",
    volume: "Äänenvoimakkuus",
    
    // Patient Info
    patientTitle: "Testattavan tiedot",
    patientId: "Nimi / Tunniste",
    patientIdPlaceholder: "esim. Matti Meikäläinen / ID-1234",
    patientAge: "Ikä (vuotta)",
    patientGender: "Sukupuoli",
    genderMale: "Mies",
    genderFemale: "Nainen",
    genderOther: "Muu / Ei ilmoitettu",
    stepHeight: "Penkin korkeus",
    stepHeightMen: "50 cm (Standardi miehet)",
    stepHeightWomen: "40 cm (Standardi naiset)",
    stepHeightCustom: "Muu korkeus",
    testDate: "Testauspäivämäärä",

    // HR & Test Settings
    testSettingsTitle: "Sykkeiden syöttö & Kaava",
    durationLabel: "Kesto (min / sek)",
    durationFull: "5 min (300 sek) - Standardi full test",
    durationCustom: "Keskeytetty testi (sekuntia)",
    
    formulaLabel: "Laskentakaava",
    formulaLong: "Pitkä kaava (3 sykettä)",
    formulaLongSub: "Mittaus toipumisen kohdilla: 1–1.5 min, 2–2.5 min, 3–3.5 min",
    formulaShort: "Lyhyt kaava (1 syke)",
    formulaShortSub: "Mittaus toipumisen kohdalla: 1–1.5 min",
    
    inputModeLabel: "Sykkeen mittaustapa",
    inputModeBpm: "1 min syke (BPM)",
    inputMode30s: "Lyönnit / 30 s (Auto-kerroin x2)",
    
    hr1Label: "Syke 1 (1.0 – 1.5 min toipuminen)",
    hr2Label: "Syke 2 (2.0 – 2.5 min toipuminen)",
    hr3Label: "Syke 3 (3.0 – 3.5 min toipuminen)",
    hrPlaceholder: "Syötä syke",
    autoCalculatedBpm: "Vastaa syketasoa: {bpm} BPM",

    // Results
    resultsTitle: "Tulokset & Kuntoindeksi",
    fitnessIndex: "Harvard-kuntoindeksi",
    classification: "Kuntoluokitus",
    
    catExcellent: "Erinomainen",
    catGood: "Hyvä",
    catAverage: "Keskitaso",
    catBelowAverage: "Välttävä",
    catPoor: "Heikko",
    
    noDataYet: "Syötä tarvittavat syketiedot laskeaaksesi kuntoindeksin.",
    copyResults: "Kopioi tulokset leikepöydälle",
    copiedToClipboard: "Tulokset kopioitu leikepöydälle!",

    // Medical Note Export
    medicalNoteHeader: "--- HARVARD STEP TESTI - POTILASKIRJAUS ---",
    medPatient: "Potilas / ID",
    medAge: "Ikä",
    medGender: "Sukupuoli",
    medStepHeight: "Penkin korkeus",
    medDate: "Päivämäärä",
    medDuration: "Testin kesto",
    medFormula: "Käytetty kaava",
    medHeartRates: "Mitatut sykkeet (BPM)",
    medIndexScore: "Kuntoindeksi",
    medRating: "Luokitus",
  },
  en: {
    appName: "Kellottajanne",
    appSubTitle: "Clinical Timer & Harvard Step Test",
    selectLanguage: "Select Language",
    selectLanguageSub: "Choose your preferred language to begin",
    fiLang: "Suomi",
    enLang: "English",
    
    // Metronome
    metronomeTitle: "Pacer - 120 BPM",
    step1: "1 Up",
    step2: "2 Up",
    step3: "3 Down",
    step4: "4 Down",
    
    audioModeBoth: "Speech + Click",
    audioModeSpeech: "Speech Only",
    audioModeBeep: "Step Sounds Only",
    
    audioExplanation: "Step sounds (high pitch = up, low pitch = down) stay precisely at 120 BPM even on devices with slow speech synthesis.",
    
    startMetronome: "START PACER",
    stopMetronome: "STOP PACER",
    metronomeActive: "Pacer running...",
    
    soundOn: "Sound On",
    soundMuted: "Muted",
    volume: "Volume",
    
    // Patient Info
    patientTitle: "Subject Details",
    patientId: "Name / ID",
    patientIdPlaceholder: "e.g. John Doe / ID-1234",
    patientAge: "Age (years)",
    patientGender: "Gender",
    genderMale: "Male",
    genderFemale: "Female",
    genderOther: "Other / Unspecified",
    stepHeight: "Step Height",
    stepHeightMen: "50 cm (Standard Male)",
    stepHeightWomen: "40 cm (Standard Female)",
    stepHeightCustom: "Custom Height",
    testDate: "Test Date",

    // HR & Test Settings
    testSettingsTitle: "Heart Rate Inputs & Formula",
    durationLabel: "Duration (min / sec)",
    durationFull: "5 min (300 sec) - Standard full test",
    durationCustom: "Early stop duration (sec)",
    
    formulaLabel: "Calculation Formula",
    formulaLong: "Long Formula (3 HRs)",
    formulaLongSub: "Recovery intervals: 1–1.5 min, 2–2.5 min, 3–3.5 min",
    formulaShort: "Short Formula (1 HR)",
    formulaShortSub: "Recovery interval: 1–1.5 min",
    
    inputModeLabel: "HR Measurement Mode",
    inputModeBpm: "1 min HR (BPM)",
    inputMode30s: "Beats / 30 s (Auto-multiplier x2)",
    
    hr1Label: "HR 1 (1.0 – 1.5 min recovery)",
    hr2Label: "HR 2 (2.0 – 2.5 min recovery)",
    hr3Label: "HR 3 (3.0 – 3.5 min recovery)",
    hrPlaceholder: "Enter HR",
    autoCalculatedBpm: "Equivalent to: {bpm} BPM",

    // Results
    resultsTitle: "Results & Fitness Index",
    fitnessIndex: "Harvard Fitness Index",
    classification: "Fitness Classification",
    
    catExcellent: "Excellent",
    catGood: "Good",
    catAverage: "Average",
    catBelowAverage: "Below Average",
    catPoor: "Poor",
    
    noDataYet: "Enter the required heart rate values to calculate the fitness index.",
    copyResults: "Copy Results to Clipboard",
    copiedToClipboard: "Results copied to clipboard!",

    // Medical Note Export
    medicalNoteHeader: "--- HARVARD STEP TEST - CLINICAL RECORD ---",
    medPatient: "Patient / ID",
    medAge: "Age",
    medGender: "Gender",
    medStepHeight: "Step Height",
    medDate: "Date",
    medDuration: "Test Duration",
    medFormula: "Formula Used",
    medHeartRates: "Measured HRs (BPM)",
    medIndexScore: "Fitness Index Score",
    medRating: "Classification",
  }
};

export function getTranslation(lang: Language) {
  return translations[lang] || translations.fi;
}
