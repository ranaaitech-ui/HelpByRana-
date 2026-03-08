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
// Auth State
let isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';

// Stored encoded credentials (base64 encoded, not plain text)
// btoa("admin") = "YWRtaW4="  |  btoa("admin123") = "YWRtaW4xMjM="
const _u = "YWRtaW4=";
const _p = "YWRtaW4xMjM=";

// Initialize Admin
function initAdmin() {
    if (!isLoggedIn) {
        document.getElementById('admin-login-overlay').style.display = 'flex';
        document.getElementById('login-form').addEventListener('submit', function (e) {
            e.preventDefault();
            const user = document.getElementById('admin-username').value.trim();
            const pass = document.getElementById('admin-password').value.trim();

            // Encode input and compare with stored encoded values
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

async function loadAdminData() {
    try {
        const token = sessionStorage.getItem('adminToken') || 'YWRtaW46YWRtaW4xMjM=';
        const allReg = await db.getAllRegistered(token);
        adminWorkers = allReg;

        // Update Badges
        const pendingWorkers = allReg.filter(w => w.status === 'pending');
        const pendingPayments = allReg.filter(w => w.payment_status === 'pending');

        document.getElementById('pendingCount').innerText = pendingWorkers.length;
        document.getElementById('paymentsCount').innerText = pendingPayments.length;
        document.getElementById('statPending').innerText = pendingWorkers.length;
        document.getElementById('statPayments').innerText = pendingPayments.length;
        document.getElementById('statTotal').innerText = adminWorkers.length;

        renderTable();
        setupEventListeners();

        // Setup Logout
        const navLinks = document.querySelector('.nav-links');
        const existingLogout = document.getElementById('nav-logout');
        if (!existingLogout && navLinks) {
            navLinks.innerHTML += `<a href="#" id="nav-logout" style="color: #EF4444; margin-left: 1rem;"><i class='bx bx-log-out'></i> Logout</a>`;
            document.getElementById('nav-logout').addEventListener('click', (e) => {
                e.preventDefault();
                sessionStorage.removeItem('adminLoggedIn');
                window.location.reload();
            });
        }
    } catch (err) {
        console.error("Failed to load admin data", err);
        alert("Failed to connect to Database. Please try again later.");
    }
}

function setupEventListeners() {
    // Navigation
    if (document.getElementById('navDash')) {
        document.getElementById('navDash').addEventListener('click', (e) => { e.preventDefault(); showDash(); });
    }
    if (navManage) navManage.addEventListener('click', (e) => { e.preventDefault(); showWorkerTable(); });
    if (navAdd) navAdd.addEventListener('click', (e) => { e.preventDefault(); showAddWorkerForm(); });
    if (navPending) navPending.addEventListener('click', (e) => { e.preventDefault(); showPendingReviews(); });
    if (navPayments) navPayments.addEventListener('click', (e) => { e.preventDefault(); showPendingPayments(); });

    if (document.getElementById('btnGoAdd2')) document.getElementById('btnGoAdd2').addEventListener('click', showAddWorkerForm);
    if (document.getElementById('btnBackFromAdd')) document.getElementById('btnBackFromAdd').addEventListener('click', showWorkerTable);

    // Form Submits
    workerForm.addEventListener('submit', handleAddWorker);
    if (categoryForm) categoryForm.addEventListener('submit', handleAddCategory);
}

function populateCategories() {
    categorySelect.innerHTML = adminCategories.map(cat =>
        `<option value="${cat.name || cat}">${cat.name || cat}</option>`
    ).join('');
}

// --- Views ---
function hideAllViews() {
    if (secDash) secDash.style.display = 'none';
    if (secWorkers) secWorkers.style.display = 'none';
    if (secAdd) secAdd.style.display = 'none';
    if (secPending) secPending.style.display = 'none';
    if (secPayments) secPayments.style.display = 'none';

    document.querySelectorAll('.sidebar a').forEach(l => l.classList.remove('active'));
}

function showDash() {
    hideAllViews();
    if (secDash) secDash.style.display = 'block';
    if (document.getElementById('navDash')) document.getElementById('navDash').classList.add('active');
    pageTitle.innerText = "Dashboard";
}

function showWorkerTable() {
    hideAllViews();
    if (secWorkers) secWorkers.style.display = 'block';
    if (navManage) navManage.classList.add('active');
    pageTitle.innerText = "All Workers";
}

function showAddWorkerForm() {
    hideAllViews();
    if (secAdd) secAdd.style.display = 'block';
    if (navAdd) navAdd.classList.add('active');
    pageTitle.innerText = "Add Worker";
}

function showPendingReviews() {
    hideAllViews();
    if (secPending) secPending.style.display = 'block';
    if (navPending) navPending.classList.add('active');
    pageTitle.innerText = "Pending Reviews";
    // Dummy render for now
    document.getElementById('pendingList').innerHTML = `<p class="text-dim">No pending registrations at the moment.</p>`;
}

function showPendingPayments() {
    hideAllViews();
    if (secPayments) secPayments.style.display = 'block';
    if (navPayments) navPayments.classList.add('active');
    pageTitle.innerText = "Pending Payments";
    renderPendingPayments();
}

function renderPendingPayments() {
    const listEl = document.getElementById('paymentsList');
    if (!listEl) return;

    const pending = adminWorkers.filter(w => w.payment_status === 'pending');

    if (pending.length === 0) {
        listEl.innerHTML = `
            <div style="text-align:center; padding: 3rem; background: var(--surface); border-radius: var(--radius-lg);">
                <i class='bx bx-check-circle' style="font-size:3rem; color:var(--primary-light); margin-bottom:1rem;"></i>
                <h3 style="color:var(--text-primary);">All Caught Up!</h3>
                <p class="text-dim">There are no pending payments to review.</p>
            </div>
        `;
        return;
    }

    listEl.innerHTML = pending.map(w => `
        <div style="background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-lg); padding:1.5rem; margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
            <div style="display:flex; gap:1rem; align-items:center;">
                <img src="${w.photo}" style="width:50px; height:50px; border-radius:50%; object-fit:cover;">
                <div>
                    <h3 style="margin:0; font-size:1.1rem; color:var(--text-primary);">${w.name}</h3>
                    <p style="margin:0; font-size:.85rem; color:var(--text-dim);">${w.category} • ${w.phone}</p>
                    <div style="margin-top:0.5rem; background:rgba(37, 99, 235, 0.1); padding:0.3rem 0.6rem; border-radius:4px; display:inline-block; font-family:monospace; color:var(--primary-light); font-weight:bold;">
                        TID: ${w.transactionId}
                    </div>
                </div>
            </div>
            <div style="display:flex; gap:0.5rem;">
                <button class="btn btn-primary" onclick="approvePayment(${w.id})"><i class='bx bx-check'></i> Verify</button>
                <button class="btn btn-outline" style="color:var(--danger); border-color:var(--danger);" onclick="rejectPayment(${w.id})"><i class='bx bx-x'></i> Reject</button>
            </div>
        </div>
    `).join('');
}

window.approvePayment = async function (id) {
    if (confirm('Are you sure you verified this TID in your JazzCash/Easypaisa app?')) {
        const token = sessionStorage.getItem('adminToken') || 'YWRtaW46YWRtaW4xMjM=';
        await db.verifyPayment(id, token);
        await loadAdminData(); // Refresh badges and lists
        showPendingPayments();
    }
}

window.rejectPayment = async function (id) {
    if (confirm('Are you sure you want to reject this payment? The worker will be asked to try again.')) {
        const token = sessionStorage.getItem('adminToken') || 'YWRtaW46YWRtaW4xMjM=';
        await db.rejectPayment(id, token);
        await loadAdminData();
        showPendingPayments();
    }
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
                        <div style="font-weight: 600;">${w.name} ${w.paymentStatus === 'verified' ? '<i class="bx bxs-badge-check" style="color:var(--secondary); font-size:14px;" title="Payment Verified"></i>' : ''}</div>
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
                    ${w.paymentStatus === 'verified' ? `<span style="color: #3B82F6; font-size: 0.78rem; font-weight:600;">✓ Verified</span>` : ''}
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

    const newWorker = {
        name: document.getElementById('w-name').value,
        category: document.getElementById('w-category').value,
        phone: document.getElementById('w-phone').value,
        location: document.getElementById('w-location').value,
        experience: parseInt(document.getElementById('w-exp').value),
        price: document.getElementById('w-price').value,
        description: document.getElementById('w-desc').value,
        rating: 5.0, // Default for new
        reviewsCount: 0,
        availability: "Available Today",
        skills: [document.getElementById('w-category').value]
    };

    db.addWorker(newWorker);
    adminWorkers = db.getWorkers(); // Refresh
    renderTable();
    showWorkerTable();

    alert(`Successfully added ${newWorker.name}!`);
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
