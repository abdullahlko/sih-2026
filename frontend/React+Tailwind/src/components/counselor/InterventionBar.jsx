import React, { useState } from 'react';
import { 
  Scale, 
  ShieldCheck, 
  IndianRupee, 
  PhoneCall, 
  CheckCircle2, 
  AlertCircle, 
  FileCheck2,
  Sparkles,
  X
} from 'lucide-react';

export default function InterventionBar({ victimData }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (title, message, iconType = 'success') => {
    const id = Date.now();
    const newToast = { id, title, message, iconType };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleDispatchLegalAid = () => {
    addToast(
      'Legal Aid Dispatched',
      `Dispatched empanelled human-rights lawyer under Sec 15A SC/ST PoA Act for ${victimData?.name || 'Victim'}.`,
      'legal'
    );
  };

  const handleDeployWitnessProtection = () => {
    addToast(
      'Witness Protection Active',
      'Alert sent to District SP. Armed relocation escort request logged with special cell.',
      'protection'
    );
  };

  const handleTriggerReliefFunds = () => {
    addToast(
      'Emergency Funds Sanctioned',
      'Sanctioned ₹50,000 emergency rehabilitation grant (DBT Transfer Initiated to verified Aadhaar bank account).',
      'funds'
    );
  };

  const handleStartTeleCounseling = () => {
    addToast(
      'Tele-Counseling Session Connected',
      `Encrypted WebRTC audio channel initialized with ${victimData?.name || 'Victim'}. Audio recording enabled for biometric sync.`,
      'call'
    );
  };

  return (
    <div className="space-y-4">
      
      {/* Action Deck Clay Card */}
      <div className="clay-card p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-purple-100">
          <div>
            <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2.5">
              <div className="clay-icon w-8 h-8 bg-linear-to-tr from-[#6342eb] to-[#7d54f5] flex items-center justify-center text-white">
                <Scale className="w-4 h-4" />
              </div>
              <span>Legally Mapped "One-Click" Interventions</span>
            </h3>
            <p className="text-xs text-purple-900/70 mt-1">
              Statutory actions aligned with MoSJE Mandate & SC/ST (Prevention of Atrocities) Rules.
            </p>
          </div>
        </div>

        {/* Tactile Clay Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          {/* Action 1: Dispatch Legal Aid */}
          <button
            id="btn-dispatch-legal-aid"
            onClick={handleDispatchLegalAid}
            className="p-4 rounded-2xl bg-linear-to-br from-[#faf8ff] to-[#f2ecfe] hover:from-white hover:to-[#ede5fc] border border-purple-200 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[#6342eb] text-white flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-110 transition-transform">
              <Scale className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 font-heading">
              Dispatch Legal Aid
            </div>
            <div className="text-[10px] text-purple-700 font-medium mt-0.5">
              Empanelled Sec 15A Lawyer
            </div>
          </button>

          {/* Action 2: Deploy Witness Protection */}
          <button
            id="btn-deploy-witness-protection"
            onClick={handleDeployWitnessProtection}
            className="p-4 rounded-2xl bg-linear-to-br from-rose-50 to-[#fff1f2] hover:from-white hover:to-rose-100/70 border border-rose-200 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 font-heading">
              Deploy Witness Protection
            </div>
            <div className="text-[10px] text-rose-700 font-medium mt-0.5">
              SP Escort & Relocation
            </div>
          </button>

          {/* Action 3: Trigger Emergency Relief Funds */}
          <button
            id="btn-trigger-relief-funds"
            onClick={handleTriggerReliefFunds}
            className="p-4 rounded-2xl bg-linear-to-br from-emerald-50 to-[#f0fdf4] hover:from-white hover:to-emerald-100/70 border border-emerald-200 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-110 transition-transform">
              <IndianRupee className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 font-heading">
              Trigger Emergency Funds
            </div>
            <div className="text-[10px] text-emerald-700 font-medium mt-0.5">
              ₹50,000 Immediate DBT Grant
            </div>
          </button>

          {/* Action 4: Start Tele-Counseling */}
          <button
            id="btn-start-tele-counseling"
            onClick={handleStartTeleCounseling}
            className="p-4 rounded-2xl bg-linear-to-br from-purple-50 to-[#faf5ff] hover:from-white hover:to-purple-100/70 border border-purple-200 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[#704fe6] text-white flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-110 transition-transform">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 font-heading">
              Connect Tele-Counseling
            </div>
            <div className="text-[10px] text-purple-700 font-medium mt-0.5">
              Secure WebRTC Audio Call
            </div>
          </button>

        </div>
      </div>

      {/* Floating Smooth Clay Toast Alerts Container */}
      <div className="fixed top-20 right-4 z-50 space-y-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto p-4 rounded-3xl bg-linear-to-br from-[#1c133a] to-[#110b24] text-white border border-purple-500/40 shadow-2xl backdrop-blur-xl animate-spring-pop flex items-start gap-3.5"
          >
            <div className="p-2 rounded-2xl bg-[#6342eb] text-white shrink-0 mt-0.5 shadow-md">
              {toast.iconType === 'legal' && <Scale className="w-4 h-4" />}
              {toast.iconType === 'protection' && <ShieldCheck className="w-4 h-4 text-rose-300" />}
              {toast.iconType === 'funds' && <IndianRupee className="w-4 h-4 text-emerald-300" />}
              {toast.iconType === 'call' && <PhoneCall className="w-4 h-4 text-purple-300" />}
              {toast.iconType === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
            </div>

            <div className="flex-1 space-y-0.5">
              <div className="text-xs font-bold text-white flex items-center gap-1.5 font-heading">
                <span>{toast.title}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-[11px] text-purple-200/90 leading-snug">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-purple-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
