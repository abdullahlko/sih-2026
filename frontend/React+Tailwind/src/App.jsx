import React from 'react';
import { SimulationProvider, useSimulation, VIEWS, SIMULATION_STATES } from './context/SimulationContext';
import Navbar from './components/layout/Navbar';
import SimulationControlPanel from './components/layout/SimulationControlPanel';
import DpdpModal from './components/layout/DpdpModal';
import CitizenPortal from './components/citizen/CitizenPortal';
import CounselorWorkspace from './components/counselor/CounselorWorkspace';
import AdminCommandCenter from './components/admin/AdminCommandCenter';
import { AlertOctagon, PhoneCall, ShieldAlert, ArrowRight, ShieldCheck } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-slate-50/70 bg-[radial-gradient(#e0e7ff_1.2px,transparent_1.2px)] bg-size-[24px_24px] text-slate-800 antialiased">
      
      {/* 1. Master Navigation Bar */}
      <Navbar />

      {/* 2. Emergency Global Distress Broadcast Banner (Visible during CRITICAL_TEXT or CRITICAL_VOICE states) */}
      {isCritical && (
        <div 
          className={`w-full py-2.5 px-4 sm:px-6 lg:px-8 text-white transition-all duration-300 ${
            simulationState === SIMULATION_STATES.CRITICAL_TEXT
              ? 'bg-linear-to-r from-rose-700 via-rose-600 to-rose-700 shadow-md animate-pulse'
              : 'bg-linear-to-r from-purple-800 via-purple-700 to-purple-800 shadow-md animate-pulse'
          }`}
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-white/20">
                <AlertOctagon className="w-4 h-4 text-white" />
              </span>
              <span>
                <strong>CRITICAL DISTRESS TRIGGER FLAGGED:</strong> {statePayload.severityLabel} in {statePayload.firNumber} ({statePayload.activeVictimName})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-white/90 text-[11px] hidden md:inline">
                Distress Score: <strong>{statePayload.distressScore}%</strong> | Jitter: <strong>{statePayload.voiceJitter}</strong>
              </span>
              {currentView !== VIEWS.COUNSELOR && (
                <button
                  onClick={() => setCurrentView(VIEWS.COUNSELOR)}
                  className="px-3 py-1 rounded-lg bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Triage Desk</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        {currentView === VIEWS.CITIZEN && <CitizenPortal />}
        {currentView === VIEWS.COUNSELOR && <CounselorWorkspace />}
        {currentView === VIEWS.ADMIN && <AdminCommandCenter />}
      </main>

      {/* 4. Footer with MoSJE Institutional Footer & DPDP Modal Trigger */}
      <footer className="mt-auto border-t border-indigo-100 bg-white/80 backdrop-blur-xs py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-600">
            <img src="/favicon.png" alt="Samvedna AI" className="w-5 h-5 object-contain rounded" />
            <span className="font-bold text-slate-800">Samvedna AI</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Ministry of Social Justice and Empowerment, Government of India • SC/ST Protection Division
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