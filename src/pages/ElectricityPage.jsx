import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFactory } from '../context/FactoryContext';
import {
    Zap,
    Sun,
    Wind,
    ShieldCheck,
    TrendingDown,
    ArrowRight,
    CheckCircle2,
    SlidersHorizontal,
    Sparkles,
    Flame
} from 'lucide-react';

export const ElectricityPage = () => {
    const navigate = useNavigate();
    const { setupData } = useFactory();

    // Electricity metrics from setup context or intelligent baseline defaults
    const electricityData = setupData?.energy || {
        annualKWh: 4500000,
        gridEmissionsTCO2e: 3690, // Based on Indian grid factor ~0.82 kg CO2/kWh
        gridCarbonFactor: 0.82, // kg CO2/kWh
        currentGridCostINR: 7.80, // ₹/kWh
        solarFeasibilityKWh: 1800000,
        windPPAFeasibilityKWh: 1350000
    };

    const annualMWh = Math.round(electricityData.annualKWh / 1000);
    const annualElectricityCostINR = Math.round((electricityData.annualKWh * electricityData.currentGridCostINR) / 100000); // in Lakhs

    // Renewable PPA & Electrification Opportunities
    const renewableOptions = [
        {
            name: "Captive Rooftop & Ground-Mounted Solar PV (1.2 MWp)",
            reductionPercent: 40.0,
            co2SavedTCO2e: 1476,
            annualSavingsINR: 52, // Lakhs
            capexUSDk: 450,
            paybackYears: 3.2,
            type: "Solar PPA / Captive",
            pros: "Provides 1.8M kWh clean solar power annually at fixed ₹3.80/kWh vs grid ₹7.80/kWh.",
            cons: "Requires unshaded factory roof area and net-metering approval."
        },
        {
            name: "Open-Access Wind-Solar Hybrid Power Purchase Agreement (PPA)",
            reductionPercent: 75.0,
            co2SavedTCO2e: 2767,
            annualSavingsINR: 98, // Lakhs
            capexUSDk: 0,
            paybackYears: 0.2,
            type: "Offsite Green PPA",
            pros: "Zero upfront CAPEX. Replaces 75% fossil grid power with green tariff power.",
            cons: "Requires state discom cross-subsidy surcharge & wheeling agreement."
        },
        {
            name: "Industrial Thermal Electrification (High-Temp Heat Pump & Electric Boiler)",
            reductionPercent: 65.0,
            co2SavedTCO2e: 1200,
            annualSavingsINR: 42, // Lakhs
            capexUSDk: 220,
            paybackYears: 2.1,
            type: "Process Electrification",
            pros: "Eliminates diesel/coal steam boilers by upgrading to high COP electric heat pumps.",
            cons: "Increases plant total peak electric kW demand load."
        }
    ];

    return (
        <div className="space-y-8 font-sans pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">Subtask 2 — Energy & Power Grid</span>
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/50">
                            ELECTRICITY DECARBONIZATION
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-1 tracking-tight">
                        Electricity & Scope 2 Decarbonization
                    </h1>
                    <p className="text-sm text-slate-300 mt-1.5 max-w-3xl leading-relaxed">
                        Comprehensive evaluation of factory electrical consumption, grid Scope 2 emission factor, renewable PPA transitions, and industrial process electrification.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/raw-materials/drivers')}
                        className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                    >
                        <span>Back: Raw Materials</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* ELECTRICITY BASELINE CARDS */}
            <div className="grid md:grid-cols-4 gap-5 bg-[#101320] border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="bg-[#0b0d14] p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[11px] font-mono uppercase text-slate-400">Annual Power Draw</span>
                    <div className="text-2xl font-bold font-mono text-slate-100">{annualMWh.toLocaleString()} MWh</div>
                    <span className="text-[10px] text-slate-400 font-mono">({electricityData.annualKWh.toLocaleString()} kWh/yr)</span>
                </div>

                <div className="bg-[#0b0d14] p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[11px] font-mono uppercase text-rose-400">Scope 2 Grid CO2</span>
                    <div className="text-2xl font-bold font-mono text-rose-400">{electricityData.gridEmissionsTCO2e.toLocaleString()} tCO2e</div>
                    <span className="text-[10px] text-slate-400 font-mono">Grid Factor: {electricityData.gridCarbonFactor} kg/kWh</span>
                </div>

                <div className="bg-[#0b0d14] p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[11px] font-mono uppercase text-amber-400">Annual Power Bill</span>
                    <div className="text-2xl font-bold font-mono text-amber-400">₹ {annualElectricityCostINR} Lakhs</div>
                    <span className="text-[10px] text-slate-400 font-mono">Tariff: ₹ {electricityData.currentGridCostINR}/kWh</span>
                </div>

                <div className="bg-[#0b0d14] p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[11px] font-mono uppercase text-emerald-400">Max Green Power Share</span>
                    <div className="text-2xl font-bold font-mono text-emerald-400">75% Potential</div>
                    <span className="text-[10px] text-emerald-300 font-mono">Via Offsite Wind-Solar PPA</span>
                </div>
            </div>

            {/* RENEWABLE POWER & ELECTRIFICATION OPTIONS */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <span>Electricity Decarbonization & Renewable Power Options</span>
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {renewableOptions.map((opt, idx) => (
                        <div key={idx} className="bg-[#101320] border border-slate-800 hover:border-amber-500/60 rounded-2xl p-6 space-y-4 shadow-xl transition-all flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800">
                                        {opt.type}
                                    </span>
                                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                                        -{opt.reductionPercent}% Scope 2 CO2
                                    </span>
                                </div>

                                <h3 className="text-base font-bold text-slate-100 leading-snug">{opt.name}</h3>

                                {/* Metric Breakdown */}
                                <div className="grid grid-cols-2 gap-2 bg-[#0b0d14] p-3 rounded-lg border border-slate-800 text-xs font-mono">
                                    <div>
                                        <span className="text-slate-400 block text-[10px]">CO2 Saved</span>
                                        <span className="text-emerald-400 font-bold">{opt.co2SavedTCO2e} tCO2e/yr</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block text-[10px]">Bill Savings</span>
                                        <span className="text-amber-400 font-bold">₹ {opt.annualSavingsINR} Lakhs/yr</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block text-[10px]">Setup CAPEX</span>
                                        <span className="text-indigo-300 font-bold">{opt.capexUSDk > 0 ? `$${opt.capexUSDk}k` : 'Zero CAPEX'}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block text-[10px]">Payback</span>
                                        <span className="text-slate-200 font-bold">{opt.paybackYears} Years</span>
                                    </div>
                                </div>

                                <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                                    <p><strong className="text-emerald-400">Pros:</strong> {opt.pros}</p>
                                    <p className="text-slate-400"><strong className="text-amber-400">Cons:</strong> {opt.cons}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
