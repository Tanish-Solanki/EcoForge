import React, { useState, useMemo } from 'react';
import { useFactory } from '../context/FactoryContext';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
} from 'recharts';
import {
    Sparkles,
    Sliders,
    RotateCcw,
    Save,
    TrendingDown,
    DollarSign,
    ShieldCheck,
    CheckCircle2,
    BookmarkPlus
} from 'lucide-react';

export const SimulatorPage = () => {
    const { simulatorScenarios, saveScenario } = useFactory();

    // Baseline values
    const BASELINE_CO2 = 1284;
    const BASELINE_SAVINGS = 0;

    // Interactive slider parameters state
    const [recycledBlend, setRecycledBlend] = useState(20); // 0 - 50 %
    const [renewableShare, setRenewableShare] = useState(40); // 18 - 100 %
    const [energyEfficiency, setEnergyEfficiency] = useState(10); // 0 - 30 %
    const [scrapReduction, setScrapReduction] = useState(15); // 0 - 50 %
    const [fuelEfficiency, setFuelEfficiency] = useState(5); // 0 - 25 %

    const [scenarioName, setScenarioName] = useState('Custom FY2026 Strategy');
    const [savedSuccess, setSavedSuccess] = useState(false);

    // REAL-TIME SIMULATION ENGINE MATH
    const simulationResults = useMemo(() => {
        // 1. Material reduction impact: 410t PP * (blend/100) * 2.1 CO2 factor
        const materialSavedTCO2 = (410 * (recycledBlend / 100) * 1.4);
        // 2. Renewable energy impact: 420t Elec * ((renewableShare - 18) / 100)
        const renewableSavedTCO2 = Math.max(0, 420 * ((renewableShare - 18) / 100));
        // 3. Efficiency impact: 420t Elec * (energyEfficiency / 100)
        const efficiencySavedTCO2 = 420 * (energyEfficiency / 100);
        // 4. Scrap reduction impact: 78t waste * (scrapReduction / 100) * 1.8
        const scrapSavedTCO2 = 78 * (scrapReduction / 100) * 1.8;
        // 5. Fuel efficiency impact: 92t diesel * (fuelEfficiency / 100)
        const fuelSavedTCO2 = 92 * (fuelEfficiency / 100);

        const totalReduction = Math.round(
            materialSavedTCO2 + renewableSavedTCO2 + efficiencySavedTCO2 + scrapSavedTCO2 + fuelSavedTCO2
        );

        const simulatedCO2 = Math.max(200, BASELINE_CO2 - totalReduction);
        const reductionPercent = ((totalReduction / BASELINE_CO2) * 100).toFixed(1);

        // Financial estimations
        const annualSavingsINR = Math.round(totalReduction * 6200); // ~₹6,200 saved per tCO2e
        const capexInvestmentINR = Math.round(totalReduction * 4800 + (renewableShare > 50 ? 500000 : 0));
        const paybackMonths = Math.max(4, Math.round((capexInvestmentINR / (annualSavingsINR / 12))));
        const circularityIndex = Math.min(98, Math.round(45 + (recycledBlend * 0.7) + (scrapReduction * 0.5)));

        return {
            simulatedCO2,
            totalReduction,
            reductionPercent,
            annualSavingsINR,
            capexInvestmentINR,
            paybackMonths,
            circularityIndex
        };
    }, [recycledBlend, renewableShare, energyEfficiency, scrapReduction, fuelEfficiency]);

    // Preset Handlers
    const applyPreset = (preset) => {
        if (preset === 'Aggressive Circularity') {
            setRecycledBlend(40);
            setRenewableShare(50);
            setEnergyEfficiency(15);
            setScrapReduction(40);
            setFuelEfficiency(10);
            setScenarioName('Aggressive Circularity');
        } else if (preset === 'RE100 Green Factory') {
            setRecycledBlend(25);
            setRenewableShare(100);
            setEnergyEfficiency(25);
            setScrapReduction(20);
            setFuelEfficiency(20);
            setScenarioName('RE100 Green Factory');
        } else if (preset === 'Balanced FY2026 Plan') {
            setRecycledBlend(20);
            setRenewableShare(40);
            setEnergyEfficiency(10);
            setScrapReduction(15);
            setFuelEfficiency(5);
            setScenarioName('Balanced FY2026 Plan');
        } else if (preset === 'Reset Baseline') {
            setRecycledBlend(0);
            setRenewableShare(18);
            setEnergyEfficiency(0);
            setScrapReduction(0);
            setFuelEfficiency(0);
            setScenarioName('Current Baseline');
        }
    };

    const handleSaveScenario = () => {
        saveScenario({
            name: scenarioName,
            recycledBlend,
            renewableShare,
            energyEfficiency,
            scrapReduction,
            fuelEfficiency,
            ...simulationResults
        });
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
    };

    const chartData = [
        { name: 'Baseline', co2: BASELINE_CO2, label: '1,284 t' },
        { name: 'Simulated Target', co2: simulationResults.simulatedCO2, label: `${simulationResults.simulatedCO2} t` }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-indigo-400 font-semibold tracking-wider">Predictive Scenario Engine</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                            REAL-TIME SIMULATION ACTIVE
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-0.5 tracking-tight">What-if Scenario Simulator</h1>
                    <p className="text-xs text-slate-400 mt-1">Adjust technical operational parameters to model future CO2 reduction and ROI scenarios.</p>
                </div>

                {/* Preset Selector Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={() => applyPreset('Balanced FY2026 Plan')}
                        className="px-3 py-1.5 rounded-lg bg-[#141726] hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700"
                    >
                        Balanced FY26
                    </button>
                    <button
                        onClick={() => applyPreset('Aggressive Circularity')}
                        className="px-3 py-1.5 rounded-lg bg-[#141726] hover:bg-slate-800 text-emerald-300 text-xs font-mono border border-emerald-800/60"
                    >
                        Aggressive Circularity
                    </button>
                    <button
                        onClick={() => applyPreset('RE100 Green Factory')}
                        className="px-3 py-1.5 rounded-lg bg-[#141726] hover:bg-slate-800 text-indigo-300 text-xs font-mono border border-indigo-800/60"
                    >
                        RE100 Factory
                    </button>
                    <button
                        onClick={() => applyPreset('Reset Baseline')}
                        className="p-1.5 rounded-lg bg-[#141726] hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
                        title="Reset to Baseline"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* REAL-TIME OUTCOMES HERO BANNER */}
            <div className="grid lg:grid-cols-12 gap-6 bg-gradient-to-br from-[#121524] via-[#101320] to-[#0e101b] border border-slate-800/80 rounded-2xl p-6 shadow-2xl">
                {/* Outcome Metrics */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <span className="text-xs font-mono text-slate-400 uppercase">Simulated Annual Carbon Profile</span>
                            <div className="mt-1 flex items-baseline gap-3">
                                <span className="text-4xl sm:text-5xl font-bold font-mono text-emerald-400 tracking-tight">
                                    {simulationResults.simulatedCO2} <span className="text-xl text-slate-300">tCO2e/yr</span>
                                </span>
                                <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
                                    -{simulationResults.totalReduction} tCO2e ({simulationResults.reductionPercent}% Saved)
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={scenarioName}
                                onChange={(e) => setScenarioName(e.target.value)}
                                className="bg-[#0b0d14] border border-slate-700/60 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500 w-48"
                            />
                            <button
                                onClick={handleSaveScenario}
                                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold font-mono shadow-md shadow-emerald-950 flex items-center gap-1.5 shrink-0 transition-all hover:scale-105"
                            >
                                {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                                <span>{savedSuccess ? 'Saved!' : 'Save Scenario'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Sub-Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                        <div className="p-3 bg-[#0b0d14] rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase">Est. Annual Savings</span>
                            <p className="text-lg font-bold text-amber-400 mt-0.5">₹{(simulationResults.annualSavingsINR / 100000).toFixed(1)} L/yr</p>
                        </div>
                        <div className="p-3 bg-[#0b0d14] rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase">Required CAPEX</span>
                            <p className="text-lg font-bold text-slate-200 mt-0.5">₹{(simulationResults.capexInvestmentINR / 100000).toFixed(1)} L</p>
                        </div>
                        <div className="p-3 bg-[#0b0d14] rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase">Simple Payback</span>
                            <p className="text-lg font-bold text-indigo-300 mt-0.5">{simulationResults.paybackMonths} Months</p>
                        </div>
                        <div className="p-3 bg-[#0b0d14] rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase">Circularity Score</span>
                            <p className="text-lg font-bold text-emerald-400 mt-0.5">{simulationResults.circularityIndex} / 100</p>
                        </div>
                    </div>
                </div>

                {/* COMPARISON BAR CHART */}
                <div className="lg:col-span-4 bg-[#0b0d14] p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <span className="text-[11px] font-mono text-slate-400 uppercase text-center block">
                        Baseline vs Scenario Comparison
                    </span>
                    <div className="h-44 w-full my-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                                <YAxis stroke="#64748b" fontSize={10} />
                                <Tooltip contentStyle={{ backgroundColor: '#141829', borderColor: '#334155', fontSize: '11px' }} />
                                <Bar dataKey="co2" name="Emissions (tCO2e)" fill="#10b981" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* PARAMETER SLIDERS CONTROL PANEL */}
            <div className="bg-[#101320] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                    <div className="flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-indigo-400" />
                        <h3 className="text-sm font-semibold text-slate-200">Intervention Simulation Parameters</h3>
                    </div>
                    <span className="text-xs font-mono text-slate-400">Drag sliders to recalculate model</span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Slider 1: Recycled Polymer Blend */}
                    <div className="p-4 rounded-xl bg-[#141726] border border-slate-800 space-y-2">
                        <div className="flex justify-between items-center font-mono text-xs">
                            <label className="font-semibold text-slate-200">Recycled Polymer Blend Ratio</label>
                            <span className="text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                                {recycledBlend}% PCR PP
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            step="5"
                            value={recycledBlend}
                            onChange={(e) => setRecycledBlend(Number(e.target.value))}
                            className="w-full accent-emerald-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] font-mono text-slate-500">
                            <span>0% (Virgin)</span>
                            <span>25% (Standard)</span>
                            <span>50% (Max Tech Limit)</span>
                        </div>
                    </div>

                    {/* Slider 2: Renewable Energy Share */}
                    <div className="p-4 rounded-xl bg-[#141726] border border-slate-800 space-y-2">
                        <div className="flex justify-between items-center font-mono text-xs">
                            <label className="font-semibold text-slate-200">Renewable Power Contract (PPA + Solar)</label>
                            <span className="text-indigo-400 font-bold bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                                {renewableShare}% Green Power
                            </span>
                        </div>
                        <input
                            type="range"
                            min="18"
                            max="100"
                            step="5"
                            value={renewableShare}
                            onChange={(e) => setRenewableShare(Number(e.target.value))}
                            className="w-full accent-indigo-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] font-mono text-slate-500">
                            <span>18% (Baseline)</span>
                            <span>50% (Open Access)</span>
                            <span>100% (RE100)</span>
                        </div>
                    </div>

                    {/* Slider 3: Machine Energy Efficiency Gain */}
                    <div className="p-4 rounded-xl bg-[#141726] border border-slate-800 space-y-2">
                        <div className="flex justify-between items-center font-mono text-xs">
                            <label className="font-semibold text-slate-200">Machine VFD & Motor Efficiency Gain</label>
                            <span className="text-sky-400 font-bold bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                                +{energyEfficiency}% Efficiency
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="30"
                            step="2"
                            value={energyEfficiency}
                            onChange={(e) => setEnergyEfficiency(Number(e.target.value))}
                            className="w-full accent-sky-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] font-mono text-slate-500">
                            <span>0% (Standard)</span>
                            <span>15% (VFD Retrofit)</span>
                            <span>30% (Full Machine Upgrade)</span>
                        </div>
                    </div>

                    {/* Slider 4: Material Scrap Reduction */}
                    <div className="p-4 rounded-xl bg-[#141726] border border-slate-800 space-y-2">
                        <div className="flex justify-between items-center font-mono text-xs">
                            <label className="font-semibold text-slate-200">Material Scrap & Runner Waste Reduction</label>
                            <span className="text-amber-400 font-bold bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                                -{scrapReduction}% Scrap
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            step="5"
                            value={scrapReduction}
                            onChange={(e) => setScrapReduction(Number(e.target.value))}
                            className="w-full accent-amber-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] font-mono text-slate-500">
                            <span>0% (Baseline 6%)</span>
                            <span>25% (Regrind Loop)</span>
                            <span>50% (Near Zero Waste)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
