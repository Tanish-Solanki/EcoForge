// EcoForge AI - Industrial Carbon Intelligence Mock Dataset

export const factoryInfo = {
    id: "fac-001",
    name: "EcoPlast Manufacturing",
    location: "Pune, Maharashtra, India",
    industry: "Plastic Manufacturing",
    reportingPeriod: "FY 2025 - Q3",
    lastUpdated: "Today at 08:30 AM",
    operatingHoursPerYear: 7200,
    totalProductionTonnes: 3050,
    processes: [
        { id: "p1", name: "Injection Molding", powerKw: 680, share: "45%" },
        { id: "p2", name: "Extrusion", powerKw: 420, share: "35%" },
        { id: "p3", name: "Compounding & Finishing", powerKw: 190, share: "20%" }
    ],
    materials: ["PP Virgin", "HDPE", "ABS", "Recycled PP Grade A", "Color Masterbatches"],
    energySources: ["Grid Electricity (MSEB)", "Rooftop Solar PV (250 kWp)", "Diesel Generator (Backup 500 kVA)"],
    wasteStreams: ["Plastic Scrap Purgings", "Runner & Sprue Scrap", "Packaging Waste", "Hazardous Lubricant Oil"]
};

export const dashboardOverview = {
    totalEmissionsTCO2e: 1284,
    previousPeriodEmissions: 1390,
    emissionsChangePercent: -7.6,
    reductionPotentialTCO2e: 312,
    reductionPotentialPercent: 24.3,
    projectedTargetEmissions: 972,
    emissionsIntensity: 0.42, // tCO2e / tonne of product
    annualSavingsINR: 1840000, // ₹18.4 Lakhs
    renewableEnergyPercent: 18,
    wasteDiversionPercent: 64,
    emissionsBySource: [
        { name: "Electricity", value: 420, color: "#4f46e5", share: "32.7%" },
        { name: "Materials", value: 610, color: "#38bdf8", share: "47.5%" },
        { name: "Diesel", value: 92, color: "#d97706", share: "7.2%" },
        { name: "Waste", value: 78, color: "#f43f5e", share: "6.1%" },
        { name: "Chemicals", value: 42, color: "#a855f7", share: "3.3%" },
        { name: "Other", value: 42, color: "#64748b", share: "3.3%" }
    ],
    monthlyTrend: [
        { month: "Jan", electricity: 38, materials: 52, diesel: 9, waste: 7, total: 106 },
        { month: "Feb", electricity: 36, materials: 50, diesel: 8, waste: 6, total: 100 },
        { month: "Mar", electricity: 39, materials: 54, diesel: 10, waste: 7, total: 110 },
        { month: "Apr", electricity: 34, materials: 49, diesel: 7, waste: 6, total: 96 },
        { month: "May", electricity: 37, materials: 51, diesel: 8, waste: 7, total: 103 },
        { month: "Jun", electricity: 35, materials: 50, diesel: 7, waste: 6, total: 98 },
        { month: "Jul", electricity: 33, materials: 48, diesel: 6, waste: 6, total: 93 },
        { month: "Aug", electricity: 34, materials: 49, diesel: 7, waste: 7, total: 97 },
        { month: "Sep", electricity: 36, materials: 52, diesel: 8, waste: 6, total: 102 },
        { month: "Oct", electricity: 35, materials: 51, diesel: 8, waste: 7, total: 101 },
        { month: "Nov", electricity: 32, materials: 47, diesel: 7, waste: 6, total: 92 },
        { month: "Dec", electricity: 31, materials: 46, diesel: 6, waste: 6, total: 89 }
    ]
};

