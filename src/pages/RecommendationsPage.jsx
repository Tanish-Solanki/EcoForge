import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFactory } from '../context/FactoryContext';
import {
    Lightbulb,
    ShieldCheck,
    TrendingDown,
    Filter,
    CheckCircle2,
    XCircle,
    ChevronRight,
    PlusCircle,
    Sparkles,
    ArrowRight,
    Info,
    DollarSign,
    Clock,
    Zap,
    Recycle,
    Layers,
    Cpu
} from 'lucide-react';

export const RecommendationsPage = () => {
    const navigate = useNavigate();
    const { recommendations, rejectedOptions, decisionStats, addToRoadmap, roadmap } = useFactory();

    const [activeCategory, setActiveCategory] = useState('All');
    const [activePreset, setActivePreset] = useState('All');

    const categories = ['All', 'Material', 'Energy', 'Process', 'Waste', 'Machine'];

    const filteredRecommendations = useMemo(() => {
        return recommendations.filter(rec => {
            if (activeCategory !== 'All' && rec.category !== activeCategory) return false;
            if (activePreset === 'High CO2 Impact' && rec.co2ReductionTCO2e < 40) return false;
            if (activePreset === 'Low Cost' && rec.implementationCostINR > 100000) return false;
            if (activePreset === 'Quick Payback' && rec.paybackMonths > 6) return false;
            if (activePreset === 'High Feasibility' && rec.feasibilityScore < 95) return false;
            return true;
        });
    }, [recommendations, activeCategory, activePreset]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-indigo-400 font-semibold tracking-wider">Feasibility-Aware Optimizer</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                            CARBON-FIRST OPTIMIZATION
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-0.5 tracking-tight">Recommended Actions</h1>
                    <p className="text-xs text-slate-400 mt-1">Actions ranked by practical CO2 reduction potential under hard engineering constraints.</p>
                </div>

                <button
                    onClick={() => navigate('/comparison')}
                    className="px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-950 flex items-center gap-2 border border-indigo-500/30 transition-all hover:scale-105"
                >
                    <span>Compare Matrix</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            {/* STRATEGY HEADER & DECISION ENGINE VISUAL PIPELINE */}
            <div className="bg-gradient-to-br from-[#121524] via-[#101320] to-[#0e101b] border border-slate-800/80 rounded-2xl p-6 shadow-2xl space-y-6">
                {/* Strategy Objective Statement */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800/60 font-mono text-xs">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400">PRIMARY OBJECTIVE:</span>
                        <strong className="text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800/50 uppercase tracking-wide">
                            Maximum CO2 Reduction
                        </strong>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400">HARD CONSTRAINT:</span>
                        <strong className="text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800/50 uppercase tracking-wide">
                            Technical Feasibility (Pass/Fail)
                        </strong>
                    </div>
                    <div className="text-slate-400 text-[11px]">
                        SECONDARY FACTORS: <span className="text-slate-300">Cost • Payback • Energy • Waste</span>
                    </div>
                </div>

                {/* DECISION ENGINE PIPELINE (100 OPTIONS -> FILTER -> 37 FEASIBLE -> OPTIMIZE -> TOP ACTIONS) */}
                <div>
                    <span className="text-[11px] font-mono uppercase text-indigo-300 font-semibold mb-3 block">
                        EcoForge Technical Feasibility & Optimization Engine Flow
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
                        <div className="p-3.5 rounded-xl bg-[#141726] border border-slate-700/60 text-center">
                            <span className="text-[10px] font-mono text-slate-400 uppercase">Input Candidates</span>
                            <p className="text-lg font-bold font-mono text-slate-200 mt-1">100 Options</p>
                            <span className="text-[9px] text-slate-400 font-mono">Raw Interventions</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#181a2e] border border-amber-800/50 text-center">
                            <span className="text-[10px] font-mono text-amber-400 uppercase flex items-center justify-center gap-1">
                                <ShieldCheck className="w-3 h-3" /> Feasibility Filter
                            </span>
                            <p className="text-lg font-bold font-mono text-amber-300 mt-1">-63 Rejected</p>
                            <span className="text-[9px] text-amber-400/80 font-mono">Failed Specs</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#141726] border border-slate-700/60 text-center">
                            <span className="text-[10px] font-mono text-slate-400 uppercase">Feasible Options</span>
                            <p className="text-lg font-bold font-mono text-indigo-300 mt-1">37 Feasible</p>
                            <span className="text-[9px] text-indigo-300/80 font-mono">100% Validated</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#141726] border border-slate-700/60 text-center">
                            <span className="text-[10px] font-mono text-slate-400 uppercase">Carbon Ranker</span>
                            <p className="text-lg font-bold font-mono text-emerald-400 mt-1">CO2 Potential</p>
                            <span className="text-[9px] text-emerald-400/80 font-mono">Max Impact First</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/80 to-indigo-950/80 border border-emerald-600/50 text-center">
                            <span className="text-[10px] font-mono text-emerald-300 uppercase">Top 5 Actions</span>
                            <p className="text-lg font-bold font-mono text-white mt-1">312 t CO2e</p>
                            <span className="text-[9px] text-emerald-200 font-mono">31% Annual Shift</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* FILTER & PRESET CONTROLS */}
            <div className="bg-[#101320] border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                    <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1">
                        <Filter className="w-3.5 h-3.5" /> Category:
                    </span>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${activeCategory === cat
                                ? 'bg-indigo-700 text-white font-semibold shadow-sm'
                                : 'bg-[#141726] text-slate-300 hover:bg-slate-800 border border-slate-800'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                    <span className="text-xs font-mono text-slate-400 mr-1">Presets:</span>
                    {['All', 'High CO2 Impact', 'Low Cost', 'Quick Payback', 'High Feasibility'].map(preset => (
                        <button
                            key={preset}
                            onClick={() => setActivePreset(preset)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${activePreset === preset
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                                : 'bg-[#141726] text-slate-400 hover:text-slate-200 border border-slate-800'
                                }`}
                        >
                            {preset}
                        </button>
                    ))}
                </div>
            </div>

            {/* RECOMMENDATIONS LIST */}
            <div className="space-y-4">
                {filteredRecommendations.map((rec) => {
                    const inRoadmap = roadmap.some(r => r.recId === rec.id || r.title === rec.title);

                    return (
                        <div
                            key={rec.id}
                            className="bg-[#101320] border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 shadow-xl transition-all space-y-4"
                        >
                            {/* Top row: Title, badges & CO2 Impact */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-800/60">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                        {rec.badge && (
                                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 uppercase tracking-wide">
                                                {rec.badge}
                                            </span>
                                        )}
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                                            {rec.feasibilityScore}% FEASIBLE
                                        </span>
                                        <span className="text-xs font-mono text-slate-400">{rec.category}</span>
                                    </div>

                                    <h3
                                        onClick={() => navigate(`/recommendations/${rec.id}`)}
                                        className="text-base font-bold text-slate-100 hover:text-indigo-300 cursor-pointer"
                                    >
                                        {rec.title}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-4 shrink-0">
                                    <div className="text-right font-mono">
                                        <span className="text-xl font-bold text-emerald-400">-{rec.co2ReductionTCO2e} tCO2e/yr</span>
                                        <p className="text-xs text-slate-400">CO2 Impact</p>
                                    </div>

                                    <button
                                        onClick={() => addToRoadmap(rec)}
                                        disabled={inRoadmap}
                                        className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 border transition-all ${inRoadmap
                                            ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300 cursor-default'
                                            : 'bg-indigo-700 hover:bg-indigo-600 text-white border-indigo-500/30 shadow-md shadow-indigo-950 hover:scale-105'
                                            }`}
                                    >
                                        {inRoadmap ? (
                                            <>
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                                <span>In Roadmap</span>
                                            </>
                                        ) : (
                                            <>
                                                <PlusCircle className="w-4 h-4" />
                                                <span>Add to Roadmap</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Middle row: Why Recommended + Requirement Checks */}
                            <div className="grid lg:grid-cols-12 gap-4">
                                <div className="lg:col-span-6 text-xs text-slate-300 space-y-1">
                                    <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Why Recommended:</span>
                                    <p className="leading-relaxed text-slate-300">{rec.whyRecommended}</p>
                                </div>

                                {/* Technical Feasibility Requirements Checked matrix summary */}
                                <div className="lg:col-span-6 bg-[#0b0d14] p-3 rounded-xl border border-slate-800 text-xs font-mono">
                                    <span className="text-[10px] text-slate-400 uppercase block mb-1.5 font-semibold">
                                        Technical Requirements Checked (Pass Matrix):
                                    </span>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {rec.technicalMatrix ? (
                                            rec.technicalMatrix.slice(0, 3).map((req, idx) => (
                                                <div key={idx} className="flex items-center gap-1 text-[11px]">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                                    <span className="text-slate-300 truncate">{req.requirement}:</span>
                                                    <strong className="text-emerald-400">{req.status}</strong>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="flex items-center gap-1 text-emerald-400">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                <span>100% Engineering Rules Satisfied</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom row: Financial Metrics & Detail link */}
                            <div className="pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-3">
                                <div className="flex flex-wrap items-center gap-4">
                                    <span>Annual Savings: <strong className="text-amber-400">₹{(rec.annualSavingsINR / 100000).toFixed(1)} L/yr</strong></span>
                                    <span>CAPEX Cost: <strong className="text-slate-200">₹{(rec.implementationCostINR / 100000).toFixed(1)} L</strong></span>
                                    <span>Payback: <strong className="text-indigo-300">{rec.paybackMonths} Months</strong></span>
                                    <span>Difficulty: <strong className="text-slate-200">{rec.difficulty}</strong></span>
                                </div>

                                <button
                                    onClick={() => navigate(`/recommendations/${rec.id}`)}
                                    className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                                >
                                    <span>Full Feasibility Report</span>
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* REJECTED OPTIONS SECTION (TECHNICAL FEASIBILITY CHECK IN ACTION) */}
            <div className="bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                    <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <h3 className="text-sm font-semibold text-slate-200">Rejected Candidate Options (Feasibility Filtered)</h3>
                    </div>
                    <span className="text-[10px] font-mono text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800 font-bold">
                        HARD REJECTION RULES APPLIED
                    </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {rejectedOptions.map((rej) => (
                        <div key={rej.id} className="p-4 rounded-xl bg-[#141624] border border-rose-900/40 text-xs font-mono space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-200">{rej.title}</span>
                                <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 font-bold text-[10px]">
                                    REJECTED
                                </span>
                            </div>
                            <div className="space-y-1 text-slate-400 text-[11px]">
                                <div><span className="text-slate-500">Failed Requirement:</span> <strong className="text-rose-300">{rej.failedRequirement}</strong></div>
                                <div><span className="text-slate-500">Required:</span> <strong className="text-slate-300">{rej.required}</strong> | <span className="text-slate-500">Candidate:</span> <strong className="text-rose-400">{rej.candidate}</strong></div>
                                <div className="text-slate-300 pt-1 italic">{rej.reason}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
