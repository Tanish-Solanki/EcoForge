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
            { id: "iron-steel", label: "Iron & steel" },
            { id: "bf-bof", label: "BF-BOF" },
            { id: "dri", label: "DRI" }
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
            { id: "cement", label: "Cement" },
            { id: "lime", label: "Lime manufacturing" }
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
            { id: "cement-kilns", label: "Cement kilns" },
            { id: "boilers", label: "Industrial boilers" },
            { id: "dri-thermal", label: "DRI thermal" },
            { id: "bricks", label: "Bricks" },
            { id: "ceramics", label: "Ceramics" }
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
            { id: "steel-milling", label: "Steel" },
            { id: "foundries", label: "Foundries" }
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
            { id: "cement-petcoke", label: "Cement kilns" },
            { id: "refineries", label: "Refineries" },
            { id: "boilers-petcoke", label: "Industrial boilers" }
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
            { id: "fertilizers-ammonia", label: "Fertilizers (ammonia)" },
            { id: "refineries-ng", label: "Refineries" },
            { id: "petrochemicals-ng", label: "Petrochemicals" },
            { id: "glass", label: "Glass" },
            { id: "ceramics-ng", label: "Ceramics" },
            { id: "boilers-ng", label: "Boilers" },
            { id: "process-heat", label: "Process heat" }
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
            { id: "fertilizers", label: "Fertilizers" },
            { id: "chemicals-ammonia", label: "Industrial chemicals" },
            { id: "explosives", label: "Explosives" }
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
            { id: "petrochemicals", label: "Petrochemicals" },
            { id: "plastics-naphtha", label: "Plastics" },
            { id: "synthetic-fibers", label: "Synthetic fibers" }
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
            { id: "castings", label: "Castings" },
            { id: "extrusions", label: "Extrusions" },
            { id: "conductors", label: "Conductors" },
            { id: "automotive-parts", label: "Automotive parts" }
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
            { id: "packaging", label: "Packaging" },
            { id: "textiles-plastics", label: "Textiles" },
            { id: "consumer-goods", label: "Consumer goods" },
            { id: "automotive-polymers", label: "Automotive polymers" },
            { id: "injection-molding", label: "Injection molding" }
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
            { id: "textiles-caustic", label: "Textiles" },
            { id: "chemicals-caustic", label: "Chemicals" },
            { id: "pulp-paper", label: "Pulp & paper" },
            { id: "water-treatment", label: "Water treatment" }
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
            { id: "chemicals-methanol", label: "Chemicals" },
            { id: "solvents", label: "Solvents" },
            { id: "biodiesel", label: "Biodiesel" },
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
            { id: "steel-refractories", label: "Steel" },
            { id: "glass-refractories", label: "Glass" },
            { id: "chemicals-gases", label: "Chemicals" },
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
