// Order Confirmation Management
class OrderConfirmationManager {
    constructor() {
        this.order = null;
        this.init();
    }

    init() {
        this.loadOrderData();
        this.renderOrderDetails();
        this.updateCartCount();
    }

    loadOrderData() {
        const savedOrder = sessionStorage.getItem('order_confirmation');
        
        if (savedOrder) {
            this.order = JSON.parse(savedOrder);
        } else {
            // Redirect if no order data
            window.location.href = 'index.html';
        }
    }

    renderOrderDetails() {
        if (!this.order) return;

        // Order ID
        document.getElementById('order-id').textContent = this.order.orderId;

        // Order Date
        const orderDate = new Date(this.order.orderDate);
        document.getElementById('order-date').textContent = orderDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Payment Method
        const paymentMethod = this.order.payment.method;
        const paymentDisplay = this.formatPaymentMethod(paymentMethod);
        document.getElementById('payment-method').textContent = paymentDisplay;

        // Shipping Method
        const shippingMethod = this.order.shipping.method;
        const shippingDisplay = this.formatShippingMethod(shippingMethod);
        document.getElementById('shipping-method').textContent = shippingDisplay;

        // Estimated Delivery
        const estimatedDelivery = this.calculateEstimatedDelivery(shippingMethod);
        document.getElementById('estimated-delivery').textContent = estimatedDelivery;

        // Order Items
        this.renderOrderItems();

        // Shipping Details
        this.renderShippingDetails();

        // Order Summary
        this.renderOrderSummary();
    }

    formatPaymentMethod(method) {
        const methods = {
            'card': 'Credit/Debit Card',
            'upi': 'UPI',
            'netbanking': 'Net Banking',
            'cod': 'Cash on Delivery'
        };
        return methods[method] || method;
    }

    formatShippingMethod(method) {
        const methods = {
            'standard': 'Standard Delivery (5-7 days)',
            'express': 'Express Delivery (2-3 days)',
            'free': 'Free Shipping (5-7 days)'
        };
        return methods[method] || method;
    }

    calculateEstimatedDelivery(shippingMethod) {
        const orderDate = new Date(this.order.orderDate);
        let deliveryDays = 5; // Standard delivery

        switch (shippingMethod) {
            case 'express':
                deliveryDays = 3;
                break;
            case 'free':
                deliveryDays = 5;
                break;
            default:
                deliveryDays = 7;
        }

        const estimatedDate = new Date(orderDate);
        estimatedDate.setDate(estimatedDate.getDate() + deliveryDays);

        const endDate = new Date(estimatedDate);
        endDate.setDate(endDate.getDate() + 2);

        return `${estimatedDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })} - ${endDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })}`;
    }

    renderOrderItems() {
        const orderItemsContainer = document.getElementById('order-items-list');
        
        orderItemsContainer.innerHTML = this.order.items.map(item => `
            <div class="order-item">
                <div class="order-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="order-item-details">
                    <h4 class="order-item-name">${item.name}</h4>
                    <p class="order-item-description">${item.description}</p>
                    <p class="order-item-size">Size: ${item.size}</p>
                    <p class="order-item-quantity">Quantity: ${item.quantity}</p>
                </div>
                <div class="order-item-price">
                    ₹${(item.price * item.quantity).toLocaleString()}
                </div>
            </div>
        `).join('');
    }

    renderShippingDetails() {
        const shippingDetailsContainer = document.getElementById('shipping-details');
        const customer = this.order.customer;
        
        shippingDetailsContainer.innerHTML = `
            <div class="shipping-address">
                <h4>Shipping Address</h4>
                <p>${customer.firstName} ${customer.lastName}</p>
                <p>${customer.address.street}</p>
                <p>${customer.address.city}, ${customer.address.state} ${customer.address.zipCode}</p>
                <p>Phone: ${customer.phone}</p>
                <p>Email: ${customer.email}</p>
            </div>
        `;
    }

