// Master Dataset for 15 Industrial Inputs & Sector Use Cases
// Divided into 3 Fixed Workflow Material Groups (5 + 5 + 5 = 15)

export const MATERIAL_GROUPS = {
    material1: [
        "coking-coal",
        "limestone-clinker",
        "thermal-coal",
        "iron-ore",
        "petcoke"
    ],
    material2: [
        "natural-gas",
        "ammonia-grey",
        "naphtha-crude",
        "primary-aluminium",
        "virgin-plastics"
    ],
    material3: [
        "caustic-soda",
        "soda-ash",
        "methanol",
        "synthetic-dyes",
        "refractories-gases"
    ]
};

export const MASTER_INDUSTRIAL_INPUTS = [
    // -------------------------------------------------------------------------
    // GROUP 1 (Material-1): Metallurgy & Heavy Feedstocks (5 Items)
    // -------------------------------------------------------------------------
    {
        id: "coking-coal",
        name: "Coking coal / metallurgical coal",
        groupId: "material1",
        co2Share: "18–22%",
        basis: "Major process fuel/reductant",
        sectors: [
            { id: "bf-bof", label: "Integrated steelmaking (BF-BOF)" },
            { id: "foundries", label: "Foundries & cast iron" },
            { id: "ferroalloys", label: "Ferroalloys (FeMn, FeCr, SiMn)" },
            { id: "lead-zinc", label: "Lead & zinc smelting" },
            { id: "lime-magnesium", label: "Lime & magnesium production" }
        ],
        searchKeywords: ["coking", "metallurgical", "coal", "steel", "bf-bof", "dri", "reductant", "iron", "smelting"],
        defaultUnit: "tonnes",
        units: ["tonnes", "kg", "thousand tonnes"]
    },
    {
        id: "limestone-clinker",
        name: "Limestone (as clinker)",
        groupId: "material1",
        co2Share: "12–15%",
        basis: "Process + calcination emissions",
        sectors: [
            { id: "cement", label: "Cement / clinker production" },
            { id: "lime", label: "Lime Manufacturing & Quicklime Kilns" }
        ],
        searchKeywords: ["limestone", "clinker", "cement", "lime", "calcination", "calcium carbonate", "kiln"],
        defaultUnit: "tonnes",
        units: ["tonnes", "kg", "thousand tonnes"]
    },
    {
        id: "thermal-coal",
        name: "Non-coking coal / thermal coal (industrial)",
        groupId: "material1",
        co2Share: "10–13%",
        basis: "Industrial combustion",
        sectors: [
            { id: "boilers", label: "Industrial power & steam" },
            { id: "cement-kilns", label: "Cement kiln fuel" },
            { id: "dri-thermal", label: "Coal-based DRI" }
        ],
        searchKeywords: ["thermal coal", "non-coking", "coal", "boiler", "cement", "brick", "ceramics", "combustion"],
        defaultUnit: "tonnes",
        units: ["tonnes", "kg", "thousand tonnes"]
    },
    {
        id: "iron-ore",
        name: "Iron ore / pig iron / hot metal",
        groupId: "material1",
        co2Share: "8–11%",
        basis: "Upstream/process-intensive input",
        sectors: [
            { id: "steel-milling", label: "Integrated steelmaking" },
            { id: "foundries", label: "Foundries / cast iron" },
            { id: "merchant-iron", label: "Merchant pig iron / hot metal" },
            { id: "blast-furnace", label: "Blast furnace ironmaking" },
            { id: "dri-production", label: "DRI production" },
            { id: "pelletizing", label: "Pelletizing" }
        ],
        searchKeywords: ["iron ore", "pig iron", "hot metal", "steel", "foundry", "pellets", "sinter", "blast furnace"],
        defaultUnit: "tonnes",
        units: ["tonnes", "kg", "thousand tonnes"]
    },
    {
        id: "petcoke",
        name: "Petcoke",
        groupId: "material1",
        co2Share: "4–6%",
        basis: "High-carbon fuel",
        sectors: [
            { id: "cement-petcoke", label: "Cement & lime kilns" },
            { id: "aluminium-smelting", label: "Aluminium smelting" },
            { id: "steelmaking", label: "Steelmaking" },
            { id: "boilers-petcoke", label: "Power & industrial boilers" }
        ],
        searchKeywords: ["petcoke", "petroleum coke", "cement", "refinery", "boiler", "high carbon"],
        defaultUnit: "tonnes",
        units: ["tonnes", "kg"]
    },

    // -------------------------------------------------------------------------
    // GROUP 2 (Material-2): Energy, Metals & Primary Polymers (5 Items)
    // -------------------------------------------------------------------------
    {
        id: "natural-gas",
        name: "Natural gas / LNG (as feedstock & fuel)",
        groupId: "material2",
        co2Share: "5–7%",
        basis: "Fuel + feedstock",
        sectors: [
            { id: "h2-production", label: "Hydrogen production" },
            { id: "ammonia", label: "Ammonia production" },
            { id: "methanol", label: "Methanol production" },
            { id: "process-heat", label: "Industrial process heat" },
            { id: "cement", label: "Cement production" },
            { id: "glass", label: "Glass manufacturing" },
            { id: "steel", label: "Steel production" }
        ],
        searchKeywords: ["natural gas", "lng", "methane", "fertilizers", "ammonia", "glass", "ceramics", "petrochemicals", "refineries", "boilers", "process heat"],
        defaultUnit: "Nm³",
        units: ["Nm³", "million Nm³", "MMBtu", "GJ", "tonnes"]
    },
    {
        id: "ammonia-grey",
        name: "Ammonia (grey, from SMR)",
        groupId: "material2",
        co2Share: "3–5%",
        basis: "Hydrogen/feedstock emissions",
        sectors: [
            { id: "fertilizers", label: "Fertilizers & Urea" },
            { id: "chemicals-ammonia", label: "Industrial chemicals" },
            { id: "explosives", label: "Nitrate explosives" }
        ],
        searchKeywords: ["ammonia", "smr", "grey ammonia", "fertilizers", "urea", "nitrates", "chemical"],
        defaultUnit: "tonnes",
        units: ["tonnes", "kg"]
    },
    {
        id: "naphtha-crude",
        name: "Naphtha / crude derivatives (as chemical feedstock)",
        groupId: "material2",
        co2Share: "3–5%",
        basis: "Feedstock",
        sectors: [
            { id: "steam-cracking", label: "Steam Cracking (Ethylene/Propylene)" },
            { id: "catalytic-reforming", label: "Catalytic Reforming (Aromatics/BTX)" },
            { id: "propylene", label: "On-purpose Propylene / FCC–Steam Cracker" },
            { id: "butadiene", label: "Butadiene (C4 Fraction from Cracking)" },
            { id: "refinery-naphtha", label: "Refinery Naphtha (Gasoline Blending)" }
        ],
        searchKeywords: ["naphtha", "crude", "petrochemicals", "cracker", "ethylene", "propylene", "plastics", "synthetic fibers"],
        defaultUnit: "tonnes",
        units: ["tonnes", "barrels", "liters"]
    },
    {
        id: "primary-aluminium",
        name: "Primary aluminium (ingots/billets)",
        groupId: "material2",
        co2Share: "2–3%",
        basis: "Energy-intensive primary material",
        sectors: [
            { id: "anode-baking", label: "Anode Baking Furnace" },
            { id: "casthouse", label: "Casthouse / Melting & Holding Furnace" },
            { id: "alumina-calcination", label: "Alumina Calcination (Refinery)" },
            { id: "inert-anode", label: "Inert Anode Smelting (Process Alternative)" },
            { id: "aluminium-prod", label: "Aluminium production" },
            { id: "refractories", label: "Refractory products" },
            { id: "abrasives", label: "Abrasive manufacturing" }
        ],
        searchKeywords: ["aluminium", "aluminum", "ingot", "billet", "extrusion", "casting", "smelting", "conductor"],
        defaultUnit: "tonnes",
        units: ["tonnes", "kg"]
    },
    {
        id: "virgin-plastics",
        name: "Virgin plastic resins (PET, PP, PVC, PE)",
        groupId: "material2",
        co2Share: "1–2%",
        basis: "Polymer/feedstock",
        sectors: [
            { id: "steam-cracking", label: "Steam Cracking (Ethylene/Propylene)" },
            { id: "pdh", label: "Ethane/Propane Dehydrogenation (PDH)" },
            { id: "meg-pet", label: "Ethylene Oxidation (Ethylene → MEG for PET)" },
            { id: "pta-pet", label: "Paraxylene Production (PTA for PET)" },
            { id: "vcm-pvc", label: "Vinyl Chloride Monomer (VCM for PVC)" },
            { id: "reactors", label: "Polymerization Reactors (PE, PP, PET, PVC)" },
            { id: "feedstock-ethane", label: "Feedstock: Ethane/Propane (PE, PP)" },
            { id: "feedstock-naphtha", label: "Feedstock: Naphtha (PET, PVC, PE, PP)" },
            { id: "process-heat", label: "Process Heat & Steam (All Resins)" }
        ],
        searchKeywords: ["virgin plastic", "resin", "pp", "pet", "pvc", "pe", "hdpe", "ldpe", "polymers", "packaging", "textiles", "consumer goods", "injection molding"],
        defaultUnit: "tonnes",
        units: ["tonnes", "kg"]
    },

    // -------------------------------------------------------------------------
    // GROUP 3 (Material-3): Specialty Chemicals & Industrial Gases (5 Items)
    // -------------------------------------------------------------------------
    {
        id: "caustic-soda",
        name: "Caustic soda / chlorine",
        groupId: "material3",
        co2Share: "1–2%",
        basis: "Chlor-alkali products",
        sectors: [
            { id: "chlor-alkali", label: "Chlor-alkali electrolysis / caustic soda feed" },
            { id: "textiles-caustic", label: "Textiles" },
            { id: "chemicals-caustic", label: "Chemicals" },
            { id: "pulp-paper", label: "Pulp & paper" }
        ],
        searchKeywords: ["caustic soda", "chlorine", "sodium hydroxide", "chlor-alkali", "textiles", "pulp", "paper", "water treatment"],
        defaultUnit: "tonnes",
        units: ["tonnes", "kg"]
    },
    {
        id: "soda-ash",
        name: "Soda ash",
        groupId: "material3",
        co2Share: "0.5–1%",
        basis: "Industrial chemical",
        sectors: [
            { id: "glass-soda", label: "Glass" },
            { id: "chemicals-soda", label: "Chemicals" },
            { id: "detergents", label: "Detergents" }
        ],
        searchKeywords: ["soda ash", "sodium carbonate", "glass", "detergents", "chemicals"],
        defaultUnit: "tonnes",
        units: ["tonnes", "kg"]
    },
    {
        id: "methanol",
        name: "Methanol",
        groupId: "material3",
        co2Share: "0.3–0.7%",
        basis: "Chemical/feedstock",
        sectors: [
            { id: "e-methanol", label: "E-Methanol & Biomethanol production" },
            { id: "solvents", label: "Chemical Solvents" },
            { id: "biodiesel", label: "Biodiesel Synthesis" },
            { id: "industrial-fuels", label: "Industrial fuels" }
        ],
        searchKeywords: ["methanol", "methyl alcohol", "solvents", "biodiesel", "formalin", "chemicals"],
        defaultUnit: "tonnes",
        units: ["tonnes", "liters", "kg"]
    },
    {
        id: "synthetic-dyes",
        name: "Synthetic dyes & auxiliaries",
        groupId: "material3",
        co2Share: "0.3–0.7%",
        basis: "Process chemicals",
        sectors: [
            { id: "textiles-dyes", label: "Textiles" },
            { id: "leather", label: "Leather" },
            { id: "paper-coloring", label: "Paper coloring" }
        ],
        searchKeywords: ["synthetic dyes", "auxiliaries", "textiles", "leather", "pigments", "dyeing"],
        defaultUnit: "tonnes",
        units: ["tonnes", "kg"]
    },
    {
        id: "refractories-gases",
        name: "Refractories & industrial gases (O2, N2, H2)",
        groupId: "material3",
        co2Share: "0.5–1.5%",
        basis: "Supporting industrial inputs",
        sectors: [
            { id: "steel-refractories", label: "Steel refractories" },
            { id: "glass-refractories", label: "Glass refractories" },
            { id: "chemicals-gases", label: "Chemicals & industrial gases" },
            { id: "metal-processing", label: "Metal processing" }
        ],
        searchKeywords: ["refractories", "industrial gases", "oxygen", "nitrogen", "hydrogen", "argon", "steel", "glass", "metal processing"],
        defaultUnit: "tonnes",
        units: ["tonnes", "Nm³", "cylinders"]
    }
];

