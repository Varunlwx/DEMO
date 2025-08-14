// Cart Management System
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.promoCode = null;
        this.discount = 0;
        this.init();
    }

    init() {
        this.renderCart();
        this.updateCartCount();
        this.bindEvents();
        this.calculateTotals();
    }

    loadCart() {
        const savedCart = localStorage.getItem('zeeclothes_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    saveCart() {
        localStorage.setItem('zeeclothes_cart', JSON.stringify(this.cart));
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => 
            item.id === product.id && item.size === product.size
        );

        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            this.cart.push(product);
        }

        this.saveCart();
        this.renderCart();
        this.updateCartCount();
        this.calculateTotals();
    }

    removeFromCart(productId, size) {
        this.cart = this.cart.filter(item => 
            !(item.id === productId && item.size === size)
        );
        this.saveCart();
        this.renderCart();
        this.updateCartCount();
        this.calculateTotals();
    }

    updateQuantity(productId, size, quantity) {
        const item = this.cart.find(item => 
            item.id === productId && item.size === size
        );
        
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId, size);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.renderCart();
                this.calculateTotals();
            }
        }
    }

    updateCartCount() {
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(element => {
            element.textContent = count;
        });
        
        // Dispatch custom event to notify other pages
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count } }));
    }

    renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const emptyCart = document.getElementById('empty-cart');

        if (this.cart.length === 0) {
            cartItemsContainer.style.display = 'none';
            emptyCart.style.display = 'block';
            return;
        }

        cartItemsContainer.style.display = 'block';
        emptyCart.style.display = 'none';

        cartItemsContainer.innerHTML = this.cart.map(item => `
            <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-description">${item.description}</p>
                    <div class="cart-item-size">Size: ${item.size}</div>
                    <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" onclick="cartManager.updateQuantity('${item.id}', '${item.size}', ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="cartManager.updateQuantity('${item.id}', '${item.size}', ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="cart-item-total">
                    ₹${(item.price * item.quantity).toLocaleString()}
                </div>
                <button class="remove-item-btn" onclick="cartManager.removeFromCart('${item.id}', '${item.size}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    calculateTotals() {
        const subtotal = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = subtotal >= 31500 ? 0 : 500;
        const tax = subtotal * 0.18; // 18% GST
        const total = subtotal + shipping + tax - this.discount;

        document.getElementById('subtotal').textContent = `₹${subtotal.toLocaleString()}`;
        document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`;
        document.getElementById('tax').textContent = `₹${tax.toLocaleString()}`;
        document.getElementById('total').textContent = `₹${total.toLocaleString()}`;

        // Update checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        checkoutBtn.disabled = this.cart.length === 0;
        
        if (this.cart.length === 0) {
            checkoutBtn.textContent = 'Cart is Empty';
        } else {
            checkoutBtn.textContent = 'Proceed to Checkout';
        }
    }

    applyPromoCode(code) {
        const promoMessage = document.getElementById('promo-message');
        const discountItem = document.getElementById('discount-item');
        
        // Sample promo codes
        const promoCodes = {
            'WELCOME20': 0.20,
            'SAVE10': 0.10,
            'LAUNCH50': 0.50
        };

        if (promoCodes[code.toUpperCase()]) {
            this.promoCode = code.toUpperCase();
            this.discount = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0) * promoCodes[code.toUpperCase()];
            
            promoMessage.textContent = `Promo code applied! ${(promoCodes[code.toUpperCase()] * 100)}% discount`;
            promoMessage.className = 'promo-message success';
            discountItem.style.display = 'flex';
            document.getElementById('discount').textContent = `-₹${this.discount.toLocaleString()}`;
        } else {
            promoMessage.textContent = 'Invalid promo code';
            promoMessage.className = 'promo-message error';
            this.promoCode = null;
            this.discount = 0;
            discountItem.style.display = 'none';
        }

        this.calculateTotals();
    }

    bindEvents() {
        // Promo code application
        document.getElementById('apply-promo').addEventListener('click', () => {
            const promoCode = document.getElementById('promo-code').value.trim();
            if (promoCode) {
                this.applyPromoCode(promoCode);
            }
        });

        // Enter key for promo code
        document.getElementById('promo-code').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const promoCode = e.target.value.trim();
                if (promoCode) {
                    this.applyPromoCode(promoCode);
                }
            }
        });

        // Checkout button
        document.getElementById('checkout-btn').addEventListener('click', () => {
            if (this.cart.length > 0) {
                this.proceedToCheckout();
            }
        });
    }

    proceedToCheckout() {
        // Store cart data for checkout page
        sessionStorage.setItem('checkout_cart', JSON.stringify(this.cart));
        sessionStorage.setItem('checkout_promo', this.promoCode);
        sessionStorage.setItem('checkout_discount', this.discount);
        
        // Redirect to checkout
        window.location.href = 'checkout.html';
    }
}

