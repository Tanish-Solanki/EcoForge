import React from 'react';
import { useFactory } from '../context/FactoryContext';
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts';
import { Zap, Sun, Flame, CheckCircle2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EnergyPage = () => {
    const { energy } = useFactory();
    const navigate = useNavigate();

    if (!energy) return null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-indigo-400 font-semibold tracking-wider">Power & Fuel Analytics</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                            RENEWABLE SHARE 18%
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-0.5 tracking-tight">Energy Intelligence</h1>
                    <p className="text-xs text-slate-400 mt-1">Detailed energy mix, machine kW demand, and thermal optimization opportunities.</p>
                </div>

                <button
                    onClick={() => navigate('/simulator')}
                    className="px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-mono font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-950"
                >
                    <span>Simulate Renewable PPA</span>
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            {/* METRICS CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 font-mono">
                <div className="p-4 rounded-xl bg-[#101320] border border-slate-800 shadow-xl">
                    <span className="text-[10px] text-slate-400 uppercase">Total Energy</span>
                    <p className="text-xl font-bold text-slate-100 mt-1">24,500 <span className="text-xs text-slate-400 font-normal">GJ</span></p>
                </div>
                <div className="p-4 rounded-xl bg-[#101320] border border-slate-800 shadow-xl">
                    <span className="text-[10px] text-emerald-400 uppercase font-semibold">Renewable Share</span>
                    <p className="text-xl font-bold text-emerald-400 mt-1">18% <span className="text-xs text-slate-400 font-normal">Solar PV</span></p>
                </div>
                <div className="p-4 rounded-xl bg-[#101320] border border-slate-800 shadow-xl">
                    <span className="text-[10px] text-indigo-400 uppercase">Electricity Emissions</span>
                    <p className="text-xl font-bold text-indigo-300 mt-1">420 <span className="text-xs text-slate-400 font-normal">tCO2e</span></p>
                </div>
                <div className="p-4 rounded-xl bg-[#101320] border border-slate-800 shadow-xl">
                    <span className="text-[10px] text-amber-400 uppercase">Fuel Emissions</span>
                    <p className="text-xl font-bold text-amber-400 mt-1">92 <span className="text-xs text-slate-400 font-normal">tCO2e</span></p>
                </div>
                <div className="p-4 rounded-xl bg-[#101320] border border-slate-800 shadow-xl">
                    <span className="text-[10px] text-slate-400 uppercase">Energy Intensity</span>
                    <p className="text-xl font-bold text-slate-200 mt-1">0.54 <span className="text-xs text-slate-400 font-normal">kWh/kg</span></p>
                </div>
            </div>

            {/* CHARTS GRID */}
            <div className="grid lg:grid-cols-12 gap-6">
                {/* ENERGY MIX DONUT */}
                <div className="lg:col-span-5 bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                    <div className="pb-3 border-b border-slate-800/60 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-200">Energy Generation Mix</h3>
                        <span className="text-[10px] font-mono text-slate-400">kWh Equivalent</span>
                    </div>

                    <div className="h-56 w-full my-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={energy.energyMix}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={80}
                                    paddingAngle={3}
                                    dataKey="share"
                                >
                                    {energy.energyMix.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#101320" strokeWidth={2} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#141829', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-800/60">
                        {energy.energyMix.map((item) => (
                            <div key={item.name} className="flex items-center justify-between p-1.5 rounded bg-[#0b0d14]">
                                <div className="flex items-center gap-2 truncate">
                                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                    <span className="text-slate-300 truncate">{item.name}</span>
                                </div>
                                <span className="font-semibold text-slate-200 ml-1">{item.share}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CONSUMPTION BY MACHINE BAR CHART */}
                <div className="lg:col-span-7 bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                    <div className="pb-3 border-b border-slate-800/60 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-200">Energy Consumption by Equipment Asset</h3>
                        <span className="text-[10px] font-mono text-slate-400">Annual kWh Load</span>
                    </div>

                    <div className="h-64 w-full my-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={energy.consumptionByMachine} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                <XAxis dataKey="machine" stroke="#94a3b8" fontSize={10} angle={-15} textAnchor="end" />
                                <YAxis stroke="#64748b" fontSize={11} />
                                <Tooltip contentStyle={{ backgroundColor: '#141829', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                                <Bar dataKey="kWh" name="Electricity Load (kWh)" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* ENERGY RECOMMENDATIONS */}
            <div className="bg-[#101320] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
                <h3 className="text-sm font-semibold text-slate-200 pb-3 border-b border-slate-800/60">
                    Targeted Energy Reduction Interventions
                </h3>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {energy.recommendations.map((rec, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-[#141726] border border-slate-800 flex items-start gap-3 text-xs font-mono">
                            <Zap className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                            <div>
                                <span className="font-semibold text-slate-200 block">{rec}</span>
                                <span className="text-[10px] text-emerald-400 mt-1 block">Feasible & Quantified</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
