const fs = require('fs');

const rawData = [
    {
        "Record ID": 1,
        "Raw Material / Input": "Coking coal",
        "Raw Material CO2 Emission": 2.9,
        "Raw Material Price (USD/t)": 220,
        "Use Case / Process": "Integrated steelmaking (BF-BOF)",
        "Alternative Pathway": "Natural-gas DRI + EAF",
        "One-Time CAPEX / Setup": 580.0,
        "Alternative Raw Material / Fuel Price": 375.0,
        "Alternative CO2 Emission": 1.885
    },
    {
        "Record ID": 2,
        "Raw Material / Input": "Coking coal",
        "Raw Material CO2 Emission": 2.9,
        "Raw Material Price (USD/t)": 220,
        "Use Case / Process": "Integrated steelmaking (BF-BOF)",
        "Alternative Pathway": "Green-H2 DRI + EAF",
        "One-Time CAPEX / Setup": 1800.0,
        "Alternative Raw Material / Fuel Price": 4.75,
        "Alternative CO2 Emission": 0.435
    },
    {
        "Record ID": 3,
        "Raw Material / Input": "Coking coal",
        "Raw Material CO2 Emission": 2.9,
        "Raw Material Price (USD/t)": 220,
        "Use Case / Process": "Integrated steelmaking (BF-BOF)",
        "Alternative Pathway": "BF-BOF + CCS",
        "One-Time CAPEX / Setup": 566.667,
        "Alternative Raw Material / Fuel Price": 175.0,
        "Alternative CO2 Emission": 1.16
    },
    {
        "Record ID": 4,
        "Raw Material / Input": "Coking coal",
        "Raw Material CO2 Emission": 2.9,
        "Raw Material Price (USD/t)": 220,
        "Use Case / Process": "Foundries & cast iron",
        "Alternative Pathway": "Coreless induction melting furnace",
        "One-Time CAPEX / Setup": 6.64,
        "Alternative Raw Material / Fuel Price": 0.0,
        "Alternative CO2 Emission": 2.03
    },
    {
        "Record ID": 5,
        "Raw Material / Input": "Coking coal",
        "Raw Material CO2 Emission": 2.9,
        "Raw Material Price (USD/t)": 220,
        "Use Case / Process": "Foundries & cast iron",
        "Alternative Pathway": "Channel induction furnace",
        "One-Time CAPEX / Setup": 3.25,
        "Alternative Raw Material / Fuel Price": 0.0,
        "Alternative CO2 Emission": 2.03
    },
    {
        "Record ID": 6,
        "Raw Material / Input": "Coking coal",
        "Raw Material CO2 Emission": 2.9,
        "Raw Material Price (USD/t)": 220,
        "Use Case / Process": "Foundries & cast iron",
        "Alternative Pathway": "Gas-fired melting furnace",
        "One-Time CAPEX / Setup": 180.0,
        "Alternative Raw Material / Fuel Price": 0.0,
        "Alternative CO2 Emission": 2.03
    },
    {
        "Record ID": 7,
        "Raw Material / Input": "Coking coal",
        "Raw Material CO2 Emission": 2.9,
        "Raw Material Price (USD/t)": 220,
        "Use Case / Process": "Ferroalloys (FeMn, FeCr, SiMn)",
        "Alternative Pathway": "Electric SAF + optimized carbon",
        "One-Time CAPEX / Setup": 0.0,
        "Alternative Raw Material / Fuel Price": 0.0,
        "Alternative CO2 Emission": 0.435
    },
    {
        "Record ID": 8,
        "Raw Material / Input": "Coking coal",
        "Raw Material CO2 Emission": 2.9,
        "Raw Material Price (USD/t)": 220,
        "Use Case / Process": "Ferroalloys",
        "Alternative Pathway": "Hydrogen/plasma-assisted reduction",
        "One-Time CAPEX / Setup": 0.0,
        "Alternative Raw Material / Fuel Price": 4.75,
        "Alternative CO2 Emission": 0.58
    },
    {
        "Record ID": 9,
        "Raw Material / Input": "Coking coal",
        "Raw Material CO2 Emission": 2.9,
        "Raw Material Price (USD/t)": 220,
        "Use Case / Process": "Ferroalloys",
        "Alternative Pathway": "Biomass-derived carbon / bio-coke",
        "One-Time CAPEX / Setup": 0.0,
        "Alternative Raw Material / Fuel Price": 0.0,
        "Alternative CO2 Emission": 0.87
    },
    {
        "Record ID": 10,
        "Raw Material / Input": "Coking coal",
        "Raw Material CO2 Emission": 2.9,
        "Raw Material Price (USD/t)": 220,
        "Use Case / Process": "Lead & zinc smelting",
        "Alternative Pathway": "Electric / oxygen-enriched smelting",
        "One-Time CAPEX / Setup": 0.0,
        "Alternative Raw Material / Fuel Price": 0.0,
        "Alternative CO2 Emission": 0.435
    },
    {
        "Record ID": 11,
        "Raw Material / Input": "Coking coal",
        "Raw Material CO2 Emission": 2.9,
        "Raw Material Price (USD/t)": 220,
        "Use Case / Process": "Lead & zinc smelting",
        "Alternative Pathway": "Hydrometallurgical routes",
        "One-Time CAPEX / Setup": 0.0,
        "Alternative Raw Material / Fuel Price": 0.0,
        "Alternative CO2 Emission": 2.03
    },
    {
        "Record ID": 12,
        "Raw Material / Input": "Coking coal",
        "Raw Material CO2 Emission": 2.9,
        "Raw Material Price (USD/t)": 220,
        "Use Case / Process": "Lead & zinc smelting",
        "Alternative Pathway": "Waste gases / syngas from coal/biomass gasification",
        "One-Time CAPEX / Setup": 0.0,
        "Alternative Raw Material / Fuel Price": 0.0,
        "Alternative CO2 Emission": 0.87
    },
    {
        "Record ID": 13,
        "Raw Material / Input": "Coking coal",
        "Raw Material CO2 Emission": 2.9,
        "Raw Material Price (USD/t)": 220,
        "Use Case / Process": "Lime & magnesium production",
        "Alternative Pathway": "Electric lime kilns / electrified calcination",
        "One-Time CAPEX / Setup": 0.0,
        "Alternative Raw Material / Fuel Price": 0.0,
        "Alternative CO2 Emission": 0.435
    },
    {
        "Record ID": 14,
        "Raw Material / Input": "Coking coal",
        "Raw Material CO2 Emission": 2.9,
        "Raw Material Price (USD/t)": 220,
        "Use Case / Process": "Lime & magnesium production",
        "Alternative Pathway": "Natural-gas kilns + CCS",
        "One-Time CAPEX / Setup": 0.0,
        "Alternative Raw Material / Fuel Price": 0.0,
        "Alternative CO2 Emission": 1.16
    },
    {
        "Record ID": 15,
        "Raw Material / Input": "Coking coal",
        "Raw Material CO2 Emission": 2.9,
        "Raw Material Price (USD/t)": 220,
        "Use Case / Process": "Lime & magnesium production",
        "Alternative Pathway": "Biomass / waste-derived fuels",
        "One-Time CAPEX / Setup": 0.0,
        "Alternative Raw Material / Fuel Price": 0.0,
        "Alternative CO2 Emission": 0.87
    },
    {
        "Record ID": 16,
        "Raw Material / Input": "Limestone (as clinker)",
        "Raw Material CO2 Emission": 0.44,
        "Raw Material Price (USD/t)": 8,
        "Use Case / Process": "Cement / clinker production",
        "Alternative Pathway": "Clinker substitution (PPC/PSC/LC3)",
        "One-Time CAPEX / Setup": 5.0,
        "Alternative Raw Material / Fuel Price": 15.0,
        "Alternative CO2 Emission": 0.308
    },
    {
        "Record ID": 17,
        "Raw Material / Input": "Limestone (as clinker)",
        "Raw Material CO2 Emission": 0.44,
        "Raw Material Price (USD/t)": 8,
        "Use Case / Process": "Cement / clinker production",
        "Alternative Pathway": "Alternative clinkers (belite, BYF, CSA, calcium silicate)",
        "One-Time CAPEX / Setup": 200.0,
        "Alternative Raw Material / Fuel Price": 13.75,
        "Alternative CO2 Emission": 0.308
    },
    {
        "Record ID": 18,
        "Raw Material / Input": "Limestone (as clinker)",
        "Raw Material CO2 Emission": 0.44,
        "Raw Material Price (USD/t)": 8,
        "Use Case / Process": "Cement / clinker production",
        "Alternative Pathway": "Electrified calcination + CCS",
        "One-Time CAPEX / Setup": 115.0,
        "Alternative Raw Material / Fuel Price": 275.0,
        "Alternative CO2 Emission": 0.176
    },
    {
        "Record ID": 19,
        "Raw Material / Input": "Limestone (as clinker)",
        "Raw Material CO2 Emission": 0.44,
        "Raw Material Price (USD/t)": 8,
        "Use Case / Process": "Cement / clinker production",
        "Alternative Pathway": "Post-combustion CCS",
        "One-Time CAPEX / Setup": 300.667,
        "Alternative Raw Material / Fuel Price": 90.0,
        "Alternative CO2 Emission": 0.176
    },
    {
        "Record ID": 20,
        "Raw Material / Input": "Limestone (as clinker)",
        "Raw Material CO2 Emission": 0.44,
        "Raw Material Price (USD/t)": 8,
        "Use Case / Process": "Cement / clinker production",
        "Alternative Pathway": "ZeroCAL-type electrochemical lime",
        "One-Time CAPEX / Setup": 0.0,
        "Alternative Raw Material / Fuel Price": 2.0,
        "Alternative CO2 Emission": 0.066
    },
    {
        "Record ID": 21,
        "Raw Material / Input": "Non-coking coal / thermal coal",
        "Raw Material CO2 Emission": 2.45,
        "Raw Material Price (USD/t)": 115,
        "Use Case / Process": "Industrial power & steam",
        "Alternative Pathway": "Natural-gas boiler / coal-to-gas conversion",
        "One-Time CAPEX / Setup": 250.0,
        "Alternative Raw Material / Fuel Price": 9.0,
        "Alternative CO2 Emission": 1.593
    },
    {
        "Record ID": 22,
        "Raw Material / Input": "Non-coking coal / thermal coal",
        "Raw Material CO2 Emission": 2.45,
        "Raw Material Price (USD/t)": 115,
        "Use Case / Process": "Industrial power & steam",
        "Alternative Pathway": "Electric boiler / electric steam generator",
        "One-Time CAPEX / Setup": 189.0,
        "Alternative Raw Material / Fuel Price": 0.1,
        "Alternative CO2 Emission": 0.367
    },
    {
        "Record ID": 23,
        "Raw Material / Input": "Non-coking coal / thermal coal",
        "Raw Material CO2 Emission": 2.45,
        "Raw Material Price (USD/t)": 115,
        "Use Case / Process": "Industrial power & steam",
        "Alternative Pathway": "Biomass boiler",
        "One-Time CAPEX / Setup": 555.0,
        "Alternative Raw Material / Fuel Price": 142.5,
        "Alternative CO2 Emission": 0.735
    },
    {
        "Record ID": 24,
        "Raw Material / Input": "Non-coking coal / thermal coal",
        "Raw Material CO2 Emission": 2.45,
        "Raw Material Price (USD/t)": 115,
        "Use Case / Process": "Industrial power & steam",
        "Alternative Pathway": "Industrial high-temperature heat pump",
        "One-Time CAPEX / Setup": 1100.0,
        "Alternative Raw Material / Fuel Price": 3.0,
        "Alternative CO2 Emission": 1.715
    },
    {
        "Record ID": 25,
        "Raw Material / Input": "Non-coking coal / thermal coal",
        "Raw Material CO2 Emission": 2.45,
        "Raw Material Price (USD/t)": 115,
        "Use Case / Process": "Cement kiln fuel",
        "Alternative Pathway": "Alternative fuels (biomass, RDF, waste-derived fuels)",
        "One-Time CAPEX / Setup": 30.0,
        "Alternative Raw Material / Fuel Price": 0.0,
        "Alternative CO2 Emission": 0.735
    },
    {
        "Record ID": 26,
        "Raw Material / Input": "Non-coking coal / thermal coal",
        "Raw Material CO2 Emission": 2.45,
        "Raw Material Price (USD/t)": 115,
        "Use Case / Process": "Cement kiln fuel",
        "Alternative Pathway": "Electrified calciner / electric kiln",
        "One-Time CAPEX / Setup": 0.0,
        "Alternative Raw Material / Fuel Price": 0.0,
        "Alternative CO2 Emission": 0.367
    },
    {
        "Record ID": 27,
        "Raw Material / Input": "Non-coking coal / thermal coal",
        "Raw Material CO2 Emission": 2.45,
        "Raw Material Price (USD/t)": 115,
        "Use Case / Process": "Cement kiln fuel",
        "Alternative Pathway": "Carbon capture on coal-fired kiln",
        "One-Time CAPEX / Setup": 300.667,
        "Alternative Raw Material / Fuel Price": 90.0,
        "Alternative CO2 Emission": 1.715
    },
    {
        "Record ID": 28,
        "Raw Material / Input": "Non-coking coal / thermal coal",
        "Raw Material CO2 Emission": 2.45,
        "Raw Material Price (USD/t)": 115,
        "Use Case / Process": "Coal-based DRI",
        "Alternative Pathway": "Natural-gas DRI + EAF",
        "One-Time CAPEX / Setup": 580.0,
        "Alternative Raw Material / Fuel Price": 0.0,
        "Alternative CO2 Emission": 1.593
    },
    {
        "Record ID": 29,
        "Raw Material / Input": "Non-coking coal / thermal coal",
        "Raw Material CO2 Emission": 2.45,
        "Raw Material Price (USD/t)": 115,
        "Use Case / Process": "Coal-based DRI",
        "Alternative Pathway": "Hydrogen-DRI + EAF",
        "One-Time CAPEX / Setup": 1800.0,
        "Alternative Raw Material / Fuel Price": 4.75,
        "Alternative CO2 Emission": 0.49
    },
    {
        "Record ID": 30,
        "Raw Material / Input": "Non-coking coal / thermal coal",
        "Raw Material CO2 Emission": 2.45,
        "Raw Material Price (USD/t)": 115,
        "Use Case / Process": "Coal-based DRI",
        "Alternative Pathway": "Coal-gasification syngas DRI",
        "One-Time CAPEX / Setup": 0.0,
        "Alternative Raw Material / Fuel Price": 0.0,
        "Alternative CO2 Emission": 1.715
    }
];

console.log("Loaded records:", rawData.length);
