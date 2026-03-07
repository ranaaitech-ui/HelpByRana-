// Admin State
let adminWorkers = [];
let adminCategories = [];

// DOM Elements
const tbody = document.getElementById('workers-tbody');
const formContainer = document.getElementById('add-worker-form');
const tableContainer = document.getElementById('workers-table-container');

const catFormContainer = document.getElementById('add-category-form');
const catTableContainer = document.getElementById('categories-table-container');
const catTbody = document.getElementById('categories-tbody');
const categoryForm = document.getElementById('category-form');

const btnToggleAdd = document.getElementById('btn-toggle-add');
const btnToggleCat = document.getElementById('btn-toggle-cat');
const btnCancelAdd = document.getElementById('btn-cancel-add');
const btnCancelCat = document.getElementById('btn-cancel-cat');

const workerForm = document.getElementById('worker-form');
const categorySelect = document.getElementById('w-category');
const pageTitle = document.getElementById('page-title');

const navManage = document.getElementById('link-manage');
const navAdd = document.getElementById('link-add');
const navCategories = document.getElementById('link-categories');
const navReviews = document.getElementById('link-reviews');

// Auth State
let isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';

// Encoded credentials (base64)
const _u = "YWRtaW4=";       // admin
const _p = "YWRtaW4xMjM=";   // admin123

// Initialize Admin
function initAdmin() {
    if (!isLoggedIn) {
        document.getElementById('admin-login-overlay').style.display = 'flex';
        document.getElementById('login-form').addEventListener('submit', function (e) {
            e.preventDefault();
            const user = document.getElementById('admin-username').value.trim();
            const pass = document.getElementById('admin-password').value.trim();
            if (btoa(user) === _u && btoa(pass) === _p) {
                sessionStorage.setItem('adminLoggedIn', 'true');
                document.getElementById('admin-login-overlay').style.display = 'none';
                loadAdminData();
            } else {
                document.getElementById('login-error').style.display = 'block';
            }
        });
    } else {
        document.getElementById('admin-login-overlay').style.display = 'none';
        loadAdminData();
    }
}

function loadAdminData() {
    adminWorkers = db.getWorkers();
    adminCategories = db.getCategories();

    populateCategories();
    renderTable();
    setupEventListeners();

    // Add logout button
    const navLinksEl = document.querySelector('.nav-links');
    if (navLinksEl && !document.getElementById('nav-logout')) {
        navLinksEl.innerHTML += `<a href="#" id="nav-logout" style="color:#EF4444;margin-left:1rem;"><i class='bx bx-log-out'></i> Logout</a>`;
        document.getElementById('nav-logout').addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('adminLoggedIn');
            window.location.reload();
        });
    }
}

function setupEventListeners() {
    // Workers Navigation
    btnToggleAdd.addEventListener('click', showAddWorkerForm);
    navAdd.addEventListener('click', (e) => { e.preventDefault(); showAddWorkerForm(); });
    btnCancelAdd.addEventListener('click', showWorkerTable);
    navManage.addEventListener('click', (e) => { e.preventDefault(); showWorkerTable(); });

    // Categories Navigation
    if (navCategories) {
        navCategories.addEventListener('click', (e) => { e.preventDefault(); showCategoryTable(); });
    }
    if (btnToggleCat) btnToggleCat.addEventListener('click', showAddCategoryForm);
    if (btnCancelCat) btnCancelCat.addEventListener('click', showCategoryTable);

    // Form Submits
    workerForm.addEventListener('submit', handleAddWorker);
    if (categoryForm) categoryForm.addEventListener('submit', handleAddCategory);
}

function populateCategories() {
    categorySelect.innerHTML = adminCategories.map(cat =>
        `<option value="${cat.name || cat}">${cat.name || cat}</option>`
    ).join('');
}

// --- Worker Views ---
function showAddWorkerForm() {
    hideAllViews();
    formContainer.style.display = 'block';
    pageTitle.innerText = "Add New Worker";
    navAdd.classList.add('active');
}

function showWorkerTable() {
    hideAllViews();
    tableContainer.style.display = 'block';
    if (btnToggleAdd) btnToggleAdd.style.display = 'inline-flex';
    pageTitle.innerText = "Manage Workers";
    navManage.classList.add('active');
    workerForm.reset();
}

// --- Category Views ---
function showCategoryTable() {
    hideAllViews();
    if (catTableContainer) catTableContainer.style.display = 'block';
    if (btnToggleCat) btnToggleCat.style.display = 'inline-flex';
    pageTitle.innerText = "Manage Categories";
    if (navCategories) navCategories.classList.add('active');
    renderCategoryTable();
}

function showAddCategoryForm() {
    hideAllViews();
    if (catFormContainer) catFormContainer.style.display = 'block';
    pageTitle.innerText = "Add New Category";
    if (navCategories) navCategories.classList.add('active');
}

