import React, { useState, useMemo } from 'react';
import { Search, CheckCircle2, ChevronDown, Check, Plus, Trash2, Layers } from 'lucide-react';
import { getMaterialsForGroup, searchMaterialsInGroup } from '../../data/industrialInputs';

export const MaterialSectionStep = ({
    groupId, // "material1" | "material2" | "material3"
    sectionTitle, // "Material-1" | "Material-2" | "Material-3"
    sectionDesc,
    materialsList = [], // Array of configured material objects [{ selectedMaterialId, materialName, useCases, quantity, unit, notes }]
    onUpdate // Callback: (newList) => void
}) => {
    // 1. Get ONLY the 5 materials assigned to this group
    const groupMaterials = useMemo(() => getMaterialsForGroup(groupId), [groupId]);

    // Search query within group
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Filtered list strictly within group's 5 materials
    const searchResults = useMemo(() => {
        return searchMaterialsInGroup(groupId, searchQuery);
    }, [groupId, searchQuery]);

    // Ensure materialsList is an array
    const selectedList = Array.isArray(materialsList) ? materialsList : (materialsList?.selectedMaterialId ? [materialsList] : []);

    // Handle adding a material to the selected list
    const handleAddMaterial = (item) => {
        const alreadyExists = selectedList.some(m => m.selectedMaterialId === item.id);
        if (alreadyExists) {
            setIsDropdownOpen(false);
            setSearchQuery('');
            return;
        }

        const defaultUseCases = item.sectors && item.sectors.length > 0 ? [item.sectors[0].id] : [];
        const newItem = {
            selectedMaterialId: item.id,
            materialName: item.name,
            useCases: defaultUseCases,
            quantity: 1000,
            unit: item.defaultUnit || (item.units && item.units[0]) || 'tonnes',
            notes: ''
        };

        onUpdate([...selectedList, newItem]);
        setIsDropdownOpen(false);
        setSearchQuery('');
    };

    // Handle updating a specific selected material entry
    const handleUpdateItem = (index, field, value) => {
        const updated = selectedList.map((item, idx) => {
            if (idx === index) {
                return { ...item, [field]: value };
            }
            return item;
        });
        onUpdate(updated);
    };

    // Handle toggling use case for a specific material
    const handleToggleUseCase = (index, useCaseId) => {
        const item = selectedList[index];
        if (!item) return;
        const currentUseCases = item.useCases || [];
        const updatedUseCases = currentUseCases.includes(useCaseId)
            ? currentUseCases.filter(id => id !== useCaseId)
            : [...currentUseCases, useCaseId];

        handleUpdateItem(index, 'useCases', updatedUseCases);
    };

    // Handle removing a material from the list
    const handleRemoveItem = (index) => {
        const updated = selectedList.filter((_, idx) => idx !== index);
        onUpdate(updated);
    };

    return (
        <div className="space-y-6">
            {/* Section Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#101322] p-5 rounded-2xl border border-slate-800 shadow-xl">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-indigo-400 font-bold tracking-widest">
                            Factory Setup Stage / {sectionTitle}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold">
                            {selectedList.length} / 5 Selected
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-100 font-sans tracking-tight mt-1">
                        {sectionTitle} Multi-Material Configuration
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl">
                        {sectionDesc || `Configure industrial inputs for ${sectionTitle}. You can select multiple materials from the 5 materials assigned to this section.`}
                    </p>
                </div>

                <div className="p-3 rounded-xl bg-[#141728] border border-slate-800 text-right shrink-0">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Assigned Group</span>
                    <span className="text-xs font-mono font-bold text-indigo-300">5 Restricted Items</span>
                </div>
            </div>

            {/* ADD MATERIAL SELECTOR (RESTRICTED TO 5 GROUP MATERIALS) */}
            <div className="space-y-3 bg-[#101320] border border-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between">
                    <label className="block text-xs font-mono uppercase font-bold text-slate-200 tracking-wider flex items-center gap-2">
                        <Plus className="w-4 h-4 text-indigo-400" /> Add Material to {sectionTitle}
                    </label>
                    <span className="text-[10px] font-mono text-indigo-400">
                        Select from {groupMaterials.length} Assigned Materials
                    </span>
                </div>

                {/* Dropdown Selector */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-[#0b0d14] border border-slate-700/80 hover:border-indigo-500 rounded-xl px-4 py-3 text-left flex items-center justify-between transition-colors shadow-inner"
                    >
                        <span className="text-xs text-slate-300 font-medium">
                            + Click to add material from {sectionTitle} group...
                        </span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute z-30 left-0 right-0 mt-2 bg-[#0d0f1b] border border-slate-700 rounded-xl shadow-2xl overflow-hidden p-2 space-y-2 max-h-80 overflow-y-auto">
                            {/* Restricted Search Bar */}
                            <div className="relative">
                                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={`Search within ${sectionTitle} (5 materials)...`}
                                    className="w-full bg-[#141728] border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                                />
                            </div>

                            <div className="text-[10px] font-mono text-slate-500 uppercase px-2 pt-1">
                                {sectionTitle} Assigned Materials ({searchResults.length})
                            </div>

                            {/* List of 5 Group Materials Only */}
                            <div className="space-y-1">
                                {searchResults.length > 0 ? (
                                    searchResults.map(({ item, matchReason }) => {
                                        const isAlreadyAdded = selectedList.some(m => m.selectedMaterialId === item.id);
                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => !isAlreadyAdded && handleAddMaterial(item)}
                                                className={`p-3 rounded-lg flex items-center justify-between transition-colors ${isAlreadyAdded
                                                    ? 'bg-slate-900/50 border border-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                                                    : 'hover:bg-indigo-950/70 border border-transparent hover:border-indigo-500 cursor-pointer text-slate-200'
                                                    }`}
                                            >
                                                <div>
                                                    <div className="text-xs font-semibold font-sans flex items-center gap-2">
                                                        {item.name}
                                                        <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950 px-1.5 py-0.2 rounded border border-indigo-800">
                                                            ~{item.co2Share}
                                                        </span>
                                                    </div>
                                                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.basis}</div>
                                                    {matchReason && (
                                                        <div className="text-[9px] text-indigo-400 font-mono mt-0.5">{matchReason}</div>
                                                    )}
                                                </div>

                                                {isAlreadyAdded ? (
                                                    <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                                                        <Check className="w-3.5 h-3.5" /> Added
                                                    </span>
                                                ) : (
                                                    <span className="text-xs font-mono text-indigo-400 hover:text-indigo-300 font-bold">
                                                        + Add
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="p-3 text-center text-xs font-mono text-slate-500">
                                        No materials in {sectionTitle} match "{searchQuery}".
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* LIST OF SELECTED MATERIALS IN THIS SECTION */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase font-bold text-slate-200 tracking-wider flex items-center gap-2">
                        <Layers className="w-4 h-4 text-indigo-400" /> Configured Materials ({selectedList.length})
                    </h4>
                </div>

                {selectedList.length === 0 ? (
                    <div className="bg-[#101320] border border-dashed border-slate-800 rounded-2xl p-8 text-center space-y-2">
                        <p className="text-xs text-slate-400">No materials configured in {sectionTitle} yet.</p>
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(true)}
                            className="text-xs font-mono text-indigo-400 hover:text-indigo-300 font-semibold"
                        >
                            + Select material from {sectionTitle} group
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {selectedList.map((mat, index) => {
                            const masterObj = groupMaterials.find(m => m.id === mat.selectedMaterialId);
                            const name = mat.materialName || masterObj?.name || mat.selectedMaterialId;
                            const co2Share = masterObj?.co2Share || 'N/A';
                            const sectors = masterObj?.sectors || [];
                            const units = masterObj?.units || ['tonnes'];

                            return (
                                <div
                                    key={`${mat.selectedMaterialId}-${index}`}
                                    className="bg-[#101320] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4"
                                >
                                    {/* Material Item Header */}
                                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-slate-100 font-sans">{name}</span>
                                                <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                                                    Ref CO2 Share: ~{co2Share}
                                                </span>
                                            </div>
                                            {masterObj?.basis && (
                                                <p className="text-[11px] text-slate-400 font-mono mt-0.5">{masterObj.basis}</p>
                                            )}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleRemoveItem(index)}
                                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-800/50 transition-colors"
                                            title="Remove material"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Sectors / Use Cases */}
                                    {sectors.length > 0 && (
                                        <div className="space-y-2">
                                            <label className="block text-[11px] font-mono uppercase font-semibold text-slate-300">
                                                Applicable Sectors / Use Cases
                                            </label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                                {sectors.map(sec => {
                                                    const isChecked = (mat.useCases || []).includes(sec.id);
                                                    return (
                                                        <div
                                                            key={sec.id}
                                                            onClick={() => handleToggleUseCase(index, sec.id)}
                                                            className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${isChecked
                                                                ? 'bg-indigo-950/70 border-indigo-500 text-slate-100'
                                                                : 'bg-[#0b0d14] border-slate-800/80 text-slate-400 hover:border-slate-700'
                                                                }`}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isChecked}
                                                                    onChange={() => { }}
                                                                    className="w-3.5 h-3.5 rounded border-slate-700 bg-slate-900 text-indigo-600 cursor-pointer"
                                                                />
                                                                <span className="text-xs font-medium font-sans">{sec.label}</span>
                                                            </div>
                                                            {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Activity Data Quantification */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                                        <div>
                                            <label className="block text-xs font-mono text-slate-300 mb-1">Annual Consumption</label>
                                            <input
                                                type="number"
                                                value={mat.quantity || ''}
                                                onChange={(e) => handleUpdateItem(index, 'quantity', Number(e.target.value))}
                                                className="w-full bg-[#0b0d14] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:border-indigo-500 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-mono text-slate-300 mb-1">Measurement Unit</label>
                                            <select
                                                value={mat.unit || masterObj?.defaultUnit || 'tonnes'}
                                                onChange={(e) => handleUpdateItem(index, 'unit', e.target.value)}
                                                className="w-full bg-[#0b0d14] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:border-indigo-500 focus:outline-none"
                                            >
                                                {units.map(u => (
                                                    <option key={u} value={u}>{u}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label className="block text-xs font-mono text-slate-300 mb-1">Operational Notes</label>
                                            <textarea
                                                rows="1"
                                                value={mat.notes || ''}
                                                onChange={(e) => handleUpdateItem(index, 'notes', e.target.value)}
                                                placeholder={`Enter specific grade or process notes for ${name}...`}
                                                className="w-full bg-[#0b0d14] border border-slate-700/80 rounded-lg p-2.5 text-xs text-slate-100 font-sans focus:border-indigo-500 focus:outline-none resize-none"
                                            ></textarea>
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
