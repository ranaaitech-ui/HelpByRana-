// State
let currentView = 'home';
let workers = [];
let categories = [];
let currentCategory = null; // For filtering

// DOM Elements
const views = {
    home: document.getElementById('view-home'),
    categories: document.getElementById('view-categories')
};

const navLinks = {
    home: document.getElementById('nav-home'),
    categories: document.getElementById('nav-categories'),
    admin: document.getElementById('nav-admin')
};

const elements = {
    featuredGrid: document.getElementById('featured-grid'),
    categoryContainer: document.getElementById('category-container'),
    categoryListContainer: document.getElementById('category-list-container'),
    mainSearch: document.getElementById('main-search'),
    searchBtn: document.getElementById('search-btn'),
    quickLinks: document.querySelectorAll('.quick-link'),
    filterExperience: document.getElementById('filter-experience'),
    filterRating: document.getElementById('filter-rating'),
    profileModal: document.getElementById('profile-modal'),
    closeProfile: document.getElementById('close-profile'),
    profileContent: document.getElementById('profile-content'),
    mobileMenuBtn: document.querySelector('.mobile-menu-btn'),
    navLinksContainer: document.querySelector('.nav-links')
};

// Initialize App
function initApp() {
    // Load data from DB
    workers = db.getWorkers();
    categories = db.getCategories();

    // Set up event listeners
    setupEventListeners();

    // Initial Render
    renderFeaturedWorkers();
    renderAllCategories();

    // Handle hash routing on load
    handleNavigation();
}

// Event Listeners Setup
function setupEventListeners() {
    // Navigation
    window.addEventListener('hashchange', handleNavigation);

    navLinks.home.addEventListener('click', (e) => { e.preventDefault(); navigateTo('home'); });
    navLinks.categories.addEventListener('click', (e) => { e.preventDefault(); navigateTo('categories'); });
    // Admin link points to separate page
    navLinks.admin.addEventListener('click', (e) => {
        window.location.href = 'admin.html';
    });

    // Search & Filters
    if (elements.searchBtn) {
        elements.searchBtn.addEventListener('click', handleSearch);
    }
    if (elements.mainSearch) {
        elements.mainSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }

    elements.quickLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const cat = e.target.getAttribute('data-cat');
            // Navigate to categories and filter
            elements.mainSearch.value = cat;
            navigateTo('categories');
            handleSearch();
        });
    });

    if (elements.filterExperience) elements.filterExperience.addEventListener('change', reRenderCategories);
    if (elements.filterRating) elements.filterRating.addEventListener('change', reRenderCategories);

    // Modal Close
    elements.closeProfile.addEventListener('click', closeProfileModal);
    elements.profileModal.addEventListener('click', (e) => {
        if (e.target === elements.profileModal) closeProfileModal();
    });

    // Mobile Menu Toggle
    if (elements.mobileMenuBtn) {
        elements.mobileMenuBtn.addEventListener('click', () => {
            elements.navLinksContainer.classList.toggle('active');
        });
    }
}

// Navigation Logic
function handleNavigation() {
    const hash = window.location.hash.substring(1);
    const viewName = hash || 'home';
    navigateTo(viewName);
}