export const emissionsData = {
    directEmissions: [
        { source: "Diesel Generator (Backup)", activity: "31,500 Liters", factor: "2.68 kg CO2e/L", emissions: 84.4, unit: "tCO2e" },
        { source: "Natural Gas Mold Heater", activity: "3,800 m³", factor: "2.02 kg CO2e/m³", emissions: 7.6, unit: "tCO2e" }
    ],
    purchasedEnergy: [
        { source: "Grid Electricity (MSEB Maharashtra)", activity: "512,000 kWh", factor: "0.82 kg CO2e/kWh", emissions: 420.0, unit: "tCO2e" }
    ],
    otherEmissions: [
        { source: "Virgin PP Polymer Feedstock", activity: "820 Tonnes", factor: "1.95 tCO2e/tonne", emissions: 410.0, unit: "tCO2e" },
        { source: "Virgin ABS Feedstock", activity: "150 Tonnes", factor: "3.10 tCO2e/tonne", emissions: 185.0, unit: "tCO2e" },
        { source: "Masterbatch Additives", activity: "15 Tonnes", factor: "1.00 tCO2e/tonne", emissions: 15.0, unit: "tCO2e" },
        { source: "Landfill Plastic Scrap Disposal", activity: "66 Tonnes", factor: "1.18 tCO2e/tonne", emissions: 78.0, unit: "tCO2e" },
        { source: "Hydraulic Oils & Solvents", activity: "12,000 Liters", factor: "3.50 kg CO2e/L", emissions: 42.0, unit: "tCO2e" },
        { source: "Facility Logistics & Auxiliary", activity: "Misc Activity", factor: "Calculated", emissions: 42.0, unit: "tCO2e" }
    ],
    byProcess: [
        { name: "Injection Molding", value: 520, share: "40.5%" },
        { name: "Extrusion Line #1 & #2", value: 390, share: "30.4%" },
        { name: "Compounding & Purging", value: 184, share: "14.3%" },
        { name: "Utility Chillers & Air Compressors", value: 115, share: "9.0%" },
        { name: "Facility Lighting & Admin", value: 75, share: "5.8%" }
    ],
    byMaterial: [
        { name: "Virgin PP (Polypropylene)", value: 410, share: "31.9%" },
        { name: "Virgin ABS", value: 185, share: "14.4%" },
        { name: "Grid Electricity Load", value: 420, share: "32.7%" },
        { name: "Diesel Fuel", value: 92, share: "7.2%" },
        { name: "Waste Scrap", value: 78, share: "6.1%" },
        { name: "Other Chemicals", value: 99, share: "7.7%" }
    ]
};

export const hotspots = [
    {
        id: "hs-1",
        title: "Injection Molding Department Electricity Load",
        category: "Electricity / Machine",
        emissionsTCO2e: 382,
        percentOfTotal: 29.7,
        severity: "Critical",
        probableCause: "High electricity consumption combined with low machine utilization and idle heating states.",
        reductionPotentialTCO2e: 96,
        trend: "+4.2% vs last month",
        causeChain: [
            { step: "Electricity Consumption", text: "512,000 kWh/yr consumed across 14 injection presses" },
            { step: "High Machine Runtime", text: "Hydraulic pumps running continuously for 24/7 operations" },
            { step: "Low Effective Utilization", text: "Idle time during mold changes averages 22% of total shift hours" },
            { step: "High Energy per Unit", text: "0.58 kWh per kg produced (Industry Benchmark: 0.42 kWh/kg)" },
            { step: "High CO2 Emissions", text: "382 tCO2e annual emissions contribution" }
        ],
        historicalData: [
            { month: "Jan", emissions: 32 },
            { month: "Feb", emissions: 31 },
            { month: "Mar", emissions: 34 },
            { month: "Apr", emissions: 30 },
            { month: "May", emissions: 33 },
            { month: "Jun", emissions: 32 }
        ]
    },
    {
        id: "hs-2",
        title: "Extrusion Line #2 Virgin PP Feedstock Intensity",
        category: "Materials",
        emissionsTCO2e: 245,
        percentOfTotal: 19.1,
        severity: "High",
        probableCause: "High virgin PP throughput combined with elevated purging waste during color changeover.",
        reductionPotentialTCO2e: 72,
        trend: "-1.1% vs last month",
        causeChain: [
            { step: "Virgin PP Procurement", text: "820 tonnes of 100% virgin resin consumed" },
            { step: "Frequent Color Swaps", text: "Purging required 18 times/week resulting in high scrap" },
            { step: "High Embodied Carbon", text: "1.95 tCO2e/tonne cradle-to-gate intensity" },
            { step: "High CO2 Emissions", text: "245 tCO2e annual emissions contribution" }
        ],
        historicalData: [
            { month: "Jan", emissions: 21 },
            { month: "Feb", emissions: 20 },
            { month: "Mar", emissions: 22 },
            { month: "Apr", emissions: 19 },
            { month: "May", emissions: 21 },
            { month: "Jun", emissions: 20 }
        ]
    },
    {
        id: "hs-3",
        title: "Virgin ABS Polymer Raw Feedstock",
        category: "Materials",
        emissionsTCO2e: 185,
        percentOfTotal: 14.4,
        severity: "High",
        probableCause: "High embodied carbon intensity in raw virgin ABS supplier feedstocks (3.1 tCO2e/tonne).",
        reductionPotentialTCO2e: 41,
        trend: "+0.5% vs last month",
        causeChain: [
            { step: "Raw Feedstock", text: "150 Tonnes ABS virgin resin" },
            { step: "High Upstream Carbon", text: "Acrylonitrile-butadiene-styrene polymerization impact" },
            { step: "No Recycled Blend", text: "0% recycled PCR content in current product specs" },
            { step: "High CO2 Emissions", text: "185 tCO2e annual emissions contribution" }
        ],
        historicalData: [
            { month: "Jan", emissions: 16 },
            { month: "Feb", emissions: 15 },
            { month: "Mar", emissions: 16 },
            { month: "Apr", emissions: 15 },
            { month: "May", emissions: 16 },
            { month: "Jun", emissions: 15 }
        ]
    },
    {
        id: "hs-4",
        title: "Cooling Water Chiller Circuit Energy Loss",
        category: "Energy / Machine",
        emissionsTCO2e: 115,
        percentOfTotal: 9.0,
        severity: "Medium",
        probableCause: "Set-point temperature mismatch and non-variable frequency drive pump operation.",
        reductionPotentialTCO2e: 34,
        trend: "+2.0% vs last month",
        causeChain: [
            { step: "Chiller Electricity", text: "140,000 kWh/yr consumed for mold cooling" },
            { step: "Sub-optimal Setpoint", text: "Chiller running at 7°C when process specs require 12°C" },
            { step: "Constant Speed Pumps", text: "Pumps running at 100% capacity regardless of load" },
            { step: "High CO2 Emissions", text: "115 tCO2e annual emissions contribution" }
        ],
        historicalData: [
            { month: "Jan", emissions: 10 },
            { month: "Feb", emissions: 9 },
            { month: "Mar", emissions: 10 },
            { month: "Apr", emissions: 9 },
            { month: "May", emissions: 10 },
            { month: "Jun", emissions: 10 }
        ]
    },
    {
        id: "hs-5",
        title: "Backup Diesel Generator Load & Standby Efficiency",
        category: "Diesel Fuel",
        emissionsTCO2e: 92,
        percentOfTotal: 7.2,
        severity: "Medium",
        probableCause: "Unscheduled grid downtime and inefficiency during partial load operation.",
        reductionPotentialTCO2e: 45,
        trend: "-3.5% vs last month",
        causeChain: [
            { step: "Diesel Consumption", text: "31,500 L diesel consumed annually" },
            { step: "Grid Outages", text: "Average 4.5 hours of grid outage per week" },
            { step: "Low Generator Efficiency", text: "Operating at 35% engine load during night shifts" },
            { step: "High CO2 Emissions", text: "92 tCO2e annual emissions contribution" }
        ],
        historicalData: [
            { month: "Jan", emissions: 8 },
            { month: "Feb", emissions: 7 },
            { month: "Mar", emissions: 9 },
            { month: "Apr", emissions: 7 },
            { month: "May", emissions: 8 },
            { month: "Jun", emissions: 7 }
        ]
    },
    {
        id: "hs-6",
        title: "Packaging & Purge Plastic Scrap Waste Disposal",
        category: "Waste Stream",
        emissionsTCO2e: 78,
        percentOfTotal: 6.1,
        severity: "Low",
        probableCause: "Single-use protective film disposal without on-site re-granulation.",
        reductionPotentialTCO2e: 24,
        trend: "0.0% vs last month",
        causeChain: [
            { step: "Scrap Generation", text: "66 Tonnes plastic scrap generated" },
            { step: "Off-site Landfill Disposal", text: "Sent to municipal landfill waste stream" },
            { step: "Methane & Carbon Footprint", text: "End-of-life disposal emissions" },
            { step: "High CO2 Emissions", text: "78 tCO2e annual emissions contribution" }
        ],
        historicalData: [
            { month: "Jan", emissions: 6 },
            { month: "Feb", emissions: 6 },
            { month: "Mar", emissions: 7 },
            { month: "Apr", emissions: 6 },
            { month: "May", emissions: 7 },
            { month: "Jun", emissions: 6 }
        ]
    }
];

