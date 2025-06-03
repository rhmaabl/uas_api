let cart = [];
let cartTotal = 0;

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

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartBadge = document.querySelector('.cart-badge');
    const cartTotalElement = document.getElementById('cartTotal');

    cartTotal = 0;
    cartItems.innerHTML = cart.map(item => {
        cartTotal += item.price * item.qty;
        return `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span>${item.name} x${item.qty}</span>
                <span>
                    $${(item.price * item.qty).toFixed(2)}
                    <button class="btn btn-sm btn-danger ms-2 remove-btn" data-name="${item.name}">Remove</button>
                </span>
            </div>
        `;
    }).join('');

    cartBadge.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    cartTotalElement.textContent = cartTotal.toFixed(2);

    // Remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            removeFromCart(this.dataset.name);
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
