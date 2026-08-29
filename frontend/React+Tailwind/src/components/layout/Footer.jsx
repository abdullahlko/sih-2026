import React from 'react';
import { useSimulation, VIEWS } from '../../context/SimulationContext';
import {
  PhoneCall,
  Activity,
  Users,
  Stethoscope,
  Building2
} from 'lucide-react';

export default function Footer() {
  const { setCurrentView } = useSimulation();

  return (
    <footer className="mt-auto relative z-20 border-t border-purple-200/80 bg-white/80 backdrop-blur-xl text-purple-950 transition-all duration-300">
      
      {/* Top Tricolor Accent Ribbon */}
      <div className="h-1 w-full bg-linear-to-r from-amber-500 via-white to-emerald-600 opacity-90" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Column 1: Institutional Identity (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative group cursor-pointer" onClick={() => setCurrentView(VIEWS.CITIZEN)}>
                <div className="absolute -inset-1 rounded-2xl opacity-75 blur-xs transition duration-300 bg-linear-to-r from-purple-400 to-indigo-400 group-hover:opacity-100" />
                <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-white shadow-md shadow-purple-500/15 border border-purple-200 p-1">
                  <img src="/favicon.png" alt="Samvedna AI" className="w-full h-full object-contain rounded-xl" />
                </div>
              </div>
              <div>
                <span className="font-heading font-black text-xl tracking-tight text-slate-900 flex items-center gap-1">
                  Samvedna<span className="text-[#6342eb]">AI</span>
                </span>
                <p className="text-[11px] font-semibold text-purple-700/90 tracking-wide uppercase">
                  National SC/ST Protection & Trauma Care Division
                </p>
              </div>
            </div>

            <p className="text-xs text-purple-900/80 leading-relaxed max-w-md">
              <strong>Ministry of Social Justice and Empowerment (MoSJE), Govt. of India</strong> • SC/ST Protection & Trauma Relief System. Real-time acoustic distress biomarker analysis, linguistic trauma triage, and automated institutional grievance redressal under the PoA Act.
            </p>
          </div>

          {/* Column 2: 24x7 Emergency Helplines (4 Cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <PhoneCall className="w-4 h-4 text-rose-500" />
              <span>National 24x7 Crisis Hotlines</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              
              {/* Helpline 1: SC/ST Helpline */}
              <div className="p-3 rounded-2xl bg-[#faf8ff] border border-purple-200/80 shadow-xs hover:border-purple-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-purple-700 uppercase tracking-tight">National SC/ST Helpline</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <div className="text-base font-black font-mono text-[#552ddb] mt-0.5">14566</div>
                <div className="text-[10px] text-purple-900/60 font-medium">Toll-Free • Multilingual</div>
              </div>

              {/* Helpline 2: National Emergency */}
              <div className="p-3 rounded-2xl bg-[#faf8ff] border border-purple-200/80 shadow-xs hover:border-purple-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-purple-700 uppercase tracking-tight">ERSS Emergency</span>
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                </div>
                <div className="text-base font-black font-mono text-rose-600 mt-0.5">112</div>
                <div className="text-[10px] text-purple-900/60 font-medium">Police • Ambulance • Fire</div>
              </div>

              {/* Helpline 3: Mental Health (KIRAN) */}
              <div className="p-3 rounded-2xl bg-[#faf8ff] border border-purple-200/80 shadow-xs hover:border-purple-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-purple-700 uppercase tracking-tight">KIRAN Mental Health</span>
                </div>
                <div className="text-xs font-black font-mono text-[#552ddb] mt-1">1800-599-0019</div>
                <div className="text-[10px] text-purple-900/60 font-medium">MoSJE Psychological Support</div>
              </div>

              {/* Helpline 4: Women Helpline */}
              <div className="p-3 rounded-2xl bg-[#faf8ff] border border-purple-200/80 shadow-xs hover:border-purple-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-purple-700 uppercase tracking-tight">Women Helpline</span>
                </div>
                <div className="text-base font-black font-mono text-[#552ddb] mt-0.5">1091 / 181</div>
                <div className="text-[10px] text-purple-900/60 font-medium">24x7 Immediate Redressal</div>
              </div>

            </div>
          </div>

          {/* Column 3: Portal Navigation (3 Cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <Activity className="w-4 h-4 text-[#6342eb]" />
              <span>Portal Navigation</span>
            </div>

            {/* Quick Portal Switchers */}
            <div className="space-y-1.5">
              <button
                onClick={() => setCurrentView(VIEWS.CITIZEN)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-purple-50/60 hover:bg-purple-100/70 border border-purple-200/60 text-xs font-semibold text-purple-950 transition-all cursor-pointer text-left"
              >
                <span className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[#6342eb]" />
                  <span>Citizen Portal</span>
                </span>
                <span className="text-[10px] text-purple-500 font-mono font-bold">Portal 1</span>
              </button>

              <button
                onClick={() => setCurrentView(VIEWS.COUNSELOR)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-purple-50/60 hover:bg-purple-100/70 border border-purple-200/60 text-xs font-semibold text-purple-950 transition-all cursor-pointer text-left"
              >
                <span className="flex items-center gap-2">
                  <Stethoscope className="w-3.5 h-3.5 text-[#6342eb]" />
                  <span>Counselor Workspace</span>
                </span>
                <span className="text-[10px] text-purple-500 font-mono font-bold">Portal 2</span>
              </button>

              <button
                onClick={() => setCurrentView(VIEWS.ADMIN)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-purple-50/60 hover:bg-purple-100/70 border border-purple-200/60 text-xs font-semibold text-purple-950 transition-all cursor-pointer text-left"
              >
                <span className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-[#6342eb]" />
                  <span>Admin Command Center</span>
                </span>
                <span className="text-[10px] text-purple-500 font-mono font-bold">Portal 3</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Micro-Bar / Copyright */}
        <div className="pt-6 border-t border-purple-200/70 text-center text-xs text-purple-900/70">
          <span className="font-semibold text-slate-800">© 2026 Ministry of Social Justice and Empowerment (MoSJE), Govt. of India.</span>
        </div>

      </div>

    </footer>
  );
}
