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
    color: '#f43f5e'
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
    color: '#818cf8'
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
    <div className="clay-card-dark p-6 sm:p-7 space-y-4 relative overflow-hidden text-white">
      
      {/* Background ambient lighting */}
      <div className="absolute -top-10 -right-10 w-80 h-80 rounded-full bg-purple-500/15 blur-3xl pointer-events-none animate-float-slow"></div>
      <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none animate-float-reverse"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-purple-900/60 relative z-10">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-sm">
              <Navigation className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold font-heading text-white">
              Geospatial Atrocity Distress Heatmap
            </h3>
            <span className="text-[10px] font-mono px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
              RAJASTHAN JURISDICTION
            </span>
          </div>
          <p className="text-xs text-purple-200/70 mt-1">
            Real-time geospatial telemetry mapping of intimidation hotspots & witness vulnerability clusters.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-full border border-purple-900/60">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            <span className="text-rose-400 font-bold">Critical SOS (&gt;75 DDS)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-full border border-purple-900/60">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-amber-400 font-medium">Moderate</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-full border border-purple-900/60">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-emerald-400 font-medium">Stable</span>
          </div>
        </div>
      </div>

      {/* Map and Info Layout (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
        
        {/* SVG Regional Vector Map (7 cols) */}
        <div className="lg:col-span-7 relative rounded-3xl bg-linear-to-br from-[#160f2e] to-[#0c071d] border border-purple-900/60 p-3 sm:p-4 flex items-center justify-center min-h-85 shadow-inner">
          
          <svg viewBox="0 0 560 380" className="w-full h-auto max-h-82.5 overflow-visible">
            <defs>
              {/* Region Mesh Pattern */}
              <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="0.8" fill="#4c3875" />
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
            <rect width="560" height="380" fill="url(#gridPattern)" rx="20" />

            {/* Stylized District Polygon Contours (Rajasthan Region) */}
            {/* North-West Sector (Jodhpur/Bikaner) */}
            <path
              d="M 60 80 L 220 50 L 260 140 L 160 260 L 60 190 Z"
              fill="#221844"
              stroke="#43326f"
              strokeWidth="1.5"
              opacity="0.85"
              className="hover:fill-[#2d2159] transition-colors"
            />

            {/* North-East Sector (Jaipur/Alwar/Bharatpur) */}
            <path
              d="M 220 50 L 390 40 L 510 110 L 480 230 L 320 220 L 260 140 Z"
              fill="#221844"
              stroke="#43326f"
              strokeWidth="1.5"
              opacity="0.9"
              className="hover:fill-[#2d2159] transition-colors"
            />

            {/* South-West Sector (Udaipur/Mewar) */}
            <path
              d="M 160 260 L 320 220 L 300 360 L 170 360 Z"
              fill="#221844"
              stroke="#43326f"
              strokeWidth="1.5"
              opacity="0.85"
              className="hover:fill-[#2d2159] transition-colors"
            />

            {/* South-East Sector (Kota/Hadoti) */}
            <path
              d="M 320 220 L 480 230 L 470 340 L 300 360 Z"
              fill="#221844"
              stroke="#43326f"
              strokeWidth="1.5"
              opacity="0.85"
              className="hover:fill-[#2d2159] transition-colors"
            />

            {/* Inter-District Corridors */}
            <line x1="410" y1="130" x2="340" y2="180" stroke="#5a4490" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="340" y1="180" x2="470" y2="160" stroke="#5a4490" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="340" y1="180" x2="210" y2="310" stroke="#5a4490" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="340" y1="180" x2="360" y2="290" stroke="#5a4490" strokeWidth="1.5" strokeDasharray="3,3" />

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
                    r={isHovered ? "11" : "8.5"}
                    fill={node.color}
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    filter="url(#radarGlow)"
                    className="transition-all duration-200 group-hover:scale-125"
                  />

                  {/* District Label Text */}
                  <text
                    x={node.cx}
                    y={node.cy + 22}
                    fill="#e2d9f7"
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

          {/* Floating Hover Mini-Tooltip */}
          {hoveredNode && (
            <div className="absolute bottom-3 left-3 bg-[#1e153e]/95 border border-purple-500/50 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-mono text-white animate-spring-pop pointer-events-none">
              <div className="font-bold text-purple-200 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{hoveredNode.name}: {hoveredNode.cases} High-Risk Victims</span>
              </div>
              <div className="text-[11px] text-purple-300 mt-0.5">
                Average DDS: <strong className="text-rose-400">{hoveredNode.dds}/100</strong> • {hoveredNode.category}
              </div>
            </div>
          )}

        </div>

        {/* District Detail & Threat Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-3.5 flex flex-col justify-between">
          
          <div className="p-4.5 rounded-3xl bg-linear-to-br from-[#1e153e] to-[#120a28] border border-purple-900/60 space-y-3.5 shadow-md">
            <div className="flex items-center justify-between pb-2.5 border-b border-purple-900/60">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedNode.color }}></div>
                <h4 className="text-sm font-bold text-white font-heading">
                  {selectedNode.name} Cluster
                </h4>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                selectedNode.risk === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-purple-500/20 text-purple-300'
              }`}>
                {selectedNode.risk} RISK
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
              <div className="p-3 rounded-2xl bg-black/40 border border-purple-900/60">
                <span className="text-[10px] text-purple-400 block font-semibold">Active Victims</span>
                <span className="text-base font-black text-white mt-0.5 block">{selectedNode.cases} Persons</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-purple-900/60">
                <span className="text-[10px] text-purple-400 block font-semibold">Avg Distress</span>
                <span className="text-base font-black text-rose-400 mt-0.5 block">{selectedNode.dds}%</span>
              </div>
            </div>

            <div className="text-xs text-purple-200/90 space-y-1">
              <div className="text-[10px] text-purple-400 uppercase font-bold font-mono">Recent Intelligence:</div>
              <p className="italic text-purple-100 bg-black/30 p-2.5 rounded-xl border border-purple-900/60">
                "{selectedNode.recentAlert}"
              </p>
            </div>
          </div>

          {/* MoSJE Quick Dispatch Link */}
          <div className="p-4 rounded-3xl bg-linear-to-r from-purple-950/80 to-indigo-950/80 border border-purple-600/40 flex items-center justify-between text-xs shadow-md">
            <div className="text-purple-200">
              <div className="font-bold">District Special Court SLA</div>
              <div className="text-[10px] text-purple-300">24x7 Escort & Tele-Counselor On Duty</div>
            </div>
            <button 
              onClick={() => alert(`Escalation broadcast sent to District Magistrate and SP of ${selectedNode.name}`)}
              className="clay-btn clay-btn-primary px-3.5 py-2 text-white font-bold text-xs shrink-0 cursor-pointer"
            >
              Alert Nodal SP
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
