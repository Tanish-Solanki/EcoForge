import React from 'react';
import { Layers, CheckSquare, Square, Info } from 'lucide-react';

export const UseCaseSelector = ({ input, selectedUseCases = [], onToggleUseCase }) => {
    if (!input || !input.sectors || input.sectors.length === 0) {
        return null;
    }

    return (
        <div className="space-y-2.5 bg-[#0f1220] p-4 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    Applicable Use Cases / Sectors <span className="text-amber-400">*</span>
                </label>
                <span className="text-[10px] text-slate-400 font-mono">
                    Select 1 or more applicable sectors
                </span>
            </div>

            <p className="text-[11px] text-slate-400 font-sans">
                Dynamic sectors associated with <strong className="text-indigo-300">{input.name}</strong> from master industrial dataset:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
                {input.sectors.map((sec) => {
                    const isChecked = selectedUseCases.includes(sec.id) || selectedUseCases.includes(sec.label);
                    return (
                        <div
                            key={sec.id}
                            onClick={() => onToggleUseCase(sec.id)}
                            className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center gap-3 ${isChecked
                                ? 'bg-indigo-950/70 border-indigo-500 text-slate-100 shadow-md shadow-indigo-950/30'
                                : 'bg-[#141728] border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${isChecked ? 'bg-indigo-600 text-white' : 'border border-slate-600 bg-slate-900'
                                }`}>
                                {isChecked ? <CheckSquare className="w-3.5 h-3.5 stroke-[3]" /> : <Square className="w-3.5 h-3.5 opacity-0" />}
                            </div>

                            <span className="text-xs font-mono font-medium leading-tight select-none">
                                {sec.label}
                            </span>
                        </div>
                    );
                })}
            </div>

            {selectedUseCases.length === 0 && (
                <p className="text-[10px] text-amber-400 font-mono flex items-center gap-1 mt-1">
                    <Info className="w-3 h-3 text-amber-400" />
                    Please select at least one applicable use case to proceed.
                </p>
            )}
        </div>
    );
};
