const API_URL = 'http://localhost:3000/api';

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadCart();
    loadStats();
    setupEventListeners();
});

function setupEventListeners() {
    // Contact form
    document.getElementById('contact-form').addEventListener('submit', handleContactSubmit);
    
    // Checkout form
    document.getElementById('checkout-form').addEventListener('submit', handleCheckoutSubmit);
    
    // Payment method selection
    document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
        radio.addEventListener('change', function() {
            // Hide all payment sections
            document.querySelectorAll('.payment-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show selected payment section
            const selectedMethod = this.value;
            document.getElementById(`${selectedMethod}-section`).style.display = 'block';
        });
    });
}

// Load products from API
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const result = await response.json();
        
        if (result.success) {
            displayProducts(result.data);
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Display products
function displayProducts(products) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const specs = Object.entries(product.specs)
            .map(([key, value]) => `<span>${formatKey(key)}: ${value}</span>`)
            .join('');
        
        const productCard = `
            <div class="product-card">
                <div class="product-image"></div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-specs">
                        ${specs}
                    </div>
                    <div class="stock-info">
                        <span>In Stock: ${product.stock} units</span>
                    </div>
                    <div class="product-footer">
                        <span class="price">₹${product.price.toFixed(2)}/unit</span>
                        <div class="quantity-selector">
                            <input type="number" id="qty-${product.id}" value="100" min="1" max="${product.stock}">
                            <button class="btn-add" onclick="addToCart(${product.id})">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        productGrid.innerHTML += productCard;
    });
}

// Add to cart
async function addToCart(productId) {
    const quantity = parseInt(document.getElementById(`qty-${productId}`).value);
    
    if (quantity <= 0) {
        alert('Please enter a valid quantity');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, quantity })
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Get product name for notification
            const productCard = document.getElementById(`qty-${productId}`).closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Show detailed notification
            showCartNotification(productName, quantity);
            
            // Load updated cart
            loadCart();
            
            // Highlight cart button
            highlightCart();
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Failed to add product to cart');
    }
}

// Show cart notification with product details
function showCartNotification(productName, quantity) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="notification-icon">✓</div>
        <div class="notification-content">
            <strong>Added to Cart!</strong>
            <p>${productName} (${quantity} units)</p>
        </div>
        <button onclick="this.parentElement.remove()">✕</button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Highlight cart button
function highlightCart() {
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.classList.add('highlight');
    setTimeout(() => {
        cartBtn.classList.remove('highlight');
    }, 1000);
}

// Load cart
async function loadCart() {
    try {
        const response = await fetch(`${API_URL}/cart`);
        const result = await response.json();
        
        if (result.success) {
            displayCart(result.data);
        }
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

// Display cart
function displayCart(cartData) {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartCount.textContent = cartData.itemCount;
    cartTotal.textContent = `₹${cartData.subtotal.toFixed(2)}`;
    
    if (cartData.items.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }
    
    cartItems.innerHTML = '';
    cartData.items.forEach(item => {
        const cartItem = `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.product.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                    <p class="item-price">₹${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">✕</button>
            </div>
        `;
        cartItems.innerHTML += cartItem;
    });
}

// Remove from cart
async function removeFromCart(itemId) {
    try {
        const response = await fetch(`${API_URL}/cart/${itemId}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            loadCart();
            showNotification('Item removed from cart');
        }
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
}

// Clear cart
async function clearCart() {
    if (!confirm('Are you sure you want to clear your cart?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/cart`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            loadCart();
            showNotification('Cart cleared');
        }
    } catch (error) {
        console.error('Error clearing cart:', error);
    }
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('active');
}

// Checkout
function checkout() {
    const cartCount = parseInt(document.getElementById('cart-count').textContent);
    
    if (cartCount === 0) {
        alert('Your cart is empty');
        return;
    }
    
    loadCheckoutItems();
    document.getElementById('checkout-modal').style.display = 'block';
}

// Load checkout items
async function loadCheckoutItems() {
    try {
        const response = await fetch(`${API_URL}/cart`);
        const result = await response.json();
        
        if (result.success) {
            const checkoutItems = document.getElementById('checkout-items');
            const checkoutTotal = document.getElementById('checkout-total');
            
            checkoutItems.innerHTML = '';
            result.data.items.forEach(item => {
                checkoutItems.innerHTML += `
                    <div class="checkout-item">
                        <span>${item.product.name} x ${item.quantity}</span>
                        <span>₹${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                `;
            });
            
            checkoutTotal.textContent = `₹${result.data.subtotal.toFixed(2)}`;
        }
    } catch (error) {
        console.error('Error loading checkout items:', error);
    }
}

