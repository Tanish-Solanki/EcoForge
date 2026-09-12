import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFactory } from '../context/FactoryContext';
import {
    Flame,
    AlertTriangle,
    TrendingUp,
    Atom,
    CheckCircle2,
    SlidersHorizontal,
    Sparkles,
    Layers,
    ArrowRight
} from 'lucide-react';

export const RawMaterialDriversPage = () => {
    const navigate = useNavigate();
    const { computedReport, dashboard, setupData } = useFactory();

    const reportData = computedReport || {};
    const detailedMaterials = reportData.detailedMaterialAnalysis || [];

    // Technical root cause descriptions per raw material group
    const DRIVER_DESCRIPTIONS = {
        "coking-coal": {
            title: "Thermal Combustion & Metallurgical Blast Furnace Reduction",
            mechanism: "Chemical Reduction & High-Temperature Calcination",
            explanation: "Coking coal reacts chemically in blast furnaces as a carbonaceous reductant (C + O2 → CO2) to remove oxygen from iron ore. Additional emissions originate from high-temperature coke oven battery baking (1000°C–1100°C).",
            scope: "Scope 1 Direct Process & Fuel Combustion",
            reaction: "2Fe2O3 + 3C → 4Fe + 3CO2 ↑"
        },
        "limestone-clinker": {
            title: "Process Calcination & Mineral Thermal Decomposition",
            mechanism: "Endothermic Carbonate Dissociation",
            explanation: "Limestone (CaCO3) undergoes intense thermal calcination at 900°C in cement kilns, breaking down into quicklime (CaO) and releasing bound mineral CO2 directly into flue gas, independent of fuel combustion.",
            scope: "Scope 1 Direct Chemical Calcination",
            reaction: "CaCO3 + Heat → CaO + CO2 ↑ (60% of total emissions)"
        },
        "thermal-coal": {
            title: "Fossil Fuel Combustion in Boilers & Kilns",
            mechanism: "High-Carbon Thermal Combustion",
            explanation: "Non-coking thermal coal is combusted in industrial boilers and brick/cement kilns to generate high-pressure steam and high-grade thermal heat. High carbon-to-hydrogen ratio yields heavy CO2 stack gas.",
            scope: "Scope 1 Stationary Thermal Combustion",
            reaction: "C + O2 → CO2 + 32.8 MJ/kg Heat"
        },
        "iron-ore": {
            title: "Upstream Extraction, Sintering & Pelleting Energy",
            mechanism: "Upstream Energy Intensity & Thermal Agglomeration",
            explanation: "Iron ore processing requires intensive sintering, pelletizing furnaces, and upstream mining logistics before blast furnace feeding.",
            scope: "Scope 3 Upstream Raw Material Extraction",
            reaction: "Magnetite/Hematite Agglomeration Thermal Cycle"
        },
        "petcoke": {
            title: "High-Sulfur Carbon Combustion & Anode Oxidation",
            mechanism: "Ultra-High Carbon Density Combustion",
            explanation: "Petroleum coke contains >85% fixed carbon. Used in cement kilns and aluminium anode baking, releasing high CO2 mass per gigajoule alongside SOx stack emissions.",
            scope: "Scope 1 Kiln & Smelter Anode Consumption",
            reaction: "C (Petcoke) + O2 → CO2 (High carbon intensity)"
        },
        "natural-gas": {
            title: "Steam Methane Reforming & Thermal Process Heating",
            mechanism: "Hydrocarbon Reforming & Fired Heaters",
            explanation: "Methane (CH4) combustion for high-temperature process heat and Steam Methane Reforming (SMR) for hydrogen synthesis release CO2 during water-gas shift reaction.",
            scope: "Scope 1 Thermal Combustion & Feedstock Reforming",
            reaction: "CH4 + 2H2O → CO2 + 4H2 (SMR Reaction)"
        },
        "naphtha-crude": {
            title: "Steam Cracking & High-Temperature Olefin Pyrolysis",
            mechanism: "Thermal Pyrolysis & Flue Gas Firing",
            explanation: "Naphtha cracking at 850°C consumes massive thermal fuel energy to sever hydrocarbon bonds into ethylene and propylene monomers.",
            scope: "Scope 1 Petrochemical Fired Furnace Emissions",
            reaction: "CnH2n+2 + Heat → Olefins + Cracker Stack CO2"
        },
        "primary-aluminium": {
            title: "Electrolytic Hall-Héroult Cell Carbon Anode Consumption",
            mechanism: "Anode Carbon Oxidation during Smelting",
            explanation: "Cryolite bath electrolysis consumes sacrificial carbon anodes (petcoke/pitch) directly, creating pure CO2 bubbles at the anode face alongside high electricity grid emissions.",
            scope: "Scope 1 Anode Carbon Loss + Scope 2 Electricity",
            reaction: "2Al2O3 + 3C → 4Al + 3CO2 ↑"
        },
        "virgin-plastics": {
            title: "Fossil Petroleum Feedstock Extraction & Polymerization",
            mechanism: "Embedded Fossil Carbon & Polymer Reactor Energy",
            explanation: "Virgin resins lock in fossil crude oil carbon. End-of-life incineration or virgin synthesis releases significant lifecycle greenhouse gases.",
            scope: "Scope 3 Upstream Feedstock & Scope 1 Processing",
            reaction: "Ethylene / Propylene Monomer Polymerization Heat"
        }
    };

    return (
        <div className="space-y-8 font-sans pb-12">
            {/* Header Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-indigo-400 font-bold tracking-wider">Screen 1 of 3 — Raw Materials</span>
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/50">
                            ROOT CAUSE ANALYSIS
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-1 tracking-tight">
                        Raw Material Carbon Emission Drivers
                    </h1>
                    <p className="text-sm text-slate-300 mt-1.5 max-w-3xl leading-relaxed">
                        Detailed technical breakdown explaining the exact chemical, thermal, and process reasons why raw materials contribute to factory Scope 1 and Scope 2 carbon emissions.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/raw-materials/composition')}
                        className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                    >
                        <span>Next: Composition & Alternates</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Total Emission Drivers Summary Banner */}
            <div className="bg-gradient-to-r from-[#121629] via-[#101322] to-[#0e101c] border border-slate-800 rounded-2xl p-6 shadow-xl grid md:grid-cols-3 gap-6">
                <div className="border-r border-slate-800/80 pr-6">
                    <span className="text-xs font-mono uppercase text-slate-400 font-medium">Total Factory Baseline</span>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-4xl font-bold font-mono text-slate-100">
                            {(reportData.totalEmissionsTCO2e || dashboard.totalEmissionsTCO2e || 0).toLocaleString()}
                        </span>
                        <span className="text-sm font-mono text-slate-400">tCO2e/yr</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">Aggregated emissions from configured raw materials</p>
                </div>

                <div className="border-r border-slate-800/80 pr-6">
                    <span className="text-xs font-mono uppercase text-amber-400 font-medium">Top Hotspot Contribution</span>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-4xl font-bold font-mono text-amber-400">
                            {detailedMaterials[0] ? `${detailedMaterials[0].sharePercent}%` : '0%'}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">of total emissions</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-2 font-medium">
                        Primary Emitter: <strong className="text-slate-100">{detailedMaterials[0]?.materialName || 'Not configured'}</strong>
                    </p>
                </div>

                <div>
                    <span className="text-xs font-mono uppercase text-emerald-400 font-medium">Feasible Carbon Reduction</span>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-4xl font-bold font-mono text-emerald-400">
                            -{(reportData.totalFeasibleSavingsTCO2e || 0).toLocaleString()}
                        </span>
                        <span className="text-sm font-mono text-slate-400">tCO2e/yr</span>
                    </div>
                    <p className="text-xs text-emerald-400/90 mt-2 font-medium">
                        Achievable via circular material alternatives
                    </p>
                </div>
            </div>

            {/* Detailed Emission Drivers Cards per Material */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                        <Flame className="w-5 h-5 text-rose-400" />
                        <span>Configured Material Emission Drivers & Process Chemistry</span>
                    </h2>
                    <span className="text-xs font-mono text-slate-400">
                        {detailedMaterials.length} Material Drivers Analyzed
                    </span>
                </div>

                {detailedMaterials.length === 0 ? (
                    <div className="p-10 text-center bg-[#0b0d14] rounded-2xl border border-dashed border-slate-800 space-y-3">
                        <Layers className="w-10 h-10 text-slate-600 mx-auto" />
                        <h3 className="text-base font-semibold text-slate-200">No Raw Materials Configured</h3>
                        <p className="text-xs text-slate-400 max-w-md mx-auto">
                            Complete the 6-step factory setup wizard to analyze your factory's specific material emission drivers.
                        </p>
                        <button
                            onClick={() => navigate('/setup')}
                            className="mt-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold border border-indigo-400/30"
                        >
                            Open Setup Wizard
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {detailedMaterials.map((mat, idx) => {
                            const matKey = mat.selectedMaterialId || mat.inputId || mat.id;
                            const driverInfo = DRIVER_DESCRIPTIONS[matKey] || {
                                title: "Fossil Energy & Process Combustion Driver",
                                mechanism: "Thermal Energy & High-Temperature Firing",
                                explanation: `Emissions derived from thermal fuel consumption and chemical transformation during ${mat.materialName} utilization in plant machinery.`,
                                scope: "Scope 1 Direct Process Emissions",
                                reaction: "Raw Material + Heat → Process Emissions + Flue Gas CO2"
                            };

                            return (
                                <div key={idx} className="bg-[#101320] border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-xl space-y-5 transition-all">
                                    {/* Material Header Bar */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                                        <div className="flex items-center gap-3">
                                            <span className="w-9 h-9 rounded-xl bg-rose-950/80 text-rose-300 border border-rose-800/60 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                                                #{mat.rank || (idx + 1)}
                                            </span>
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-100">{mat.materialName}</h3>
                                                <span className="text-xs font-mono text-slate-400 block mt-0.5">
                                                    Annual Consumption: <strong className="text-slate-200">{mat.quantity?.toLocaleString()} {mat.unit || 'tonnes'}</strong>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 bg-[#0b0d14] px-4 py-2.5 rounded-xl border border-slate-800 font-mono text-xs">
                                            <div>
                                                <span className="text-[11px] text-slate-400 block">Calculated CO2</span>
                                                <span className="text-rose-400 font-bold text-sm">{mat.emissionsTCO2e?.toLocaleString()} tCO2e/yr</span>
                                            </div>
                                            <div className="border-l border-slate-800 pl-4">
                                                <span className="text-[11px] text-slate-400 block">Factory Share</span>
                                                <span className="text-amber-400 font-bold text-sm">{mat.sharePercent}%</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Root Cause Technical Explanation Box */}
                                    <div className="grid lg:grid-cols-3 gap-5 bg-[#0b0d14] p-5 rounded-xl border border-slate-800/80">
                                        <div className="lg:col-span-2 space-y-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-mono font-bold text-indigo-300 uppercase bg-indigo-950/80 px-2.5 py-1 rounded border border-indigo-800/60">
                                                    Root Cause Reason
                                                </span>
                                                <span className="text-xs font-mono text-slate-400">
                                                    {driverInfo.scope}
                                                </span>
                                            </div>

                                            <h4 className="text-base font-bold text-slate-100">{driverInfo.title}</h4>
                                            <p className="text-sm text-slate-300 leading-relaxed">
                                                {driverInfo.explanation}
                                            </p>
                                        </div>

                                        <div className="bg-[#121524] p-4 rounded-lg border border-indigo-900/40 space-y-2 flex flex-col justify-between">
                                            <div>
                                                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                                                    Chemical Reaction / Pathway
                                                </span>
                                                <div className="p-2.5 rounded bg-[#090a10] border border-slate-800 font-mono text-xs text-amber-300 leading-relaxed font-semibold">
                                                    {driverInfo.reaction}
                                                </div>
                                            </div>

                                            <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                                                <span>Emission Intensity Factor: </span>
                                                <strong className="text-rose-400 font-mono text-sm ml-1">
                                                    {mat.emissionFactor || 2.1} tCO2e / {mat.unit || 'unit'}
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
