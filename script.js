// Global cart count update function
function updateGlobalCartCount() {
    const savedCart = localStorage.getItem('zeeclothes_cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => {
        element.textContent = count;
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
    
    // Page load optimization
    window.addEventListener('load', () => {
        // Optimize page performance after load
        ScrollTrigger.refresh();
        
        // Add smooth fade-in for page
        setTimeout(() => {
            document.body.classList.add('loaded');
            initHeroAnimation();
        }, 100);
    });
    
    // Mobile menu toggle functionality
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (hamburgerMenu && mobileMenu) {
        hamburgerMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
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
    
    // Hero Title Animation
    function initHeroAnimation() {
        const heroTitle = document.getElementById('hero-title');
        if (!heroTitle) return;
        
        // Split text into characters
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        
        [...text].forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.classList.add('char');
            span.style.transitionDelay = `${index * 0.05}s`;
            heroTitle.appendChild(span);
        });
        
        // Trigger animation
        setTimeout(() => {
            heroTitle.classList.add('loaded');
            
            // Add shimmer effect
            setTimeout(() => {
                heroTitle.classList.add('animate');
            }, 1000);
        }, 200);
    }

    // Scroll-Triggered Sections Animation
    function initScrollAnimations() {
        const sections = document.querySelectorAll('.scroll-section');
        
        sections.forEach((section, index) => {
            const image = section.querySelector('.reveal-image');
            const title = section.querySelector('.section-title');
            const description = section.querySelector('.section-description');
            const designLine = section.querySelector('.design-line');
            const imageContainer = section.querySelector('.image-container');
            const direction = imageContainer.getAttribute('data-direction');
            
            // Create timeline for each section
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    end: "bottom 25%",
                    toggleActions: "play none none reverse",
                    // markers: true, // Uncomment for debugging
                }
            });
            
            // Set initial states with performance optimizations
            gsap.set(image, {
                opacity: 0,
                x: direction === 'right' ? 100 : -100,
                scale: 1.1,
                force3D: true
            });
            
            gsap.set(title, {
                opacity: 0,
                y: 50,
                force3D: true
            });
            
            gsap.set(description, {
                opacity: 0,
                y: 30,
                force3D: true
            });
            
            gsap.set(designLine, {
                opacity: 0,
                scaleX: designLine.classList.contains('vertical') ? 1 : 0,
                scaleY: designLine.classList.contains('vertical') ? 0 : 1,
                force3D: true
            });
            
            // Animation sequence with performance optimizations
            tl.to(image, {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                force3D: true,
                onComplete: function() {
                    // Add revealed class for hover effects
                    image.classList.add('revealed');
                }
            })
            .to(title, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                force3D: true
            }, "-=0.4")
            .to(description, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                force3D: true
            }, "-=0.6")
            .to(designLine, {
                opacity: 1,
                scaleX: 1,
                scaleY: 1,
                duration: 0.8,
                ease: "power2.inOut",
                force3D: true
            }, "-=0.3");
            
            // Add subtle floating animation to images with performance optimization
            gsap.to(imageContainer, {
                y: -15,
                duration: 4,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
                delay: index * 0.3,
                force3D: true
            });
        });
    }
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize global parallax motion
    initParallaxMotion();
    
    // Bestseller Section Animation
    function initBestsellerAnimations() {
        const bestsellerSection = document.querySelector('.bestseller-section');
        const bestsellerTitle = document.querySelector('.bestseller-title');
        const productCards = document.querySelectorAll('.product-card');
        
        if (!bestsellerSection || !bestsellerTitle || !productCards.length) return;
        
        // Title animation
        gsap.set(bestsellerTitle, {
            opacity: 0,
            y: 50,
            force3D: true
        });
        
        // Cards initial state
        gsap.set(productCards, {
            opacity: 0,
            y: 80,
            scale: 0.9,
            force3D: true
        });
        
        // Create timeline for bestseller section
        const bestsellerTL = gsap.timeline({
            scrollTrigger: {
                trigger: bestsellerSection,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse",
                // markers: true, // Uncomment for debugging
            }
        });
        
        // Animate title first
        bestsellerTL.to(bestsellerTitle, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            force3D: true
        })
        // Then animate cards one by one with stagger
        .to(productCards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: {
                amount: 1.2,
                from: "start"
            },
            force3D: true
        }, "-=0.3");
    }
    
    // Initialize bestseller animations
    initBestsellerAnimations();
    
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
                toggleActions: "play none none reverse",
                // markers: true, // Uncomment for debugging
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
    
    // Initialize footer animations
    initFooterAnimations();
    
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
    
    // Fetch products from API (when using Flask backend)
    function fetchProducts() {
        // Check if we're running with the Flask backend
        if (window.location.port === '5000' || window.location.hostname !== 'localhost') {
            fetch('/api/products')
                .then(response => response.json())
                .then(products => {
                    console.log('Products loaded:', products);
                    // Here you would normally display the products
                    // This is just a placeholder for future implementation
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        }
    }
    
    // Fetch collections from API (when using Flask backend)
    function fetchCollections() {
        // Check if we're running with the Flask backend
        if (window.location.port === '5000' || window.location.hostname !== 'localhost') {
            fetch('/api/collections')
                .then(response => response.json())
                .then(collections => {
                    console.log('Collections loaded:', collections);
                    // Here you would normally display the collections
                    // This is just a placeholder for future implementation
                })
                .catch(error => {
                    console.error('Error fetching collections:', error);
                });
        }
    }
    
    // Initialize API data fetching
    fetchProducts();
    fetchCollections();
    
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
    
    // Parallax Motion
    function initParallaxMotion() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        
        const parallaxElements = [];
        
        // Hero
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) parallaxElements.push({ el: heroContent, speed: 0.15 });
        
        // Spline background in scroll container
        const splineBg = document.querySelector('.spline-background');
        if (splineBg) parallaxElements.push({ el: splineBg, speed: 0.1, scale: 1.03 });
        
        // Section reveal images
        document.querySelectorAll('.reveal-image').forEach((el, i) => {
            parallaxElements.push({ el, speed: 0.2 + (i % 3) * 0.05 });
        });
        
        // Product images
        document.querySelectorAll('.product-image img, .product-img').forEach((el, i) => {
            parallaxElements.push({ el, speed: 0.12 + (i % 2) * 0.05 });
        });
        
        // Footer bg subtle motion
        document.querySelectorAll('.footer-bg-elements .bg-element').forEach((el, i) => {
            parallaxElements.push({ el, speed: 0.08 + (i % 3) * 0.03 });
        });
        
        parallaxElements.forEach(({ el, speed, scale }) => {
            // Skip if element not in DOM
            if (!el) return;
            
            const triggerTarget = el.closest('section') || el;
            const fromY = -40 * speed * 10;
            const toY = 40 * speed * 10;
            
            gsap.fromTo(el,
                { y: fromY, scale: scale ? scale : 1 },
                {
                    y: toY,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: triggerTarget,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );
        });
    }
});