// Product Database
const productDatabase = {
    'obsidian': {
        id: 'obsidian',
        name: 'OBSIDIAN',
        description: 'Polo with zip and contrast details.',
        price: 9810,
        image: 'assets/images/PLANE_SHIRT.png',
        category: 'polo',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Navy', 'White']
    },
    'tephra': {
        id: 'tephra',
        name: 'TEPHRA',
        description: 'Essential organic cotton polo.',
        price: 6210,
        image: 'assets/images/SHIRT_IMAGE.jpeg',
        category: 'polo',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Black', 'Grey']
    },
    'diorite': {
        id: 'diorite',
        name: 'DIORITE',
        description: 'Cotton and cashmere cardigan.',
        price: 11610,
        image: 'assets/images/Hoddie_IMAGE.jpeg',
        category: 'sweater',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Navy', 'Grey', 'Black']
    },
    'septaria': {
        id: 'septaria',
        name: 'SEPTARIA',
        description: 'Crew neck sweater in cotton and cashmere.',
        price: 9810,
        image: 'assets/images/PLANE_HODDIE.png',
        category: 'sweater',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Grey', 'Navy']
    },
    'basalt': {
        id: 'basalt',
        name: 'BASALT',
        description: 'Hand-dyed cashmere crew neck sweater.',
        price: 17010,
        image: 'assets/images/JACKET_IMAGE.jpeg',
        category: 'sweater',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Navy', 'Black', 'Grey']
    },
    'travertine': {
        id: 'travertine',
        name: 'TRAVERTINE',
        description: 'Cotton and cashmere t-shirt.',
        price: 7380,
        image: 'assets/images/PLANE_TSHIRT.png',
        category: 'tshirt',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Black', 'Grey']
    },
    'cotton-classic': {
        id: 'cotton-classic',
        name: 'COTTON CLASSIC',
        description: 'Premium organic cotton t-shirt.',
        price: 5490,
        image: 'assets/images/TSHIRT_IMAGE.jpeg',
        category: 'tshirt',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Black', 'Navy']
    },
    'denim-casual': {
        id: 'denim-casual',
        name: 'DENIM CASUAL',
        description: 'Premium denim with modern fit.',
        price: 12990,
        image: 'assets/images/JEANS_IMAGE.jpeg',
        category: 'polo',
        sizes: ['30', '32', '34', '36'],
        colors: ['Blue', 'Black', 'Grey']
    },
    'formal-suit': {
        id: 'formal-suit',
        name: 'FORMAL SUIT',
        description: 'Tailored wool blend suit.',
        price: 24990,
        image: 'assets/images/Suit_image.jpeg',
        category: 'sweater',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Navy', 'Black', 'Grey']
    }
};

// Initialize cart manager
const cartManager = new CartManager();

// Add loaded class to body
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
    
    // Update cart count on page load
    const savedCart = localStorage.getItem('zeeclothes_cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
});

// Loading screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.getElementById('loading-bar');
    
    // Ensure loading screen is hidden after a short delay
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1000);
    
    // Simulate loading
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }
            }, 200);
        }
        if (loadingBar) {
            loadingBar.style.width = progress + '%';
        }
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
