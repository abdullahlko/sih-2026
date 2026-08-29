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
  Building2
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
      
      {/* Top Clinical Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-indigo-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200 shrink-0">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-heading font-bold text-slate-900">
                Psychological Triage & Clinical Intervention Workspace
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Assigned Officer: <strong className="text-slate-800">{statePayload.counselorAssigned}</strong> • Special Court Witness Support Cell
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-right">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">District Focus</div>
            <div className="text-xs font-bold text-slate-800">Alwar & Mewat Region</div>
          </div>
          <div className={`px-4 py-2 rounded-2xl border text-right font-mono ${
            isCritical ? 'bg-rose-50 border-rose-300 text-rose-800 animate-pulse' : 'bg-emerald-50 border-emerald-300 text-emerald-800'
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
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-indigo-100 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    {selectedCase.fir}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {selectedCase.section}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900 mt-1 flex items-center gap-2">
                  {selectedCase.name}
                  <span className="text-xs font-medium text-slate-500 font-sans">
                    ({selectedCase.category})
                  </span>
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                  {selectedCase.district}
                </span>
              </div>
            </div>

            {/* Sub Meta Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] text-slate-400 block font-medium">Trial Stage</span>
                <span className="font-bold text-slate-800">{selectedCase.stage}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] text-slate-400 block font-medium">Assigned DLSA Advocate</span>
                <span className="font-bold text-slate-800">Adv. R. K. Meena</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-400 block font-medium">Rehabilitation Status</span>
                <span className="font-bold text-emerald-700">₹1.25L Disbursed</span>
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
