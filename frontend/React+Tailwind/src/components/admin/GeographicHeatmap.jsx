import React, { useState } from 'react';
import { useSimulation, SIMULATION_STATES } from '../../context/SimulationContext';
import { 
  MapPin, 
  Layers, 
  ShieldAlert, 
  Info, 
  Navigation, 
  Maximize2,
  Sparkles,
  TrendingUp,
  Activity
} from 'lucide-react';

const HOTSPOT_NODES = [
  {
    id: 'node-alwar',
    name: 'Alwar District',
    cx: 410,
    cy: 130,
    risk: 'CRITICAL',
    dds: 81,
    cases: 4,
    recentAlert: 'Linguistic threat detected in FIR #0429',
    category: 'High Threat Cluster (Sec 3(1)(r))',
    color: '#ef4444'
  },
  {
    id: 'node-udaipur',
    name: 'Udaipur District',
    cx: 210,
    cy: 310,
    risk: 'CRITICAL',
    dds: 88,
    cases: 3,
    recentAlert: 'Acoustic vocal tremor spike (8.7% jitter)',
    category: 'Vocal SOS Zone',
    color: '#a855f7'
  },
  {
    id: 'node-bharatpur',
    name: 'Bharatpur Division',
    cx: 470,
    cy: 160,
    risk: 'HIGH',
    dds: 76,
    cases: 2,
    recentAlert: 'Witness intimidation reported',
    category: 'Sec 15A Protection Alert',
    color: '#f59e0b'
  },
  {
    id: 'node-jaipur',
    name: 'Jaipur Rural',
    cx: 340,
    cy: 180,
    risk: 'MODERATE',
    dds: 44,
    cases: 1,
    recentAlert: 'Pre-trial counseling scheduled',
    category: 'Monitored Triage',
    color: '#3b82f6'
  },
  {
    id: 'node-jodhpur',
    name: 'Jodhpur West',
    cx: 170,
    cy: 210,
    risk: 'STABLE',
    dds: 22,
    cases: 0,
    recentAlert: 'Rehabilitation grant disbursed',
    category: 'Rehabilitated',
    color: '#10b981'
  },
  {
    id: 'node-kota',
    name: 'Kota Division',
    cx: 360,
    cy: 290,
    risk: 'STABLE',
    dds: 29,
    cases: 1,
    recentAlert: 'Routine check-in logged',
    category: 'Stable Zone',
    color: '#10b981'
  }
];

