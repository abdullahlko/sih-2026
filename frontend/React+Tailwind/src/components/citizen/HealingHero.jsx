import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { 
  ShieldCheck, 
  Headphones, 
  Scale, 
  Sparkles, 
  PhoneCall, 
  Lock, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';

export default function HealingHero() {
  const { language } = useSimulation();

  const getGreeting = () => {
    switch (language) {
      case 'hi':
        return {
          title: 'नमस्ते • आपकी सुरक्षा और मानसिक शांति हमारी प्राथमिकता है',
          subtitle: 'अनुसूचित जाति और जनजाति अत्याचार निवारण अधिनियम के तहत जांच एवं विचारण के दौरान गोपनीय एवं निरंतर मनोवैज्ञानिक सहायता।'
        };
      case 'hinglish':
        return {
          title: 'Namaste • Aapki mental peace aur safety hamari top priority hai',
          subtitle: 'SC/ST PoA Act cases ke dauran confidential, 24x7 psychological support aur direct legal assistance.'
        };
      case 'ta':
        return {
          title: 'வணக்கம் • உங்கள் நல்வாழ்வு எங்களின் முன்னுரிமை',
          subtitle: 'SC/ST வன்கொடுமை தடுப்புச் சட்டத்தின் கீழ் ரகசிய மற்றும் உடனடி உளவியல் ஆதரவு.'
        };
      case 'mr':
        return {
          title: 'नमस्ते • तुमचे मानसिक आरोग्य आणि सुरक्षितता आमचे प्राधान्य आहे',
          subtitle: 'SC/ST अत्याचार प्रतिबंधक कायद्यांतर्गत चौकशी दरम्यान गोपनीय आणि त्वरित मानसिक आधार.'
        };
      case 'en':
      default:
        return {
          title: 'Namaste • Your well-being is our priority',
          subtitle: 'Confidential, AI-assisted psychological relief & immediate trauma support for SC/ST citizens during legal proceedings & trial cycles.'
        };
    }
  };

  const text = getGreeting();

  return (
    <section aria-label="Welcome and Protection Gateway" className="space-y-4">
      {/* Main Healing Card with Lavender-Indigo Mesh Gradient */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-900 via-indigo-800 to-purple-950 text-white p-6 sm:p-8 shadow-xl border border-indigo-700/40">
        
        {/* Ambient Mesh Glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-400/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 -mb-20 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full bg-pink-500/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            
            {/* Top Institutional Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-100 text-xs font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>MoSJE • Samvedna 24x7 Trauma & Distress Companion</span>
            </div>

            {/* Main Greeting */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold tracking-tight text-white leading-tight">
              {text.title}
            </h1>

            {/* Empathetic Subtext */}
            <p className="text-sm sm:text-base text-indigo-100/90 leading-relaxed font-normal">
              {text.subtitle}
            </p>

            {/* Trust assurance tag */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-indigo-200">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> End-to-End Encrypted & Anonymous
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Vernacular Audio & Text AI
              </span>
            </div>
          </div>

          {/* Quick SOS Card */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center min-w-55 shadow-lg">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-200">
                National SC/ST Toll-Free Helpline
              </div>
              <a 
                href="tel:14566" 
                className="mt-1 inline-flex items-center justify-center gap-2 text-xl font-bold font-mono text-white hover:text-emerald-300 transition-colors"
              >
                <PhoneCall className="w-5 h-5 text-emerald-400 animate-bounce" />
                14566 / 1800-599-0019
              </a>
              <div className="mt-1 text-[11px] text-emerald-300 font-semibold flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Immediate Live Counselor Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Mini-Feature Cards Underneath */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* 1. Fully Confidential */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-indigo-100 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all group">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-105 transition-transform">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold font-heading text-slate-900 flex items-center gap-1.5">
                Fully Confidential
                <span className="text-[10px] font-normal px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700">Sec 43A</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your conversations, voice notes, and emotional status are protected with zero-knowledge clinical privacy standards.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Always Listening */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-indigo-100 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all group">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0 group-hover:scale-105 transition-transform">
              <Headphones className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold font-heading text-slate-900 flex items-center gap-1.5">
                Always Listening
                <span className="text-[10px] font-normal px-1.5 py-0.2 rounded bg-purple-50 text-purple-700">24x7 AI</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Express yourself naturally in Hindi, Hinglish, or regional dialects via text or voice without fear or judgment.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Direct Magistrate Link */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-indigo-100 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all group">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 transition-transform">
              <Scale className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold font-heading text-slate-900 flex items-center gap-1.5">
                Direct Magistrate Link
                <span className="text-[10px] font-normal px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700">DLSA / Court</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated legal escort and emergency intimidation alerts connected straight to District Nodal Officers and Legal Aid.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