function hideAllViews() {
    formContainer.style.display = 'none';
    tableContainer.style.display = 'none';
    if (catFormContainer) catFormContainer.style.display = 'none';
    if (catTableContainer) catTableContainer.style.display = 'none';

    if (btnToggleAdd) btnToggleAdd.style.display = 'none';
    if (btnToggleCat) btnToggleCat.style.display = 'none';

    [navManage, navAdd, navCategories, navReviews].forEach(l => {
        if (l && typeof l.classList !== 'undefined') l.classList.remove('active');
    });
}

function renderTable() {
    if (adminWorkers.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">No workers found.</td></tr>`;
        return;
    }

    tbody.innerHTML = adminWorkers.map(w => `
        <tr>
            <td>#${w.id}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <img src="${w.photo}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border);">
                    <div>
                        <div style="font-weight: 600;">${w.name}</div>
                        <div style="font-size:.75rem;color:var(--text-dim);">${w.phone || ''}</div>
                    </div>
                </div>
            </td>
            <td><span class="badge" style="margin: 0;">${w.category}</span></td>
            <td>${w.area ? w.area + ', ' : ''}${w.city || w.location || '—'}</td>
            <td>
                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                    <span style="font-size: 0.85rem; color: var(--accent); font-weight:700;">⭐ ${w.rating}</span>
                    ${(w.available !== undefined ? w.available : (w.availability || '').includes('Today')) ?
            `<span style="color: #10B981; font-size: 0.8rem; font-weight: 500;">✓ Available</span>` :
            `<span style="color: var(--text-dim); font-size: 0.8rem;">Busy</span>`}
                    ${w.verified ? `<span style="color: #3B82F6; font-size: 0.78rem; font-weight:600;">✓ Verified</span>` : ''}
                </div>
            </td>
            <td>
                <div class="action-btns">
                    <a href="profile.html?id=${w.id}" class="btn-success btn-small" style="display:inline-flex;align-items:center;padding:.3rem .6rem;border-radius:6px;font-size:.8rem;" title="View Profile">
                        <i class='bx bx-show'></i>
                    </a>
                    <button class="btn-danger btn-small" onclick="deleteWorker(${w.id})" title="Delete Worker" style="padding:.3rem .6rem;border-radius:6px;font-size:.8rem;">
                        <i class='bx bx-trash'></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function handleAddWorker(e) {
    e.preventDefault();

    const location = document.getElementById('w-location').value;
    const [area, ...cityParts] = location.split(',').map(s => s.trim());
    const city = cityParts.join(',').trim() || area;

    const newWorker = {
        name: document.getElementById('w-name').value.trim(),
        category: document.getElementById('w-category').value,
        phone: document.getElementById('w-phone').value.trim(),
        whatsapp: '92' + document.getElementById('w-phone').value.replace(/^0/, '').replace(/-/g, ''),
        area: area,
        city: city,
        experience: parseInt(document.getElementById('w-exp').value),
        price: document.getElementById('w-price').value.trim(),
        description: document.getElementById('w-desc').value.trim(),
        rating: 5.0,
        reviews: 0,
        available: true,
        verified: false,
        skills: [document.getElementById('w-category').value]
    };

    db.addWorker(newWorker);
    adminWorkers = db.getWorkers();
    renderTable();
    showWorkerTable();

    alert(`✅ Successfully added ${newWorker.name}!`);
}

function handleAddCategory(e) {
    e.preventDefault();
    const catName = document.getElementById('c-name').value;

    db.addCategory(catName);
    adminCategories = db.getCategories(); // Refresh
    populateCategories(); // Refresh worker select

    showCategoryTable();
    alert(`Successfully added category ${catName}!`);
}

function renderCategoryTable() {
    if (!catTbody) return;

    if (adminCategories.length === 0) {
        catTbody.innerHTML = `<tr><td colspan="2" style="text-align: center;">No categories found.</td></tr>`;
        return;
    }

    catTbody.innerHTML = adminCategories.map(c => {
        const name = typeof c === 'string' ? c : c.name;
        const img = typeof c === 'string' ? 'https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?w=600&h=200&fit=crop&q=80' : c.image;
        return `
        <tr>
            <td>
                <img src="${img}" style="height: 60px; width: 120px; border-radius: var(--radius-sm); object-fit: cover;">
            </td>
            <td style="font-weight: 500; font-size: 1.1rem; color: var(--text-primary);">
                ${name}
            </td>
        </tr>
    `}).join('');
}

window.deleteWorker = function (id) {
    if (confirm('Are you sure you want to delete this worker?')) {
        db.deleteWorker(id);
        adminWorkers = db.getWorkers(); // Refresh
        renderTable();
    }
}

window.verifyWorker = function (id) {
    // Dummy verification toggle
    const workerIndex = adminWorkers.findIndex(w => w.id === id);
    if (workerIndex !== -1) {
        // Toggle validation status via availability message for simplicity
        if (adminWorkers[workerIndex].availability.includes('Today')) {
            adminWorkers[workerIndex].availability = "Available Tomorrow (Unverified)";
        } else {
            adminWorkers[workerIndex].availability = "Available Today (Verified Contact)";
        }
        db.saveData({ categories: adminCategories, workers: adminWorkers });
        renderTable();
        alert('Verification status updated!');
    }
}

// Boot
document.addEventListener('DOMContentLoaded', initAdmin);
