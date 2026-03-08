// ============================================================
//  Help By Rana — Data Layer (v4)
//  Migrated to Vercel Serverless Backend & Supabase
// ============================================================

const CATEGORIES = [
    { id: 1, name: "Plumber", icon: "🔧", emergency: true },
    { id: 2, name: "Electrician", icon: "⚡", emergency: true },
    { id: 3, name: "AC Repair", icon: "❄️", emergency: true },
    { id: 4, name: "Generator Repair", icon: "🔌", emergency: true },
    { id: 5, name: "Carpenter", icon: "🪚", emergency: false },
    { id: 6, name: "Painter", icon: "🎨", emergency: false },
    { id: 7, name: "Cleaner", icon: "🧹", emergency: false },
    { id: 8, name: "Driver", icon: "🚗", emergency: false },
    { id: 9, name: "Mechanic", icon: "🔩", emergency: false },
    { id: 10, name: "Barber", icon: "💈", emergency: false },
    { id: 11, name: "Welder", icon: "🔥", emergency: false },
    { id: 12, name: "Tailor", icon: "🧵", emergency: false },
    { id: 13, name: "Gardener", icon: "🌿", emergency: false },
    { id: 14, name: "Photographer", icon: "📷", emergency: false },
    { id: 15, name: "Mobile Repair", icon: "📱", emergency: false },
    { id: 16, name: "Appliance Repair", icon: "🖥️", emergency: false },
    { id: 17, name: "Locksmith", icon: "🔑", emergency: false },
    { id: 18, name: "Laundry Worker", icon: "👕", emergency: false },
    { id: 19, name: "Delivery Worker", icon: "📦", emergency: false },
    { id: 20, name: "Security Guard", icon: "🛡️", emergency: false },
    { id: 21, name: "Cook", icon: "👨‍🍳", emergency: false },
    { id: 22, name: "Tutor", icon: "📚", emergency: false },
];

/**
 * db object (Now fully async communicating with Vercel API)
 * Note: App is currently being migrated piece by piece.
 */
const API_URL = ''; // Relative path for Vercel

const db = {
    getCategories() { return CATEGORIES; },

    // --- Public API ---
    async getWorkers() {
        try {
            const res = await fetch(`${API_URL}/api/get-workers`);
            if (!res.ok) throw new Error('Failed to fetch workers');
            return await res.json();
        } catch (error) {
            console.error('Error fetching workers:', error);
            return [];
        }
    },

    // --- Worker Actions ---
    async submitPayment(workerId, transactionId) {
        try {
            const res = await fetch(`${API_URL}/api/submit-payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ workerId, transactionId })
            });
            if (!res.ok) throw new Error('Payment submission failed');
            return await res.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    // --- Admin API ---
    async getAllRegistered(token) {
        try {
            const res = await fetch(`${API_URL}/api/admin-get-all`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Unauthorized');
            return await res.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    async verifyPayment(workerId, token) {
        return this._adminAction('verify', workerId, token);
    },

    async rejectPayment(workerId, token) {
        return this._adminAction('reject', workerId, token);
    },

    async _adminAction(action, workerId, token) {
        try {
            const res = await fetch(`${API_URL}/api/admin-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ action, workerId })
            });
            if (!res.ok) throw new Error(`${action} failed`);
            return await res.json();
        } catch (error) {
            console.error('Admin Action Error:', error);
            throw error;
        }
    },

    // --- Stubs for unused local storage functions until full db migration ---
    getPendingPayments() { return []; },
    addWorker(w) { console.warn('addWorker requires backend implementation'); },
    getWorkerReviews(id) { return []; },
    submitReview() { console.warn('submitReview requires backend implementation'); }
};
