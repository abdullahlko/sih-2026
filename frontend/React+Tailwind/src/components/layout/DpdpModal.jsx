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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-spring-pop">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-purple-950/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Clay Card */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-purple-200/90 shadow-2xl overflow-hidden z-10">
        
        {/* Modal Header with Lavender Gradient */}
        <div className="p-6 bg-linear-to-r from-[#381c8c] via-[#4f2bd6] to-[#6342eb] text-white flex items-start justify-between border-b border-white/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner border border-white/30 shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-heading font-black text-white">
                  DPDP Act 2023 Compliance & Zero-Knowledge Architecture
                </h3>
              </div>
              <p className="text-xs text-purple-200 mt-0.5">
                Digital Personal Data Protection Act, 2023 • MoSJE Vulnerable Citizen Data Protocol
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-purple-200 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto bg-linear-to-b from-[#faf8ff] to-[#f4efff]">
          
          {/* Privacy Trust Banner with Claymorphism */}
          <div className="p-4 rounded-2xl bg-white border border-purple-200 text-xs text-purple-950 space-y-1.5 shadow-xs">
            <div className="font-bold flex items-center gap-2 font-heading text-sm text-[#5932ea]">
              <Sparkles className="w-4 h-4 text-[#6342eb]" />
              <span>Institutional Privacy Guarantee for SC/ST Atrocity Victims</span>
            </div>
            <p className="text-purple-900/80 leading-relaxed font-normal">
              Under Section 15A of the SC/ST (PoA) Act and DPDP Act 2023, victim identity, acoustic recording, and psychological distress logs are treated as <strong>Strictly Confidential Class-A Sensitive Personal Data</strong>.
            </p>
          </div>

          {/* 4 Pillars of Architecture Grid with Lavender Clay */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            {/* Pillar 1 */}
            <div className="p-4 rounded-2xl bg-white border border-purple-100 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <div className="p-1.5 rounded-lg bg-purple-100 text-[#6342eb]">
                  <Lock className="w-4 h-4" />
                </div>
                <span>AES-256-GCM Encryption</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                All voice streams, Swaraj-NLP chats and psychological telemetry are encrypted in-transit (TLS 1.3) and at-rest with zero-knowledge cryptographic keys.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 rounded-2xl bg-white border border-purple-100 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <div className="p-1.5 rounded-lg bg-purple-100 text-[#704fe6]">
                  <EyeOff className="w-4 h-4" />
                </div>
                <span>Differential Privacy & Masking</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                PII (Aadhaar, Phone Numbers, Village Names) is pseudonymized before reaching counselor dashboards or ML model training clusters.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 rounded-2xl bg-white border border-purple-100 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <div className="p-1.5 rounded-lg bg-rose-100 text-rose-600">
                  <Trash2 className="w-4 h-4" />
                </div>
                <span>Ephemerality & Right to Erasure</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Raw acoustic audio bytes are purged immediately after mathematical jitter/shimmer extraction. Citizens can request full data purge via Section 12.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-4 rounded-2xl bg-white border border-purple-100 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600">
                  <Server className="w-4 h-4" />
                </div>
                <span>Sovereign NIC/MeitY Cloud</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                100% data residency within Government of India National Informatics Centre (NIC) data centers in New Delhi and Jaipur.
              </p>
            </div>

          </div>

          {/* Compliance Badges Footer */}
          <div className="pt-3 border-t border-purple-100 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" /> CERT-In Audit Ready
            </span>
            <span className="flex items-center gap-1.5 text-[#5932ea] font-bold bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
              <CheckCircle2 className="w-3.5 h-3.5" /> ISO 27001 / HIPAA Compliant
            </span>
            <span className="flex items-center gap-1.5 text-purple-800 font-bold bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
              <CheckCircle2 className="w-3.5 h-3.5" /> MoSJE Nodal Verification
            </span>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-white border-t border-purple-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="clay-btn clay-btn-primary px-6 py-2.5 text-white font-bold text-xs cursor-pointer active:scale-95"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
}