// Helper: Get ONLY the 5 materials assigned to a specific group ("material1", "material2", "material3")
export const getMaterialsForGroup = (groupId) => {
    const ids = MATERIAL_GROUPS[groupId] || [];
    return MASTER_INDUSTRIAL_INPUTS.filter(m => ids.includes(m.id));
};

// Helper: Search ONLY within the 5 materials of a specific group
export const searchMaterialsInGroup = (groupId, query) => {
    const groupMaterials = getMaterialsForGroup(groupId);

    if (!query || typeof query !== 'string' || !query.trim()) {
        return groupMaterials.map(item => ({ item, matchReason: null }));
    }

    const q = query.toLowerCase().trim();
    const results = [];

    groupMaterials.forEach(item => {
        const nameLower = item.name.toLowerCase();
        const keywords = item.searchKeywords.map(k => k.toLowerCase());
        const sectorLabels = item.sectors.map(s => s.label.toLowerCase());

        let matchReason = null;

        if (nameLower.includes(q)) {
            matchReason = `Matched via name: "${item.name}"`;
        } else if (keywords.some(k => k.includes(q))) {
            const matchedKw = keywords.find(k => k.includes(q));
            matchReason = `Matched via keyword: "${matchedKw}"`;
        } else if (sectorLabels.some(s => s.includes(q))) {
            const matchedSector = item.sectors.find(s => s.label.toLowerCase().includes(q));
            matchReason = `Matched via sector: "${matchedSector.label}"`;
        }

        if (matchReason) {
            results.push({ item, matchReason });
        }
    });

    return results;
};

// Backwards-compatibility search utility across all master inputs
export const searchIndustrialInputs = (query) => {
    if (!query || typeof query !== 'string' || !query.trim()) {
        return MASTER_INDUSTRIAL_INPUTS.map(item => ({ item, matchReason: null }));
    }

    const q = query.toLowerCase().trim();
    const results = [];

    MASTER_INDUSTRIAL_INPUTS.forEach(item => {
        const nameLower = item.name.toLowerCase();
        const keywords = item.searchKeywords.map(k => k.toLowerCase());
        const sectorLabels = item.sectors.map(s => s.label.toLowerCase());

        let matchReason = null;

        if (nameLower.includes(q)) {
            matchReason = `Matched via name: "${item.name}"`;
        } else if (keywords.some(k => k.includes(q))) {
            const matchedKw = keywords.find(k => k.includes(q));
            matchReason = `Matched via keyword: "${matchedKw}"`;
        } else if (sectorLabels.some(s => s.includes(q))) {
            const matchedSector = item.sectors.find(s => s.label.toLowerCase().includes(q));
            matchReason = `Matched via sector: "${matchedSector.label}"`;
        }

        if (matchReason) {
            results.push({ item, matchReason });
        }
    });

    return results;
};
