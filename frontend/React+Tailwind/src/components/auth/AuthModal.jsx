import React, { useState } from 'react';
import {
  X,
  User,
  Phone,
  Lock,
  FileText,
  Languages,
  Mail,
  MapPin,
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  Building2,
  KeyRound
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialRole = 'citizen', initialMode = 'signin' }) {
  const [mode, setMode] = useState(initialMode); // 'signin' | 'register'
  const [role, setRole] = useState(initialRole); // 'citizen' | 'counselor' | 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Form State for Victim / Citizen (Schema: VictimRegister)
  const [victimForm, setVictimForm] = useState({
    full_name: '',
    phone_number: '',
    password: '',
    nhaa_case_id: '',
    preferred_language: 'hi'
  });

  // Form State for Counselor (Schema: CounselorRegister)
  const [counselorForm, setCounselorForm] = useState({
    full_name: '',
    email: '',
    password: '',
    district: '',
    specialization: 'Trauma & Psychological Relief'
  });

  // Form State for Admin
  const [adminForm, setAdminForm] = useState({
    admin_id: '',
    password: '',
    security_key: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(
        mode === 'register'
          ? `Welcome ${role === 'citizen' ? victimForm.full_name || 'Citizen' : counselorForm.full_name || 'Counselor'}! Account registered successfully.`
          : 'Authentication successful. Redirecting to workspace...'
      );

      setTimeout(() => {
        setSuccessMessage('');
        onClose();
        if (role === 'counselor') {
          window.location.hash = '#counselor';
        } else if (role === 'admin') {
          window.location.hash = '#admin';
        } else {
          window.location.hash = '#citizen';
        }
      }, 900);
    }, 600);
  };

  const fillDemoData = (targetRole) => {
    if (targetRole === 'citizen') {
      setRole('citizen');
      setVictimForm({
        full_name: 'Kailash Chand Verma',
        phone_number: '+91 98290 12345',
        password: '••••••••',
        nhaa_case_id: 'NHAA/2026/RJ-ALW/0429',
        preferred_language: 'hi'
      });
    } else if (targetRole === 'counselor') {
      setRole('counselor');
      setCounselorForm({
        full_name: 'Dr. Anita Sharma',
        email: 'anita.sharma@samvedna.gov.in',
        password: '••••••••',
        district: 'Alwar, Rajasthan',
        specialization: 'Clinical Psychology & Trauma Relief'
      });
    } else {
      setRole('admin');
      setAdminForm({
        admin_id: 'ADMIN-RJ-ALW-01',
        password: '••••••••',
        security_key: 'SEC-GOV-2026-X7'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0618]/60 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white/95 rounded-3xl border border-violet-200/80 shadow-[0_25px_60px_-15px_rgba(99,66,235,0.3)] p-6 sm:p-8 backdrop-blur-xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-violet-100/60 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header with Logo */}
        <div className="text-center">
          <div className="mx-auto inline-flex items-center justify-center p-2 rounded-2xl bg-violet-50 border border-violet-100 shadow-sm">
            <img src="/favicon.png" alt="Samvedna AI" className="size-10 object-contain" />
          </div>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900">
            {mode === 'signin' ? 'Sign in to Samvedna AI' : 'Create an Account'}
          </h2>
          <p className="mt-1 text-xs font-medium text-[#4a588b]">
            National SC/ST Trauma Care &amp; Grievance Support Platform
          </p>
        </div>

        {/* Mode Switcher: Sign In vs Register */}
        <div className="mt-5 grid grid-cols-2 p-1 bg-violet-100/60 rounded-2xl border border-violet-200/60 text-xs font-bold text-slate-600">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`py-2 rounded-xl transition cursor-pointer ${
              mode === 'signin'
                ? 'bg-white text-violet-700 shadow-sm'
                : 'hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`py-2 rounded-xl transition cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-violet-700 shadow-sm'
                : 'hover:text-slate-900'
            }`}
          >
            Register (New User)
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="mt-4">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Select Your Role
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'citizen', label: 'Citizen / Survivor', icon: User },
              { id: 'counselor', label: 'Counselor / Expert', icon: Stethoscope },
              { id: 'admin', label: 'Administrator', icon: Building2 },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setRole(id)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border text-center transition cursor-pointer ${
                  role === id
                    ? 'border-violet-600 bg-violet-50/80 text-violet-800 shadow-xs ring-1 ring-violet-500'
                    : 'border-slate-200 hover:border-violet-200 bg-slate-50/50 text-slate-600'
                }`}
              >
                <Icon size={18} className={role === id ? 'text-violet-600' : 'text-slate-400'} />
                <span className="mt-1 text-[11px] font-bold leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Demo Pre-fill Pill Bar */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5">
          <span className="flex items-center gap-1 font-medium text-slate-600">
            <Sparkles size={13} className="text-violet-600" /> Demo Quick-Fill:
          </span>
          <div className="flex gap-1.5 font-bold">
            <button
              type="button"
              onClick={() => fillDemoData('citizen')}
              className="text-violet-700 hover:underline cursor-pointer"
            >
              Citizen
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => fillDemoData('counselor')}
              className="text-emerald-700 hover:underline cursor-pointer"
            >
              Counselor
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => fillDemoData('admin')}
              className="text-orange-700 hover:underline cursor-pointer"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">

          {/* ══════════════ 1. CITIZEN / VICTIM FIELDS ══════════════ */}
          {role === 'citizen' && (
            <>
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name (पूरा नाम)
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rameshwar Meghwal"
                      value={victimForm.full_name}
                      onChange={(e) => setVictimForm({ ...victimForm, full_name: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number (मोबाइल नंबर)
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={victimForm.phone_number}
                    onChange={(e) => setVictimForm({ ...victimForm, phone_number: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  NHAA / FIR Case ID (केस संख्या / यदि उपलब्ध हो)
                </label>
                <div className="relative">
                  <FileText size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required={mode === 'register'}
                    placeholder="e.g. NHAA/2026/RJ-ALW/0429"
                    value={victimForm.nhaa_case_id}
                    onChange={(e) => setVictimForm({ ...victimForm, nhaa_case_id: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
                  />
                </div>
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Language (पसंदीदा भाषा)
                  </label>
                  <div className="relative">
                    <Languages size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={victimForm.preferred_language}
                      onChange={(e) => setVictimForm({ ...victimForm, preferred_language: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
                    >
                      <option value="hi">हिन्दी (Hindi)</option>
                      <option value="en">English</option>
                      <option value="hinglish">Hinglish (Hindi-English)</option>
                      <option value="ta">தமிழ் (Tamil)</option>
                      <option value="mr">मराठी (Marathi)</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password (पासवर्ड)
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter confidential password"
                    value={victimForm.password}
                    onChange={(e) => setVictimForm({ ...victimForm, password: e.target.value })}
                    className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ══════════════ 2. COUNSELOR FIELDS ══════════════ */}
          {role === 'counselor' && (
            <>
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Counselor Full Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Anita Sharma"
                      value={counselorForm.full_name}
                      onChange={(e) => setCounselorForm({ ...counselorForm, full_name: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Institutional Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@counseling.gov.in"
                    value={counselorForm.email}
                    onChange={(e) => setCounselorForm({ ...counselorForm, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
                  />
                </div>
              </div>

              {mode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      District &amp; State Jurisdiction
                    </label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alwar, Rajasthan"
                        value={counselorForm.district}
                        onChange={(e) => setCounselorForm({ ...counselorForm, district: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Clinical Specialization (Optional)
                    </label>
                    <div className="relative">
                      <Stethoscope size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. Acute Trauma, SC/ST Legal Psychology"
                        value={counselorForm.specialization}
                        onChange={(e) => setCounselorForm({ ...counselorForm, specialization: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Counselor Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter password"
                    value={counselorForm.password}
                    onChange={(e) => setCounselorForm({ ...counselorForm, password: e.target.value })}
                    className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ══════════════ 3. ADMIN FIELDS ══════════════ */}
          {role === 'admin' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  District Officer / Admin Badge ID
                </label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. ADMIN-RJ-ALW-01"
                    value={adminForm.admin_id}
                    onChange={(e) => setAdminForm({ ...adminForm, admin_id: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Master Security Key
                </label>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="SEC-GOV-XXXX-XX"
                    value={adminForm.security_key}
                    onChange={(e) => setAdminForm({ ...adminForm, security_key: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
                  />
                </div>
              </div>
            </>
          )}

          {/* Success Message Banner */}
          {successMessage && (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Submit CTA Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-indigo-700 via-violet-600 to-fuchsia-600 text-white text-sm font-bold shadow-lg shadow-violet-300/60 hover:shadow-violet-400/80 transition active:scale-[0.99] disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>
                  {mode === 'signin'
                    ? `Sign In to ${role === 'citizen' ? 'Citizen Portal' : role === 'counselor' ? 'Counselor Desk' : 'Command Center'}`
                    : 'Complete Registration'}
                </span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* DPDP 2023 & Security Notice Footer */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-600" /> DPDP 2023 &amp; Zero-Knowledge Encrypted
          </span>
          <span>MoSJE • Government of India</span>
        </div>
      </div>
    </div>
  );
}