export const decisionEngineStats = {
    totalEvaluatedOptions: 100,
    technicalFeasibilityFilterPassed: 37,
    technicalFeasibilityFilterRejected: 63,
    topActionsSelected: 5,
    primaryObjective: "Maximum CO2 Reduction",
    hardConstraint: "Technical Feasibility (Pass/Fail Matrix)",
    secondaryMetrics: ["Cost (CAPEX)", "Payback Period", "Energy Savings", "Waste Diversion"]
};

export const recommendations = [
    {
        id: "rec-1",
        title: "Replace 30% Virgin PP With Recycled PP (Post-Industrial)",
        badge: "HIGH CO2 IMPACT",
        category: "Material",
        status: "Recommended",
        co2ReductionTCO2e: 84,
        co2BaselineTCO2e: 280,
        co2ProposedTCO2e: 196,
        feasibilityScore: 96,
        annualSavingsINR: 620000, // ₹6.2 L
        implementationCostINR: 410000, // ₹4.1 L
        paybackMonths: 8,
        difficulty: "Low",
        whyRecommended: "High-volume virgin PP substitution with 96% technical compatibility gives the single largest CO2 reduction with immediate payback under 8 months.",
        technicalMatrix: [
            { requirement: "Temperature resistance", required: "≥ 120°C", candidate: "135°C", status: "PASS" },
            { requirement: "Pressure requirement", required: "≥ 10 bar", candidate: "12 bar", status: "PASS" },
            { requirement: "Lifetime & Durability", required: "≥ 20 years", candidate: "25 years", status: "PASS" },
            { requirement: "Chemical resistance", required: "Compatible", candidate: "Compatible (Grade A PCR)", status: "PASS" },
            { requirement: "Process compatibility", required: "Extrusion / Injection", candidate: "Extrusion & Injection verified", status: "PASS" },
            { requirement: "Machine compatibility", required: "Standard Screw", candidate: "No barrel mod required", status: "PASS" }
        ],
        environmentalImpact: {
            co2ReductionTCO2e: 84,
            energySavingsKwh: 45000,
            wasteReductionTonnes: 52,
            rawMaterialSavingsTonnes: 240
        },
        rolloutSteps: [
            { step: 1, title: "Supplier Validation", description: "Audit certified recycled PP suppliers for melt flow index (MFI) consistency." },
            { step: 2, title: "Small Batch Trial", description: "Run 500 kg trial on Extrusion Line #2; test tensile strength and melt viscosity." },
            { step: 3, title: "Quality & Compliance Testing", description: "Perform ISO impact and thermal degradation testing in quality lab." },
            { step: 4, title: "Full Production Rollout", description: "Transition 30% resin hopper blend ratio into standard operating procedure." }
        ],
        calculations: {
            formula: "CO2 Reduction = Virgin Resin Substituted (Tonnes) × (Embodied CO2 Virgin [1.95] - Embodied CO2 Recycled [0.45])",
            assumptions: "240 tonnes substituted per year; 1.50 tCO2e net reduction per substituted tonne.",
            dataSource: "Ecoinvent 3.9 DB + Factory Supplier Spec Sheets (MSEB Power Factor 0.82)"
        }
    },
    {
        id: "rec-2",
        title: "Install Variable Frequency Drives (VFD) on Hydraulic Pumps",
        badge: "QUICK PAYBACK",
        category: "Energy",
        status: "Recommended",
        co2ReductionTCO2e: 58,
        co2BaselineTCO2e: 185,
        co2ProposedTCO2e: 127,
        feasibilityScore: 94,
        annualSavingsINR: 480000, // ₹4.8 L
        implementationCostINR: 400000, // ₹4.0 L
        paybackMonths: 10,
        difficulty: "Low",
        whyRecommended: "VFD retrofits modulate motor speed according to hydraulic pressure demand during holding and cooling phases, reducing energy consumption by 31%.",
        technicalMatrix: [
            { requirement: "Motor Power Rating", required: "37 kW to 75 kW", candidate: "55 kW standard induction", status: "PASS" },
            { requirement: "Control Latency", required: "≤ 50 ms response", candidate: "20 ms vector drive", status: "PASS" },
            { requirement: "Thermal Dissipation", required: "Air Cooled", candidate: "IP54 Cabinet enclosure", status: "PASS" },
            { requirement: "Harmonic Distortion", required: "< 5% THD", candidate: "Filtered Active Front End", status: "PASS" }
        ],
        environmentalImpact: {
            co2ReductionTCO2e: 58,
            energySavingsKwh: 70700,
            wasteReductionTonnes: 0,
            rawMaterialSavingsTonnes: 0
        },
        rolloutSteps: [
            { step: 1, title: "Motor Audit", description: "Verify electrical nameplate data across 6 primary injection molding machines." },
            { step: 2, title: "VFD Procurement", description: "Order ABB/Siemens industrial VFD drives with harmonic filters." },
            { step: 3, title: "Installation & Tuning", description: "Schedule weekend maintenance window for electrical cabinet installation." },
            { step: 4, title: "Verification", description: "Measure real-time kW demand before and after retrofitting." }
        ],
        calculations: {
            formula: "CO2 Reduction = Annual kWh Saved × MSEB Grid Emission Factor (0.82 kg CO2e/kWh)",
            assumptions: "7,200 operating hours; average 9.8 kW load reduction per press.",
            dataSource: "Energy Meter Audit Data Q2 FY25"
        }
    },
    {
        id: "rec-3",
        title: "Implement Machine Idle-Time Auto-Shutdown Protocol",
        badge: "LOW COST",
        category: "Process",
        status: "Recommended",
        co2ReductionTCO2e: 36,
        co2BaselineTCO2e: 98,
        co2ProposedTCO2e: 62,
        feasibilityScore: 98,
        annualSavingsINR: 320000, // ₹3.2 L
        implementationCostINR: 50000, // ₹0.5 L
        paybackMonths: 2,
        difficulty: "Low",
        whyRecommended: "Software PLC update that cuts power to barrel heating elements after 15 minutes of idle operator waiting time.",
        technicalMatrix: [
            { requirement: "PLC Compatibility", required: "Modbus/OPC-UA", candidate: "Siemens S7-1200", status: "PASS" },
            { requirement: "Re-heat Time", required: "≤ 12 minutes", candidate: "9.5 minutes", status: "PASS" }
        ],
        environmentalImpact: {
            co2ReductionTCO2e: 36,
            energySavingsKwh: 43900,
            wasteReductionTonnes: 0,
            rawMaterialSavingsTonnes: 0
        },
        rolloutSteps: [
            { step: 1, title: "PLC Code Update", description: "Deploy automated idle logic to press controllers." },
            { step: 2, title: "Operator Training", description: "Brief shift supervisors on auto-standby reheat procedure." }
        ],
        calculations: {
            formula: "CO2 Reduction = Idle Hours Prevented × Heating Band kW × Grid Factor",
            assumptions: "1,200 idle machine hours eliminated per year.",
            dataSource: "Machine IoT Telemetry Logs"
        }
    },
    {
        id: "rec-4",
        title: "On-Site Plastic Scrap Closed-Loop Re-Granulation",
        badge: "CIRCULARITY",
        category: "Waste",
        status: "Recommended",
        co2ReductionTCO2e: 42,
        co2BaselineTCO2e: 78,
        co2ProposedTCO2e: 36,
        feasibilityScore: 91,
        annualSavingsINR: 350000, // ₹3.5 L
        implementationCostINR: 410000, // ₹4.1 L
        paybackMonths: 14,
        difficulty: "Medium",
        whyRecommended: "Grind and re-feed runner scrap directly into press hoppers to avoid scrap transport and virgin resin buying.",
        technicalMatrix: [
            { requirement: "Granule Size Consistency", required: "4-6 mm", candidate: "5 mm Screen", status: "PASS" },
            { requirement: "Contamination Level", required: "< 0.1%", candidate: "Dust Seperator Installed", status: "PASS" }
        ],
        environmentalImpact: {
            co2ReductionTCO2e: 42,
            energySavingsKwh: 12000,
            wasteReductionTonnes: 48,
            rawMaterialSavingsTonnes: 44
        },
        rolloutSteps: [
            { step: 1, title: "Granulator Placement", description: "Install beside-the-press granulators on Lines 1-4." },
            { step: 2, title: "Proportioner Installation", description: "Add automatic regrind proportioning valves to hoppers." }
        ],
        calculations: {
            formula: "CO2 Reduction = Regrind Reused (t) × Virgin Avoidance - Granulator Energy (kWh) × Grid Factor",
            assumptions: "44 tonnes scrap diverted directly to re-molding.",
            dataSource: "Waste Manifest Audit"
        }
    },
    {
        id: "rec-5",
        title: "Expand Rooftop Solar PV Capacity by 250 kWp",
        badge: "RENEWABLE",
        category: "Energy",
        status: "Recommended",
        co2ReductionTCO2e: 52,
        co2BaselineTCO2e: 420,
        co2ProposedTCO2e: 368,
        feasibilityScore: 89,
        annualSavingsINR: 560000, // ₹5.6 L
        implementationCostINR: 1020000, // ₹10.2 L
        paybackMonths: 22,
        difficulty: "Medium",
        whyRecommended: "Generates ~360,000 kWh of clean solar electricity annually, increasing renewable share from 18% to 32%.",
        technicalMatrix: [
            { requirement: "Roof Load Bearing", required: "≥ 15 kg/m²", candidate: "22 kg/m² verified", status: "PASS" },
            { requirement: "Grid Net Metering", required: "MSEB Approval", candidate: "Permit Granted", status: "PASS" }
        ],
        environmentalImpact: {
            co2ReductionTCO2e: 52,
            energySavingsKwh: 63400,
            wasteReductionTonnes: 0,
            rawMaterialSavingsTonnes: 0
        },
        rolloutSteps: [
            { step: 1, title: "EPC Selection", description: "Contract solar installer for panel layout and mounting." },
            { step: 2, title: "Commissioning", description: "Connect inverter to main 11 kV transformer busbar." }
        ],
        calculations: {
            formula: "CO2 Reduction = Solar Generation (kWh) × Grid Factor (0.82 kg/kWh)",
            assumptions: "1,440 kWh/kWp specific yield in Pune region.",
            dataSource: "NREL PVWatts & MSEB Tariff Chart"
        }
    },
    {
        id: "rec-6",
        title: "Optimize Chiller Set-Point & Condenser Coil Maintenance",
        badge: "EASY WIN",
        category: "Machine",
        status: "Recommended",
        co2ReductionTCO2e: 18,
        co2BaselineTCO2e: 115,
        co2ProposedTCO2e: 97,
        feasibilityScore: 99,
        annualSavingsINR: 190000,
        implementationCostINR: 20000,
        paybackMonths: 1,
        difficulty: "Low",
        whyRecommended: "Raise cooling setpoint from 7°C to 11°C for compatible molds, reducing compressor work load.",
        technicalMatrix: [
            { requirement: "Mold Cooling Cycle Time", required: "< 18 sec", candidate: "17.2 sec verified", status: "PASS" }
        ],
        environmentalImpact: { co2ReductionTCO2e: 18, energySavingsKwh: 22000, wasteReductionTonnes: 0, rawMaterialSavingsTonnes: 0 },
        rolloutSteps: [{ step: 1, title: "Adjust Setpoint", description: "Re-program central chiller controller." }],
        calculations: { formula: "CO2 Reduction = 3.5% energy saved per 1°C lift in chiller setpoint", assumptions: "4°C lift applied", dataSource: "ASHRAE HVAC Guidelines" }
    },
    {
        id: "rec-7",
        title: "Switch Virgin HDPE Feedstock to 20% Post-Consumer Resin (PCR)",
        badge: "CIRCULARITY",
        category: "Material",
        status: "Recommended",
        co2ReductionTCO2e: 38,
        co2BaselineTCO2e: 160,
        co2ProposedTCO2e: 122,
        feasibilityScore: 88,
        annualSavingsINR: 280000,
        implementationCostINR: 210000,
        paybackMonths: 9,
        difficulty: "Medium",
        whyRecommended: "Blend 20% PCR HDPE into non-food packaging product lines.",
        technicalMatrix: [{ requirement: "ESCR Stress Crack", required: "Passed", candidate: "Passed ISO 16770", status: "PASS" }],
        environmentalImpact: { co2ReductionTCO2e: 38, energySavingsKwh: 18000, wasteReductionTonnes: 30, rawMaterialSavingsTonnes: 110 },
        rolloutSteps: [{ step: 1, title: "Material Trial", description: "Blend 20% PCR HDPE." }],
        calculations: { formula: "CO2 Reduction = Tonnes PCR × (1.8 - 0.5)", assumptions: "110 Tonnes PCR", dataSource: "Plastics Europe" }
    },
    {
        id: "rec-8",
        title: "Heat Recovery Unit Integration on Exhaust Air Lines",
        badge: "HEAT RECOVERY",
        category: "Energy",
        status: "Recommended",
        co2ReductionTCO2e: 24,
        co2BaselineTCO2e: 92,
        co2ProposedTCO2e: 68,
        feasibilityScore: 85,
        annualSavingsINR: 220000,
        implementationCostINR: 330000,
        paybackMonths: 18,
        difficulty: "High",
        whyRecommended: "Capture waste heat from hot barrel exhaust to pre-heat plastic granules prior to molding.",
        technicalMatrix: [{ requirement: "Exhaust Temp", required: "> 140°C", candidate: "165°C", status: "PASS" }],
        environmentalImpact: { co2ReductionTCO2e: 24, energySavingsKwh: 29000, wasteReductionTonnes: 0, rawMaterialSavingsTonnes: 0 },
        rolloutSteps: [{ step: 1, title: "Ducting Install", description: "Install heat exchanger loops." }],
        calculations: { formula: "CO2 Reduction = Heat Recovered (GJ) × Diesel Conversion", assumptions: "320 GJ heat recovered", dataSource: "BEE India Guidelines" }
    },
    {
        id: "rec-9",
        title: "Standardize High-Efficiency Purging Compound",
        badge: "PROCESS OPT",
        category: "Process",
        status: "Recommended",
        co2ReductionTCO2e: 15,
        co2BaselineTCO2e: 45,
        co2ProposedTCO2e: 30,
        feasibilityScore: 95,
        annualSavingsINR: 140000,
        implementationCostINR: 35000,
        paybackMonths: 3,
        difficulty: "Low",
        whyRecommended: "Reduces purging resin consumption and color changeover duration from 45 min to 15 min.",
        technicalMatrix: [{ requirement: "Thermal Stability", required: "300°C", candidate: "320°C", status: "PASS" }],
        environmentalImpact: { co2ReductionTCO2e: 15, energySavingsKwh: 8000, wasteReductionTonnes: 12, rawMaterialSavingsTonnes: 10 },
        rolloutSteps: [{ step: 1, title: "SOP Deployment", description: "Distribute commercial purging agent." }],
        calculations: { formula: "CO2 Reduction = Scrap Avoided × Material Factor", assumptions: "12 Tonnes scrap reduced", dataSource: "Internal Trial Data" }
    },
    {
        id: "rec-10",
        title: "Transition Auxiliary Heaters to Ceramic Insulation Jackets",
        badge: "THERMAL EFFICIENCY",
        category: "Machine",
        status: "Recommended",
        co2ReductionTCO2e: 12,
        co2BaselineTCO2e: 38,
        co2ProposedTCO2e: 26,
        feasibilityScore: 97,
        annualSavingsINR: 110000,
        implementationCostINR: 55000,
        paybackMonths: 6,
        difficulty: "Low",
        whyRecommended: "Fitted ceramic thermal blankets over extruder barrels prevent heat loss to ambient air.",
        technicalMatrix: [{ requirement: "Thermal Insulation R-Value", required: "≥ 2.5", candidate: "3.2", status: "PASS" }],
        environmentalImpact: { co2ReductionTCO2e: 12, energySavingsKwh: 14600, wasteReductionTonnes: 0, rawMaterialSavingsTonnes: 0 },
        rolloutSteps: [{ step: 1, title: "Wrap Installation", description: "Fit custom ceramic jackets on 8 extruder lines." }],
        calculations: { formula: "CO2 Reduction = kW loss reduced × Hours × Grid Factor", assumptions: "1.8 kW loss reduction per barrel", dataSource: "Thermal Imaging Survey" }
    }
];

