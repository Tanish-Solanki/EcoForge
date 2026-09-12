import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFactory } from '../context/FactoryContext';
import {
    GitCompare,
    Leaf,
    DollarSign,
    Building2,
    CheckCircle2,
    ArrowRight,
    TrendingDown,
    Layers,
    PlusCircle
} from 'lucide-react';

export const RawMaterialComparisonPage = () => {
    const navigate = useNavigate();
    const { computedReport, addToRoadmap, roadmap } = useFactory();

    const reportData = computedReport || {};
    const detailedMaterials = reportData.detailedMaterialAnalysis || [];

    return (
        <div className="space-y-8 font-sans pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-indigo-400 font-bold tracking-wider">Screen 3 of 3 — Raw Materials</span>
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/50">
                            TRADE-OFF COMPARISON MATRIX
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-1 tracking-tight">
                        Alternatives Trade-Off Comparison
                    </h1>
                    <p className="text-sm text-slate-300 mt-1.5 max-w-3xl leading-relaxed">
                        Side-by-side evaluation of sustainable circular alternatives across three core pillars: <strong className="text-emerald-400">Carbon Impact</strong>, <strong className="text-amber-400">Price & OPEX Savings</strong>, and <strong className="text-indigo-400 font-semibold">Capital Investment (CAPEX)</strong>.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/raw-materials/composition')}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
                    >
                        ← Back: Composition
                    </button>
                    <button
                        onClick={() => navigate('/electricity')}
                        className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                    >
                        <span>Subtask 2: Electricity</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* THREE PILLAR SUMMARY BANNER */}
            <div className="grid md:grid-cols-3 gap-6 bg-[#101320] border border-slate-800 rounded-2xl p-6 shadow-xl">
                {/* Pillar 1: Carbon-Wise */}
                <div className="bg-[#0b0d14] p-5 rounded-xl border border-emerald-900/50 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs uppercase">
                        <Leaf className="w-4 h-4 text-emerald-400" />
                        <span>1. Carbon-Wise Evaluation</span>
                    </div>
                    <p className="text-xs text-slate-300">
                        Measures present CO2 factor vs alternative emission factor, annual tCO2e avoided, and percentage carbon footprint reduction.
                    </p>
                </div>

                {/* Pillar 2: Price-Wise */}
                <div className="bg-[#0b0d14] p-5 rounded-xl border border-amber-900/50 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-xs uppercase">
                        <DollarSign className="w-4 h-4 text-amber-400" />
                        <span>2. Price-Wise Evaluation</span>
                    </div>
                    <p className="text-xs text-slate-300">
                        Measures alternative raw material fuel unit price ($/t), annual OPEX cost savings (₹ Lakhs), and percentage cost reduction.
                    </p>
                </div>

                {/* Pillar 3: Capital Investment-Wise */}
                <div className="bg-[#0b0d14] p-5 rounded-xl border border-indigo-900/50 space-y-2">
                    <div className="flex items-center gap-2 text-indigo-400 font-mono font-bold text-xs uppercase">
                        <Building2 className="w-4 h-4 text-indigo-400" />
                        <span>3. Capital Investment-Wise</span>
                    </div>
                    <p className="text-xs text-slate-300">
                        Measures one-time equipment CAPEX ($k USD / ₹ Lakhs), installation complexity, and payback period in years.
                    </p>
                </div>
            </div>

            {/* COMPARISON MATRIX TABLE */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <GitCompare className="w-5 h-5 text-indigo-400" />
                    <span>Raw Material Alternatives Side-by-Side Comparison Matrix</span>
                </h2>

                {detailedMaterials.length === 0 ? (
                    <div className="p-8 text-center bg-[#0b0d14] rounded-2xl border border-dashed border-slate-800 text-xs text-slate-400">
                        No material analysis report available. Complete factory setup wizard to compare circular alternatives.
                    </div>
                ) : (
                    <div className="space-y-8">
                        {detailedMaterials.map((mat, mIdx) => (
                            <div key={mIdx} className="bg-[#101320] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                                    <div>
                                        <span className="text-xs font-mono text-indigo-300 bg-indigo-950 px-2.5 py-0.5 rounded border border-indigo-800 font-bold">
                                            Material #{mIdx + 1}
                                        </span>
                                        <h3 className="text-lg font-bold text-slate-100 mt-1">{mat.materialName}</h3>
                                    </div>
                                    <div className="text-right font-mono text-xs text-slate-400">
                                        Baseline Emissions: <strong className="text-rose-400">{mat.emissionsTCO2e?.toLocaleString()} tCO2e/yr</strong>
                                    </div>
                                </div>

                                {(mat.useCaseBreakdown || []).map((uc, uIdx) => (
                                    <div key={uIdx} className="space-y-4">
                                        <div className="text-xs font-mono font-bold text-slate-300 bg-[#0b0d14] px-3 py-1.5 rounded border border-slate-800 inline-block">
                                            Use Case Process: {uc.useCaseLabel}
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse min-w-[750px]">
                                                <thead>
                                                    <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400 bg-[#0b0d14]">
                                                        <th className="py-3 px-4">Alternative Pathway</th>
                                                        <th className="py-3 px-4 text-center bg-emerald-950/30 text-emerald-300 border-x border-emerald-900/40">
                                                            🌿 Carbon-Wise (tCO2e)
                                                        </th>
                                                        <th className="py-3 px-4 text-center bg-amber-950/30 text-amber-300 border-r border-amber-900/40">
                                                            💰 Price-Wise (Savings)
                                                        </th>
                                                        <th className="py-3 px-4 text-center bg-indigo-950/30 text-indigo-300">
                                                            🏗️ Capital-Wise (CAPEX)
                                                        </th>
                                                        <th className="py-3 px-4 text-right">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
                                                    {(uc.alternatives || []).map((alt, aIdx) => {
                                                        const isInRoadmap = roadmap && roadmap.some(r => r.id === alt.id);

                                                        return (
                                                            <tr key={aIdx} className="hover:bg-slate-900/50 transition-colors">
                                                                {/* Name */}
                                                                <td className="py-4 px-4 font-sans font-bold text-slate-100 max-w-xs">
                                                                    <div className="text-xs font-bold text-indigo-200">{alt.name}</div>
                                                                    <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{alt.source || 'Curated Dataset'}</span>
                                                                </td>

                                                                {/* Carbon-Wise */}
                                                                <td className="py-4 px-4 text-center bg-emerald-950/20 border-x border-emerald-900/30">
                                                                    <div className="text-emerald-400 font-bold">
                                                                        -{alt.co2ReductionPercent}% CO2
                                                                    </div>
                                                                    <span className="text-[11px] text-slate-300 block mt-0.5">
                                                                        Saves {alt.co2SavedTCO2e?.toLocaleString()} t/yr
                                                                    </span>
                                                                    <span className="text-[10px] text-slate-500 block">
                                                                        ({alt.presentCO2Factor} → {alt.altCO2Factor} t/t)
                                                                    </span>
                                                                </td>

                                                                {/* Price-Wise */}
                                                                <td className="py-4 px-4 text-center bg-amber-950/20 border-r border-amber-900/30">
                                                                    <div className="text-amber-400 font-bold">
                                                                        ₹ {(alt.annualCostSavedINR / 100000).toFixed(1)} Lakhs/yr
                                                                    </div>
                                                                    <span className="text-[11px] text-slate-300 block mt-0.5">
                                                                        Fuel: ${alt.altFuelPriceUSD || 0}/unit
                                                                    </span>
                                                                </td>

                                                                {/* Capital-Wise */}
                                                                <td className="py-4 px-4 text-center bg-indigo-950/20">
                                                                    <div className="text-indigo-300 font-bold">
                                                                        {alt.capexUSDk > 0 ? `$${alt.capexUSDk}k CAPEX` : 'Zero Equipment CAPEX'}
                                                                    </div>
                                                                    <span className="text-[11px] text-emerald-400 font-semibold block mt-0.5">
                                                                        Payback: {alt.paybackYears} Years
                                                                    </span>
                                                                </td>

                                                                {/* Action */}
                                                                <td className="py-4 px-4 text-right">
                                                                    <button
                                                                        onClick={() => addToRoadmap && addToRoadmap({ ...alt, materialName: mat.materialName })}
                                                                        disabled={isInRoadmap}
                                                                        className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${isInRoadmap
                                                                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                                                                            : 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/30'
                                                                            }`}
                                                                    >
                                                                        {isInRoadmap ? 'Added' : 'Select Alt'}
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
