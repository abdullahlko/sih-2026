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
      <div className="clay-card p-6 relative overflow-hidden group hover:-translate-y-1 transition-all">
        <div className="absolute top-0 right-0 w-28 h-28 bg-purple-100/50 rounded-full -mr-8 -mt-8 pointer-events-none group-hover:scale-125 transition-transform duration-300"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-900/70 font-mono">
            Active Monitored Lives
          </span>
          <div className="clay-icon w-10 h-10 bg-linear-to-tr from-purple-100 to-indigo-100 border border-purple-200 flex items-center justify-center text-[#6342eb]">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 relative z-10">
          <div className="text-2xl sm:text-3xl font-black font-heading text-slate-900 font-mono tracking-tight">
            14,820
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-emerald-600 font-bold">
            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[10px]">
              <TrendingUp className="w-3 h-3" /> +12.4%
            </span>
            <span className="text-purple-800/70 font-normal text-[11px]">vs last cycle</span>
          </div>
        </div>
      </div>

      {/* Widget 2: State-Wide Average DDS */}
      <div className="clay-card p-6 relative overflow-hidden group hover:-translate-y-1 transition-all">
        <div className="absolute top-0 right-0 w-28 h-28 bg-purple-100/50 rounded-full -mr-8 -mt-8 pointer-events-none group-hover:scale-125 transition-transform duration-300"></div>

        <div className="flex items-center justify-between relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-900/70 font-mono">
            State-Wide Avg DDS
          </span>
          <div className="clay-icon w-10 h-10 bg-linear-to-tr from-purple-100 to-pink-100 border border-purple-200 flex items-center justify-center text-[#704fe6]">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 relative z-10">
          <div className="text-2xl sm:text-3xl font-black font-heading text-slate-900 font-mono tracking-tight flex items-baseline gap-1">
            <span>{isCritical ? '44.8' : '38.2'}</span>
            <span className="text-sm font-semibold text-purple-400">/100</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-emerald-600 font-bold">
            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[10px]">
              Safe Baseline
            </span>
            <span className="text-purple-800/70 font-normal text-[11px]">Rajasthan Zone 1</span>
          </div>
        </div>
      </div>

      {/* Widget 3: Active High-Risk Interventions */}
      <div className={`p-6 rounded-[28px] border shadow-md hover:-translate-y-1 transition-all group relative overflow-hidden ${
        isCritical 
          ? 'bg-linear-to-br from-rose-50 to-[#fff1f2] border-rose-300 ring-2 ring-rose-400/40 animate-pulse' 
          : 'clay-card'
      }`}>
        <div className="absolute top-0 right-0 w-28 h-28 bg-rose-100/50 rounded-full -mr-8 -mt-8 pointer-events-none group-hover:scale-125 transition-transform duration-300"></div>

        <div className="flex items-center justify-between relative z-10">
          <span className={`text-xs font-bold uppercase tracking-wider font-mono ${isCritical ? 'text-rose-900' : 'text-purple-900/70'}`}>
            Active High-Risk SOS
          </span>
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-xs ${
            isCritical ? 'bg-rose-600 text-white animate-bounce' : 'bg-rose-100 text-rose-600 border border-rose-200'
          }`}>
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 relative z-10">
          <div className={`text-2xl sm:text-3xl font-black font-heading font-mono tracking-tight ${isCritical ? 'text-rose-700' : 'text-slate-900'}`}>
            {isCritical ? '17 Dispatches' : '14 Dispatches'}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs font-bold">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] ${
              isCritical ? 'bg-rose-200 text-rose-900' : 'bg-rose-100 text-rose-800'
            }`}>
              {isCritical ? '● Priority Escalation' : 'Standard SLA: <15m'}
            </span>
            <span className="text-purple-800/70 font-normal text-[11px]">Escorts Logged</span>
          </div>
        </div>
      </div>

      {/* Widget 4: Total Relief Disbursed */}
      <div className="clay-card p-6 relative overflow-hidden group hover:-translate-y-1 transition-all">
        <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-100/50 rounded-full -mr-8 -mt-8 pointer-events-none group-hover:scale-125 transition-transform duration-300"></div>

        <div className="flex items-center justify-between relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-900/70 font-mono">
            Total Relief Disbursed
          </span>
          <div className="clay-icon w-10 h-10 bg-linear-to-tr from-emerald-100 to-teal-100 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <IndianRupee className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 relative z-10">
          <div className="text-2xl sm:text-3xl font-black font-heading text-slate-900 font-mono tracking-tight">
            ₹1.24 Cr
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-600 font-semibold">
            <span className="inline-flex items-center gap-1 bg-purple-100 text-[#5932ea] px-2.5 py-0.5 rounded-full border border-purple-200 font-bold text-[10px]">
              Sec 15A Fund
            </span>
            <span className="text-purple-800/70 font-normal text-[11px]">842 Victims Benefited</span>
          </div>
        </div>
      </div>

    </div>
  );
}
