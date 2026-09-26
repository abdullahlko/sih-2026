import React, { useState, useRef, useEffect } from 'react';
import { useSimulation, VIEWS, LANGUAGES, SIMULATION_STATES } from '../../context/SimulationContext';
import {
  ShieldCheck,
  Users,
  Stethoscope,
  Building2,
  Globe,
  ChevronDown,
  Activity,
  CheckCircle2,
  Sparkles,
  LogOut,
  UserCheck
} from 'lucide-react';

export default function Navbar() {
  const {
    simulationState,
    currentView,
    setCurrentView,
    language,
    setLanguage,
    setIsDpdpOpen,
    statePayload,
    userRole,
    currentUser,
    logoutUser
  } = useSimulation();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const langDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangObj = LANGUAGES.find((l) => l.id === language) || LANGUAGES[0];
  const isCritical = simulationState !== SIMULATION_STATES.SAFE;

  // Active role strictly reflects the currently displayed view (citizen | counselor | admin)
  const effectiveRole = currentView || userRole || VIEWS.CITIZEN;

  // Derive display profile attributes based on active view and matching user credentials
  const profileDetails = (() => {
    if (effectiveRole === VIEWS.CITIZEN) {
      const isCitizenUser = currentUser?.role === 'citizen';
      const name = (isCitizenUser && currentUser?.full_name) || 'Kailash Chand Verma';
      const initials = name
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'KV';
      return {
        initials,
        name,
        badgeLabel: 'Citizen / Survivor',
        district: (isCitizenUser && currentUser?.district) || 'Alwar, Rajasthan',
        caseOrEmail: (isCitizenUser && currentUser?.nhaa_case_id) || 'NHAA/2026/RJ-ALW/0429',
        avatarBg: 'from-blue-600 to-indigo-700'
      };
    } else if (effectiveRole === VIEWS.COUNSELOR) {
      const isCounselorUser = currentUser?.role === 'counselor';
      const name = (isCounselorUser && currentUser?.full_name) || 'Dr. Anita Sharma';
      const initials = name
        .replace(/^Dr\.\s*/i, '')
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'AS';
      return {
        initials,
        name,
        badgeLabel: 'Clinical Counselor',
        district: (isCounselorUser && currentUser?.district) || 'Alwar, Rajasthan',
        caseOrEmail: (isCounselorUser && currentUser?.email) || 'anita.sharma@samvedna.gov.in',
        avatarBg: 'from-emerald-600 to-teal-700'
      };
    } else {
      const isAdminUser = currentUser?.role === 'admin';
      const name = (isAdminUser && currentUser?.full_name) || 'District Admin';
      const initials = isAdminUser && currentUser?.full_name
        ? currentUser.full_name
            .replace(/,.*$/, '')
            .split(' ')
            .filter(Boolean)
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
        : 'DA';
      return {
        initials: initials || 'DA',
        name,
        badgeLabel: 'District Administrator',
        district: (isAdminUser && currentUser?.district) || 'Alwar, Rajasthan',
        caseOrEmail: (isAdminUser && currentUser?.email) || 'admin.alwar@samvedna.gov.in',
        avatarBg: 'from-[#6342eb] to-[#4722c8]'
      };
    }
  })();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-200/40 bg-[#f7f5ff]/40 backdrop-blur-xl transition-all duration-300">

      {/* Top Tricolor Indian Flag Accent Ribbon */}
      <div className="h-0.5 w-full bg-linear-to-r from-amber-500/80 via-white/80 to-emerald-600/80" />

      {/* Top micro-bar for Institutional Notice & System Health */}
      <div className="bg-purple-950/85 backdrop-blur-md text-purple-200 text-[11px] px-4 py-1.5 flex items-center justify-between border-b border-purple-900/30">
        <div className="flex items-center gap-2 max-w-3xl overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="font-medium text-purple-100/90 tracking-wide text-[10.5px] sm:text-[11px]">
            Ministry of Social Justice and Empowerment (MoSJE) • Govt. of India • National SC/ST Protection Division
          </span>
        </div>
        
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            id="navbar-dpdp-pill"
            onClick={() => setIsDpdpOpen(true)}
            className="inline-flex items-center gap-1.5 text-[10.5px] font-mono text-purple-100 hover:text-white bg-purple-900/70 hover:bg-purple-800/80 px-2.5 py-0.5 rounded-full border border-purple-500/40 transition-all cursor-pointer shadow-none active:scale-95 group"
            title="Open DPDP Act 2023 Compliance & Zero-Knowledge Architecture"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>DPDP 2023 Verified</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">

          {/* LEFT: Brand Logo & Institutional Emblem */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`#${effectiveRole}`}
              className="relative group cursor-pointer"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-white/60 backdrop-blur-sm border border-purple-200/60 p-1 overflow-hidden transition-transform duration-200 group-hover:scale-102 shadow-none">
                <img
                  src="/favicon.png"
                  alt="Samvedna AI"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </a>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 flex items-center gap-1">
                  Samvedna <span className="text-[#6342eb] font-black">AI</span>
                </span>
              </div>
              <p className="hidden md:block text-[10px] font-medium text-purple-800/70 tracking-tight">
                National SC/ST Trauma Care & Grievance AI
              </p>
            </div>
          </div>

          {/* CENTER: Role-Specific Segmented Navbar Tab (Strictly visible only for current role) */}
          <div className="hidden lg:flex items-center p-1 bg-[#ede8fc]/50 backdrop-blur-sm rounded-2xl border border-purple-200/50 shadow-none gap-1">

            {/* CITIZEN PORTAL (Only shown if Citizen is signed up / active) */}
            {effectiveRole === VIEWS.CITIZEN && (
              <div
                id="nav-citizen-portal-btn"
                className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold bg-white/90 text-[#552ddb] shadow-xs border border-purple-200/70"
              >
                <Users className="w-4 h-4 text-[#6342eb]" />
                <span>Citizen Portal</span>
                <span className="ml-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  Active
                </span>
              </div>
            )}

            {/* COUNSELOR WORKSPACE (Only shown if Counselor is signed up / active) */}
            {effectiveRole === VIEWS.COUNSELOR && (
              <div
                id="nav-counselor-workspace-btn"
                className="relative flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold bg-white/90 text-[#552ddb] shadow-xs border border-purple-200/70"
              >
                <Stethoscope className="w-4 h-4 text-[#6342eb]" />
                <span>Counselor Workspace</span>
                {isCritical ? (
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-85"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                  </span>
                ) : (
                  <span className="ml-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    Live
                  </span>
                )}
              </div>
            )}

            {/* ADMIN COMMAND CENTER (Only shown if Administrator is signed up / active) */}
            {effectiveRole === VIEWS.ADMIN && (
              <div
                id="nav-admin-command-btn"
                className="relative flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold bg-white/90 text-[#552ddb] shadow-xs border border-purple-200/70"
              >
                <Building2 className="w-4 h-4 text-[#6342eb]" />
                <span>Admin Command Center</span>
                {isCritical ? (
                  <span className="bg-rose-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-xs animate-pulse">
                    {statePayload.adminEmergencyCount} Alerts
                  </span>
                ) : (
                  <span className="ml-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    Operational
                  </span>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Language Selector & Dynamic Role Profile Pill */}
          <div className="flex items-center gap-2.5 sm:gap-3">

            {/* Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                id="language-switcher-btn"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/60 hover:bg-white/90 border border-purple-200/60 text-xs font-semibold text-purple-950 transition-all shadow-none cursor-pointer active:scale-95 backdrop-blur-sm"
                title="Select Interface & NLP Assessment Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#6342eb]" />
                <span className="hidden sm:inline">{currentLangObj.label}</span>
                <span className="sm:hidden font-bold">{currentLangObj.shortLabel}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-purple-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white/95 backdrop-blur-xl border border-purple-200/90 shadow-xl py-2 z-50 animate-spring-pop">
                  <div className="px-3.5 py-1 mb-1 border-b border-purple-100 text-[10px] font-bold uppercase tracking-wider text-purple-500">
                    Select Language
                  </div>
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

            {/* Dynamic User Role Profile Pill with Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 pl-2 border-l border-purple-200/50 hover:opacity-90 transition cursor-pointer text-left"
                title="View active profile & role"
              >
                <div className={`w-8.5 h-8.5 rounded-2xl bg-gradient-to-tr ${profileDetails.avatarBg} text-white flex items-center justify-center font-bold text-xs shadow-sm`}>
                  {profileDetails.initials}
                </div>
                <div className="hidden xl:block">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    {profileDetails.name}
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                  <div className="text-[10px] text-purple-700/80 font-medium">
                    {profileDetails.district}
                  </div>
                </div>
                <ChevronDown className={`w-3 h-3 text-purple-400 transition-transform duration-200 hidden sm:block ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white/95 backdrop-blur-xl border border-purple-200/90 shadow-2xl p-3.5 z-50 animate-spring-pop">
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-purple-100">
                    <div className={`w-9 h-9 rounded-2xl bg-gradient-to-tr ${profileDetails.avatarBg} text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0`}>
                      {profileDetails.initials}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {profileDetails.name}
                      </h4>
                      <p className="text-[10.5px] font-semibold text-purple-700">
                        {profileDetails.badgeLabel}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {profileDetails.caseOrEmail}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-1 space-y-1">
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-purple-50/60 text-[11px] text-purple-900 font-medium">
                      <UserCheck size={13} className="text-purple-600 shrink-0" />
                      <span>Role: <strong className="capitalize">{effectiveRole}</strong></span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false);
                        logoutUser();
                      }}
                      className="w-full mt-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50 border border-rose-100 transition cursor-pointer"
                    >
                      <LogOut size={13} />
                      <span>Switch Role / Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Mobile View Single Indicator (Strictly role-filtered on smaller screens) */}
        <div className="flex lg:hidden items-center justify-center py-2 border-t border-purple-100">
          {effectiveRole === VIEWS.CITIZEN && (
            <div className="flex items-center justify-center gap-1.5 py-1.5 px-4 rounded-xl text-xs font-bold bg-white text-[#552ddb] shadow-xs border border-purple-200">
              <Users className="w-3.5 h-3.5 text-[#6342eb]" />
              <span>Citizen Portal</span>
            </div>
          )}

          {effectiveRole === VIEWS.COUNSELOR && (
            <div className="relative flex items-center justify-center gap-1.5 py-1.5 px-4 rounded-xl text-xs font-bold bg-white text-[#552ddb] shadow-xs border border-purple-200">
              <Stethoscope className="w-3.5 h-3.5 text-[#6342eb]" />
              <span>Counselor Workspace</span>
              {isCritical && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              )}
            </div>
          )}

          {effectiveRole === VIEWS.ADMIN && (
            <div className="relative flex items-center justify-center gap-1.5 py-1.5 px-4 rounded-xl text-xs font-bold bg-white text-[#552ddb] shadow-xs border border-purple-200">
              <Building2 className="w-3.5 h-3.5 text-[#6342eb]" />
              <span>Admin Command Center</span>
              {isCritical && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              )}
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
