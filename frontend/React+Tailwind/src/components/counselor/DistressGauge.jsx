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
  const needleAngle = -90 + (score / 100) * 180;

  // Dynamic 14-Day Longitudinal Trend Points
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
    <div className="clay-card p-6 sm:p-7 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-purple-100">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="clay-icon w-9 h-9 bg-linear-to-tr from-[#6342eb] to-[#7d54f5] flex items-center justify-center text-white">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-heading text-slate-900">
              The "Nyaya-XAI" Dynamic Distress Gauge
            </h3>
          </div>
          <p className="text-xs text-purple-900/70 mt-1">
            Composite psychological distress calculated continuously from speech tremors, semantic threats and court milestones.
          </p>
        </div>

        <div className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-mono self-start sm:self-auto flex items-center gap-2 shadow-2xs ${
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
          <svg width="270" height="155" viewBox="0 0 270 155" className="overflow-visible">
            <defs>
              {/* Speedometer Gradient Arc */}
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="40%" stopColor="#8c65ff" />
                <stop offset="70%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>

              {/* Needle drop shadow */}
              <filter id="needleShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#431407" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Background Track Arc */}
            <path
              d="M 35 135 A 100 100 0 0 1 235 135"
              fill="none"
              stroke="#ece5fe"
              strokeWidth="22"
              strokeLinecap="round"
            />

            {/* Value Colored Arc */}
            <path
              d="M 35 135 A 100 100 0 0 1 235 135"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="22"
              strokeLinecap="round"
              strokeDasharray="314.15"
              strokeDashoffset={314.15 - (314.15 * score) / 100}
              className="transition-all duration-700 ease-out"
            />

            {/* Calibration tick labels */}
            <text x="30" y="152" fill="#786699" fontSize="11" fontWeight="bold" textAnchor="middle">0</text>
            <text x="80" y="60" fill="#786699" fontSize="11" fontWeight="bold" textAnchor="middle">25</text>
            <text x="135" y="24" fill="#786699" fontSize="11" fontWeight="bold" textAnchor="middle">50</text>
            <text x="190" y="60" fill="#786699" fontSize="11" fontWeight="bold" textAnchor="middle">75</text>
            <text x="240" y="152" fill="#786699" fontSize="11" fontWeight="bold" textAnchor="middle">100</text>

            {/* Center Pivot Needle */}
            <g transform={`translate(135, 135) rotate(${needleAngle})`} className="transition-transform duration-700 ease-out">
              {/* Needle Shape */}
              <polygon
                points="-5,0 0,-100 5,0"
                fill="#2e1065"
                filter="url(#needleShadow)"
              />
              <circle cx="0" cy="0" r="11" fill="#4c1d95" />
              <circle cx="0" cy="0" r="4" fill="#ffffff" />
            </g>
          </svg>

          {/* Numerical Score Underneath */}
          <div className="text-center -mt-2">
            <div className="text-3xl font-heading font-black text-slate-900 tracking-tight font-mono">
              {score}
              <span className="text-base text-purple-400 font-normal"> / 100</span>
            </div>
            <div className={`text-xs font-bold mt-0.5 ${
              isCritical ? 'text-rose-600' : isModerate ? 'text-amber-600' : 'text-emerald-600'
            }`}>
              {isCritical ? 'Severe Distress Spike' : isModerate ? 'Moderate Strain' : 'Psychologically Stable'}
            </div>
          </div>
        </div>

        {/* Biometric & Clinical Secondary Cards */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          <div className="p-4 rounded-2xl bg-[#faf8ff] border border-purple-100 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-400 uppercase font-mono">
              <Activity className="w-3.5 h-3.5 text-[#704fe6]" />
              <span>Acoustic Tremor</span>
            </div>
            <div className="text-xl font-extrabold font-mono text-slate-900 mt-1">
              {isSimulatedVictim ? statePayload.voiceJitter : '0.42%'}
            </div>
            <div className="text-[10px] text-purple-900/60 mt-0.5 font-medium">
              {isCritical ? 'Severe vocal cord tension' : 'Stable voice prosody'}
            </div>
          </div>

          <div className="col-span-2 p-4 rounded-2xl bg-linear-to-r from-purple-50 to-indigo-50 border border-purple-200 flex items-center justify-between text-xs shadow-2xs">
            <div>
              <div className="font-bold text-purple-950 font-heading">
                Trial Milestone Vulnerability
              </div>
              <div className="text-[11px] text-purple-800 font-medium">
                {victimData?.stage || 'Witness Protection Period'}
              </div>
            </div>
            <span className="font-mono font-bold text-[11px] px-3 py-1 rounded-full bg-purple-200/80 text-purple-900 border border-purple-300">
              High Risk Stage
            </span>
          </div>

        </div>

      </div>

      {/* 14-Day Longitudinal Distress Trend-Line */}
      <div className="space-y-2.5 pt-3 border-t border-purple-100">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-800 font-heading">
            <Calendar className="w-4 h-4 text-[#6342eb]" />
            <span>14-Day Longitudinal Distress Trend-Line (Continuous Triage)</span>
          </div>
        </div>

        {/* SVG Longitudinal Graph with Dark Lavender Glass */}
        <div className="relative rounded-3xl bg-linear-to-br from-[#1b1436] to-[#120c26] p-4.5 overflow-hidden border border-purple-900/60 shadow-xl">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-24 overflow-visible"
          >
            <defs>
              <linearGradient id="trendAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isCritical ? '#f43f5e' : '#8c65ff'} stopOpacity="0.45" />
                <stop offset="100%" stopColor={isCritical ? '#f43f5e' : '#8c65ff'} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            <line x1="0" y1="25" x2={chartWidth} y2="25" stroke="#372f56" strokeDasharray="3,3" />
            <line x1="0" y1="55" x2={chartWidth} y2="55" stroke="#372f56" strokeDasharray="3,3" />
            <line x1="0" y1="85" x2={chartWidth} y2="85" stroke="#372f56" strokeDasharray="3,3" />

            {/* Critical Threshold Line */}
            <line x1="0" y1="35" x2={chartWidth} y2="35" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4,4" opacity="0.7" />

            {/* Area Fill */}
            <path d={areaD} fill="url(#trendAreaGradient)" className="transition-all duration-500" />

            {/* Line Path */}
            <path
              d={pathD}
              fill="none"
              stroke={isCritical ? '#f43f5e' : '#a78bfa'}
              strokeWidth="3"
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
                  r="4"
                  fill={isCritical && idx === points.length - 1 ? '#ef4444' : '#ffffff'}
                  stroke={isCritical ? '#f43f5e' : '#7c3aed'}
                  strokeWidth="2.5"
                />
                <text
                  x={pt.x}
                  y={chartHeight - 3}
                  fill="#a599c2"
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.day}
                </text>
              </g>
            ))}
          </svg>

          {/* Trend Milestone Bar */}
          <div className="flex items-center justify-between text-[10px] text-purple-200/70 pt-2 border-t border-purple-900/60 font-mono">
            <span>D-14: FIR Baseline</span>
            <span>D-8: Accused Bail Hearing (Spike +24%)</span>
            <span className={isCritical ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
              Today: {score}% ({isCritical ? 'Urgent Intervention Required' : 'Stabilized'})
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
