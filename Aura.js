// Select all Buy buttons
const buyButtons = document.querySelectorAll('.buy-btn');

// Cart array (load from localStorage if exists)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Elements
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Function to update cart display
function updateCart() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price}`;
        cartItemsList.appendChild(li);

        // Extract numeric value from price
        const priceValue = parseInt(item.price.replace(/\D/g, ''));
        total += priceValue;
    });

    cartTotal.textContent = `Total: EGP ${total}`;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.background = '#000';
    toast.style.color = '#fff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s';

    document.body.appendChild(toast);

    setTimeout(() => toast.style.opacity = '1', 100);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}

// Add event listeners to Buy buttons
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.parentElement;
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('p').textContent;

        // Add product to cart
        cart.push({ name: productName, price: productPrice });

        // Update cart display
        updateCart();

        // Animate button
        button.style.transform = 'scale(0.9)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);

        // Show toast
        showToast(`${productName} added to cart!`);
    });
});

// Checkout button functionality
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showToast("Your cart is empty!");
    } else {
        showToast("Thank you for your purchase! 🎉");
        cart = [];
        updateCart();
    }
});

// Initialize cart on page load
updateCart();