function navigateTo(viewName) {
    if (!views[viewName]) return;

    // Update State
    currentView = viewName;
    window.location.hash = viewName === 'home' ? '' : viewName;

    // Update DOM Views
    Object.values(views).forEach(v => v.classList.remove('active-view'));
    views[viewName].classList.add('active-view');

    // Update Nav Links
    Object.values(navLinks).forEach(link => {
        if (link && !link.classList.contains('btn-outline')) {
            link.classList.remove('active');
        }
    });

    if (navLinks[viewName] && !navLinks[viewName].classList.contains('btn-outline')) {
        navLinks[viewName].classList.add('active');
    }

    // Scroll top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Rendering Logic
function renderWorkerCard(worker) {
    return `
        <div class="worker-card" onclick="openProfileModal(${worker.id})">
            <div class="worker-header">
                <img src="${worker.photo}" alt="${worker.name}" class="worker-photo">
                <div class="worker-info">
                    <h3>${worker.name}</h3>
                    <span class="worker-category">${worker.category}</span>
                </div>
            </div>
            <div class="worker-details">
                <div class="detail-item">
                    <i class='bx bx-map'></i>
                    <span>${worker.location}</span>
                </div>
                <div class="detail-item">
                    <i class='bx bx-briefcase'></i>
                    <span>${worker.experience} Years Exp.</span>
                </div>
            </div>
            <div class="worker-footer">
                <div class="rating-badge">
                    <i class='bx bxs-star'></i>
                    ${worker.rating} (${worker.reviewsCount})
                </div>
                <div class="price">
                    ${worker.price}
                </div>
            </div>
            ${worker.availability.includes('Today') ? `<div class="badge" style="position: absolute; top: 1rem; right: 1rem; margin:0;">Verified</div>` : ''}
        </div>
    `;
}

function renderFeaturedWorkers() {
    if (!elements.featuredGrid) return;

    // Get top 8 rated workers
    const topWorkers = [...workers]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);

    elements.featuredGrid.innerHTML = topWorkers.map(renderWorkerCard).join('');
}