export const rejectedOptions = [
    {
        id: "rej-1",
        title: "Switch to 100% Bio-based PLA Feedstock",
        category: "Material",
        status: "REJECTED",
        failedRequirement: "Temperature Resistance",
        required: "≥ 120°C Continuous Service",
        candidate: "110°C Distortion Temp",
        reason: "Technical requirement not satisfied. PLA deforms under high-pressure molding environment.",
        co2PotentialIfFeasible: "110 tCO2e/yr"
    },
    {
        id: "rej-2",
        title: "Direct Electrification of Heavy Thermal Purge Chamber",
        category: "Energy",
        status: "REJECTED",
        failedRequirement: "Grid Substation Electrical Capacity",
        required: "≥ 1.2 MW Grid Link",
        candidate: "0.4 MW Existing Link",
        reason: "Electrical capacity limitation. Transformer upgrade cost makes payback > 12 years.",
        co2PotentialIfFeasible: "64 tCO2e/yr"
    }
];

export const energyData = {
    totalEnergyGj: 24500,
    renewablePercent: 18,
    electricityEmissionsTCO2e: 420,
    fuelEmissionsTCO2e: 92,
    energyIntensityKwhPerKg: 0.54,
    energyMix: [
        { name: "Grid Electricity", share: 64, kwhEquivalent: 1280000, color: "#4f46e5" },
        { name: "Rooftop Solar PV", share: 18, kwhEquivalent: 360000, color: "#10b981" },
        { name: "Diesel Fuel", share: 14, kwhEquivalent: 280000, color: "#d97706" },
        { name: "Natural Gas", share: 4, kwhEquivalent: 80000, color: "#0284c7" }
    ],
    consumptionByMachine: [
        { machine: "Injection Press #1-#4", kWh: 185000, emissions: 151 },
        { machine: "Injection Press #5-#8", kWh: 165000, emissions: 135 },
        { machine: "Extrusion Line #1", kWh: 110000, emissions: 90 },
        { machine: "Extrusion Line #2", kWh: 130000, emissions: 106 },
        { machine: "Central Chiller Units", kWh: 140000, emissions: 115 },
        { machine: "Air Compressors & Pumps", kWh: 95000, emissions: 78 }
    ],
    recommendations: [
        "Renewable electricity PPA expansion",
        "Solar PV rooftop capacity expansion (+250 kWp)",
        "Hydraulic pump VFD retrofits",
        "Idle-time auto shutdown protocol",
        "Chiller set-point thermal optimization"
    ]
};

