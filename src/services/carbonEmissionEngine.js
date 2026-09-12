// Carbon Emission Calculation & Descending Emitter Ranking Engine
import { RAW_MATERIAL_ALTERNATIVES_DATASET, getFallbackAlternativesForCustomMaterial } from '../data/industrialAlternativesData';

// Specific emission factors (tCO2e per default unit) for curated industrial inputs
export const EMISSION_FACTORS = {
    "coking-coal": 2.8,              // tCO2e / tonne
    "limestone-clinker": 0.85,         // tCO2e / tonne (calcination + process)
    "thermal-coal": 2.4,              // tCO2e / tonne
    "iron-ore": 1.6,                  // tCO2e / tonne (integrated processing)
    "petcoke": 3.1,                   // tCO2e / tonne
    "natural-gas": 0.0022,            // tCO2e / Nm³ (~2.2 kg CO2/Nm³)
    "ammonia-grey": 2.1,              // tCO2e / tonne
    "naphtha-crude": 2.9,             // tCO2e / tonne
    "primary-aluminium": 11.5,        // tCO2e / tonne (smelting grid/anode)
    "virgin-plastics": 2.7,           // tCO2e / tonne
    "caustic-soda": 1.4,              // tCO2e / tonne
    "soda-ash": 1.1,                  // tCO2e / tonne
    "methanol": 1.8,                  // tCO2e / tonne
    "synthetic-dyes": 3.2,            // tCO2e / tonne
    "refractories-gases": 1.5         // tCO2e / tonne
};

// Keyword fallback emission factors for custom materials
const CUSTOM_KEYWORD_FACTORS = [
    { keywords: ['coal', 'coke'], factor: 2.6 },
    { keywords: ['gas', 'methane'], factor: 0.0022 },
    { keywords: ['plastic', 'polymer', 'resin'], factor: 2.5 },
    { keywords: ['oil', 'naphtha', 'petroleum', 'diesel', 'fuel'], factor: 2.9 },
    { keywords: ['metal', 'iron', 'steel'], factor: 1.8 },
    { keywords: ['aluminium', 'aluminum'], factor: 11.0 },
    { keywords: ['chemical', 'solvent', 'acid', 'dyes'], factor: 2.0 },
    { keywords: ['biomass', 'husk', 'wood', 'waste'], factor: 0.3 },
    { keywords: ['hydrogen', 'h2'], factor: 0.0 }
];

/**
 * Get specific emission factor for a material input (curated or custom)
 */
export function getEmissionFactor(item) {
    if (!item) return 1.5;

    // Check direct ID or inputId match
    const key = item.inputId || item.id || item.selectedMaterialId;
    if (key && EMISSION_FACTORS[key]) {
        return EMISSION_FACTORS[key];
    }

    // Check custom material explicit emission factor if user provided one
    if (item.customEmissionFactor && !isNaN(item.customEmissionFactor)) {
        return Number(item.customEmissionFactor);
    }

    // Keyword matching for custom material names
    const nameLower = (item.materialName || item.name || '').toLowerCase();
    for (const rule of CUSTOM_KEYWORD_FACTORS) {
        if (rule.keywords.some(kw => nameLower.includes(kw))) {
            return rule.factor;
        }
    }

    return 1.5; // Neutral default fallback
}

/**
 * Calculate annual carbon emissions for a single material entry
 */
export function calculateMaterialEmissions(item) {
    const qty = Number(item?.quantity || item?.annualConsumption || 0);
    const ef = getEmissionFactor(item);
    const emissionsTCO2e = qty * ef;

    return {
        emissionsTCO2e: Math.round(emissionsTCO2e * 10) / 10,
        emissionFactor: ef
    };
}

/**
 * Rank configured materials in DESCENDING ORDER of annual carbon emissions
 */
export function rankCarbonEmittersDescending(materialsList = []) {
    if (!Array.isArray(materialsList) || materialsList.length === 0) {
        return { rankedEmitters: [], totalEmissionsTCO2e: 0, totalCostINR: 0 };
    }

    let totalEmissions = 0;
    let totalCost = 0;

    const evaluated = materialsList.map(item => {
        const qty = Number(item.quantity || item.annualConsumption || 0);
        const unitCost = Number(item.costPerUnit || item.cost || 0);
        const calc = calculateMaterialEmissions(item);
        const totalMaterialCost = qty * unitCost;

        totalEmissions += calc.emissionsTCO2e;
        totalCost += totalMaterialCost;

        return {
            ...item,
            emissionsTCO2e: calc.emissionsTCO2e,
            emissionFactor: calc.emissionFactor,
            totalMaterialCost,
            quantity: qty,
            costPerUnit: unitCost
        };
    });

    // Sort strictly in DESCENDING ORDER of carbon emissions
    evaluated.sort((a, b) => b.emissionsTCO2e - a.emissionsTCO2e);

    // Compute percentage share of total footprint
    const rankedEmitters = evaluated.map((item, index) => {
        const sharePercent = totalEmissions > 0
            ? Math.round((item.emissionsTCO2e / totalEmissions) * 1000) / 10
            : 0;

        return {
            ...item,
            rank: index + 1,
            sharePercent,
            isHotspot: index === 0 || sharePercent >= 25 // Top emitter or >= 25% share
        };
    });

    return {
        rankedEmitters,
        totalEmissionsTCO2e: Math.round(totalEmissions * 10) / 10,
        totalCostINR: totalCost
    };
}

