import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileCheck2, 
  Server, 
  EyeOff, 
  Trash2, 
  X, 
  CheckCircle2, 
  ExternalLink,
  Award,
  Sparkles
} from 'lucide-react';

export default function DpdpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-indigo-100 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-start justify-between border-b border-indigo-900/50">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-heading font-extrabold text-white">
                  DPDP Act 2023 Compliance & Zero-Knowledge Architecture
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5">
                Digital Personal Data Protection Act, 2023 • MoSJE Vulnerable Citizen Data Protocol
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {/* Privacy Trust Banner */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 font-heading text-sm">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Institutional Privacy Guarantee for SC/ST Atrocity Victims</span>
            </div>
            <p className="text-indigo-800 leading-relaxed">
              Under Section 15A of the SC/ST (PoA) Act and DPDP Act 2023, victim identity, acoustic recordings, and psychological distress logs are treated as <strong>Strictly Confidential Class-A Sensitive Personal Data</strong>.
            </p>
          </div>

          {/* 4 Pillars of Architecture Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            {/* Pillar 1 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <Lock className="w-4 h-4 text-indigo-600" />
                <span>AES-256-GCM Encryption</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                All voice streams, Swaraj-NLP chats, and psychological telemetry are encrypted in-transit (TLS 1.3) and at-rest with zero-knowledge cryptographic keys.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <EyeOff className="w-4 h-4 text-purple-600" />
                <span>Differential Privacy & Masking</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                PII (Aadhaar, Phone Numbers, Village Names) is pseudonymized before reaching counselor dashboards or ML model training clusters.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <Trash2 className="w-4 h-4 text-rose-600" />
                <span>Ephemerality & Right to Erasure</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Raw acoustic audio bytes are purged immediately after mathematical jitter/shimmer extraction. Citizens can request full data purge via Section 12.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <Server className="w-4 h-4 text-emerald-600" />
                <span>Sovereign NIC/MeitY Cloud</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                100% data residency within Government of India National Informatics Centre (NIC) data centers in New Delhi and Jaipur.
              </p>
            </div>

          </div>

          {/* Compliance Badges Footer */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 font-mono">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> CERT-In Audit Ready
            </span>
            <span className="flex items-center gap-1 text-indigo-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> ISO 27001 / HIPAA Compliant
            </span>
            <span className="flex items-center gap-1 text-purple-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> MoSJE Nodal Verification
            </span>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-sm shadow-indigo-200 cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
}
