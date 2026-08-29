import React, { useState, useEffect } from 'react';
import { useSimulation, SIMULATION_STATES } from '../../context/SimulationContext';
import CaseQueueSidebar, { MOCK_CASES } from './CaseQueueSidebar';
import DistressGauge from './DistressGauge';
import NyayaExplainableAI from './NyayaExplainableAI';
import InterventionBar from './InterventionBar';
import { 
  Stethoscope, 
  User, 
  ShieldAlert, 
  FileText, 
  Scale, 
  MapPin, 
  PhoneCall,
  Calendar,
  AlertCircle,
  Building2,
  Sparkles
} from 'lucide-react';

export default function CounselorWorkspace() {
  const { simulationState, statePayload } = useSimulation();
  const [selectedCaseId, setSelectedCaseId] = useState('CASE-01');

  // Auto-switch selected case based on simulation state
  useEffect(() => {
    if (simulationState === SIMULATION_STATES.CRITICAL_VOICE) {
      setSelectedCaseId('CASE-02');
    } else if (simulationState === SIMULATION_STATES.CRITICAL_TEXT) {
      setSelectedCaseId('CASE-01');
    }
  }, [simulationState]);

  const selectedCase = MOCK_CASES.find((c) => c.id === selectedCaseId) || MOCK_CASES[0];
  const isCritical = simulationState !== SIMULATION_STATES.SAFE;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Clinical Header Banner with Claymorphism */}
      <div className="clay-card p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="clay-icon w-13 h-13 bg-linear-to-tr from-[#6342eb] to-[#7d54f5] text-white flex items-center justify-center shadow-md shadow-purple-500/20 shrink-0">
            <Stethoscope className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-heading font-extrabold text-slate-900">
                Psychological Triage & Clinical Intervention Workspace
              </h1>
            </div>
            <p className="text-xs text-purple-900/70 mt-0.5">
              Assigned Officer: <strong className="text-slate-900">{statePayload.counselorAssigned}</strong> • Special Court Witness Support Cell
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-[#faf8ff] border border-purple-200/80 text-right shadow-2xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400 font-mono">District Focus</div>
            <div className="text-xs font-bold text-slate-900">Alwar & Mewat Region</div>
          </div>
          <div className={`px-4 py-2 rounded-2xl border text-right font-mono shadow-2xs ${
            isCritical 
              ? 'bg-rose-50 border-rose-300 text-rose-800 animate-pulse' 
              : 'bg-emerald-50 border-emerald-300 text-emerald-800'
          }`}>
            <div className="text-[10px] font-sans font-bold uppercase tracking-wider">
              {isCritical ? 'Active SOS Priority' : 'Triage Queue'}
            </div>
            <div className="text-xs font-bold">
              {isCritical ? '1 Case Elevated' : '5 Cases Monitored'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar (4 cols) + Detail Workspace (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Triage Case Queue (4 cols) */}
        <div className="lg:col-span-4">
          <CaseQueueSidebar
            selectedCaseId={selectedCaseId}
            onSelectCase={(id) => setSelectedCaseId(id)}
          />
        </div>

        {/* Right Column: Active Patient Detail Pane (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Patient Identity Card */}
          <div className="clay-card p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#5932ea] bg-purple-100/80 px-2.5 py-0.5 rounded-full border border-purple-200">
                    {selectedCase.fir}
                  </span>
                  <span className="text-xs font-semibold text-purple-900/70">
                    {selectedCase.section}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900 mt-1.5 flex items-center gap-2">
                  {selectedCase.name}
                  <span className="text-xs font-medium text-slate-500 font-sans">
                    ({selectedCase.category})
                  </span>
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-purple-900/80 font-medium flex items-center gap-1.5 bg-[#faf8ff] px-3 py-1 rounded-full border border-purple-200/80">
                  <MapPin className="w-3.5 h-3.5 text-[#6342eb]" />
                  {selectedCase.district}
                </span>
              </div>
            </div>

            {/* Sub Meta Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#faf8ff] border border-purple-100 shadow-2xs">
                <span className="text-[10px] text-purple-400 block font-bold uppercase font-mono">Trial Stage</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{selectedCase.stage}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#faf8ff] border border-purple-100 shadow-2xs">
                <span className="text-[10px] text-purple-400 block font-bold uppercase font-mono">Assigned DLSA Advocate</span>
                <span className="font-bold text-slate-900 mt-0.5 block">Adv. R. K. Meena</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#faf8ff] border border-purple-100 shadow-2xs col-span-2 sm:col-span-1">
                <span className="text-[10px] text-purple-400 block font-bold uppercase font-mono">Rehabilitation Status</span>
                <span className="font-bold text-emerald-700 mt-0.5 block">₹1.25L Disbursed</span>
              </div>
            </div>
          </div>

          {/* 1. Distress Gauge & Longitudinal Trendline */}
          <DistressGauge victimData={selectedCase} />

          {/* 2. Explainable AI Factor Attributions */}
          <NyayaExplainableAI victimData={selectedCase} />

          {/* 3. Legally Mapped One-Click Interventions with Toast Notifications */}
          <InterventionBar victimData={selectedCase} />

        </div>

      </div>

    </div>
  );
}