export const wasteData = {
    totalWasteGeneratedTonnes: 184,
    wasteDivertedTonnes: 118,
    diversionRatePercent: 64,
    disposalCostINR: 420000,
    materialFlow: [
        { name: "Raw Polymer Input", value: 3050, type: "Input" },
        { name: "Good Finished Products", value: 2866, type: "Output" },
        { name: "Total Process Scrap", value: 184, type: "Scrap" },
        { name: "In-House Granulated & Reused", value: 72, type: "Circularity" },
        { name: "External Recycling Vendor", value: 46, type: "Circularity" },
        { name: "Landfill / Hazardous Disposal", value: 66, type: "Disposal" }
    ],
    wasteStreamBreakdown: [
        { type: "PP Purge Blocks & Runners", generated: 82, reused: 48, recycled: 20, disposed: 14, co2Impact: 38, costINR: 120000 },
        { type: "HDPE Trim Scrap", generated: 46, reused: 24, recycled: 16, disposed: 6, co2Impact: 19, costINR: 75000 },
        { type: "Single-Use Film Packaging", generated: 34, reused: 0, recycled: 10, disposed: 24, co2Impact: 28, costINR: 145000 },
        { type: "Used Hydraulic Oil & Filters", generated: 22, reused: 0, recycled: 0, disposed: 22, co2Impact: 14, costINR: 80000 }
    ],
    recommendations: [
        "Reuse internal plastic scrap via in-house granulator",
        "Improve waste stream segregation at source",
        "Increase secondary recycling buyer contracts",
        "Recover financial material value from clean purge scrap"
    ]
};

