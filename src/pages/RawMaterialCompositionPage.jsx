import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFactory } from '../context/FactoryContext';
import {
    Layers,
    Recycle,
    Check,
    AlertCircle,
    ArrowRight,
    IndianRupee,
    TrendingDown,
    PlusCircle,
    CheckCircle2,
    ShieldCheck
} from 'lucide-react';

export const RawMaterialCompositionPage = () => {
    const navigate = useNavigate();
    const { computedReport, dashboard, addToRoadmap, roadmap } = useFactory();

    const reportData = computedReport || {};
    const detailedMaterials = reportData.detailedMaterialAnalysis || [];

    return (
        <div className="space-y-8 font-sans pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-indigo-400 font-bold tracking-wider">Screen 2 of 3 — Raw Materials</span>
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/50">
                            COMPOSITION & ALTERNATES
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-1 tracking-tight">
                        Material Composition & Circular Alternatives
                    </h1>
                    <p className="text-sm text-slate-300 mt-1.5 max-w-3xl leading-relaxed">
                        Comprehensive factory raw material input composition breakdown, baseline emission shares, and curated sustainable circular alternatives with Pros and Cons.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/raw-materials/drivers')}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
                    >
                        ← Back: Drivers
                    </button>
                    <button
                        onClick={() => navigate('/raw-materials/comparison')}
                        className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                    >
                        <span>Next: Trade-off Comparison</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* RAW MATERIAL FACTORY COMPOSITION TABLE */}
            <div className="bg-[#101320] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                    <div>
                        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                            <Layers className="w-5 h-5 text-indigo-400" />
                            <span>Factory Raw Material Input Composition Table</span>
                        </h2>
                        <p className="text-xs text-slate-400">Current material consumption volumes, baseline carbon footprints, and budget allocation.</p>
                    </div>

                    <span className="text-xs font-mono text-indigo-300 bg-indigo-950 px-3 py-1 rounded border border-indigo-800/60 font-semibold">
                        {detailedMaterials.length} Materials Configured
                    </span>
                </div>

                {detailedMaterials.length === 0 ? (
                    <div className="p-8 text-center bg-[#0b0d14] rounded-xl border border-dashed border-slate-800 text-xs text-slate-400">
                        No materials configured in factory context. Please run 6-Step Setup Wizard first.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400 bg-[#0b0d14]">
                                    <th className="py-3 px-4">Rank & Material</th>
                                    <th className="py-3 px-4 text-right">Annual Quantity</th>
                                    <th className="py-3 px-4 text-right">Unit Price</th>
                                    <th className="py-3 px-4 text-right">Annual Budget</th>
                                    <th className="py-3 px-4 text-right">CO2 Emissions</th>
                                    <th className="py-3 px-4 text-right">Emission Share</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
                                {detailedMaterials.map((mat, idx) => (
                                    <tr key={idx} className="hover:bg-slate-900/40 transition-colors text-slate-200">
                                        <td className="py-3.5 px-4 font-sans font-bold flex items-center gap-2 text-slate-100">
                                            <span className="w-6 h-6 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-[11px] flex items-center justify-center font-mono">
                                                #{mat.rank || (idx + 1)}
                                            </span>
                                            <span>{mat.materialName}</span>
                                        </td>
                                        <td className="py-3.5 px-4 text-right text-emerald-400 font-bold">
                                            {mat.quantity?.toLocaleString()} {mat.unit || 'tonnes'}
                                        </td>
                                        <td className="py-3.5 px-4 text-right text-slate-300">
                                            ₹ {Number(mat.costPerUnit || 0).toLocaleString()} / {mat.unit || 'unit'}
                                        </td>
                                        <td className="py-3.5 px-4 text-right text-amber-400 font-bold">
                                            ₹ {((Number(mat.quantity || 0) * Number(mat.costPerUnit || 0)) / 100000).toFixed(1)} Lakhs
                                        </td>
                                        <td className="py-3.5 px-4 text-right text-rose-400 font-bold">
                                            {mat.emissionsTCO2e?.toLocaleString()} tCO2e
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60 text-[11px]">
                                                {mat.sharePercent}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* CURATED SUSTAINABLE ALTERNATIVES WITH PROS & CONS */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                        <Recycle className="w-5 h-5 text-emerald-400" />
                        <span>Curated Sustainable Circular Alternatives & Pros/Cons</span>
                    </h2>
                </div>

                {detailedMaterials.map((mat, mIdx) => (
                    <div key={mIdx} className="bg-[#101320] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800">
                                        Material #{mIdx + 1}
                                    </span>
                                    <h3 className="text-lg font-bold text-slate-100">{mat.materialName}</h3>
                                </div>
                                <span className="text-xs text-slate-400 block mt-1">
                                    Present Baseline: <strong className="text-rose-400">{mat.emissionsTCO2e?.toLocaleString()} tCO2e/yr</strong> ({mat.sharePercent}% of total)
                                </span>
                            </div>

                            <div className="text-right font-mono text-xs">
                                <span className="text-slate-400 block">Annual Volume</span>
                                <span className="text-emerald-400 font-bold text-sm">{mat.quantity?.toLocaleString()} {mat.unit || 'tonnes'}</span>
                            </div>
                        </div>

                        {/* Use Case Sections */}
                        {(mat.useCaseBreakdown || []).map((uc, uIdx) => (
                            <div key={uIdx} className="space-y-4 pt-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-950 px-3 py-1 rounded border border-indigo-800">
                                        Use Case Process: {uc.useCaseLabel}
                                    </span>
                                    <span className="text-xs font-mono text-slate-400">
                                        ({uc.alternatives?.length || 0} Alternatives Available)
                                    </span>
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    {(uc.alternatives || []).map((alt, aIdx) => {
                                        const isInRoadmap = roadmap && roadmap.some(r => r.id === alt.id);

                                        return (
                                            <div key={aIdx} className="bg-[#0b0d14] border border-slate-800 hover:border-indigo-500/60 rounded-xl p-5 space-y-4 shadow-md transition-all">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800 font-semibold">
                                                            {alt.source || '🟢 CURATED DATASET'}
                                                        </span>
                                                        <h4 className="text-base font-bold text-slate-100 mt-2">{alt.name}</h4>
                                                    </div>

                                                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded border border-emerald-700 shrink-0">
                                                        -{alt.co2ReductionPercent}% CO2
                                                    </span>
                                                </div>

                                                {/* Key Metrics */}
                                                <div className="grid grid-cols-2 gap-3 bg-[#121524] p-3.5 rounded-lg border border-slate-800/80 text-xs font-mono">
                                                    <div>
                                                        <span className="text-slate-400 block text-[11px]">CO2 Factor Shift</span>
                                                        <span className="text-rose-400 font-bold">{alt.presentCO2Factor}</span>
                                                        <span className="text-slate-500 mx-1">→</span>
                                                        <span className="text-emerald-400 font-bold">{alt.altCO2Factor} t/t</span>
                                                    </div>

                                                    <div>
                                                        <span className="text-slate-400 block text-[11px]">Annual CO2 Saved</span>
                                                        <span className="text-emerald-400 font-bold">{alt.co2SavedTCO2e?.toLocaleString()} tCO2e/yr</span>
                                                    </div>

                                                    <div>
                                                        <span className="text-slate-400 block text-[11px]">OPEX Cost Savings</span>
                                                        <span className="text-amber-400 font-bold">₹ {(alt.annualCostSavedINR / 100000).toFixed(1)} Lakhs/yr</span>
                                                    </div>

                                                    <div>
                                                        <span className="text-slate-400 block text-[11px]">Payback Period</span>
                                                        <span className="text-indigo-300 font-bold">{alt.paybackYears} Years</span>
                                                    </div>
                                                </div>

                                                {/* PROS & CONS */}
                                                <div className="space-y-3 pt-2 border-t border-slate-800/80">
                                                    <div>
                                                        <span className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-1 mb-1.5">
                                                            <Check className="w-4 h-4 text-emerald-400" /> Pros (Cost & Carbon Benefits)
                                                        </span>
                                                        <ul className="space-y-1">
                                                            {(alt.pros || []).map((pro, pIdx) => (
                                                                <li key={pIdx} className="text-xs text-slate-300 flex items-start gap-1.5 leading-normal">
                                                                    <span className="text-emerald-400 font-bold">•</span>
                                                                    <span>{pro}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <span className="text-xs font-mono font-bold uppercase text-rose-400 flex items-center gap-1 mb-1.5 mt-3">
                                                            <AlertCircle className="w-4 h-4 text-rose-400" /> Cons (CAPEX & Operational Considerations)
                                                        </span>
                                                        <ul className="space-y-1">
                                                            {(alt.cons || []).map((con, cIdx) => (
                                                                <li key={cIdx} className="text-xs text-slate-400 flex items-start gap-1.5 leading-normal">
                                                                    <span className="text-rose-400 font-bold">•</span>
                                                                    <span>{con}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Add to Roadmap */}
                                                <div className="pt-2 border-t border-slate-800/60 flex justify-end">
                                                    <button
                                                        onClick={() => addToRoadmap && addToRoadmap({ ...alt, materialName: mat.materialName })}
                                                        disabled={isInRoadmap}
                                                        className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${isInRoadmap
                                                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 cursor-default'
                                                            : 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/30'
                                                            }`}
                                                    >
                                                        {isInRoadmap ? (
                                                            <>
                                                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                                                <span>Added to Roadmap</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <PlusCircle className="w-4 h-4" />
                                                                <span>Add to Implementation Roadmap</span>
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
