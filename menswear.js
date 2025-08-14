// Global cart count update function
function updateGlobalCartCount() {
    const savedCart = localStorage.getItem('zeeclothes_cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    console.log('Global cart count update:', count);
    console.log('Cart from localStorage:', cart);
    
    const cartCountElements = document.querySelectorAll('#cart-count');
    console.log('Found cart count elements:', cartCountElements.length);
    
    cartCountElements.forEach(element => {
        element.textContent = count;
        console.log('Updated element:', element, 'to count:', count);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Performance optimizations
    gsap.config({
        force3D: true,
        nullTargetWarn: false
    });
    
    // Smooth scroll optimization
    ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true
    });
    
    // Update cart count
    updateGlobalCartCount();
    
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize header scroll effects
    initHeaderEffects();
    
    // Initialize menswear specific functionality
    initMenswearPage();
    
    // Page load optimization
    window.addEventListener('load', () => {
        // Optimize page performance after load
        ScrollTrigger.refresh();
        
        // Add smooth fade-in for page
        setTimeout(() => {
            document.body.classList.add('loaded');
            initHeroAnimation();
            initProductAnimations();
            initNewsletterAnimation();
            initFooterAnimations();
        }, 100);
    });
    
    // Mobile menu toggle functionality
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    console.log('Mobile menu elements found:', {
        hamburgerMenu: !!hamburgerMenu,
        mobileMenu: !!mobileMenu
    });
    
    if (hamburgerMenu && mobileMenu) {
        hamburgerMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            
            console.log('Mobile menu toggled:', {
                isActive: mobileMenu.classList.contains('active'),
                menuItems: mobileMenu.querySelectorAll('li').length
            });
        });
        
        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(event.target) && 
                !hamburgerMenu.contains(event.target)) {
                mobileMenu.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Add touch event support
        document.addEventListener('touchstart', function(event) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(event.target) && 
                !hamburgerMenu.contains(event.target)) {
                mobileMenu.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, {passive: true});
    }

    // Loading Screen Animation
    function initLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const loadingBar = document.getElementById('loading-bar');
        
        if (!loadingScreen || !loadingBar) return;
        
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            gsap.to(loadingBar, {
                width: progress + '%',
                duration: 0.3,
                ease: "power2.out"
            });
            
            if (progress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    gsap.to(loadingScreen, {
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.inOut",
                        onComplete: () => {
                            loadingScreen.style.display = 'none';
                        }
                    });
                }, 500);
            }
        }, 100);
    }
    
    // Header Scroll Effects
    function initHeaderEffects() {
        const header = document.querySelector('header');
        if (!header) return;
        
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        function updateHeader() {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            if (scrollY > lastScrollY && scrollY > 200) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            
            lastScrollY = scrollY;
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });
    }
    
    // Hero Title Animation for Menswear Page
    function initHeroAnimation() {
        const heroContent = document.querySelector('.menswear-hero .hero-content');
        const pageTitle = document.getElementById('page-title');
        const pageSubtitle = document.querySelector('.page-subtitle');
        
        if (!heroContent) return;
        
        // Animate hero content
        gsap.timeline()
            .to(heroContent, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out",
                force3D: true
            })
            .from(pageTitle, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                force3D: true
            }, "-=0.8")
            .from(pageSubtitle, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                force3D: true
            }, "-=0.6");
        
        // Add character animation to title if needed
        if (pageTitle) {
            const text = pageTitle.textContent;
            pageTitle.innerHTML = '';
            
            [...text].forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(50px)';
                pageTitle.appendChild(span);
                
                gsap.to(span, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    delay: index * 0.03,
                    force3D: true
                });
            });
        }
    }
    
    // Initialize Menswear Page Specific Functionality
    function initMenswearPage() {
        initCategoryFilters();
        initLoadMoreButton();
        initProductInteractions();
    }
    
    // Category Filter Functionality
    function initCategoryFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('.product-card');
        
        if (!filterButtons.length || !productCards.length) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter products with animation
                filterProducts(category, productCards);
            });
        });
    }
    
    // Filter Products with Animation
    function filterProducts(category, productCards) {
        const timeline = gsap.timeline();
        
        productCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = category === 'all' || cardCategory === category;
            
            if (shouldShow) {
                // Show product
                card.classList.remove('filtered-out');
                timeline.to(card, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power3.out",
                    force3D: true
                }, index * 0.05);
            } else {
                // Hide product
                card.classList.add('filtered-out');
                timeline.to(card, {
                    opacity: 0,
                    y: 50,
                    scale: 0.9,
                    duration: 0.4,
                    ease: "power2.in",
                    force3D: true
                }, index * 0.02);
            }
        });
    }
    
    // Product Card Animations
    function initProductAnimations() {
        const productCards = document.querySelectorAll('.product-card');
        
        if (!productCards.length) return;
        
        // Set initial states
        gsap.set(productCards, {
            opacity: 0,
            y: 80,
            scale: 0.95,
            force3D: true
        });
        
        // Create scroll trigger for product animations
        const productsTL = gsap.timeline({
            scrollTrigger: {
                trigger: '.menswear-products-section',
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse",
            }
        });
        
        // Animate products with stagger
        productsTL.to(productCards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: {
                amount: 1.5,
                from: "start"
            },
            force3D: true
        });
    }
    
    // Product Interactions
    function initProductInteractions() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const discoverBtn = card.querySelector('.discover-btn');
            
            // Product card click handler
            card.addEventListener('click', function(e) {
                if (e.target === discoverBtn) return; // Let button handle its own click
                
                const productId = this.getAttribute('data-product-id');
                const productName = this.querySelector('.product-name').textContent;
                
                if (productId) {
                    // Navigate to product detail page with animation
                    gsap.to('body', {
                        opacity: 0.8,
                        duration: 0.3,
                        ease: "power2.out",
                        onComplete: () => {
                            window.location.href = `product-detail.html?product=${productId}`;
                        }
                    });
                    console.log(`Navigating to product detail: ${productName} (${productId})`);
                } else {
                    console.log(`No product ID found for: ${productName}`);
                }
            });
            
            // Discover button handler
            if (discoverBtn) {
                discoverBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const productId = card.getAttribute('data-product-id');
                    const productName = card.querySelector('.product-name').textContent;
                    
                    // Add animation effect
                    gsap.to(this, {
                        scale: 0.95,
                        duration: 0.1,
                        yoyo: true,
                        repeat: 1,
                        ease: "power2.inOut"
                    });
                    
                    // Navigate to product detail page
                    setTimeout(() => {
                        if (productId) {
                            gsap.to('body', {
                                opacity: 0.8,
                                duration: 0.3,
                                ease: "power2.out",
                                onComplete: () => {
                                    window.location.href = `product-detail.html?product=${productId}`;
                                }
                            });
                            console.log(`Discover clicked: ${productName} (${productId})`);
                        } else {
                            console.log(`No product ID found for: ${productName}`);
                        }
                    }, 200);
                });
            }
        });
    }
    
    // Load More Button Functionality
    function initLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        
        if (!loadMoreBtn) return;
        
        loadMoreBtn.addEventListener('click', function() {
            // Add loading animation
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            // Simulate loading more products
            setTimeout(() => {
                // Here you would typically fetch more products from an API
                console.log('Loading more products...');
                
                // Reset button
                this.textContent = originalText;
                this.disabled = false;
                
                // Add success animation
                gsap.to(this, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
            }, 1500);
        });
    }
    
    // Newsletter Section Animation
    function initNewsletterAnimation() {
        const newsletterSection = document.querySelector('.newsletter-section');
        const newsletterTitle = document.querySelector('.newsletter-title');
        const newsletterDescription = document.querySelector('.newsletter-section .newsletter-description');
        const newsletterForm = document.querySelector('.newsletter-signup-form');
        
        if (!newsletterSection) return;
        
        // Create timeline for newsletter section
        const newsletterTL = gsap.timeline({
            scrollTrigger: {
                trigger: newsletterSection,
                start: "top 75%",
                end: "bottom 25%",
                toggleActions: "play none none reverse",
            }
        });
        
        // Animate newsletter elements
        newsletterTL
            .to(newsletterTitle, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                force3D: true
            })
            .to(newsletterDescription, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                force3D: true
            }, "-=0.4")
            .to(newsletterForm, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                force3D: true
            }, "-=0.3");
        
        // Newsletter form submission
        const form = document.querySelector('.newsletter-signup-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const input = this.querySelector('.newsletter-input');
                const submitBtn = this.querySelector('.newsletter-submit-btn');
                const email = input.value.trim();
                
                if (!email || !isValidEmail(email)) {
                    // Add error animation
                    gsap.to(input, {
                        x: [-10, 10, -10, 10, 0],
                        duration: 0.5,
                        ease: "power2.inOut"
                    });
                    return;
                }
                
                // Add success animation
                const originalHTML = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                submitBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = '#ffffff';
                    input.value = '';
                }, 2000);
                
                console.log(`Newsletter subscription: ${email}`);
            });
        }
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Parallax Effect for Hero Section
    function initParallaxEffect() {
        const heroSection = document.querySelector('.menswear-hero');
        
        if (!heroSection) return;
        
        gsap.to(heroSection, {
            backgroundPosition: "50% 100%",
            ease: "none",
            scrollTrigger: {
                trigger: heroSection,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }
    
    // Initialize parallax effect
    initParallaxEffect();
    
    // Debounced resize handler for better performance
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });
    
    // Smooth scroll enhancement for better performance
    let ticking = false;
    
    function updateScrollTriggers() {
        ScrollTrigger.update();
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollTriggers);
            ticking = true;
        }
    }, { passive: true });
    
    // Add magnetic effect to buttons
    function initMagneticButtons() {
        const magneticElements = document.querySelectorAll('.filter-btn, .discover-btn, .load-more-btn, .newsletter-submit-btn');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(this, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            element.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        });
    }
    
    // Initialize magnetic buttons
    initMagneticButtons();
    
    // Add intersection observer for performance
    function initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, observerOptions);
        
        // Observe elements for performance optimization
        document.querySelectorAll('.product-card, .filter-btn').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Initialize intersection observer
    initIntersectionObserver();
    
    // Footer Animation
    function initFooterAnimations() {
        const footer = document.querySelector('.footer');
        const footerLogo = document.querySelector('.footer-logo img');
        const footerSections = document.querySelectorAll('.footer-section');
        const socialLinks = document.querySelectorAll('.social-link');
        const footerLinks = document.querySelectorAll('.footer-links li');
        const newsletterForm = document.querySelector('.newsletter-form');
        const footerBottom = document.querySelector('.footer-bottom-content');
        
        if (!footer) return;
        
        // Set initial states
        gsap.set(footerLogo, {
            opacity: 0,
            y: 20,
            force3D: true
        });
        
        gsap.set(footerSections, {
            opacity: 0,
            y: 30,
            force3D: true
        });
        
        gsap.set(socialLinks, {
            opacity: 0,
            y: 20,
            scale: 0.8,
            force3D: true
        });
        
        gsap.set(footerLinks, {
            opacity: 0,
            x: -20,
            force3D: true
        });
        
        gsap.set(newsletterForm, {
            opacity: 0,
            y: 20,
            force3D: true
        });
        
        gsap.set(footerBottom, {
            opacity: 0,
            y: 20,
            force3D: true
        });
        
        // Create footer timeline
        const footerTL = gsap.timeline({
            scrollTrigger: {
                trigger: footer,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
        
        // Animate footer elements
        footerTL
        // Logo first
        .to(footerLogo, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            force3D: true
        })
        // Footer sections with stagger
        .to(footerSections, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            force3D: true
        }, "-=0.4")
        // Social links with stagger
        .to(socialLinks, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.1,
            force3D: true
        }, "-=0.6")
        // Footer links with stagger
        .to(footerLinks, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.05,
            force3D: true
        }, "-=0.5")
        // Newsletter form
        .to(newsletterForm, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            force3D: true
        }, "-=0.4")
        // Footer bottom
        .to(footerBottom, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            force3D: true
        }, "-=0.2");
    }
    
    // Console message for developers
    console.log('🎉 ZeeClothes Menswear page loaded successfully!');
    console.log('✨ Featuring sophisticated animations and modern interactions');
});

