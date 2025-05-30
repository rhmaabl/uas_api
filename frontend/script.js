document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');
  
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.innerHTML = navLinks.classList.contains('active') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });

  // Cart Functionality
  const cartIcon = document.getElementById('cart-icon');
  const cartCount = document.getElementById('cart-count');
  let cart = [];
  
  // Animasi keranjang
  cartIcon.addEventListener('mouseenter', () => {
    cartIcon.classList.add('cart-animate-spin');
    setTimeout(() => {
      cartIcon.classList.remove('cart-animate-spin');
    }, 500);
  });

  // Inisialisasi lainnya bisa ditambahkan di sini
});

// Animasi keranjang
const cartBounce = [
  { transform: 'translateY(0)' },
  { transform: 'translateY(-5px)' },
  { transform: 'translateY(0)' }
];

const cartSpin = [
  { transform: 'rotate(0deg)' },
  { transform: 'rotate(360deg)' }
];

const cartTiming = {
  duration: 500,
  easing: 'ease'
};

// Fungsi untuk animasi
function animateCart(element, animation) {
  return element.animate(animation, cartTiming);
}