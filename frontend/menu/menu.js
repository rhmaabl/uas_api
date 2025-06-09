let cart = [];
let cartTotal = 0;

function order() {
    window.location.href = 'order.html';
}

// Attach event listeners after DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.menu-item').forEach(card => {
        const minusBtn = card.querySelector('.minus-btn');
        const plusBtn = card.querySelector('.plus-btn');
        const qtyInput = card.querySelector('.qty-input');
        const addBtn = card.querySelector('.add-btn');

        minusBtn.addEventListener('click', () => {
            let qty = parseInt(qtyInput.value) || 1;
            if (qty > 1) qtyInput.value = qty - 1;
        });

        plusBtn.addEventListener('click', () => {
            let qty = parseInt(qtyInput.value) || 1;
            qtyInput.value = qty + 1;
        });

        addBtn.addEventListener('click', () => {
            const name = addBtn.dataset.name;
            const price = parseFloat(addBtn.dataset.price);
            const qty = parseInt(qtyInput.value) || 1;
            addToCart(name, price, qty);
        });
    });

    // Category filter functionality
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // Here you would typically filter the menu items based on category
        });
    });
});

function addToCart(name, price, qty) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ name, price, qty });
    }
    updateCartUI();
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

// Currency formatter for IDR
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Convert USD to IDR (assuming 1 USD = 15000 IDR)
function convertToIDR(usdAmount) {
    return usdAmount * 15000;
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartBadge = document.querySelector('.cart-badge');
    const cartSubtotalElement = document.getElementById('cartSubtotal');
    const cartTaxElement = document.getElementById('cartTax');
    const cartTotalElement = document.getElementById('cartTotal');

    let subtotal = 0;
    cartItems.innerHTML = cart.map(item => {
        const priceInIDR = convertToIDR(item.price);
        subtotal += priceInIDR * item.qty;
        return `
            <div class="order-item" style="display:flex;align-items:center;gap:16px;padding:16px 0;border-bottom:1px solid #eee;">
                <div class="item-image" style="width:60px;height:60px;border-radius:8px;overflow:hidden;background:#eee;display:flex;align-items:center;justify-content:center;">
                    <img src="https://via.placeholder.com/60" alt="Food Item" style="width:100%;height:100%;object-fit:cover;">
                </div>
                <div class="item-details" style="flex:1;">
                    <h3 style="font-size:1rem;margin-bottom:4px;">${item.name}</h3>
                    <div class="item-price" style="font-weight:600;color:#548de2;">${formatCurrency(priceInIDR)}</div>
                </div>
                <div class="item-quantity" style="display:flex;align-items:center;gap:6px;">
                    <button class="quantity-btn minus-cart" data-name="${item.name}">-</button>
                    <input type="number" value="${item.qty}" min="1" max="10" style="width:40px;text-align:center;" data-name="${item.name}">
                    <button class="quantity-btn plus-cart" data-name="${item.name}">+</button>
                </div>
                <button class="btn btn-sm btn-danger ms-2 remove-btn" data-name="${item.name}">Remove</button>
            </div>
        `;
    }).join('');

    cartBadge.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    cartSubtotalElement.textContent = formatCurrency(subtotal);
    cartTaxElement.textContent = formatCurrency(tax);
    cartTotalElement.textContent = formatCurrency(total);

    // Remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            removeFromCart(this.dataset.name);
        });
    });
    // Quantity controls
    document.querySelectorAll('.minus-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const name = this.dataset.name;
            const item = cart.find(i => i.name === name);
            if (item && item.qty > 1) {
                item.qty--;
                updateCartUI();
            }
        });
    });
    document.querySelectorAll('.plus-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const name = this.dataset.name;
            const item = cart.find(i => i.name === name);
            if (item && item.qty < 10) {
                item.qty++;
                updateCartUI();
            }
        });
    });
    document.querySelectorAll('.item-quantity input').forEach(input => {
        input.addEventListener('change', function() {
            const name = this.dataset.name;
            let value = parseInt(this.value);
            if (value < 1) value = 1;
            if (value > 10) value = 10;
            const item = cart.find(i => i.name === name);
            if (item) {
                item.qty = value;
                updateCartUI();
            }
        });
    });
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Order placed successfully!');
    cart = [];
    cartTotal = 0;
    updateCartUI();
    const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    cartModal.hide();
}
