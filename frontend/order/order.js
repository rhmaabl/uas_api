document.addEventListener('DOMContentLoaded', function() {
    // Initialize quantity controls
    const quantityInputs = document.querySelectorAll('.item-quantity input');
    const minusButtons = document.querySelectorAll('.quantity-btn.minus');
    const plusButtons = document.querySelectorAll('.quantity-btn.plus');

    // Add event listeners for quantity controls
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.nextElementSibling;
            const currentValue = parseInt(input.value);
            if (currentValue > 1) {
                input.value = currentValue - 1;
                updateOrderSummary();
            }
        });
    });

    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const currentValue = parseInt(input.value);
            if (currentValue < 10) {
                input.value = currentValue + 1;
                updateOrderSummary();
            }
        });
    });

    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (value < 1) this.value = 1;
            if (value > 10) this.value = 10;
            updateOrderSummary();
        });
    });

    // Function to update order summary
    function updateOrderSummary() {
        let subtotal = 0;
        const items = document.querySelectorAll('.order-item');

        items.forEach(item => {
            const price = parseFloat(item.querySelector('.item-price').textContent.replace('$', ''));
            const quantity = parseInt(item.querySelector('.item-quantity input').value);
            subtotal += price * quantity;
        });

        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + tax;

        // Update summary values
        document.querySelector('.summary-item:nth-child(2) span:last-child').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.summary-item:nth-child(3) span:last-child').textContent = `$${tax.toFixed(2)}`;
        document.querySelector('.summary-item.total span:last-child').textContent = `$${total.toFixed(2)}`;
    }

    // Initialize order summary
    updateOrderSummary();

    // Checkout button functionality
    const checkoutButton = document.querySelector('.btn-checkout');
    checkoutButton.addEventListener('click', function() {
        // Here you can add the checkout logic
        alert('Proceeding to checkout...');
        // You can redirect to a checkout page or show a modal
    });
}); 

