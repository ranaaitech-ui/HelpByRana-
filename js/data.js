// Local Storage Key
const DB_KEY = 'help_by_rana_db';

// Base dummy data if nothing exists in localStorage
const baseCategoriesList = [
    "Plumber", "Electrician", "Barber", "Cobbler/Shoemaker", "Mechanic", "Carpenter",
    "Painter", "Mason", "Welder", "Gardener", "Tailor", "Driver", "Cleaner",
    "Electronics repair", "Baker", "Butcher", "Grocery shopkeeper", "Tea stall",
    "Washer", "Mobile recharge agent", "Delivery person", "Security guard",
    "Construction laborer", "Rickshaw puller", "Milkman", "Water seller",
    "Cobbler/Leatherworker", "Cycle repair", "Photographer", "Typist",
    "Tailor for uniforms", "Home appliance repair", "AC/Fridge repair", "Car wash",
    "Street cleaner", "Welding shop", "Electric pole repair", "Fruit/Vegetable vendor",
    "Fish seller", "Poultry worker", "Carpet cleaner", "Plasterer", "Glass/Mirror worker",
    "Signboard/Flex printing", "Delivery boy", "Cycle rickshaw repair", "Shoe polisher",
    "Locksmith", "Generator repair"
];

const initialCategories = baseCategoriesList.map(cat => ({
    name: cat,
    image: `https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?w=600&h=200&fit=crop&q=80` // Premium placeholder
}));

const firstNames = ["Ali", "Ahmed", "Rana", "Bilal", "Usman", "Umar", "Tariq", "Hassan", "Hussain", "Hamza", "Kamran", "Salman", "Imran", "Zeeshan", "Nadeem", "Yasir", "Waqas", "Shahid", "Kashif", "Asif", "Sajid", "Majid", "Adnan", "Faisal", "Tahir", "Numan", "Junaid", "Farhan", "Babar", "Fawad", "Ahsan", "Haris", "Zubair", "Talha", "Saad", "Waseem", "Zahid"];
const lastNames = ["Khan", "Shah", "Malik", "Ahmad", "Chaudhry", "Raja", "Sheikh", "Qureshi", "Hussain", "Raza", "Ansari", "Mughal", "Ali", "Gill", "Siddiqui"];
const locations = ["Model Town, Lahore", "DHA Phase 5, Lahore", "Gulberg III, Lahore", "Johar Town, Lahore", "Iqbal Town, Lahore", "Bahria Town, Lahore", "Cantt, Lahore", "Garden Town, Lahore", "Faisal Town, Lahore", "Wapda Town, Lahore", "Township, Lahore", "Clifton, Karachi", "DHA Phase 6, Karachi", "Gulshan-e-Iqbal, Karachi", "Tariq Road, Karachi", "F-8, Islamabad", "G-11, Islamabad", "Blue Area, Islamabad", "Satellite Town, Rawalpindi", "Saddar, Rawalpindi"];

// Helper function to generate dummy workers
function generateDummyWorkers() {
    let workers = [];
    let idCounter = 1;

    initialCategories.forEach(categoryObj => {
        const category = categoryObj.name;
        // Generate 2 to 3 workers per category
        const numWorkers = Math.floor(Math.random() * 2) + 2;

        for (let i = 0; i < numWorkers; i++) {
            const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const loc = locations[Math.floor(Math.random() * locations.length)];
            const exp = Math.floor(Math.random() * 15) + 1; // 1 to 15 years
            const rating = (Math.random() * 1.5 + 3.5).toFixed(1); // 3.5 to 5.0 rating
            const reviews = Math.floor(Math.random() * 50) + 5;

            // Generate a dummy phone number format 03XX-XXXXXXX
            const networkCodes = ["0300", "0301", "0321", "0333", "0345", "0312"];
            const code = networkCodes[Math.floor(Math.random() * networkCodes.length)];
            const suffix = Math.floor(1000000 + Math.random() * 9000000);
            const phone = `${code}-${suffix}`;

            // Generate a random price
            const basePrice = Math.floor(Math.random() * 1500) + 500;
            const priceStr = `Rs. ${basePrice} / visit`;

            workers.push({
                id: idCounter++,
                name: `${fName} ${lName}`,
                category: category,
                phone: phone,
                location: loc,
                experience: exp,
                rating: parseFloat(rating),
                reviewsCount: reviews,
                price: priceStr,
                availability: Math.random() > 0.1 ? "Available Today" : "Available Tomorrow",
                skills: [category, "Repair", "Maintenance"],
                description: `Experienced ${category.toLowerCase()} with over ${exp} years of hands-on experience in ${loc}. Providing reliable and prompt service for all your needs.`,
                // Use a generic placeholder image from ui-avatars since we don't have real photos
                photo: `https://ui-avatars.com/api/?name=${fName}+${lName}&background=random&color=fff&size=150`
            });
        }
    });

    return workers;
}

// Database module
const db = {
    // Initialize DB if empty
    init() {
        if (!localStorage.getItem(DB_KEY)) {
            const initialData = {
                categories: initialCategories,
                workers: generateDummyWorkers()
            };
            localStorage.setItem(DB_KEY, JSON.stringify(initialData));
            console.log("Database initialized with dummy data!");
        }
    },

    // Get all data
    getData() {
        return JSON.parse(localStorage.getItem(DB_KEY));
    },

    // Get all workers
    getWorkers() {
        return this.getData().workers;
    },

    // Get all categories data (handles legacy string arrays or new object arrays)
    getCategories() {
        const data = this.getData();
        if (data.categories.length > 0 && typeof data.categories[0] === 'string') {
            // Upgrade legacy string format
            return data.categories.map(cat => ({ name: cat, image: 'https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?w=600&h=200&fit=crop&q=80' }));
        }
        return data.categories;
    },

    // Add a category
    addCategory(name) {
        const data = this.getData();
        const existing = data.categories.find(c => (typeof c === 'string' ? c : c.name).toLowerCase() === name.toLowerCase());
        if (!existing) {
            data.categories.push({ name: name, image: 'https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?w=600&h=200&fit=crop&q=80' });
            this.saveData(data);
        }
    },

    // Save new state
    saveData(data) {
        localStorage.setItem(DB_KEY, JSON.stringify(data));
    },

    // Add a worker
    addWorker(worker) {
        const data = this.getData();
        // Determine new ID
        const newId = data.workers.length > 0 ? Math.max(...data.workers.map(w => w.id)) + 1 : 1;
        worker.id = newId;
        // Ensure photo exists
        if (!worker.photo) {
            const nameParts = worker.name.split(" ");
            worker.photo = `https://ui-avatars.com/api/?name=${nameParts[0]}+${nameParts[1] || ''}&background=random&color=fff&size=150`;
        }
        data.workers.unshift(worker); // Add to top
        this.saveData(data);
        return worker;
    },

    // Delete worker
    deleteWorker(id) {
        const data = this.getData();
        data.workers = data.workers.filter(w => w.id !== id);
        this.saveData(data);
    }
};

// Auto-initialize on script load
db.init();
