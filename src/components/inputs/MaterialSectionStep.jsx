import React, { useState, useMemo } from 'react';
import { Search, CheckCircle2, ChevronDown, Check, Plus, Trash2, Layers, Flame } from 'lucide-react';
import { getMaterialsForGroup, searchMaterialsInGroup } from '../../data/industrialInputs';
import { MaterialTickMenu } from './MaterialTickMenu';

export const MaterialSectionStep = ({
    groupId, // "material1" | "material2" | "material3"
    sectionTitle, // "Material-1" | "Material-2" | "Material-3"
    sectionDesc,
    materialsList = [], // Array of configured material objects [{ selectedMaterialId, materialName, useCases, quantity, unit, notes }]
    onUpdate // Callback: (newList) => void
}) => {
    // Ensure materialsList is an array
    const selectedList = Array.isArray(materialsList)
        ? materialsList
        : (materialsList?.selectedMaterialId ? [materialsList] : []);

    // Toggle material selection in tick menu
    const handleToggleMaterial = (id, isChecked, defaultPayload) => {
        if (isChecked) {
            if (!selectedList.some(m => (m.inputId === id || m.id === id || m.selectedMaterialId === id))) {
                onUpdate([...selectedList, defaultPayload]);
            }
        } else {
            const updated = selectedList.filter(m => !(m.inputId === id || m.id === id || m.selectedMaterialId === id));
            onUpdate(updated);
        }
    };

    // Update details for a specific material
    const handleUpdateMaterialDetails = (id, detailUpdates) => {
        const updated = selectedList.map(item => {
            if (item.inputId === id || item.id === id || item.selectedMaterialId === id) {
                return { ...item, ...detailUpdates };
            }
            return item;
        });
        onUpdate(updated);
    };

    // Add Custom Untracked Material
    const handleAddCustomMaterial = (customPayload) => {
        onUpdate([...selectedList, customPayload]);
    };

    // Remove Custom Material
    const handleRemoveCustomMaterial = (id) => {
        const updated = selectedList.filter(m => !(m.inputId === id || m.id === id));
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
                            {selectedList.length} Materials Configured
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-100 font-sans tracking-tight mt-1">
                        {sectionTitle} Tick-Form Material Selection
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl">
                        Tick the materials present in your factory from the menu below. Ticking a material prompts for use case, annual quantity, unit cost, and process details.
                    </p>
                </div>

                <div className="p-3 rounded-xl bg-[#141728] border border-slate-800 text-right shrink-0">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Selection Mode</span>
                    <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Tick Menu Material Input
                    </span>
                </div>
            </div>

            {/* 1. TICK-FORM MATERIAL SELECTION MENU */}
            <div className="bg-[#101320] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-xs font-mono uppercase font-bold text-slate-200 tracking-wider flex items-center gap-2">
                        <Layers className="w-4 h-4 text-indigo-400" /> Tick Present Materials ({sectionTitle})
                    </label>
                    <span className="text-[10px] font-mono text-slate-400">
                        Tick [✓] to enable & expand details
                    </span>
                </div>

                <MaterialTickMenu
                    selectedMaterials={selectedList}
                    onToggleMaterial={handleToggleMaterial}
                    onUpdateMaterialDetails={handleUpdateMaterialDetails}
                    onAddCustomMaterial={handleAddCustomMaterial}
                    onRemoveCustomMaterial={handleRemoveCustomMaterial}
                    groupId={groupId}
                />
            </div>
        </div>
    );
};
