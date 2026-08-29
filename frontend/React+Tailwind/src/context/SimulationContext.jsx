import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';

const SimulationContext = createContext();

export const SIMULATION_STATES = {
  SAFE: 'SAFE',
  CRITICAL_TEXT: 'CRITICAL_TEXT',
  CRITICAL_VOICE: 'CRITICAL_VOICE'
};

export const LANGUAGES = [
  { id: 'en', label: 'English', shortLabel: 'EN' },
  { id: 'hinglish', label: 'Hinglish', shortLabel: 'HI-EN' },
  { id: 'hi', label: 'हिन्दी (Hindi)', shortLabel: 'हि' },
  { id: 'ta', label: 'தமிழ் (Tamil)', shortLabel: 'த' },
  { id: 'mr', label: 'मराठी (Marathi)', shortLabel: 'म' }
];

export const VIEWS = {
  CITIZEN: 'citizen',
  COUNSELOR: 'counselor',
  ADMIN: 'admin'
};

// Subtle Web Audio synthesizer for presentation feedback
function playHapticAudioCue(type = 'chime') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'critical') {
      // Urgent soft double pulse
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } else {
      // Pleasant calm confirmation chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.12); // E5
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (e) {
    // Graceful fallback if audio context blocked
  }
}

export function SimulationProvider({ children }) {
  const [simulationState, setSimulationState] = useState(SIMULATION_STATES.SAFE);
  const [currentView, setCurrentView] = useState(VIEWS.CITIZEN);
  const [language, setLanguage] = useState('en');
  const [isDemoPanelExpanded, setIsDemoPanelExpanded] = useState(false);
  const [isDpdpOpen, setIsDpdpOpen] = useState(false);
  const [lastTriggerTime, setLastTriggerTime] = useState(new Date().toLocaleTimeString());

  // Handle switching simulation state with timestamp & sound
  const triggerSimulationState = useCallback((newState) => {
    setSimulationState(newState);
    setLastTriggerTime(new Date().toLocaleTimeString());
    playHapticAudioCue(newState === SIMULATION_STATES.SAFE ? 'chime' : 'critical');
  }, []);

  // Keyboard Shortcuts for Instant Live Demo Navigation (1, 2, 3, s, t, v)
  useEffect(() => {
    function handleKeyDown(e) {
      // Avoid triggering when user is typing inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === '1') {
        setCurrentView(VIEWS.CITIZEN);
        playHapticAudioCue('chime');
      } else if (key === '2') {
        setCurrentView(VIEWS.COUNSELOR);
        playHapticAudioCue('chime');
      } else if (key === '3') {
        setCurrentView(VIEWS.ADMIN);
        playHapticAudioCue('chime');
      } else if (key === 's') {
        triggerSimulationState(SIMULATION_STATES.SAFE);
      } else if (key === 't') {
        triggerSimulationState(SIMULATION_STATES.CRITICAL_TEXT);
      } else if (key === 'v') {
        triggerSimulationState(SIMULATION_STATES.CRITICAL_VOICE);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerSimulationState]);

  // Derive dynamic mock data tailored across all 3 viewports
  const statePayload = useMemo(() => {
    switch (simulationState) {
      case SIMULATION_STATES.CRITICAL_TEXT:
        return {
          status: 'CRITICAL_TEXT',
          severityLabel: 'Severe Linguistic Distress',
          severityLevel: 'High Risk (Tier 1)',
          distressScore: 89,
          heartRateBpm: 112,
          sentiment: 'Despair & Hopelessness (-0.92)',
          riskColor: 'rose',
          voiceJitter: '1.4%',
          voiceShimmer: '2.8%',
          triggerSource: 'Linguistic NLP Trigger: Explicit despair keyword chain identified in chat.',
          flaggedPhrases: ['"I cannot endure this trial anymore"', '"No one is protecting our family"', '"Feeling helpless"'],
          recommendedAction: 'Immediate Tele-Counselor Patch & District Nodal Officer Escort Notification',
          counselorAlertCount: 1,
          adminEmergencyCount: 3,
          activeVictimName: 'Rameshwar Meghwal',
          firNumber: 'FIR/RJ-ALW/2026/0429',
          district: 'Alwar, Rajasthan',
          communityCategory: 'Scheduled Caste (Meghwal)',
          counselorAssigned: 'Dr. Anita Sharma (Sr. Clinical Psychologist)',
          timeElapsed: 'Triggered 2 mins ago'
        };

      case SIMULATION_STATES.CRITICAL_VOICE:
        return {
          status: 'CRITICAL_VOICE',
          severityLabel: 'Acoustic Distress Anomaly',
          severityLevel: 'Severe Acute Trauma (Tier 1)',
          distressScore: 94,
          heartRateBpm: 126,
          sentiment: 'Panic & High Jitter Vector (-0.96)',
          riskColor: 'purple',
          voiceJitter: '8.7% (Extreme tremor)',
          voiceShimmer: '15.4% (Vocal instability)',
          triggerSource: 'Acoustic AI Engine: Vocal tremor, pitch instability & sobbing frequencies detected.',
          flaggedPhrases: ['Audio Pitch Deviation: +214 Hz', 'Tremor Amplitude: 8.7%', 'Breath Gasps: High frequency'],
          recommendedAction: 'SOS Auto-Dialer dispatched to Toll-Free Helpline + Police PCR Liaison Alerted',
          counselorAlertCount: 2,
          adminEmergencyCount: 4,
          activeVictimName: 'Sunita Devi Bhil',
          firNumber: 'FIR/RJ-UDR/2026/0881',
          district: 'Udaipur, Rajasthan',
          communityCategory: 'Scheduled Tribe (Bhil)',
          counselorAssigned: 'Dr. Rajesh Verma (Crisis Intervention Specialist)',
          timeElapsed: 'Triggered 45 secs ago'
        };

      case SIMULATION_STATES.SAFE:
      default:
        return {
          status: 'SAFE',
          severityLabel: 'Stable / Coping Positively',
          severityLevel: 'Low Distress (Normal)',
          distressScore: 18,
          heartRateBpm: 72,
          sentiment: 'Neutral / Reassured (+0.74)',
          riskColor: 'emerald',
          voiceJitter: '0.42% (Normal vocal cord closure)',
          voiceShimmer: '1.18% (Stable amplitude)',
          triggerSource: 'All psychological and biometric indices within healthy baseline bounds.',
          flaggedPhrases: ['Routine progress inquiry', 'Self-efficacy affirmed', 'Attending monthly check-in'],
          recommendedAction: 'Standard weekly conversational wellness monitoring',
          counselorAlertCount: 0,
          adminEmergencyCount: 0,
          activeVictimName: 'Kailash Chand Verma',
          firNumber: 'FIR/RJ-ALW/2026/0112',
          district: 'Alwar, Rajasthan',
          communityCategory: 'Scheduled Caste (Bairwa)',
          counselorAssigned: 'Dr. Anita Sharma (Sr. Clinical Psychologist)',
          timeElapsed: 'Updated 5 mins ago'
        };
    }
  }, [simulationState]);

  return (
    <SimulationContext.Provider
      value={{
        simulationState,
        setSimulationState: triggerSimulationState,
        currentView,
        setCurrentView,
        language,
        setLanguage,
        isDemoPanelExpanded,
        setIsDemoPanelExpanded,
        isDpdpOpen,
        setIsDpdpOpen,
        lastTriggerTime,
        statePayload
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}
