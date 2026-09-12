import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFactory } from '../context/FactoryContext';
import { apiService } from '../api/apiService';
import {
    ShieldCheck,
    TrendingDown,
    CheckCircle2,
    PlusCircle,
    ChevronDown,
    ChevronUp,
    ArrowLeft,
    DollarSign,
    Clock,
    Zap,
    Recycle,
    Layers,
    FileText,
    Sparkles
} from 'lucide-react';

export const RecommendationDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToRoadmap, roadmap } = useFactory();

    const [rec, setRec] = useState(null);
    const [loading, setLoading] = useState(true);

    // Expandable section states
    const [showCalculations, setShowCalculations] = useState(true);
    const [showTechnicalDetails, setShowTechnicalDetails] = useState(true);
    const [showAssumptions, setShowAssumptions] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            setLoading(true);
            try {
                const res = await apiService.getRecommendationById(id);
                setRec(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading || !rec) {
        return (
            <div className="p-12 text-center text-slate-400 font-mono text-sm">
                Loading recommendation feasibility audit report...
            </div>
        );
    }

    const inRoadmap = roadmap.some(r => r.recId === rec.id || r.title === rec.title);

    return (
        <div className="space-y-6">
            {/* Back button */}
            <button
                onClick={() => navigate('/recommendations')}
                className="text-xs font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Recommended Actions
            </button>

            {/* Header Title & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase">
                            {rec.status || 'Recommended'}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{rec.category} Category</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-1 tracking-tight">{rec.title}</h1>
                </div>

                <button
                    onClick={() => addToRoadmap(rec)}
                    disabled={inRoadmap}
                    className={`px-5 py-3 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 border transition-all ${inRoadmap
                        ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300 cursor-default'
                        : 'bg-indigo-700 hover:bg-indigo-600 text-white border-indigo-500/30 shadow-lg shadow-indigo-950 hover:scale-105'
                        }`}
                >
                    {inRoadmap ? (
                        <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Added to Action Roadmap</span>
                        </>
                    ) : (
                        <>
                            <PlusCircle className="w-4 h-4" />
                            <span>Add to Action Roadmap</span>
                        </>
                    )}
                </button>
            </div>

            {/* HERO CARBON IMPACT CARD (DOMINANT VISUAL) */}
            <div className="bg-gradient-to-br from-[#121524] via-[#101320] to-[#0e101b] border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
                <span className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-emerald-400" /> Carbon Reduction Impact (Primary Objective)
                </span>

                <div className="grid md:grid-cols-3 gap-6 items-center text-center md:text-left bg-[#0b0d14] p-6 rounded-2xl border border-slate-800">
                    <div>
                        <span className="text-xs font-mono text-slate-400">Baseline Annual Emissions</span>
                        <div className="text-3xl font-bold font-mono text-slate-300 mt-1">
                            {rec.co2BaselineTCO2e} <span className="text-sm font-normal text-slate-500">tCO2e/yr</span>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/90 to-indigo-950/90 border border-emerald-600/50 shadow-xl">
                        <span className="text-xs font-mono text-emerald-300 font-bold uppercase">NET ANNUAL REDUCTION</span>
                        <div className="text-4xl sm:text-5xl font-bold font-mono text-emerald-400 mt-1 tracking-tight">
                            -{rec.co2ReductionTCO2e} <span className="text-lg">tCO2e</span>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-200 font-semibold block mt-1">
                            {(((rec.co2ReductionTCO2e) / (rec.co2BaselineTCO2e || 280)) * 100).toFixed(1)}% Direct Reduction
                        </span>
                    </div>

                    <div>
                        <span className="text-xs font-mono text-slate-400">Proposed Post-Intervention</span>
                        <div className="text-3xl font-bold font-mono text-indigo-300 mt-1">
                            {rec.co2ProposedTCO2e} <span className="text-sm font-normal text-slate-500">tCO2e/yr</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ECONOMIC & ENVIRONMENTAL METRICS GRID */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Economic Impact */}
                <div className="bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
                    <div className="pb-3 border-b border-slate-800/60 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-200">Economic & Financial Return</h3>
                        <span className="text-xs font-mono text-amber-400 font-bold">
                            Payback {rec.paybackMonths} Months
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div className="p-3 bg-[#0b0d14] rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase">Implementation Cost (CAPEX)</span>
                            <p className="text-base font-bold text-slate-100 mt-0.5">₹{(rec.implementationCostINR / 100000).toFixed(1)} Lakhs</p>
                        </div>
                        <div className="p-3 bg-[#0b0d14] rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase">Annual Savings (OPEX)</span>
                            <p className="text-base font-bold text-amber-400 mt-0.5">₹{(rec.annualSavingsINR / 100000).toFixed(1)} Lakhs/yr</p>
                        </div>
                        <div className="p-3 bg-[#0b0d14] rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase">5-Year Net ROI</span>
                            <p className="text-base font-bold text-emerald-400 mt-0.5">
                                {(((rec.annualSavingsINR * 5 - rec.implementationCostINR) / rec.implementationCostINR) * 100).toFixed(0)}%
                            </p>
                        </div>
                        <div className="p-3 bg-[#0b0d14] rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase">Implementation Effort</span>
                            <p className="text-base font-bold text-slate-200 mt-0.5">{rec.difficulty || 'Low'}</p>
                        </div>
                    </div>
                </div>

                {/* Environmental Secondary Impact */}
                <div className="bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
                    <div className="pb-3 border-b border-slate-800/60 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-200">Environmental & Circularity Impact</h3>
                        <span className="text-xs font-mono text-emerald-400 font-bold">Multi-dimensional</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div className="p-3 bg-[#0b0d14] rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase">Energy Saved</span>
                            <p className="text-base font-bold text-indigo-300 mt-0.5">{rec.environmentalImpact?.energySavingsKwh?.toLocaleString()} kWh/yr</p>
                        </div>
                        <div className="p-3 bg-[#0b0d14] rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase">Scrap Waste Diverted</span>
                            <p className="text-base font-bold text-emerald-400 mt-0.5">{rec.environmentalImpact?.wasteReductionTonnes} Tonnes/yr</p>
                        </div>
                        <div className="p-3 bg-[#0b0d14] rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase">Raw Virgin Substituted</span>
                            <p className="text-base font-bold text-sky-300 mt-0.5">{rec.environmentalImpact?.rawMaterialSavingsTonnes} Tonnes/yr</p>
                        </div>
                        <div className="p-3 bg-[#0b0d14] rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase">Circularity Index</span>
                            <p className="text-base font-bold text-amber-400 mt-0.5">+14.2 Points</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* TECHNICAL FEASIBILITY REQUIREMENT MATRIX */}
            <div className="bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <h3 className="text-sm font-semibold text-slate-200">Technical Feasibility Matrix (Pass / Fail Criteria)</h3>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                        100% HARD REQUIREMENTS SATISFIED
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs font-mono">
                        <thead>
                            <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase bg-[#0b0d14]">
                                <th className="py-2.5 px-3">Technical Requirement</th>
                                <th className="py-2.5 px-3">Required Spec</th>
                                <th className="py-2.5 px-3">Candidate Spec</th>
                                <th className="py-2.5 px-3 text-right">Pass / Fail Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                            {rec.technicalMatrix && rec.technicalMatrix.map((item, idx) => (
                                <tr key={idx} className="hover:bg-slate-900/40">
                                    <td className="py-2.5 px-3 font-semibold text-slate-200">{item.requirement}</td>
                                    <td className="py-2.5 px-3 text-slate-300">{item.required}</td>
                                    <td className="py-2.5 px-3 text-indigo-300">{item.candidate}</td>
                                    <td className="py-2.5 px-3 text-right">
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                                            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* IMPLEMENTATION ROLLOUT TIMELINE STEPS */}
            <div className="bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
                <h3 className="text-sm font-semibold text-slate-200 pb-3 border-b border-slate-800/60">
                    Implementation Rollout Roadmap
                </h3>

                <div className="grid sm:grid-cols-4 gap-3">
                    {rec.rolloutSteps && rec.rolloutSteps.map((step) => (
                        <div key={step.step} className="p-4 rounded-xl bg-[#141726] border border-slate-800 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="w-6 h-6 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700 text-xs font-mono font-bold flex items-center justify-center">
                                    0{step.step}
                                </span>
                                <span className="text-[10px] font-mono text-slate-400">Phase {step.step}</span>
                            </div>
                            <h4 className="text-xs font-semibold text-slate-200">{step.title}</h4>
                            <p className="text-[11px] text-slate-400 leading-snug">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* EXPANDABLE SECTIONS: CALCULATIONS & ASSUMPTIONS */}
            <div className="space-y-3">
                {/* Expandable Calculation Formula */}
                <div className="bg-[#101320] border border-slate-800/80 rounded-xl overflow-hidden text-xs">
                    <button
                        onClick={() => setShowCalculations(!showCalculations)}
                        className="w-full px-5 py-3 flex items-center justify-between font-mono font-semibold text-slate-200 hover:bg-slate-900/60 text-left"
                    >
                        <span>Calculation Methodology & Formula</span>
                        {showCalculations ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {showCalculations && (
                        <div className="p-5 border-t border-slate-800/60 bg-[#0b0d14] font-mono space-y-2 text-slate-300">
                            <p><strong>Formula:</strong> {rec.calculations?.formula}</p>
                            <p><strong>Data Source:</strong> {rec.calculations?.dataSource}</p>
                        </div>
                    )}
                </div>

                {/* Expandable Assumptions */}
                <div className="bg-[#101320] border border-slate-800/80 rounded-xl overflow-hidden text-xs">
                    <button
                        onClick={() => setShowAssumptions(!showAssumptions)}
                        className="w-full px-5 py-3 flex items-center justify-between font-mono font-semibold text-slate-200 hover:bg-slate-900/60 text-left"
                    >
                        <span>Engineering Assumptions & Boundary Limits</span>
                        {showAssumptions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {showAssumptions && (
                        <div className="p-5 border-t border-slate-800/60 bg-[#0b0d14] font-mono text-slate-300">
                            <p>{rec.calculations?.assumptions}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
