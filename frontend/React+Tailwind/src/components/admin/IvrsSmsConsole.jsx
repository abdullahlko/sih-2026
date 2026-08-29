import React, { useState } from 'react';
import { 
  Terminal, 
  MessageSquare, 
  PhoneCall, 
  Radio, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2,
  AlertTriangle,
  Zap,
  RefreshCw,
  Smartphone
} from 'lucide-react';

const INITIAL_LOGS = [
  {
    id: 'log-1',
    channel: 'GSM SMS GATEWAY',
    sender: '+91 98290 XXXXX',
    district: 'Alwar',
    rawText: 'Gunde court ke bahar dhamki de rahe hain',
    nlpParsed: 'Threat: Physical Intimidation near Special Court',
    threatScore: 92,
    timestamp: '19:42:10',
    status: 'ESCALATED'
  },
  {
    id: 'log-2',
    channel: 'IVRS TOLL-FREE (14566)',
    sender: '+91 94140 XXXXX',
    district: 'Udaipur',
    rawText: '[Voice Stream Transcribed]: "Humare ghar pe pathrav hua hai"',
    nlpParsed: 'Acoustic Jitter: 8.7% (Extreme Panic SOS)',
    threatScore: 94,
    timestamp: '19:38:45',
    status: 'PCR DISPATCHED'
  },
  {
    id: 'log-3',
    channel: 'OFFLINE USSD PUSH',
    sender: '+91 97840 XXXXX',
    district: 'Bharatpur',
    rawText: 'Menu Option 2 -> Legal Aid Request (Witness Hostility)',
    nlpParsed: 'Witness Intimidation Flagged',
    threatScore: 68,
    timestamp: '19:25:30',
    status: 'DLSA NOTIFIED'
  }
];

export default function IvrsSmsConsole() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [smsInput, setSmsInput] = useState('Gunde court ke bahar dhamki de rahe hain');
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);

  const handleSimulateSms = (e) => {
    e?.preventDefault();
    if (!smsInput.trim()) return;

    const newLog = {
      id: `log-${Date.now()}`,
      channel: 'GSM SMS (FEATURE PHONE / NO INTERNET)',
      sender: '+91 98291 ' + Math.floor(10000 + Math.random() * 90000),
      district: 'Alwar Special Court Zone',
      rawText: smsInput,
      nlpParsed: `Swaraj-NLP: High Threat Vector Flagged ("${smsInput}")`,
      threatScore: 89,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      status: 'REAL-TIME INGESTION'
    };

    setLogs((prev) => [newLog, ...prev]);
    setIsFlashing(true);
    setFlashMessage(`🚨 LIVE INBOUND SMS RECEIVED FROM FEATURE PHONE: "${smsInput}"`);

    setTimeout(() => {
      setIsFlashing(false);
    }, 4000);
  };

  return (
    <div className="rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl p-5 sm:p-6 space-y-5">
      
      {/* Console Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-900/60 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold font-heading text-white">
                IVRS & SMS Fallback Ingestion Console
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Processes distress signals from rural victims without smartphones or active internet connections.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-bold">TELEPHONY STACK LIVE</span>
        </div>
      </div>

      {/* Live Flash Ticker Banner when new SMS simulated */}
      {isFlashing && (
        <div className="p-3 rounded-2xl bg-rose-600 text-white text-xs font-mono font-bold flex items-center gap-2 shadow-lg animate-bounce">
          <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="truncate">{flashMessage}</span>
          <span className="ml-auto text-[10px] bg-black/30 px-2 py-0.5 rounded">LATENCY: 42ms</span>
        </div>
      )}

      {/* Interactive SMS Simulator Deck */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-indigo-900/40 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-indigo-300 flex items-center gap-1.5 font-heading">
            <Smartphone className="w-4 h-4 text-indigo-400" />
            <span>Interactive SMS Intake Simulator</span>
          </span>
        </div>

        <form onSubmit={handleSimulateSms} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={smsInput}
            onChange={(e) => setSmsInput(e.target.value)}
            placeholder="Enter victim SMS text (e.g. Gunde court ke bahar dhamki de rahe hain)..."
            className="flex-1 px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
          />

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold font-mono flex items-center justify-center gap-1.5 shadow-md shadow-indigo-900/30 transition-all cursor-pointer shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Inbound SMS Link</span>
          </button>
        </form>
      </div>

      {/* Terminal Telephony Feed */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>REAL-TIME INBOUND TELEPHONY LOGS</span>
        </div>

        <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
          {logs.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/80">
                    {item.channel}
                  </span>
                  <span className="text-slate-300 font-semibold">{item.sender}</span>
                  <span className="text-slate-500">({item.district})</span>
                </div>

                <div className="text-slate-200">
                  <span className="text-slate-400">Raw:</span> "{item.rawText}"
                </div>

                <div className="text-indigo-300 text-[11px]">
                  → {item.nlpParsed}
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  item.threatScore > 75 ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-emerald-950 text-emerald-300'
                }`}>
                  Distress: {item.threatScore}%
                </span>
                <span className="text-[10px] text-slate-500">{item.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
