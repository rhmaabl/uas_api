document.addEventListener('DOMContentLoaded', () => {
  // Element references
  const menuContainer = document.getElementById('menu-container');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const customerForm = document.getElementById('customer-form');
  const confirmation = document.getElementById('confirmation');
  const orderDetails = document.getElementById('order-details');
  const newOrderBtn = document.getElementById('new-order-btn');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cartIcon = document.getElementById('cart-icon');
  const cartCount = document.getElementById('cart-count');
  const closeCartButton = document.getElementById('close-cart');

  let cart = [];
  let menuData = [];

  // Load menu from backend
  async function loadMenu() {
    try {
      const response = await fetch('http://localhost:3000/api/menu');
      menuData = await response.json();
      renderMenu(menuData);
    } catch (error) {
      console.error('Error loading menu:', error);
    }
  }

  // Render menu items
  function renderMenu(menu) {
    menuContainer.innerHTML = '';
    
    menu.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.className = 'menu-item';
      menuItem.dataset.category = item.category;
      
      menuItem.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="price">Rp ${item.price.toLocaleString('id-ID')}</div>
        <button class="add-to-cart" data-id="${item.id}">+ Tambah</button>
      `;
      
      menuContainer.appendChild(menuItem);
    });

    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', addToCart);
    });
  }

  // Add item to cart
  function addToCart(e) {
    const itemId = parseInt(e.target.dataset.id);
    const menuItem = menuData.find(item => item.id === itemId);
    
    if (menuItem) {
      const existingItem = cart.find(item => item.id === itemId);
      
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({
          id: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1
        });
      }
      
      updateCart();
    }
  }

  // Update cart display
  function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.name} (${item.quantity}x)</span>
        <span>Rp ${itemTotal.toLocaleString('id-ID')}</span>
      `;
      
      cartItems.appendChild(li);
    });
    
    cartTotal.textContent = `Total: Rp ${total.toLocaleString('id-ID')}`;
    
    // Update cart count badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Animate cart icon when adding an item
    if (totalItems > 0) {
      cartIcon.classList.add('cart-animate-bounce');
      setTimeout(() => {
        cartIcon.classList.remove('cart-animate-bounce');
      }, 500);
    }
  }

  // Handle order submission
  customerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const customerName = document.getElementById('customer-name').value;
    
    if (cart.length === 0) {
      alert('Keranjang kosong! Silakan tambahkan menu terlebih dahulu.');
      return;
    }
    
    try {
      const order = {
        items: cart,
        customerName: customerName
      };
      
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      });
      
      if (response.ok) {
        const orderData = await response.json();
        showConfirmation(orderData);
      } else {
        alert('Gagal membuat pesanan. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
  });

  // Show order confirmation
  function showConfirmation(order) {
    const itemsList = order.items.map(item => 
      `${item.name} (${item.quantity}x) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`
    ).join('<br>');
    
    const total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    orderDetails.innerHTML = `
      <strong>ID Pesanan:</strong> ${order.id}<br>
      <strong>Nama:</strong> ${order.customerName}<br>
      <strong>Pesanan:</strong><br>${itemsList}<br>
      <strong>Total:</strong> Rp ${total.toLocaleString('id-ID')}<br>
      <strong>Status:</strong> ${order.status}
    `;
    
    confirmation.classList.remove('hidden');
    
    // Reset cart after successful order
    cart = [];
    updateCart();
  }

  // Start new order
  newOrderBtn.addEventListener('click', () => {
    cart = [];
    updateCart();
    document.getElementById('customer-name').value = '';
    confirmation.classList.add('hidden');
  });

  // Filter menu by category
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const category = button.dataset.category;
      const filteredMenu = category === 'semua' 
        ? menuData 
        : menuData.filter(item => item.category === category);
      
      renderMenu(filteredMenu);
    });
  });

  // Cart icon interactions
  cartIcon.addEventListener('click', () => {
    const orderSection = document.getElementById('order-section');
    orderSection.classList.toggle('show-cart');
    
    // Animate cart icon on click
    cartIcon.classList.add('cart-animate-spin');
    setTimeout(() => {
      cartIcon.classList.remove('cart-animate-spin');
    }, 500);
  });

  // Close cart button for mobile
  if (closeCartButton) {
    closeCartButton.addEventListener('click', () => {
      document.getElementById('order-section').classList.remove('show-cart');
    });
  }

  // Animate cart icon on hover
  cartIcon.addEventListener('mouseenter', () => {
    const cartIconElement = cartIcon.querySelector('.cart-icon');
    cartIconElement.classList.add('cart-animate-spin');
    setTimeout(() => {
      cartIconElement.classList.remove('cart-animate-spin');
    }, 500);
  });

  // Initialize
  loadMenu();
});