/**
 * COMPUTE FULL FACTORY REPORT DERIVED FROM THE EXCEL / MASTER DATASET
 * Generates all multiple alternatives per use case with pros/cons, cost savings & carbon savings
 */
export function computeFullFactoryReport(materialsList = [], setupData = {}) {
    const { rankedEmitters, totalEmissionsTCO2e, totalCostINR } = rankCarbonEmittersDescending(materialsList);

    let totalFeasibleSavingsTCO2e = 0;
    let totalAnnualSavingsINR = 0;

    // Process each ranked material and map all use cases and multiple alternatives
    const detailedMaterialAnalysis = rankedEmitters.map(mat => {
        const matKey = mat.selectedMaterialId || mat.inputId || mat.id;
        const matName = mat.materialName || mat.name || matKey;
        const datasetEntry = RAW_MATERIAL_ALTERNATIVES_DATASET[matKey];
        const presentCO2Factor = mat.emissionFactor || (datasetEntry ? datasetEntry.presentCO2PerUnit : 2.10);
        const presentTotalEmissions = mat.emissionsTCO2e;

        const selectedUseCases = Array.isArray(mat.useCases) ? mat.useCases : (mat.useCase ? [mat.useCase] : ['default']);

        const useCaseBreakdown = selectedUseCases.map(ucId => {
            let ucLabel = ucId;
            let alternatives = [];

            if (datasetEntry && datasetEntry.useCases) {
                if (datasetEntry.useCases[ucId]) {
                    const ucData = datasetEntry.useCases[ucId];
                    ucLabel = ucData.label || ucId;
                    alternatives = ucData.alternatives || [];
                } else {
                    // Try finding by matching label or partial key
                    const ucKeys = Object.keys(datasetEntry.useCases);
                    const matchedKey = ucKeys.find(k => {
                        const label = (datasetEntry.useCases[k].label || '').toLowerCase();
                        const ucLower = String(ucId).toLowerCase();
                        return k.toLowerCase() === ucLower || label.includes(ucLower) || ucLower.includes(label) || ucLower.includes(k);
                    });

                    if (matchedKey) {
                        const ucData = datasetEntry.useCases[matchedKey];
                        ucLabel = ucData.label || matchedKey;
                        alternatives = ucData.alternatives || [];
                    } else if (ucKeys.length > 0) {
                        // Pick first available use case as fallback
                        const firstUcKey = ucKeys[0];
                        const ucData = datasetEntry.useCases[firstUcKey];
                        ucLabel = ucData.label || firstUcKey;
                        alternatives = ucData.alternatives || [];
                    }
                }
            }

            if (alternatives.length === 0) {
                ucLabel = ucId === 'default' ? 'General Industrial Process' : ucId;
                alternatives = getFallbackAlternativesForCustomMaterial(matName, ucLabel, mat.quantity, mat.costPerUnit);
            }

            // Compute precise carbon & cost metrics for each alternative in this use case
            const evaluatedAlternatives = alternatives.map(alt => {
                const altCO2Factor = alt.newCO2PerUnit;
                const altEmissionsTCO2e = Math.round((mat.quantity * altCO2Factor) * 10) / 10;
                const co2SavedTCO2e = Math.max(0, Math.round((presentTotalEmissions - altEmissionsTCO2e) * 10) / 10);
                const co2ReductionPercent = alt.co2ReductionPercent || (presentTotalEmissions > 0 ? Math.round((co2SavedTCO2e / presentTotalEmissions) * 100) : 75);

                const annualCostSavedINR = Math.round(co2SavedTCO2e * 3500) + (alt.costSavingPerUnit ? Math.round(mat.quantity * alt.costSavingPerUnit) : 0);

                return {
                    ...alt,
                    presentCO2Factor,
                    presentTotalEmissionsTCO2e: presentTotalEmissions,
                    altCO2Factor,
                    altEmissionsTCO2e,
                    co2SavedTCO2e,
                    co2ReductionPercent,
                    annualCostSavedINR,
                    paybackYears: alt.paybackYears || 1.8,
                    pros: alt.pros || ["Significant carbon reduction", "OPEX cost optimization"],
                    cons: alt.cons || ["Initial trial setup required"]
                };
            });

            // Accumulate primary alternative savings
            if (evaluatedAlternatives.length > 0) {
                totalFeasibleSavingsTCO2e += evaluatedAlternatives[0].co2SavedTCO2e;
                totalAnnualSavingsINR += evaluatedAlternatives[0].annualCostSavedINR;
            }

            return {
                useCaseId: ucId,
                useCaseLabel: ucLabel,
                alternatives: evaluatedAlternatives
            };
        });

        return {
            ...mat,
            presentCO2Factor,
            useCaseBreakdown
        };
    });

    const targetEmissionsTCO2e = Math.max(0, Math.round((totalEmissionsTCO2e - totalFeasibleSavingsTCO2e) * 10) / 10);
    const reductionPotentialPercent = totalEmissionsTCO2e > 0
        ? Math.round((totalFeasibleSavingsTCO2e / totalEmissionsTCO2e) * 1000) / 10
        : 0;

    return {
        totalEmissionsTCO2e,
        totalCostINR,
        totalFeasibleSavingsTCO2e: Math.round(totalFeasibleSavingsTCO2e * 10) / 10,
        targetEmissionsTCO2e,
        reductionPotentialPercent,
        totalAnnualSavingsINR,
        detailedMaterialAnalysis,
        computedAt: new Date().toISOString()
    };
}
