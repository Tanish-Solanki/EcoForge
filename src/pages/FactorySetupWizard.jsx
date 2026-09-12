import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFactory } from '../context/FactoryContext';
import { MaterialSectionStep } from '../components/inputs/MaterialSectionStep';
import { CombinedMaterialStep } from '../components/inputs/CombinedMaterialStep';
import {
    Factory,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    Zap,
    Trash2,
    Sparkles,
    Check,
    Plus,
    X,
    Layers,
    RotateCcw,
    PlusCircle
} from 'lucide-react';

const steps = [
    { id: 1, title: 'Factory', desc: 'Facility Details' },
    { id: 2, title: 'Production', desc: 'Processes' },
    { id: 3, title: 'Material', desc: 'Feedstocks & Inputs' },
    { id: 4, title: 'Energy', desc: 'Power & Fuels' },
    { id: 5, title: 'Waste', desc: 'Scrap & Diversion' },
    { id: 6, title: 'Review', desc: 'Summary & Launch' }
];

const DEFAULT_PROCESS_OPTIONS = [
    'Injection Molding',
    'Extrusion',
    'Blow Molding',
    'Thermoforming',
    'Compounding',
    'CNC Machining',
    'Metal Stamping & Pressing',
    'Die Casting & Foundry',
    'Metal Forging',
    'Additive Manufacturing (3D Printing)',
    'Rotational Molding',
    'Compression Molding',
    'Assembly & Automated Welding',
    'Heat Treatment & Annealing',
    'Surface Finishing & Electroplating',
    'Blown Film Extrusion',
    'Roll Forming & Bending',
    'Sintering & Powder Metallurgy'
];