// Product Database
const products = [
    {
        id: 'obsidian',
        name: 'OBSIDIAN',
        description: 'Polo with zip and contrast details.',
        price: 9810,
        image: 'assets/images/PLANE_SHIRT.png',
        category: 'polo',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Navy', 'White']
    },
    {
        id: 'tephra',
        name: 'TEPHRA',
        description: 'Essential organic cotton polo.',
        price: 6210,
        image: 'assets/images/SHIRT_IMAGE.jpeg',
        category: 'polo',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Black', 'Grey']
    },
    {
        id: 'diorite',
        name: 'DIORITE',
        description: 'Cotton and cashmere cardigan.',
        price: 11610,
        image: 'assets/images/Hoddie_IMAGE.jpeg',
        category: 'sweater',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Navy', 'Grey', 'Black']
    },
    {
        id: 'septaria',
        name: 'SEPTARIA',
        description: 'Crew neck sweater in cotton and cashmere.',
        price: 9810,
        image: 'assets/images/PLANE_HODDIE.png',
        category: 'sweater',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Grey', 'Navy']
    },
    {
        id: 'basalt',
        name: 'BASALT',
        description: 'Hand-dyed cashmere crew neck sweater.',
        price: 17010,
        image: 'assets/images/JACKET_IMAGE.jpeg',
        category: 'sweater',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Navy', 'Black', 'Grey']
    },
    {
        id: 'travertine',
        name: 'TRAVERTINE',
        description: 'Cotton and cashmere t-shirt.',
        price: 7380,
        image: 'assets/images/PLANE_TSHIRT.png',
        category: 'tshirt',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Black', 'Grey']
    },
    {
        id: 'cotton-classic',
        name: 'COTTON CLASSIC',
        description: 'Premium organic cotton t-shirt.',
        price: 5490,
        image: 'assets/images/TSHIRT_IMAGE.jpeg',
        category: 'tshirt',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Black', 'Navy']
    },
    {
        id: 'denim-casual',
        name: 'DENIM CASUAL',
        description: 'Premium denim with modern fit.',
        price: 12990,
        image: 'assets/images/JEANS_IMAGE.jpeg',
        category: 'polo',
        sizes: ['30', '32', '34', '36'],
        colors: ['Blue', 'Black', 'Grey']
    },
    {
        id: 'formal-suit',
        name: 'FORMAL SUIT',
        description: 'Tailored wool blend suit.',
        price: 24990,
        image: 'assets/images/Suit_image.jpeg',
        category: 'sweater',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Navy', 'Black', 'Grey']
    }
];

