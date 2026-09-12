import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../api/apiService';
import { industrialInputService } from '../services/industrialInputService';
import { initialRoadmapActions, factoryInfo as defaultFactory, dashboardOverview } from '../data/mockData';
import { computeFullFactoryReport } from '../services/carbonEmissionEngine';

const FactoryContext = createContext();

const DEFAULT_INDUSTRIAL_INPUTS = [];

export const FactoryProvider = ({ children }) => {
    const [factory, setFactory] = useState(defaultFactory);
    const [dashboard, setDashboard] = useState(dashboardOverview);
    const [emissions, setEmissions] = useState(null);
    const [hotspots, setHotspots] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [rejectedOptions, setRejectedOptions] = useState([]);
    const [decisionStats, setDecisionStats] = useState(null);
    const [energy, setEnergy] = useState(null);
    const [waste, setWaste] = useState(null);
    const [roadmap, setRoadmap] = useState(initialRoadmapActions);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDemoMode, setIsDemoMode] = useState(true);

    // Industrial Inputs Structured State
    const [industrialInputs, setIndustrialInputs] = useState(DEFAULT_INDUSTRIAL_INPUTS);

    // Computed Factory Report State
    const [computedReport, setComputedReport] = useState(() => {
        try {
            const stored = localStorage.getItem('ecoforge_computed_factory_report');
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            return null;
        }
    });

    // 8-Step Setup Workflow Data Model (Supports Arrays of Materials per Section)
    const [setupData, setSetupData] = useState({
        name: "EcoPlast Manufacturing",
        industry: "Plastic Manufacturing",
        processes: ["Injection Molding", "Extrusion"],
        materials: [],
        material1: [],
        material2: [],
        material3: [],
        gridPowerKwh: 512000,
        solarKwh: 120000,
        dieselLiters: 31500,
        wasteTonnes: 184
    });

    const loadAllData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [facRes, dashRes, emRes, hsRes, recRes, enRes, wstRes, rmRes, indRes] = await Promise.all([
                apiService.getFactory(),
                apiService.getDashboard(),
                apiService.getEmissions(),
                apiService.getHotspots(),
                apiService.getRecommendations(),
                apiService.getEnergy(),
                apiService.getWaste(),
                apiService.getRoadmap(),
                industrialInputService.getFactoryIndustrialInputs()
            ]);

            if (facRes.data && typeof facRes.data === 'object') setFactory(facRes.data);
            if (dashRes.data && typeof dashRes.data === 'object') setDashboard(dashRes.data);
            if (emRes.data && typeof emRes.data === 'object') setEmissions(emRes.data);
            if (hsRes.data && Array.isArray(hsRes.data)) setHotspots(hsRes.data);
            if (recRes.data && typeof recRes.data === 'object') {
                setRecommendations(recRes.data.recommendations || []);
                setRejectedOptions(recRes.data.rejectedOptions || []);
                setDecisionStats(recRes.data.stats || null);
            }
            if (enRes.data && typeof enRes.data === 'object') setEnergy(enRes.data);
            if (wstRes.data && typeof wstRes.data === 'object') setWaste(wstRes.data);
            if (rmRes.data && Array.isArray(rmRes.data) && rmRes.data.length) {
                setRoadmap(rmRes.data);
            }
            if (indRes.data && Array.isArray(indRes.data) && indRes.data.length > 0) {
                setIndustrialInputs(indRes.data);
            }
            setIsDemoMode(dashRes.isMock);
        } catch (err) {
            console.error("Error loading factory data:", err);
            setError("Unable to connect to EcoForge backend.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAllData();
    }, []);

    // RUN FACTORY ANALYSIS UPON CLICKING "ANALYZE FACTORY"
    const runFactoryAnalysis = (materialsList = [], currentSetupData = setupData) => {
        const report = computeFullFactoryReport(materialsList, currentSetupData);
        setComputedReport(report);

        // Update dashboard metrics dynamically
        setDashboard(prev => ({
            ...prev,
            totalEmissionsTCO2e: report.totalEmissionsTCO2e,
            reductionPotentialTCO2e: report.totalFeasibleSavingsTCO2e,
            reductionPotentialPercent: report.reductionPotentialPercent,
            annualSavingsINR: report.totalAnnualSavingsINR
        }));

        try {
            localStorage.setItem('ecoforge_computed_factory_report', JSON.stringify(report));
        } catch (e) {
            console.warn("Unable to save computed report to localStorage:", e);
        }

        return report;
    };

    // Save Industrial Inputs to persistence
    const saveIndustrialInputs = (newInputs) => {
        setIndustrialInputs(newInputs);
        industrialInputService.saveFactoryIndustrialInputs('ecoplast-manufacturing', newInputs);
    };

    // Helper to update setupData section
    const updateSetupSection = (sectionKey, updates) => {
        setSetupData(prev => ({
            ...prev,
            [sectionKey]: updates
        }));
    };

    // Calculated stats for Roadmap
    const roadmapStats = {
        totalCO2Saved: (roadmap || []).reduce((sum, item) => sum + (item.co2ReductionTCO2e || 0), 0),
        totalCost: (roadmap || []).reduce((sum, item) => sum + (item.investmentINR || item.implementationCostINR || 0), 0),
        totalSavings: (roadmap || []).reduce((sum, item) => sum + (item.annualSavingsINR || 0), 0),
        averagePaybackMonths: (roadmap && roadmap.length > 0)
            ? Math.round((roadmap.reduce((sum, item) => sum + (item.paybackMonths || 0), 0) / roadmap.length))
            : 0
    };

    // Add recommendation to roadmap
    const addToRoadmap = (rec) => {
        const exists = (roadmap || []).find(r => r.recId === rec.id || r.title === rec.title);
        if (exists) return false;

        const newAction = {
            id: `act-${Date.now()}`,
            recId: rec.id,
            targetQuarter: "Q2 2026",
            phase: rec.paybackMonths <= 3 ? "0-3 MONTHS" : rec.paybackMonths <= 12 ? "3-12 MONTHS" : "1-3 YEARS",
            phaseTitle: rec.paybackMonths <= 3 ? "Quick Wins" : rec.paybackMonths <= 12 ? "Transformation" : "Structural Change",
            title: rec.title,
            co2ReductionTCO2e: rec.co2ReductionTCO2e,
            investmentINR: rec.implementationCostINR || 200000,
            annualSavingsINR: rec.annualSavingsINR || 150000,
            paybackMonths: rec.paybackMonths || 8,
            difficulty: rec.difficulty || "Medium",
            status: "Planned",
            category: rec.category || "Material"
        };

        setRoadmap(prev => [...(prev || []), newAction]);
        return true;
    };

    // Update single action in roadmap
    const updateRoadmapAction = (id, updates) => {
        setRoadmap(prev => (prev || []).map(item => item.id === id ? { ...item, ...updates } : item));
    };

    // Toggle action status in roadmap
    const toggleRoadmapStatus = (id) => {
        setRoadmap(prev => (prev || []).map(item => {
            if (item.id === id) {
                const nextStatus = item.status === "Planned" ? "In Progress" : item.status === "In Progress" ? "Completed" : "Planned";
                return { ...item, status: nextStatus };
            }
            return item;
        }));
    };

    // Remove action from roadmap
    const removeFromRoadmap = (id) => {
        setRoadmap(prev => (prev || []).filter(item => item.id !== id));
    };

    return (
        <FactoryContext.Provider value={{
            factory,
            dashboard,
            emissions,
            hotspots,
            recommendations,
            rejectedOptions,
            decisionStats,
            energy,
            waste,
            roadmap,
            roadmapStats,
            loading,
            error,
            isDemoMode,
            industrialInputs,
            saveIndustrialInputs,
            setupData,
            setSetupData,
            updateSetupSection,
            computedReport,
            runFactoryAnalysis,
            retry: loadAllData,
            addToRoadmap,
            updateRoadmapAction,
            toggleRoadmapStatus,
            removeFromRoadmap
        }}>
            {children}
        </FactoryContext.Provider>
    );
};

export const useFactory = () => {
    const ctx = useContext(FactoryContext);
    if (!ctx) {
        throw new Error('useFactory must be used within a FactoryProvider');
    }
    return ctx;
};