function renderAllCategories(filteredWorkers = workers, searchQuery = '') {
    if (!elements.categoryListContainer) return;

    const container = elements.categoryListContainer;
    container.innerHTML = '';

    // Check if we have an active category hero to show
    renderCategoryHero(searchQuery);

    // Group workers by category
    const grouped = {};
    filteredWorkers.forEach(w => {
        if (!grouped[w.category]) grouped[w.category] = [];
        grouped[w.category].push(w);
    });

    // Sort categories alphabetically that have workers
    const availableCategories = Object.keys(grouped).sort();

    if (availableCategories.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary); background: var(--surface); border-radius: var(--radius-lg); margin-top:2rem;">
                <i class='bx bx-search' style="font-size: 3rem; margin-bottom: 1rem; color: var(--primary-light);"></i>
                <h3 style="color: var(--text-primary);">No professionals found matching your criteria.</h3>
                <p>Try adjusting your search or filters.</p>
                <button class="btn-primary mt-4" style="margin-top: 1rem;" onclick="clearSearch()">Clear Filters</button>
            </div>
        `;
        return;
    }

    availableCategories.forEach(cat => {
        const catWorkers = grouped[cat];

        const catDiv = document.createElement('div');
        catDiv.className = 'category-group';

        catDiv.innerHTML = `
            <div class="category-title" style="margin-top: 2rem;">
                <h3 style="color: var(--text-primary); font-size: 1.75rem;">${cat}</h3>
                <span class="badge" style="margin: 0;">${catWorkers.length} Providers</span>
            </div>
            <div class="grid">
                ${catWorkers.map(renderWorkerCard).join('')}
            </div>
        `;

        container.appendChild(catDiv);
    });
}

function renderCategoryHero(query) {
    // Remove existing hero if any
    const existingHero = document.getElementById('dynamic-category-hero');
    if (existingHero) existingHero.remove();

    if (!query || query.trim() === '') return;

    // Check if this query exactly matches a category name
    const matchingCat = categories.find(c => c.name.toLowerCase() === query.toLowerCase());

    if (matchingCat) {
        const heroDiv = document.createElement('div');
        heroDiv.id = 'dynamic-category-hero';
        heroDiv.className = 'category-hero';
        heroDiv.innerHTML = `
            <img src="${matchingCat.image}" alt="${matchingCat.name} Services">
            <div class="category-hero-overlay"></div>
            <div class="category-hero-content">
                <div>
                    <h1 class="category-hero-title">${matchingCat.name} Services</h1>
                    <p style="color: var(--text-secondary); font-size: 1.1rem; max-width: 500px;">Browse top-rated, verified ${matchingCat.name.toLowerCase()} professionals in your area. Use the filters below to refine your search.</p>
                </div>
            </div>
        `;

        elements.categoryContainer.prepend(heroDiv);
    }
}

// Search & Filter Logic
function handleSearch() {
    const query = elements.mainSearch.value.toLowerCase().trim();
    navigateTo('categories');
    reRenderCategories(query);
}

window.clearSearch = function () {
    elements.mainSearch.value = '';
    elements.filterExperience.value = '';
    elements.filterRating.value = '';
    reRenderCategories();
}

function reRenderCategories(searchOverride = null) {
    const query = searchOverride !== null ? searchOverride : elements.mainSearch.value.toLowerCase().trim();
    const expFilter = parseInt(elements.filterExperience.value) || 0;
    const ratingFilter = parseFloat(elements.filterRating.value) || 0;

    const filtered = workers.filter(w => {
        // Search Match
        const matchSearch = query === '' ||
            w.name.toLowerCase().includes(query) ||
            w.category.toLowerCase().includes(query) ||
            w.location.toLowerCase().includes(query) ||
            w.skills.some(s => s.toLowerCase().includes(query));

        // Filter Match
        const matchExp = w.experience >= expFilter;
        const matchRating = w.rating >= ratingFilter;

        return matchSearch && matchExp && matchRating;
    });

    renderAllCategories(filtered, query);
}

// Modal Profile Logic
window.openProfileModal = function (workerId) {
    const worker = workers.find(w => w.id === workerId);
    if (!worker) return;

    elements.profileContent.innerHTML = `
        <div class="profile-cover"></div>
        <div class="profile-body">
            <div class="profile-header">
                <img src="${worker.photo}" alt="${worker.name}" class="profile-photo">
                <div class="profile-actions">
                    <a href="tel:${worker.phone}" class="btn-primary"><i class='bx bx-phone'></i> Call Now</a>
                    <button class="btn-icon"><i class='bx bx-bookmark' ></i></button>
                    <button class="btn-icon"><i class='bx bx-share-alt' ></i></button>
                </div>
            </div>
            
            <div class="profile-info">
                <h2>${worker.name} <i class='bx bxs-badge-check' style="color: var(--primary); font-size: 1.25rem;"></i></h2>
                <span class="badge" style="margin-bottom: 0.5rem;">${worker.category}</span>
                
                <div class="profile-meta mt-4">
                    <span><i class='bx bx-map'></i> ${worker.location}</span>
                    <span><i class='bx bxs-star' style="color: var(--accent);"></i> ${worker.rating} (${worker.reviewsCount} Reviews)</span>
                    <span><i class='bx bx-time'></i> ${worker.availability}</span>
                </div>
                
                <div class="profile-section">
                    <h4>About</h4>
                    <p>${worker.description}</p>
                </div>
                
                <div class="profile-section">
                    <h4>Skills & Expertise</h4>
                    <div class="skills-tags">
                        ${worker.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                    </div>
                </div>
                
                <div class="profile-section">
                    <h4>Rates & Pricing</h4>
                    <p>Estimated Pricing: <strong>${worker.price}</strong>. <br><small>Final price may vary based on actual work required. Please confirm on call.</small></p>
                </div>
                
                <div class="contact-box">
                    <h3>Contact Information</h3>
                    <p>${worker.phone}</p>
                    <span style="color: var(--text-secondary); font-size: 0.9rem;">Mention <strong>Help By Rana</strong> when calling</span>
                </div>
            </div>
        </div>
    `;

    elements.profileModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeProfileModal() {
    elements.profileModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore background scrolling
    setTimeout(() => {
        elements.profileContent.innerHTML = '';
    }, 300);
}

// Boot
document.addEventListener('DOMContentLoaded', initApp);
