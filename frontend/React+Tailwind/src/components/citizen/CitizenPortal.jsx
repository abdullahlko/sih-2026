import React from 'react';
import { useSimulation, SIMULATION_STATES } from '../../context/SimulationContext';
import HealingHero from './HealingHero';
import SwarajChatbot from './SwarajChatbot';
import AcousticPanicHook from './AcousticPanicHook';
import { 
  FileText, 
  ShieldCheck, 
  Clock, 
  Award, 
  Scale, 
  PhoneCall, 
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  HeartHandshake,
  Sparkles
} from 'lucide-react';

export default function CitizenPortal() {
  const { simulationState, statePayload } = useSimulation();
  const isCritical = simulationState !== SIMULATION_STATES.SAFE;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. Healing Hero Section */}
      <HealingHero />

      {/* 2. Main Interactive Workspace (2-Column Grid on Desktop, Stacked on Mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Swaraj-NLP Chatbot (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-900/70 flex items-center gap-2 font-heading">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6342eb] animate-pulse"></span>
              Interactive Psychological & Legal Assistant
            </h2>
          </div>
          <SwarajChatbot />
        </div>

        {/* RIGHT COLUMN: Voice Acoustic Stress & Legal Relief Portal (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Component: Acoustic Panic Hook */}
          <div>
            <div className="flex items-center justify-between px-1 mb-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-900/70 flex items-center gap-2 font-heading">
                <span className="w-2.5 h-2.5 rounded-full bg-[#704fe6] animate-pulse"></span>
                Acoustic Voice Stress Hook
              </h2>
            </div>
            <AcousticPanicHook />
          </div>

          {/* Quick Legal Entitlements & Case Card under SC/ST (PoA) Act */}
          <div className="clay-card p-5 sm:p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="clay-icon w-10 h-10 bg-linear-to-tr from-purple-100 to-indigo-100 border border-purple-200 flex items-center justify-center text-[#6342eb]">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-heading text-slate-900">
                    Your Case & Statutory Entitlements
                  </h3>
                  <div className="text-[11px] text-purple-700/80 font-mono font-medium">
                    {statePayload.firNumber} • {statePayload.district}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#faf8ff] border border-purple-100 flex items-center justify-between shadow-2xs">
                <span className="text-slate-600 font-medium">Rehabilitation Grant (DBT)</span>
                <span className="font-bold text-[#5932ea] font-mono bg-purple-100/70 px-2.5 py-0.5 rounded-full border border-purple-200">
                  ₹1,25,000 Sanctioned
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#faf8ff] border border-purple-100 flex items-center justify-between shadow-2xs">
                <span className="text-slate-600 font-medium">Appointed Legal Advocate</span>
                <span className="font-bold text-slate-900">Adv. R. K. Meena (DLSA)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#faf8ff] border border-purple-100 flex items-center justify-between shadow-2xs">
                <span className="text-slate-600 font-medium">Special Atrocities Court Hearing</span>
                <span className="font-bold text-[#6342eb] bg-purple-100/70 px-2.5 py-0.5 rounded-full border border-purple-200">
                  14 Sept 2026 (Pre-Trial)
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-purple-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Need Witness Escort?</span>
              <button 
                onClick={() => alert("Witness protection request dispatched to District Superintendent of Police (SP) office.")}
                className="font-bold text-[#6342eb] hover:text-[#4f2bd6] flex items-center gap-1 cursor-pointer transition-colors active:scale-95"
              >
                <span>Request Police Escort</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
