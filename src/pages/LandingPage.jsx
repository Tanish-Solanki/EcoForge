import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Factory,
    ArrowRight,
    ShieldCheck,
    Zap,
    Flame,
    CheckCircle2,
    TrendingDown,
    ChevronRight,
    Cpu,
    Layers,
    Activity,
    Award
} from 'lucide-react';

export const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#090b11] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
            {/* Top Navbar */}
            <nav className="h-20 border-b border-slate-800/60 px-6 lg:px-12 flex items-center justify-between bg-[#0b0e17]/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-950 flex items-center justify-center border border-indigo-500/30 shadow-lg shadow-indigo-950">
                        <Factory className="w-5 h-5 text-indigo-200" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-100 text-lg tracking-tight font-sans">EcoForge</span>
                            <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-widest">
                                AI
                            </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono">Industrial Carbon Reduction & Circularity Copilot</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-xs font-mono text-slate-300 hover:text-slate-100 px-4 py-2 rounded-lg hover:bg-slate-800/60 transition-colors hidden sm:block"
                    >
                        Demo Overview
                    </button>
                    <button
                        onClick={() => navigate('/setup')}
                        className="text-xs font-semibold px-4 py-2.5 rounded-lg bg-indigo-700 hover:bg-indigo-600 text-white shadow-md shadow-indigo-950 flex items-center gap-2 border border-indigo-500/30 transition-all hover:scale-[1.02]"
                    >
                        <span>Analyze My Factory</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-36 pb-20 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center relative">
                {/* Subtle Background Glows */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-900/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

                {/* Tagline Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-700/50 text-indigo-300 text-xs font-mono mb-6 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                    <span>Measure. Diagnose. Filter. Optimize. Act.</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-100 max-w-4xl leading-[1.15]">
                    Turn industrial data into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-100 to-amber-200">measurable carbon reduction.</span>
                </h1>

                <p className="mt-6 text-slate-300 text-base sm:text-lg max-w-3xl font-normal leading-relaxed">
                    See where your factory emits. Understand why. Remove technically impossible solutions. Optimize what remains. Act on the highest-impact opportunities.
                </p>

                {/* CTA Buttons */}
                <div className="mt-9 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <button
                        onClick={() => navigate('/setup')}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-700 to-indigo-600 hover:from-indigo-600 hover:to-indigo-500 text-white font-medium text-sm shadow-xl shadow-indigo-950 border border-indigo-500/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                    >
                        <span>Analyze My Factory</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#131624] hover:bg-[#1a1e30] text-slate-200 hover:text-white font-medium text-sm border border-slate-700/60 flex items-center justify-center gap-2 transition-colors"
                    >
                        <Factory className="w-4 h-4 text-indigo-400" />
                        <span>Explore Demo Factory</span>
                    </button>
                </div>

                {/* Industrial Decision Pipeline Flow */}
                <div className="mt-16 w-full max-w-5xl bg-[#101320]/90 border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/60">
                        <span className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-semibold flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-indigo-400" /> EcoForge Autonomous Optimization Pipeline
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800/40">
                            Technical Feasibility Hard Constraint
                        </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 relative">
                        {[
                            { label: 'Factory Data', icon: Factory, sub: 'IoT & ERP' },
                            { label: 'Emission Intel', icon: Activity, sub: '1,284 tCO2e' },
                            { label: 'Hotspot Detection', icon: Flame, sub: 'Root Cause' },
                            { label: 'Feasibility Filter', icon: ShieldCheck, sub: 'Hard Rules' },
                            { label: 'Carbon Optimization', icon: TrendingDown, sub: '312 t Saved' },
                            { label: 'Action Roadmap', icon: CheckCircle2, sub: 'ROI & Timeline' }
                        ].map((step, idx) => {
                            const StepIcon = step.icon;
                            return (
                                <div
                                    key={idx}
                                    className="p-3.5 rounded-xl bg-[#161a2b] border border-slate-700/50 flex flex-col items-center text-center group hover:border-indigo-500/50 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-800/40 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                        <StepIcon className="w-4 h-4 text-indigo-300" />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-200 leading-tight">{step.label}</span>
                                    <span className="text-[10px] text-slate-400 font-mono mt-1">{step.sub}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* The Problem Section */}
            <section className="py-16 bg-[#0c0e18] border-y border-slate-800/60">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">The Problem</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-2">
                            Why traditional carbon dashboards fail in manufacturing
                        </h2>
                        <p className="text-slate-400 text-sm mt-3">
                            Factories receive generic recommendations that fail on the shop floor because they ignore technical constraints like temperature tolerances, motor capacity, or material degradation.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-xl bg-[#121522] border border-slate-800/80">
                            <div className="w-10 h-10 rounded-lg bg-rose-950/60 border border-rose-800/40 flex items-center justify-center mb-4">
                                <Flame className="w-5 h-5 text-rose-400" />
                            </div>
                            <h3 className="text-base font-semibold text-slate-200">Hidden Carbon Hotspots</h3>
                            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                                Emissions are buried deep in machine idle times, thermal losses, and virgin resin procurement. Without root-cause analysis, plant managers fix symptoms rather than causes.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl bg-[#121522] border border-slate-800/80">
                            <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-800/40 flex items-center justify-center mb-4">
                                <ShieldCheck className="w-5 h-5 text-amber-400" />
                            </div>
                            <h3 className="text-base font-semibold text-slate-200">Technically Impossible Proposals</h3>
                            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                                Sustainability reports often suggest bio-polymers or electrification that fail melt-flow requirements or trip electrical substations, wasting valuable engineering time.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl bg-[#121522] border border-slate-800/80">
                            <div className="w-10 h-10 rounded-lg bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center mb-4">
                                <Zap className="w-5 h-5 text-indigo-400" />
                            </div>
                            <h3 className="text-base font-semibold text-slate-200">Lack of Practical ROI Roadmap</h3>
                            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                                Plant managers cannot prioritize actions without knowing exact CO2 impact per Rupee spent and expected payback timelines across 3-month, 12-month, and 3-year horizons.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Approach */}
            <section className="py-20 max-w-7xl mx-auto px-6 lg:px-12">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">Our Approach</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-2">
                        Measure → Diagnose → Filter → Optimize → Act
                    </h2>
                    <p className="text-slate-400 text-sm mt-3">
                        A systematic engineering approach built specifically for heavy industrial operations.
                    </p>
                </div>

                <div className="grid md:grid-cols-5 gap-4">
                    {[
                        { num: '01', title: 'Measure', text: 'Ingest direct fuel, grid electricity, raw materials, and waste activity data accurately.' },
                        { num: '02', title: 'Diagnose', text: 'Pinpoint precise equipment and material hotspots responsible for highest CO2 intensity.' },
                        { num: '03', title: 'Filter', text: 'Run 100+ options through a strict Technical Feasibility Check (temperature, pressure, lifetime).' },
                        { num: '04', title: 'Optimize', text: 'Rank remaining feasible interventions by maximum practical CO2 reduction potential.' },
                        { num: '05', title: 'Act', text: 'Simulate scenario outcomes and generate a clear ROI-backed execution roadmap.' }
                    ].map((item, idx) => (
                        <div key={idx} className="p-5 rounded-xl bg-[#111422] border border-slate-800/80 flex flex-col justify-between">
                            <div>
                                <span className="text-xl font-mono font-bold text-indigo-400">{item.num}</span>
                                <h3 className="text-base font-semibold text-slate-200 mt-2">{item.title}</h3>
                                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why EcoForge */}
            <section className="py-16 bg-[#0c0e18] border-t border-slate-800/60">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-indigo-950/60 via-[#121524] to-[#0f121d] p-8 md:p-12 rounded-2xl border border-indigo-800/40">
                        <div>
                            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">Why EcoForge AI</span>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-2">
                                Built for carbon reduction. Validated by engineering reality.
                            </h2>
                            <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-300">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span><strong>Carbon-first optimization:</strong> Primary goal is maximum tCO2e reduction</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span><strong>Feasibility-aware recommendations:</strong> Zero false promises</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span><strong>Cost & payback analysis:</strong> Financial clarity for CFOs & plant managers</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span><strong>Interactive what-if simulator:</strong> Test scenarios before capital commitment</span>
                                </li>
                            </ul>
                        </div>

                        <div className="shrink-0 flex flex-col gap-3">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="px-8 py-3.5 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white text-sm font-semibold shadow-lg shadow-indigo-950 flex items-center justify-center gap-2 transition-all hover:scale-105"
                            >
                                <span>Launch Demo Factory</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
