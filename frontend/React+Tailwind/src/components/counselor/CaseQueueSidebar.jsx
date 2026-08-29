import React from 'react';
import { useSimulation, SIMULATION_STATES } from '../../context/SimulationContext';
import { 
  Search, 
  Filter, 
  AlertCircle, 
  Clock, 
  ShieldAlert, 
  User, 
  ChevronRight,
  Activity,
  HeartPulse
} from 'lucide-react';

export const MOCK_CASES = [
  {
    id: 'CASE-01',
    name: 'Rameshwar Meghwal',
    category: 'SC (Meghwal)',
    fir: 'FIR/RJ-ALW/2026/0429',
    section: 'SC/ST PoA Act Sec 3(1)(r)(s)',
    stage: 'Pre-Trial / Witness Examination',
    baseDistress: 89,
    status: 'CRITICAL',
    lastUpdate: '2 mins ago',
    alertType: 'Linguistic Threat Flagged',
    district: 'Alwar, Rajasthan'
  },
  {
    id: 'CASE-02',
    name: 'Sunita Devi Bhil',
    category: 'ST (Bhil)',
    fir: 'FIR/RJ-UDR/2026/0881',
    section: 'SC/ST PoA Act Sec 3(2)(va)',
    stage: 'Investigation / Post-FIR',
    baseDistress: 94,
    status: 'CRITICAL',
    lastUpdate: '45 secs ago',
    alertType: 'Vocal Tremor Spike (8.7%)',
    district: 'Udaipur, Rajasthan'
  },
  {
    id: 'CASE-03',
    name: 'Jagdish Bairwa',
    category: 'SC (Bairwa)',
    fir: 'FIR/RJ-JAI/2026/0210',
    section: 'SC/ST PoA Act Sec 3(1)(f) Land Rights',
    stage: 'Charge Sheet Filed',
    baseDistress: 48,
    status: 'MODERATE',
    lastUpdate: '2 hours ago',
    alertType: 'Routine Monitoring',
    district: 'Jaipur, Rajasthan'
  },
  {
    id: 'CASE-04',
    name: 'Manju Devi Paswan',
    category: 'SC (Paswan)',
    fir: 'FIR/BR-PAT/2026/0119',
    section: 'Sec 15A Witness Intimidation',
    stage: 'Trial Cross-Examination',
    baseDistress: 68,
    status: 'MODERATE',
    lastUpdate: '4 hours ago',
    alertType: 'Sleep Fragmentation Trend',
    district: 'Patna, Bihar'
  },
  {
    id: 'CASE-05',
    name: 'Vikas Valmiki',
    category: 'SC (Valmiki)',
    fir: 'FIR/UP-LKO/2026/0942',
    section: 'SC/ST PoA Act Sec 3(1)(x)',
    stage: 'Rehabilitation Phase',
    baseDistress: 18,
    status: 'SAFE',
    lastUpdate: '1 day ago',
    alertType: 'Stable Rehabilitation',
    district: 'Lucknow, Uttar Pradesh'
  }
];

export default function CaseQueueSidebar({ selectedCaseId, onSelectCase }) {
  const { simulationState, statePayload } = useSimulation();

  return (
    <div className="flex flex-col h-185 rounded-3xl bg-white border border-indigo-100 shadow-md overflow-hidden">
      
      {/* Sidebar Header */}
      <div className="p-4 bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold font-heading">Real-Time Triage Queue</h2>
          </div>
          <span className="text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
            5 Active Patients
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          Prioritized by AI Dynamic Distress Score (DDS)
        </p>

        {/* Quick Search */}
        <div className="mt-3 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FIR, Victim, or Section..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Case List Stream */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-slate-50/50">
        {MOCK_CASES.map((item) => {
          // Dynamic score binding for active simulation case
          const isSelected = selectedCaseId === item.id;
          const isSimulatedActiveCase = (simulationState === SIMULATION_STATES.CRITICAL_TEXT && item.id === 'CASE-01') ||
                                        (simulationState === SIMULATION_STATES.CRITICAL_VOICE && item.id === 'CASE-02');
          
          let currentDistress = item.baseDistress;
          if (isSimulatedActiveCase) {
            currentDistress = statePayload.distressScore;
          } else if (simulationState === SIMULATION_STATES.SAFE && (item.id === 'CASE-01' || item.id === 'CASE-02')) {
            currentDistress = item.id === 'CASE-01' ? 24 : 18;
          }

          const isHighDistress = currentDistress >= 75;
          const isModerate = currentDistress >= 40 && currentDistress < 75;

          return (
            <div
              key={item.id}
              onClick={() => onSelectCase(item.id)}
              className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer relative ${
                isSelected
                  ? 'bg-indigo-50/80 border-indigo-300 shadow-sm ring-1 ring-indigo-200'
                  : 'bg-white border-slate-200/80 hover:border-indigo-200 hover:shadow-2xs'
              } ${
                isHighDistress
                  ? 'ring-1 ring-rose-300/80 border-rose-300/80'
                  : ''
              }`}
            >
              {/* Pulsing beacon if score > 75 */}
              {isHighDistress && (
                <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
              )}

              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 font-heading">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      ({item.category})
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-indigo-600 font-medium">
                    {item.fir}
                  </div>
                </div>

                {/* Distress Badge */}
                <div className={`px-2 py-1 rounded-xl text-center font-mono font-bold text-xs shrink-0 ${
                  isHighDistress 
                    ? 'bg-rose-100 text-rose-700 border border-rose-200 animate-pulse' 
                    : isModerate
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}>
                  <div className="text-[9px] uppercase font-sans font-medium text-slate-500">DDS</div>
                  <div>{currentDistress}%</div>
                </div>
              </div>

              {/* Sub details */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span className="truncate max-w-37.5 font-medium text-slate-600">
                  {item.section}
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {isSimulatedActiveCase ? statePayload.timeElapsed : item.lastUpdate}
                </span>
              </div>

              {/* Alert Tag if high distress */}
              {isHighDistress && (
                <div className="mt-2 text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-rose-500 shrink-0" />
                  <span className="truncate">{item.alertType}</span>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
