import React, { useState, useRef, useEffect } from 'react';
import { useSimulation, VIEWS, LANGUAGES, SIMULATION_STATES } from '../../context/SimulationContext';
import { 
  ShieldCheck, 
  Users, 
  Stethoscope, 
  Building2, 
  Globe, 
  ChevronDown, 
  AlertTriangle,
  Activity,
  CheckCircle2,
  Sparkles,
  Zap
} from 'lucide-react';

export default function Navbar() {
  const {
    simulationState,
    currentView,
    setCurrentView,
    language,
    setLanguage,
    setIsDpdpOpen,
    statePayload
  } = useSimulation();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangObj = LANGUAGES.find((l) => l.id === language) || LANGUAGES[0];
  const isCritical = simulationState !== SIMULATION_STATES.SAFE;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-indigo-100/80 bg-white/90 backdrop-blur-md shadow-xs transition-all duration-200">
      {/* Top micro-bar for Government Notice & System Health */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-slate-300 text-[11px] px-4 py-1 flex items-center justify-between border-b border-indigo-900/40">
        <div className="flex items-center gap-2">
          
          
          <span className="text-slate-300 font-medium">
            Ministry of Social Justice and Empowerment (MoSJE) • Govt. of India
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            id="navbar-dpdp-pill"
            onClick={() => setIsDpdpOpen(true)}
            className="inline-flex items-center gap-1 text-[10px] font-mono text-indigo-200 hover:text-white bg-indigo-900/60 hover:bg-indigo-900 px-2 py-0.5 rounded-full border border-indigo-700/60 transition-colors cursor-pointer"
            title="Open DPDP Act 2023 Compliance & Zero-Knowledge Architecture"
          >
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>DPDP 2023 Verified</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* LEFT: Brand Logo & Institutional Emblem */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative group cursor-pointer" onClick={() => setCurrentView(VIEWS.CITIZEN)}>
              {/* Outer pulsing ring in critical state */}
              <div 
                className={`absolute -inset-1 rounded-xl opacity-70 blur-xs transition duration-300 ${
                  isCritical 
                    ? simulationState === SIMULATION_STATES.CRITICAL_TEXT 
                      ? 'bg-rose-500 animate-emergency-glow' 
                      : 'bg-purple-600 animate-emergency-glow' 
                    : 'bg-indigo-400 group-hover:opacity-100'
                }`}
              ></div>

              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-md shadow-indigo-500/10 border border-slate-200/80 p-0.5 overflow-hidden">
                {isCritical ? (
                  <AlertTriangle className="w-5 h-5 text-amber-500 animate-bounce" />
                ) : (
                  <img 
                    src="/favicon.png" 
                    alt="Samvedna AI" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                )}
                
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
                  Samvedna<span className="text-indigo-600 font-bold">AI</span>
                </span>
              </div>
            </div>
          </div>

          {/* CENTER: Segmented View Switcher Pills */}
          <div className="hidden lg:flex items-center p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 shadow-inner">
            {/* Citizen Portal */}
            <button
              id="nav-citizen-portal-btn"
              onClick={() => setCurrentView(VIEWS.CITIZEN)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                currentView === VIEWS.CITIZEN
                  ? 'bg-white text-indigo-700 shadow-sm shadow-indigo-100 border border-indigo-100/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Users className={`w-4 h-4 ${currentView === VIEWS.CITIZEN ? 'text-indigo-600' : 'text-slate-500'}`} />
              <span>Citizen Portal</span>
            </button>

            {/* Counselor Workspace */}
            <button
              id="nav-counselor-workspace-btn"
              onClick={() => setCurrentView(VIEWS.COUNSELOR)}
              className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                currentView === VIEWS.COUNSELOR
                  ? 'bg-white text-indigo-700 shadow-sm shadow-indigo-100 border border-indigo-100/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Stethoscope className={`w-4 h-4 ${currentView === VIEWS.COUNSELOR ? 'text-indigo-600' : 'text-slate-500'}`} />
              <span>Counselor Workspace</span>
              {isCritical && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
              )}
            </button>

            {/* Admin Command Center */}
            <button
              id="nav-admin-command-btn"
              onClick={() => setCurrentView(VIEWS.ADMIN)}
              className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                currentView === VIEWS.ADMIN
                  ? 'bg-white text-indigo-700 shadow-sm shadow-indigo-100 border border-indigo-100/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Building2 className={`w-4 h-4 ${currentView === VIEWS.ADMIN ? 'text-indigo-600' : 'text-slate-500'}`} />
              <span>Admin Command Center</span>
              {isCritical && (
                <span className="bg-rose-500 text-white font-mono text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                  {statePayload.adminEmergencyCount}
                </span>
              )}
            </button>
          </div>

          {/* RIGHT: Language Selector & Profile Pill */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                id="language-switcher-btn"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-medium text-slate-700 transition-colors shadow-2xs"
                title="Select Interface & NLP Assessment Language"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">{currentLangObj.label}</span>
                <span className="sm:hidden font-semibold">{currentLangObj.shortLabel}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-slate-200 shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setLanguage(item.id);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-indigo-50/70 transition-colors ${
                        language === item.id ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.label}</span>
                      </span>
                      {language === item.id && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-linear-to-tr from-indigo-700 to-slate-800 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                DA
              </div>
              <div className="hidden xl:block text-left">
                <div className="text-xs font-semibold text-slate-900 flex items-center gap-1">
                  District Admin
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  Alwar, Rajasthan
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Mobile View Switcher (Visible on medium/smaller screens) */}
        <div className="flex lg:hidden items-center justify-around py-2 border-t border-slate-100 gap-1">
          <button
            onClick={() => setCurrentView(VIEWS.CITIZEN)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium ${
              currentView === VIEWS.CITIZEN
                ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Citizen</span>
          </button>

          <button
            onClick={() => setCurrentView(VIEWS.COUNSELOR)}
            className={`flex-1 relative flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium ${
              currentView === VIEWS.COUNSELOR
                ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Counselor</span>
            {isCritical && (
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            )}
          </button>

          <button
            onClick={() => setCurrentView(VIEWS.ADMIN)}
            className={`flex-1 relative flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium ${
              currentView === VIEWS.ADMIN
                ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Admin</span>
            {isCritical && (
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
