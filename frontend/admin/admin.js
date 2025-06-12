const API_BASE_URL = 'http://localhost:3000/api';

async function fetchOrdersData() {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}

async function fetchUsersData() {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

async function fetchMenusData() {
    try {
        const response = await fetch(`${API_BASE_URL}/menu`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching menus:', error);
        return [];
    }
}

async function fetchPaymentsData() {
    try {
        const response = await fetch(`${API_BASE_URL}/payment`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching payments:', error);
        return [];
    }
}

// Navigation functionality

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            // Hide all sections
            document.querySelectorAll('.main-content > div').forEach(div => {
                div.classList.add('d-none');
            });
            // Show selected section
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.remove('d-none');
            
            // Load data when switching to specific sections
            if (targetId === 'menu') {
                getMenus();
            } else if (targetId === 'orders') {
                getOrders();
            } else if (targetId === 'payments') {
                getPayments();
            } else if (targetId === 'users') {
                getUsers();
            }
        }
    });
});

// Form submission

document.getElementById('addItemForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data as FormData object
    const formData = new FormData(this);
    
    // Convert FormData to JSON object
    const jsonData = {
        nama: formData.get('nama'),
        id_kategori: parseInt(formData.get('id_kategori')),
        harga: parseInt(formData.get('harga')),
        gambar: formData.get('gambar')
    };

    try {
        const response = await fetch('http://localhost:3000/api/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        if (response.ok) {
            const result = await response.json();
            alert('Item added successfully!');
            const modal = bootstrap.Modal.getInstance(document.getElementById('addItemModal'));
            modal.hide();
            // Refresh the menu list
            getMenus();
            // Reset the form
            this.reset();
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Failed to add item');
        }
    } catch (error) {
        console.error('Error adding menu item:', error);
        alert(error.message || 'Failed to add item. Please try again later.');
    }
});

// Orders management logic

