import React, { useState, useEffect } from 'react';
import { useSimulation, SIMULATION_STATES } from '../../context/SimulationContext';
import { 
  Mic, 
  MicOff, 
  Activity, 
  Volume2, 
  AlertTriangle, 
  ShieldCheck, 
  PhoneCall, 
  Sparkles, 
  Zap,
  CheckCircle2,
  RefreshCw,
  Radio,
  FileAudio
} from 'lucide-react';

export default function AcousticPanicHook() {
  const { simulationState, statePayload } = useSimulation();
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Sync with global simulationState
  useEffect(() => {
    if (simulationState === SIMULATION_STATES.CRITICAL_VOICE) {
      setIsRecording(true);
      setShowAnalysis(true);
      setRecordSeconds(6);
    } else if (simulationState === SIMULATION_STATES.CRITICAL_TEXT) {
      setIsRecording(false);
      setShowAnalysis(false);
    } else {
      setIsRecording(false);
      setShowAnalysis(false);
      setRecordSeconds(0);
    }
  }, [simulationState]);

  // Handle Recording Timer
  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setShowAnalysis(true);
    } else {
      // Start recording
      setShowAnalysis(false);
      setRecordSeconds(0);
      setIsRecording(true);
    }
  };

  const isCritical = simulationState === SIMULATION_STATES.CRITICAL_VOICE || (showAnalysis && statePayload.distressScore > 70);

  return (
    <div className="rounded-3xl bg-white border border-indigo-100 shadow-md p-5 sm:p-6 space-y-5 transition-all">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-200 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-heading font-bold text-slate-900">
                Acoustic Distress & Vocal Tremor Analyzer
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Extracts micro-tremors and vocal cord tension for early trauma detection.
            </p>
          </div>
        </div>

        {showAnalysis && (
          <button
            onClick={() => {
              setShowAnalysis(false);
              setIsRecording(false);
              setRecordSeconds(0);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Reset Voice Analysis"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Interactive Microphone & Waveform Deck */}
      <div className={`p-6 rounded-2xl text-center transition-all duration-300 ${
        isRecording 
          ? 'bg-linear-to-b from-purple-950 via-indigo-950 to-slate-900 text-white shadow-inner' 
          : showAnalysis
            ? 'bg-slate-900 text-white'
            : 'bg-linear-to-b from-indigo-50/50 to-slate-50 border border-indigo-100/60'
      }`}>
        
        {/* Large Pulse Button */}
        <div className="relative inline-flex items-center justify-center mb-4">
          {/* Animated glow aura when recording */}
          {isRecording && (
            <>
              <span className="animate-ping absolute inline-flex h-24 w-24 rounded-full bg-purple-500 opacity-40"></span>
              <span className="animate-pulse absolute inline-flex h-20 w-20 rounded-full bg-rose-500 opacity-30"></span>
            </>
          )}

          <button
            id="acoustic-mic-record-btn"
            onClick={toggleRecording}
            className={`relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center text-white shadow-lg transition-transform active:scale-95 cursor-pointer ${
              isRecording
                ? 'bg-linear-to-tr from-rose-600 to-purple-600 ring-4 ring-purple-400/40 shadow-rose-500/50'
                : 'bg-linear-to-tr from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 shadow-indigo-500/30'
            }`}
          >
            {isRecording ? (
              <MicOff className="w-7 h-7 sm:w-8 sm:h-8 animate-pulse" />
            ) : (
              <Mic className="w-7 h-7 sm:w-8 sm:h-8" />
            )}
          </button>
        </div>

        {/* Recording Status & Waveform */}
        {isRecording ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 font-mono text-sm font-bold text-rose-300">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              <span>LIVE AUDIO ANALYSIS IN PROGRESS • 00:0{recordSeconds}s</span>
            </div>

            <p className="text-xs text-indigo-200 max-w-sm mx-auto">
              Please speak freely: "Hum darre hue hain, kripya sahayata bhejein..."
            </p>

            {/* Live SVG Dancing Audio Waves */}
            <div className="flex items-center justify-center gap-1.5 h-12 pt-2 px-4">
              {[40, 75, 95, 30, 85, 60, 100, 45, 90, 70, 35, 80, 65, 95, 50, 85, 30, 70].map((h, i) => (
                <span
                  key={i}
                  className="w-1.5 rounded-full bg-linear-to-t from-purple-400 to-rose-400 transition-all duration-150 animate-pulse"
                  style={{
                    height: `${Math.max(12, (h * (recordSeconds % 3 + 1)) % 44 + 8)}px`,
                    animationDelay: `${(i * 0.08).toFixed(2)}s`
                  }}
                />
              ))}
            </div>

            <button
              onClick={toggleRecording}
              className="mt-3 px-4 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-md transition-colors"
            >
              Click to Stop & Generate Vocal Signature
            </button>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="text-sm font-bold text-slate-800">
              {showAnalysis ? 'Acoustic Signature Analyzed' : 'Tap Microphone to Speak / Record Voice Note'}
            </div>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              {showAnalysis 
                ? 'Biometric features mapped from audio stream below.' 
                : 'Supports any dialect. Our AI will analyze emotional tremor & panic markers.'}
            </p>
          </div>
        )}

      </div>

      {/* The Highlight Wow: Vocal Stress Signature Card */}
      {(showAnalysis || simulationState === SIMULATION_STATES.CRITICAL_VOICE) && (
        <div className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 space-y-4 ${
          isCritical
            ? 'bg-purple-950/90 border-purple-500/50 text-white shadow-lg ring-1 ring-purple-400/30'
            : 'bg-indigo-50/70 border-indigo-200 text-slate-800'
        }`}>
          
          {/* Card Top Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${isCritical ? 'bg-purple-800 text-purple-200' : 'bg-indigo-600 text-white'}`}>
                <FileAudio className="w-4 h-4" />
              </div>
              <div>
                <h3 className={`text-xs sm:text-sm font-bold font-heading ${isCritical ? 'text-white' : 'text-slate-900'}`}>
                  Vocal Stress Signature (Audio Ingestion Result)
                </h3>
              </div>
            </div>

            <div className={`text-xs font-bold font-mono px-2.5 py-1 rounded-full ${
              isCritical ? 'bg-rose-500/30 text-rose-300 border border-rose-400/40 animate-pulse' : 'bg-emerald-50 text-emerald-700'
            }`}>
              {isCritical ? '🚨 CRITICAL STRESS' : '✅ STABLE SIGNATURE'}
            </div>
          </div>

          {/* 4 Quantitative Vocal Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            
            {/* Metric 1: Voice Jitter */}
            <div className={`p-3 rounded-xl border text-center ${
              isCritical ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-slate-200'
            }`}>
              <div className={`text-[10px] font-medium ${isCritical ? 'text-slate-400' : 'text-slate-500'}`}>Voice Jitter</div>
              <div className={`text-sm sm:text-base font-bold font-mono mt-0.5 ${isCritical ? 'text-rose-400' : 'text-slate-800'}`}>
                {isCritical ? '4.8% - 8.7%' : '0.42%'}
              </div>
              <div className={`text-[9px] font-semibold mt-0.5 ${isCritical ? 'text-rose-400' : 'text-emerald-600'}`}>
                {isCritical ? 'High Tension' : 'Normal'}
              </div>
            </div>

            {/* Metric 2: Voice Shimmer */}
            <div className={`p-3 rounded-xl border text-center ${
              isCritical ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-slate-200'
            }`}>
              <div className={`text-[10px] font-medium ${isCritical ? 'text-slate-400' : 'text-slate-500'}`}>Voice Shimmer</div>
              <div className={`text-sm sm:text-base font-bold font-mono mt-0.5 ${isCritical ? 'text-amber-400' : 'text-slate-800'}`}>
                {isCritical ? '9.2% - 15.4%' : '1.18%'}
              </div>
              <div className={`text-[9px] font-semibold mt-0.5 ${isCritical ? 'text-amber-400' : 'text-emerald-600'}`}>
                {isCritical ? 'Physiological Tremor' : 'Stable Amp'}
              </div>
            </div>

            {/* Metric 3: Dominant Emotion */}
            <div className={`p-3 rounded-xl border text-center ${
              isCritical ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-slate-200'
            }`}>
              <div className={`text-[10px] font-medium ${isCritical ? 'text-slate-400' : 'text-slate-500'}`}>Dominant Emotion</div>
              <div className={`text-xs sm:text-sm font-bold mt-0.5 ${isCritical ? 'text-purple-300' : 'text-slate-800'}`}>
                {isCritical ? 'Acute Panic / Grief' : 'Calm / Composed'}
              </div>
              <div className={`text-[9px] font-mono mt-0.5 ${isCritical ? 'text-purple-400' : 'text-slate-400'}`}>
                {isCritical ? 'Conf: 96.4%' : 'Conf: 98.1%'}
              </div>
            </div>

            {/* Metric 4: Vocal Tract Stress Score */}
            <div className={`p-3 rounded-xl border text-center ${
              isCritical ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-slate-200'
            }`}>
              <div className={`text-[10px] font-medium ${isCritical ? 'text-slate-400' : 'text-slate-500'}`}>Stress Score</div>
              <div className={`text-sm sm:text-base font-bold font-mono mt-0.5 ${isCritical ? 'text-rose-400' : 'text-emerald-600'}`}>
                {isCritical ? '84 - 94/100' : '18/100'}
              </div>
              <div className={`text-[9px] font-semibold mt-0.5 ${isCritical ? 'text-rose-400' : 'text-emerald-600'}`}>
                {isCritical ? 'Intervention Alert' : 'Healthy Range'}
              </div>
            </div>

          </div>

          {/* Action Trigger Banner */}
          {isCritical && (
            <div className="p-3 rounded-xl bg-purple-900/80 border border-purple-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Automatic Dispatch: <strong>Special Atrocities Cell & Dr. Anita Sharma</strong> notified with vocal spectrogram.
                </span>
              </div>
              <button 
                onClick={() => alert("Connecting to National Helpline 14566 / Tele-Counselor...")}
                className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-colors shrink-0 flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-white animate-bounce" />
                <span>Connect Helpline (14566)</span>
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
