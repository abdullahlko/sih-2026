import React from 'react';
import { SimulationProvider, useSimulation, VIEWS, SIMULATION_STATES } from './context/SimulationContext';
import Navbar from './components/layout/Navbar';
import SimulationControlPanel from './components/layout/SimulationControlPanel';
import DpdpModal from './components/layout/DpdpModal';
import CitizenPortal from './components/citizen/CitizenPortal';
import CounselorWorkspace from './components/counselor/CounselorWorkspace';
import AdminCommandCenter from './components/admin/AdminCommandCenter';
import InteractiveBackground from './components/layout/InteractiveBackground';
import { AlertOctagon, PhoneCall, ShieldAlert, ArrowRight, ShieldCheck, Sparkles, Heart } from 'lucide-react';

function MainAppShell() {
  const {
    currentView,
    simulationState,
    statePayload,
    setCurrentView,
    isDpdpOpen,
    setIsDpdpOpen
  } = useSimulation();
  const isCritical = simulationState !== SIMULATION_STATES.SAFE;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#f7f5ff] text-[#241c40] antialiased selection:bg-purple-500 selection:text-white">

      {/* Interactive Particle Canvas Background */}
      <InteractiveBackground />

      {/* Subtle overlay grid for depth */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-1" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(#8c65ff_0.8px,transparent_0.8px)] bg-size-[32px_32px] opacity-[0.07]" />
      </div>

      {/* 1. Master Navigation Bar */}
      <Navbar />

      {/* 2. Emergency Global Distress Broadcast Banner (Visible during CRITICAL_TEXT or CRITICAL_VOICE states) */}
      {isCritical && (
        <div
          className={`w-full relative z-30 py-2.5 px-4 sm:px-6 lg:px-8 text-white transition-all duration-300 shadow-lg ${simulationState === SIMULATION_STATES.CRITICAL_TEXT
            ? 'bg-linear-to-r from-rose-600 via-rose-500 to-rose-600 animate-emergency-glow'
            : 'bg-linear-to-r from-purple-800 via-indigo-700 to-purple-800 animate-emergency-glow'
            }`}
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-semibold">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-xl bg-white/20 shadow-inner">
                <AlertOctagon className="w-4 h-4 text-white animate-bounce" />
              </span>
              <span>
                <strong className="tracking-wide">CRITICAL DISTRESS TRIGGER FLAGGED:</strong> {statePayload.severityLabel} in {statePayload.firNumber} ({statePayload.activeVictimName})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-white/90 text-[11px] hidden md:inline px-2.5 py-0.5 rounded-full bg-black/20">
                Distress: <strong>{statePayload.distressScore}%</strong> | Jitter: <strong>{statePayload.voiceJitter}</strong>
              </span>
              {currentView !== VIEWS.COUNSELOR && (
                <button
                  onClick={() => setCurrentView(VIEWS.COUNSELOR)}
                  className="px-3.5 py-1 rounded-xl bg-white text-purple-950 text-xs font-bold hover:bg-purple-50 transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Open Triage Desk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-7 pb-28 relative z-10">
        {currentView === VIEWS.CITIZEN && <CitizenPortal />}
        {currentView === VIEWS.COUNSELOR && <CounselorWorkspace />}
        {currentView === VIEWS.ADMIN && <AdminCommandCenter />}
      </main>

      {/* 4. Footer with MoSJE Institutional Footer & DPDP Modal Trigger */}
      <footer className="mt-auto border-t border-purple-200/80 bg-white/75 backdrop-blur-md py-5 text-center text-xs text-purple-900/70 relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-purple-950 font-bold">
            <div className="w-6 h-6 rounded-lg bg-linear-to-tr from-purple-600 to-indigo-600 p-0.5 shadow-sm">
              <img src="/favicon.png" alt="Samvedna AI" className="w-full h-full object-contain rounded-md" />
            </div>
            <span className="font-heading font-extrabold tracking-tight">Samvedna AI</span>
          </div>

          <div className="text-[11px] text-purple-800/70 font-medium">
            Ministry of Social Justice and Empowerment (MoSJE), Govt. of India • SC/ST Protection & Trauma Relief System
          </div>
        </div>
      </footer>

      {/* 5. Floating Developer Demo Simulation Switchboard */}
      <SimulationControlPanel />

      {/* 6. DPDP 2023 Compliance Modal */}
      <DpdpModal isOpen={isDpdpOpen} onClose={() => setIsDpdpOpen(false)} />

    </div>
  );
}

export default function App() {
  return (
    <SimulationProvider>
      <MainAppShell />
    </SimulationProvider>
  );
}