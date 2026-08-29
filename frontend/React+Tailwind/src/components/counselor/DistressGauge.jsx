import React from 'react';
import { useSimulation, SIMULATION_STATES } from '../../context/SimulationContext';
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  HeartPulse, 
  Calendar, 
  Sparkles,
  Zap
} from 'lucide-react';

export default function DistressGauge({ victimData }) {
  const { simulationState, statePayload } = useSimulation();

  const isSimulatedVictim = victimData?.id === 'CASE-01' || victimData?.id === 'CASE-02';
  const score = isSimulatedVictim ? statePayload.distressScore : (victimData?.baseDistress || 35);
  const isCritical = score >= 75;
  const isModerate = score >= 40 && score < 75;

  // Calculate needle angle (-90deg to +90deg for semi-circle)
  // 0% -> -90deg, 100% -> +90deg
  const needleAngle = -90 + (score / 100) * 180;

  // Dynamic 14-Day Longitudinal Trend Points
  // Baseline adjustments based on current simulation state
  const trendPoints = isCritical
    ? [
        { day: 'D-14', score: 22, note: 'Baseline' },
        { day: 'D-12', score: 28, note: 'FIR Lodged' },
        { day: 'D-10', score: 32, note: 'Normal' },
        { day: 'D-8', score: 45, note: 'Accused Bail Plea' },
        { day: 'D-6', score: 58, note: 'Summons' },
        { day: 'D-4', score: 72, note: 'Intimidation' },
        { day: 'D-2', score: 81, note: 'Voice Tremor' },
        { day: 'Today', score: score, note: 'Acute Spike' }
      ]
    : [
        { day: 'D-14', score: 48, note: 'Initial shock' },
        { day: 'D-12', score: 42, note: 'Counseling 1' },
        { day: 'D-10', score: 36, note: 'Stabilizing' },
        { day: 'D-8', score: 30, note: 'DLSA Assigned' },
        { day: 'D-6', score: 25, note: 'Relief Sanctioned' },
        { day: 'D-4', score: 22, note: 'Coping' },
        { day: 'D-2', score: 19, note: 'Support Group' },
        { day: 'Today', score: score, note: 'Stable' }
      ];

  // SVG Chart path builder
  const chartWidth = 520;
  const chartHeight = 110;
  const padding = 20;

  const points = trendPoints.map((pt, i) => {
    const x = padding + (i / (trendPoints.length - 1)) * (chartWidth - 2 * padding);
    const y = chartHeight - padding - (pt.score / 100) * (chartHeight - 2 * padding);
    return { x, y, score: pt.score, day: pt.day, note: pt.note };
  });

  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  return (
    <div className="rounded-3xl bg-white border border-indigo-100 shadow-md p-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold font-heading text-slate-900">
              The "Nyaya-XAI" Dynamic Distress Gauge
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Composite psychological distress calculated continuously from speech tremors, semantic threats, and court milestones.
          </p>
        </div>

        <div className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono self-start sm:self-auto flex items-center gap-1.5 ${
          isCritical 
            ? 'bg-rose-100 text-rose-800 border border-rose-200 animate-pulse' 
            : isModerate
              ? 'bg-amber-100 text-amber-800 border border-amber-200'
              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
        }`}>
          {isCritical ? <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
          <span>{isCritical ? 'CRITICAL DISTRESS' : isModerate ? 'ELEVATED VIGILANCE' : 'HEALTHY RECOVERY'}</span>
        </div>
      </div>

      {/* Speedometer Gauge & Live Score Display */}
      <div className="flex flex-col lg:flex-row items-center justify-around gap-6 py-2">
        
        {/* Semi-Circular SVG Speedometer */}
        <div className="relative flex flex-col items-center justify-center">
          <svg width="260" height="150" viewBox="0 0 260 150" className="overflow-visible">
            <defs>
              {/* Speedometer Gradient Arc */}
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="45%" stopColor="#f59e0b" />
                <stop offset="80%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>

              {/* Needle drop shadow */}
              <filter id="needleShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Background Track Arc */}
            <path
              d="M 30 130 A 100 100 0 0 1 230 130"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="20"
              strokeLinecap="round"
            />

            {/* Value Colored Arc */}
            <path
              d="M 30 130 A 100 100 0 0 1 230 130"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray="314.15"
              strokeDashoffset={314.15 - (314.15 * score) / 100}
              className="transition-all duration-700 ease-out"
            />

            {/* Calibration tick labels */}
            <text x="25" y="145" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">0</text>
            <text x="75" y="55" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">25</text>
            <text x="130" y="22" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">50</text>
            <text x="185" y="55" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">75</text>
            <text x="235" y="145" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">100</text>

            {/* Center Pivot Needle */}
            <g transform={`translate(130, 130) rotate(${needleAngle})`} className="transition-transform duration-700 ease-out">
              {/* Needle Shape */}
              <polygon
                points="-4,0 0,-95 4,0"
                fill="#1e1b4b"
                filter="url(#needleShadow)"
              />
              <circle cx="0" cy="0" r="10" fill="#312e81" />
              <circle cx="0" cy="0" r="4" fill="#ffffff" />
            </g>
          </svg>

          {/* Numerical Score Underneath */}
          <div className="text-center -mt-3">
            <div className="text-3xl font-heading font-extrabold text-slate-900 tracking-tight font-mono">
              {score}
              <span className="text-base text-slate-400 font-normal"> / 100</span>
            </div>
            <div className={`text-xs font-semibold ${
              isCritical ? 'text-rose-600' : isModerate ? 'text-amber-600' : 'text-emerald-600'
            }`}>
              {isCritical ? 'Severe Distress Spike' : isModerate ? 'Moderate Strain' : 'Psychologically Stable'}
            </div>
          </div>
        </div>

        {/* Biometric & Clinical Secondary Cards */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <Activity className="w-3.5 h-3.5 text-purple-500" />
              <span>Acoustic Tremor</span>
            </div>
            <div className="text-lg font-bold font-mono text-slate-900 mt-1">
              {isSimulatedVictim ? statePayload.voiceJitter : '0.42%'}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              {isCritical ? 'Severe vocal cord tension' : 'Stable voice prosody'}
            </div>
          </div>

          <div className="col-span-2 p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-indigo-950 font-heading">
                Trial Milestone Vulnerability
              </div>
              <div className="text-[11px] text-indigo-800">
                {victimData?.stage || 'Witness Protection Period'}
              </div>
            </div>
            <span className="font-mono font-bold text-[11px] px-2 py-0.5 rounded bg-indigo-200/70 text-indigo-900">
              High Risk Stage
            </span>
          </div>

        </div>

      </div>

      {/* 14-Day Longitudinal Distress Trend-Line */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-700 font-heading">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>14-Day Longitudinal Distress Trend-Line (Continuous Triage)</span>
          </div>
        </div>

        {/* SVG Longitudinal Graph */}
        <div className="relative rounded-2xl bg-slate-900 p-4 overflow-hidden border border-slate-800 shadow-inner">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-24 overflow-visible"
          >
            <defs>
              <linearGradient id="trendAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isCritical ? '#ef4444' : '#6366f1'} stopOpacity="0.4" />
                <stop offset="100%" stopColor={isCritical ? '#ef4444' : '#6366f1'} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            <line x1="0" y1="25" x2={chartWidth} y2="25" stroke="#334155" strokeDasharray="3,3" />
            <line x1="0" y1="55" x2={chartWidth} y2="55" stroke="#334155" strokeDasharray="3,3" />
            <line x1="0" y1="85" x2={chartWidth} y2="85" stroke="#334155" strokeDasharray="3,3" />

            {/* Critical Threshold Line (at y=30 approx score 75) */}
            <line x1="0" y1="35" x2={chartWidth} y2="35" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />

            {/* Area Fill */}
            <path d={areaD} fill="url(#trendAreaGradient)" className="transition-all duration-500" />

            {/* Line Path */}
            <path
              d={pathD}
              fill="none"
              stroke={isCritical ? '#f43f5e' : '#818cf8'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-500"
            />

            {/* Data Dots & Milestone Labels */}
            {points.map((pt, idx) => (
              <g key={idx}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="3.5"
                  fill={isCritical && idx === points.length - 1 ? '#ef4444' : '#ffffff'}
                  stroke={isCritical ? '#f43f5e' : '#6366f1'}
                  strokeWidth="2"
                />
                <text
                  x={pt.x}
                  y={chartHeight - 4}
                  fill="#94a3b8"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {pt.day}
                </text>
              </g>
            ))}
          </svg>

          {/* Trend Milestone Bar */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800 font-mono">
            <span>D-14: FIR Baseline</span>
            <span>D-8: Accused Bail Hearing (Spike +24%)</span>
            <span className={isCritical ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
              Today: {score}% ({isCritical ? 'Urgent Intervention Required' : 'Stabilized'})
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
