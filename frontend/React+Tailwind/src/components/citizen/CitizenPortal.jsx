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
  HeartHandshake
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
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 font-heading">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
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
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 font-heading">
                <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                Acoustic Voice Stress Hook
              </h2>
            </div>
            <AcousticPanicHook />
          </div>

          {/* Quick Legal Entitlements & Case Card under SC/ST (PoA) Act */}
          <div className="p-5 rounded-3xl bg-white border border-indigo-100 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-heading text-slate-900">
                    Your Case & Statutory Entitlements
                  </h3>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {statePayload.firNumber} • {statePayload.district}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <span className="text-slate-600">Rehabilitation Grant (DBT)</span>
                <span className="font-bold text-slate-900 font-mono">₹1,25,000 Sanctioned</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <span className="text-slate-600">Appointed Legal Advocate</span>
                <span className="font-bold text-slate-900">Adv. R. K. Meena (DLSA)</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <span className="text-slate-600">Special Atrocities Court Hearing</span>
                <span className="font-bold text-indigo-700">14 Sept 2026 (Pre-Trial)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Need Witness Escort?</span>
              <button 
                onClick={() => alert("Witness protection request dispatched to District Superintendent of Police (SP) office.")}
                className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Request Police Escort</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
