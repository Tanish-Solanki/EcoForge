import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    CloudFog,
    Flame,
    Lightbulb,
    Sliders,
    Zap,
    Recycle,
    GitCompare,
    Milestone,
    Bot,
    Settings,
    X,
    Factory,
    ShieldCheck,
    ChevronRight,
    Layers
} from 'lucide-react';

const rawMaterialItems = [
    { path: '/raw-materials/drivers', label: '1. Emission Drivers', icon: Flame, badge: 'Screen 1' },
    { path: '/raw-materials/composition', label: '2. Composition & Alternates', icon: Layers, badge: 'Screen 2' },
    { path: '/raw-materials/comparison', label: '3. Trade-Off Comparison', icon: GitCompare, badge: 'Screen 3' },
];

const electricityItems = [
    { path: '/electricity', label: 'Electricity Decarbonization', icon: Zap, badge: 'Subtask 2' },
];

const utilityItems = [
    { path: '/setup', label: 'Factory Setup Wizard', icon: Factory, highlight: true },
    { path: '/assistant', label: 'AI Industrial Copilot', icon: Bot, badge: 'AI' }
];

export const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    return (
        <>
            {/* Mobile Backdrop Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0d0f18] border-r border-slate-800/60 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Brand Header */}
                <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800/60 bg-[#090a10]">
                    <NavLink to="/" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-950 flex items-center justify-center border border-indigo-500/30 shadow-md shadow-indigo-950">
                            <Factory className="w-5 h-5 text-indigo-200 group-hover:scale-105 transition-transform" />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-slate-100 tracking-tight text-base font-sans">EcoForge</span>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-widest">
                                    AI
                                </span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-mono tracking-tight">Industrial Carbon Copilot</p>
                        </div>
                    </NavLink>

                    {/* Close button for mobile */}
                    <button
                        onClick={onClose}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Engine Pipeline Badge */}
                <div className="px-4 py-3 bg-[#111320] border-b border-slate-800/40 text-[11px]">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span className="font-mono text-[10px] uppercase text-indigo-300 font-semibold flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Feasibility Engine
                        </span>
                        <span className="text-[9px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/50 font-mono">
                            ACTIVE
                        </span>
                    </div>
                    <p className="text-slate-400 text-[10px] leading-tight truncate">
                        Measure → Filter → Optimize → Act
                    </p>
                </div>

                {/* Navigation List */}
                <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
                    {/* SECTION 1: RAW MATERIALS SUBTASK */}
                    <div>
                        <div className="px-3 pb-2 text-[10px] font-mono tracking-wider uppercase text-indigo-400 font-bold flex items-center justify-between">
                            <span>📦 Raw Materials Subtask</span>
                            <span className="text-[9px] bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-800">3 Screens</span>
                        </div>
                        <div className="space-y-1">
                            {rawMaterialItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => onClose && onClose()}
                                        className={({ isActive }) => `flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold transition-all duration-150 group ${isActive
                                            ? 'bg-indigo-950/80 text-indigo-100 border border-indigo-700/50 shadow-sm'
                                            : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/40 border border-transparent'
                                            }`}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                                                    <span className="truncate">{item.label}</span>
                                                </div>
                                                <div className="flex items-center gap-1 shrink-0">
                                                    {isActive && <ChevronRight className="w-3 h-3 text-indigo-400" />}
                                                </div>
                                            </>
                                        )}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>

                    {/* SECTION 2: ELECTRICITY SUBTASK */}
                    <div>
                        <div className="px-3 pb-2 text-[10px] font-mono tracking-wider uppercase text-amber-400 font-bold flex items-center justify-between">
                            <span>⚡ Electricity Subtask</span>
                            <span className="text-[9px] bg-amber-950 px-1.5 py-0.5 rounded border border-amber-800">Subtask 2</span>
                        </div>
                        <div className="space-y-1">
                            {electricityItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => onClose && onClose()}
                                        className={({ isActive }) => `flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold transition-all duration-150 group ${isActive
                                            ? 'bg-amber-950/80 text-amber-100 border border-amber-700/50 shadow-sm'
                                            : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/40 border border-transparent'
                                            }`}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                                                    <span className="truncate">{item.label}</span>
                                                </div>
                                                <div className="flex items-center gap-1 shrink-0">
                                                    {isActive && <ChevronRight className="w-3 h-3 text-amber-400" />}
                                                </div>
                                            </>
                                        )}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>

                    {/* SECTION 3: UTILITIES & ASSISTANT */}
                    <div>
                        <div className="px-3 pb-2 text-[10px] font-mono tracking-wider uppercase text-slate-500 font-semibold">
                            Utilities & Copilot
                        </div>
                        <div className="space-y-1">
                            {utilityItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => onClose && onClose()}
                                        className={({ isActive }) => `flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all ${isActive
                                            ? 'bg-slate-800 text-slate-100 border border-slate-700'
                                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <Icon className="w-4 h-4 text-slate-400" />
                                            <span>{item.label}</span>
                                        </div>
                                        {item.badge && (
                                            <span className="text-[9px] font-mono font-bold bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded border border-amber-800">
                                                {item.badge}
                                            </span>
                                        )}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer Area */}
                <div className="p-3 border-t border-slate-800/60 bg-[#090a10] space-y-1">
                    <NavLink
                        to="/setup"
                        className="flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium text-slate-300 hover:bg-slate-800/50 hover:text-slate-100 border border-slate-800/40 transition-colors"
                    >
                        <div className="flex items-center gap-2.5">
                            <Factory className="w-4 h-4 text-amber-400" />
                            <span>Factory Setup</span>
                        </div>
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-800/40">
                            Wizard
                        </span>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${isActive
                                ? 'bg-slate-800 text-slate-100 border border-slate-700'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                            }`
                        }
                    >
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span>Settings</span>
                    </NavLink>
                </div>
            </aside>
        </>
    );
};