    renderOrderSummary() {
        const pricing = this.order.pricing;
        
        document.getElementById('subtotal').textContent = `₹${pricing.subtotal.toLocaleString()}`;
        document.getElementById('shipping').textContent = pricing.shipping === 0 ? 'FREE' : `₹${pricing.shipping.toLocaleString()}`;
        document.getElementById('tax').textContent = `₹${pricing.tax.toLocaleString()}`;
        document.getElementById('total').textContent = `₹${pricing.total.toLocaleString()}`;

        // Show discount if applicable
        if (pricing.discount > 0) {
            document.getElementById('discount-item').style.display = 'flex';
            document.getElementById('discount').textContent = `-₹${pricing.discount.toLocaleString()}`;
        }
    }

    updateCartCount() {
        // Cart should be empty after successful order
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(element => {
            element.textContent = '0';
        });
    }
}

// Initialize order confirmation manager
const orderConfirmationManager = new OrderConfirmationManager();

// Add loaded class to body
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
});

// Loading screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.getElementById('loading-bar');
    
    // Simulate loading
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 200);
        }
        loadingBar.style.width = progress + '%';
    }, 100);
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            var workingMenu = document.createElement('div');
            workingMenu.innerHTML = `
                <div style="text-align: center; padding: 20px; margin-top: 80px;">
                    <h2 style="color: white; margin: 40px 0; font-size: 36px; font-family: Oswald, sans-serif; letter-spacing: 3px;">MENU</h2>
                    <a href="menswear.html" style="display: block; color: #333; font-size: 24px; margin: 20px auto; text-decoration: none; padding: 18px 30px; background: white; border-radius: 8px; font-family: Oswald, sans-serif; letter-spacing: 2px; max-width: 300px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); font-weight: 600;">MENSWEAR</a>
                    <a href="#" style="display: block; color: #333; font-size: 24px; margin: 20px auto; text-decoration: none; padding: 18px 30px; background: white; border-radius: 8px; font-family: Oswald, sans-serif; letter-spacing: 2px; max-width: 300px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); font-weight: 600;">LIMITED</a>
                    <a href="#" style="display: block; color: #333; font-size: 24px; margin: 20px auto; text-decoration: none; padding: 18px 30px; background: white; border-radius: 8px; font-family: Oswald, sans-serif; letter-spacing: 2px; max-width: 300px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); font-weight: 600;">ZEEWORLD</a>
                    <a href="login.html" style="display: block; color: #333; font-size: 24px; margin: 20px auto; text-decoration: none; padding: 18px 30px; background: white; border-radius: 8px; font-family: Oswald, sans-serif; letter-spacing: 2px; max-width: 300px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); font-weight: 600;">LOGIN</a>
                    <a href="cart.html" style="display: block; color: #333; font-size: 24px; margin: 20px auto; text-decoration: none; padding: 18px 30px; background: white; border-radius: 8px; font-family: Oswald, sans-serif; letter-spacing: 2px; max-width: 300px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); font-weight: 600;">CART</a>
                </div>
            `;
            workingMenu.style.position = 'fixed';
            workingMenu.style.top = '0';
            workingMenu.style.left = '0';
            workingMenu.style.width = '100%';
            workingMenu.style.height = '100%';
            workingMenu.style.backgroundColor = 'rgba(0, 0, 0, 0.92)';
            workingMenu.style.color = 'white';
            workingMenu.style.zIndex = '9999999';
            workingMenu.style.display = 'block';
            workingMenu.style.overflow = 'auto';
            workingMenu.id = 'working-mobile-menu';
            
            workingMenu.addEventListener('click', function(e) {
                if (e.target.tagName === 'A' || e.target === workingMenu) {
                    document.body.removeChild(workingMenu);
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            document.body.appendChild(workingMenu);
            document.body.style.overflow = 'hidden';
            hamburger.classList.add('active');
        });
    }
});
