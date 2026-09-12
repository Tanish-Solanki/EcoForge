import React from 'react';
import { Factory, Layers, Edit2, Trash2, Hash, FileText, Info, ArrowRight } from 'lucide-react';
import { MASTER_INDUSTRIAL_INPUTS } from '../../data/industrialInputs';

export const IndustrialInputCard = ({
    item,
    onEdit,
    onRemove
}) => {
    const masterInfo = MASTER_INDUSTRIAL_INPUTS.find(m => m.id === item.inputId) || {
        name: item.name || item.inputId,
        category: item.category || 'Industrial Feedstock',
        co2Share: item.co2Share || 'N/A',
        basis: item.basis || 'Process input',
        sectors: []
    };

    const selectedUseCasesList = (item.selectedUseCases || []).map(uc => {
        const found = (masterInfo.sectors || []).find(s => s.id === uc || s.label === uc);
        return found ? found.label : uc;
    });

    return (
        <div className="bg-[#101322] border border-slate-800 hover:border-slate-700/80 rounded-xl p-4 shadow-xl transition-all space-y-3 relative group">
            {/* Top Bar: Input Name, Category & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-700/50 flex items-center justify-center text-indigo-300 shrink-0">
                        <Factory className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-bold text-slate-100 font-sans tracking-tight">
                                {masterInfo.name}
                            </h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60 font-medium">
                                {masterInfo.category}
                            </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                            {masterInfo.basis}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                    {onEdit && (
                        <button
                            onClick={() => onEdit(item)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 flex items-center gap-1 transition-colors"
                            title="Edit Input & Use Cases"
                        >
                            <Edit2 className="w-3 h-3 text-indigo-400" />
                            <span>Edit</span>
                        </button>
                    )}
                    {onRemove && (
                        <button
                            onClick={() => onRemove(item.inputId)}
                            className="px-2.5 py-1 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 text-xs font-mono border border-rose-800/40 flex items-center gap-1 transition-colors"
                            title="Remove Industrial Input"
                        >
                            <Trash2 className="w-3 h-3 text-rose-400" />
                            <span>Remove</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Relationship Flow Indicator: Input -> Sector -> Use Case -> Quantity */}
            <div className="bg-[#0b0d17] p-2.5 rounded-lg border border-slate-800/60 flex items-center gap-2 flex-wrap text-[11px] font-mono">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                    <Factory className="w-3 h-3 text-indigo-400" /> {masterInfo.name.split('/')[0].trim()}
                </span>
                <ArrowRight className="w-3 h-3 text-slate-600" />
                <span className="text-indigo-300 font-semibold flex items-center gap-1">
                    <Layers className="w-3 h-3 text-indigo-400" /> {selectedUseCasesList.join(', ') || 'General Process'}
                </span>
                <ArrowRight className="w-3 h-3 text-slate-600" />
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Hash className="w-3 h-3 text-emerald-400" /> {Number(item.quantity || 0).toLocaleString()} {item.unit || 'tonnes'}/yr
                </span>
            </div>

            {/* Context Metrics & Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                {/* Reference CO2 Share Badge (Context Only Rule) */}
                <div className="p-2.5 rounded-lg bg-[#090b14] border border-slate-800/80">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Industrial CO2 Share</span>
                    <span className="text-xs font-mono font-bold text-indigo-300 flex items-center gap-1.5 mt-0.5">
                        ~{masterInfo.co2Share}
                        <span className="text-[9px] font-mono px-1 rounded bg-slate-800 text-slate-400 font-normal">Reference</span>
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono block mt-1 leading-tight flex items-center gap-0.5">
                        <Info className="w-2.5 h-2.5 text-slate-400 shrink-0" /> Benchmark context only
                    </span>
                </div>

                {/* Selected Use Cases List */}
                <div className="p-2.5 rounded-lg bg-[#090b14] border border-slate-800/80 sm:col-span-2">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase mb-1">Active Use Cases / Sectors</span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {selectedUseCasesList.map((ucLabel, idx) => (
                            <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-200 border border-indigo-800/60">
                                {ucLabel}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Optional Notes */}
            {item.notes && (
                <div className="text-[11px] text-slate-400 font-sans bg-[#0c0e18] p-2 rounded-lg border border-slate-800/50 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span><strong className="text-slate-300 font-mono">Note:</strong> {item.notes}</span>
                </div>
            )}
        </div>
    );
};
