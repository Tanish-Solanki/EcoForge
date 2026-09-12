import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, Factory, Tag, Info, AlertCircle } from 'lucide-react';
import { MASTER_INDUSTRIAL_INPUTS, searchIndustrialInputs } from '../../data/industrialInputs';

export const IndustrialInputSelector = ({ selectedInputId, onSelectInput, disabled = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef(null);

    const results = searchIndustrialInputs(searchQuery);
    const selectedItem = MASTER_INDUSTRIAL_INPUTS.find(item => item.id === selectedInputId);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (item) => {
        onSelectInput(item);
        setIsOpen(false);
        setSearchQuery('');
    };

    return (
        <div className="relative w-full" ref={containerRef}>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                    <Factory className="w-3.5 h-3.5 text-indigo-400" />
                    Select Industrial Input <span className="text-amber-400">*</span>
                </span>
                <span className="text-[10px] text-slate-400 font-normal">15 Master Inputs Available</span>
            </label>

            {/* Selected Input Trigger / Combobox Header */}
            <div
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={`w-full px-4 py-3 rounded-xl bg-[#101320] border transition-all cursor-pointer flex items-center justify-between ${isOpen
                    ? 'border-indigo-500 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/30'
                    : selectedItem
                        ? 'border-indigo-500/50 bg-indigo-950/20'
                        : 'border-slate-700/80 hover:border-slate-600'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {selectedItem ? (
                    <div className="flex flex-col gap-0.5 text-left">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-100 font-sans">{selectedItem.name}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700/50">
                                {selectedItem.category}
                            </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                            Ref. CO2 Share: <strong className="text-indigo-300">{selectedItem.co2Share}</strong> • {selectedItem.sectors.map(s => s.label).join(' • ')}
                        </span>
                    </div>
                ) : (
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-2">
                        <Search className="w-3.5 h-3.5 text-slate-500" />
                        Search input by name, keyword (e.g. 'coking', 'steel', 'coal'), or sector...
                    </span>
                )}

                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-[#0d101d] border border-slate-700/90 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl">
                    {/* Search Input Bar */}
                    <div className="p-3 border-b border-slate-800/80 bg-[#121526]">
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Type to search e.g. 'coking', 'coal', 'steel', 'glass'..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                                className="w-full bg-[#090b14] border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                            />
                        </div>
                    </div>

                    {/* Options List */}
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/50">
                        {results.length > 0 ? (
                            results.map(({ item, matchReason }) => {
                                const isSelected = item.id === selectedInputId;
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => handleSelect(item)}
                                        className={`p-3.5 hover:bg-[#161a2f] cursor-pointer transition-colors flex items-start justify-between group ${isSelected ? 'bg-indigo-950/40' : ''
                                            }`}
                                    >
                                        <div className="space-y-1 pr-4">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-200 transition-colors">
                                                    {item.name}
                                                </span>
                                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                                    {item.category}
                                                </span>
                                                <span className="text-[10px] font-mono text-slate-400">
                                                    Ref Share: <strong className="text-indigo-400 font-semibold">{item.co2Share}</strong>
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <span className="text-[11px] text-slate-400 font-mono">Applicable Sectors:</span>
                                                {item.sectors.map(sec => (
                                                    <span key={sec.id} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-900/60">
                                                        {sec.label}
                                                    </span>
                                                ))}
                                            </div>

                                            {matchReason && searchQuery && (
                                                <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                                                    <Tag className="w-3 h-3 text-emerald-400" />
                                                    <span>{matchReason}</span>
                                                </div>
                                            )}
                                        </div>

                                        {isSelected && (
                                            <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                                                <Check className="w-3 h-3 stroke-[3]" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-6 text-center text-xs font-mono text-slate-400 flex flex-col items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-slate-500" />
                                <span>No industrial inputs found for "{searchQuery}". Try searching 'coal', 'steel', 'gas', or 'plastics'.</span>
                            </div>
                        )}
                    </div>

                    {/* Context Notice Footer */}
                    <div className="px-3 py-2 bg-[#090b14] border-t border-slate-800/80 text-[10px] text-slate-400 font-mono flex items-center justify-between">
                        <span className="flex items-center gap-1 text-slate-400">
                            <Info className="w-3 h-3 text-indigo-400" /> Ref. CO2 shares are reference benchmarks only.
                        </span>
                        <span className="text-slate-400">15 Master Items</span>
                    </div>
                </div>
            )}
        </div>
    );
};
