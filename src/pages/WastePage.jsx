import React from 'react';
import { useFactory } from '../context/FactoryContext';
import { Recycle, ArrowRight, CheckCircle2, Trash2, Layers, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const WastePage = () => {
    const { waste } = useFactory();
    const navigate = useNavigate();

    if (!waste) return null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider">Closed-Loop Material Economy</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                            64% DIVERSION RATE
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-0.5 tracking-tight">Circularity & Waste</h1>
                    <p className="text-xs text-slate-400 mt-1">Material scrap flow tracking, landfill diversion, and regrind recovery opportunities.</p>
                </div>

                <button
                    onClick={() => navigate('/recommendations')}
                    className="px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-mono font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-950"
                >
                    <span>Regrind Recommendations</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            {/* THREE PRIMARY METRICS */}
            <div className="grid md:grid-cols-3 gap-6 font-mono">
                <div className="p-5 rounded-2xl bg-[#101320] border border-slate-800/80 shadow-xl">
                    <span className="text-xs text-slate-400 uppercase">Total Waste Generated</span>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-100">{waste.totalWasteGeneratedTonnes}</span>
                        <span className="text-xs text-slate-400">tonnes/yr</span>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-2 block">6.0% of total polymer throughput</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#101320] border border-slate-800/80 shadow-xl">
                    <span className="text-xs text-emerald-400 font-semibold uppercase">Waste Diverted</span>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-emerald-400">{waste.wasteDivertedTonnes}</span>
                        <span className="text-xs text-slate-400">tonnes/yr</span>
                    </div>
                    <span className="text-[11px] text-emerald-300 font-semibold mt-2 block">Reused in-house or recycled externally</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#101320] border border-slate-800/80 shadow-xl">
                    <span className="text-xs text-indigo-400 font-semibold uppercase">Circularity Diversion Rate</span>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-indigo-300">{waste.diversionRatePercent}%</span>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-2 block">Target: 80% by FY 2026</span>
                </div>
            </div>

            {/* CLEAN MATERIAL FLOW DIAGRAM */}
            <div className="bg-[#101320] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
                <span className="text-xs font-mono uppercase text-indigo-300 font-semibold tracking-wider block">
                    Closed-Loop Material Flow Diagram
                </span>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                    <div className="p-4 rounded-xl bg-[#141726] border border-slate-700 text-center font-mono">
                        <span className="text-[10px] text-slate-400 uppercase">Production Input</span>
                        <p className="text-lg font-bold text-slate-200 mt-1">3,050 Tonnes</p>
                        <span className="text-[10px] text-slate-400">Raw Virgin Resins</span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#141726] border border-amber-800/50 text-center font-mono">
                        <span className="text-[10px] text-amber-400 uppercase">Process Scrap</span>
                        <p className="text-lg font-bold text-amber-300 mt-1">184 Tonnes</p>
                        <span className="text-[10px] text-amber-400/80">6.0% Scrap Rate</span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#141726] border border-emerald-800/50 text-center font-mono">
                        <span className="text-[10px] text-emerald-400 uppercase">In-House Reused</span>
                        <p className="text-lg font-bold text-emerald-400 mt-1">72 Tonnes</p>
                        <span className="text-[10px] text-emerald-300/80">Direct Granulated</span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#141726] border border-rose-900/50 text-center font-mono">
                        <span className="text-[10px] text-rose-400 uppercase">Landfill Disposal</span>
                        <p className="text-lg font-bold text-rose-400 mt-1">66 Tonnes</p>
                        <span className="text-[10px] text-rose-400/80">78 tCO2e Impact</span>
                    </div>
                </div>
            </div>

            {/* SCRAP STREAM BREAKDOWN TABLE */}
            <div className="bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
                <h3 className="text-sm font-semibold text-slate-200 pb-3 border-b border-slate-800/60">
                    Scrap Generation & End-of-Life Destination
                </h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse font-mono text-xs">
                        <thead>
                            <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase bg-[#0b0d14]">
                                <th className="py-2.5 px-3">Material Stream</th>
                                <th className="py-2.5 px-3">Generated (t)</th>
                                <th className="py-2.5 px-3">In-House Reused (t)</th>
                                <th className="py-2.5 px-3">Recycled (t)</th>
                                <th className="py-2.5 px-3">Landfill (t)</th>
                                <th className="py-2.5 px-3">CO2 Impact (tCO2e)</th>
                                <th className="py-2.5 px-3 text-right">Disposal Cost</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                            {waste.wasteStreamBreakdown.map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-900/40">
                                    <td className="py-3 px-3 font-semibold text-slate-200">{row.type}</td>
                                    <td className="py-3 px-3 text-slate-300">{row.generated}</td>
                                    <td className="py-3 px-3 text-emerald-400 font-bold">{row.reused}</td>
                                    <td className="py-3 px-3 text-indigo-300">{row.recycled}</td>
                                    <td className="py-3 px-3 text-rose-400 font-bold">{row.disposed}</td>
                                    <td className="py-3 px-3 text-amber-400">{row.co2Impact} t</td>
                                    <td className="py-3 px-3 text-right font-bold text-slate-200">
                                        ₹{(row.costINR / 100000).toFixed(2)} L
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CIRCULAR RECOMMENDATIONS */}
            <div className="bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
                <h3 className="text-sm font-semibold text-slate-200 pb-3 border-b border-slate-800/60">
                    Circularity & Value Recovery Actions
                </h3>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
                    {waste.recommendations.map((rec, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-[#141726] border border-slate-800 flex items-start gap-2.5">
                            <Recycle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                            <span className="text-slate-300">{rec}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
