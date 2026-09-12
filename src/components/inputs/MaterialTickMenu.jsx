import React, { useState } from 'react';
import {
    CheckSquare,
    Square,
    ChevronDown,
    ChevronUp,
    Plus,
    Tag,
    DollarSign,
    Layers,
    Info,
    Sparkles,
    Trash2,
    CheckCircle2,
    AlertCircle,
    Flame
} from 'lucide-react';
import { MASTER_INDUSTRIAL_INPUTS } from '../../data/industrialInputs';
import { getEmissionFactor } from '../../services/carbonEmissionEngine';

export const MaterialTickMenu = ({
    selectedMaterials = [],
    onToggleMaterial,
    onUpdateMaterialDetails,
    onAddCustomMaterial,
    onRemoveCustomMaterial,
    groupId = 'material1'
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedItem, setExpandedItem] = useState(null);

    // Custom Material Form State
    const [isAddingCustom, setIsAddingCustom] = useState(false);
    const [customMaterialName, setCustomMaterialName] = useState('');
    const [customUseCase, setCustomUseCase] = useState('');
    const [customQuantity, setCustomQuantity] = useState('');
    const [customUnit, setCustomUnit] = useState('tonnes');
    const [customCostPerUnit, setCustomCostPerUnit] = useState('');
    const [customNotes, setCustomNotes] = useState('');
    const [customProcessDesc, setCustomProcessDesc] = useState('');

    // Filter master inputs for current section or search
    const masterItems = MASTER_INDUSTRIAL_INPUTS.filter(item => {
        if (groupId && groupId !== 'all' && item.groupId !== groupId) return false;
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            item.name.toLowerCase().includes(q) ||
            item.searchKeywords.some(k => k.toLowerCase().includes(q))
        );
    });

    // Check if material is ticked (robust check matching id, inputId, or selectedMaterialId)
    const isTicked = (id) => selectedMaterials.some(m => (m.inputId === id || m.id === id || m.selectedMaterialId === id));

    const getMaterialConfig = (id) => selectedMaterials.find(m => (m.inputId === id || m.id === id || m.selectedMaterialId === id));

    const handleCheckboxToggle = (item) => {
        const id = item.id || item.inputId;
        const alreadySelected = isTicked(id);

        if (alreadySelected) {
            onToggleMaterial(id, false);
            if (expandedItem === id) setExpandedItem(null);
        } else {
            // Default initial payload when ticking
            const defaultUseCase = item.sectors && item.sectors.length > 0 ? item.sectors[0].label : 'General Process';
            const payload = {
                inputId: item.id,
                id: item.id,
                selectedMaterialId: item.id,
                name: item.name,
                materialName: item.name,
                category: item.category || 'Raw Material',
                co2Share: item.co2Share || '15–20%',
                basis: item.basis || 'Process fuel/reductant',
                selectedUseCases: item.sectors ? [item.sectors[0].id] : ['general'],
                useCases: item.sectors ? [item.sectors[0].id] : ['general'],
                useCaseText: defaultUseCase,
                quantity: 1000,
                unit: item.defaultUnit || 'tonnes',
                costPerUnit: item.defaultCostPerUnit || 85000,
                cost: item.defaultCostPerUnit || 85000,
                annualConsumption: 1000,
                notes: '',
                isCustom: false
            };
            onToggleMaterial(id, true, payload);
            setExpandedItem(id);
        }
    };

    const handleSaveCustom = (e) => {
        e.preventDefault();
        if (!customMaterialName.trim()) return;

        const customId = `custom-mat-${Date.now()}`;
        const payload = {
            inputId: customId,
            id: customId,
            name: customMaterialName.trim(),
            category: 'Custom Raw Material',
            co2Share: 'User Defined',
            basis: customProcessDesc || 'Custom Industrial Feedstock',
            selectedUseCases: ['custom-use-case'],
            useCaseText: customUseCase.trim() || 'Custom Industrial Process',
            quantity: Number(customQuantity) || 500,
            unit: customUnit || 'tonnes',
            costPerUnit: Number(customCostPerUnit) || 50000,
            annualConsumption: Number(customQuantity) || 500,
            notes: customNotes || '',
            processDescription: customProcessDesc,
            isCustom: true,
            tag: 'USER INPUT'
        };

        if (onAddCustomMaterial) {
            onAddCustomMaterial(payload);
        }

        // Reset form
        setCustomMaterialName('');
        setCustomUseCase('');
        setCustomQuantity('');
        setCustomCostPerUnit('');
        setCustomNotes('');
        setCustomProcessDesc('');
        setIsAddingCustom(false);
        setExpandedItem(customId);
    };

    return (
        <div className="space-y-4">
            {/* SEARCH & ADD CUSTOM BAR */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#101322] p-4 rounded-xl border border-slate-800">
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search curated dataset raw materials (e.g. Coking Coal, Natural Gas, Clinker...)"
                        className="w-full bg-[#0b0e19] border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                </div>

                <button
                    type="button"
                    onClick={() => setIsAddingCustom(true)}
                    className="px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-mono font-bold shadow-md shadow-indigo-950 flex items-center justify-center gap-2 transition-all shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    <span>+ Add Other Material</span>
                </button>
            </div>

            {/* CUSTOM MATERIAL MODAL / INLINE FORM */}
            {isAddingCustom && (
                <form onSubmit={handleSaveCustom} className="bg-gradient-to-br from-[#121629] via-[#0f1222] to-[#0a0d1a] border-2 border-indigo-500/60 rounded-2xl p-5 space-y-4 shadow-2xl animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-indigo-400" />
                            <h4 className="text-sm font-bold text-slate-100 font-mono">+ Add Custom Raw Material (User Defined)</h4>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold uppercase">
                            USER INPUT
                        </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                        <div>
                            <label className="text-slate-400 block mb-1">Material Name *</label>
                            <input
                                type="text"
                                required
                                value={customMaterialName}
                                onChange={(e) => setCustomMaterialName(e.target.value)}
                                placeholder="e.g. Methanol, Rice Husk, Aluminium Dross, Waste Plastic, Hydrogen..."
                                className="w-full bg-[#0b0d14] border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="text-slate-400 block mb-1">Use Case / Industrial Process *</label>
                            <input
                                type="text"
                                required
                                value={customUseCase}
                                onChange={(e) => setCustomUseCase(e.target.value)}
                                placeholder="e.g. Process heat for 600°C furnace, chemical feedstock..."
                                className="w-full bg-[#0b0d14] border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="text-slate-400 block mb-1">Annual Consumption Quantity *</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    value={customQuantity}
                                    onChange={(e) => setCustomQuantity(e.target.value)}
                                    placeholder="e.g. 500"
                                    className="flex-1 bg-[#0b0d14] border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-indigo-500"
                                />
                                <select
                                    value={customUnit}
                                    onChange={(e) => setCustomUnit(e.target.value)}
                                    className="bg-[#0b0d14] border border-slate-700 rounded-lg px-3 py-2 text-slate-200"
                                >
                                    <option value="tonnes">tonnes/yr</option>
                                    <option value="Nm³">Nm³/yr</option>
                                    <option value="kg">kg/yr</option>
                                    <option value="MWh">MWh/yr</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-slate-400 block mb-1">Unit Cost (₹ / unit)</label>
                            <input
                                type="number"
                                value={customCostPerUnit}
                                onChange={(e) => setCustomCostPerUnit(e.target.value)}
                                placeholder="e.g. 45000"
                                className="w-full bg-[#0b0d14] border border-slate-700 rounded-lg px-3 py-2 text-amber-300 focus:border-indigo-500"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="text-slate-400 block mb-1">Process Description / Operating Specs (Natural Language)</label>
                            <textarea
                                rows={2}
                                value={customProcessDesc}
                                onChange={(e) => setCustomProcessDesc(e.target.value)}
                                placeholder="Describe operating temperature, furnace pressure, supplier, or quality specifications..."
                                className="w-full bg-[#0b0d14] border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                        <button
                            type="button"
                            onClick={() => setIsAddingCustom(false)}
                            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold shadow-md shadow-emerald-950 flex items-center gap-1.5"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Save & Tick Custom Material</span>
                        </button>
                    </div>
                </form>
            )}

            {/* TICKABLE MATERIALS MENU LIST */}
            <div className="space-y-3">
                {/* Custom Ticked Materials Section */}
                {selectedMaterials.filter(m => m.isCustom).map((cust) => {
                    const isExpanded = expandedItem === cust.inputId;
                    const ef = getEmissionFactor(cust);
                    const emissionsTCO2e = (Number(cust.quantity || 0) * ef).toFixed(1);

                    return (
                        <div
                            key={cust.inputId}
                            className="bg-[#121626] border-2 border-indigo-500/80 rounded-2xl overflow-hidden shadow-xl transition-all"
                        >
                            {/* Tick Header */}
                            <div className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40">
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => onRemoveCustomMaterial && onRemoveCustomMaterial(cust.inputId)}
                                        className="text-indigo-400 hover:text-indigo-300"
                                    >
                                        <CheckSquare className="w-5 h-5 fill-indigo-600/30" />
                                    </button>

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-slate-100 font-mono">{cust.name}</span>
                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold">
                                                USER INPUT
                                            </span>
                                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                                                ~{emissionsTCO2e} tCO2e/yr
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                                            Process: <span className="text-slate-300">{cust.useCaseText}</span> • Qty: <span className="text-slate-200">{cust.quantity} {cust.unit}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setExpandedItem(isExpanded ? null : cust.inputId)}
                                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                                    >
                                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>

                                    {onRemoveCustomMaterial && (
                                        <button
                                            type="button"
                                            onClick={() => onRemoveCustomMaterial(cust.inputId)}
                                            className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400 hover:text-rose-200 border border-rose-800/60"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Expanded Details Form */}
                            {isExpanded && (
                                <div className="p-4 bg-[#0b0e19] border-t border-slate-800 grid sm:grid-cols-2 gap-4 text-xs font-mono">
                                    <div>
                                        <label className="text-slate-400 block mb-1">Use Case / Process</label>
                                        <input
                                            type="text"
                                            value={cust.useCaseText || ''}
                                            onChange={(e) => onUpdateMaterialDetails(cust.inputId, { useCaseText: e.target.value })}
                                            className="w-full bg-[#121522] border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-slate-400 block mb-1">Annual Consumption Quantity</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                value={cust.quantity || ''}
                                                onChange={(e) => onUpdateMaterialDetails(cust.inputId, { quantity: Number(e.target.value), annualConsumption: Number(e.target.value) })}
                                                className="flex-1 bg-[#121522] border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
                                            />
                                            <span className="px-3 py-2 bg-slate-800 rounded-lg text-slate-300 flex items-center">{cust.unit}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-slate-400 block mb-1">Unit Cost (₹ / unit)</label>
                                        <input
                                            type="number"
                                            value={cust.costPerUnit || ''}
                                            onChange={(e) => onUpdateMaterialDetails(cust.inputId, { costPerUnit: Number(e.target.value), cost: Number(e.target.value) })}
                                            className="w-full bg-[#121522] border border-slate-700 rounded-lg px-3 py-2 text-amber-300"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-slate-400 block mb-1">Operational / Process Details</label>
                                        <input
                                            type="text"
                                            value={cust.processDescription || cust.notes || ''}
                                            onChange={(e) => onUpdateMaterialDetails(cust.inputId, { processDescription: e.target.value, notes: e.target.value })}
                                            className="w-full bg-[#121522] border border-slate-700 rounded-lg px-3 py-2 text-slate-200"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Curated Dataset Materials */}
                {masterItems.map((item) => {
                    const ticked = isTicked(item.id);
                    const config = getMaterialConfig(item.id);
                    const isExpanded = expandedItem === item.id;
                    const ef = getEmissionFactor(item);
                    const emissionsTCO2e = config ? (Number(config.quantity || 1000) * ef).toFixed(1) : (1000 * ef).toFixed(1);

                    return (
                        <div
                            key={item.id}
                            className={`rounded-2xl border transition-all overflow-hidden ${ticked
                                ? 'bg-[#101424] border-indigo-500/70 shadow-lg'
                                : 'bg-[#0c0f1d] border-slate-800/80 hover:border-slate-700'
                                }`}
                        >
                            {/* Tick Box Header Row */}
                            <div
                                onClick={() => handleCheckboxToggle(item)}
                                className="p-4 flex items-center justify-between gap-4 cursor-pointer"
                            >
                                <div className="flex items-center gap-3.5">
                                    <button
                                        type="button"
                                        className={`transition-colors ${ticked ? 'text-indigo-400' : 'text-slate-600 hover:text-slate-400'}`}
                                    >
                                        {ticked ? (
                                            <CheckSquare className="w-5 h-5 fill-indigo-600/30" />
                                        ) : (
                                            <Square className="w-5 h-5" />
                                        )}
                                    </button>

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className={`text-sm font-bold font-sans ${ticked ? 'text-slate-100' : 'text-slate-300'}`}>
                                                {item.name}
                                            </h4>
                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                                {item.co2Share} Footprint
                                            </span>
                                            {ticked && (
                                                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                                                    ~{emissionsTCO2e} tCO2e/yr
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                                            {item.basis} • {item.sectors?.length || 0} Standard Sectors
                                        </p>
                                    </div>
                                </div>

                                {ticked && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setExpandedItem(isExpanded ? null : item.id);
                                        }}
                                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                                    >
                                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>
                                )}
                            </div>

                            {/* Ticked Details Form - Always visible on tick to ensure use case selection */}
                            {ticked && config && (
                                <div className="p-4 bg-[#090b14] border-t border-slate-800/80 grid sm:grid-cols-2 gap-4 text-xs font-mono">
                                    <div>
                                        <label className="text-slate-400 block mb-1">Use Case / Sector Process</label>
                                        <select
                                            value={config.selectedUseCases?.[0] || item.sectors?.[0]?.id}
                                            onChange={(e) => {
                                                const sel = item.sectors?.find(s => s.id === e.target.value);
                                                onUpdateMaterialDetails(item.id, {
                                                    selectedUseCases: [e.target.value],
                                                    useCaseText: sel ? sel.label : e.target.value
                                                });
                                            }}
                                            className="w-full bg-[#101322] border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
                                        >
                                            {item.sectors?.map(s => (
                                                <option key={s.id} value={s.id}>{s.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-slate-400 block mb-1">Annual Consumption Quantity</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                value={config.quantity || 1000}
                                                onChange={(e) => onUpdateMaterialDetails(item.id, {
                                                    quantity: Number(e.target.value),
                                                    annualConsumption: Number(e.target.value)
                                                })}
                                                className="flex-1 bg-[#101322] border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-bold"
                                            />
                                            <select
                                                value={config.unit || item.defaultUnit}
                                                onChange={(e) => onUpdateMaterialDetails(item.id, { unit: e.target.value })}
                                                className="bg-[#101322] border border-slate-700 rounded-lg px-3 py-2 text-slate-300"
                                            >
                                                {item.units?.map(u => (
                                                    <option key={u} value={u}>{u}/yr</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-slate-400 block mb-1">Unit Cost (₹ / unit)</label>
                                        <input
                                            type="number"
                                            value={config.costPerUnit || item.defaultCostPerUnit || 85000}
                                            onChange={(e) => onUpdateMaterialDetails(item.id, {
                                                costPerUnit: Number(e.target.value),
                                                cost: Number(e.target.value)
                                            })}
                                            className="w-full bg-[#101322] border border-slate-700 rounded-lg px-3 py-2 text-amber-300 font-bold"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-slate-400 block mb-1">Operational Notes</label>
                                        <input
                                            type="text"
                                            value={config.notes || ''}
                                            onChange={(e) => onUpdateMaterialDetails(item.id, { notes: e.target.value })}
                                            placeholder="Optional operating conditions..."
                                            className="w-full bg-[#101322] border border-slate-700 rounded-lg px-3 py-2 text-slate-300"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
