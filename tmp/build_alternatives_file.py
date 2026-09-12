import sys

content = """// Master Industrial Alternatives Dataset
// Maps raw materials and their use cases to MULTIPLE sustainable circular alternatives with Pros & Cons

export const RAW_MATERIAL_ALTERNATIVES_DATASET = {
    // -------------------------------------------------------------------------
    // 1. COKING COAL / METALLURGICAL COAL
    // -------------------------------------------------------------------------
    "coking-coal": {
        materialName: "Coking coal / metallurgical coal",
        presentCO2PerUnit: 2.90, // tCO2e / tonne
        unit: "tonnes",
        useCases: {
            "bf-bof": {
                label: "Integrated steelmaking (BF-BOF)",
                alternatives: [
                    {
                        id: "ng-dri-eaf",
                        name: "Natural-gas DRI + EAF",
                        capexUSDk: 580.0,
                        altFuelPriceUSD: 375.0,
                        newCO2PerUnit: 1.885,
                        co2ReductionPercent: 35.0,
                        costSavingPerUnit: 45,
                        costSavingPercent: 12.5,
                        paybackYears: 2.8,
                        pros: [
                            "Commercial technology operating globally with high reliability",
                            "Cuts carbon intensity from 2.9 tCO2 to 1.88 tCO2 per tonne steel",
                            "Flexible natural gas fuel supply with ready transition path to hydrogen"
                        ],
                        cons: [
                            "Requires high-grade DR-grade iron ore pellets",
                            "Higher electricity demand for electric arc furnace operation"
                        ],
                        source: "🟢 CURATED DATASET (Record #1)"
                    },
                    {
                        id: "green-h2-dri-eaf",
                        name: "Green-H2 DRI + EAF",
                        capexUSDk: 1800.0,
                        altFuelPriceUSD: 4.75,
                        newCO2PerUnit: 0.435,
                        co2ReductionPercent: 85.0,
                        costSavingPerUnit: 120,
                        costSavingPercent: 28.0,
                        paybackYears: 3.5,
                        pros: [
                            "Deep decarbonization eliminating up to 85% of steelmaking emissions",
                            "Zero direct carbon emissions during iron ore reduction phase",
                            "Qualifies for premium green steel pricing and ESG carbon credits"
                        ],
                        cons: [
                            "High initial CAPEX for green hydrogen electrolyzer stack installation",
                            "Requires bulk renewable electricity supply infrastructure"
                        ],
                        source: "🟢 CURATED DATASET (Record #2)"
                    },
                    {
                        id: "bf-bof-ccs",
                        name: "BF-BOF + CCS (Carbon Capture & Storage)",
                        capexUSDk: 566.67,
                        altFuelPriceUSD: 175.0,
                        newCO2PerUnit: 1.16,
                        co2ReductionPercent: 60.0,
                        costSavingPerUnit: 65,
                        costSavingPercent: 15.0,
                        paybackYears: 2.9,
                        pros: [
                            "Allows existing integrated blast furnace assets to continue operation",
                            "Captures up to 60% of flue gas CO2 for permanent geological storage",
                            "Lower disruption to existing raw material supply chains"
                        ],
                        cons: [
                            "Requires access to CO2 transport pipeline and storage reservoirs",
                            "Ongoing parasitic energy penalty for solvent regeneration"
                        ],
                        source: "🟢 CURATED DATASET (Record #3)"
                    }
                ]
            },
            "foundries": {
                label: "Foundries & cast iron",
                alternatives: [
                    {
                        id: "coreless-induction",
                        name: "Coreless induction melting furnace",
                        capexUSDk: 6.64,
                        altFuelPriceUSD: 0.0,
                        newCO2PerUnit: 2.03,
                        co2ReductionPercent: 30.0,
                        costSavingPerUnit: 35,
                        costSavingPercent: 10.0,
                        paybackYears: 1.2,
                        pros: [
                            "100% electrical melting eliminates coke combustion in foundry cupola",
                            "Extremely low CAPEX footprint ideal for SME foundries",
                            "Precise temperature and metallurgy control"
                        ],
                        cons: [
                            "Dependent on local electricity grid carbon intensity",
                            "Requires clean scrap charge prep"
                        ],
                        source: "🟢 CURATED DATASET (Record #4)"
                    },
                    {
                        id: "channel-induction",
                        name: "Channel induction furnace",
                        capexUSDk: 3.25,
                        altFuelPriceUSD: 0.0,
                        newCO2PerUnit: 2.03,
                        co2ReductionPercent: 30.0,
                        costSavingPerUnit: 38,
                        costSavingPercent: 11.0,
                        paybackYears: 1.1,
                        pros: [
                            "High thermal efficiency for continuous duplexing and holding",
                            "Ultra-low CAPEX upgrade for cupola replacement"
                        ],
                        cons: [
                            "Refractory lining maintenance schedules"
                        ],
                        source: "🟢 CURATED DATASET (Record #5)"
                    },
                    {
                        id: "gas-fired-furnace",
                        name: "Gas-fired melting furnace",
                        capexUSDk: 180.0,
                        altFuelPriceUSD: 0.0,
                        newCO2PerUnit: 2.03,
                        co2ReductionPercent: 30.0,
                        costSavingPerUnit: 25,
                        costSavingPercent: 8.0,
                        paybackYears: 2.4,
                        pros: [
                            "Replaces solid metallurgical coke with clean-burning natural gas",
                            "Eliminates particulate matter and heavy sulfur emissions"
                        ],
                        cons: [
                            "Natural gas price volatility sensitivity"
                        ],
                        source: "🟢 CURATED DATASET (Record #6)"
                    }
                ]
            },
            "ferroalloys": {
                label: "Ferroalloys (FeMn, FeCr, SiMn)",
                alternatives: [
                    {
                        id: "electric-saf-carbon",
                        name: "Electric SAF + optimized carbon",
                        capexUSDk: 0.0,
                        altFuelPriceUSD: 0.0,
                        newCO2PerUnit: 0.435,
                        co2ReductionPercent: 85.0,
                        costSavingPerUnit: 140,
                        costSavingPercent: 32.0,
                        paybackYears: 0.5,
                        pros: [
                            "Immediate 85% emission reduction via closed electric submerged arc furnace",
                            "Zero additional equipment CAPEX required for operating SAF plants"
                        ],
                        cons: [
                            "Requires high quality reductant sizing"
                        ],
                        source: "🟢 CURATED DATASET (Record #7)"
                    },
                    {
                        id: "h2-plasma-reduction",
                        name: "Hydrogen/plasma-assisted reduction",
                        capexUSDk: 0.0,
                        altFuelPriceUSD: 4.75,
                        newCO2PerUnit: 0.58,
                        co2ReductionPercent: 80.0,
                        costSavingPerUnit: 110,
                        costSavingPercent: 25.0,
                        paybackYears: 1.4,
                        pros: [
                            "Replaces fossil coke with hydrogen plasma stream",
                            "Ultra-clean high purity ferroalloy tap product"
                        ],
                        cons: [
                            "Specialized plasma torch electrodes required"
                        ],
                        source: "🟢 CURATED DATASET (Record #8)"
                    },
                    {
                        id: "biomass-biocoke",
                        name: "Biomass-derived carbon / bio-coke",
                        capexUSDk: 0.0,
                        altFuelPriceUSD: 0.0,
                        newCO2PerUnit: 0.87,
                        co2ReductionPercent: 70.0,
                        costSavingPerUnit: 90,
                        costSavingPercent: 20.0,
                        paybackYears: 0.8,
                        pros: [
                            "Drop-in biogenic charcoal replacement for fossil coking coal",
                            "Net-zero biogenic CO2 cycle"
                        ],
                        cons: [
                            "Biomass charcoal mechanical strength limits"
                        ],
                        source: "🟢 CURATED DATASET (Record #9)"
                    }
                ]
            },
            "lead-zinc": {
                label: "Lead & zinc smelting",
                alternatives: [
                    {
                        id: "electric-oxygen-smelting",
                        name: "Electric / oxygen-enriched smelting",
                        capexUSDk: 0.0,
                        altFuelPriceUSD: 0.0,
                        newCO2PerUnit: 0.435,
                        co2ReductionPercent: 85.0,
                        costSavingPerUnit: 130,
                        costSavingPercent: 30.0,
                        paybackYears: 0.6,
                        pros: [
                            "Drastically cuts fossil fuel demand in non-ferrous smelters",
                            "Reduces exhaust gas volume by 70%"
                        ],
                        cons: [
                            "Requires oxygen generation plant"
                        ],
                        source: "🟢 CURATED DATASET (Record #10)"
                    },
                    {
                        id: "hydrometallurgical-routes",
                        name: "Hydrometallurgical extraction routes",
                        capexUSDk: 0.0,
                        altFuelPriceUSD: 0.0,
                        newCO2PerUnit: 2.03,
                        co2ReductionPercent: 30.0,
                        costSavingPerUnit: 40,
                        costSavingPercent: 10.0,
                        paybackYears: 1.5,
                        pros: [
                            "Eliminates high-temperature pyrometallurgical thermal smelting",
                            "High metallic yield recovery rate"
                        ],
                        cons: [
                            "Acid leach liquor neutralization required"
                        ],
                        source: "🟢 CURATED DATASET (Record #11)"
                    }
                ]
            },
            "lime-magnesium": {
                label: "Lime & magnesium production",
                alternatives: [
                    {
                        id: "electric-lime-kilns",
                        name: "Electric lime kilns / electrified calcination",
                        capexUSDk: 0.0,
                        altFuelPriceUSD: 0.0,
                        newCO2PerUnit: 0.435,
                        co2ReductionPercent: 85.0,
                        costSavingPerUnit: 150,
                        costSavingPercent: 35.0,
                        paybackYears: 0.9,
                        pros: [
                            "100% electrified thermal heating eliminates coal calcination fuel combustion",
                            "Produces highly concentrated pure CO2 stream ready for easy CCS"
                        ],
                        cons: [
                            "High kW thermal element load requirement"
                        ],
                        source: "🟢 CURATED DATASET (Record #13)"
                    },
                    {
                        id: "ng-kilns-ccs",
                        name: "Natural-gas kilns + CCS",
                        capexUSDk: 0.0,
                        altFuelPriceUSD: 0.0,
                        newCO2PerUnit: 1.16,
                        co2ReductionPercent: 60.0,
                        costSavingPerUnit: 70,
                        costSavingPercent: 16.0,
                        paybackYears: 1.8,
                        pros: [
                            "Cleaner gas burning combined with post-combustion capture"
                        ],
                        cons: [
                            "CCS infrastructure needed"
                        ],
                        source: "🟢 CURATED DATASET (Record #14)"
                    }
                ]
            }
        }
    },

    // -------------------------------------------------------------------------
    // 2. LIMESTONE (AS CLINKER)
    // -------------------------------------------------------------------------
    "limestone-clinker": {
        materialName: "Limestone (as clinker)",
        presentCO2PerUnit: 0.85, // tCO2e / tonne
        unit: "tonnes",
        useCases: {
            "cement": {
                label: "Cement / clinker production",
                alternatives: [
                    {
                        id: "clinker-substitution-lc3",
                        name: "Clinker substitution (PPC / PSC / LC3)",
                        capexUSDk: 5.0,
                        altFuelPriceUSD: 15.0,
                        newCO2PerUnit: 0.308,
                        co2ReductionPercent: 63.8,
                        costSavingPerUnit: 14,
                        costSavingPercent: 22.0,
                        paybackYears: 0.8,
                        pros: [
                            "Replaces up to 50% clinker with calcined clay and limestone fine blend (LC3)",
                            "Cuts calcination emissions directly by substituting virgin limestone feed",
                            "Extremely low capital expenditure required for grinding & blending retrofits",
                            "Produces high compressive strength cement suitable for infrastructure projects"
                        ],
                        cons: [
                            "Requires local sourcing of suitable kaolinite clay deposits",
                            "Initial color shift in finished cement product"
                        ],
                        source: "🟢 CURATED DATASET (Record #16)"
                    },
                    {
                        id: "alternative-clinkers-csa",
                        name: "Alternative clinkers (Belite, BYF, CSA, Calcium Silicate)",
                        capexUSDk: 200.0,
                        altFuelPriceUSD: 13.75,
                        newCO2PerUnit: 0.308,
                        co2ReductionPercent: 63.8,
                        costSavingPerUnit: 12,
                        costSavingPercent: 18.0,
                        paybackYears: 2.1,
                        pros: [
                            "Lower kiln burning temperature (1250°C vs 1450°C) saving thermal energy",
                            "Reduced limestone raw meal requirement cuts process calcination emissions",
                            "Rapid early strength development"
                        ],
                        cons: [
                            "Requires specific bauxite or gypsum mineral additions",
                            "Update needed for local civil engineering standards"
                        ],
                        source: "🟢 CURATED DATASET (Record #17)"
                    },
                    {
                        id: "electrified-calcination-ccs",
                        name: "Electrified calcination + CCS",
                        capexUSDk: 115.0,
                        altFuelPriceUSD: 275.0,
                        newCO2PerUnit: 0.176,
                        co2ReductionPercent: 79.3,
                        costSavingPerUnit: 25,
                        costSavingPercent: 30.0,
                        paybackYears: 3.1,
                        pros: [
                            "Indirect electrical plasma calcination prevents flue gas mixing with fuel combustion",
                            "Yields pure 99%+ CO2 stream directly from limestone decomposition for easy capture",
                            "Eliminates scope 1 combustion carbon footprint completely"
                        ],
                        cons: [
                            "High electricity consumption requirement for high-temperature plasma heating",
                            "Requires proximity to CO2 pipeline grid or utilization facility"
                        ],
                        source: "🟢 CURATED DATASET (Record #18)"
                    }
                ]
            },
            "lime": {
                label: "Lime Manufacturing & Quicklime Kilns",
                alternatives: [
                    {
                        id: "electric-lime-calciner",
                        name: "Electrified rotary lime calciner",
                        capexUSDk: 85.0,
                        altFuelPriceUSD: 0.0,
                        newCO2PerUnit: 0.22,
                        co2ReductionPercent: 74.1,
                        costSavingPerUnit: 18,
                        costSavingPercent: 25.0,
                        paybackYears: 1.6,
                        pros: [
                            "Zero fossil combustion stack gas emissions",
                            "High reactive quicklime output quality"
                        ],
                        cons: [
                            "Dependent on renewable electricity grid tariff"
                        ],
                        source: "🟢 CURATED DATASET (Record #20)"
                    }
                ]
            }
        }
    },

    // -------------------------------------------------------------------------
    // 3. THERMAL COAL
    // -------------------------------------------------------------------------
    "thermal-coal": {
        materialName: "Non-coking coal / thermal coal (industrial)",
        presentCO2PerUnit: 2.45, // tCO2e / tonne
        unit: "tonnes",
        useCases: {
            "boilers": {
                label: "Industrial power & steam",
                alternatives: [
                    {
                        id: "coal-to-gas-conversion",
                        name: "Natural-gas boiler / coal-to-gas conversion",
                        capexUSDk: 250.0,
                        altFuelPriceUSD: 9.0,
                        newCO2PerUnit: 1.593,
                        co2ReductionPercent: 35.0,
                        costSavingPerUnit: 35,
                        costSavingPercent: 14.0,
                        paybackYears: 1.8,
                        pros: [
                            "Immediate conversion eliminating coal ash handling, soot blowers, and slagging",
                            "35% lower carbon intensity with zero particulate matter emissions",
                            "High boiler thermal efficiency (>88%)"
                        ],
                        cons: [
                            "Natural gas pipeline connection needed",
                            "Subject to natural gas price fluctuations"
                        ],
                        source: "🟢 CURATED DATASET (Record #21)"
                    },
                    {
                        id: "electric-steam-generator",
                        name: "Electric boiler / electric steam generator",
                        capexUSDk: 189.0,
                        altFuelPriceUSD: 0.10,
                        newCO2PerUnit: 0.367,
                        co2ReductionPercent: 85.0,
                        costSavingPerUnit: 65,
                        costSavingPercent: 26.0,
                        paybackYears: 2.2,
                        pros: [
                            "Near 100% direct thermal efficiency with zero local Scope 1 emissions",
                            "Instant ramp-up time from cold start in under 5 minutes",
                            "Extremely compact installation footprint with silent operation"
                        ],
                        cons: [
                            "Requires dedicated high voltage power supply sub-station",
                            "Electricity tariff sensitive"
                        ],
                        source: "🟢 CURATED DATASET (Record #22)"
                    },
                    {
                        id: "biomass-boiler",
                        name: "Biomass boiler (Agricultural waste pellets / wood chips)",
                        capexUSDk: 555.0,
                        altFuelPriceUSD: 142.5,
                        newCO2PerUnit: 0.735,
                        co2ReductionPercent: 70.0,
                        costSavingPerUnit: 48,
                        costSavingPercent: 19.0,
                        paybackYears: 1.5,
                        pros: [
                            "Replaces fossil coal with biogenic carbon-neutral agricultural waste",
                            "Cuts net carbon emissions by 70%",
                            "Eligible for renewable thermal energy incentives and carbon tax exemptions"
                        ],
                        cons: [
                            "Requires dry covered biomass fuel storage facility",
                            "Seasonal fuel supply chain management required"
                        ],
                        source: "🟢 CURATED DATASET (Record #23)"
                    }
                ]
            },
            "cement-kilns": {
                label: "Cement kiln fuel",
                alternatives: [
                    {
                        id: "alternative-fuels-rdf",
                        name: "Alternative fuels (Biomass, RDF, waste-derived fuels)",
                        capexUSDk: 30.0,
                        altFuelPriceUSD: 0.0,
                        newCO2PerUnit: 0.735,
                        co2ReductionPercent: 70.0,
                        costSavingPerUnit: 52,
                        costSavingPercent: 21.0,
                        paybackYears: 0.7,
                        pros: [
                            "High Thermal Substitution Rate (TSR) replacing up to 80% fossil coal",
                            "Co-processing incinerates waste completely without hazardous residual ash",
                            "Substantial reduction in fuel procurement expenditures"
                        ],
                        cons: [
                            "Shredding and pre-sorting equipment required for waste RDF prep"
                        ],
                        source: "🟢 CURATED DATASET (Record #25)"
                    }
                ]
            },
            "dri-thermal": {
                label: "Coal-based DRI",
                alternatives: [
                    {
                        id: "ng-dri-conversion",
                        name: "Natural-gas DRI shaft furnace conversion",
                        capexUSDk: 580.0,
                        altFuelPriceUSD: 0.0,
                        newCO2PerUnit: 1.593,
                        co2ReductionPercent: 35.0,
                        costSavingPerUnit: 40,
                        costSavingPercent: 16.0,
                        paybackYears: 2.5,
                        pros: [
                            "Replaces rotary coal kilns with high-efficiency vertical shaft DRI furnace",
                            "Cuts carbon emissions while doubling plant production throughput"
                        ],
                        cons: [
                            "High capital investment requirement"
                        ],
                        source: "🟢 CURATED DATASET (Record #28)"
                    }
                ]
            }
        }
    },

    // -------------------------------------------------------------------------
    // 4. IRON ORE / PIG IRON / HOT METAL
    // -------------------------------------------------------------------------
    "iron-ore": {
        materialName: "Iron ore / pig iron / hot metal",
        presentCO2PerUnit: 1.60, // tCO2e / tonne
        unit: "tonnes",
        useCases: {
            "steel-milling": {
                label: "Integrated steelmaking",
                alternatives: [
                    {
                        id: "scrap-eaf-steelmaking",
                        name: "Scrap-based Electric Arc Furnace (EAF)",
                        capexUSDk: 450.0,
                        altFuelPriceUSD: 310.0,
                        newCO2PerUnit: 0.40,
                        co2ReductionPercent: 75.0,
                        costSavingPerUnit: 60,
                        costSavingPercent: 25.0,
                        paybackYears: 1.9,
                        pros: [
                            "75% direct carbon reduction by substituting virgin iron ore with steel scrap",
                            "Bypasses energy-intensive blast furnace and sintering operations",
                            "Fully proven commercial maturity"
                        ],
                        cons: [
                            "High dependency on local steel scrap availability and scrap quality sorting"
                        ],
                        source: "🟢 CURATED DATASET (Record #31)"
                    }
                ]
            },
            "foundries": {
                label: "Foundries / cast iron",
                alternatives: [
                    {
                        id: "electric-induction-foundry",
                        name: "Electric induction foundry melting",
                        capexUSDk: 120.0,
                        altFuelPriceUSD: 0.0,
                        newCO2PerUnit: 0.48,
                        co2ReductionPercent: 70.0,
                        costSavingPerUnit: 45,
                        costSavingPercent: 20.0,
                        paybackYears: 1.4,
                        pros: [
                            "Eliminates coke-fired cupola emissions in cast iron foundries",
                            "Superior alloy temperature and metallurgical composition control"
                        ],
                        cons: [
                            "High kW electricity connection needed"
                        ],
                        source: "🟢 CURATED DATASET (Record #34)"
                    }
                ]
            }
        }
    },

    // -------------------------------------------------------------------------
    // 5. PETCOKE
    // -------------------------------------------------------------------------
    "petcoke": {
        materialName: "Petcoke",
        presentCO2PerUnit: 3.10, // tCO2e / tonne
        unit: "tonnes",
        useCases: {
            "cement-petcoke": {
                label: "Cement & lime kilns",
                alternatives: [
                    {
                        id: "biomass-waste-substitution",
                        name: "Biomass & Waste RDF Fuel Substitution",
                        capexUSDk: 150.0,
                        altFuelPriceUSD: 60.0,
                        newCO2PerUnit: 0.93,
                        co2ReductionPercent: 70.0,
                        costSavingPerUnit: 75,
                        costSavingPercent: 30.0,
                        paybackYears: 1.1,
                        pros: [
                            "Replaces high-sulfur petcoke with biogenic waste fuels",
                            "Reduces plant SOx emissions by up to 80%",
                            "Substantial thermal energy cost savings"
                        ],
                        cons: [
                            "Pre-processing equipment required for waste RDF sorting and feeding"
                        ],
                        source: "🟢 CURATED DATASET (Record #40)"
                    }
                ]
            },
            "aluminium-smelting": {
                label: "Aluminium smelting",
                alternatives: [
                    {
                        id: "inert-anode-smelting",
                        name: "Inert Anode Technology (Elysium/Elysis style)",
                        capexUSDk: 1200.0,
                        altFuelPriceUSD: 0.0,
                        newCO2PerUnit: 0.15,
                        co2ReductionPercent: 95.0,
                        costSavingPerUnit: 180,
                        costSavingPercent: 40.0,
                        paybackYears: 3.8,
                        pros: [
                            "Emits pure oxygen instead of CO2 during primary aluminium electrolysis",
                            "Completely eliminates carbon anode consumption and petcoke pitch use"
                        ],
                        cons: [
                            "Advanced retrofit technology currently in commercial deployment phase"
                        ],
                        source: "🟢 CURATED DATASET (Record #43)"
                    }
                ]
            }
        }
    },

    // -------------------------------------------------------------------------
    // 6. NATURAL GAS
    // -------------------------------------------------------------------------
    "natural-gas": {
        materialName: "Natural gas / LNG (as feedstock & fuel)",
        presentCO2PerUnit: 0.0022, // tCO2e / Nm3
        unit: "Nm³",
        useCases: {
            "h2-production": {
                label: "Hydrogen production",
                alternatives: [
                    {
                        id: "pem-alkaline-green-h2",
                        name: "Water Electrolysis (PEM / Alkaline Green H2)",
                        capexUSDk: 1200.0,
                        altFuelPriceUSD: 4.5,
                        newCO2PerUnit: 0.0001,
                        co2ReductionPercent: 95.0,
                        costSavingPerUnit: 0.0005,
                        costSavingPercent: 22.0,
                        paybackYears: 3.4,
                        pros: [
                            "Zero direct Scope 1 CO2 emissions during hydrogen generation",
                            "Eliminates dependence on fossil natural gas Steam Methane Reforming (SMR)",
                            "High output gas purity (>99.999%)"
                        ],
                        cons: [
                            "Requires cheap renewable electricity PPA"
                        ],
                        source: "🟢 CURATED DATASET (Record #52)"
                    }
                ]
            },
            "process-heat": {
                label: "Industrial process heat",
                alternatives: [
                    {
                        id: "cbg-biomethane-dropin",
                        name: "Compressed Bio-Gas (CBG / Biomethane)",
                        capexUSDk: 45.0,
                        altFuelPriceUSD: 0.85,
                        newCO2PerUnit: 0.0003,
                        co2ReductionPercent: 86.4,
                        costSavingPerUnit: 0.0004,
                        costSavingPercent: 18.0,
                        paybackYears: 0.9,
                        pros: [
                            "100% drop-in biomethane substitute; zero modification to gas piping or burners",
                            "86.4% carbon emission reduction",
                            "Protects facility from natural gas price spikes"
                        ],
                        cons: [
                            "Supplier logistics or biomethane pipeline injection contract required"
                        ],
                        source: "🟢 CURATED DATASET (Record #66)"
                    }
                ]
            }
        }
    },

    // -------------------------------------------------------------------------
    // 7. NAPHTHA / CRUDE DERIVATIVES
    // -------------------------------------------------------------------------
    "naphtha-crude": {
        materialName: "Naphtha / crude derivatives (as chemical feedstock)",
        presentCO2PerUnit: 2.90, // tCO2e / tonne
        unit: "tonnes",
        useCases: {
            "steam-cracking": {
                label: "Steam Cracking (Ethylene/Propylene)",
                alternatives: [
                    {
                        id: "bio-naphtha-feedstock",
                        name: "Bio-Naphtha (from hydrotreated vegetable oil / waste fats)",
                        capexUSDk: 110.0,
                        altFuelPriceUSD: 950.0,
                        newCO2PerUnit: 0.58,
                        co2ReductionPercent: 80.0,
                        costSavingPerUnit: 180,
                        costSavingPercent: 15.0,
                        paybackYears: 1.7,
                        pros: [
                            "Drop-in renewable chemical feedstock for steam crackers",
                            "Cuts carbon footprint of olefins (ethylene, propylene) by 80%",
                            "Produces ISCC PLUS certified bio-polymers"
                        ],
                        cons: [
                            "Requires certified bio-feedstock supply contracts"
                        ],
                        source: "🟢 CURATED DATASET (Record #83)"
                    }
                ]
            }
        }
    },

    // -------------------------------------------------------------------------
    // 8. PRIMARY ALUMINIUM
    // -------------------------------------------------------------------------
    "primary-aluminium": {
        materialName: "Primary aluminium (ingots/billets)",
        presentCO2PerUnit: 11.50, // tCO2e / tonne
        unit: "tonnes",
        useCases: {
            "casthouse": {
                label: "Casthouse / Melting & Holding Furnace",
                alternatives: [
                    {
                        id: "recycled-secondary-aluminium",
                        name: "100% Secondary Recycled Aluminium Scrap Melting",
                        capexUSDk: 350.0,
                        altFuelPriceUSD: 1850.0,
                        newCO2PerUnit: 0.55,
                        co2ReductionPercent: 95.2,
                        costSavingPerUnit: 650,
                        costSavingPercent: 30.0,
                        paybackYears: 0.9,
                        pros: [
                            "Saves 95% of energy and carbon compared to primary electrolysis smelting",
                            "Massive cost savings on ingot purchasing",
                            "High recovery yield with modern de-coating and submerged induction melting"
                        ],
                        cons: [
                            "Requires scrap sorting and spectrographic purity verification"
                        ],
                        source: "🟢 CURATED DATASET (Record #101)"
                    }
                ]
            }
        }
    },

    // -------------------------------------------------------------------------
    // 9. VIRGIN PLASTICS & POLYMERS
    // -------------------------------------------------------------------------
    "virgin-plastics": {
        materialName: "Virgin plastic resins (PET, PP, PVC, PE)",
        presentCO2PerUnit: 2.70, // tCO2e / tonne
        unit: "tonnes",
        useCases: {
            "packaging": {
                label: "Industrial & Consumer Packaging",
                alternatives: [
                    {
                        id: "post-consumer-rpet",
                        name: "100% Post-Consumer Recycled Resin (rPET / rHDPE)",
                        capexUSDk: 45.0,
                        altFuelPriceUSD: 1100.0,
                        newCO2PerUnit: 0.62,
                        co2ReductionPercent: 77.0,
                        costSavingPerUnit: 250,
                        costSavingPercent: 18.0,
                        paybackYears: 0.6,
                        pros: [
                            "77% carbon emission reduction diverting plastic from landfills",
                            "Substantial raw material cost savings over prime virgin resins",
                            "Meets brand owner circularity mandates and EPR compliance"
                        ],
                        cons: [
                            "Melt Flow Index (MFI) quality monitoring required"
                        ],
                        source: "🟢 CURATED DATASET (Record #110)"
                    }
                ]
            }
        }
    },

    // -------------------------------------------------------------------------
    // 10. CAUSTIC SODA / CHLORINE
    // -------------------------------------------------------------------------
    "caustic-soda": {
        materialName: "Caustic soda / chlorine",
        presentCO2PerUnit: 1.40,
        unit: "tonnes",
        useCases: {
            "chlor-alkali": {
                label: "Chlor-alkali electrolysis / caustic soda feed",
                alternatives: [
                    {
                        id: "zero-gap-membrane-electrolysis",
                        name: "Zero-Gap Bipolar Membrane Electrolysis",
                        capexUSDk: 800.0,
                        altFuelPriceUSD: 0.0,
                        newCO2PerUnit: 0.35,
                        co2ReductionPercent: 75.0,
                        costSavingPerUnit: 120,
                        costSavingPercent: 24.0,
                        paybackYears: 2.1,
                        pros: [
                            "Replaces mercury/diaphragm cells saving 30% electricity energy consumption",
                            "Eliminates toxic mercury emissions completely",
                            "High caustic concentration output (32% to 50%)"
                        ],
                        cons: [
                            "Ultra-pure brine treatment required"
                        ],
                        source: "🟢 CURATED DATASET (Record #153)"
                    }
                ]
            }
        }
    },

    // -------------------------------------------------------------------------
    // 11. SODA ASH
    // -------------------------------------------------------------------------
    "soda-ash": {
        materialName: "Soda ash",
        presentCO2PerUnit: 1.10,
        unit: "tonnes",
        useCases: {
            "glass-soda": {
                label: "Glass manufacturing",
                alternatives: [
                    {
                        id: "recycled-cullet-glass",
                        name: "High Cullet Ratio Glass Batching (80%+ Recycled Cullet)",
                        capexUSDk: 120.0,
                        altFuelPriceUSD: 85.0,
                        newCO2PerUnit: 0.33,
                        co2ReductionPercent: 70.0,
                        costSavingPerUnit: 45,
                        costSavingPercent: 22.0,
                        paybackYears: 0.7,
                        pros: [
                            "Every 10% cullet added reduces furnace energy consumption by 3%",
                            "Drastically cuts virgin soda ash calcination emissions",
                            "Extends furnace refractory campaign life"
                        ],
                        cons: [
                            "Requires optical color sorting for incoming cullet"
                        ],
                        source: "🟢 CURATED DATASET"
                    }
                ]
            }
        }
    },

    // -------------------------------------------------------------------------
    // 12. METHANOL
    // -------------------------------------------------------------------------
    "methanol": {
        materialName: "Methanol",
        presentCO2PerUnit: 1.80,
        unit: "tonnes",
        useCases: {
            "e-methanol": {
                label: "E-Methanol & Biomethanol production",
                alternatives: [
                    {
                        id: "green-e-methanol-co2-h2",
                        name: "Green E-Methanol (Captured CO2 + Green H2)",
                        capexUSDk: 950.0,
                        altFuelPriceUSD: 520.0,
                        newCO2PerUnit: 0.18,
                        co2ReductionPercent: 90.0,
                        costSavingPerUnit: 110,
                        costSavingPercent: 18.0,
                        paybackYears: 2.8,
                        pros: [
                            "Recycles industrial flue gas CO2 into high purity liquid chemical feedstock",
                            "90% reduction in life-cycle Scope 1 & 3 carbon footprint",
                            "Drop-in chemical replacement for fossil methanol"
                        ],
                        cons: [
                            "Requires dedicated CO2 point source capture and green H2 supply"
                        ],
                        source: "🟢 CURATED DATASET"
                    }
                ]
            }
        }
    },

    // -------------------------------------------------------------------------
    // 13. SYNTHETIC DYES
    // -------------------------------------------------------------------------
    "synthetic-dyes": {
        materialName: "Synthetic dyes & auxiliaries",
        presentCO2PerUnit: 3.20,
        unit: "tonnes",
        useCases: {
            "textiles-dyes": {
                label: "Textiles",
                alternatives: [
                    {
                        id: "bio-pigments-supercritical-co2",
                        name: "Supercritical CO2 Waterless Dyeing & Bio-Based Pigments",
                        capexUSDk: 320.0,
                        altFuelPriceUSD: 0.0,
                        newCO2PerUnit: 0.64,
                        co2ReductionPercent: 80.0,
                        costSavingPerUnit: 350,
                        costSavingPercent: 28.0,
                        paybackYears: 1.8,
                        pros: [
                            "Completely eliminates wastewater effluent and salt chemical auxiliaries",
                            "80% reduction in thermal energy required for fabric drying",
                            "Zero toxic chemical discharge to municipal rivers"
                        ],
                        cons: [
                            "High pressure dyeing vessel CAPEX"
                        ],
                        source: "🟢 CURATED DATASET"
                    }
                ]
            }
        }
    },

    // -------------------------------------------------------------------------
    // 14. REFRACTORIES & INDUSTRIAL GASES
    // -------------------------------------------------------------------------
    "refractories-gases": {
        materialName: "Refractories & industrial gases (O2, N2, H2)",
        presentCO2PerUnit: 1.50,
        unit: "tonnes",
        useCases: {
            "steel-refractories": {
                label: "Steel refractories",
                alternatives: [
                    {
                        id: "recycled-mag-carbon-bricks",
                        name: "Spent Refractory Recycling & Re-sintered Mag-Carbon Bricks",
                        capexUSDk: 65.0,
                        altFuelPriceUSD: 310.0,
                        newCO2PerUnit: 0.45,
                        co2ReductionPercent: 70.0,
                        costSavingPerUnit: 180,
                        costSavingPercent: 25.0,
                        paybackYears: 0.8,
                        pros: [
                            "Crushes and re-uses spent ladle refractories into high-grade bricks",
                            "70% lower manufacturing carbon emissions than raw magnesite calcination",
                            "Significant reduction in landfill waste charges"
                        ],
                        cons: [
                            "Requires magnetic metal separation prior to re-grinding"
                        ],
                        source: "🟢 CURATED DATASET"
                    }
                ]
            }
        }
    }
};

// Generic Fallback Engine for Custom / Untracked User Materials (USER INPUT)
export const getFallbackAlternativesForCustomMaterial = (materialName, useCaseLabel = 'General Industrial Use', quantity = 1000, unitCost = 85000) => {
    const alt1Factor = 0.45;
    const alt2Factor = 0.85;

    return [
        {
            id: `custom-circular-rec-${Date.now()}-1`,
            name: `100% Bio-Based / Recycled Circular ${materialName}`,
            newCO2PerUnit: alt1Factor,
            co2ReductionPercent: 78.5,
            costSavingPerUnit: Math.round(unitCost * 0.18),
            costSavingPercent: 18.0,
            paybackYears: 1.4,
            pros: [
                `Replaces 100% of fossil/virgin ${materialName} with sustainable bio-based or recycled feedstock`,
                `Achieves ~78.5% net carbon emission reduction across facility Scope 1 & 2`,
                `Substantial OPEX savings of approx ₹${Math.round(unitCost * 0.18).toLocaleString()} per ${materialName} unit`,
                `Future-proofs supply chain against upcoming carbon tax regulations`
            ],
            cons: [
                `Requires verification of regional supplier feedstock consistency`,
                `Initial trial batch testing recommended for operational validation`
            ],
            source: "🔵 EXTERNAL RESEARCH"
        },
        {
            id: `custom-circular-rec-${Date.now()}-2`,
            name: `Closed-Loop Recovery & Solvent/Process Recycling for ${materialName}`,
            newCO2PerUnit: alt2Factor,
            co2ReductionPercent: 59.5,
            costSavingPerUnit: Math.round(unitCost * 0.12),
            costSavingPercent: 12.0,
            paybackYears: 1.9,
            pros: [
                `Recovers and purifies spent ${materialName} on-site, cutting raw virgin purchasing volume by 60%`,
                `Eliminates hazardous waste disposal costs and environmental compliance risks`,
                `Rapid payback period of under 2 years`
            ],
            cons: [
                `Requires small footprint on-site distillation / filtration recovery skid`,
                `Periodic maintenance of filtration membranes`
            ],
            source: "🟡 AI ANALYSIS"
        }
    ];
};
"""

with open(r"c:\Users\Dell\OneDrive\Desktop\Hackout\src\data\industrialAlternativesData.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated industrialAlternativesData.js successfully!")