export default function GeographicHeatmap() {
  const { simulationState } = useSimulation();
  const [hoveredNode, setHoveredNode] = useState(HOTSPOT_NODES[0]);
  const [selectedNode, setSelectedNode] = useState(HOTSPOT_NODES[0]);

  return (
    <div className="rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl p-5 sm:p-6 space-y-4 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
              <Navigation className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold font-heading text-white">
              Geospatial Atrocity Distress Heatmap
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              RAJASTHAN JURISDICTION
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time geospatial telemetry mapping of intimidation hotspots & witness vulnerability clusters.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            <span className="text-rose-400 font-semibold">Critical SOS (&gt;75 DDS)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-amber-400">Moderate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-emerald-400">Stable</span>
          </div>
        </div>
      </div>

      {/* Map and Info Layout (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
        
        {/* SVG Regional Vector Map (7 cols) */}
        <div className="lg:col-span-7 relative rounded-2xl bg-slate-950/80 border border-slate-800/90 p-3 sm:p-4 flex items-center justify-center min-h-85">
          
          <svg viewBox="0 0 560 380" className="w-full h-auto max-h-82.5 overflow-visible">
            <defs>
              {/* Region Mesh Pattern */}
              <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="0.8" fill="#334155" />
              </pattern>
              
              {/* Hotspot Radar Glow */}
              <filter id="radarGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Map Grid */}
            <rect width="560" height="380" fill="url(#gridPattern)" rx="16" />

            {/* Stylized District Polygon Contours (Rajasthan Region) */}
            {/* North-West Sector (Jodhpur/Bikaner) */}
            <path
              d="M 60 80 L 220 50 L 260 140 L 160 260 L 60 190 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="1.5"
              opacity="0.75"
              className="hover:fill-slate-800 transition-colors"
            />

            {/* North-East Sector (Jaipur/Alwar/Bharatpur) */}
            <path
              d="M 220 50 L 390 40 L 510 110 L 480 230 L 320 220 L 260 140 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="1.5"
              opacity="0.85"
              className="hover:fill-slate-800 transition-colors"
            />

            {/* South-West Sector (Udaipur/Mewar) */}
            <path
              d="M 160 260 L 320 220 L 300 360 L 170 360 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="1.5"
              opacity="0.8"
              className="hover:fill-slate-800 transition-colors"
            />

            {/* South-East Sector (Kota/Hadoti) */}
            <path
              d="M 320 220 L 480 230 L 470 340 L 300 360 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="1.5"
              opacity="0.8"
              className="hover:fill-slate-800 transition-colors"
            />

            {/* Inter-District Highways / Corridors */}
            <line x1="410" y1="130" x2="340" y2="180" stroke="#475569" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="340" y1="180" x2="470" y2="160" stroke="#475569" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="340" y1="180" x2="210" y2="310" stroke="#475569" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="340" y1="180" x2="360" y2="290" stroke="#475569" strokeWidth="1.5" strokeDasharray="3,3" />

            {/* Radar Pulse Nodes for each Hotspot */}
            {HOTSPOT_NODES.map((node) => {
              const isHovered = hoveredNode?.id === node.id;
              const isCriticalNode = node.risk === 'CRITICAL';

              return (
                <g 
                  key={node.id} 
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredNode(node)}
                  onClick={() => setSelectedNode(node)}
                >
                  {/* Outer animated radar ping waves */}
                  {isCriticalNode && (
                    <>
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r="24"
                        fill={node.color}
                        opacity="0.25"
                        className="animate-ping"
                      />
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r="16"
                        fill={node.color}
                        opacity="0.35"
                        className="animate-pulse"
                      />
                    </>
                  )}

                  {/* Node Center Dot */}
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={isHovered ? "10" : "8"}
                    fill={node.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    filter="url(#radarGlow)"
                    className="transition-all duration-200 group-hover:scale-125"
                  />

                  {/* District Label Text */}
                  <text
                    x={node.cx}
                    y={node.cy + 20}
                    fill="#cbd5e1"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="drop-shadow-md"
                  >
                    {node.name.split(' ')[0]} ({node.dds}%)
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Hover Mini-Tooltip inside map canvas */}
          {hoveredNode && (
            <div className="absolute bottom-3 left-3 bg-slate-900/95 border border-indigo-500/40 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-xl text-xs font-mono text-white animate-in fade-in duration-150 pointer-events-none">
              <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{hoveredNode.name}: {hoveredNode.cases} High-Risk Victims Flagged</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                Average DDS: <strong className="text-rose-400">{hoveredNode.dds}/100</strong> • {hoveredNode.category}
              </div>
            </div>
          )}

        </div>

        {/* District Detail & Threat Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
          
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedNode.color }}></div>
                <h4 className="text-sm font-bold text-white font-heading">
                  {selectedNode.name} Cluster
                </h4>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                selectedNode.risk === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-indigo-500/20 text-indigo-300'
              }`}>
                {selectedNode.risk} RISK
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Active Victims</span>
                <span className="text-base font-bold text-white">{selectedNode.cases} Persons</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Avg Distress</span>
                <span className="text-base font-bold text-rose-400">{selectedNode.dds}%</span>
              </div>
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Recent Intelligence:</div>
              <p className="italic text-slate-200 bg-slate-900 p-2 rounded-lg border border-slate-800">
                "{selectedNode.recentAlert}"
              </p>
            </div>
          </div>

          {/* MoSJE Quick Dispatch Link */}
          <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-800/60 flex items-center justify-between text-xs">
            <div className="text-indigo-200">
              <div className="font-bold">District Special Court SLA</div>
              <div className="text-[10px] text-indigo-300">24x7 Escort & Tele-Counselor On Duty</div>
            </div>
            <button 
              onClick={() => alert(`Escalation broadcast sent to District Magistrate and SP of ${selectedNode.name}`)}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors shrink-0 cursor-pointer"
            >
              Alert Nodal SP
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
