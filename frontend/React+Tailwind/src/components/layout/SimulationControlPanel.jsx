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
  Terminal,
  Sparkles
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
      <div className="rounded-3xl border border-purple-500/40 bg-linear-to-br from-[#1c133a]/95 via-[#140d2b]/95 to-[#0e0720]/95 text-white shadow-2xl backdrop-blur-2xl overflow-hidden ring-1 ring-purple-400/30">
        
        {/* Header Bar with Toggle & Glowing Clay Style */}
        <header 
          onClick={() => setIsDemoPanelExpanded(!isDemoPanelExpanded)}
          className={`flex items-center justify-between gap-3 px-4 py-3 bg-linear-to-r from-purple-950 via-indigo-950 to-purple-950 cursor-pointer select-none hover:bg-purple-900/60 transition-colors ${
            isDemoPanelExpanded ? 'border-b border-purple-900/80' : ''
          }`}
          title={isDemoPanelExpanded ? "Minimize Switchboard" : "Expand Switchboard"}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8c65ff] opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8c65ff]"></span>
            </span>
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-purple-200">
              <Terminal className="w-4 h-4 text-[#8c65ff]" />
              <span>DEMO SWITCHBOARD</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="p-1 rounded-xl hover:bg-purple-800/60 text-purple-300 hover:text-white transition-colors cursor-pointer"
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
          <div className="p-4 space-y-3.5">

            {/* 3 Main Simulation State Buttons with Claymorphism */}
            <div className="grid grid-cols-3 gap-2.5">
              
              {/* 1. SAFE STATE */}
              <button
                id="sim-btn-safe"
                onClick={() => setSimulationState(SIMULATION_STATES.SAFE)}
                className={`flex flex-col items-center text-center p-2.5 rounded-2xl border text-xs transition-all duration-200 cursor-pointer ${
                  simulationState === SIMULATION_STATES.SAFE
                    ? 'bg-emerald-950/90 border-emerald-400 text-emerald-100 shadow-lg shadow-emerald-900/50 ring-2 ring-emerald-400/60 font-bold scale-[1.03]'
                    : 'bg-white/5 border-purple-900/60 text-purple-300 hover:bg-white/10 hover:text-white'
                }`}
                title="Keyboard Shortcut: S"
              >
                <div className="flex items-center gap-1 mb-1">
                  <CheckCircle className={`w-3.5 h-3.5 ${simulationState === SIMULATION_STATES.SAFE ? 'text-emerald-400' : 'text-purple-400'}`} />
                  <span className="font-semibold">SAFE</span>
                  <span className="text-[9px] font-mono bg-black/50 px-1 rounded text-purple-300">S</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">18% Distress</span>
              </button>

              {/* 2. CRITICAL TEXT TRIGGER */}
              <button
                id="sim-btn-critical-text"
                onClick={() => setSimulationState(SIMULATION_STATES.CRITICAL_TEXT)}
                className={`flex flex-col items-center text-center p-2.5 rounded-2xl border text-xs transition-all duration-200 cursor-pointer ${
                  simulationState === SIMULATION_STATES.CRITICAL_TEXT
                    ? 'bg-rose-950/90 border-rose-400 text-rose-100 shadow-lg shadow-rose-900/50 ring-2 ring-rose-400/60 font-bold scale-[1.03]'
                    : 'bg-white/5 border-purple-900/60 text-purple-300 hover:bg-white/10 hover:text-white'
                }`}
                title="Keyboard Shortcut: T"
              >
                <div className="flex items-center gap-1 mb-1">
                  <AlertCircle className={`w-3.5 h-3.5 ${simulationState === SIMULATION_STATES.CRITICAL_TEXT ? 'text-rose-400 animate-pulse' : 'text-purple-400'}`} />
                  <span className="font-semibold">TEXT SOS</span>
                  <span className="text-[9px] font-mono bg-black/50 px-1 rounded text-purple-300">T</span>
                </div>
                <span className="text-[10px] text-rose-400 font-mono">89% NLP Threat</span>
              </button>

              {/* 3. CRITICAL VOICE TRIGGER */}
              <button
                id="sim-btn-critical-voice"
                onClick={() => setSimulationState(SIMULATION_STATES.CRITICAL_VOICE)}
                className={`flex flex-col items-center text-center p-2.5 rounded-2xl border text-xs transition-all duration-200 cursor-pointer ${
                  simulationState === SIMULATION_STATES.CRITICAL_VOICE
                    ? 'bg-purple-950/90 border-purple-400 text-purple-100 shadow-lg shadow-purple-900/50 ring-2 ring-purple-400/60 font-bold scale-[1.03]'
                    : 'bg-white/5 border-purple-900/60 text-purple-300 hover:bg-white/10 hover:text-white'
                }`}
                title="Keyboard Shortcut: V"
              >
                <div className="flex items-center gap-1 mb-1">
                  <Mic className={`w-3.5 h-3.5 ${simulationState === SIMULATION_STATES.CRITICAL_VOICE ? 'text-purple-300 animate-pulse' : 'text-purple-400'}`} />
                  <span className="font-semibold">VOICE SOS</span>
                  <span className="text-[9px] font-mono bg-black/50 px-1 rounded text-purple-300">V</span>
                </div>
                <span className="text-[10px] text-purple-300 font-mono">94% Tremor</span>
              </button>

            </div>

            {/* Active Telemetry Mini-Card */}
            <div className="p-3 rounded-2xl bg-black/40 border border-purple-900/70 text-[11px] space-y-1.5 shadow-inner">
              <div className="flex items-center justify-between text-purple-300">
                <span className="flex items-center gap-1.5 font-mono text-[10px]">
                  <Activity className="w-3.5 h-3.5 text-[#8c65ff]" />
                  Telemetry Stream:
                </span>
                <span className={`font-semibold font-mono text-[10px] px-2 py-0.5 rounded-full ${
                  simulationState === SIMULATION_STATES.SAFE 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : simulationState === SIMULATION_STATES.CRITICAL_TEXT 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse' 
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/40 animate-pulse'
                }`}>
                  {statePayload.severityLevel}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-purple-900/80 text-[10px] text-purple-200">
                <div>
                  <span className="text-purple-400">Victim:</span>{' '}
                  <span className="font-bold text-white">{statePayload.activeVictimName}</span>
                </div>
                <div>
                  <span className="text-purple-400">FIR:</span>{' '}
                  <span className="font-mono text-purple-200">{statePayload.firNumber.split('/')[1] || statePayload.firNumber}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-purple-400">Vocal Jitter:</span>{' '}
                  <span className="font-mono text-white font-bold">{statePayload.voiceJitter}</span>
                </div>
              </div>

              <div className="text-[10px] text-purple-400 pt-1 border-t border-purple-900/80 italic line-clamp-1">
                Trigger: <span className="text-purple-200">{statePayload.triggerSource}</span>
              </div>
            </div>

            {/* View Switcher Shortcut for Presenter */}
            <div className="flex items-center justify-between pt-1 text-[11px] text-purple-300">
              <span className="flex items-center gap-1 font-mono text-[10px]">
                <span>Switch View:</span>
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentView(VIEWS.CITIZEN)}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs ${
                    currentView === VIEWS.CITIZEN 
                      ? 'bg-[#6342eb] text-white' 
                      : 'bg-white/10 hover:bg-white/20 text-purple-200'
                  }`}
                  title="Keyboard Shortcut: 1"
                >
                  <span>Citizen</span>
                  <span className="text-[9px] font-mono opacity-70">1</span>
                </button>
                <button
                  onClick={() => setCurrentView(VIEWS.COUNSELOR)}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs ${
                    currentView === VIEWS.COUNSELOR 
                      ? 'bg-[#6342eb] text-white' 
                      : 'bg-white/10 hover:bg-white/20 text-purple-200'
                  }`}
                  title="Keyboard Shortcut: 2"
                >
                  <span>Counselor</span>
                  <span className="text-[9px] font-mono opacity-70">2</span>
                </button>
                <button
                  onClick={() => setCurrentView(VIEWS.ADMIN)}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs ${
                    currentView === VIEWS.ADMIN 
                      ? 'bg-[#6342eb] text-white' 
                      : 'bg-white/10 hover:bg-white/20 text-purple-200'
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
