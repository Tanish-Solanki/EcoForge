import React, { useState } from 'react';
import { useFactory } from '../../context/FactoryContext';
import {
    Menu,
    Building2,
    Calendar,
    Clock,
    Bell,
    User,
    RefreshCw,
    Sparkles,
    ChevronDown,
    CheckCircle2,
    ShieldAlert
} from 'lucide-react';

export const Topbar = ({ onMenuClick }) => {
    const { factory, dashboard, isDemoMode, loading, retry, error } = useFactory();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <header className="h-16 bg-[#0b0d14] border-b border-slate-800/60 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
            {/* Left section: Hamburger + Factory Context */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 lg:hidden focus:outline-none"
                    aria-label="Open sidebar menu"
                >
                    <Menu className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-[#141724] border border-slate-700/50 rounded-lg px-3 py-1.5 shadow-inner">
                        <Building2 className="w-4 h-4 text-indigo-400 shrink-0" />
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-slate-100 tracking-tight leading-none flex items-center gap-1.5">
                                {factory?.name || 'EcoPlast Manufacturing'}
                                <ChevronDown className="w-3 h-3 text-slate-400" />
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono leading-tight">
                                {factory?.industry || 'Plastic Manufacturing'}
                            </span>
                        </div>
                    </div>

                    {/* Demo Environment Badge */}
                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/50 text-indigo-200 text-[11px] font-mono shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                        <span>DEMO ENVIRONMENT</span>
                    </div>

                    {error && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-800 text-amber-300 text-[11px] font-mono">
                            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                            <span>Backend Offline (Mock Data Active)</span>
                            <button
                                onClick={retry}
                                className="ml-1 underline hover:text-amber-100 flex items-center gap-1"
                            >
                                <RefreshCw className="w-3 h-3" /> Retry
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Right section: Reporting Period, Alerts & Profile */}
            <div className="flex items-center gap-3">
                {/* Reporting Period */}
                <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-[#121520] border border-slate-800/80 rounded-md px-3 py-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>FY 2025 - Q3</span>
                    <span className="text-slate-600">|</span>
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-[11px] text-slate-400">Updated 08:30 AM</span>
                </div>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-700/50"
                        aria-label="Notifications"
                    >
                        <Bell className="w-4 h-4" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-[#0b0d14]" />
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-[#121522] border border-slate-700/80 rounded-xl shadow-xl z-50 p-4 font-sans text-xs">
                            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                                <span className="font-semibold text-slate-200">Alerts & Notifications</span>
                                <span className="text-[10px] text-amber-400 font-mono bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40">
                                    2 New
                                </span>
                            </div>
                            <div className="space-y-2.5">
                                <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-800/30 flex items-start gap-2.5">
                                    <Sparkles className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-slate-200 font-medium leading-snug">Feasibility Filter Complete</p>
                                        <p className="text-[11px] text-slate-400 mt-0.5">37 out of 100 intervention candidates passed feasibility constraints.</p>
                                    </div>
                                </div>
                                <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/30 flex items-start gap-2.5">
                                    <ShieldAlert className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-slate-200 font-medium leading-snug">Hotspot Warning</p>
                                        <p className="text-[11px] text-slate-400 mt-0.5">Injection Molding idle load increased by +4.2% this week.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile Avatar */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700/50"
                    >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-900 via-indigo-700 to-indigo-800 flex items-center justify-center text-xs font-semibold text-slate-100 border border-indigo-500/40 shadow-sm">
                            RK
                        </div>
                        <div className="hidden lg:flex flex-col text-left">
                            <span className="text-xs font-medium text-slate-200 leading-none">Rajesh Kumar</span>
                            <span className="text-[10px] text-slate-400 font-mono mt-0.5">Sustainability Head</span>
                        </div>
                    </button>

                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-56 bg-[#121522] border border-slate-700/80 rounded-xl shadow-xl z-50 p-2 text-xs">
                            <div className="px-3 py-2 border-b border-slate-800">
                                <p className="font-semibold text-slate-200">Rajesh Kumar</p>
                                <p className="text-[11px] text-slate-400 font-mono">r.kumar@ecoplast.co.in</p>
                            </div>
                            <div className="py-1">
                                <a href="#/settings" className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:bg-slate-800/60 rounded-md">
                                    <User className="w-3.5 h-3.5 text-slate-400" /> Account Settings
                                </a>
                                <div className="flex items-center justify-between px-3 py-2 text-slate-400 border-t border-slate-800 mt-1">
                                    <span>Environment</span>
                                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                                        Enterprise
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
