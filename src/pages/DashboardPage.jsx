import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFactory } from '../context/FactoryContext';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend
} from 'recharts';
import {
    TrendingDown,
    Flame,
    Lightbulb,
    ArrowRight,
    ShieldCheck,
    Zap,
    Recycle,
    Sparkles,
    ChevronRight,
    PlusCircle,
    CheckCircle2
} from 'lucide-react';

export const DashboardPage = () => {
    const navigate = useNavigate();
    const { dashboard, hotspots, recommendations, addToRoadmap, roadmap, industrialInputs, setupData } = useFactory();

    if (!dashboard) return null;

    const donutData = dashboard.emissionsBySource;
    const trendData = dashboard.monthlyTrend;

    return (
        <div className="space-y-6">
            {/* Page Title & Context Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-indigo-400 font-semibold tracking-wider">Operational Intelligence</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                            OPTIMIZATION READY
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-0.5 tracking-tight">Factory Carbon Overview</h1>
                    <p className="text-xs text-slate-400 mt-1">Real-time emissions baseline, technical hotspots, and feasible carbon reduction opportunities.</p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate('/simulator')}
                        className="px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-950 flex items-center gap-2 border border-indigo-500/30 transition-all hover:scale-105"
                    >
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Launch Simulator</span>
                    </button>
                </div>
            </div>

            {/* DOMINANT CARBON INTELLIGENCE HERO CARD */}
            <div className="grid lg:grid-cols-3 gap-6 bg-gradient-to-br from-[#121524] via-[#101320] to-[#0e101b] border border-slate-800/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-950/30 rounded-full blur-3xl pointer-events-none" />

                {/* PRIMARY METRIC 1: TOTAL EMISSIONS */}
                <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-slate-800/80 pb-6 lg:pb-0 lg:pr-6 flex flex-col justify-between">
                    <div>
                        <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">Primary Baseline</span>
                        <div className="mt-2 flex items-baseline gap-3">
                            <span className="text-4xl sm:text-5xl font-bold font-mono text-slate-100 tracking-tight">
                                {dashboard.totalEmissionsTCO2e.toLocaleString()}
                            </span>
                            <span className="text-sm font-mono text-slate-400">tCO2e/yr</span>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                                <TrendingDown className="w-3.5 h-3.5" />
                                {dashboard.emissionsChangePercent}%
                            </span>
                            <span className="text-[11px] text-slate-400">vs previous reporting period</span>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800/60">
                        <span className="text-[11px] font-mono text-slate-400">Emissions Intensity</span>
                        <p className="text-lg font-mono font-semibold text-slate-200 mt-0.5">
                            {dashboard.emissionsIntensity} <span className="text-xs font-normal text-slate-400">tCO2e / tonne product</span>
                        </p>
                    </div>
                </div>

                {/* PRIMARY METRIC 2: REDUCTION POTENTIAL & VISUALIZER */}
                <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <span className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Reduction Potential
                            </span>
                            <div className="mt-1 flex items-baseline gap-3">
                                <span className="text-3xl sm:text-4xl font-bold font-mono text-emerald-400 tracking-tight">
                                    -{dashboard.reductionPotentialTCO2e} <span className="text-xl">tCO2e/yr</span>
                                </span>
                                <span className="text-xs font-mono text-emerald-300 font-semibold bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-700/50">
                                    {dashboard.reductionPotentialPercent}% Feasible Reduction
                                </span>
                            </div>
                        </div>

                        <div className="text-left sm:text-right">
                            <span className="text-[11px] font-mono text-slate-400">Estimated Value Opportunity</span>
                            <p className="text-xl font-bold font-mono text-amber-400 mt-0.5">
                                ₹{(dashboard.annualSavingsINR / 100000).toFixed(1)} Lakhs<span className="text-xs text-slate-400 font-normal">/yr</span>
                            </p>
                        </div>
                    </div>

                    {/* VISUAL REDUCTION BAR CHART (CURRENT -> REDUCTION -> TARGET) */}
                    <div className="space-y-2 bg-[#0b0d14] p-4 rounded-xl border border-slate-800/80">
                        <div className="flex justify-between text-xs font-mono">
                            <span className="text-slate-300">Current: <strong className="text-slate-100">1,284 tCO2e</strong></span>
                            <span className="text-emerald-400 font-semibold">Feasible Reduction: -312 tCO2e</span>
                            <span className="text-indigo-300 font-semibold">Target: 972 tCO2e</span>
                        </div>

                        {/* Stacked Visual Bar */}
                        <div className="h-6 w-full rounded-lg bg-slate-900 border border-slate-800 flex overflow-hidden p-0.5">
                            <div
                                style={{ width: `${(972 / 1284) * 100}%` }}
                                className="bg-gradient-to-r from-indigo-800 to-indigo-600 h-full rounded-l transition-all flex items-center justify-center text-[10px] font-mono font-bold text-indigo-100"
                            >
                                972 t (Target)
                            </div>
                            <div
                                style={{ width: `${(312 / 1284) * 100}%` }}
                                className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-r transition-all animate-pulse flex items-center justify-center text-[10px] font-mono font-bold text-slate-950"
                            >
                                -312 t (Saved)
                            </div>
                        </div>
                    </div>

                    {/* SUPPORTING METRICS PILLS */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                        <div className="p-2.5 rounded-lg bg-[#0b0d14] border border-slate-800/80 text-center">
                            <span className="text-[10px] font-mono text-slate-400 uppercase">Renewable Energy</span>
                            <p className="text-sm font-bold font-mono text-indigo-300 mt-0.5">{dashboard.renewableEnergyPercent}%</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#0b0d14] border border-slate-800/80 text-center">
                            <span className="text-[10px] font-mono text-slate-400 uppercase">Waste Diversion</span>
                            <p className="text-sm font-bold font-mono text-emerald-400 mt-0.5">{dashboard.wasteDiversionPercent}%</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#0b0d14] border border-slate-800/80 text-center">
                            <span className="text-[10px] font-mono text-slate-400 uppercase">Evaluated Options</span>
                            <p className="text-sm font-bold font-mono text-slate-200 mt-0.5">100 Options</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#0b0d14] border border-slate-800/80 text-center">
                            <span className="text-[10px] font-mono text-slate-400 uppercase">Feasibility Pass</span>
                            <p className="text-sm font-bold font-mono text-emerald-400 mt-0.5">37 Passed</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONFIGURED INDUSTRIAL INPUTS SUMMARY BANNER */}
            <div className="bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-indigo-400 font-semibold tracking-wider flex items-center gap-1.5">
                            <PlusCircle className="w-4 h-4 text-indigo-400" /> Configured Industrial Inputs (Material-1, Material-2, Material-3)
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold">
                            3 Workflow Sections Configured
                        </span>
                    </div>
                    <button
                        onClick={() => navigate('/setup')}
                        className="text-xs font-mono text-indigo-300 hover:text-indigo-200 flex items-center gap-1"
                    >
                        <span>Manage Inputs in Setup</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                        { sectionLabel: 'Material-1', rawData: setupData?.material1 },
                        { sectionLabel: 'Material-2', rawData: setupData?.material2 },
                        { sectionLabel: 'Material-3', rawData: setupData?.material3 }
                    ].map(({ sectionLabel, rawData }) => {
                        const items = Array.isArray(rawData) ? rawData : (rawData?.selectedMaterialId ? [rawData] : []);
                        return (
                            <div key={sectionLabel} className="p-3.5 rounded-xl bg-[#141728] border border-slate-800 flex flex-col justify-between space-y-2">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">{sectionLabel}</span>
                                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60 font-semibold">
                                            {items.length} Configured
                                        </span>
                                    </div>

                                    {items.length === 0 ? (
                                        <p className="text-xs text-slate-500 italic mt-2">No materials configured</p>
                                    ) : (
                                        <div className="space-y-1.5 mt-2">
                                            {items.map((m, idx) => (
                                                <div key={idx} className="flex items-center justify-between text-xs border-b border-slate-800/50 pb-1 last:border-0 last:pb-0">
                                                    <span className="font-semibold text-slate-200 truncate max-w-[170px]" title={m.materialName}>
                                                        {m.materialName}
                                                    </span>
                                                    <span className="text-emerald-400 font-mono font-semibold text-[11px] shrink-0">
                                                        {Number(m.quantity || 0).toLocaleString()} {m.unit || 'tonnes'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* CHARTS GRID SECTION */}
            <div className="grid lg:grid-cols-12 gap-6">
                {/* DONUT CHART: EMISSIONS BY SOURCE */}
                <div className="lg:col-span-5 bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-200">Emissions by Source</h3>
                            <p className="text-[11px] text-slate-400">Total 1,284 tCO2e annual footprint</p>
                        </div>
                        <button
                            onClick={() => navigate('/emissions')}
                            className="text-[11px] font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                        >
                            Details <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>

                    <div className="h-56 w-full my-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={donutData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={80}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {donutData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#101320" strokeWidth={2} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#141829', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                                    itemStyle={{ color: '#f8fafc' }}
                                    formatter={(val) => [`${val} tCO2e`, 'Emissions']}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-800/60">
                        {donutData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between p-1.5 rounded bg-[#0b0d14]">
                                <div className="flex items-center gap-2 truncate">
                                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                    <span className="text-slate-300 truncate">{item.name}</span>
                                </div>
                                <span className="font-semibold text-slate-200 ml-1">{item.value}t</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* MONTHLY EMISSIONS TREND AREA CHART */}
                <div className="lg:col-span-7 bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-200">Monthly Emission Dynamics</h3>
                            <p className="text-[11px] text-slate-400">Electricity vs Materials vs Fuel profile (tCO2e)</p>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            12 Month History
                        </span>
                    </div>

                    <div className="h-64 w-full my-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorElectricity" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorMaterials" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#141829', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                                />
                                <Area type="monotone" dataKey="materials" name="Materials" stroke="#38bdf8" fillOpacity={1} fill="url(#colorMaterials)" />
                                <Area type="monotone" dataKey="electricity" name="Electricity" stroke="#4f46e5" fillOpacity={1} fill="url(#colorElectricity)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/60">
                        <span>Peak Month: <strong>Mar (110 tCO2e)</strong></span>
                        <span>Lowest Month: <strong>Dec (89 tCO2e)</strong></span>
                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION: HOTSPOTS RANKING & TOP ACTIONS */}
            <div className="grid lg:grid-cols-12 gap-6">
                {/* EMISSION HOTSPOT RANKING */}
                <div className="lg:col-span-6 bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-4">
                        <div className="flex items-center gap-2">
                            <Flame className="w-4 h-4 text-amber-400" />
                            <h3 className="text-sm font-semibold text-slate-200">Top Emission Hotspots</h3>
                        </div>
                        <button
                            onClick={() => navigate('/hotspots')}
                            className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                        >
                            View All 6 <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        {hotspots.slice(0, 3).map((hs, idx) => (
                            <div
                                key={hs.id}
                                className="p-3.5 rounded-xl bg-[#141726] border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between gap-3"
                            >
                                <div className="flex items-start gap-3 min-w-0">
                                    <span className="w-6 h-6 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-amber-400 shrink-0 mt-0.5">
                                        0{idx + 1}
                                    </span>
                                    <div className="min-w-0">
                                        <h4 className="text-xs font-semibold text-slate-200 truncate">{hs.title}</h4>
                                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{hs.probableCause}</p>
                                    </div>
                                </div>

                                <div className="text-right shrink-0">
                                    <span className="text-xs font-bold font-mono text-slate-200">{hs.emissionsTCO2e} tCO2e</span>
                                    <p className="text-[10px] text-emerald-400 font-mono mt-0.5">-{hs.reductionPotentialTCO2e} t potential</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TOP RECOMMENDED ACTIONS */}
                <div className="lg:col-span-6 bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-4">
                        <div className="flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-emerald-400" />
                            <h3 className="text-sm font-semibold text-slate-200">Highest Impact Feasible Actions</h3>
                        </div>
                        <button
                            onClick={() => navigate('/recommendations')}
                            className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                        >
                            Engine Filter <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        {recommendations.slice(0, 3).map((rec) => {
                            const inRoadmap = roadmap.some(r => r.recId === rec.id || r.title === rec.title);
                            return (
                                <div
                                    key={rec.id}
                                    className="p-3.5 rounded-xl bg-[#141726] border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between gap-3"
                                >
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                                                {rec.feasibilityScore}% FEASIBLE
                                            </span>
                                            <span className="text-[10px] font-mono text-slate-400">{rec.category}</span>
                                        </div>
                                        <h4
                                            onClick={() => navigate(`/recommendations/${rec.id}`)}
                                            className="text-xs font-semibold text-slate-200 hover:text-indigo-300 cursor-pointer truncate mt-1"
                                        >
                                            {rec.title}
                                        </h4>
                                    </div>

                                    <div className="flex items-center gap-3 shrink-0">
                                        <div className="text-right">
                                            <span className="text-xs font-bold font-mono text-emerald-400">-{rec.co2ReductionTCO2e} tCO2e</span>
                                            <p className="text-[10px] font-mono text-amber-400 mt-0.5">Payback {rec.paybackMonths}m</p>
                                        </div>

                                        <button
                                            onClick={() => addToRoadmap(rec)}
                                            disabled={inRoadmap}
                                            className={`p-2 rounded-lg border text-xs font-mono transition-colors ${inRoadmap
                                                ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300 cursor-default'
                                                : 'bg-indigo-950/80 border-indigo-700/60 text-indigo-200 hover:bg-indigo-900'
                                                }`}
                                            title={inRoadmap ? "Already in Roadmap" : "Add to Roadmap"}
                                        >
                                            {inRoadmap ? <CheckCircle2 className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