document.addEventListener('DOMContentLoaded', function() {
    // Orders
    async function getOrders() {
        const response = await fetch('http://localhost:3000/api/orders');
        const orders = await response.json();
        console.log(orders);
        const tbody = document.getElementById('ordersTableBody');
        tbody.innerHTML = ''; // Clear previous rows

        orders.forEach(order => {
            // For each order, you may want to display all order_items in separate rows or as a list in one row
            order.order_items.forEach((item, idx) => {
                const tr = document.createElement('tr');
                const totalHarga = item.harga_satuan * item.jumlah;
                // Only show order info in the first row for this order
                tr.innerHTML = `
                    ${idx === 0 ? `<td rowspan="${order.order_items.length}">${order.id_order}</td>` : ''}
                    <td>${order.user.username}</td>
                    <td>${item.menu ? item.menu.nama : '-'}</td>
                    <td>Rp ${item.harga_satuan.toLocaleString('id-ID')}</td>
                    <td>${item.jumlah}</td>
                    <td>Rp ${item.subtotal}</td>
                    <td>Rp ${order.total}</td>
                    ${idx === 0 ? `<td rowspan="${order.order_items.length}">${order.status}</td>` : ''}
                    ${idx === 0 ? `
                    <td rowspan="${order.order_items.length}">
                        <button class="btn btn-success order-complete" ${order.status === 'Completed' ? 'disabled' : ''}>Complete</button>
                        <button class="btn btn-danger order-cancel" ${order.status === 'Cancelled' ? 'disabled' : ''}>Cancel</button>
                    </td>
                    ` : ''}
                `;
                tbody.appendChild(tr);
            });
        });

        // Re-attach event listeners after rendering
        attachOrderEventListeners();
    }

    // Menu Management
    async function getMenus() {
        try {
            const response = await fetch('http://localhost:3000/api/menu');
            const menus = await response.json();
            const tbody = document.querySelector('#menu .table tbody');
            tbody.innerHTML = ''; // Clear previous rows

            menus.forEach(menu => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><img src="${menu.gambar || 'https://via.placeholder.com/50'}" class="rounded" alt="${menu.nama}" style="width: 50px; height: 50px; object-fit: cover;"></td>
                    <td>${menu.nama}</td>
                    <td>${menu.kategori ? menu.kategori.nama_kategori : '-'}</td>
                    <td>Rp ${menu.harga.toLocaleString('id-ID')}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editMenu(${menu.id_menu})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteMenu(${menu.id_menu})">Delete</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            console.error('Error fetching menus:', error);
            alert('Failed to load menus. Please try again later.');
        }
    }

    // Payment Management
    async function getPayments() {
        try {
            const response = await fetch('http://localhost:3000/api/payment');
            const payments = await response.json();
            const tbody = document.getElementById('paymentsTableBody');
            tbody.innerHTML = ''; // Clear previous rows

            payments.forEach(payment => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>#P${payment.id_payment}</td>
                    <td>#${payment.id_order}</td>
                    <td>${payment.customer}</td>
                    <td>Rp ${payment.total.toLocaleString('id-ID')}</td>
                    <td>${payment.metode}</td>
                    <td><span class="badge ${payment.status === 'paid' ? 'bg-success' : 'bg-warning'}">${payment.status === 'paid' ? 'Paid' : 'Pending'}</span></td>
                    <td>
                        <button class="btn btn-sm btn-success payment-complete" ${payment.status === 'paid' ? 'disabled' : ''} data-payment-id="${payment.id_payment}">
                            ${payment.status === 'paid' ? 'Paid' : 'Mark as Paid'}
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            // Attach event listeners to payment buttons
            attachPaymentEventListeners();
        } catch (error) {
            console.error('Error fetching payments:', error);
            alert('Failed to load payments. Please try again later.');
        }
    }

    // User Management
    async function getUsers() {
        try {
            const response = await fetch('http://localhost:3000/api/users');
            const users = await response.json();
            const tbody = document.getElementById('usersTableBody');
            tbody.innerHTML = ''; // Clear previous rows

            users.forEach(user => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>#U${user.id_user}</td>
                    <td>${user.username}</td>
                    <td>${user.email || '-'}</td>
                    <td><span class="badge ${user.role === 'admin' ? 'bg-danger' : user.role === 'kasir' ? 'bg-primary' : 'bg-success'}">${user.role}</span></td>
                    <td><span class="badge bg-success">Active</span></td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editUser(${user.id_user})">Edit</button>
                        <button class="btn btn-sm btn-danger user-delete" data-user-id="${user.id_user}">Delete</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            // Attach event listeners to delete buttons
            attachUserEventListeners();
        } catch (error) {
            console.error('Error fetching users:', error);
            alert('Failed to load users. Please try again later.');
        }
    }

    // Function to attach payment event listeners
    function attachPaymentEventListeners() {
        document.querySelectorAll('.payment-complete').forEach(btn => {
            btn.addEventListener('click', async function() {
                const paymentId = this.dataset.paymentId;
                try {
                    const response = await fetch(`http://localhost:3000/api/payments/${paymentId}/status`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ status: 'paid' })
                    });

                    if (response.ok) {
                        const row = this.closest('tr');
                        row.querySelector('.badge').className = 'badge bg-success';
                        row.querySelector('.badge').textContent = 'Paid';
                        this.textContent = 'Paid';
                        this.classList.remove('btn-success');
                        this.classList.add('btn-secondary');
                        this.disabled = true;
                    } else {
                        throw new Error('Failed to update payment status');
                    }
                } catch (error) {
                    console.error('Error updating payment:', error);
                    alert('Failed to update payment status. Please try again later.');
                }
            });
        });
    }

    // Function to attach user event listeners
    function attachUserEventListeners() {
        document.querySelectorAll('.user-delete').forEach(btn => {
            btn.addEventListener('click', async function() {
                const userId = this.dataset.userId;
                if (confirm('Are you sure you want to delete this user?')) {
                    try {
                        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
                            method: 'DELETE'
                        });

                        if (response.ok) {
                            const row = this.closest('tr');
                            row.remove();
                            alert('User deleted successfully');
                        } else {
                            throw new Error('Failed to delete user');
                        }
                    } catch (error) {
                        console.error('Error deleting user:', error);
                        alert('Failed to delete user. Please try again later.');
                    }
                }
            });
        });
    }

    // Initial load of data
    getMenus();
    getOrders();
    getPayments();
    getUsers();

    document.querySelectorAll('.order-complete').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = btn.closest('tr');
            row.querySelector('.badge').className = 'badge bg-success';
            row.querySelector('.badge').textContent = 'Completed';
            btn.classList.remove('btn-success');
            btn.classList.add('btn-secondary');
            btn.disabled = true;
        });
    });
    document.querySelectorAll('.order-cancel').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = btn.closest('tr');
            row.querySelector('.badge').className = 'badge bg-danger';
            row.querySelector('.badge').textContent = 'Cancelled';
            row.querySelectorAll('button').forEach(b => b.disabled = true);
        });
    });

    // Payments
    document.querySelectorAll('.payment-complete').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = btn.closest('tr');
            row.querySelector('.badge').className = 'badge bg-success';
            row.querySelector('.badge').textContent = 'Paid';
            btn.classList.remove('btn-success');
            btn.classList.add('btn-secondary');
            btn.disabled = true;
        });
    });

    // Users
    document.querySelectorAll('.user-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = btn.closest('tr');
            row.remove();
        });
    });

});

// Function to update dashboard statistics
async function updateDashboardStats() {
    const orders = await fetchOrdersData();
    const users = await fetchUsersData();

    const totalOrders = orders.length;
    const activeUsers = users.length; // Assuming all fetched users are active
    
    let todayRevenue = 0;
    let pendingOrders = 0;
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    orders.forEach(order => {
        // Calculate revenue for today's orders (assuming created_at is relevant for 'today')
        if (order.created_at && order.created_at.startsWith(today)) {
            todayRevenue += parseFloat(order.total);
        }
        // Count pending orders
        if (order.status === 'pending') {
            pendingOrders++;
        }
    });

    // Update the dashboard elements
    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('todayRevenue').textContent = `Rp ${todayRevenue.toLocaleString('id-ID')}`;
    document.getElementById('activeUsers').textContent = activeUsers;
    document.getElementById('pendingOrders').textContent = pendingOrders;
} 