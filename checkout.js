// Checkout Management System
class CheckoutManager {
    constructor() {
        this.cart = [];
        this.promoCode = null;
        this.discount = 0;
        this.shippingCost = 500;
        this.init();
    }

    init() {
        this.loadCheckoutData();
        this.renderOrderSummary();
        this.calculateTotals();
        this.bindEvents();
        this.updateCartCount();
    }

    loadCheckoutData() {
        const savedCart = sessionStorage.getItem('checkout_cart');
        const savedPromo = sessionStorage.getItem('checkout_promo');
        const savedDiscount = sessionStorage.getItem('checkout_discount');

        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        }
        
        if (savedPromo) {
            this.promoCode = savedPromo;
        }
        
        if (savedDiscount) {
            this.discount = parseFloat(savedDiscount);
        }

        // Redirect if no cart data
        if (!savedCart || this.cart.length === 0) {
            window.location.href = 'cart.html';
        }
    }

    renderOrderSummary() {
        const orderItemsContainer = document.getElementById('order-items');
        
        orderItemsContainer.innerHTML = this.cart.map(item => `
            <div class="order-item">
                <div class="order-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="order-item-details">
                    <h4 class="order-item-name">${item.name}</h4>
                    <p class="order-item-size">Size: ${item.size}</p>
                    <p class="order-item-quantity">Qty: ${item.quantity}</p>
                </div>
                <div class="order-item-price">
                    ₹${(item.price * item.quantity).toLocaleString()}
                </div>
            </div>
        `).join('');
    }

    calculateTotals() {
        const subtotal = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = this.shippingCost;
        const tax = subtotal * 0.18; // 18% GST
        const total = subtotal + shipping + tax - this.discount;

        document.getElementById('subtotal').textContent = `₹${subtotal.toLocaleString()}`;
        document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`;
        document.getElementById('tax').textContent = `₹${tax.toLocaleString()}`;
        document.getElementById('total').textContent = `₹${total.toLocaleString()}`;

        // Show discount if applicable
        if (this.discount > 0) {
            document.getElementById('discount-item').style.display = 'flex';
            document.getElementById('discount').textContent = `-₹${this.discount.toLocaleString()}`;
        }
    }

    updateCartCount() {
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(element => {
            element.textContent = count;
        });
    }

    bindEvents() {
        // Form submission
        document.getElementById('checkout-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.processOrder();
        });

        // Payment method change
        document.querySelectorAll('input[name="payment"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.toggleCardDetails(e.target.value);
            });
        });

        // Shipping method change
        document.querySelectorAll('input[name="shipping"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.updateShippingCost(e.target.value);
            });
        });

        // Card number formatting
        document.getElementById('cardNumber').addEventListener('input', (e) => {
            this.formatCardNumber(e.target);
        });

        // Expiry date formatting
        document.getElementById('expiry').addEventListener('input', (e) => {
            this.formatExpiryDate(e.target);
        });

        // CVV validation
        document.getElementById('cvv').addEventListener('input', (e) => {
            this.validateCVV(e.target);
        });
    }

    toggleCardDetails(paymentMethod) {
        const cardDetails = document.getElementById('card-details');
        if (paymentMethod === 'card') {
            cardDetails.style.display = 'block';
        } else {
            cardDetails.style.display = 'none';
        }
    }

    updateShippingCost(shippingMethod) {
        switch (shippingMethod) {
            case 'standard':
                this.shippingCost = 500;
                break;
            case 'express':
                this.shippingCost = 1200;
                break;
            case 'free':
                this.shippingCost = 0;
                break;
        }
        this.calculateTotals();
    }

    formatCardNumber(input) {
        let value = input.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        input.value = value.substring(0, 19);
    }

    formatExpiryDate(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        input.value = value.substring(0, 5);
    }

    validateCVV(input) {
        let value = input.value.replace(/\D/g, '');
        input.value = value.substring(0, 4);
    }

    validateForm() {
        const form = document.getElementById('checkout-form');
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });

        // Email validation
        const email = document.getElementById('email');
        if (email.value && !this.isValidEmail(email.value)) {
            this.showFieldError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Phone validation
        const phone = document.getElementById('phone');
        if (phone.value && !this.isValidPhone(phone.value)) {
            this.showFieldError(phone, 'Please enter a valid phone number');
            isValid = false;
        }

        // Card validation (if card payment selected)
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        if (paymentMethod === 'card') {
            const cardNumber = document.getElementById('cardNumber');
            const expiry = document.getElementById('expiry');
            const cvv = document.getElementById('cvv');
            const cardName = document.getElementById('cardName');

            if (!cardNumber.value.replace(/\s/g, '').match(/^\d{16}$/)) {
                this.showFieldError(cardNumber, 'Please enter a valid 16-digit card number');
                isValid = false;
            }

            if (!expiry.value.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
                this.showFieldError(expiry, 'Please enter a valid expiry date (MM/YY)');
                isValid = false;
            }

            if (!cvv.value.match(/^\d{3,4}$/)) {
                this.showFieldError(cvv, 'Please enter a valid CVV');
                isValid = false;
            }

            if (!cardName.value.trim()) {
                this.showFieldError(cardName, 'Please enter the name on card');
                isValid = false;
            }
        }

        return isValid;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    isValidPhone(phone) {
        return /^\d{10}$/.test(phone.replace(/\D/g, ''));
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    async processOrder() {
        if (!this.validateForm()) {
            return;
        }

        const placeOrderBtn = document.getElementById('place-order-btn');
        placeOrderBtn.disabled = true;
        placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

        try {
            // Simulate payment processing
            await this.simulatePaymentProcessing();

            // Generate order
            const order = this.generateOrder();

            // Clear cart
            localStorage.removeItem('zeeclothes_cart');
            sessionStorage.removeItem('checkout_cart');
            sessionStorage.removeItem('checkout_promo');
            sessionStorage.removeItem('checkout_discount');

            // Store order for confirmation page
            sessionStorage.setItem('order_confirmation', JSON.stringify(order));

            // Redirect to confirmation page
            window.location.href = 'order-confirmation.html';

        } catch (error) {
            console.error('Order processing failed:', error);
            this.showError('Payment processing failed. Please try again.');
            placeOrderBtn.disabled = false;
            placeOrderBtn.innerHTML = '<i class="fas fa-lock"></i> Place Order';
        }
    }

    async simulatePaymentProcessing() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Payment failed'));
                }
            }, 2000);
        });
    }

    generateOrder() {
        const formData = new FormData(document.getElementById('checkout-form'));
        const orderData = Object.fromEntries(formData.entries());

        const subtotal = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.18;
        const total = subtotal + this.shippingCost + tax - this.discount;

        return {
            orderId: this.generateOrderId(),
            orderDate: new Date().toISOString(),
            customer: {
                firstName: orderData.firstName,
                lastName: orderData.lastName,
                email: orderData.email,
                phone: orderData.phone,
                address: {
                    street: orderData.address,
                    city: orderData.city,
                    state: orderData.state,
                    zipCode: orderData.zipCode
                }
            },
            items: this.cart,
            payment: {
                method: orderData.payment,
                cardNumber: orderData.cardNumber ? orderData.cardNumber.replace(/\s/g, '').slice(-4) : null,
                cardName: orderData.cardName
            },
            shipping: {
                method: orderData.shipping,
                cost: this.shippingCost
            },
            pricing: {
                subtotal: subtotal,
                shipping: this.shippingCost,
                tax: tax,
                discount: this.discount,
                total: total
            },
            promoCode: this.promoCode,
            notes: orderData.orderNotes
        };
    }

    generateOrderId() {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `ZEE-${timestamp.slice(-6)}-${random}`;
    }

    showError(message) {
        // Create error notification
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// Initialize checkout manager
const checkoutManager = new CheckoutManager();

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
