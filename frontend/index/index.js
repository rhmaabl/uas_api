document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const menuGrid = document.getElementById('menu-grid');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const contactForm = document.getElementById('contact-form');

    // Cart state
    let cart = [];
    let cartTotal = 0;

    // Sample menu items data
    const menuItems = [
        {
            id: 1,
            name: 'Classic Burger',
            category: 'main-course',
            price: 12.99,
            description: 'Juicy beef patty with fresh vegetables and special sauce',
            image: '../images/burger.jpg'
        },
        {
            id: 2,
            name: 'Caesar Salad',
            category: 'appetizers',
            price: 8.99,
            description: 'Fresh romaine lettuce with Caesar dressing and croutons',
            image: '../images/salad.jpg'
        },
        {
            id: 3,
            name: 'Chocolate Cake',
            category: 'desserts',
            price: 6.99,
            description: 'Rich chocolate cake with ganache frosting',
            image: '../images/cake.jpg'
        },
        {
            id: 4,
            name: 'Fresh Juice',
            category: 'beverages',
            price: 4.99,
            description: 'Freshly squeezed orange juice',
            image: '../images/juice.jpg'
        }
    ];

    // Mobile Navigation Toggle
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });

    // Cart Toggle
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    // Category Filter
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.dataset.category;
            displayMenuItems(category);
        });
    });

    // Display Menu Items
    function displayMenuItems(category = 'all') {
        menuGrid.innerHTML = '';
        
        const filteredItems = category === 'all' 
            ? menuItems 
            : menuItems.filter(item => item.category === category);

        filteredItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p class="price">$${item.price.toFixed(2)}</p>
                    <p class="description">${item.description}</p>
                    <button class="add-to-cart" data-id="${item.id}">
                        Add to Cart
                    </button>
                </div>
            `;
            menuGrid.appendChild(menuItem);
        });

        // Add event listeners to new buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.dataset.id);
                addToCart(itemId);
            });
        });
    }

    // Add to Cart
    function addToCart(itemId) {
        const item = menuItems.find(item => item.id === itemId);
        const existingItem = cart.find(cartItem => cartItem.id === itemId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...item,
                quantity: 1
            });
        }

        updateCart();
        cartSidebar.classList.add('active');
    }

    // Update Cart
    function updateCart() {
        const cartItems = document.querySelector('.cart-items');
        const cartCount = document.querySelector('.cart-count');
        const totalAmount = document.querySelector('.total-amount');

        cartItems.innerHTML = '';
        cartTotal = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            cartTotal += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });

        // Update cart count and total
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        totalAmount.textContent = `$${cartTotal.toFixed(2)}`;

        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.dataset.id);
                if (e.target.classList.contains('increase')) {
                    updateQuantity(itemId, 1);
                } else if (e.target.classList.contains('decrease')) {
                    updateQuantity(itemId, -1);
                }
            });
        });
    }

    // Update Item Quantity
    function updateQuantity(itemId, change) {
        const item = cart.find(item => item.id === itemId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                cart = cart.filter(cartItem => cartItem.id !== itemId);
            }
            updateCart();
        }
    }

    // Contact Form Submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Here you would typically send the data to a server
        console.log('Contact form submission:', data);
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Initialize
    displayMenuItems();
}); 