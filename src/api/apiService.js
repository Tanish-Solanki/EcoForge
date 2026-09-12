import axios from 'axios';
import {
    factoryInfo,
    dashboardOverview,
    emissionsData,
    hotspots,
    recommendations,
    rejectedOptions,
    energyData,
    wasteData,
    initialRoadmapActions,
    emissionFactors,
    decisionEngineStats
} from '../data/mockData';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';
const USE_MOCK_FALLBACK = true;

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Helper for simulating network latency when using local mock data
const delay = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to detect if Vite SPA dev server returned HTML fallback instead of real JSON API data
const isInvalidResponse = (data) => {
    if (!data) return true;
    if (typeof data === 'string') return true;
    if (typeof data === 'object' && Object.keys(data).length === 0) return true;
    return false;
};

export const apiService = {
    // GET /api/factory
    async getFactory() {
        try {
            const res = await api.get('/factory');
            if (isInvalidResponse(res.data)) throw new Error('Invalid JSON response');
            return { data: res.data, isMock: false };
        } catch (err) {
            if (USE_MOCK_FALLBACK) {
                await delay();
                return { data: factoryInfo, isMock: true };
            }
            throw err;
        }
    },

    // GET /api/dashboard
    async getDashboard() {
        try {
            const res = await api.get('/dashboard');
            if (isInvalidResponse(res.data)) throw new Error('Invalid JSON response');
            return { data: res.data, isMock: false };
        } catch (err) {
            if (USE_MOCK_FALLBACK) {
                await delay();
                return { data: dashboardOverview, isMock: true };
            }
            throw err;
        }
    },

    // GET /api/emissions
    async getEmissions() {
        try {
            const res = await api.get('/emissions');
            if (isInvalidResponse(res.data)) throw new Error('Invalid JSON response');
            return { data: res.data, isMock: false };
        } catch (err) {
            if (USE_MOCK_FALLBACK) {
                await delay();
                return { data: emissionsData, isMock: true };
            }
            throw err;
        }
    },

    // GET /api/hotspots
    async getHotspots() {
        try {
            const res = await api.get('/hotspots');
            if (isInvalidResponse(res.data) || !Array.isArray(res.data)) throw new Error('Invalid JSON response');
            return { data: res.data, isMock: false };
        } catch (err) {
            if (USE_MOCK_FALLBACK) {
                await delay();
                return { data: hotspots, isMock: true };
            }
            throw err;
        }
    },

    // GET /api/recommendations
    async getRecommendations() {
        try {
            const res = await api.get('/recommendations');
            if (isInvalidResponse(res.data) || !res.data.recommendations) throw new Error('Invalid JSON response');
            return { data: res.data, isMock: false };
        } catch (err) {
            if (USE_MOCK_FALLBACK) {
                await delay();
                return {
                    data: {
                        recommendations,
                        rejectedOptions,
                        stats: decisionEngineStats
                    },
                    isMock: true
                };
            }
            throw err;
        }
    },

    // GET /api/recommendations/:id
    async getRecommendationById(id) {
        try {
            const res = await api.get(`/recommendations/${id}`);
            if (isInvalidResponse(res.data)) throw new Error('Invalid JSON response');
            return { data: res.data, isMock: false };
        } catch (err) {
            if (USE_MOCK_FALLBACK) {
                await delay();
                const item = recommendations.find(r => r.id === id) || recommendations[0];
                return { data: item, isMock: true };
            }
            throw err;
        }
    },

    // GET /api/energy
    async getEnergy() {
        try {
            const res = await api.get('/energy');
            if (isInvalidResponse(res.data)) throw new Error('Invalid JSON response');
            return { data: res.data, isMock: false };
        } catch (err) {
            if (USE_MOCK_FALLBACK) {
                await delay();
                return { data: energyData, isMock: true };
            }
            throw err;
        }
    },

    // GET /api/waste
    async getWaste() {
        try {
            const res = await api.get('/waste');
            if (isInvalidResponse(res.data)) throw new Error('Invalid JSON response');
            return { data: res.data, isMock: false };
        } catch (err) {
            if (USE_MOCK_FALLBACK) {
                await delay();
                return { data: wasteData, isMock: true };
            }
            throw err;
        }
    },

    // POST /api/simulate
    async runSimulation(inputs) {
        try {
            const res = await api.post('/simulate', inputs);
            if (isInvalidResponse(res.data)) throw new Error('Invalid JSON response');
            return { data: res.data, isMock: false };
        } catch (err) {
            if (USE_MOCK_FALLBACK) {
                await delay(100);
                const baselineCO2 = 1284;

                const renewableCO2Reduction = Math.max(0, 420 * ((inputs.renewablePercent - 18) / 100));
                const recycledCO2Reduction = (610 * (inputs.recycledMaterialPercent / 100)) * 0.70;
                const dieselCO2Reduction = 92 * (1 - inputs.dieselUsagePercent / 100);
                const electricityDelta = 420 * (inputs.electricityConsumptionChange / 100);
                const wasteCO2Reduction = 78 * (inputs.wasteRecyclingPercent / 100) * 0.50;
                const efficiencyGain = (inputs.machineEfficiencyPercent - 50) / 100 * 40;

                const totalReduction = Math.min(
                    baselineCO2 * 0.65,
                    Math.round(renewableCO2Reduction + recycledCO2Reduction + dieselCO2Reduction - electricityDelta + wasteCO2Reduction + efficiencyGain)
                );

                const simulatedCO2 = Math.max(350, baselineCO2 - totalReduction);
                const reductionPercent = ((totalReduction / baselineCO2) * 100).toFixed(1);

                const annualSavingsLakhs = (totalReduction * 0.059).toFixed(1);
                const estimatedInvestmentLakhs = ((inputs.renewablePercent * 0.2) + (inputs.recycledMaterialPercent * 0.08) + (inputs.wasteRecyclingPercent * 0.05)).toFixed(1);
                const paybackMonths = Math.max(2, Math.round((parseFloat(estimatedInvestmentLakhs) / parseFloat(annualSavingsLakhs)) * 12));

                return {
                    data: {
                        currentCO2: baselineCO2,
                        simulatedCO2,
                        co2Reduction: totalReduction,
                        reductionPercent: parseFloat(reductionPercent),
                        annualSavingsINR: Math.round(annualSavingsLakhs * 100000),
                        investmentCostINR: Math.round(estimatedInvestmentLakhs * 100000),
                        paybackMonths: isNaN(paybackMonths) ? 10 : paybackMonths,
                        chartData: [
                            { label: 'Current State', emissions: baselineCO2 },
                            { label: 'Simulated State', emissions: simulatedCO2 }
                        ]
                    },
                    isMock: true
                };
            }
            throw err;
        }
    },

    // GET /api/roadmap
    async getRoadmap() {
        try {
            const res = await api.get('/roadmap');
            if (isInvalidResponse(res.data) || !Array.isArray(res.data)) throw new Error('Invalid JSON response');
            return { data: res.data, isMock: false };
        } catch (err) {
            if (USE_MOCK_FALLBACK) {
                await delay();
                return { data: initialRoadmapActions, isMock: true };
            }
            throw err;
        }
    },

    // POST /api/assistant
    async queryAssistant(userMessage) {
        try {
            const res = await api.post('/assistant', { prompt: userMessage });
            if (isInvalidResponse(res.data) || !res.data.reply) throw new Error('Invalid JSON response');
            return { data: res.data, isMock: false };
        } catch (err) {
            if (USE_MOCK_FALLBACK) {
                await delay(200);
                const q = userMessage.toLowerCase();
                let reply = "";

                if (q.includes("injection molding") || q.includes("biggest emitter")) {
                    reply = "Injection Molding accounts for 520 tCO2e/year (40.5% of factory emissions). The primary driver is constant hydraulic pump runtime coupled with 22% machine idle time during mold changeovers. Installing VFD drives (rec-2) and machine auto-shutdown (rec-3) can reduce this by 94 tCO2e/year.";
                } else if (q.includes("highest-impact") || q.includes("highest impact") || q.includes("action")) {
                    reply = "The highest-impact action is 'Replace 30% Virgin PP With Recycled PP' (rec-1). It delivers 84 tCO2e/year reduction, has a 96% technical feasibility pass score, saves ₹6.2 Lakhs/year, and pays back in just 8 months.";
                } else if (q.includes("rejected") || q.includes("material alternative")) {
                    reply = "The option 'Switch to 100% Bio-based PLA' was rejected by our Technical Feasibility Filter because PLA deforms at 110°C, whereas injection molding requires continuous heat tolerance of ≥120°C. Technical feasibility is a hard constraint in EcoForge AI.";
                } else if (q.includes("recycled material") || q.includes("50%")) {
                    reply = "Increasing recycled material content to 50% reduces factory emissions by approximately 182 tCO2e/year (14.2% overall reduction), yielding estimated raw material cost savings of ₹11.5 Lakhs annually.";
                } else if (q.includes("pay back within one year") || q.includes("payback")) {
                    reply = "4 key actions pay back in under 12 months:\n1. Machine Idle Auto-Shutdown (2 months payback)\n2. Chiller Set-Point Optimization (1 month payback)\n3. Purging Compound Standardization (3 months payback)\n4. Replace 30% Virgin PP (8 months payback).";
                } else {
                    reply = `Analyzing EcoPlast Manufacturing baseline (1,284 tCO2e/year)... Based on your operational data, targeting Electricity (420 tCO2e) and Raw Materials (610 tCO2e) provides 80%+ of total carbon reduction potential. Let me know if you would like details on specific interventions or feasibility parameters.`;
                }

                return {
                    data: {
                        reply,
                        timestamp: new Date().toISOString(),
                        context: "EcoPlast Manufacturing FY 2025"
                    },
                    isMock: true
                };
            }
            throw err;
        }
    }
};
