import { MASTER_INDUSTRIAL_INPUTS, searchIndustrialInputs } from '../data/industrialInputs';

// Local storage key for persistent MVP storage
const STORAGE_KEY = 'ecoforge_factory_industrial_inputs';

export const industrialInputService = {
    // GET /api/industrial-inputs
    async getIndustrialInputs(query = '') {
        const results = searchIndustrialInputs(query);
        return { data: results, count: results.length };
    },

    // GET /api/industrial-inputs/:id
    async getIndustrialInputById(id) {
        const item = MASTER_INDUSTRIAL_INPUTS.find(i => i.id === id);
        if (!item) {
            throw new Error(`Industrial input with ID "${id}" not found.`);
        }
        return { data: item };
    },

    // GET /api/factories/:factoryId/industrial-inputs
    async getFactoryIndustrialInputs(factoryId = 'ecoplast-manufacturing') {
        try {
            const raw = localStorage.getItem(`${STORAGE_KEY}_${factoryId}`);
            if (raw) {
                return { data: JSON.parse(raw) };
            }
        } catch (e) {
            console.warn("Unable to read local storage for industrial inputs:", e);
        }
        return { data: null };
    },

    // POST /api/factories/:factoryId/industrial-inputs
    async saveFactoryIndustrialInputs(factoryId = 'ecoplast-manufacturing', inputs = []) {
        try {
            localStorage.setItem(`${STORAGE_KEY}_${factoryId}`, JSON.stringify(inputs));
        } catch (e) {
            console.warn("Unable to write local storage for industrial inputs:", e);
        }
        return { success: true, count: inputs.length };
    }
};
