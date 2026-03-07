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
    // ── PLUMBER ──────────────────────────────────────────────
    { id: 1, name: "Muhammad Asif", category: "Plumber", city: "Lahore", area: "Johar Town", phone: "0312-1234567", experience: 8, rating: 4.8, reviews: 34, price: "Rs. 500/visit", verified: true, available: true, whatsapp: "923121234567", photo: "https://ui-avatars.com/api/?name=Muhammad+Asif&background=2563EB&color=fff&size=128", description: "Expert plumber with 8 years of experience. Specializes in pipe fitting, leakage repair, and bathroom installation.", skills: ["Pipe Fitting", "Leakage Fix", "Bathroom Install", "Motor Repair"] },
    { id: 2, name: "Tariq Mehmood", category: "Plumber", city: "Karachi", area: "Gulshan-e-Iqbal", phone: "0321-9876543", experience: 5, rating: 4.5, reviews: 21, price: "Rs. 600/visit", verified: true, available: true, whatsapp: "923219876543", photo: "https://ui-avatars.com/api/?name=Tariq+Mehmood&background=2563EB&color=fff&size=128", description: "Professional plumber available 24/7 for emergency repairs.", skills: ["Emergency Repair", "Water Tank", "Drainage"] },
    { id: 3, name: "Nasir Ali", category: "Plumber", city: "Islamabad", area: "G-11", phone: "0333-1112233", experience: 3, rating: 4.2, reviews: 12, price: "Rs. 450/visit", verified: false, available: true, whatsapp: "923331112233", photo: "https://ui-avatars.com/api/?name=Nasir+Ali&background=2563EB&color=fff&size=128", description: "Reliable plumber for all household plumbing needs.", skills: ["General Plumbing", "Pipe Repair"] },

    // ── ELECTRICIAN ──────────────────────────────────────────
    { id: 4, name: "Usman Ghani", category: "Electrician", city: "Lahore", area: "Model Town", phone: "0300-4445566", experience: 10, rating: 4.9, reviews: 58, price: "Rs. 700/visit", verified: true, available: true, whatsapp: "923004445566", photo: "https://ui-avatars.com/api/?name=Usman+Ghani&background=F59E0B&color=fff&size=128", description: "Master electrician. 10 years experience in wiring, panel work, and solar installations.", skills: ["Wiring", "Panel Work", "Solar", "UPS Repair"] },
    { id: 5, name: "Bilal Ahmed", category: "Electrician", city: "Karachi", area: "Defense", phone: "0311-7778899", experience: 6, rating: 4.6, reviews: 29, price: "Rs. 600/visit", verified: true, available: false, whatsapp: "923117778899", photo: "https://ui-avatars.com/api/?name=Bilal+Ahmed&background=F59E0B&color=fff&size=128", description: "Certified electrician for commercial and residential projects.", skills: ["Wiring", "Fuse Box", "Earthing"] },
    { id: 6, name: "Adnan Raza", category: "Electrician", city: "Faisalabad", area: "Madina Town", phone: "0345-2223344", experience: 4, rating: 4.3, reviews: 17, price: "Rs. 500/visit", verified: false, available: true, whatsapp: "923452223344", photo: "https://ui-avatars.com/api/?name=Adnan+Raza&background=F59E0B&color=fff&size=128", description: "Affordable and honest electrician for home repairs.", skills: ["Home Wiring", "Light Fixtures", "Fan Repair"] },

    // ── AC REPAIR ────────────────────────────────────────────
    { id: 7, name: "Irfan Khan", category: "AC Repair", city: "Lahore", area: "DHA Phase 5", phone: "0309-5556677", experience: 7, rating: 4.7, reviews: 43, price: "Rs. 800/visit", verified: true, available: true, whatsapp: "923095556677", photo: "https://ui-avatars.com/api/?name=Irfan+Khan&background=10B981&color=fff&size=128", description: "AC specialist for all brands. Services include installation, gas refill, cleaning, and repair.", skills: ["Installation", "Gas Refill", "Cleaning", "Inverter AC"] },
    { id: 8, name: "Shahid Iqbal", category: "AC Repair", city: "Islamabad", area: "F-10", phone: "0322-8889900", experience: 5, rating: 4.4, reviews: 19, price: "Rs. 750/visit", verified: true, available: true, whatsapp: "923228889900", photo: "https://ui-avatars.com/api/?name=Shahid+Iqbal&background=10B981&color=fff&size=128", description: "Fast and reliable AC repair for all major brands.", skills: ["Split AC", "Window AC", "Gas Fill"] },
    { id: 9, name: "Hamza Saleem", category: "AC Repair", city: "Karachi", area: "North Nazimabad", phone: "0301-3334455", experience: 3, rating: 4.1, reviews: 9, price: "Rs. 650/visit", verified: false, available: false, whatsapp: "923013334455", photo: "https://ui-avatars.com/api/?name=Hamza+Saleem&background=10B981&color=fff&size=128", description: "AC technician available for emergency repairs.", skills: ["AC Repair", "Cleaning"] },

    // ── GENERATOR REPAIR ─────────────────────────────────────
    { id: 10, name: "Rizwan Hassan", category: "Generator Repair", city: "Lahore", area: "Gulberg", phone: "0333-6667788", experience: 9, rating: 4.8, reviews: 31, price: "Rs. 900/visit", verified: true, available: true, whatsapp: "923336667788", photo: "https://ui-avatars.com/api/?name=Rizwan+Hassan&background=EF4444&color=fff&size=128", description: "Generator repair expert. Handles Honda, Yamaha, Kirloskar, and other brands.", skills: ["Honda Gen", "Yamaha", "Engine Repair", "Winding"] },
    { id: 11, name: "Faisal Nawaz", category: "Generator Repair", city: "Rawalpindi", area: "Saddar", phone: "0346-0011223", experience: 6, rating: 4.5, reviews: 14, price: "Rs. 850/visit", verified: false, available: true, whatsapp: "923460011223", photo: "https://ui-avatars.com/api/?name=Faisal+Nawaz&background=EF4444&color=fff&size=128", description: "Experienced in all types of generator servicing and repair.", skills: ["Servicing", "Repair", "Parts Replacement"] },

    // ── CARPENTER ────────────────────────────────────────────
    { id: 12, name: "Khalid Hussain", category: "Carpenter", city: "Lahore", area: "Samnabad", phone: "0312-4445566", experience: 12, rating: 4.9, reviews: 62, price: "Rs. 1000/day", verified: true, available: true, whatsapp: "923124445566", photo: "https://ui-avatars.com/api/?name=Khalid+Hussain&background=8B5CF6&color=fff&size=128", description: "Master carpenter for furniture, doors, windows, and custom woodwork.", skills: ["Furniture", "Doors", "Windows", "Custom Work"] },
    { id: 13, name: "Javed Iqbal", category: "Carpenter", city: "Multan", area: "Gulgasht", phone: "0300-9990011", experience: 7, rating: 4.5, reviews: 27, price: "Rs. 900/day", verified: true, available: true, whatsapp: "923009990011", photo: "https://ui-avatars.com/api/?name=Javed+Iqbal&background=8B5CF6&color=fff&size=128", description: "Quality carpentry work at affordable rates.", skills: ["Furniture Repair", "Window Frames", "Shelves"] },

    // ── PAINTER ──────────────────────────────────────────────
    { id: 14, name: "Sajid Hussain", category: "Painter", city: "Lahore", area: "Allama Iqbal Town", phone: "0321-1112233", experience: 8, rating: 4.6, reviews: 39, price: "Rs. 800/day", verified: true, available: true, whatsapp: "923211112233", photo: "https://ui-avatars.com/api/?name=Sajid+Hussain&background=EC4899&color=fff&size=128", description: "Professional painter for interior and exterior. Handles all types of paints.", skills: ["Interior", "Exterior", "Wall Texture", "Polish"] },
    { id: 15, name: "Imtiaz Ahmed", category: "Painter", city: "Karachi", area: "Orangi Town", phone: "0345-4445566", experience: 5, rating: 4.2, reviews: 16, price: "Rs. 700/day", verified: false, available: true, whatsapp: "923454445566", photo: "https://ui-avatars.com/api/?name=Imtiaz+Ahmed&background=EC4899&color=fff&size=128", description: "House painting and polish work done with care.", skills: ["House Painting", "Polish", "Spray Paint"] },

    // ── CLEANER ──────────────────────────────────────────────
    { id: 16, name: "Aslam Khan", category: "Cleaner", city: "Lahore", area: "Bahria Town", phone: "0303-7778899", experience: 4, rating: 4.4, reviews: 22, price: "Rs. 600/day", verified: true, available: true, whatsapp: "923037778899", photo: "https://ui-avatars.com/api/?name=Aslam+Khan&background=06B6D4&color=fff&size=128", description: "Professional deep cleaning for homes and offices. Brings own equipment.", skills: ["Deep Clean", "Office Clean", "Carpet Wash", "Kitchen"] },
    { id: 17, name: "Zulfiqar Ali", category: "Cleaner", city: "Islamabad", area: "I-8", phone: "0312-0001122", experience: 3, rating: 4.1, reviews: 10, price: "Rs. 500/day", verified: false, available: true, whatsapp: "923120001122", photo: "https://ui-avatars.com/api/?name=Zulfiqar+Ali&background=06B6D4&color=fff&size=128", description: "Reliable cleaner for residential cleaning services.", skills: ["House Cleaning", "Bathroom Wash", "Window Cleaning"] },

    // ── DRIVER ───────────────────────────────────────────────
    { id: 18, name: "Shahzad Butt", category: "Driver", city: "Lahore", area: "Township", phone: "0300-2223344", experience: 6, rating: 4.7, reviews: 44, price: "Rs. 700/day", verified: true, available: true, whatsapp: "923002223344", photo: "https://ui-avatars.com/api/?name=Shahzad+Butt&background=F97316&color=fff&size=128", description: "Experienced and trustworthy driver for family trips, office, and market visits.", skills: ["City Drive", "Long Route", "Car Care", "Punctual"] },
    { id: 19, name: "Nadeem Ul Haq", category: "Driver", city: "Karachi", area: "Clifton", phone: "0322-5556677", experience: 9, rating: 4.9, reviews: 67, price: "Rs. 800/day", verified: true, available: true, whatsapp: "923225556677", photo: "https://ui-avatars.com/api/?name=Nadeem+Ul+Haq&background=F97316&color=fff&size=128", description: "Highly rated professional driver with clean record and knowledge of routes.", skills: ["Professional", "Navigation", "Long Drive", "Reliable"] },

    // ── MECHANIC ─────────────────────────────────────────────
    { id: 20, name: "Shafiq Rehman", category: "Mechanic", city: "Lahore", area: "Shahdara", phone: "0311-8889900", experience: 10, rating: 4.6, reviews: 35, price: "Rs. 500/hour", verified: true, available: true, whatsapp: "923118889900", photo: "https://ui-avatars.com/api/?name=Shafiq+Rehman&background=64748B&color=fff&size=128", description: "Auto mechanic for cars, bikes, and rickshaws. Engine, transmission, electrical.", skills: ["Engine Repair", "Brakes", "Electrical", "Oil Change"] },
    { id: 21, name: "Pervez Akhtar", category: "Mechanic", city: "Faisalabad", area: "Peoples Colony", phone: "0346-1112233", experience: 7, rating: 4.4, reviews: 18, price: "Rs. 400/hour", verified: false, available: true, whatsapp: "923461112233", photo: "https://ui-avatars.com/api/?name=Pervez+Akhtar&background=64748B&color=fff&size=128", description: "Bike and car mechanics at your doorstep.", skills: ["Bike Repair", "Car Service", "Tune Up"] },

    // ── BARBER ───────────────────────────────────────────────
    { id: 22, name: "Aqeel Siddiqui", category: "Barber", city: "Lahore", area: "Gulberg III", phone: "0300-3334455", experience: 5, rating: 4.5, reviews: 28, price: "Rs. 200/cut", verified: true, available: true, whatsapp: "923003334455", photo: "https://ui-avatars.com/api/?name=Aqeel+Siddiqui&background=A855F7&color=fff&size=128", description: "Home barber service. Hair cut, shaving, beard styling at your door.", skills: ["Hair Cut", "Beard", "Shaving", "Kids Cut"] },
    { id: 23, name: "Rafique Barber", category: "Barber", city: "Karachi", area: "Landhi", phone: "0321-4445566", experience: 8, rating: 4.3, reviews: 15, price: "Rs. 150/cut", verified: false, available: true, whatsapp: "923214445566", photo: "https://ui-avatars.com/api/?name=Rafique+Barber&background=A855F7&color=fff&size=128", description: "Experienced barber for home visits. Affordable service.", skills: ["Haircut", "Shave", "Trim"] },

    // ── WELDER ───────────────────────────────────────────────
    { id: 24, name: "Liaqat Ali Welder", category: "Welder", city: "Lahore", area: "Raiwind Road", phone: "0312-9990011", experience: 11, rating: 4.7, reviews: 37, price: "Rs. 800/day", verified: true, available: true, whatsapp: "923129990011", photo: "https://ui-avatars.com/api/?name=Liaqat+Ali&background=B45309&color=fff&size=128", description: "Expert welder for gates, grills, staircase railings, and custom metalwork.", skills: ["Gate Welding", "Grill", "Steel Work", "Arc Welding"] },

    // ── TAILOR ───────────────────────────────────────────────
    { id: 25, name: "Bashir Tailor", category: "Tailor", city: "Lahore", area: "Ichra", phone: "0300-7778899", experience: 15, rating: 4.9, reviews: 78, price: "Rs. 300/suit", verified: true, available: true, whatsapp: "923007778899", photo: "https://ui-avatars.com/api/?name=Bashir+Tailor&background=D946EF&color=fff&size=128", description: "Expert tailor for shalwar kameez, suits, and alterations. Home stitching available.", skills: ["Shalwar Kameez", "Suit", "Alteration", "Wedding Dress"] },

    // ── GARDENER ─────────────────────────────────────────────
    { id: 26, name: "Ghulam Rasool", category: "Gardener", city: "Islamabad", area: "F-7", phone: "0345-2223344", experience: 6, rating: 4.4, reviews: 20, price: "Rs. 500/visit", verified: false, available: true, whatsapp: "923452223344", photo: "https://ui-avatars.com/api/?name=Ghulam+Rasool&background=16A34A&color=fff&size=128", description: "Lawn maintenance, plant care, and garden design for homes and offices.", skills: ["Lawn Care", "Plant Care", "Tree Trim", "Garden Design"] },

    // ── PHOTOGRAPHER ─────────────────────────────────────────
    { id: 27, name: "Ali Raza Photo", category: "Photographer", city: "Lahore", area: "Sharif Pura", phone: "0303-0001122", experience: 4, rating: 4.5, reviews: 23, price: "Rs. 2000/event", verified: true, available: true, whatsapp: "923030001122", photo: "https://ui-avatars.com/api/?name=Ali+Raza&background=0EA5E9&color=fff&size=128", description: "Event, wedding, birthday, and product photography at affordable rates.", skills: ["Wedding", "Events", "Product", "Editing"] },

    // ── MOBILE REPAIR ────────────────────────────────────────
    { id: 28, name: "Waqas Mobile", category: "Mobile Repair", city: "Lahore", area: "Allama Iqbal Town", phone: "0322-1112233", experience: 4, rating: 4.3, reviews: 19, price: "Rs. 200–800", verified: false, available: true, whatsapp: "923221112233", photo: "https://ui-avatars.com/api/?name=Waqas+Mobile&background=7C3AED&color=fff&size=128", description: "Mobile phone repair: screen replacement, battery, charging port, software.", skills: ["Screen Fix", "Battery", "Software", "All Brands"] },
    { id: 29, name: "Zahid Mobile Tech", category: "Mobile Repair", city: "Karachi", area: "Orangi Town", phone: "0301-4445566", experience: 6, rating: 4.6, reviews: 31, price: "Rs. 200–1000", verified: true, available: true, whatsapp: "923014445566", photo: "https://ui-avatars.com/api/?name=Zahid+Mobile&background=7C3AED&color=fff&size=128", description: "All brands mobile repair at your doorstep with warranty.", skills: ["iPhone", "Samsung", "Oppo", "Vivo", "Motherboard"] },

    // ── APPLIANCE REPAIR ─────────────────────────────────────
    { id: 30, name: "Naeem Appliances", category: "Appliance Repair", city: "Lahore", area: "Township", phone: "0312-5556677", experience: 8, rating: 4.6, reviews: 33, price: "Rs. 500/visit", verified: true, available: true, whatsapp: "923125556677", photo: "https://ui-avatars.com/api/?name=Naeem+Appliances&background=DC2626&color=fff&size=128", description: "Fridge, washing machine, microwave, and TV repair at home.", skills: ["Fridge", "Washing Machine", "Microwave", "TV"] },

    // ── LOCKSMITH ─────────────────────────────────────────────
    { id: 31, name: "Saleem Locksmith", category: "Locksmith", city: "Lahore", area: "Gulberg", phone: "0300-8889900", experience: 9, rating: 4.7, reviews: 45, price: "Rs. 300/lock", verified: true, available: true, whatsapp: "923008889900", photo: "https://ui-avatars.com/api/?name=Saleem+Locksmith&background=1D4ED8&color=fff&size=128", description: "Door lock repair, new lock installation, and key duplication.", skills: ["Lock Repair", "Key Copy", "Door Lock", "Safes"] },

    // ── LAUNDRY ──────────────────────────────────────────────
    { id: 32, name: "Laundry House", category: "Laundry Worker", city: "Lahore", area: "Model Town", phone: "0322-3334455", experience: 5, rating: 4.2, reviews: 17, price: "Rs. 50/cloth", verified: false, available: true, whatsapp: "923223334455", photo: "https://ui-avatars.com/api/?name=Laundry+House&background=0891B2&color=fff&size=128", description: "Home pickup and delivery laundry service. Wash, iron, and fold.", skills: ["Wash", "Iron", "Pickup", "Delivery"] },

    // ── DELIVERY WORKER ──────────────────────────────────────
    { id: 33, name: "Kamran Delivery", category: "Delivery Worker", city: "Lahore", area: "All Areas", phone: "0303-5556677", experience: 3, rating: 4.3, reviews: 22, price: "Rs. 100–500", verified: false, available: true, whatsapp: "923035556677", photo: "https://ui-avatars.com/api/?name=Kamran+Delivery&background=059669&color=fff&size=128", description: "Reliable delivery boy for parcels, documents, and household items within city.", skills: ["Bike Delivery", "City-wide", "Fast", "Tracking"] },

    // ── SECURITY GUARD ───────────────────────────────────────
    { id: 34, name: "Zaid Security", category: "Security Guard", city: "Lahore", area: "DHA", phone: "0312-7778899", experience: 7, rating: 4.5, reviews: 19, price: "Rs. 1500/day", verified: true, available: true, whatsapp: "923127778899", photo: "https://ui-avatars.com/api/?name=Zaid+Security&background=374151&color=fff&size=128", description: "Ex-army trained security guard for events, buildings, and homes.", skills: ["CCTV", "Event Security", "Building Guard", "Night Shift"] },

    // ── COOK ─────────────────────────────────────────────────
    { id: 35, name: "Chef Azhar", category: "Cook", city: "Lahore", area: "Cantt", phone: "0300-1112233", experience: 12, rating: 4.9, reviews: 83, price: "Rs. 1200/day", verified: true, available: true, whatsapp: "923001112233", photo: "https://ui-avatars.com/api/?name=Chef+Azhar&background=B45309&color=fff&size=128", description: "Home chef for daily cooking, parties, and events. Pakistani and continental cuisine.", skills: ["Pakistani", "BBQ", "Baking", "Continental", "Event Cook"] },

    // ── TUTOR ────────────────────────────────────────────────
    { id: 36, name: "Sir Aqeel Tutor", category: "Tutor", city: "Islamabad", area: "G-9", phone: "0311-4445566", experience: 5, rating: 4.6, reviews: 26, price: "Rs. 400/hour", verified: true, available: true, whatsapp: "923114445566", photo: "https://ui-avatars.com/api/?name=Sir+Aqeel+Tutor&background=2563EB&color=fff&size=128", description: "Home tutor for grades 1–12. Math, Science, English, and Urdu.", skills: ["Math", "Science", "English", "Urdu", "O-Levels"] },
];

