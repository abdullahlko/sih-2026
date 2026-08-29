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
  Scale
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
    <div className="rounded-3xl bg-white border border-indigo-100 shadow-md p-6 space-y-5">
      
      {/* Panel Header */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 shrink-0">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold font-heading text-slate-900">
                Nyaya-AI Cognitive Explanation
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Transparent feature attributions indicating root drivers behind distress elevation.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Contributing Factor Bars */}
      <div className="space-y-4">
        
        {/* Factor 1: Linguistic Sentiment Score */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-bold text-slate-800">
              <MessageSquareWarning className="w-4 h-4 text-rose-500" />
              <span>Linguistic Sentiment Score</span>
            </span>
            <span className="font-mono font-bold text-slate-900">
              {linguisticScore}% <span className="text-[10px] text-slate-400 font-normal">(Weight: 0.42)</span>
            </span>
          </div>
          
          <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                linguisticScore > 70 ? 'bg-linear-to-r from-amber-500 to-rose-600' : 'bg-emerald-500'
              }`}
              style={{ width: `${linguisticScore}%` }}
            />
          </div>

          <div className="text-[11px] text-slate-500 flex items-center justify-between">
            <span>
              {linguisticScore > 70 
                ? 'Active threats detected in vernacular text ("dhamki", "darr", "helpless")' 
                : 'Sentiment neutral; standard routine check-in language.'}
            </span>
            <span className={linguisticScore > 70 ? 'text-rose-600 font-bold' : 'text-emerald-600'}>
              {linguisticScore > 70 ? 'Severe Threat Vector' : 'Normal'}
            </span>
          </div>
        </div>

        {/* Factor 2: Acoustic Stress Score */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-bold text-slate-800">
              <Mic className="w-4 h-4 text-purple-500" />
              <span>Acoustic Stress Score</span>
            </span>
            <span className="font-mono font-bold text-slate-900">
              {acousticScore}% <span className="text-[10px] text-slate-400 font-normal">(Weight: 0.38)</span>
            </span>
          </div>
          
          <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                acousticScore > 70 ? 'bg-linear-to-r from-purple-500 to-rose-600' : 'bg-emerald-500'
              }`}
              style={{ width: `${acousticScore}%` }}
            />
          </div>

          <div className="text-[11px] text-slate-500 flex items-center justify-between">
            <span>
              {acousticScore > 70 
                ? 'Voice vibration / pitch tremors under intimidation (Jitter: 4.8% - 8.7%)' 
                : 'Steady fundamental frequency; standard prosody.'}
            </span>
            <span className={acousticScore > 70 ? 'text-purple-600 font-bold' : 'text-emerald-600'}>
              {acousticScore > 70 ? 'High Vocal Perturbation' : 'Normal'}
            </span>
          </div>
        </div>

        {/* Factor 3: Engagement Pattern Latency */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-bold text-slate-800">
              <Timer className="w-4 h-4 text-amber-500" />
              <span>Engagement Pattern Latency</span>
            </span>
            <span className="font-mono font-bold text-slate-900">
              {engagementScore}% <span className="text-[10px] text-slate-400 font-normal">(Weight: 0.20)</span>
            </span>
          </div>
          
          <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                engagementScore > 70 ? 'bg-linear-to-r from-amber-400 to-amber-600' : 'bg-emerald-500'
              }`}
              style={{ width: `${engagementScore}%` }}
            />
          </div>

          <div className="text-[11px] text-slate-500 flex items-center justify-between">
            <span>
              {engagementScore > 70 
                ? 'Delayed responses / erratic login cycles; social isolation signs detected' 
                : 'Consistent check-in frequency.'}
            </span>
            <span className={engagementScore > 70 ? 'text-amber-600 font-bold' : 'text-emerald-600'}>
              {engagementScore > 70 ? 'Isolation Anomaly' : 'Active Engagement'}
            </span>
          </div>
        </div>

      </div>

      {/* Flagged Evidence Tokens Box */}
      {isCritical && (
        <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-2 border border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-indigo-300 font-bold flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              Flagged Corpus Evidence:
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Sec 15A Trigger</span>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2 py-1 rounded bg-rose-950/80 text-rose-300 border border-rose-800">
              "court ke log dhamki de rahe hain"
            </span>
            <span className="px-2 py-1 rounded bg-rose-950/80 text-rose-300 border border-rose-800">
              "pathrav hua hai"
            </span>
            <span className="px-2 py-1 rounded bg-amber-950/80 text-amber-300 border border-amber-800">
              "ghar se nikalne nahi de rahe"
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
