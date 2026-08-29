import React from 'react';
import { useSimulation, SIMULATION_STATES } from '../../context/SimulationContext';
import { 
  Users, 
  Activity, 
  ShieldAlert, 
  IndianRupee, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight,
  Sparkles,
  Zap
} from 'lucide-react';

export default function BentoMetrics() {
  const { simulationState, statePayload } = useSimulation();
  const isCritical = simulationState !== SIMULATION_STATES.SAFE;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      
      {/* Widget 1: Active Monitored Lives */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-indigo-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/60 rounded-full -mr-8 -mt-8 pointer-events-none group-hover:scale-110 transition-transform"></div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">
            Active Monitored Lives
          </span>
          <div className="w-9 h-9 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 font-mono tracking-tight">
            14,820
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <span className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 font-bold text-[10px]">
              <TrendingUp className="w-3 h-3" /> +12.4%
            </span>
            <span className="text-slate-500 text-[11px]">vs last monthly cycle</span>
          </div>
        </div>
      </div>

      {/* Widget 2: State-Wide Average DDS */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-indigo-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50/60 rounded-full -mr-8 -mt-8 pointer-events-none group-hover:scale-110 transition-transform"></div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">
            State-Wide Avg DDS
          </span>
          <div className="w-9 h-9 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
            <Activity className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 font-mono tracking-tight flex items-baseline gap-1">
            <span>{isCritical ? '44.8' : '38.2'}</span>
            <span className="text-sm font-normal text-slate-400">/100</span>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <span className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 font-bold text-[10px]">
              Safe Baseline
            </span>
            <span className="text-slate-500 text-[11px]">Rajasthan Zone 1</span>
          </div>
        </div>
      </div>

      {/* Widget 3: Active High-Risk Interventions (Pulsing Pink/Rose when active) */}
      <div className={`p-5 sm:p-6 rounded-3xl border shadow-sm hover:shadow-md transition-all group relative overflow-hidden ${
        isCritical 
          ? 'bg-rose-50/80 border-rose-300 ring-1 ring-rose-200 animate-pulse' 
          : 'bg-white border-indigo-100'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold uppercase tracking-wider font-heading ${isCritical ? 'text-rose-900' : 'text-slate-500'}`}>
            Active High-Risk SOS
          </span>
          <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
            isCritical ? 'bg-rose-600 text-white animate-bounce' : 'bg-rose-50 text-rose-600 border border-rose-100'
          }`}>
            <ShieldAlert className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3">
          <div className={`text-2xl sm:text-3xl font-extrabold font-heading font-mono tracking-tight ${isCritical ? 'text-rose-700' : 'text-slate-900'}`}>
            {isCritical ? '17 Dispatches' : '14 Dispatches'}
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium">
            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
              isCritical ? 'bg-rose-200 text-rose-900' : 'bg-rose-100 text-rose-800'
            }`}>
              {isCritical ? '● Priority Escalation' : 'Standard SLA: <15m'}
            </span>
            <span className="text-slate-500 text-[11px]">Nodal Escorts Logged</span>
          </div>
        </div>
      </div>

      {/* Widget 4: Total Relief Disbursed */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-indigo-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50/60 rounded-full -mr-8 -mt-8 pointer-events-none group-hover:scale-110 transition-transform"></div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">
            Total Relief Disbursed
          </span>
          <div className="w-9 h-9 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <IndianRupee className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 font-mono tracking-tight">
            ₹1.24 Cr
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <span className="inline-flex items-center gap-0.5 bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200 font-bold text-[10px]">
              Sec 15A Fund
            </span>
            <span className="text-slate-500 text-[11px]">842 Victims Benefited</span>
          </div>
        </div>
      </div>

    </div>
  );
}
