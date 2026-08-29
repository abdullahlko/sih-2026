import React from 'react';
import { useSimulation, SIMULATION_STATES } from '../../context/SimulationContext';
import BentoMetrics from './BentoMetrics';
import GeographicHeatmap from './GeographicHeatmap';
import IvrsSmsConsole from './IvrsSmsConsole';
import { 
  Building2, 
  Download, 
  ShieldCheck, 
  FileSpreadsheet, 
  Calendar, 
  Scale, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Sparkles,
  BarChart3
} from 'lucide-react';

export default function AdminCommandCenter() {
  const { simulationState, statePayload } = useSimulation();
  const isCritical = simulationState !== SIMULATION_STATES.SAFE;

  const handleExportAudit = () => {
    alert("Exporting official MoSJE Section 15A Distress & Relief Compliance Report (CSV/PDF)...");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Executive Command Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-heading font-extrabold tracking-tight text-white">
                MoSJE District Executive Distress Command Center
              </h1>
              <span className="bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded border border-indigo-400/30">
                DISTRICT: ALWAR (ZONE-1)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act • Psychological Rehabilitation & Protection Oversight
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportAudit}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Export MoSJE Audit</span>
          </button>

          <div className={`px-4 py-2 rounded-2xl border text-right font-mono ${
            isCritical ? 'bg-rose-950/90 border-rose-600 text-rose-300 animate-pulse' : 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
          }`}>
            <div className="text-[10px] font-sans font-bold uppercase tracking-wider">
              {isCritical ? 'Critical SOS Active' : 'System Baseline'}
            </div>
            <div className="text-xs font-bold">
              {isCritical ? `${statePayload.adminEmergencyCount} Active Alerts` : 'Zero Unresolved SOS'}
            </div>
          </div>
        </div>
      </div>

      {/* 1. Bento-Grid High-Level Metrics */}
      <BentoMetrics />

      {/* 2. SVG Geographic Heatmap of Hotspots */}
      <GeographicHeatmap />

      {/* 3. The IVRS & SMS Fallback Console (No-Internet Resiliency) */}
      <IvrsSmsConsole />

      {/* 4. Statutory Compliance & Trial Progress Summary */}
      <div className="p-6 rounded-3xl bg-white border border-indigo-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-600" />
              <span>Special Atrocities Court Compliance & Witness Protection SLA</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Audited against Mandated 60-Day Trial Completion & Section 15A Witness Escort Guidelines.
            </p>
          </div>

          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="text-slate-500 font-semibold">Average Counselor SLA Response</div>
            <div className="text-xl font-bold font-mono text-slate-900 font-heading">4.8 Minutes</div>
            <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Target: &lt;15 Minutes (100% compliant)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="text-slate-500 font-semibold">Witness Protection Relocations</div>
            <div className="text-xl font-bold font-mono text-slate-900 font-heading">32 Families</div>
            <div className="text-[11px] text-indigo-600 font-medium">
              Zero witness hostility retractions
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="text-slate-500 font-semibold">Automated DBT Compensation Sanction</div>
            <div className="text-xl font-bold font-mono text-slate-900 font-heading">100% Direct Bank</div>
            <div className="text-[11px] text-slate-500 font-medium">
              Zero intermediary leakage in Alwar district
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
