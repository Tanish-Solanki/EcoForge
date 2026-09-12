import React from 'react';
import { Database, FileText, Hash, Ruler } from 'lucide-react';

export const ActivityDataForm = ({
    input,
    formData,
    onChangeFormData,
    errors = {}
}) => {
    if (!input) return null;

    const availableUnits = input.units || [input.defaultUnit || 'tonnes'];

    return (
        <div className="space-y-4 bg-[#0f1220] p-4 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-indigo-400" />
                    Factory Activity Data & Consumption
                </label>
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
                    Activity Data × Emission Factor Rule
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {/* Quantity */}
                <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1 flex items-center gap-1">
                        <Hash className="w-3 h-3 text-slate-400" />
                        Annual Quantity <span className="text-amber-400">*</span>
                    </label>
                    <input
                        type="number"
                        min="0"
                        placeholder="e.g. 12000"
                        value={formData.quantity || ''}
                        onChange={(e) => onChangeFormData({ ...formData, quantity: e.target.value, annualConsumption: e.target.value })}
                        className={`w-full bg-[#141728] border rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none ${errors.quantity ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-indigo-500'
                            }`}
                    />
                    {errors.quantity && (
                        <p className="text-[10px] text-rose-400 font-mono mt-1">{errors.quantity}</p>
                    )}
                </div>

                {/* Unit Dropdown */}
                <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1 flex items-center gap-1">
                        <Ruler className="w-3 h-3 text-slate-400" />
                        Unit of Measure <span className="text-amber-400">*</span>
                    </label>
                    <select
                        value={formData.unit || availableUnits[0]}
                        onChange={(e) => onChangeFormData({ ...formData, unit: e.target.value })}
                        className="w-full bg-[#141728] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-indigo-500"
                    >
                        {availableUnits.map(u => (
                            <option key={u} value={u}>{u}</option>
                        ))}
                    </select>
                </div>

                {/* Unit Cost */}
                <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1 flex items-center gap-1">
                        <span className="text-slate-400 font-bold text-[10px]">₹</span>
                        Unit Cost (₹ / unit)
                    </label>
                    <input
                        type="number"
                        min="0"
                        placeholder="e.g. 85000"
                        value={formData.costPerUnit ?? formData.cost ?? ''}
                        onChange={(e) => onChangeFormData({ ...formData, costPerUnit: e.target.value, cost: e.target.value })}
                        className="w-full bg-[#141728] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-indigo-500"
                    />
                </div>

                {/* Annual Consumption */}
                <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1">
                        Annual Volume
                    </label>
                    <input
                        type="number"
                        min="0"
                        placeholder="Same as quantity"
                        value={formData.annualConsumption || formData.quantity || ''}
                        onChange={(e) => onChangeFormData({ ...formData, annualConsumption: e.target.value })}
                        className="w-full bg-[#141728] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
                    />
                </div>
            </div>

            {/* Optional Notes */}
            <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-slate-400" />
                    Operational & Feedstock Notes <span className="text-slate-500">(Optional)</span>
                </label>
                <input
                    type="text"
                    placeholder="e.g. Primary feedstock for Injection Molding Lines 01–06"
                    value={formData.notes || ''}
                    onChange={(e) => onChangeFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#141728] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 font-sans focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
                />
            </div>
        </div>
    );
};