// Cart Management
class CartManager {
    constructor() {
        console.log('CartManager constructor called');
        this.cart = this.loadCart();
        console.log('Initial cart loaded:', this.cart);
        this.updateCartCount();
        this.bindEvents();
        console.log('CartManager constructor completed');
    }

    loadCart() {
        const savedCart = localStorage.getItem('zeeclothes_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    saveCart() {
        localStorage.setItem('zeeclothes_cart', JSON.stringify(this.cart));
    }

    addToCart(product, size = 'M', quantity = 1) {
        console.log('Adding to cart:', { product, size, quantity });
        
        const existingItem = this.cart.find(item => 
            item.id === product.id && item.size === size
        );

        if (existingItem) {
            existingItem.quantity += quantity;
            console.log('Updated existing item quantity to:', existingItem.quantity);
        } else {
            this.cart.push({
                ...product,
                size: size,
                quantity: quantity
            });
            console.log('Added new item to cart');
        }

        console.log('Current cart:', this.cart);
        this.saveCart();
        this.updateCartCount();
        this.showAddToCartNotification(product.name);
    }

    updateCartCount() {
        console.log('Updating cart count...');
        updateGlobalCartCount();
        
        // Dispatch custom event to notify other pages
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        console.log('Cart count:', count);
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count } }));
    }

    showAddToCartNotification(productName) {
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${productName} added to cart!</span>
            <button onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }

    bindEvents() {
        // Add click handlers to "Discover Now" buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('discover-btn')) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Discover button clicked!');
                
                const productCard = e.target.closest('.product-card');
                if (productCard) {
                    const productId = productCard.dataset.productId;
                    console.log('Product ID:', productId);
                    
                    const product = products.find(p => p.id === productId);
                    if (product) {
                        console.log('Product found:', product);
                        this.showQuickAddModal(product);
                    } else {
                        console.log('Product not found for ID:', productId);
                        console.log('Available products:', products.map(p => p.id));
                    }
                } else {
                    console.log('Product card not found');
                }
            }
        });
        
        // Test button functionality
        const testBtn = document.getElementById('test-cart-btn');
        if (testBtn) {
            testBtn.addEventListener('click', () => {
                console.log('Test button clicked!');
                const testProduct = {
                    id: 'test-product',
                    name: 'Test Product',
                    description: 'This is a test product',
                    price: 1000,
                    image: 'assets/images/PLANE_SHIRT.png',
                    sizes: ['S', 'M', 'L', 'XL']
                };
                this.addToCart(testProduct, 'M', 1);
            });
        }
    }

    showQuickAddModal(product) {
        console.log('Showing modal for product:', product);
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'quick-add-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Add to Cart</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="product-preview">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-info">
                            <h4>${product.name}</h4>
                            <p>${product.description}</p>
                            <span class="price">₹${product.price.toLocaleString()}</span>
                        </div>
                    </div>
                    <div class="size-selection">
                        <label>Select Size:</label>
                        <div class="size-options">
                            ${product.sizes.map(size => `
                                <button class="size-btn" data-size="${size}">${size}</button>
                            `).join('')}
                        </div>
                    </div>
                    <div class="quantity-selection">
                        <label>Quantity:</label>
                        <div class="quantity-controls">
                            <button class="qty-btn minus">-</button>
                            <span class="qty-value">1</span>
                            <button class="qty-btn plus">+</button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Modal functionality
        let selectedSize = product.sizes[0];
        let quantity = 1;

        // Size selection
        modal.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                modal.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedSize = btn.dataset.size;
            });
        });

        // Quantity controls
        modal.querySelector('.minus').addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                modal.querySelector('.qty-value').textContent = quantity;
            }
        });

        modal.querySelector('.plus').addEventListener('click', () => {
            quantity++;
            modal.querySelector('.qty-value').textContent = quantity;
        });

        // Add to cart
        modal.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            console.log('Add to cart clicked!', { product, selectedSize, quantity });
            this.addToCart(product, selectedSize, quantity);
            this.closeModal(modal);
        });

        // Close modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal(modal);
        });

        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            this.closeModal(modal);
        });

        // Select first size by default
        modal.querySelector('.size-btn').classList.add('selected');
    }

    closeModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentElement) {
                modal.parentElement.removeChild(modal);
            }
        }, 300);
    }
}

// Initialize cart manager
console.log('Initializing CartManager...');
let cartManager;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        cartManager = new CartManager();
        console.log('CartManager initialized:', cartManager);
        
        // Test if cart manager is working
        console.log('Testing cart functionality...');
        console.log('Cart manager methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(cartManager)));
        
    } catch (error) {
        console.error('Error initializing CartManager:', error);
    }
});

// Listen for cart changes from other pages
window.addEventListener('storage', function(e) {
    if (e.key === 'zeeclothes_cart') {
        updateGlobalCartCount();
    }
});

// Listen for custom cart update events
window.addEventListener('cartUpdated', function(e) {
    updateGlobalCartCount();
});