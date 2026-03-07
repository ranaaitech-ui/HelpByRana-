// ============================================================
//  Help By Rana — Data Layer (v3)
//  Edit this file to add/remove workers and categories.
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

const WORKERS_DATA = [
    // ──────────────── PLUMBER ────────────────────────────────
    { id: 1, name: "Muhammad Asif", category: "Plumber", city: "Lahore", area: "Johar Town", phone: "0312-1234567", experience: 8, rating: 4.8, reviews: 34, price: "Rs. 500/visit", verified: true, available: true, whatsapp: "923121234567", photo: "https://ui-avatars.com/api/?name=Muhammad+Asif&background=2563EB&color=fff&size=128", description: "Expert plumber with 8 years of experience. Specializes in pipe fitting, leakage repair, and bathroom installation.", skills: ["Pipe Fitting", "Leakage Fix", "Bathroom Install", "Motor Repair"] },
    { id: 2, name: "Tariq Mehmood", category: "Plumber", city: "Karachi", area: "Gulshan-e-Iqbal", phone: "0321-9876543", experience: 5, rating: 4.5, reviews: 21, price: "Rs. 600/visit", verified: true, available: true, whatsapp: "923219876543", photo: "https://ui-avatars.com/api/?name=Tariq+Mehmood&background=2563EB&color=fff&size=128", description: "Professional plumber available 24/7 for emergency repairs.", skills: ["Emergency Repair", "Water Tank", "Drainage"] },
    { id: 3, name: "Nasir Ali", category: "Plumber", city: "Islamabad", area: "G-11", phone: "0333-1112233", experience: 3, rating: 4.2, reviews: 12, price: "Rs. 450/visit", verified: false, available: true, whatsapp: "923331112233", photo: "https://ui-avatars.com/api/?name=Nasir+Ali&background=2563EB&color=fff&size=128", description: "Reliable plumber for all household plumbing needs.", skills: ["General Plumbing", "Pipe Repair"] },

    // ──────────────── ELECTRICIAN ────────────────────────────
    { id: 4, name: "Usman Ghani", category: "Electrician", city: "Lahore", area: "Model Town", phone: "0300-4445566", experience: 10, rating: 4.9, reviews: 58, price: "Rs. 700/visit", verified: true, available: true, whatsapp: "923004445566", photo: "https://ui-avatars.com/api/?name=Usman+Ghani&background=F59E0B&color=fff&size=128", description: "Master electrician. 10 years experience in wiring, panel work, and solar installations.", skills: ["Wiring", "Panel Work", "Solar", "UPS Repair"] },
    { id: 5, name: "Bilal Ahmed", category: "Electrician", city: "Karachi", area: "Defense", phone: "0311-7778899", experience: 6, rating: 4.6, reviews: 29, price: "Rs. 600/visit", verified: true, available: false, whatsapp: "923117778899", photo: "https://ui-avatars.com/api/?name=Bilal+Ahmed&background=F59E0B&color=fff&size=128", description: "Certified electrician for commercial and residential projects.", skills: ["Wiring", "Fuse Box", "Earthing"] },
    { id: 6, name: "Adnan Raza", category: "Electrician", city: "Faisalabad", area: "Madina Town", phone: "0345-2223344", experience: 4, rating: 4.3, reviews: 17, price: "Rs. 500/visit", verified: false, available: true, whatsapp: "923452223344", photo: "https://ui-avatars.com/api/?name=Adnan+Raza&background=F59E0B&color=fff&size=128", description: "Affordable and honest electrician for home repairs.", skills: ["Home Wiring", "Light Fixtures", "Fan Repair"] },

    // ──────────────── AC REPAIR ──────────────────────────────
    { id: 7, name: "Irfan Khan", category: "AC Repair", city: "Lahore", area: "DHA Phase 5", phone: "0309-5556677", experience: 7, rating: 4.7, reviews: 43, price: "Rs. 800/visit", verified: true, available: true, whatsapp: "923095556677", photo: "https://ui-avatars.com/api/?name=Irfan+Khan&background=10B981&color=fff&size=128", description: "AC specialist for all brands. Services include installation, gas refill, cleaning, and repair.", skills: ["Installation", "Gas Refill", "Cleaning", "Inverter AC"] },
    { id: 8, name: "Shahid Iqbal", category: "AC Repair", city: "Islamabad", area: "F-10", phone: "0322-8889900", experience: 5, rating: 4.4, reviews: 19, price: "Rs. 750/visit", verified: true, available: true, whatsapp: "923228889900", photo: "https://ui-avatars.com/api/?name=Shahid+Iqbal&background=10B981&color=fff&size=128", description: "Fast and reliable AC repair for all major brands.", skills: ["Split AC", "Window AC", "Gas Fill"] },
    { id: 9, name: "Hamza Saleem", category: "AC Repair", city: "Karachi", area: "North Nazimabad", phone: "0301-3334455", experience: 3, rating: 4.1, reviews: 9, price: "Rs. 650/visit", verified: false, available: false, whatsapp: "923013334455", photo: "https://ui-avatars.com/api/?name=Hamza+Saleem&background=10B981&color=fff&size=128", description: "AC technician available for emergency repairs.", skills: ["AC Repair", "Cleaning"] },

    // ──────────────── GENERATOR REPAIR ───────────────────────
    { id: 10, name: "Rizwan Hassan", category: "Generator Repair", city: "Lahore", area: "Gulberg", phone: "0333-6667788", experience: 9, rating: 4.8, reviews: 31, price: "Rs. 900/visit", verified: true, available: true, whatsapp: "923336667788", photo: "https://ui-avatars.com/api/?name=Rizwan+Hassan&background=EF4444&color=fff&size=128", description: "Generator repair expert. Handles Honda, Yamaha, Kirloskar, and other brands.", skills: ["Honda Gen", "Yamaha", "Engine Repair", "Winding"] },
    { id: 11, name: "Faisal Nawaz", category: "Generator Repair", city: "Rawalpindi", area: "Saddar", phone: "0346-0011223", experience: 6, rating: 4.5, reviews: 14, price: "Rs. 850/visit", verified: false, available: true, whatsapp: "923460011223", photo: "https://ui-avatars.com/api/?name=Faisal+Nawaz&background=EF4444&color=fff&size=128", description: "Experienced in all types of generator servicing and repair.", skills: ["Servicing", "Repair", "Parts Replacement"] },

    // ──────────────── CARPENTER ──────────────────────────────
    { id: 12, name: "Khalid Hussain", category: "Carpenter", city: "Lahore", area: "Samnabad", phone: "0312-4445566", experience: 12, rating: 4.9, reviews: 62, price: "Rs. 1000/day", verified: true, available: true, whatsapp: "923124445566", photo: "https://ui-avatars.com/api/?name=Khalid+Hussain&background=8B5CF6&color=fff&size=128", description: "Master carpenter for furniture, doors, windows, and custom woodwork.", skills: ["Furniture", "Doors", "Windows", "Custom Work"] },

    // ──────────────── PAINTER ────────────────────────────────
    { id: 14, name: "Sajid Hussain", category: "Painter", city: "Lahore", area: "Allama Iqbal Town", phone: "0321-1112233", experience: 8, rating: 4.6, reviews: 39, price: "Rs. 800/day", verified: true, available: true, whatsapp: "923211112233", photo: "https://ui-avatars.com/api/?name=Sajid+Hussain&background=EC4899&color=fff&size=128", description: "Professional painter for interior and exterior. Handles all types of paints.", skills: ["Interior", "Exterior", "Wall Texture", "Polish"] },

    // ──────────────── DRIVER ─────────────────────────────────
    { id: 18, name: "Shahzad Butt", category: "Driver", city: "Lahore", area: "Township", phone: "0300-2223344", experience: 6, rating: 4.7, reviews: 44, price: "Rs. 700/day", verified: true, available: true, whatsapp: "923002223344", photo: "https://ui-avatars.com/api/?name=Shahzad+Butt&background=F97316&color=fff&size=128", description: "Experienced and trustworthy driver for family trips, office, and market visits.", skills: ["City Drive", "Long Route", "Car Care", "Punctual"] },

    // ──────────────── MECHANIC ───────────────────────────────
    { id: 20, name: "Shafiq Rehman", category: "Mechanic", city: "Lahore", area: "Shahdara", phone: "0311-8889900", experience: 10, rating: 4.6, reviews: 35, price: "Rs. 500/hour", verified: true, available: true, whatsapp: "923118889900", photo: "https://ui-avatars.com/api/?name=Shafiq+Rehman&background=64748B&color=fff&size=128", description: "Auto mechanic for cars, bikes, and rickshaws. Engine, transmission, electrical.", skills: ["Engine Repair", "Brakes", "Electrical", "Oil Change"] },

    // ──────────────── TUTOR ──────────────────────────────────
    { id: 36, name: "Sir Aqeel Tutor", category: "Tutor", city: "Islamabad", area: "G-9", phone: "0311-4445566", experience: 5, rating: 4.6, reviews: 26, price: "Rs. 400/hour", verified: true, available: true, whatsapp: "923114445566", photo: "https://ui-avatars.com/api/?name=Sir+Aqeel+Tutor&background=2563EB&color=fff&size=128", description: "Home tutor for grades 1–12. Math, Science, English, and Urdu.", skills: ["Math", "Science", "English", "Urdu", "O-Levels"] },
];

