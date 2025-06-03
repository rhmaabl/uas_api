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
        }
    });
});

// Form submission

document.getElementById('addItemForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Here you would typically send the data to your backend
    alert('Item added successfully!');
    const modal = bootstrap.Modal.getInstance(document.getElementById('addItemModal'));
    modal.hide();
});

// Orders management logic

document.addEventListener('DOMContentLoaded', function() {
    // Orders
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