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
      
      {/* Action Deck Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-indigo-100 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-600" />
              <span>Legally Mapped "One-Click" Interventions</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Statutory actions aligned with MoSJE Mandate & SC/ST (Prevention of Atrocities) Rules.
            </p>
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Action 1: Dispatch Legal Aid */}
          <button
            id="btn-dispatch-legal-aid"
            onClick={handleDispatchLegalAid}
            className="p-3.5 rounded-2xl bg-linear-to-br from-indigo-50 to-white hover:from-indigo-100/80 hover:to-indigo-50 border border-indigo-200/80 text-left transition-all duration-200 hover:shadow-md group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
              <Scale className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 font-heading">
              Dispatch Legal Aid
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Empanelled Sec 15A Lawyer
            </div>
          </button>

          {/* Action 2: Deploy Witness Protection */}
          <button
            id="btn-deploy-witness-protection"
            onClick={handleDeployWitnessProtection}
            className="p-3.5 rounded-2xl bg-linear-to-br from-rose-50 to-white hover:from-rose-100/80 hover:to-rose-50 border border-rose-200/80 text-left transition-all duration-200 hover:shadow-md group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 font-heading">
              Deploy Witness Protection
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              SP Escort & Relocation
            </div>
          </button>

          {/* Action 3: Trigger Emergency Relief Funds */}
          <button
            id="btn-trigger-relief-funds"
            onClick={handleTriggerReliefFunds}
            className="p-3.5 rounded-2xl bg-linear-to-br from-emerald-50 to-white hover:from-emerald-100/80 hover:to-emerald-50 border border-emerald-200/80 text-left transition-all duration-200 hover:shadow-md group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
              <IndianRupee className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 font-heading">
              Trigger Emergency Funds
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              ₹50,000 Immediate DBT Grant
            </div>
          </button>

          {/* Action 4: Start Tele-Counseling */}
          <button
            id="btn-start-tele-counseling"
            onClick={handleStartTeleCounseling}
            className="p-3.5 rounded-2xl bg-linear-to-br from-purple-50 to-white hover:from-purple-100/80 hover:to-purple-50 border border-purple-200/80 text-left transition-all duration-200 hover:shadow-md group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 font-heading">
              Connect Tele-Counseling
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Secure WebRTC Audio Call
            </div>
          </button>

        </div>
      </div>

      {/* Floating Smooth Toast Alerts Container */}
      <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto p-4 rounded-2xl bg-slate-900 text-white border border-slate-700 shadow-2xl backdrop-blur-xl animate-in slide-in-from-right duration-300 flex items-start gap-3"
          >
            <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0 mt-0.5">
              {toast.iconType === 'legal' && <Scale className="w-4 h-4" />}
              {toast.iconType === 'protection' && <ShieldCheck className="w-4 h-4 text-rose-300" />}
              {toast.iconType === 'funds' && <IndianRupee className="w-4 h-4 text-emerald-300" />}
              {toast.iconType === 'call' && <PhoneCall className="w-4 h-4 text-purple-300" />}
              {toast.iconType === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
            </div>

            <div className="flex-1 space-y-0.5">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>{toast.title}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