export const FactorySetupWizard = () => {
    const navigate = useNavigate();
    const { setupData, setSetupData, updateSetupSection, runFactoryAnalysis } = useFactory();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedDropdownProcess, setSelectedDropdownProcess] = useState('');
    const [customProcessInput, setCustomProcessInput] = useState('');

    const updateField = (field, val) => {
        setSetupData(prev => ({ ...prev, [field]: val }));
    };

    const handleAddProcess = (procName) => {
        if (!procName || !procName.trim()) return;
        const cleanName = procName.trim();
        const currentProcesses = setupData.processes || [];
        if (!currentProcesses.includes(cleanName)) {
            updateField('processes', [...currentProcesses, cleanName]);
        }
        setSelectedDropdownProcess('');
    };

    const handleAddCustomProcess = (e) => {
        e.preventDefault();
        if (customProcessInput.trim()) {
            handleAddProcess(customProcessInput.trim());
            setCustomProcessInput('');
        }
    };

    const handleRemoveProcess = (procName) => {
        const currentProcesses = setupData.processes || [];
        updateField('processes', currentProcesses.filter(p => p !== procName));
    };

    const m1List = Array.isArray(setupData.material1) ? setupData.material1 : (setupData.material1?.selectedMaterialId ? [setupData.material1] : []);
    const m2List = Array.isArray(setupData.material2) ? setupData.material2 : (setupData.material2?.selectedMaterialId ? [setupData.material2] : []);
    const m3List = Array.isArray(setupData.material3) ? setupData.material3 : (setupData.material3?.selectedMaterialId ? [setupData.material3] : []);

    const combinedMaterials = Array.isArray(setupData.materials) && setupData.materials.length > 0
        ? setupData.materials
        : [...m1List, ...m2List, ...m3List];

    const handleNext = () => {
        if (currentStep < 6) {
            setCurrentStep(prev => prev + 1);
        } else {
            // TRIGGER FULL DATASET FACTORY REPORT COMPUTATION ON ANALYZE FACTORY
            runFactoryAnalysis(combinedMaterials, setupData);
            navigate('/dashboard');
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

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
                                Setup Workflow
                            </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono">Step {currentStep} of 6: {steps[currentStep - 1]?.title}</p>
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
                {/* Fixed 6-Step Navigation Header */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
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
                        <div className="space-y-6">
                            <div>
                                <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">Step 02 / Production Processes</span>
                                <h2 className="text-xl font-bold text-slate-100 mt-1">Active Manufacturing Operations</h2>
                                <p className="text-xs text-slate-400">Select primary industrial transformation processes deployed in your facility using the dropdown menu below.</p>
                            </div>

                            {/* Dropdown Selector & Custom Add Controls */}
                            <div className="grid md:grid-cols-2 gap-4 bg-[#0b0d14] p-4 rounded-xl border border-slate-800/80">
                                <div>
                                    <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                                        <Layers className="w-3.5 h-3.5 text-indigo-400" />
                                        Select Production Process from List
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedDropdownProcess}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setSelectedDropdownProcess(val);
                                                if (val) {
                                                    handleAddProcess(val);
                                                }
                                            }}
                                            className="w-full bg-[#121522] border border-slate-700/80 rounded-lg px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 font-sans cursor-pointer"
                                        >
                                            <option value="">-- Choose a production process --</option>
                                            {DEFAULT_PROCESS_OPTIONS.map((proc) => {
                                                const isAlreadyAdded = (setupData.processes || []).includes(proc);
                                                return (
                                                    <option
                                                        key={proc}
                                                        value={proc}
                                                        disabled={isAlreadyAdded}
                                                    >
                                                        {proc} {isAlreadyAdded ? '(Already Selected)' : ''}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-1">Selecting an option immediately adds it to your facility's active process list.</p>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                                        <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
                                        Or Add Custom Production Process
                                    </label>
                                    <form onSubmit={handleAddCustomProcess} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={customProcessInput}
                                            onChange={(e) => setCustomProcessInput(e.target.value)}
                                            placeholder="e.g. Ultrasonic Welding, Hot Stamping..."
                                            className="flex-1 bg-[#121522] border border-slate-700/80 rounded-lg px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 font-sans"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!customProcessInput.trim()}
                                            className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${customProcessInput.trim()
                                                ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                                }`}
                                        >
                                            <Plus className="w-3.5 h-3.5" /> Add
                                        </button>
                                    </form>
                                    <p className="text-[11px] text-slate-400 mt-1">Enter any specialized or custom manufacturing process deployed in your plant.</p>
                                </div>
                            </div>

                            {/* Active Processes Selected List Display */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                                        Selected Active Processes
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-800">
                                            {setupData.processes?.length || 0} active
                                        </span>
                                    </h3>
                                    {setupData.processes?.length > 0 && (
                                        <button
                                            onClick={() => updateField('processes', [])}
                                            className="text-[11px] font-mono text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                                        >
                                            <RotateCcw className="w-3 h-3" /> Clear All
                                        </button>
                                    )}
                                </div>

                                {(!setupData.processes || setupData.processes.length === 0) ? (
                                    <div className="border border-dashed border-slate-800 rounded-xl p-8 text-center bg-[#0b0d14]">
                                        <Layers className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                                        <p className="text-xs text-slate-400 font-medium">No production processes selected yet</p>
                                        <p className="text-[11px] text-slate-500 mt-1">Use the dropdown menu above or custom input to add manufacturing operations.</p>
                                    </div>
                                ) : (
                                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                                        {setupData.processes.map((proc) => (
                                            <div
                                                key={proc}
                                                className="bg-[#0b0d14] border border-indigo-900/60 hover:border-indigo-500/70 p-3 rounded-xl flex items-center justify-between group transition-all shadow-sm"
                                            >
                                                <div className="flex items-center gap-2.5 truncate">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                                    <span className="text-xs font-medium text-slate-100 truncate">{proc}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveProcess(proc)}
                                                    title="Remove process"
                                                    className="text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 p-1 rounded-md transition-colors"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Quick Add Suggestions */}
                            {['Injection Molding', 'Extrusion', 'Blow Molding', 'Thermoforming', 'Compounding', 'CNC Machining'].filter(p => !(setupData.processes || []).includes(p)).length > 0 && (
                                <div className="pt-2">
                                    <span className="text-[11px] font-mono text-slate-400 block mb-2">Quick Add Popular Operations:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {['Injection Molding', 'Extrusion', 'Blow Molding', 'Thermoforming', 'Compounding', 'CNC Machining']
                                            .filter(p => !(setupData.processes || []).includes(p))
                                            .map((p) => (
                                                <button
                                                    key={p}
                                                    onClick={() => handleAddProcess(p)}
                                                    className="text-[11px] bg-slate-900 hover:bg-indigo-950/80 border border-slate-800 hover:border-indigo-700 text-slate-300 hover:text-indigo-200 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                                                >
                                                    <Plus className="w-3 h-3 text-indigo-400" /> {p}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* STEP 3: Combined Material Section */}
                    {currentStep === 3 && (
                        <CombinedMaterialStep
                            materialsList={combinedMaterials}
                            onUpdate={(newList) => {
                                updateField('materials', newList);
                            }}
                        />
                    )}

                    {/* STEP 4: Energy & Power */}
                    {currentStep === 4 && (
                        <div className="space-y-4">
                            <div>
                                <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">Step 04 / Energy & Fuel Consumption</span>
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

                    {/* STEP 5: Waste & Diversion */}
                    {currentStep === 5 && (
                        <div className="space-y-4">
                            <div>
                                <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">Step 05 / Waste Streams</span>
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

                    {/* STEP 6: Review & Summary */}
                    {currentStep === 6 && (
                        <div className="space-y-4">
                            <div>
                                <span className="text-xs font-mono uppercase text-emerald-400 font-semibold flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Step 06 / Factory Profile Ready
                                </span>
                                <h2 className="text-xl font-bold text-slate-100 mt-1">Review & Launch Carbon Analysis</h2>
                                <p className="text-xs text-slate-400">Verify all configuration sections: Factory, Production, Material, Energy, Waste.</p>
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

                                {/* Configured Materials */}
                                <div className="bg-[#0b0d14] p-4 rounded-xl border border-slate-800 space-y-2 sm:col-span-2">
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                                        <span className="text-indigo-400 uppercase font-bold text-[10px]">Configured Materials ({combinedMaterials.length} Items)</span>
                                    </div>
                                    {combinedMaterials.length === 0 ? (
                                        <p className="text-slate-500 italic">No materials configured yet</p>
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="grid sm:grid-cols-2 gap-2">
                                                {combinedMaterials.map((m, idx) => {
                                                    const costPerUnit = Number(m.costPerUnit ?? m.cost ?? 85000);
                                                    const totalCost = (Number(m.quantity) || 0) * costPerUnit;
                                                    return (
                                                        <div key={idx} className="bg-[#141728] p-2.5 rounded-lg border border-slate-800 space-y-1">
                                                            <strong className="text-slate-200 block text-xs font-sans">{m.materialName}</strong>
                                                            <div className="flex items-center justify-between text-xs font-mono">
                                                                <span className="text-emerald-400 font-bold">{m.quantity?.toLocaleString()} {m.unit}</span>
                                                                <span className="text-amber-400 font-bold">₹ {totalCost.toLocaleString()}</span>
                                                            </div>
                                                            <span className="text-slate-400 text-[10px] block font-mono">
                                                                Cost: ₹{costPerUnit.toLocaleString()} / {m.unit} | Use Case: {Array.isArray(m.useCases) ? m.useCases.join(', ') : m.useCase || 'N/A'}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="p-3 bg-[#0b0d14] rounded-lg border border-slate-800 flex items-center justify-between font-mono text-xs">
                                                <span className="text-slate-400">Combined Total Material Expense Budget:</span>
                                                <span className="text-amber-400 font-bold">
                                                    ₹ {combinedMaterials.reduce((acc, curr) => acc + ((Number(curr.quantity) || 0) * Number(curr.costPerUnit ?? curr.cost ?? 85000)), 0).toLocaleString()}
                                                </span>
                                            </div>
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
                            <span>{currentStep === 6 ? 'Analyze Factory' : 'Next Step'}</span>
                            {currentStep === 6 ? <Sparkles className="w-4 h-4 text-amber-300" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