export const initialRoadmapActions = [
    {
        id: "act-1",
        recId: "rec-3",
        targetQuarter: "Q1 2026",
        phase: "0-3 MONTHS",
        phaseTitle: "Quick Wins",
        title: "Machine Idle-Time Auto-Shutdown Protocol",
        co2ReductionTCO2e: 36,
        investmentINR: 50000,
        annualSavingsINR: 320000,
        paybackMonths: 2,
        difficulty: "Low",
        status: "Completed",
        category: "Process"
    },
    {
        id: "act-2",
        recId: "rec-6",
        targetQuarter: "Q1 2026",
        phase: "0-3 MONTHS",
        phaseTitle: "Quick Wins",
        title: "Chiller Set-Point & Condenser Cleaning",
        co2ReductionTCO2e: 18,
        investmentINR: 20000,
        annualSavingsINR: 190000,
        paybackMonths: 1,
        difficulty: "Low",
        status: "In Progress",
        category: "Machine"
    },
    {
        id: "act-3",
        recId: "rec-9",
        targetQuarter: "Q1 2026",
        phase: "0-3 MONTHS",
        phaseTitle: "Quick Wins",
        title: "Standardize High-Efficiency Purging Compound",
        co2ReductionTCO2e: 15,
        investmentINR: 35000,
        annualSavingsINR: 140000,
        paybackMonths: 3,
        difficulty: "Low",
        status: "Planned",
        category: "Process"
    },
    {
        id: "act-4",
        recId: "rec-1",
        targetQuarter: "Q2 2026",
        phase: "3-12 MONTHS",
        phaseTitle: "Transformation",
        title: "Replace 30% Virgin PP With Recycled PP",
        co2ReductionTCO2e: 84,
        investmentINR: 410000,
        annualSavingsINR: 620000,
        paybackMonths: 8,
        difficulty: "Low",
        status: "Planned",
        category: "Material"
    },
    {
        id: "act-5",
        recId: "rec-2",
        targetQuarter: "Q2 2026",
        phase: "3-12 MONTHS",
        phaseTitle: "Transformation",
        title: "VFD Retrofit on Hydraulic Pumps",
        co2ReductionTCO2e: 58,
        investmentINR: 400000,
        annualSavingsINR: 480000,
        paybackMonths: 10,
        difficulty: "Low",
        status: "Planned",
        category: "Energy"
    },
    {
        id: "act-6",
        recId: "rec-4",
        targetQuarter: "Q3 2026",
        phase: "3-12 MONTHS",
        phaseTitle: "Transformation",
        title: "On-Site Closed-Loop Scrap Re-Granulation",
        co2ReductionTCO2e: 42,
        investmentINR: 410000,
        annualSavingsINR: 350000,
        paybackMonths: 14,
        difficulty: "Medium",
        status: "Planned",
        category: "Waste"
    },
    {
        id: "act-7",
        recId: "rec-5",
        targetQuarter: "Q4 2026",
        phase: "1-3 YEARS",
        phaseTitle: "Structural Change",
        title: "Rooftop Solar PV Expansion (+250 kWp)",
        co2ReductionTCO2e: 52,
        investmentINR: 1020000,
        annualSavingsINR: 560000,
        paybackMonths: 22,
        difficulty: "Medium",
        status: "Planned",
        category: "Energy"
    },
    {
        id: "act-8",
        recId: "rec-7",
        targetQuarter: "Q4 2026",
        phase: "1-3 YEARS",
        phaseTitle: "Structural Change",
        title: "20% PCR HDPE Feedstock Blend Transition",
        co2ReductionTCO2e: 38,
        investmentINR: 210000,
        annualSavingsINR: 280000,
        paybackMonths: 9,
        difficulty: "Medium",
        status: "Planned",
        category: "Material"
    }
];

export const emissionFactors = [
    { sourceName: "Grid Electricity (MSEB India)", value: 0.82, unit: "kg CO2e / kWh", region: "India (Maharashtra)", year: 2024, sourceRef: "CEA Carbon Baseline Database v19" },
    { sourceName: "Diesel Fuel Combustion", value: 2.68, unit: "kg CO2e / Liter", region: "India", year: 2024, sourceRef: "IPCC 2006 Guidelines" },
    { sourceName: "Virgin PP Resin (Cradle-to-gate)", value: 1.95, unit: "kg CO2e / kg", region: "Asia Pacific", year: 2024, sourceRef: "Ecoinvent v3.9" },
    { sourceName: "Recycled PP PCR Resin", value: 0.45, unit: "kg CO2e / kg", region: "India", year: 2024, sourceRef: "Subsidized Recycler EPD" },
    { sourceName: "Virgin ABS Polymer", value: 3.10, unit: "kg CO2e / kg", region: "Global", year: 2024, sourceRef: "PlasticsEurope Eco-profile" },
    { sourceName: "Landfill Plastic Disposal", value: 1.18, unit: "kg CO2e / kg", region: "India Municipal", year: 2024, sourceRef: "CPCB Waste Factors" }
];
