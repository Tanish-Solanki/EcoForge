import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFactory } from '../context/FactoryContext';
import { MaterialSectionStep } from '../components/inputs/MaterialSectionStep';
import {
    Factory,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    Zap,
    Trash2,
    Sparkles,
    Check
} from 'lucide-react';

const steps = [
    { id: 1, title: 'Factory', desc: 'Facility Details' },
    { id: 2, title: 'Production', desc: 'Processes' },
    { id: 3, title: 'Material-1', desc: 'Metallurgy & Feedstocks' },
    { id: 4, title: 'Material-2', desc: 'Energy, Metals & Polymers' },
    { id: 5, title: 'Material-3', desc: 'Specialty Chemicals & Gases' },
    { id: 6, title: 'Energy', desc: 'Power & Fuels' },
    { id: 7, title: 'Waste', desc: 'Scrap & Diversion' },
    { id: 8, title: 'Review', desc: 'Summary & Launch' }
];

export const FactorySetupWizard = () => {
    const navigate = useNavigate();
    const { setupData, setSetupData, updateSetupSection } = useFactory();
    const [currentStep, setCurrentStep] = useState(1);

    const updateField = (field, val) => {
        setSetupData(prev => ({ ...prev, [field]: val }));
    };

    const handleNext = () => {
        if (currentStep < 8) {
            setCurrentStep(prev => prev + 1);
        } else {
            navigate('/dashboard');
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const m1List = Array.isArray(setupData.material1) ? setupData.material1 : (setupData.material1?.selectedMaterialId ? [setupData.material1] : []);
    const m2List = Array.isArray(setupData.material2) ? setupData.material2 : (setupData.material2?.selectedMaterialId ? [setupData.material2] : []);
    const m3List = Array.isArray(setupData.material3) ? setupData.material3 : (setupData.material3?.selectedMaterialId ? [setupData.material3] : []);

    return (
        <div className="min-h-screen bg-[#090b11] text-slate-100 font-sans flex flex-col justify-between p-4 sm:p-6 lg:p-8">
            {/* Main Header */}
            <header className="max-w-6xl w-full mx-auto flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-900/60 border border-indigo-700/50 flex items-center justify-center">
                        <Factory className="w-5 h-5 text-indigo-300" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-100 text-base">EcoForge AI</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                                8-Step Setup Workflow
                            </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono">Step {currentStep} of 8: {steps[currentStep - 1].title}</p>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-xs font-mono text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-800/50 border border-slate-800"
                >
                    Skip to Dashboard →
                </button>
            </header>

            {/* Main Container */}
            <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col justify-between">
                {/* Fixed 8-Step Navigation Header */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
                    {steps.map((s) => (
                        <div
                            key={s.id}
                            onClick={() => setCurrentStep(s.id)}
                            className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${currentStep === s.id
                                ? 'bg-indigo-950/80 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-950'
                                : currentStep > s.id
                                    ? 'bg-slate-900/60 border-emerald-800/50 text-emerald-400'
                                    : 'bg-[#101320] border-slate-800/80 text-slate-400 hover:border-slate-700'
                                }`}
                        >
                            <div className="text-[10px] font-mono font-bold flex items-center justify-center gap-1">
                                {currentStep > s.id ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : `0${s.id}`}
                            </div>
                            <div className="text-xs font-semibold truncate mt-0.5">{s.title}</div>
                        </div>
                    ))}
                </div>

                {/* Form Body Box */}
                <div className="bg-[#121522] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl min-h-[420px] flex flex-col justify-between">
                    {/* STEP 1: Factory Profile */}
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <div>
                                <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">Step 01 / Factory Profile</span>
                                <h2 className="text-xl font-bold text-slate-100 mt-1">Configure Factory Baseline Metadata</h2>
                                <p className="text-xs text-slate-400">Establish primary facility name, operating sector, and geographic region.</p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4 pt-2">
                                <div>
                                    <label className="block text-xs font-mono text-slate-300 mb-1">Factory Name</label>
                                    <input
                                        type="text"
                                        value={setupData.name}
                                        onChange={(e) => updateField('name', e.target.value)}
                                        className="w-full bg-[#0b0d14] border border-slate-700/70 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 font-sans"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-slate-300 mb-1">Manufacturing Industry</label>
                                    <input
                                        type="text"
                                        value={setupData.industry}
                                        onChange={(e) => updateField('industry', e.target.value)}
                                        className="w-full bg-[#0b0d14] border border-slate-700/70 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 font-sans"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Production Processes */}
                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <div>
                                <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">Step 02 / Production Processes</span>
                                <h2 className="text-xl font-bold text-slate-100 mt-1">Active Manufacturing Operations</h2>
                                <p className="text-xs text-slate-400">Select primary industrial transformation processes deployed in your facility.</p>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-3 pt-2">
                                {['Injection Molding', 'Extrusion', 'Blow Molding', 'Thermoforming', 'Compounding'].map((proc) => {
                                    const isSelected = setupData.processes.includes(proc);
                                    return (
                                        <div
                                            key={proc}
                                            onClick={() => {
                                                const updated = isSelected
                                                    ? setupData.processes.filter(p => p !== proc)
                                                    : [...setupData.processes, proc];
                                                updateField('processes', updated);
                                            }}
                                            className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${isSelected
                                                ? 'bg-indigo-950/60 border-indigo-500 text-slate-100'
                                                : 'bg-[#0b0d14] border-slate-800 text-slate-400 hover:border-slate-700'
                                                }`}
                                        >
                                            <span className="text-xs font-medium">{proc}</span>
                                            {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Material-1 (5 Restricted Items) */}
                    {currentStep === 3 && (
                        <MaterialSectionStep
                            groupId="material1"
                            sectionTitle="Material-1"
                            sectionDesc="Configure metallurgy & mineral feedstocks assigned to Material-1."
                            materialsList={m1List}
                            onUpdate={(newList) => updateSetupSection('material1', newList)}
                        />
                    )}

                    {/* STEP 4: Material-2 (5 Restricted Items) */}
                    {currentStep === 4 && (
                        <MaterialSectionStep
                            groupId="material2"
                            sectionTitle="Material-2"
                            sectionDesc="Configure energy, primary metals & polymer feedstocks assigned to Material-2."
                            materialsList={m2List}
                            onUpdate={(newList) => updateSetupSection('material2', newList)}
                        />
                    )}

                    {/* STEP 5: Material-3 (5 Restricted Items) */}
                    {currentStep === 5 && (
                        <MaterialSectionStep
                            groupId="material3"
                            sectionTitle="Material-3"
                            sectionDesc="Configure process chemicals & industrial gases assigned to Material-3."
                            materialsList={m3List}
                            onUpdate={(newList) => updateSetupSection('material3', newList)}
                        />
                    )}

                    {/* STEP 6: Energy & Power */}
                    {currentStep === 6 && (
                        <div className="space-y-4">
                            <div>
                                <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">Step 06 / Energy & Fuel Consumption</span>
                                <h2 className="text-xl font-bold text-slate-100 mt-1">Annual Power & Fuel Inputs</h2>
                                <p className="text-xs text-slate-400">Enter annual consumption for grid electricity, solar generation, and backup fuels.</p>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-4 pt-2">
                                <div>
                                    <label className="block text-xs font-mono text-slate-300 mb-1">Grid Electricity (kWh/yr)</label>
                                    <input
                                        type="number"
                                        value={setupData.gridPowerKwh}
                                        onChange={(e) => updateField('gridPowerKwh', Number(e.target.value))}
                                        className="w-full bg-[#0b0d14] border border-slate-700/70 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-slate-300 mb-1">Solar PV Generation (kWh/yr)</label>
                                    <input
                                        type="number"
                                        value={setupData.solarKwh}
                                        onChange={(e) => updateField('solarKwh', Number(e.target.value))}
                                        className="w-full bg-[#0b0d14] border border-slate-700/70 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-slate-300 mb-1">Diesel Generator Fuel (Liters/yr)</label>
                                    <input
                                        type="number"
                                        value={setupData.dieselLiters}
                                        onChange={(e) => updateField('dieselLiters', Number(e.target.value))}
                                        className="w-full bg-[#0b0d14] border border-slate-700/70 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 7: Waste & Diversion */}
                    {currentStep === 7 && (
                        <div className="space-y-4">
                            <div>
                                <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">Step 07 / Waste Streams</span>
                                <h2 className="text-xl font-bold text-slate-100 mt-1">Scrap Generation & Diversion</h2>
                                <p className="text-xs text-slate-400">Specify annual total process scrap tonnage generated by operations.</p>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1">Total Process Waste & Scrap (Tonnes/yr)</label>
                                <input
                                    type="number"
                                    value={setupData.wasteTonnes}
                                    onChange={(e) => updateField('wasteTonnes', Number(e.target.value))}
                                    className="w-full bg-[#0b0d14] border border-slate-700/70 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono"
                                />
                            </div>
                        </div>
                    )}

                    {/* STEP 8: Review & Summary */}
                    {currentStep === 8 && (
                        <div className="space-y-4">
                            <div>
                                <span className="text-xs font-mono uppercase text-emerald-400 font-semibold flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Step 08 / Factory Profile Ready
                                </span>
                                <h2 className="text-xl font-bold text-slate-100 mt-1">Review & Launch Carbon Analysis</h2>
                                <p className="text-xs text-slate-400">Verify all configuration sections: Factory, Production, Material-1, Material-2, Material-3, Energy, Waste.</p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                                {/* Factory & Production */}
                                <div className="bg-[#0b0d14] p-4 rounded-xl border border-slate-800 space-y-1.5">
                                    <span className="text-indigo-400 uppercase font-bold text-[10px] block">Factory & Production</span>
                                    <div><span className="text-slate-400">Factory:</span> <strong className="text-slate-200">{setupData.name}</strong></div>
                                    <div><span className="text-slate-400">Industry:</span> <span className="text-slate-300">{setupData.industry}</span></div>
                                    <div><span className="text-slate-400">Processes:</span> <span className="text-indigo-300">{setupData.processes.join(', ')}</span></div>
                                </div>

                                {/* Energy & Waste */}
                                <div className="bg-[#0b0d14] p-4 rounded-xl border border-slate-800 space-y-1.5">
                                    <span className="text-emerald-400 uppercase font-bold text-[10px] block">Energy & Waste</span>
                                    <div><span className="text-slate-400">Grid Electricity:</span> <strong className="text-amber-400">{setupData.gridPowerKwh?.toLocaleString()} kWh</strong></div>
                                    <div><span className="text-slate-400">Solar PV:</span> <span className="text-emerald-400">{setupData.solarKwh?.toLocaleString()} kWh</span></div>
                                    <div><span className="text-slate-400">Waste Scrap:</span> <strong className="text-rose-400">{setupData.wasteTonnes} Tonnes/yr</strong></div>
                                </div>

                                {/* Material-1 */}
                                <div className="bg-[#0b0d14] p-4 rounded-xl border border-slate-800 space-y-2 sm:col-span-2">
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                                        <span className="text-indigo-400 uppercase font-bold text-[10px]">Material-1 ({m1List.length} Materials Configured)</span>
                                    </div>
                                    {m1List.length === 0 ? (
                                        <p className="text-slate-500 italic">No materials configured in Material-1</p>
                                    ) : (
                                        <div className="grid sm:grid-cols-2 gap-2">
                                            {m1List.map((m, idx) => (
                                                <div key={idx} className="bg-[#141728] p-2.5 rounded-lg border border-slate-800">
                                                    <strong className="text-slate-200 block text-xs font-sans">{m.materialName}</strong>
                                                    <span className="text-emerald-400 font-bold">{m.quantity} {m.unit}</span>
                                                    <span className="text-slate-400 text-[10px] block mt-0.5 font-mono">{(m.useCases || []).length} Use Cases</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Material-2 */}
                                <div className="bg-[#0b0d14] p-4 rounded-xl border border-slate-800 space-y-2 sm:col-span-2">
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                                        <span className="text-indigo-400 uppercase font-bold text-[10px]">Material-2 ({m2List.length} Materials Configured)</span>
                                    </div>
                                    {m2List.length === 0 ? (
                                        <p className="text-slate-500 italic">No materials configured in Material-2</p>
                                    ) : (
                                        <div className="grid sm:grid-cols-2 gap-2">
                                            {m2List.map((m, idx) => (
                                                <div key={idx} className="bg-[#141728] p-2.5 rounded-lg border border-slate-800">
                                                    <strong className="text-slate-200 block text-xs font-sans">{m.materialName}</strong>
                                                    <span className="text-emerald-400 font-bold">{m.quantity} {m.unit}</span>
                                                    <span className="text-slate-400 text-[10px] block mt-0.5 font-mono">{(m.useCases || []).length} Use Cases</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Material-3 */}
                                <div className="bg-[#0b0d14] p-4 rounded-xl border border-slate-800 space-y-2 sm:col-span-2">
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                                        <span className="text-indigo-400 uppercase font-bold text-[10px]">Material-3 ({m3List.length} Materials Configured)</span>
                                    </div>
                                    {m3List.length === 0 ? (
                                        <p className="text-slate-500 italic">No materials configured in Material-3</p>
                                    ) : (
                                        <div className="grid sm:grid-cols-2 gap-2">
                                            {m3List.map((m, idx) => (
                                                <div key={idx} className="bg-[#141728] p-2.5 rounded-lg border border-slate-800">
                                                    <strong className="text-slate-200 block text-xs font-sans">{m.materialName}</strong>
                                                    <span className="text-emerald-400 font-bold">{m.quantity} {m.unit}</span>
                                                    <span className="text-slate-400 text-[10px] block mt-0.5 font-mono">{(m.useCases || []).length} Use Cases</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-800/80 mt-6">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 border ${currentStep === 1
                                ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                                : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                                }`}
                        >
                            <ChevronLeft className="w-4 h-4" /> Previous
                        </button>

                        <button
                            onClick={handleNext}
                            className="px-6 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-950 flex items-center gap-2 border border-indigo-500/30 transition-all hover:scale-105"
                        >
                            <span>{currentStep === 8 ? 'Analyze Factory' : 'Next Step'}</span>
                            {currentStep === 8 ? <Sparkles className="w-4 h-4 text-amber-300" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
