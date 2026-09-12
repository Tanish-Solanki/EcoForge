import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFactory } from '../context/FactoryContext';
import {
    Flame,
    AlertTriangle,
    ArrowRight,
    ChevronRight,
    X,
    Sparkles,
    GitBranch
} from 'lucide-react';

export const HotspotsPage = () => {
    const navigate = useNavigate();
    const { hotspots } = useFactory();
    const [selectedHotspot, setSelectedHotspot] = useState(null);

    if (!hotspots || !hotspots.length) return null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider">Root Cause Diagnostics</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/40">
                            6 HOTSPOTS IDENTIFIED
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-0.5 tracking-tight">Emission Hotspots</h1>
                    <p className="text-xs text-slate-400 mt-1">Identify where the greatest carbon reduction opportunities exist.</p>
                </div>

                <button
                    onClick={() => navigate('/recommendations')}
                    className="px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-950 flex items-center gap-2 border border-indigo-500/30 transition-all hover:scale-105"
                >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate Solutions Engine</span>
                </button>
            </div>

            {/* HOTSPOTS GRID */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotspots.map((hs) => {
                    const isCritical = hs.severity === 'Critical';
                    const isHigh = hs.severity === 'High';

                    return (
                        <div
                            key={hs.id}
                            className={`bg-[#101320] border rounded-2xl p-5 shadow-xl flex flex-col justify-between transition-all hover:border-indigo-500/50 ${isCritical
                                ? 'border-rose-800/50 hover:shadow-rose-950/20'
                                : isHigh
                                    ? 'border-amber-800/50 hover:shadow-amber-950/20'
                                    : 'border-slate-800/80'
                                }`}
                        >
                            <div>
                                {/* Severity & Category header */}
                                <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-3">
                                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${isCritical
                                        ? 'bg-rose-950 text-rose-300 border-rose-800'
                                        : isHigh
                                            ? 'bg-amber-950 text-amber-300 border-amber-800'
                                            : 'bg-slate-900 text-slate-300 border-slate-700'
                                        }`}>
                                        {hs.severity} SEVERITY
                                    </span>
                                    <span className="text-[11px] font-mono text-slate-400">{hs.category}</span>
                                </div>

                                <h3 className="text-base font-semibold text-slate-100 leading-snug">{hs.title}</h3>

                                {/* Emissions & Percentage */}
                                <div className="mt-4 flex items-baseline justify-between bg-[#0b0d14] p-3 rounded-xl border border-slate-800">
                                    <div>
                                        <span className="text-2xl font-bold font-mono text-slate-100">{hs.emissionsTCO2e}</span>
                                        <span className="text-xs font-mono text-slate-400 ml-1">tCO2e/yr</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-mono font-bold text-amber-400">{hs.percentOfTotal}%</span>
                                        <p className="text-[10px] text-slate-400 font-mono">of total factory</p>
                                    </div>
                                </div>

                                {/* Probable Cause */}
                                <div className="mt-3 text-xs">
                                    <span className="text-slate-400 font-mono text-[10px] uppercase">Probable Root Cause:</span>
                                    <p className="text-slate-300 mt-0.5 leading-snug line-clamp-2">{hs.probableCause}</p>
                                </div>
                            </div>

                            {/* Reduction Potential & Action Button */}
                            <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] font-mono text-slate-400 uppercase">Reduction Potential</span>
                                    <p className="text-sm font-bold font-mono text-emerald-400">-{hs.reductionPotentialTCO2e} tCO2e/yr</p>
                                </div>

                                <button
                                    onClick={() => setSelectedHotspot(hs)}
                                    className="px-3.5 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-200 text-xs font-mono border border-indigo-700/50 flex items-center gap-1.5 transition-colors"
                                >
                                    <span>Investigate</span>
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* HOTSPOT DETAIL INVESTIGATION MODAL */}
            {selectedHotspot && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-[#101320] border border-slate-700/80 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold uppercase">
                                        {selectedHotspot.severity} SEVERITY
                                    </span>
                                    <span className="text-xs font-mono text-slate-400">{selectedHotspot.category}</span>
                                </div>
                                <h2 className="text-xl font-bold text-slate-100 mt-1">{selectedHotspot.title}</h2>
                            </div>
                            <button
                                onClick={() => setSelectedHotspot(null)}
                                className="p-1 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Metrics Breakdown */}
                        <div className="grid sm:grid-cols-3 gap-4 bg-[#0b0d14] p-4 rounded-xl border border-slate-800 text-center font-mono">
                            <div>
                                <span className="text-[10px] text-slate-400 uppercase">Annual Footprint</span>
                                <p className="text-xl font-bold text-slate-100">{selectedHotspot.emissionsTCO2e} tCO2e</p>
                            </div>
                            <div>
                                <span className="text-[10px] text-slate-400 uppercase">Share of Factory</span>
                                <p className="text-xl font-bold text-amber-400">{selectedHotspot.percentOfTotal}%</p>
                            </div>
                            <div>
                                <span className="text-[10px] text-slate-400 uppercase">Actionable Reduction</span>
                                <p className="text-xl font-bold text-emerald-400">-{selectedHotspot.reductionPotentialTCO2e} tCO2e/yr</p>
                            </div>
                        </div>

                        {/* ROOT CAUSE DIAGNOSTIC CHAIN */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <GitBranch className="w-4 h-4 text-indigo-400" />
                                <h3 className="text-xs font-mono uppercase text-indigo-300 font-semibold tracking-wider">
                                    Root Cause Diagnostic Chain
                                </h3>
                            </div>

                            <div className="space-y-2 bg-[#141726] p-4 rounded-xl border border-slate-800">
                                {selectedHotspot.causeChain ? (
                                    selectedHotspot.causeChain.map((node, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 text-[10px] font-mono flex items-center justify-center font-bold shrink-0">
                                                0{i + 1}
                                            </div>
                                            <div className="flex-1 text-xs">
                                                <span className="font-semibold text-slate-200">{node.step}:</span>
                                                <span className="text-slate-400 ml-1.5">{node.text}</span>
                                            </div>
                                            {i < selectedHotspot.causeChain.length - 1 && (
                                                <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden sm:block shrink-0" />
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-slate-400">{selectedHotspot.probableCause}</p>
                                )}
                            </div>
                        </div>

                        {/* Actions CTA */}
                        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                            <button
                                onClick={() => setSelectedHotspot(null)}
                                className="px-4 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                            >
                                Close
                            </button>

                            <button
                                onClick={() => {
                                    setSelectedHotspot(null);
                                    navigate('/recommendations');
                                }}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-950 flex items-center gap-2 transition-all hover:scale-105"
                            >
                                <Sparkles className="w-4 h-4" />
                                <span>Generate Solutions For This Hotspot</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
