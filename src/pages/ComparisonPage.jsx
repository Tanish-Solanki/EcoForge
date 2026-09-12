import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFactory } from '../context/FactoryContext';
import {
    GitCompare,
    CheckCircle2,
    Trophy,
    PlusCircle,
    ArrowRight,
    ShieldCheck,
    TrendingDown,
    Sparkles
} from 'lucide-react';

export const ComparisonPage = () => {
    const navigate = useNavigate();
    const { recommendations, addToRoadmap, roadmap } = useFactory();

    // Select top 4 recommendations for comparison matrix
    const compareItems = recommendations.slice(0, 4);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-indigo-400 font-semibold tracking-wider">Multi-Criteria Decision Matrix</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                            CARBON-FIRST HIGHLIGHT ACTIVE
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-0.5 tracking-tight">Intervention Comparison</h1>
                    <p className="text-xs text-slate-400 mt-1">Side-by-side trade-off matrix across CO2 impact, feasibility, payback, and cost.</p>
                </div>

                <button
                    onClick={() => navigate('/simulator')}
                    className="px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-950 flex items-center gap-2 border border-indigo-500/30 transition-all hover:scale-105"
                >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Simulate Scenarios</span>
                </button>
            </div>

            {/* HIGHLIGHTED CARBON-FIRST BEST OPTION BANNER */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-[#101524] to-[#0e101b] border border-emerald-600/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-900/80 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0 shadow-lg">
                        <Trophy className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                        <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest block">
                            Optimal Carbon-First Choice
                        </span>
                        <h3 className="text-sm font-bold text-slate-100 mt-0.5">{compareItems[0]?.title}</h3>
                        <p className="text-[11px] text-slate-300 font-sans mt-0.5">
                            Delivers maximum CO2 reduction (84 tCO2e/yr) with 96% technical compatibility and sub-year payback.
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => addToRoadmap(compareItems[0])}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shrink-0 shadow-md shadow-emerald-950 flex items-center gap-1.5 transition-all hover:scale-105"
                >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add Best Option to Roadmap</span>
                </button>
            </div>

            {/* SIDE-BY-SIDE COMPARISON MATRIX TABLE */}
            <div className="bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl overflow-x-auto">
                <table className="w-full text-left border-collapse font-mono text-xs">
                    <thead>
                        <tr className="border-b border-slate-800 bg-[#0b0d14]">
                            <th className="py-4 px-4 text-slate-400 uppercase text-[11px] min-w-[180px]">Evaluation Metric</th>
                            {compareItems.map((item, idx) => (
                                <th key={item.id} className="py-4 px-4 min-w-[200px]">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[10px] text-indigo-400 font-bold">OPTION 0{idx + 1}</span>
                                        {idx === 0 && (
                                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                                                BEST CO2
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs font-bold text-slate-100 line-clamp-2">{item.title}</span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                        {/* Row 1: CO2 Reduction */}
                        <tr className="bg-emerald-950/20">
                            <td className="py-3.5 px-4 font-bold text-emerald-400 uppercase">CO2 Reduction (tCO2e/yr)</td>
                            {compareItems.map((item, idx) => (
                                <td key={item.id} className="py-3.5 px-4">
                                    <span className={`text-base font-bold ${idx === 0 ? 'text-emerald-400' : 'text-slate-200'}`}>
                                        -{item.co2ReductionTCO2e} t
                                    </span>
                                </td>
                            ))}
                        </tr>

                        {/* Row 2: Technical Feasibility */}
                        <tr>
                            <td className="py-3.5 px-4 text-slate-400">Technical Feasibility</td>
                            {compareItems.map((item) => (
                                <td key={item.id} className="py-3.5 px-4">
                                    <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-[11px] font-bold">
                                        {item.feasibilityScore}% Pass
                                    </span>
                                </td>
                            ))}
                        </tr>

                        {/* Row 3: Annual Savings */}
                        <tr>
                            <td className="py-3.5 px-4 text-slate-400">Annual Savings (OPEX)</td>
                            {compareItems.map((item) => (
                                <td key={item.id} className="py-3.5 px-4 text-amber-400 font-bold">
                                    ₹{(item.annualSavingsINR / 100000).toFixed(1)} L/yr
                                </td>
                            ))}
                        </tr>

                        {/* Row 4: Implementation Cost */}
                        <tr>
                            <td className="py-3.5 px-4 text-slate-400">CAPEX Investment Cost</td>
                            {compareItems.map((item) => (
                                <td key={item.id} className="py-3.5 px-4 text-slate-200">
                                    ₹{(item.implementationCostINR / 100000).toFixed(1)} L
                                </td>
                            ))}
                        </tr>

                        {/* Row 5: Payback Period */}
                        <tr>
                            <td className="py-3.5 px-4 text-slate-400">Payback Period</td>
                            {compareItems.map((item) => (
                                <td key={item.id} className="py-3.5 px-4 text-indigo-300 font-bold">
                                    {item.paybackMonths} Months
                                </td>
                            ))}
                        </tr>

                        {/* Row 6: Implementation Difficulty */}
                        <tr>
                            <td className="py-3.5 px-4 text-slate-400">Implementation Effort</td>
                            {compareItems.map((item) => (
                                <td key={item.id} className="py-3.5 px-4 text-slate-300">
                                    {item.difficulty || 'Medium'}
                                </td>
                            ))}
                        </tr>

                        {/* Row 7: Action */}
                        <tr className="bg-[#0b0d14]">
                            <td className="py-4 px-4 text-slate-400">Action Roadmap Toggle</td>
                            {compareItems.map((item) => {
                                const inRoadmap = roadmap.some(r => r.recId === item.id || r.title === item.title);
                                return (
                                    <td key={item.id} className="py-4 px-4">
                                        <button
                                            onClick={() => addToRoadmap(item)}
                                            disabled={inRoadmap}
                                            className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-colors ${inRoadmap
                                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 cursor-default'
                                                : 'bg-indigo-700 hover:bg-indigo-600 text-white font-semibold'
                                                }`}
                                        >
                                            {inRoadmap ? 'Added' : '+ Add Action'}
                                        </button>
                                    </td>
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
