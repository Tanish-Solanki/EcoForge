import React, { useState } from 'react';
import { useFactory } from '../context/FactoryContext';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell
} from 'recharts';
import {
    CloudFog,
    Filter,
    Flame,
    Zap,
    Layers,
    Search,
    Download,
    Info,
    Calendar
} from 'lucide-react';

export const EmissionsPage = () => {
    const { emissions, industrialInputs } = useFactory();
    const [selectedProcess, setSelectedProcess] = useState('All');
    const [selectedSource, setSelectedSource] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    if (!emissions) return null;

    const processOptions = ['All', 'Injection Molding', 'Extrusion', 'Compounding', 'Chillers & Pumps'];
    const sourceOptions = ['All', 'Electricity', 'Diesel', 'Virgin PP', 'Virgin ABS', 'Landfill Waste'];

    // Flatten table items
    const allTableRows = [
        ...emissions.directEmissions.map(i => ({ ...i, category: 'Direct Fuels' })),
        ...emissions.purchasedEnergy.map(i => ({ ...i, category: 'Purchased Energy' })),
        ...emissions.otherEmissions.map(i => ({ ...i, category: 'Other Relevant Emissions' }))
    ].filter(row => {
        if (selectedSource !== 'All' && !row.source.toLowerCase().includes(selectedSource.toLowerCase())) return false;
        if (searchQuery && !row.source.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-indigo-400 font-semibold tracking-wider">Scope Activity Accounting</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                            NON-CLAIM SCOPE INVENTORY
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-0.5 tracking-tight">Emission Intelligence</h1>
                    <p className="text-xs text-slate-400 mt-1">Granular breakdown across fuel combustion, grid electricity, raw materials, and waste streams.</p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => alert("Exporting emission activity CSV report...")}
                        className="px-3.5 py-2 rounded-lg bg-[#141724] hover:bg-[#1a1e30] text-slate-200 text-xs font-mono border border-slate-700/60 flex items-center gap-2 transition-colors"
                    >
                        <Download className="w-4 h-4 text-indigo-400" />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            {/* THREE CARDS SUMMARY */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Direct Emissions */}
                <div className="p-5 rounded-2xl bg-[#101320] border border-slate-800/80 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                        <span className="text-xs font-mono uppercase text-amber-400 font-semibold flex items-center gap-1.5">
                            <Flame className="w-4 h-4 text-amber-400" /> Direct Fuel Combustion
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Stationary & Mobile</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold font-mono text-slate-100">92.0</span>
                        <span className="text-xs font-mono text-slate-400 ml-1.5">tCO2e</span>
                    </div>
                    <div className="mt-3 text-xs space-y-1.5 text-slate-400 font-mono">
                        <div className="flex justify-between"><span>Diesel Backup Generator:</span><strong className="text-slate-200">84.4 t</strong></div>
                        <div className="flex justify-between"><span>Natural Gas Heater:</span><strong className="text-slate-200">7.6 t</strong></div>
                    </div>
                </div>

                {/* Purchased Energy */}
                <div className="p-5 rounded-2xl bg-[#101320] border border-slate-800/80 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                        <span className="text-xs font-mono uppercase text-indigo-400 font-semibold flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-indigo-400" /> Purchased Electricity
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Grid Utility Load</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold font-mono text-indigo-300">420.0</span>
                        <span className="text-xs font-mono text-slate-400 ml-1.5">tCO2e</span>
                    </div>
                    <div className="mt-3 text-xs space-y-1.5 text-slate-400 font-mono">
                        <div className="flex justify-between"><span>MSEB Grid Consumption:</span><strong className="text-slate-200">512,000 kWh</strong></div>
                        <div className="flex justify-between"><span>Grid Carbon Factor:</span><strong className="text-indigo-300">0.82 kg/kWh</strong></div>
                    </div>
                </div>

                {/* Other Relevant Emissions */}
                <div className="p-5 rounded-2xl bg-[#101320] border border-slate-800/80 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                        <span className="text-xs font-mono uppercase text-sky-400 font-semibold flex items-center gap-1.5">
                            <Layers className="w-4 h-4 text-sky-400" /> Other Relevant Emissions
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Materials & Waste</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold font-mono text-sky-300">772.0</span>
                        <span className="text-xs font-mono text-slate-400 ml-1.5">tCO2e</span>
                    </div>
                    <div className="mt-3 text-xs space-y-1.5 text-slate-400 font-mono">
                        <div className="flex justify-between"><span>Virgin PP & ABS Materials:</span><strong className="text-slate-200">595 t</strong></div>
                        <div className="flex justify-between"><span>Scrap & Waste Disposal:</span><strong className="text-slate-200">78 t</strong></div>
                    </div>
                </div>
            </div>

            {/* CONFIGURED INDUSTRIAL INPUTS ACCOUNTING */}
            <div className="bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-mono uppercase text-indigo-400 font-semibold tracking-wider">Master Industrial Data</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60">
                                REFERENCE BENCHMARKS LINKED
                            </span>
                        </div>
                        <h3 className="text-sm font-semibold text-slate-200 mt-1">Configured Industrial Feedstocks & Process Inputs</h3>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <Info className="w-3 h-3 text-indigo-400" /> Reference CO2 shares are for industrial context only
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(industrialInputs || []).map((inp) => (
                        <div key={inp.inputId} className="p-3.5 rounded-xl bg-[#141728] border border-slate-800 space-y-2">
                            <div className="flex items-center justify-between">
                                <h4 className="text-xs font-bold text-slate-100 font-sans">{inp.name}</h4>
                                <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                                    Ref. Share: ~{inp.co2Share}
                                </span>
                            </div>
                            <p className="text-[11px] text-slate-400 font-mono">{inp.category} • {inp.basis}</p>
                            <div className="flex items-center justify-between text-[11px] font-mono pt-1.5 border-t border-slate-800/60">
                                <span className="text-slate-300">Annual Activity: <strong className="text-emerald-400">{Number(inp.quantity).toLocaleString()} {inp.unit}</strong></span>
                                <div className="flex items-center gap-1 flex-wrap">
                                    {(inp.selectedUseCases || []).map((uc, i) => (
                                        <span key={i} className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                            {uc}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
                {/* EMISSIONS BY PROCESS */}
                <div className="bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-4">
                        <h3 className="text-sm font-semibold text-slate-200">Emissions by Process Department</h3>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            Total 1,284 tCO2e
                        </span>
                    </div>

                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={emissions.byProcess} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                <XAxis type="number" stroke="#64748b" fontSize={11} />
                                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={120} tickLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: '#141829', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                                <Bar dataKey="value" name="Emissions (tCO2e)" fill="#4f46e5" radius={[0, 6, 6, 0]}>
                                    {emissions.byProcess.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#4338ca' : index === 1 ? '#3b82f6' : '#0284c7'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* EMISSIONS BY MATERIAL */}
                <div className="bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-4">
                        <h3 className="text-sm font-semibold text-slate-200">Emissions by Input Feedstock / Stream</h3>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            Raw Material Dominance
                        </span>
                    </div>

                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={emissions.byMaterial} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} angle={-15} textAnchor="end" />
                                <YAxis stroke="#64748b" fontSize={11} />
                                <Tooltip contentStyle={{ backgroundColor: '#141829', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                                <Bar dataKey="value" name="Emissions (tCO2e)" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* DATA TABLE SECTION WITH FILTERS */}
            <div className="bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/60">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-200">Activity & Emission Factor Accounting Table</h3>
                        <p className="text-[11px] text-slate-400">Activity data multiplied by verified carbon intensity factor</p>
                    </div>

                    {/* Filter Inputs */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                            <input
                                type="text"
                                placeholder="Search source..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-[#0b0d14] border border-slate-700/60 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 w-44 font-sans"
                            />
                        </div>

                        <select
                            value={selectedSource}
                            onChange={(e) => setSelectedSource(e.target.value)}
                            className="bg-[#0b0d14] border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 font-sans"
                        >
                            {sourceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                </div>

                {/* Scrollable Table */}
                <div className="overflow-x-auto mt-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase bg-[#0b0d14]">
                                <th className="py-2.5 px-3">Emission Source</th>
                                <th className="py-2.5 px-3">Category</th>
                                <th className="py-2.5 px-3">Activity Volume</th>
                                <th className="py-2.5 px-3">Emission Factor</th>
                                <th className="py-2.5 px-3 text-right">Emissions (tCO2e)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-xs">
                            {allTableRows.map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                                    <td className="py-3 px-3 font-semibold text-slate-200">{row.source}</td>
                                    <td className="py-3 px-3 font-mono text-[11px]">
                                        <span className={`px-2 py-0.5 rounded border ${row.category.includes('Direct')
                                            ? 'bg-amber-950/60 text-amber-300 border-amber-800/40'
                                            : row.category.includes('Purchased')
                                                ? 'bg-indigo-950/60 text-indigo-300 border-indigo-800/40'
                                                : 'bg-sky-950/60 text-sky-300 border-sky-800/40'
                                            }`}>
                                            {row.category}
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 font-mono text-slate-300">{row.activity}</td>
                                    <td className="py-3 px-3 font-mono text-slate-400">{row.factor}</td>
                                    <td className="py-3 px-3 font-mono font-bold text-slate-100 text-right">{row.emissions}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
