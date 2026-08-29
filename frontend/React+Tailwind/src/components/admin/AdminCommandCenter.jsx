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
      
      {/* Executive Command Header with Dark Lavender Clay */}
      <div className="clay-card-dark p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-4">
          <div className="clay-icon w-13 h-13 bg-linear-to-tr from-[#6342eb] to-[#8c65ff] flex items-center justify-center text-white shadow-lg shadow-purple-500/30 shrink-0">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-heading font-extrabold tracking-tight text-white">
                MoSJE District Executive Distress Command Center
              </h1>
              <span className="bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold px-3 py-0.5 rounded-full border border-purple-400/30">
                DISTRICT: ALWAR (ZONE-1)
              </span>
            </div>
            <p className="text-xs text-purple-200/70 mt-1">
              Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act • Psychological Rehabilitation & Protection Oversight
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportAudit}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4 text-purple-300" />
            <span>Export MoSJE Audit</span>
          </button>

          <div className={`px-4 py-2 rounded-2xl border text-right font-mono shadow-md ${
            isCritical 
              ? 'bg-rose-950/90 border-rose-500 text-rose-300 animate-pulse' 
              : 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
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
      <div className="clay-card p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-purple-100">
          <div>
            <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2.5">
              <div className="clay-icon w-8 h-8 bg-linear-to-tr from-[#6342eb] to-[#7d54f5] flex items-center justify-center text-white">
                <Scale className="w-4 h-4" />
              </div>
              <span>Special Atrocities Court Compliance & Witness Protection SLA</span>
            </h3>
            <p className="text-xs text-purple-900/70 mt-1">
              Audited against Mandated 60-Day Trial Completion & Section 15A Witness Escort Guidelines.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-[#faf8ff] border border-purple-100 space-y-1.5 shadow-2xs">
            <div className="text-purple-900/70 font-semibold">Average Counselor SLA Response</div>
            <div className="text-2xl font-black font-mono text-slate-900 font-heading">4.8 Minutes</div>
            <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Target: &lt;15 Minutes (100% compliant)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#faf8ff] border border-purple-100 space-y-1.5 shadow-2xs">
            <div className="text-purple-900/70 font-semibold">Witness Protection Relocations</div>
            <div className="text-2xl font-black font-mono text-slate-900 font-heading">32 Families</div>
            <div className="text-[11px] text-[#6342eb] font-bold">
              Zero witness hostility retractions
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#faf8ff] border border-purple-100 space-y-1.5 shadow-2xs">
            <div className="text-purple-900/70 font-semibold">Automated DBT Compensation Sanction</div>
            <div className="text-2xl font-black font-mono text-slate-900 font-heading">100% Direct Bank</div>
            <div className="text-[11px] text-purple-700/80 font-medium">
              Zero intermediary leakage in Alwar district
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
