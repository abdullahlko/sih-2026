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
    <div className="clay-card-dark p-6 sm:p-7 space-y-5 text-white">
      
      {/* Console Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-purple-900/60">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-purple-900 to-indigo-900 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-sm">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold font-heading text-white">
                IVRS & SMS Fallback Ingestion Console
              </h3>
            </div>
            <p className="text-xs text-purple-200/70 mt-0.5">
              Processes distress signals from rural victims without smartphones or active internet connections.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 font-mono text-xs bg-black/30 px-3 py-1.5 rounded-full border border-purple-900/60">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-bold">TELEPHONY STACK LIVE</span>
        </div>
      </div>

      {/* Live Flash Ticker Banner when new SMS simulated */}
      {isFlashing && (
        <div className="p-3.5 rounded-2xl bg-linear-to-r from-rose-600 to-purple-600 text-white text-xs font-mono font-bold flex items-center gap-2.5 shadow-xl animate-spring-pop">
          <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="truncate">{flashMessage}</span>
          <span className="ml-auto text-[10px] bg-black/40 px-2.5 py-0.5 rounded-full">LATENCY: 42ms</span>
        </div>
      )}

      {/* Interactive SMS Simulator Deck with Clay Styling */}
      <div className="p-4.5 rounded-3xl bg-linear-to-br from-[#1c133a] to-[#110a26] border border-purple-900/60 space-y-3 shadow-md">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-purple-200 flex items-center gap-2 font-heading">
            <Smartphone className="w-4 h-4 text-[#8c65ff]" />
            <span>Interactive SMS Intake Simulator</span>
          </span>
        </div>

        <form onSubmit={handleSimulateSms} className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={smsInput}
            onChange={(e) => setSmsInput(e.target.value)}
            placeholder="Enter victim SMS text (e.g. Gunde court ke bahar dhamki de rahe hain)..."
            className="flex-1 px-4 py-2.5 rounded-2xl bg-[#0e071e] border border-purple-800/80 text-xs text-white placeholder:text-purple-400/60 focus:outline-none focus:ring-2 focus:ring-[#704fe6] font-mono shadow-inner"
          />

          <button
            type="submit"
            className="clay-btn clay-btn-primary px-5 py-2.5 text-white text-xs font-bold font-mono flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Inbound SMS Link</span>
          </button>
        </form>
      </div>

      {/* Terminal Telephony Feed */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs text-purple-300 font-mono">
          <span>REAL-TIME INBOUND TELEPHONY LOGS</span>
        </div>

        <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
          {logs.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-[#1a1236]/90 border border-purple-900/60 hover:border-purple-600 transition-all text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                    {item.channel}
                  </span>
                  <span className="text-purple-100 font-semibold">{item.sender}</span>
                  <span className="text-purple-400">({item.district})</span>
                </div>

                <div className="text-purple-100">
                  <span className="text-purple-400">Raw:</span> "{item.rawText}"
                </div>

                <div className="text-purple-300 text-[11px]">
                  → {item.nlpParsed}
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-purple-900/60">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  item.threatScore > 75 ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-emerald-950 text-emerald-300'
                }`}>
                  Distress: {item.threatScore}%
                </span>
                <span className="text-[10px] text-purple-400">{item.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
