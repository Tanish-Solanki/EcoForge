import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFactory } from '../context/FactoryContext';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
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
    CheckCircle2,
    Check,
    AlertCircle,
    IndianRupee,
    Layers,
    SlidersHorizontal
} from 'lucide-react';

export const DashboardPage = () => {
    const navigate = useNavigate();
    const { dashboard, hotspots, recommendations, addToRoadmap, roadmap, industrialInputs, setupData, computedReport } = useFactory();

    if (!dashboard) return null;

    const donutData = dashboard.emissionsBySource;
    const reportData = computedReport || {};
    const detailedMaterials = reportData.detailedMaterialAnalysis || [];

    return (
        <div className="space-y-6 font-sans">
            {/* Page Title & Context Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-indigo-400 font-semibold tracking-wider">Operational Intelligence</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                            {computedReport ? 'ANALYZE FACTORY REPORT ACTIVE' : 'OPTIMIZATION READY'}
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-0.5 tracking-tight">Factory Carbon Overview</h1>
                    <p className="text-xs text-slate-400 mt-1">Real-time emissions baseline, technical hotspots, and feasible carbon reduction opportunities.</p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate('/setup')}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-all"
                    >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Configure Factory (6 Steps)</span>
                    </button>
                    <button
                        onClick={() => navigate('/simulator')}
                        className="px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-950 flex items-center gap-2 border border-indigo-500/30 transition-all hover:scale-105"
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
                        <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">Calculated Baseline</span>
                        <div className="mt-2 flex items-baseline gap-3">
                            <span className="text-4xl sm:text-5xl font-bold font-mono text-slate-100 tracking-tight">
                                {(reportData.totalEmissionsTCO2e || dashboard.totalEmissionsTCO2e).toLocaleString()}
                            </span>
                            <span className="text-sm font-mono text-slate-400">tCO2e/yr</span>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                                <TrendingDown className="w-3.5 h-3.5" />
                                {dashboard.emissionsChangePercent}%
                            </span>
                            <span className="text-[11px] text-slate-400">vs standard industrial baseline</span>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800/60">
                        <span className="text-[11px] font-mono text-slate-400">Combined Raw Material Budget</span>
                        <p className="text-lg font-mono font-semibold text-amber-400 mt-0.5">
                            ₹{((reportData.totalCostINR || 222000000) / 100000).toFixed(1)} Lakhs <span className="text-xs font-normal text-slate-400">/yr</span>
                        </p>
                    </div>
                </div>

                {/* PRIMARY METRIC 2: REDUCTION POTENTIAL & VISUALIZER */}
                <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <span className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Reduction Potential (Circular Alternatives)
                            </span>
                            <div className="mt-1 flex items-baseline gap-3">
                                <span className="text-3xl sm:text-4xl font-bold font-mono text-emerald-400 tracking-tight">
                                    -{(reportData.totalFeasibleSavingsTCO2e || dashboard.reductionPotentialTCO2e).toLocaleString()} <span className="text-xl">tCO2e/yr</span>
                                </span>
                                <span className="text-xs font-mono text-emerald-300 font-semibold bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-700/50">
                                    {reportData.reductionPotentialPercent || dashboard.reductionPotentialPercent}% Feasible Reduction
                                </span>
                            </div>
                        </div>

                        <div className="text-left sm:text-right">
                            <span className="text-[11px] font-mono text-slate-400">Annual OPEX Savings</span>
                            <p className="text-xl font-bold font-mono text-amber-400 mt-0.5">
                                ₹{((reportData.totalAnnualSavingsINR || dashboard.annualSavingsINR || 1250000) / 100000).toFixed(1)} Lakhs<span className="text-xs text-slate-400 font-normal">/yr</span>
                            </p>
                        </div>
                    </div>

                    {/* VISUAL REDUCTION BAR CHART */}
                    <div className="space-y-2 bg-[#0b0d14] p-4 rounded-xl border border-slate-800/80">
                        <div className="flex justify-between text-xs font-mono">
                            <span className="text-slate-300">Baseline: <strong className="text-slate-100">{(reportData.totalEmissionsTCO2e || 1284).toLocaleString()} tCO2e</strong></span>
                            <span className="text-emerald-400 font-semibold">Saved: -{(reportData.totalFeasibleSavingsTCO2e || 312).toLocaleString()} tCO2e</span>
                            <span className="text-indigo-300 font-semibold">Target: {(reportData.targetEmissionsTCO2e || 972).toLocaleString()} tCO2e</span>
                        </div>

                        <div className="h-6 w-full rounded-lg bg-slate-900 border border-slate-800 flex overflow-hidden p-0.5">
                            <div
                                style={{ width: `${((reportData.targetEmissionsTCO2e || 972) / (reportData.totalEmissionsTCO2e || 1284)) * 100}%` }}
                                className="bg-gradient-to-r from-indigo-800 to-indigo-600 h-full rounded-l transition-all flex items-center justify-center text-[10px] font-mono font-bold text-indigo-100"
                            >
                                {(reportData.targetEmissionsTCO2e || 972).toLocaleString()} t (Target)
                            </div>
                            <div
                                style={{ width: `${((reportData.totalFeasibleSavingsTCO2e || 312) / (reportData.totalEmissionsTCO2e || 1284)) * 100}%` }}
                                className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-r transition-all animate-pulse flex items-center justify-center text-[10px] font-mono font-bold text-slate-950"
                            >
                                -{(reportData.totalFeasibleSavingsTCO2e || 312).toLocaleString()} t (Saved)
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FULL DATASET ANALYSIS REPORT: USE CASES & MULTIPLE ALTERNATIVES WITH PROS & CONS */}
            <div className="bg-[#101320] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">Curated Dataset Report</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                                MULTIPLE ALTERNATIVES PER USE CASE
                            </span>
                        </div>
                        <h2 className="text-lg font-bold text-slate-100 mt-1">Raw Material Sustainable Circular Alternatives & Pros/Cons</h2>
                        <p className="text-xs text-slate-400">Full computation report generated from Excel dataset. Displays all feasible alternative pathways for each raw material and use case with cost & emission savings.</p>
                    </div>

                    <button
                        onClick={() => navigate('/recommendations')}
                        className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1 shrink-0"
                    >
                        <span>Full Recommendations Page</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {detailedMaterials.length === 0 ? (
                    <div className="p-8 text-center bg-[#0b0d14] rounded-xl border border-dashed border-slate-800">
                        <Layers className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                        <p className="text-xs text-slate-400 font-medium">No factory materials configured yet</p>
                        <p className="text-[11px] text-slate-500 mt-1">Click "Configure Factory (6 Steps)" and select raw materials to run complete computation report.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {detailedMaterials.map((mat, mIdx) => (
                            <div key={mIdx} className="bg-[#0b0d14] border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg">
                                {/* Material Header Banner */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="w-7 h-7 rounded-lg bg-amber-950/80 text-amber-300 border border-amber-800/60 font-mono font-bold text-xs flex items-center justify-center">
                                            #{mat.rank || (mIdx + 1)}
                                        </span>
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-100 font-sans">{mat.materialName}</h3>
                                            <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                                                Present Baseline: <strong className="text-rose-400">{mat.emissionsTCO2e?.toLocaleString()} tCO2e/yr</strong> ({mat.sharePercent}% of factory total)
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-right font-mono text-xs">
                                        <span className="text-slate-400 block text-[10px]">Annual Input Volume</span>
                                        <span className="text-emerald-400 font-bold">{mat.quantity?.toLocaleString()} {mat.unit || 'tonnes'}</span>
                                    </div>
                                </div>

                                {/* Use Cases & Alternatives Cards */}
                                {(mat.useCaseBreakdown || []).map((uc, uIdx) => (
                                    <div key={uIdx} className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-mono font-bold uppercase text-indigo-300 bg-indigo-950/80 px-2.5 py-1 rounded border border-indigo-800/60">
                                                Use Case: {uc.useCaseLabel}
                                            </span>
                                            <span className="text-[11px] font-mono text-slate-400">
                                                ({uc.alternatives?.length || 0} Multiple Alternatives Found in Dataset)
                                            </span>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            {(uc.alternatives || []).map((alt, aIdx) => (
                                                <div key={aIdx} className="bg-[#121524] border border-indigo-900/60 rounded-xl p-4 space-y-3 relative group hover:border-indigo-500/80 transition-all shadow-md">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-indigo-300 border border-indigo-800">
                                                                    Alt #{aIdx + 1}
                                                                </span>
                                                                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                                                                    {alt.source || '🟢 CURATED DATASET'}
                                                                </span>
                                                            </div>
                                                            <h4 className="text-xs font-bold text-slate-100 mt-1.5">{alt.name}</h4>
                                                        </div>

                                                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-700/60 shrink-0">
                                                            -{alt.co2ReductionPercent}% CO2
                                                        </span>
                                                    </div>

                                                    {/* Metrics Grid */}
                                                    <div className="grid grid-cols-2 gap-2 bg-[#0b0d14] p-3 rounded-lg border border-slate-800 text-[11px] font-mono">
                                                        <div>
                                                            <span className="text-slate-400 block text-[10px]">Present vs Alt CO2</span>
                                                            <span className="text-rose-400 font-bold">{alt.presentCO2Factor}</span>
                                                            <span className="text-slate-500 mx-1">→</span>
                                                            <span className="text-emerald-400 font-bold">{alt.altCO2Factor} t/t</span>
                                                        </div>

                                                        <div>
                                                            <span className="text-slate-400 block text-[10px]">Annual CO2 Saved</span>
                                                            <span className="text-emerald-400 font-bold">{alt.co2SavedTCO2e?.toLocaleString()} tCO2e/yr</span>
                                                        </div>

                                                        <div>
                                                            <span className="text-slate-400 block text-[10px]">Cost Savings</span>
                                                            <span className="text-amber-400 font-bold">₹ {(alt.annualCostSavedINR / 100000).toFixed(1)} Lakhs/yr</span>
                                                        </div>

                                                        <div>
                                                            <span className="text-slate-400 block text-[10px]">Payback Period</span>
                                                            <span className="text-indigo-300 font-bold">{alt.paybackYears} Years</span>
                                                        </div>
                                                    </div>

                                                    {/* PROS & CONS BOX */}
                                                    <div className="space-y-2 pt-1 border-t border-slate-800">
                                                        {/* PROS */}
                                                        <div>
                                                            <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 flex items-center gap-1 mb-1">
                                                                <Check className="w-3 h-3 text-emerald-400" /> Pros (Cost & Emission Benefits)
                                                            </span>
                                                            <ul className="space-y-1">
                                                                {(alt.pros || []).map((pro, pIdx) => (
                                                                    <li key={pIdx} className="text-[11px] text-slate-300 flex items-start gap-1.5 leading-snug">
                                                                        <span className="text-emerald-400 font-bold">•</span>
                                                                        <span>{pro}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* CONS */}
                                                        <div>
                                                            <span className="text-[10px] font-mono font-bold uppercase text-rose-400 flex items-center gap-1 mb-1 mt-2">
                                                                <AlertCircle className="w-3 h-3 text-rose-400" /> Cons (CAPEX & Operational Trade-offs)
                                                            </span>
                                                            <ul className="space-y-1">
                                                                {(alt.cons || []).map((con, cIdx) => (
                                                                    <li key={cIdx} className="text-[11px] text-slate-400 flex items-start gap-1.5 leading-snug">
                                                                        <span className="text-rose-400 font-bold">•</span>
                                                                        <span>{con}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    {/* Add to Roadmap Button */}
                                                    <button
                                                        onClick={() => {
                                                            addToRoadmap({
                                                                id: alt.id,
                                                                title: alt.name,
                                                                co2ReductionTCO2e: alt.co2SavedTCO2e,
                                                                annualSavingsINR: alt.annualCostSavedINR,
                                                                implementationCostINR: Math.round(alt.annualCostSavedINR * alt.paybackYears),
                                                                paybackMonths: Math.round(alt.paybackYears * 12),
                                                                difficulty: "Medium",
                                                                category: "Material Alternative"
                                                            });
                                                        }}
                                                        className="w-full mt-2 py-2 rounded-lg bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 text-indigo-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                                                    >
                                                        <PlusCircle className="w-3.5 h-3.5 text-indigo-400" />
                                                        <span>Add Alternative to Roadmap</span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
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

            {/* EMISSIONS BY SOURCE CHART */}
            <div className="bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-200">Emissions by Source</h3>
                        <p className="text-[11px] text-slate-400">Total {(reportData.totalEmissionsTCO2e || dashboard.totalEmissionsTCO2e).toLocaleString()} tCO2e annual footprint baseline</p>
                    </div>
                    <button
                        onClick={() => navigate('/emissions')}
                        className="text-[11px] font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                        Details <ChevronRight className="w-3 h-3" />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 items-center gap-6 my-4">
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={donutData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={65}
                                    outerRadius={95}
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

                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        {donutData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between p-3 rounded-xl bg-[#0b0d14] border border-slate-800/70">
                                <div className="flex items-center gap-2 truncate">
                                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                    <span className="text-slate-300 truncate">{item.name}</span>
                                </div>
                                <span className="font-semibold text-slate-100 font-mono ml-2">{item.value} tCO2e</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