const REVIEWS = [
    { id: 1, name: "Rana Sajid", avatar: "RS", rating: 5, text: "Muhammad Asif fixed our pipe in 20 minutes. Very professional and affordable. Highly recommended!", service: "Plumber" },
    { id: 2, name: "Sara Malik", avatar: "SM", rating: 5, text: "Usman Ghani is amazing! He fixed our entire electrical panel. Very knowledgeable and honest.", service: "Electrician" },
    { id: 3, name: "Babar Aziz", avatar: "BA", rating: 4, text: "Irfan Khan serviced our AC and it works perfectly now. Will call him again next summer.", service: "AC Repair" },
    { id: 4, name: "Dr. Amna Rizvi", avatar: "AR", rating: 5, text: "Khalid Hussain made our kitchen cabinets beautifully. Amazing work at a great price!", service: "Carpenter" },
];

/**
 * db object (localStorage simulation)
 */
const db = {
    _getRegistry() {
        try {
            const raw = localStorage.getItem('hbr_registry');
            return raw ? JSON.parse(raw) : [];
        } catch { return []; }
    },
    _saveRegistry(reg) {
        localStorage.setItem('hbr_registry', JSON.stringify(reg));
    },

    // Public site: only return approved registered workers + built-in workers
    getWorkers() {
        const reg = this._getRegistry().filter(w => w.status === 'approved' || !w.status);
        return [...WORKERS_DATA, ...reg];
    },

    // Admin: all registered workers regardless of status
    getAllRegistered() {
        return this._getRegistry();
    },

    // Admin: pending registrations awaiting review
    getPendingWorkers() {
        return this._getRegistry().filter(w => w.status === 'pending');
    },

    getCategories() { return CATEGORIES; },

    // Called from register.html — saves as PENDING
    addWorker(w) {
        const reg = this._getRegistry();
        const newId = Date.now();
        reg.push({
            ...w,
            id: newId,
            status: 'pending',
            rating: 5.0,
            reviews: 0,
            verified: false,
            available: true,
            photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(w.name)}&background=2563EB&color=fff&size=128`,
            skills: w.skills || [w.category],
            registeredAt: new Date().toISOString(),
        });
        this._saveRegistry(reg);
    },

    // Admin adds worker directly — saves as APPROVED immediately
    addWorkerDirect(w) {
        const reg = this._getRegistry();
        const newId = Date.now();
        reg.push({
            ...w,
            id: newId,
            status: 'approved',
            rating: 5.0,
            reviews: 0,
            verified: false,
            available: true,
            photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(w.name)}&background=2563EB&color=fff&size=128`,
            skills: w.skills || [w.category],
            registeredAt: new Date().toISOString(),
        });
        this._saveRegistry(reg);
    },

    approveWorker(id) {
        const reg = this._getRegistry().map(w => w.id === id ? { ...w, status: 'approved', verified: true } : w);
        this._saveRegistry(reg);
    },

    rejectWorker(id) {
        const reg = this._getRegistry().filter(w => w.id !== id);
        this._saveRegistry(reg);
    },

    deleteWorker(id) {
        const reg = this._getRegistry().filter(w => w.id !== id);
        this._saveRegistry(reg);
    },

    getReviews() { return REVIEWS; },

    // Get user-submitted reviews for a specific worker
    getWorkerReviews(workerId) {
        try {
            const raw = localStorage.getItem(`hbr_reviews_${workerId}`);
            return raw ? JSON.parse(raw) : [];
        } catch { return []; }
    },

    // Submit a new review for a worker
    submitReview(workerId, review) {
        const reviews = this.getWorkerReviews(workerId);
        reviews.unshift({ ...review, id: Date.now(), date: new Date().toISOString() });
        localStorage.setItem(`hbr_reviews_${workerId}`, JSON.stringify(reviews));

        // Recalculate average rating for registered workers
        const reg = this._getRegistry();
        const idx = reg.findIndex(w => w.id === workerId);
        if (idx !== -1) {
            const allRatings = reviews.map(r => r.rating);
            const avg = (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1);
            reg[idx].rating = parseFloat(avg);
            reg[idx].reviews = reviews.length;
            this._saveRegistry(reg);
        }
    },
};
