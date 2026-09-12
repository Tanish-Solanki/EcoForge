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
    ChevronRight
} from 'lucide-react';

const mainNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/emissions', label: 'Emissions', icon: CloudFog },
    { path: '/hotspots', label: 'Hotspots', icon: Flame, badge: '6' },
    { path: '/recommendations', label: 'Recommendations', icon: Lightbulb, badge: '37 Feasible' },
    { path: '/comparison', label: 'Comparison Matrix', icon: GitCompare },
    { path: '/energy', label: 'Energy', icon: Zap },
    { path: '/waste', label: 'Circularity & Waste', icon: Recycle },
    { path: '/simulator', label: 'Simulator', icon: Sliders, highlight: true },
    { path: '/roadmap', label: 'Roadmap', icon: Milestone },
    { path: '/assistant', label: 'AI Assistant', icon: Bot, badge: 'AI' }
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
                <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    <div className="px-3 pb-2 text-[10px] font-mono tracking-wider uppercase text-slate-500 font-semibold">
                        Intelligence Command
                    </div>
                    {mainNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => onClose && onClose()}
                                className={({ isActive: isExactActive }) => {
                                    const active = isExactActive || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                                    return `flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-medium transition-all duration-150 group relative ${active
                                            ? 'bg-indigo-950/70 text-indigo-100 border border-indigo-700/40 shadow-sm shadow-indigo-950/50'
                                            : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/40 border border-transparent'
                                        }`;
                                }}
                            >
                                {({ isActive: isExactActive }) => {
                                    const active = isExactActive || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                                    return (
                                        <>
                                            <div className="flex items-center gap-3 min-w-0">
                                                <Icon className={`w-4 h-4 shrink-0 transition-colors ${active ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                                                <span className="truncate">{item.label}</span>
                                            </div>

                                            <div className="flex items-center gap-1.5 shrink-0">
                                                {item.badge && (
                                                    <span className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded ${item.badge.includes('AI')
                                                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                                            : 'bg-indigo-900/60 text-indigo-300 border border-indigo-700/40'
                                                        }`}>
                                                        {item.badge}
                                                    </span>
                                                )}
                                                {item.highlight && (
                                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                                )}
                                                {active && (
                                                    <ChevronRight className="w-3 h-3 text-indigo-400" />
                                                )}
                                            </div>
                                        </>
                                    );
                                }}
                            </NavLink>
                        );
                    })}
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
