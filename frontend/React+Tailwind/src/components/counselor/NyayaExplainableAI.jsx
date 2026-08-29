import React from 'react';
import { useSimulation, SIMULATION_STATES } from '../../context/SimulationContext';
import { 
  BrainCircuit, 
  MessageSquareWarning, 
  Mic, 
  Timer, 
  ShieldCheck, 
  FileText,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Scale,
  Sparkles
} from 'lucide-react';

export default function NyayaExplainableAI({ victimData }) {
  const { simulationState, statePayload } = useSimulation();
  const isSimulatedVictim = victimData?.id === 'CASE-01' || victimData?.id === 'CASE-02';
  const isCritical = isSimulatedVictim ? simulationState !== SIMULATION_STATES.SAFE : (victimData?.baseDistress >= 75);

  // Dynamic factor values based on state
  const linguisticScore = isCritical 
    ? (simulationState === SIMULATION_STATES.CRITICAL_TEXT ? 91 : 76) 
    : 14;
  
  const acousticScore = isCritical 
    ? (simulationState === SIMULATION_STATES.CRITICAL_VOICE ? 94 : 84) 
    : 22;

  const engagementScore = isCritical ? 78 : 18;

  return (
    <div className="clay-card p-6 sm:p-7 space-y-5">
      
      {/* Panel Header */}
      <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-purple-100">
        <div className="flex items-center gap-3.5">
          <div className="clay-icon w-11 h-11 bg-linear-to-tr from-[#6342eb] to-[#8c65ff] flex items-center justify-center text-white shrink-0">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold font-heading text-slate-900">
                Nyaya-AI Cognitive Explanation
              </h3>
            </div>
            <p className="text-xs text-purple-900/70 mt-0.5">
              Transparent feature attributions indicating root drivers behind distress elevation.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Contributing Factor Bars with Clay Progress Styling */}
      <div className="space-y-4.5">
        
        {/* Factor 1: Linguistic Sentiment Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 font-bold text-slate-800">
              <MessageSquareWarning className="w-4 h-4 text-rose-500" />
              <span>Linguistic Sentiment Score</span>
            </span>
            <span className="font-mono font-extrabold text-slate-900 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
              {linguisticScore}% <span className="text-[10px] text-purple-400 font-normal">(Weight: 0.42)</span>
            </span>
          </div>
          
          <div className="w-full h-3.5 rounded-full bg-[#ede8fc] p-0.5 shadow-inner">
            <div 
              className={`h-full rounded-full transition-all duration-700 ease-out shadow-xs ${
                linguisticScore > 70 
                  ? 'bg-linear-to-r from-amber-400 to-rose-500 shadow-rose-500/30' 
                  : 'bg-linear-to-r from-emerald-400 to-teal-500'
              }`}
              style={{ width: `${linguisticScore}%` }}
            />
          </div>

          <div className="text-[11px] text-slate-600 flex items-center justify-between">
            <span>
              {linguisticScore > 70 
                ? 'Active threats detected in vernacular text ("dhamki", "darr", "helpless")' 
                : 'Sentiment neutral; standard routine check-in language.'}
            </span>
            <span className={`font-bold ${linguisticScore > 70 ? 'text-rose-600' : 'text-emerald-600'}`}>
              {linguisticScore > 70 ? 'Severe Threat Vector' : 'Normal'}
            </span>
          </div>
        </div>

        {/* Factor 2: Acoustic Stress Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 font-bold text-slate-800">
              <Mic className="w-4 h-4 text-[#704fe6]" />
              <span>Acoustic Stress Score</span>
            </span>
            <span className="font-mono font-extrabold text-slate-900 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
              {acousticScore}% <span className="text-[10px] text-purple-400 font-normal">(Weight: 0.38)</span>
            </span>
          </div>
          
          <div className="w-full h-3.5 rounded-full bg-[#ede8fc] p-0.5 shadow-inner">
            <div 
              className={`h-full rounded-full transition-all duration-700 ease-out shadow-xs ${
                acousticScore > 70 
                  ? 'bg-linear-to-r from-[#8c65ff] to-rose-500 shadow-purple-500/30' 
                  : 'bg-linear-to-r from-emerald-400 to-teal-500'
              }`}
              style={{ width: `${acousticScore}%` }}
            />
          </div>

          <div className="text-[11px] text-slate-600 flex items-center justify-between">
            <span>
              {acousticScore > 70 
                ? 'Voice vibration / pitch tremors under intimidation (Jitter: 4.8% - 8.7%)' 
                : 'Steady fundamental frequency; standard prosody.'}
            </span>
            <span className={`font-bold ${acousticScore > 70 ? 'text-[#704fe6]' : 'text-emerald-600'}`}>
              {acousticScore > 70 ? 'High Vocal Perturbation' : 'Normal'}
            </span>
          </div>
        </div>

        {/* Factor 3: Engagement Pattern Latency */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 font-bold text-slate-800">
              <Timer className="w-4 h-4 text-amber-500" />
              <span>Engagement Pattern Latency</span>
            </span>
            <span className="font-mono font-extrabold text-slate-900 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
              {engagementScore}% <span className="text-[10px] text-purple-400 font-normal">(Weight: 0.20)</span>
            </span>
          </div>
          
          <div className="w-full h-3.5 rounded-full bg-[#ede8fc] p-0.5 shadow-inner">
            <div 
              className={`h-full rounded-full transition-all duration-700 ease-out shadow-xs ${
                engagementScore > 70 
                  ? 'bg-linear-to-r from-amber-400 to-amber-600' 
                  : 'bg-linear-to-r from-emerald-400 to-teal-500'
              }`}
              style={{ width: `${engagementScore}%` }}
            />
          </div>

          <div className="text-[11px] text-slate-600 flex items-center justify-between">
            <span>
              {engagementScore > 70 
                ? 'Delayed responses / erratic login cycles; social isolation signs detected' 
                : 'Consistent check-in frequency.'}
            </span>
            <span className={`font-bold ${engagementScore > 70 ? 'text-amber-600' : 'text-emerald-600'}`}>
              {engagementScore > 70 ? 'Isolation Anomaly' : 'Active Engagement'}
            </span>
          </div>
        </div>

      </div>

      {/* Flagged Evidence Tokens Box */}
      {isCritical && (
        <div className="p-4 rounded-2xl bg-linear-to-br from-[#1b1436] to-[#120c26] text-white space-y-2.5 border border-purple-900/60 shadow-md">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-purple-200 font-bold flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-300" />
              Flagged Corpus Evidence:
            </span>
            <span className="text-[10px] text-purple-300 font-mono bg-purple-900/80 px-2 py-0.5 rounded-full border border-purple-700">Sec 15A Trigger</span>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-3 py-1 rounded-xl bg-rose-950/90 text-rose-200 border border-rose-800 shadow-2xs">
              "court ke log dhamki de rahe hain"
            </span>
            <span className="px-3 py-1 rounded-xl bg-rose-950/90 text-rose-200 border border-rose-800 shadow-2xs">
              "pathrav hua hai"
            </span>
            <span className="px-3 py-1 rounded-xl bg-amber-950/90 text-amber-200 border border-amber-800 shadow-2xs">
              "ghar se nikalne nahi de rahe"
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
