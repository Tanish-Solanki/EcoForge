import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export const AppShell = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    // Landing page ('/') and Factory Setup ('/setup') can have dedicated full-screen layouts
    const isStandalonePage = location.pathname === '/' || location.pathname === '/setup';

    if (isStandalonePage) {
        return (
            <main className="min-h-screen bg-[#0b0d13] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
                <Outlet />
            </main>
        );
    }

    return (
        <div className="min-h-screen bg-[#0b0d13] text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
            {/* Persistent Enterprise Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content Area */}
            <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
                <Topbar onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
                    <Outlet />
                </main>

                {/* Global Footer Banner */}
                <footer className="lg:pl-64 py-3 px-6 border-t border-slate-800/40 bg-[#090a10] text-[11px] text-slate-400 font-mono flex flex-col sm:flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>EcoForge AI v2.4 Enterprise • Feasibility Filter & Optimization Engine</span>
                    </div>
                    <div>
                        <span>Objective: <strong className="text-slate-200 font-normal">Maximum CO2 Reduction</strong></span>
                    </div>
                </footer>
            </div>
        </div>
    );
};
