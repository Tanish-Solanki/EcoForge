import React from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';
import { MaterialTickMenu } from './MaterialTickMenu';

export const CombinedMaterialStep = ({
    materialsList = [],
    onUpdate
}) => {
    const safeMaterialsList = Array.isArray(materialsList) ? materialsList : [];

    // Toggle material selection in tick menu
    const handleToggleMaterial = (id, isChecked, defaultPayload) => {
        if (isChecked) {
            if (!safeMaterialsList.some(m => (m.inputId === id || m.id === id || m.selectedMaterialId === id))) {
                onUpdate([...safeMaterialsList, defaultPayload]);
            }
        } else {
            const updated = safeMaterialsList.filter(m => !(m.inputId === id || m.id === id || m.selectedMaterialId === id));
            onUpdate(updated);
        }
    };

    // Update details for a specific material
    const handleUpdateMaterialDetails = (id, detailUpdates) => {
        const updated = safeMaterialsList.map(item => {
            if (item.inputId === id || item.id === id || item.selectedMaterialId === id) {
                return { ...item, ...detailUpdates };
            }
            return item;
        });
        onUpdate(updated);
    };

    // Add Custom Untracked Material
    const handleAddCustomMaterial = (customPayload) => {
        onUpdate([...safeMaterialsList, customPayload]);
    };

    // Remove Custom Material
    const handleRemoveCustomMaterial = (id) => {
        const updated = safeMaterialsList.filter(m => !(m.inputId === id || m.id === id));
        onUpdate(updated);
    };

    return (
        <div className="space-y-6 font-sans">
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#101322] p-5 rounded-2xl border border-slate-800 shadow-xl">
                <div>
                    <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">Step 03 / Industrial Materials</span>
                    <h2 className="text-xl font-bold text-slate-100 mt-1">Material Feedstocks & Process Chemicals</h2>
                    <p className="text-xs text-slate-400 mt-1">
                        Tick present raw materials from the menu below. Ticking a material prompts for use cases, annual quantities, and unit costs.
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
                        <Layers className="w-4 h-4 text-indigo-400" /> Tick Facility Raw Materials
                    </label>
                    <span className="text-[10px] font-mono text-slate-400">
                        Tick [✓] to select & input quantities
                    </span>
                </div>

                <MaterialTickMenu
                    selectedMaterials={safeMaterialsList}
                    onToggleMaterial={handleToggleMaterial}
                    onUpdateMaterialDetails={handleUpdateMaterialDetails}
                    onAddCustomMaterial={handleAddCustomMaterial}
                    onRemoveCustomMaterial={handleRemoveCustomMaterial}
                    groupId="all"
                />
            </div>
        </div>
    );
};