const REVIEWS = [
    { id: 1, name: "Rana Sajid", avatar: "RS", rating: 5, text: "Muhammad Asif fixed our pipe in 20 minutes. Very professional and affordable. Highly recommended!", service: "Plumber" },
    { id: 2, name: "Sara Malik", avatar: "SM", rating: 5, text: "Usman Ghani is amazing! He fixed our entire electrical panel. Very knowledgeable and honest.", service: "Electrician" },
    { id: 3, name: "Babar Aziz", avatar: "BA", rating: 4, text: "Irfan Khan serviced our AC and it works perfectly now. Will call him again next summer.", service: "AC Repair" },
    { id: 4, name: "Dr. Amna Rizvi", avatar: "AR", rating: 5, text: "Khalid Hussain made our kitchen cabinets beautifully. Amazing work at a great price!", service: "Carpenter" },
];

// ── localStorage DB ──────────────────────────────────────────────────────────
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

    // Called from register.html — saves as PENDING (not visible on public site)
    addWorker(w) {
        const reg = this._getRegistry();
        const newId = Date.now();
        reg.push({
            ...w,
            id: newId,
            status: 'pending',        // <-- awaiting admin approval
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

    // Admin approves a pending worker
    approveWorker(id) {
        const reg = this._getRegistry().map(w => w.id === id ? { ...w, status: 'approved', verified: true } : w);
        this._saveRegistry(reg);
    },

    // Admin rejects a pending worker
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
