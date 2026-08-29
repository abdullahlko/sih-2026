import React from 'react';
import { useSimulation, SIMULATION_STATES, VIEWS } from '../../context/SimulationContext';
import { 
  Sliders, 
  Activity, 
  AlertCircle, 
  Mic, 
  CheckCircle, 
  ShieldAlert, 
  ChevronUp, 
  ChevronDown, 
  Radio, 
  Zap, 
  ArrowRight,
  Terminal
} from 'lucide-react';

export default function SimulationControlPanel() {
  const {
    simulationState,
    setSimulationState,
    currentView,
    setCurrentView,
    isDemoPanelExpanded,
    setIsDemoPanelExpanded,
    lastTriggerTime,
    statePayload
  } = useSimulation();

  return (
    <aside 
      aria-label="SIH Jury Simulation Switchboard"
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        isDemoPanelExpanded ? 'max-w-sm sm:max-w-md w-full px-2' : 'w-auto'
      }`}
    >
      <div className="rounded-2xl border border-slate-700/80 bg-slate-900/95 text-white shadow-2xl backdrop-blur-xl overflow-hidden ring-1 ring-white/10">
        
        {/* Header Bar with Toggle */}
        <header 
          onClick={() => setIsDemoPanelExpanded(!isDemoPanelExpanded)}
          className={`flex items-center justify-between gap-3 px-3.5 py-2.5 bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 cursor-pointer select-none hover:bg-slate-800/80 transition-colors ${
            isDemoPanelExpanded ? 'border-b border-slate-800' : ''
          }`}
          title={isDemoPanelExpanded ? "Minimize Switchboard" : "Expand Switchboard"}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wide text-indigo-300">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>DEMO SWITCHBOARD</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label={isDemoPanelExpanded ? "Minimize Switchboard" : "Expand Switchboard"}
            >
              {isDemoPanelExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronUp className="w-4 h-4" />
              )}
            </button>
          </div>
        </header>

        {/* Expandable Control Body */}
        {isDemoPanelExpanded && (
          <div className="p-3.5 space-y-3">

            {/* 3 Main Simulation State Buttons */}
            <div className="grid grid-cols-3 gap-2">
              
              {/* 1. SAFE STATE */}
              <button
                id="sim-btn-safe"
                onClick={() => setSimulationState(SIMULATION_STATES.SAFE)}
                className={`flex flex-col items-center text-center p-2 rounded-xl border text-xs transition-all duration-200 cursor-pointer ${
                  simulationState === SIMULATION_STATES.SAFE
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-900/40 ring-1 ring-emerald-400/50 font-bold scale-[1.02]'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
                title="Keyboard Shortcut: S"
              >
                <div className="flex items-center gap-1 mb-1">
                  <CheckCircle className={`w-3.5 h-3.5 ${simulationState === SIMULATION_STATES.SAFE ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span className="font-semibold">SAFE</span>
                  <span className="text-[9px] font-mono bg-black/40 px-1 rounded text-slate-400">S</span>
                </div>
                <span className="text-[10px] text-emerald-400/80 font-mono">18% Distress</span>
              </button>

              {/* 2. CRITICAL TEXT TRIGGER */}
              <button
                id="sim-btn-critical-text"
                onClick={() => setSimulationState(SIMULATION_STATES.CRITICAL_TEXT)}
                className={`flex flex-col items-center text-center p-2 rounded-xl border text-xs transition-all duration-200 cursor-pointer ${
                  simulationState === SIMULATION_STATES.CRITICAL_TEXT
                    ? 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-md shadow-rose-900/40 ring-1 ring-rose-400/50 font-bold scale-[1.02]'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
                title="Keyboard Shortcut: T"
              >
                <div className="flex items-center gap-1 mb-1">
                  <AlertCircle className={`w-3.5 h-3.5 ${simulationState === SIMULATION_STATES.CRITICAL_TEXT ? 'text-rose-400 animate-pulse' : 'text-slate-500'}`} />
                  <span className="font-semibold">TEXT SOS</span>
                  <span className="text-[9px] font-mono bg-black/40 px-1 rounded text-slate-400">T</span>
                </div>
                <span className="text-[10px] text-rose-400/80 font-mono">89% NLP Threat</span>
              </button>

              {/* 3. CRITICAL VOICE TRIGGER */}
              <button
                id="sim-btn-critical-voice"
                onClick={() => setSimulationState(SIMULATION_STATES.CRITICAL_VOICE)}
                className={`flex flex-col items-center text-center p-2 rounded-xl border text-xs transition-all duration-200 cursor-pointer ${
                  simulationState === SIMULATION_STATES.CRITICAL_VOICE
                    ? 'bg-purple-950/80 border-purple-500 text-purple-200 shadow-md shadow-purple-900/40 ring-1 ring-purple-400/50 font-bold scale-[1.02]'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
                title="Keyboard Shortcut: V"
              >
                <div className="flex items-center gap-1 mb-1">
                  <Mic className={`w-3.5 h-3.5 ${simulationState === SIMULATION_STATES.CRITICAL_VOICE ? 'text-purple-400 animate-pulse' : 'text-slate-500'}`} />
                  <span className="font-semibold">VOICE SOS</span>
                  <span className="text-[9px] font-mono bg-black/40 px-1 rounded text-slate-400">V</span>
                </div>
                <span className="text-[10px] text-purple-400/80 font-mono">94% Tremor</span>
              </button>

            </div>

            {/* Active Telemetry Mini-Card */}
            <div className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-[11px] space-y-1.5">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1 font-mono text-[10px]">
                  <Activity className="w-3 h-3 text-indigo-400" />
                  Telemetry Stream:
                </span>
                <span className={`font-semibold font-mono text-[10px] px-1.5 py-0.5 rounded ${
                  simulationState === SIMULATION_STATES.SAFE 
                    ? 'bg-emerald-500/20 text-emerald-300' 
                    : simulationState === SIMULATION_STATES.CRITICAL_TEXT 
                      ? 'bg-rose-500/20 text-rose-300 animate-pulse' 
                      : 'bg-purple-500/20 text-purple-300 animate-pulse'
                }`}>
                  {statePayload.severityLevel}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80 text-[10px] text-slate-300">
                <div>
                  <span className="text-slate-400">Victim:</span>{' '}
                  <span className="font-semibold text-white">{statePayload.activeVictimName}</span>
                </div>
                <div>
                  <span className="text-slate-400">FIR:</span>{' '}
                  <span className="font-mono text-indigo-300">{statePayload.firNumber.split('/')[1] || statePayload.firNumber}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400">Vocal Jitter:</span>{' '}
                  <span className="font-mono text-white">{statePayload.voiceJitter}</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/80 italic line-clamp-1">
                Trigger: <span className="text-slate-200">{statePayload.triggerSource}</span>
              </div>
            </div>

            {/* View Switcher Shortcut for Presenter */}
            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 font-mono text-[10px]">
                <span>Switch View:</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentView(VIEWS.CITIZEN)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                    currentView === VIEWS.CITIZEN ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                  title="Keyboard Shortcut: 1"
                >
                  <span>Citizen</span>
                  <span className="text-[9px] font-mono opacity-70">1</span>
                </button>
                <button
                  onClick={() => setCurrentView(VIEWS.COUNSELOR)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                    currentView === VIEWS.COUNSELOR ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                  title="Keyboard Shortcut: 2"
                >
                  <span>Counselor</span>
                  <span className="text-[9px] font-mono opacity-70">2</span>
                </button>
                <button
                  onClick={() => setCurrentView(VIEWS.ADMIN)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                    currentView === VIEWS.ADMIN ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                  title="Keyboard Shortcut: 3"
                >
                  <span>Admin</span>
                  <span className="text-[9px] font-mono opacity-70">3</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </aside>
  );
}
