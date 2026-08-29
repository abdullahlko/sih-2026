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
  Zap,
  HeartHandshake
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
    <header className="sticky top-0 z-40 w-full border-b border-purple-200/70 bg-white/80 backdrop-blur-xl shadow-xs transition-all duration-200">
      
      {/* Top micro-bar for Government Notice & System Health */}
      <div className="bg-linear-to-r from-purple-950 via-indigo-950 to-purple-950 text-purple-200 text-[11px] px-4 py-1.5 flex items-center justify-between border-b border-purple-900/40">
        <div className="flex items-center gap-2">
          <span className="font-medium text-purple-100/90 tracking-wide">
            Ministry of Social Justice and Empowerment (MoSJE) • Govt. of India • National SC/ST Protection Division
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            id="navbar-dpdp-pill"
            onClick={() => setIsDpdpOpen(true)}
            className="inline-flex items-center gap-1.5 text-[10px] font-mono text-purple-100 hover:text-white bg-purple-900/70 hover:bg-purple-800/90 px-2.5 py-0.5 rounded-full border border-purple-600/50 transition-all cursor-pointer shadow-xs active:scale-95"
            title="Open DPDP Act 2023 Compliance & Zero-Knowledge Architecture"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>DPDP 2023 Verified</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-17 gap-2 sm:gap-4">
          
          {/* LEFT: Brand Logo & Institutional Emblem */}
          <div className="flex items-center gap-3.5 shrink-0">
            <div 
              className="relative group cursor-pointer" 
              onClick={() => setCurrentView(VIEWS.CITIZEN)}
            >
              {/* Subtle lavender glow ring */}
              <div 
                className="absolute -inset-1 rounded-2xl opacity-75 blur-xs transition duration-300 bg-linear-to-r from-purple-400 to-indigo-400 group-hover:opacity-100 group-hover:scale-105"
              />

              <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-white shadow-md shadow-purple-500/15 border border-purple-200/80 p-1 overflow-hidden transition-transform duration-200 group-hover:scale-102">
                <img 
                  src="/favicon.png" 
                  alt="Samvedna AI" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-slate-900 flex items-center gap-1">
                  Samvedna<span className="text-[#6342eb] font-black">AI</span>
                </span>
              </div>
            </div>
          </div>

          {/* CENTER: Claymorphic Segmented View Switcher Pills */}
          <div className="hidden lg:flex items-center p-1.5 bg-[#ede8fc]/90 rounded-2xl border border-purple-200/70 shadow-inner">
            
            {/* Citizen Portal */}
            <button
              id="nav-citizen-portal-btn"
              onClick={() => setCurrentView(VIEWS.CITIZEN)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                currentView === VIEWS.CITIZEN
                  ? 'bg-white text-[#5932ea] shadow-md shadow-purple-500/15 border border-purple-200/80 scale-[1.02]'
                  : 'text-purple-900/70 hover:text-purple-950 hover:bg-white/50'
              }`}
            >
              <Users className={`w-4 h-4 ${currentView === VIEWS.CITIZEN ? 'text-[#6342eb]' : 'text-purple-500'}`} />
              <span>Citizen Portal</span>
            </button>

            {/* Counselor Workspace */}
            <button
              id="nav-counselor-workspace-btn"
              onClick={() => setCurrentView(VIEWS.COUNSELOR)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                currentView === VIEWS.COUNSELOR
                  ? 'bg-white text-[#5932ea] shadow-md shadow-purple-500/15 border border-purple-200/80 scale-[1.02]'
                  : 'text-purple-900/70 hover:text-purple-950 hover:bg-white/50'
              }`}
            >
              <Stethoscope className={`w-4 h-4 ${currentView === VIEWS.COUNSELOR ? 'text-[#6342eb]' : 'text-purple-500'}`} />
              <span>Counselor Workspace</span>
              {isCritical && (
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-85"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
              )}
            </button>

            {/* Admin Command Center */}
            <button
              id="nav-admin-command-btn"
              onClick={() => setCurrentView(VIEWS.ADMIN)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                currentView === VIEWS.ADMIN
                  ? 'bg-white text-[#5932ea] shadow-md shadow-purple-500/15 border border-purple-200/80 scale-[1.02]'
                  : 'text-purple-900/70 hover:text-purple-950 hover:bg-white/50'
              }`}
            >
              <Building2 className={`w-4 h-4 ${currentView === VIEWS.ADMIN ? 'text-[#6342eb]' : 'text-purple-500'}`} />
              <span>Admin Command Center</span>
              {isCritical && (
                <span className="bg-rose-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-xs animate-pulse">
                  {statePayload.adminEmergencyCount}
                </span>
              )}
            </button>
          </div>

          {/* RIGHT: Language Selector & District Profile Pill */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Language Selector Dropdown with Claymorphic button */}
            <div className="relative" ref={langDropdownRef}>
              <button
                id="language-switcher-btn"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-purple-50/80 border border-purple-200/80 text-xs font-semibold text-purple-950 transition-all shadow-xs cursor-pointer active:scale-95"
                title="Select Interface & NLP Assessment Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#6342eb]" />
                <span className="hidden sm:inline">{currentLangObj.label}</span>
                <span className="sm:hidden font-bold">{currentLangObj.shortLabel}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-purple-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white border border-purple-200/90 shadow-2xl py-2 z-50 animate-spring-pop">
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setLanguage(item.id);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-purple-50 transition-colors cursor-pointer ${
                        language === item.id ? 'bg-purple-50 text-[#5932ea] font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span>{item.label}</span>
                      {language === item.id && (
                        <CheckCircle2 className="w-4 h-4 text-[#6342eb]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* District Profile Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-purple-200/70">
              <div className="w-9 h-9 rounded-2xl bg-linear-to-tr from-[#6342eb] to-[#4722c8] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-purple-500/20">
                DA
              </div>
              <div className="hidden xl:block text-left">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  District Admin
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <div className="text-[10px] text-purple-700/80 font-medium">
                  Alwar, Rajasthan
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Mobile View Switcher (Visible on medium/smaller screens) */}
        <div className="flex lg:hidden items-center justify-around py-2 border-t border-purple-100 gap-1.5">
          <button
            onClick={() => setCurrentView(VIEWS.CITIZEN)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
              currentView === VIEWS.CITIZEN
                ? 'bg-white text-[#5932ea] shadow-xs border border-purple-200'
                : 'text-purple-800/70 hover:bg-purple-50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Citizen</span>
          </button>

          <button
            onClick={() => setCurrentView(VIEWS.COUNSELOR)}
            className={`flex-1 relative flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
              currentView === VIEWS.COUNSELOR
                ? 'bg-white text-[#5932ea] shadow-xs border border-purple-200'
                : 'text-purple-800/70 hover:bg-purple-50'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Counselor</span>
            {isCritical && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            )}
          </button>

          <button
            onClick={() => setCurrentView(VIEWS.ADMIN)}
            className={`flex-1 relative flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
              currentView === VIEWS.ADMIN
                ? 'bg-white text-[#5932ea] shadow-xs border border-purple-200'
                : 'text-purple-800/70 hover:bg-purple-50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Admin</span>
            {isCritical && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
