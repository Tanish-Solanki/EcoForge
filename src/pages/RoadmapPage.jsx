import React, { useState } from 'react';
import { useFactory } from '../context/FactoryContext';
import {
    Calendar,
    CheckCircle2,
    Clock,
    Trash2,
    Download,
    Plus,
    ArrowRight,
    TrendingDown,
    ShieldCheck,
    Sparkles,
    ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RoadmapPage = () => {
    const navigate = useNavigate();
    const { roadmap, updateRoadmapAction, removeFromRoadmap, roadmapStats, addToRoadmap } = useFactory();

    const [activeStatusFilter, setActiveStatusFilter] = useState('All');
    const [showAddModal, setShowAddModal] = useState(false);
    const [customTitle, setCustomTitle] = useState('');
    const [customCategory, setCustomCategory] = useState('Process');
    const [customCO2, setCustomCO2] = useState('25');
    const [customCost, setCustomCost] = useState('150000');

    const quarters = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026'];

    const handleAddCustom = (e) => {
        e.preventDefault();
        if (!customTitle.trim()) return;

        addToRoadmap({
            id: `custom-${Date.now()}`,
            title: customTitle,
            category: customCategory,
            co2ReductionTCO2e: Number(customCO2),
            implementationCostINR: Number(customCost),
            annualSavingsINR: Number(customCost) * 0.8,
            paybackMonths: 14,
            targetQuarter: 'Q2 2026'
        });

        setCustomTitle('');
        setShowAddModal(false);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider">Decarbonization Execution</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                            {roadmap.length} ACTIONS SCHEDULED
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-0.5 tracking-tight">Action Roadmap</h1>
                    <p className="text-xs text-slate-400 mt-1">Staged execution roadmap balancing quick wins and major engineering shifts.</p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-3.5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-mono font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-950"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Action</span>
                    </button>

                    <button
                        onClick={() => alert("Generating Roadmap Action Plan PDF report...")}
                        className="px-3.5 py-2 rounded-xl bg-[#141724] hover:bg-[#1a1e30] text-slate-200 text-xs font-mono border border-slate-700 flex items-center gap-1.5"
                    >
                        <Download className="w-4 h-4 text-indigo-400" />
                        <span>Export Roadmap</span>
                    </button>
                </div>
            </div>

            {/* CUMULATIVE IMPACT TRACKER HERO BANNER */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-gradient-to-br from-[#121524] via-[#101320] to-[#0e101b] border border-slate-800/80 shadow-2xl font-mono">
                <div className="p-4 bg-[#0b0d14] rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">Cumulative CO2 Saved</span>
                    <p className="text-2xl sm:text-3xl font-bold text-emerald-400 mt-1">
                        -{roadmapStats.totalCO2Saved} <span className="text-xs font-normal text-slate-400">tCO2e/yr</span>
                    </p>
                    <span className="text-[10px] text-emerald-300 font-semibold mt-1 block">
                        {((roadmapStats.totalCO2Saved / 1284) * 100).toFixed(1)}% Factory CO2 Shift
                    </span>
                </div>

                <div className="p-4 bg-[#0b0d14] rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">Total CAPEX Investment</span>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
                        ₹{(roadmapStats.totalCost / 100000).toFixed(1)} <span className="text-xs font-normal text-slate-400">Lakhs</span>
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">Capital allocation</span>
                </div>

                <div className="p-4 bg-[#0b0d14] rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">Annual OPEX Savings</span>
                    <p className="text-2xl sm:text-3xl font-bold text-amber-400 mt-1">
                        ₹{(roadmapStats.totalSavings / 100000).toFixed(1)} <span className="text-xs font-normal text-slate-400">L/yr</span>
                    </p>
                    <span className="text-[10px] text-amber-400/80 mt-1 block">Value capture</span>
                </div>

                <div className="p-4 bg-[#0b0d14] rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">Combined Payback</span>
                    <p className="text-2xl sm:text-3xl font-bold text-indigo-300 mt-1">
                        {roadmapStats.averagePaybackMonths} <span className="text-xs font-normal text-slate-400">Months</span>
                    </p>
                    <span className="text-[10px] text-indigo-300/80 mt-1 block">Sub-year return</span>
                </div>
            </div>

            {/* STAGED TIMELINE BY QUARTERS */}
            <div className="space-y-6">
                {quarters.map((qtr) => {
                    const qtrActions = roadmap.filter(item => item.targetQuarter === qtr);

                    return (
                        <div key={qtr} className="bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-700 text-indigo-300 font-mono font-bold text-xs flex items-center justify-center">
                                        {qtr.split(' ')[0]}
                                    </span>
                                    <div>
                                        <h3 className="text-base font-bold text-slate-100">{qtr} Execution Phase</h3>
                                        <p className="text-xs text-slate-400">{qtrActions.length} Actions Scheduled</p>
                                    </div>
                                </div>

                                <div className="text-right font-mono text-xs hidden sm:block">
                                    <span className="text-emerald-400 font-bold">
                                        -{qtrActions.reduce((sum, a) => sum + (a.co2ReductionTCO2e || 0), 0)} tCO2e/yr
                                    </span>
                                </div>
                            </div>

                            {/* Actions List in Quarter */}
                            {qtrActions.length === 0 ? (
                                <div className="py-6 text-center text-xs font-mono text-slate-500 border border-dashed border-slate-800 rounded-xl">
                                    No actions scheduled for {qtr}. Click "Add Action" or move recommendations here.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {qtrActions.map((action) => (
                                        <div
                                            key={action.id}
                                            className="p-4 rounded-xl bg-[#141726] border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                                        >
                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${action.status === 'Completed'
                                                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                                            : action.status === 'In Progress'
                                                                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                                                : 'bg-slate-900 text-slate-300 border border-slate-700'
                                                        }`}>
                                                        {action.status || 'Planned'}
                                                    </span>
                                                    <span className="text-xs font-mono text-slate-400">{action.category}</span>
                                                </div>

                                                <h4 className="text-sm font-semibold text-slate-200">{action.title}</h4>
                                            </div>

                                            <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
                                                <div className="text-right">
                                                    <span className="text-sm font-bold text-emerald-400">-{action.co2ReductionTCO2e} tCO2e</span>
                                                    <p className="text-[10px] text-amber-400">Payback {action.paybackMonths}m</p>
                                                </div>

                                                {/* Quarter Selector */}
                                                <select
                                                    value={action.targetQuarter}
                                                    onChange={(e) => updateRoadmapAction(action.id, { targetQuarter: e.target.value })}
                                                    className="bg-[#0b0d14] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 font-mono focus:outline-none focus:border-indigo-500"
                                                >
                                                    {quarters.map(q => <option key={q} value={q}>{q}</option>)}
                                                </select>

                                                {/* Status Selector */}
                                                <select
                                                    value={action.status || 'Planned'}
                                                    onChange={(e) => updateRoadmapAction(action.id, { status: e.target.value })}
                                                    className="bg-[#0b0d14] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 font-mono focus:outline-none focus:border-indigo-500"
                                                >
                                                    <option value="Planned">Planned</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Completed">Completed</option>
                                                </select>

                                                {/* Delete Action */}
                                                <button
                                                    onClick={() => removeFromRoadmap(action.id)}
                                                    className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                                                    title="Remove from Roadmap"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* ADD CUSTOM ACTION MODAL */}
            {showAddModal && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleAddCustom} className="bg-[#101320] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
                        <h3 className="text-base font-bold text-slate-100">Add Custom Decarbonization Action</h3>

                        <div className="space-y-3 font-mono text-xs">
                            <div>
                                <label className="text-slate-400 block mb-1">Action Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Variable Frequency Drive on Boiler Pump"
                                    value={customTitle}
                                    onChange={(e) => setCustomTitle(e.target.value)}
                                    className="w-full bg-[#0b0d14] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-slate-400 block mb-1">Category</label>
                                    <select
                                        value={customCategory}
                                        onChange={(e) => setCustomCategory(e.target.value)}
                                        className="w-full bg-[#0b0d14] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                                    >
                                        <option value="Material">Material</option>
                                        <option value="Energy">Energy</option>
                                        <option value="Process">Process</option>
                                        <option value="Waste">Waste</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-slate-400 block mb-1">Est. CO2 Saved (t)</label>
                                    <input
                                        type="number"
                                        required
                                        value={customCO2}
                                        onChange={(e) => setCustomCO2(e.target.value)}
                                        className="w-full bg-[#0b0d14] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-slate-400 block mb-1">Estimated CAPEX (₹)</label>
                                <input
                                    type="number"
                                    required
                                    value={customCost}
                                    onChange={(e) => setCustomCost(e.target.value)}
                                    className="w-full bg-[#0b0d14] border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3 font-mono text-xs">
                            <button
                                type="button"
                                onClick={() => setShowAddModal(false)}
                                className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white font-bold"
                            >
                                Add Action
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