// Store order data temporarily
let pendingOrder = null;

// Handle checkout submit
async function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const customerInfo = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        address: {
            street: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            zip: formData.get('zip'),
            country: formData.get('country')
        }
    };
    
    try {
        const cartResponse = await fetch(`${API_URL}/cart`);
        const cartResult = await cartResponse.json();
        
        if (!cartResult.success || cartResult.data.items.length === 0) {
            alert('Your cart is empty');
            return;
        }
        
        // Store order data for payment
        pendingOrder = {
            customerInfo,
            items: cartResult.data.items,
            total: cartResult.data.subtotal
        };
        
        // Show payment modal
        document.getElementById('checkout-modal').style.display = 'none';
        document.getElementById('payment-modal').style.display = 'block';
        document.getElementById('payment-total').textContent = `₹${cartResult.data.subtotal.toFixed(2)}`;
        
    } catch (error) {
        console.error('Error processing checkout:', error);
        alert('Failed to process checkout');
    }
}

// Process payment
async function processPayment() {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    
    // Validate payment details based on method
    if (paymentMethod === 'upi') {
        const upiId = document.getElementById('upi-id').value;
        if (!upiId) {
            alert('Please enter your UPI ID');
            return;
        }
    }
    
    if (!pendingOrder) {
        alert('No order found');
        return;
    }
    
    // Add payment info to order
    pendingOrder.paymentMethod = paymentMethod;
    pendingOrder.paymentStatus = paymentMethod === 'cod' ? 'pending' : 'paid';
    
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pendingOrder)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Show success modal
            document.getElementById('payment-modal').style.display = 'none';
            document.getElementById('success-modal').style.display = 'block';
            document.getElementById('order-number').textContent = result.data.orderNumber;
            document.getElementById('order-amount').textContent = `₹${result.data.total.toFixed(2)}`;
            document.getElementById('payment-method-display').textContent = getPaymentMethodName(paymentMethod);
            
            // Clear cart and reload
            loadCart();
            loadStats();
            pendingOrder = null;
            
            // Reset forms
            document.getElementById('checkout-form').reset();
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        alert('Payment failed. Please try again.');
    }
}

// Get payment method display name
function getPaymentMethodName(method) {
    const methods = {
        'upi': 'UPI Payment',
        'card': 'Credit/Debit Card',
        'netbanking': 'Net Banking',
        'cod': 'Cash on Delivery'
    };
    return methods[method] || method;
}

// Close checkout modal
function closeCheckout() {
    document.getElementById('checkout-modal').style.display = 'none';
}

// Close payment modal
function closePayment() {
    document.getElementById('payment-modal').style.display = 'none';
    document.getElementById('checkout-modal').style.display = 'block';
}

// Close success modal
function closeSuccess() {
    document.getElementById('success-modal').style.display = 'none';
}

// Handle contact form submit
async function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        message: formData.get('message')
    };
    
    try {
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert(result.message);
            e.target.reset();
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error submitting contact form:', error);
        alert('Failed to send message');
    }
}

// Load statistics
async function loadStats() {
    try {
        const response = await fetch(`${API_URL}/stats`);
        const result = await response.json();
        
        if (result.success) {
            document.getElementById('total-bricks').textContent = result.data.totalBricksSold.toLocaleString();
            document.getElementById('waste-recycled').textContent = (result.data.textileWasteRecycled / 1000).toFixed(1) + 'K';
            document.getElementById('total-orders').textContent = result.data.totalOrders;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Utility functions
function formatKey(key) {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Close modal when clicking outside
window.onclick = function(event) {
    const checkoutModal = document.getElementById('checkout-modal');
    const paymentModal = document.getElementById('payment-modal');
    const successModal = document.getElementById('success-modal');
    
    if (event.target === checkoutModal) {
        closeCheckout();
    }
    if (event.target === paymentModal) {
        closePayment();
    }
    if (event.target === successModal) {
        closeSuccess();
    }
}
