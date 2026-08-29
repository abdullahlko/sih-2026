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
  CheckCircle2,
  ArrowUpRight
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
      {/* Main Claymorphic Healing Card with Rich Lavender-Indigo Mesh Gradient */}
      <div className="clay-card-hero relative overflow-hidden p-6 sm:p-9 text-white transition-all duration-300">
        
        {/* Floating Ambient Mesh Glows */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-88 h-88 rounded-full bg-purple-300/25 blur-3xl pointer-events-none animate-float-slow"></div>
        <div className="absolute bottom-0 left-10 -mb-20 w-80 h-80 rounded-full bg-indigo-300/20 blur-3xl pointer-events-none animate-float-reverse"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-pink-400/15 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-7">
          <div className="space-y-3.5 max-w-2xl">
            
            {/* Top Institutional Badge with Claymorphic Glow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-purple-100 text-xs font-bold shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>MoSJE • Samvedna 24x7 Trauma & Distress Companion</span>
            </div>

            {/* Main Greeting */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold tracking-tight text-white leading-tight">
              {text.title}
            </h1>

            {/* Empathetic Subtext */}
            <p className="text-sm sm:text-base text-purple-100/95 leading-relaxed font-normal">
              {text.subtitle}
            </p>

            {/* Trust assurance tag */}
            <div className="flex flex-wrap items-center gap-4 pt-1.5 text-xs text-purple-100/90 font-semibold">
              <span className="flex items-center gap-1.5 bg-black/15 px-3 py-1 rounded-full border border-white/15">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" /> End-to-End Encrypted & Anonymous
              </span>
              <span className="flex items-center gap-1.5 bg-black/15 px-3 py-1 rounded-full border border-white/15">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Vernacular Audio & Text AI
              </span>
            </div>
          </div>

          {/* Quick SOS Helpline Clay Card */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <div className="p-5 rounded-3xl bg-white/15 backdrop-blur-xl border border-white/30 text-center min-w-64 shadow-2xl shadow-purple-950/30 transition-transform duration-200 hover:scale-[1.02]">
              <div className="text-[11px] font-bold uppercase tracking-wider text-purple-200 font-mono">
                National SC/ST Toll-Free Helpline
              </div>
              <a 
                href="tel:14566" 
                className="mt-2 inline-flex items-center justify-center gap-2.5 text-2xl font-black font-mono text-white hover:text-emerald-300 transition-colors"
              >
                <PhoneCall className="w-6 h-6 text-emerald-400 animate-bounce" />
                14566 / 1800-599-0019
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Tactile Lavender Clay Mini-Feature Cards Underneath */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        
        {/* 1. Fully Confidential */}
        <div className="clay-card p-5 hover:-translate-y-1 transition-all group">
          <div className="flex items-start gap-4">
            <div className="clay-icon w-11 h-11 bg-linear-to-tr from-purple-100 to-indigo-100 border border-purple-200 flex items-center justify-center text-[#6342eb] shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold font-heading text-slate-900 flex items-center gap-2">
                Fully Confidential
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#6342eb] border border-purple-200">
                  Sec 43A
                </span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Your conversations, voice notes and emotional status are protected with zero-knowledge clinical privacy standards.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Always Listening */}
        <div className="clay-card p-5 hover:-translate-y-1 transition-all group">
          <div className="flex items-start gap-4">
            <div className="clay-icon w-11 h-11 bg-linear-to-tr from-purple-100 to-pink-100 border border-purple-200 flex items-center justify-center text-[#704fe6] shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold font-heading text-slate-900 flex items-center gap-2">
                Always Listening
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#704fe6] border border-purple-200">
                  24x7 AI
                </span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Express yourself naturally in Hindi, Hinglish or regional dialects via text or voice without fear or judgment.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Direct Magistrate Link */}
        <div className="clay-card p-5 hover:-translate-y-1 transition-all group">
          <div className="flex items-start gap-4">
            <div className="clay-icon w-11 h-11 bg-linear-to-tr from-emerald-100 to-teal-100 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold font-heading text-slate-900 flex items-center gap-2">
                Direct Magistrate Link
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  DLSA / Court
                </span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Automated legal escort and emergency intimidation alerts connected straight to District Nodal Officers and Legal Aid.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
