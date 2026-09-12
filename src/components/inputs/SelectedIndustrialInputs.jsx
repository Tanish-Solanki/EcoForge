import React, { useState, useMemo } from 'react';
import { Plus, Factory, Layers, AlertCircle, CheckCircle2, X, Trash2, Edit3, Save, Info, Tag, Check, ChevronRight } from 'lucide-react';
import { IndustrialInputSelector } from './IndustrialInputSelector';
import { UseCaseSelector } from './UseCaseSelector';
import { ActivityDataForm } from './ActivityDataForm';
import { MASTER_INDUSTRIAL_INPUTS, INDUSTRIAL_CATEGORIES } from '../../data/industrialInputs';

export const SelectedIndustrialInputs = ({
    industrialInputs = [],
    onAddInput,
    onUpdateInput,
    onRemoveInput
}) => {
    // Selected category filter: 'all' | 'materials' | 'energy-fuels' | 'chemicals-industrial'
    const [activeCategory, setActiveCategory] = useState('all');
    // Active material tab selected by inputId
    const [selectedInputId, setSelectedInputId] = useState(industrialInputs[0]?.inputId || null);

    // Modal state for "+ Add Material"
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newInputObj, setNewInputObj] = useState(null);
    const [newUseCases, setNewUseCases] = useState([]);
    const [newFormData, setNewFormData] = useState({ quantity: '', unit: 'tonnes', notes: '' });
    const [modalError, setModalError] = useState('');

    // Ensure selectedInputId stays valid
    const validSelectedId = useMemo(() => {
        if (!industrialInputs || industrialInputs.length === 0) return null;
        const exists = industrialInputs.find(i => i.inputId === selectedInputId);
        return exists ? selectedInputId : industrialInputs[0].inputId;
    }, [industrialInputs, selectedInputId]);

    // Currently active input item for main workspace editor
    const activeItem = useMemo(() => {
        if (!validSelectedId) return null;
        return industrialInputs.find(i => i.inputId === validSelectedId) || null;
    }, [industrialInputs, validSelectedId]);

    // Master dataset metadata for active item
    const activeMasterObj = useMemo(() => {
        if (!activeItem) return null;
        return MASTER_INDUSTRIAL_INPUTS.find(m => m.id === activeItem.inputId) || {
            id: activeItem.inputId,
            name: activeItem.name,
            category: activeItem.category,
            co2Share: activeItem.co2Share,
            basis: activeItem.basis,
            sectors: [],
            defaultUnit: activeItem.unit || 'tonnes',
            units: [activeItem.unit || 'tonnes']
        };
    }, [activeItem]);

    // Filter inputs based on active category tab
    const filteredInputs = useMemo(() => {
        if (activeCategory === 'all') return industrialInputs;
        return industrialInputs.filter(i => i.category === activeCategory);
    }, [industrialInputs, activeCategory]);

    // Count items per category for badges
    const categoryCounts = useMemo(() => {
        const counts = { all: industrialInputs.length, materials: 0, 'energy-fuels': 0, 'chemicals-industrial': 0 };
        industrialInputs.forEach(item => {
            if (counts[item.category] !== undefined) counts[item.category]++;
        });
        return counts;
    }, [industrialInputs]);

    // Open Add Modal
    const openAddModal = () => {
        setNewInputObj(null);
        setNewUseCases([]);
        setNewFormData({ quantity: '', unit: 'tonnes', notes: '' });
        setModalError('');
        setIsAddModalOpen(true);
    };

    const handleSelectNewInput = (itemObj) => {
        setNewInputObj(itemObj);
        if (itemObj.sectors && itemObj.sectors.length > 0) {
            setNewUseCases([itemObj.sectors[0].id]);
        } else {
            setNewUseCases([]);
        }
        setNewFormData(prev => ({
            ...prev,
            unit: itemObj.defaultUnit || (itemObj.units && itemObj.units[0]) || 'tonnes'
        }));
        setModalError('');
    };

    const handleToggleNewUseCase = (useCaseId) => {
        setNewUseCases(prev => prev.includes(useCaseId) ? prev.filter(id => id !== useCaseId) : [...prev, useCaseId]);
        setModalError('');
    };

    const handleSaveNewInput = (e) => {
        e.preventDefault();
        if (!newInputObj) {
            setModalError('Please select an industrial input from the master dataset.');
            return;
        }
        if (newUseCases.length === 0) {
            setModalError('Please select at least one applicable use case/sector.');
            return;
        }
        if (!newFormData.quantity || isNaN(newFormData.quantity) || Number(newFormData.quantity) <= 0) {
            setModalError('Please enter a valid numeric annual quantity (greater than 0).');
            return;
        }

        const duplicate = industrialInputs.find(i => i.inputId === newInputObj.id);
        if (duplicate) {
            setModalError(`Input "${newInputObj.name}" is already configured. Select its tab to edit.`);
            return;
        }

        const payload = {
            inputId: newInputObj.id,
            name: newInputObj.name,
            category: newInputObj.category,
            co2Share: newInputObj.co2Share,
            basis: newInputObj.basis,
            selectedUseCases: newUseCases,
            quantity: Number(newFormData.quantity),
            unit: newFormData.unit,
            annualConsumption: Number(newFormData.quantity),
            notes: newFormData.notes
        };

        onAddInput(payload);
        setSelectedInputId(payload.inputId);
        // Switch category filter to 'all' or matching category so new tab is visible
        if (activeCategory !== 'all' && activeCategory !== payload.category) {
            setActiveCategory(payload.category);
        }
        setIsAddModalOpen(false);
    };

    // Workspace inline edit updates for activeItem
    const handleActiveUseCaseToggle = (useCaseId) => {
        if (!activeItem) return;
        const currentCases = activeItem.selectedUseCases || [];
        const nextCases = currentCases.includes(useCaseId)
            ? currentCases.filter(id => id !== useCaseId)
            : [...currentCases, useCaseId];

        onUpdateInput(activeItem.inputId, { selectedUseCases: nextCases });
    };

    const handleActiveFieldChange = (field, val) => {
        if (!activeItem) return;
        onUpdateInput(activeItem.inputId, { [field]: val });
    };

    const handleRemoveActiveItem = () => {
        if (!activeItem) return;
        const removingId = activeItem.inputId;
        const nextList = industrialInputs.filter(i => i.inputId !== removingId);
        onRemoveInput(removingId);
        if (nextList.length > 0) {
            setSelectedInputId(nextList[0].inputId);
        } else {
            setSelectedInputId(null);
        }
    };

    return (
        <div className="space-y-5">
            {/* Title Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#101322] p-4 sm:p-5 rounded-2xl border border-slate-800/90 shadow-xl">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-indigo-400 font-semibold tracking-wider">
                            Industrial Input System
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-bold">
                            {industrialInputs.length} Inputs Configured
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 font-sans tracking-tight mt-1">
                        Categorized Industrial Feedstocks & Sector Workspace
                    </h3>
                </div>

                <button
                    type="button"
                    onClick={openAddModal}
                    className="px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white font-bold text-xs font-mono shadow-md shadow-indigo-950 flex items-center justify-center gap-2 border border-indigo-500/40 transition-all hover:scale-[1.02] shrink-0"
                >
                    <Plus className="w-4 h-4 text-white" />
                    <span>+ Add Material</span>
                </button>
            </div>

            {/* LAYER 1: CATEGORY NAVIGATION TABS */}
            <div className="bg-[#0e111d] p-1.5 rounded-xl border border-slate-800/80 flex items-center gap-1.5 flex-wrap">
                <button
                    type="button"
                    onClick={() => setActiveCategory('all')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-2 ${activeCategory === 'all'
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                        }`}
                >
                    <span>All Categories</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${activeCategory === 'all' ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-800 text-slate-400'
                        }`}>
                        {categoryCounts.all}
                    </span>
                </button>

                {INDUSTRIAL_CATEGORIES.map(cat => {
                    const count = categoryCounts[cat.id] || 0;
                    const isActive = activeCategory === cat.id;
                    return (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-2 ${isActive
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                                }`}
                        >
                            <span>{cat.label}</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isActive ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-800 text-slate-400'
                                }`}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* LAYER 2: DYNAMIC MATERIAL HEADER TABS (HORIZONTALLY SCROLLABLE) */}
            <div className="bg-[#101320] border border-slate-800/90 rounded-2xl p-3 shadow-lg">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800 pb-1 pt-0.5">
                    {filteredInputs.length > 0 ? (
                        filteredInputs.map((item, index) => {
                            // Compute dynamic material display number based on overall index
                            const globalIndex = industrialInputs.findIndex(i => i.inputId === item.inputId);
                            const displayNum = globalIndex >= 0 ? globalIndex + 1 : index + 1;
                            const isSelected = item.inputId === validSelectedId;

                            return (
                                <button
                                    key={item.inputId}
                                    type="button"
                                    onClick={() => setSelectedInputId(item.inputId)}
                                    className={`px-4 py-2.5 rounded-xl border text-left flex flex-col justify-between shrink-0 transition-all min-w-[140px] max-w-[210px] ${isSelected
                                        ? 'bg-indigo-950/90 border-indigo-500 text-slate-100 ring-2 ring-indigo-500/30 shadow-lg shadow-indigo-950'
                                        : 'bg-[#141727] border-slate-800/90 text-slate-400 hover:border-slate-700 hover:bg-[#181c30]'
                                        }`}
                                >
                                    <div className="flex items-center justify-between gap-1 w-full">
                                        <span className={`text-[10px] font-mono uppercase font-bold tracking-wider ${isSelected ? 'text-indigo-300' : 'text-slate-500'
                                            }`}>
                                            Material {displayNum}
                                        </span>
                                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>}
                                    </div>
                                    <span className="text-xs font-semibold font-sans truncate text-slate-100 mt-1 block">
                                        {item.name}
                                    </span>
                                </button>
                            );
                        })
                    ) : (
                        <div className="text-xs font-mono text-slate-500 px-3 py-2">
                            No inputs in this category yet.
                        </div>
                    )}

                    {/* Dynamic "+ Add Material" Button in Tab Bar */}
                    <button
                        type="button"
                        onClick={openAddModal}
                        className="px-4 py-2.5 rounded-xl border border-dashed border-indigo-700/60 bg-indigo-950/30 hover:bg-indigo-950/60 text-indigo-300 hover:text-indigo-200 text-xs font-mono font-bold flex items-center justify-center gap-1.5 shrink-0 transition-all"
                    >
                        <Plus className="w-4 h-4 text-indigo-400" />
                        <span>+ Add Material</span>
                    </button>
                </div>
            </div>

            {/* LAYER 3: SELECTED MATERIAL CONTENT WORKSPACE */}
            {activeItem && activeMasterObj ? (
                <div className="bg-[#101320] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                    {/* Header bar of selected material */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-mono uppercase text-indigo-400 font-bold tracking-widest">
                                    MATERIAL {industrialInputs.findIndex(i => i.inputId === activeItem.inputId) + 1} CONFIGURATION
                                </span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 uppercase">
                                    Category: {activeItem.category}
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-slate-100 font-sans tracking-tight mt-1">
                                {activeItem.name}
                            </h2>
                            <p className="text-xs text-slate-400 font-mono mt-0.5">
                                {activeItem.basis}
                            </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            {/* CO2 Benchmark badge */}
                            <div className="p-2.5 rounded-xl bg-[#141728] border border-slate-800 text-right">
                                <span className="text-[10px] font-mono uppercase text-slate-400 block">Industrial CO2 Share</span>
                                <span className="text-sm font-mono font-bold text-indigo-300">~{activeItem.co2Share}</span>
                                <span className="text-[9px] font-mono text-slate-500 block">Reference</span>
                            </div>

                            <button
                                type="button"
                                onClick={handleRemoveActiveItem}
                                className="p-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 text-xs font-mono flex items-center gap-1.5 transition-colors"
                                title="Remove Material"
                            >
                                <Trash2 className="w-4 h-4 text-rose-400" />
                                <span>Remove</span>
                            </button>
                        </div>
                    </div>

                    {/* Section 1: Applicable Sectors / Use Cases (Dynamic Checkboxes) */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs font-mono font-bold uppercase text-slate-200 tracking-wider">
                                Applicable Sectors & Use Cases
                            </h4>
                            <span className="text-[10px] font-mono text-slate-400">
                                {activeItem.selectedUseCases?.length || 0} Sectors Selected
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                            {(activeMasterObj.sectors || []).map(sec => {
                                const isChecked = (activeItem.selectedUseCases || []).includes(sec.id);
                                return (
                                    <label
                                        key={sec.id}
                                        onClick={() => handleActiveUseCaseToggle(sec.id)}
                                        className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${isChecked
                                            ? 'bg-indigo-950/70 border-indigo-500 text-slate-100'
                                            : 'bg-[#141727] border-slate-800/80 text-slate-400 hover:border-slate-700'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => { }}
                                                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0 cursor-pointer"
                                            />
                                            <span className="text-xs font-medium font-sans">{sec.label}</span>
                                        </div>
                                        {isChecked && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Section 2: Activity Data Inputs */}
                    <div className="space-y-4 pt-2 border-t border-slate-800/60">
                        <h4 className="text-xs font-mono font-bold uppercase text-slate-200 tracking-wider">
                            Activity Data Quantification
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1">Annual Consumption Quantity</label>
                                <input
                                    type="number"
                                    value={activeItem.quantity || ''}
                                    onChange={(e) => handleActiveFieldChange('quantity', Number(e.target.value))}
                                    className="w-full bg-[#0b0d14] border border-slate-700/70 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:border-indigo-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1">Measurement Unit</label>
                                <select
                                    value={activeItem.unit || activeMasterObj.defaultUnit || 'tonnes'}
                                    onChange={(e) => handleActiveFieldChange('unit', e.target.value)}
                                    className="w-full bg-[#0b0d14] border border-slate-700/70 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:border-indigo-500 focus:outline-none"
                                >
                                    {(activeMasterObj.units || [activeItem.unit || 'tonnes']).map(u => (
                                        <option key={u} value={u}>{u}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-xs font-mono text-slate-300 mb-1">Operational Notes / Facility Details</label>
                                <textarea
                                    rows="2"
                                    value={activeItem.notes || ''}
                                    onChange={(e) => handleActiveFieldChange('notes', e.target.value)}
                                    placeholder="Enter feedstock grade, line assignments, or supplier notes..."
                                    className="w-full bg-[#0b0d14] border border-slate-700/70 rounded-lg p-3 text-xs text-slate-100 font-sans focus:border-indigo-500 focus:outline-none resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-8 rounded-2xl bg-[#0f1220] border border-dashed border-slate-800 text-center space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center mx-auto text-indigo-400">
                        <Factory className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-200">No Industrial Inputs Configured</h4>
                        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                            Click "+ Add Material" to select an industrial input from Coking Coal, Limestone, Natural Gas, Virgin Plastics, Ammonia, and more.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={openAddModal}
                        className="px-4 py-2 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 text-xs font-mono border border-indigo-800 inline-flex items-center gap-1.5 transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Add Material</span>
                    </button>
                </div>
            )}

            {/* PROGRESSIVE ADD MATERIAL MODAL */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-[#0b0e19] border border-slate-700/80 rounded-2xl w-full max-w-2xl p-6 shadow-2xl space-y-6 relative my-8">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <div>
                                <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold tracking-widest">
                                    Industrial Input Configuration
                                </span>
                                <h3 className="text-base font-bold text-slate-100 font-sans tracking-tight">
                                    + Add Industrial Material / Input
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Error Alert */}
                        {modalError && (
                            <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-800/60 text-rose-300 text-xs font-mono flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                                <span>{modalError}</span>
                            </div>
                        )}

                        {/* Step 1: Select Input */}
                        <IndustrialInputSelector
                            selectedInputId={newInputObj?.id}
                            onSelectInput={handleSelectNewInput}
                        />

                        {/* Step 2: Use Cases */}
                        {newInputObj && (
                            <UseCaseSelector
                                input={newInputObj}
                                selectedUseCases={newUseCases}
                                onToggleUseCase={handleToggleNewUseCase}
                            />
                        )}

                        {/* Step 3: Activity Data */}
                        {newInputObj && newUseCases.length > 0 && (
                            <ActivityDataForm
                                input={newInputObj}
                                formData={newFormData}
                                onChangeFormData={setNewFormData}
                            />
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsAddModalOpen(false)}
                                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleSaveNewInput}
                                disabled={!newInputObj || newUseCases.length === 0}
                                className="px-6 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-600 disabled:opacity-40 text-white font-bold text-xs font-mono shadow-lg shadow-indigo-950 flex items-center gap-2 transition-all"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Save & Create Material Tab</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
