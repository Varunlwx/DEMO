// Product data structure matching Akke website products
const PRODUCTS_DATA = {
    'obsidian': {
        name: 'OBSIDIAN',
        price: '₹ 9,810',
        description: 'Organic cotton polo with textured finish, front zip and two-tone sleeves for a distinctive look.',
        images: [
            'assets/images/PLANE_SHIRT.png',
            'assets/images/SHIRT_IMAGE.jpeg',
            'assets/images/PLANE_TSHIRT.png'
        ],
        colors: [
            { name: 'Orange', value: '#FF6B35', active: true },
            { name: 'Black', value: '#000000', active: false },
            { name: 'Navy Blue', value: '#1E3A8A', active: false }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        details: [
            'Made with fine gauge 7',
            'English knit structure',
            'Contrast sleeve inlay',
            'Regular fit',
            '15cm zip opening',
            'Total black logo patch on left sleeve'
        ],
        materials: [
            '67% Organic cotton',
            '33% Pa sensil biocare'
        ],
        category: 'polo'
    },
    'tephra': {
        name: 'TEPHRA',
        price: '₹ 6,210',
        description: 'Essential organic cotton polo, minimal design and superior comfort for timeless style.',
        images: [
            'assets/images/SHIRT_IMAGE.jpeg',
            'assets/images/PLANE_SHIRT.png',
            'assets/images/TSHIRT_IMAGE.jpeg'
        ],
        colors: [
            { name: 'Grey', value: '#6B7280', active: true },
            { name: 'White', value: '#FFFFFF', active: false },
            { name: 'Sage Green', value: '#9CAF88', active: false }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        details: [
            'Essential and clean design',
            'Regular fit cut',
            'Classic polo collar',
            'Mother-of-pearl buttons',
            'Reinforced seams'
        ],
        materials: [
            '100% Organic cotton',
            'Certified GOTS standard'
        ],
        category: 'polo'
    },
    'diorite': {
        name: 'DIORITE',
        price: '₹ 11,610',
        description: 'Cotton and cashmere cardigan, softness and elegance for luxury comfort.',
        images: [
            'assets/images/Hoddie_IMAGE.jpeg',
            'assets/images/PLANE_HODDIE.png',
            'assets/images/JACKET_IMAGE.jpeg'
        ],
        colors: [
            { name: 'Beige', value: '#D4C5B9', active: true },
            { name: 'Charcoal Grey', value: '#374151', active: false },
            { name: 'Camel', value: '#C19A6B', active: false }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        details: [
            'Premium cotton and cashmere blend',
            'Natural horn buttons',
            'Functional front pockets',
            'Relaxed and comfortable fit',
            'Ribbed elastic edges'
        ],
        materials: [
            '70% Cotton',
            '30% Cashmere'
        ],
        category: 'sweater'
    },
    'septaria': {
        name: 'SEPTARIA',
        price: '₹ 9,810',
        description: 'Crew neck sweater in cotton and cashmere, refined texture for a sophisticated look.',
        images: [
            'assets/images/PLANE_HODDIE.png',
            'assets/images/Hoddie_IMAGE.jpeg',
            'assets/images/JACKET_IMAGE.jpeg'
        ],
        colors: [
            { name: 'Dark Blue', value: '#1E3A8A', active: true },
            { name: 'Grey Melange', value: '#9CA3AF', active: false },
            { name: 'Burgundy', value: '#7C2D12', active: false }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        details: [
            'Classic crew neck',
            'Regular fit',
            'Ribbed cuffs and hem',
            'Discreet logo detail',
            'Artisan craftsmanship'
        ],
        materials: [
            '75% Cotton',
            '25% Cashmere'
        ],
        category: 'sweater'
    },
    'basalt': {
        name: 'BASALT',
        price: '₹ 17,010',
        description: 'Hand-dyed cashmere crew neck sweater, absolute luxury and supreme comfort.',
        images: [
            'assets/images/JACKET_IMAGE.jpeg',
            'assets/images/Suit_image.jpeg',
            'assets/images/SHADY_IMAGE.jpeg'
        ],
        colors: [
            { name: 'Black', value: '#000000', active: true },
            { name: 'Charcoal Grey', value: '#374151', active: false },
            { name: 'Midnight Blue', value: '#1E293B', active: false }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        details: [
            '100% premium cashmere',
            'Hand-dyed with traditional techniques',
            'Soft and enveloping texture',
            'Elegant crew neck',
            'Made in Italy'
        ],
        materials: [
            '100% Pure Cashmere',
            'Hand-dyed finish'
        ],
        category: 'sweater'
    },
    'travertine': {
        name: 'TRAVERTINE',
        price: '₹ 7,380',
        description: 'Cotton and cashmere t-shirt, everyday softness with a touch of luxury.',
        images: [
            'assets/images/PLANE_TSHIRT.png',
            'assets/images/TSHIRT_IMAGE.jpeg',
            'assets/images/PLANE_SHIRT.png'
        ],
        colors: [
            { name: 'White', value: '#FFFFFF', active: true },
            { name: 'Black', value: '#000000', active: false },
            { name: 'Light Grey', value: '#F3F4F6', active: false }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        details: [
            'Slim fit cut',
            'Classic crew neck',
            'French seams',
            'Small embroidered logo',
            'Straight hem'
        ],
        materials: [
            '85% Cotton',
            '15% Cashmere'
        ],
        category: 'tshirt'
    },
    'arenaria': {
        name: 'ARENARIA',
        price: '₹ 8,550',
        description: 'Lightweight crew neck sweater, comfort and style for every occasion.',
        images: [
            'assets/images/TSHIRT_IMAGE.jpeg',
            'assets/images/Hoddie_IMAGE.jpeg',
            'assets/images/PLANE_HODDIE.png'
        ],
        colors: [
            { name: 'Natural Beige', value: '#F5F5DC', active: true },
            { name: 'Light Grey', value: '#D3D3D3', active: false },
            { name: 'Sky Blue', value: '#87CEEB', active: false }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        details: [
            'Lightweight and breathable yarn',
            'Classic crew neck',
            'Regular fit',
            'Ribbed hems and cuffs',
            'Reinforced seams'
        ],
        materials: [
            '100% Cotton',
            'Light weight fabric'
        ],
        category: 'sweater'
    },
    'slate': {
        name: 'SLATE',
        price: '₹ 8,550',
        description: 'Cotton and cashmere crew neck sweater, everyday elegance with superior comfort.',
        images: [
            'assets/images/Suit_image.jpeg',
            'assets/images/JACKET_IMAGE.jpeg',
            'assets/images/SHADY_IMAGE.jpeg'
        ],
        colors: [
            { name: 'Slate Grey', value: '#708090', active: true },
            { name: 'Charcoal Black', value: '#36454F', active: false },
            { name: 'Dark Blue', value: '#2F4F4F', active: false }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        details: [
            'Cotton and cashmere blend',
            'Soft and smooth texture',
            'Elegant crew neck',
            'Minimalist design',
            'Easy maintenance'
        ],
        materials: [
            '80% Cotton',
            '20% Cashmere'
        ],
        category: 'sweater'
    },
    'unakite': {
        name: 'UNAKITE',
        price: '₹ 5,580',
        description: 'Organic cotton t-shirt with front logo, casual style and sustainable.',
        images: [
            'assets/images/TSHIRT_IMAGE.jpeg',
            'assets/images/PLANE_TSHIRT.png',
            'assets/images/SHIRT_IMAGE.jpeg'
        ],
        colors: [
            { name: 'Forest Green', value: '#228B22', active: true },
            { name: 'Natural White', value: '#F8F8FF', active: false },
            { name: 'Grey Melange', value: '#A9A9A9', active: false }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        details: [
            'Certified organic cotton',
            'Front embroidered logo',
            'Regular fit cut',
            'Classic crew neck',
            'Sustainable production'
        ],
        materials: [
            '100% Organic Cotton',
            'GOTS Certified'
        ],
        category: 'tshirt'
    },
    'dolomia': {
        name: 'DOLOMIA',
        price: '₹ 6,210',
        description: 'Organic cotton t-shirt, essential and versatile for every moment of the day.',
        images: [
            'assets/images/PLANE_TSHIRT.png',
            'assets/images/TSHIRT_IMAGE.jpeg',
            'assets/images/PLANE_SHIRT.png'
        ],
        colors: [
            { name: 'Pure White', value: '#FFFFFF', active: true },
            { name: 'Deep Black', value: '#000000', active: false },
            { name: 'Pearl Grey', value: '#E5E4E2', active: false }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        details: [
            'Organic cotton fabric',
            'Clean and minimal design',
            'Comfortable and durable',
            'Versatile for any outfit',
            'Easy to match'
        ],
        materials: [
            '100% Organic Cotton',
            'Pre-shrunk fabric'
        ],
        category: 'tshirt'
    },
    'cotton-classic': {
        name: 'COTTON CLASSIC',
        price: '₹ 5,490',
        description: 'Premium organic cotton t-shirt, essential comfort for everyday wear.',
        images: [
            'assets/images/TSHIRT_IMAGE.jpeg',
            'assets/images/PLANE_TSHIRT.png',
            'assets/images/SHIRT_IMAGE.jpeg'
        ],
        colors: [
            { name: 'White', value: '#FFFFFF', active: true },
            { name: 'Black', value: '#000000', active: false },
            { name: 'Navy', value: '#1E3A8A', active: false }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        details: [
            'Premium organic cotton',
            'Classic crew neck',
            'Regular fit',
            'Reinforced seams',
            'Soft hand feel'
        ],
        materials: [
            '100% Organic Cotton',
            'GOTS certified'
        ],
        category: 'tshirt'
    },
    'denim-casual': {
        name: 'DENIM CASUAL',
        price: '₹ 12,990',
        description: 'Premium denim with modern fit, classic style with contemporary comfort.',
        images: [
            'assets/images/JEANS_IMAGE.jpeg',
            'assets/images/SHADY_IMAGE.jpeg',
            'assets/images/Suit_image.jpeg'
        ],
        colors: [
            { name: 'Indigo Blue', value: '#4B0082', active: true },
            { name: 'Black', value: '#000000', active: false },
            { name: 'Light Wash', value: '#6495ED', active: false }
        ],
        sizes: ['28', '30', '32', '34', '36', '38'],
        details: [
            'Premium denim fabric',
            'Modern tapered fit',
            '5-pocket styling',
            'YKK zipper',
            'Reinforced stress points'
        ],
        materials: [
            '98% Cotton',
            '2% Elastane'
        ],
        category: 'polo'
    },
    'formal-suit': {
        name: 'FORMAL SUIT',
        price: '₹ 24,990',
        description: 'Tailored wool blend suit, sophisticated elegance for formal occasions.',
        images: [
            'assets/images/Suit_image.jpeg',
            'assets/images/JACKET_IMAGE.jpeg',
            'assets/images/SHADY_IMAGE.jpeg'
        ],
        colors: [
            { name: 'Charcoal Grey', value: '#36454F', active: true },
            { name: 'Navy Blue', value: '#1E3A8A', active: false },
            { name: 'Black', value: '#000000', active: false }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        details: [
            'Tailored wool blend',
            'Slim fit cut',
            'Notched lapel',
            'Two-button closure',
            'Interior pockets'
        ],
        materials: [
            '70% Wool',
            '30% Polyester'
        ],
        category: 'sweater'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Performance optimizations
    gsap.config({
        force3D: true,
        nullTargetWarn: false
    });
    
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize header scroll effects
    initHeaderEffects();
    
    // Load product data from URL parameters
    loadProductFromURL();
    
    // Initialize page functionality
    initProductDetailPage();
    
    // Page load optimization
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
        
        setTimeout(() => {
            document.body.classList.add('loaded');
            initPageAnimations();
            initFooterAnimations();
        }, 100);
    });
    
    // Mobile menu functionality
    initMobileMenu();
});

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

// Mobile Menu
function initMobileMenu() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!hamburgerMenu || !mobileMenu) return;
    
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
}

// Load Product from URL Parameters
function loadProductFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    
    if (productId && PRODUCTS_DATA[productId]) {
        loadProduct(PRODUCTS_DATA[productId]);
    } else {
        // Default to first product if no valid product ID
        loadProduct(PRODUCTS_DATA['obsidian']);
    }
}

// Load Product Data
function loadProduct(product) {
    // Update page title
    document.getElementById('product-page-title').textContent = `${product.name} - ZeeClothes`;
    
    // Update breadcrumb
    document.getElementById('breadcrumb-product').textContent = product.name;
    
    // Update product info
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-price').textContent = product.price;
    document.getElementById('product-description').textContent = product.description;
    
    // Update main image
    const mainImage = document.getElementById('main-product-image');
    mainImage.src = product.images[0];
    mainImage.alt = product.name;
    
    // Update image gallery
    updateImageGallery(product.images);
    
    // Update color options
    updateColorOptions(product.colors);
    
    // Update size options
    updateSizeOptions(product.sizes);
    
    // Update product details
    updateProductDetails(product.details);
    
    // Update materials
    updateMaterials(product.materials);
    
    // Load related products
    loadRelatedProducts(product.category, product.name);
}

// Update Image Gallery
function updateImageGallery(images) {
    const thumbnailGallery = document.getElementById('thumbnail-gallery');
    const mainImage = document.getElementById('main-product-image');
    
    thumbnailGallery.innerHTML = '';
    
    images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${image}" alt="Product thumbnail ${index + 1}">`;
        
        thumbnail.addEventListener('click', () => {
            // Update main image
            mainImage.src = image;
            
            // Update active thumbnail
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
            
            // Add animation
            gsap.fromTo(mainImage, 
                { opacity: 0, scale: 1.1 },
                { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
            );
        });
        
        thumbnailGallery.appendChild(thumbnail);
    });
}

// Update Color Options
function updateColorOptions(colors) {
    const colorOptions = document.getElementById('color-options');
    const selectedColorSpan = document.getElementById('selected-color');
    
    colorOptions.innerHTML = '';
    
    colors.forEach((color, index) => {
        const colorOption = document.createElement('div');
        colorOption.className = `color-option ${color.active ? 'active' : ''}`;
        colorOption.style.backgroundColor = color.value;
        colorOption.innerHTML = '<i class="fas fa-check color-check"></i>';
        
        colorOption.addEventListener('click', () => {
            // Update active color
            document.querySelectorAll('.color-option').forEach(c => c.classList.remove('active'));
            colorOption.classList.add('active');
            
            // Update selected color text
            selectedColorSpan.textContent = color.name;
            
            // Add animation
            gsap.to(colorOption, {
                scale: 0.9,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        });
        
        // Set initial selected color
        if (color.active) {
            selectedColorSpan.textContent = color.name;
        }
        
        colorOptions.appendChild(colorOption);
    });
}

// Update Size Options
function updateSizeOptions(sizes) {
    const sizeOptions = document.getElementById('size-options');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    sizeOptions.innerHTML = '';
    
    sizes.forEach(size => {
        const sizeOption = document.createElement('div');
        sizeOption.className = 'size-option';
        sizeOption.textContent = size;
        
        sizeOption.addEventListener('click', () => {
            // Update active size
            document.querySelectorAll('.size-option').forEach(s => s.classList.remove('active'));
            sizeOption.classList.add('active');
            
            // Enable add to cart button
            addToCartBtn.disabled = false;
            
            // Add animation
            gsap.to(sizeOption, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        });
        
        sizeOptions.appendChild(sizeOption);
    });
}

// Update Product Details
function updateProductDetails(details) {
    const detailsList = document.getElementById('product-details-list');
    detailsList.innerHTML = '';
    
    details.forEach(detail => {
        const li = document.createElement('li');
        li.textContent = detail;
        detailsList.appendChild(li);
    });
}

// Update Materials
function updateMaterials(materials) {
    const materialsList = document.getElementById('materials-list');
    materialsList.innerHTML = '';
    
    materials.forEach(material => {
        const li = document.createElement('li');
        li.textContent = material;
        materialsList.appendChild(li);
    });
}

// Load Related Products
function loadRelatedProducts(category, currentProductName) {
    const relatedProductsGrid = document.getElementById('related-products-grid');
    relatedProductsGrid.innerHTML = '';
    
    // Filter products by category and exclude current product
    const relatedProducts = Object.keys(PRODUCTS_DATA)
        .filter(key => {
            const product = PRODUCTS_DATA[key];
            return product.category === category && product.name !== currentProductName;
        })
        .slice(0, 4); // Show maximum 4 related products
    
    relatedProducts.forEach(productKey => {
        const product = PRODUCTS_DATA[productKey];
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}" class="product-img">
                <div class="product-overlay">
                    <button class="discover-btn">Discover Now</button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <span class="product-price">${product.price}</span>
            </div>
        `;
        
        // Add click handler
        productCard.addEventListener('click', () => {
            window.location.href = `product-detail.html?product=${productKey}`;
        });
        
        relatedProductsGrid.appendChild(productCard);
    });
}

// Initialize Product Detail Page
function initProductDetailPage() {
    initAccordion();
    initModals();
    initProductActions();
    initImageZoom();
}

// Initialize Accordion
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const target = header.getAttribute('data-target');
            const content = document.getElementById(target);
            const isActive = header.classList.contains('active');
            
            // Close all accordions
            accordionHeaders.forEach(h => h.classList.remove('active'));
            document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('active'));
            
            // Open clicked accordion if it wasn't active
            if (!isActive) {
                header.classList.add('active');
                content.classList.add('active');
            }
        });
    });
}

// Initialize Modals
function initModals() {
    // Size guide modal
    const sizeGuideBtn = document.getElementById('size-guide-btn');
    const sizeGuideModal = document.getElementById('size-guide-modal');
    
    if (sizeGuideBtn && sizeGuideModal) {
        sizeGuideBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sizeGuideModal.classList.add('active');
        });
    }
    
    // Notify modal
    const notifyBtn = document.getElementById('notify-btn');
    const notifyModal = document.getElementById('notify-modal');
    
    if (notifyBtn && notifyModal) {
        notifyBtn.addEventListener('click', () => {
            notifyModal.classList.add('active');
        });
    }
    
    // Close modals
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.classList.remove('active');
            });
        });
    });
    
    // Close modal when clicking overlay
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

// Initialize Product Actions
function initProductActions() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const wishlistBtn = document.getElementById('wishlist-btn');
    const notifyForm = document.getElementById('notify-form');
    
    // Add to cart
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const selectedSize = document.querySelector('.size-option.active');
            const selectedColor = document.querySelector('.color-option.active');
            
            if (selectedSize && selectedColor) {
                // Add animation
                const originalText = addToCartBtn.innerHTML;
                addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Added!';
                addToCartBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    addToCartBtn.innerHTML = originalText;
                    addToCartBtn.style.background = '#ffffff';
                }, 2000);
                
                console.log('Product added to cart');
            }
        });
    }
    
    // Wishlist toggle
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', () => {
            wishlistBtn.classList.toggle('active');
            const icon = wishlistBtn.querySelector('i');
            
            if (wishlistBtn.classList.contains('active')) {
                icon.className = 'fas fa-heart';
            } else {
                icon.className = 'far fa-heart';
            }
            
            // Add animation
            gsap.to(wishlistBtn, {
                scale: 0.9,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        });
    }
    
    // Notify form
    if (notifyForm) {
        notifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('notify-email').value;
            const size = document.getElementById('notify-size').value;
            const privacyCheck = document.getElementById('privacy-check').checked;
            
            if (email && size && privacyCheck) {
                // Success animation
                const submitBtn = notifyForm.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sent!';
                submitBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    document.getElementById('notify-modal').classList.remove('active');
                    
                    // Reset form
                    setTimeout(() => {
                        notifyForm.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '#ffffff';
                    }, 1000);
                }, 2000);
                
                console.log(`Notification request: ${email}, Size: ${size}`);
            }
        });
    }
}

// Initialize Image Zoom
function initImageZoom() {
    const mainImage = document.getElementById('main-product-image');
    const zoomOverlay = document.querySelector('.image-zoom-overlay');
    
    if (mainImage && zoomOverlay) {
        zoomOverlay.addEventListener('click', () => {
            // Create full-screen image modal
            const modal = document.createElement('div');
            modal.className = 'image-zoom-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                cursor: zoom-out;
            `;
            
            const img = document.createElement('img');
            img.src = mainImage.src;
            img.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 10px;
            `;
            
            modal.appendChild(img);
            document.body.appendChild(modal);
            
            // Animate in
            gsap.fromTo(modal, 
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: "power2.out" }
            );
            
            gsap.fromTo(img, 
                { scale: 0.8 },
                { scale: 1, duration: 0.4, ease: "power2.out" }
            );
            
            // Close on click
            modal.addEventListener('click', () => {
                gsap.to(modal, {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        document.body.removeChild(modal);
                    }
                });
            });
        });
    }
}

// Initialize Page Animations
function initPageAnimations() {
    const breadcrumb = document.querySelector('.breadcrumb');
    const productHeader = document.querySelector('.product-header');
    const productDescription = document.querySelector('.product-description');
    const colorSelection = document.querySelector('.color-selection');
    const sizeSelection = document.querySelector('.size-selection');
    const productActions = document.querySelector('.product-actions');
    const productAccordion = document.querySelector('.product-details-accordion');
    const relatedTitle = document.querySelector('.related-products-section .section-title');
    const relatedProducts = document.querySelectorAll('.related-products-grid .product-card');
    
    // Animate elements in sequence
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.product-detail-section',
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
    
    if (breadcrumb) {
        tl.to(breadcrumb, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out"
        });
    }
    
    if (productHeader) {
        tl.to(productHeader, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.3");
    }
    
    if (productDescription) {
        tl.to(productDescription, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.4");
    }
    
    if (colorSelection) {
        tl.to(colorSelection, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.3");
    }
    
    if (sizeSelection) {
        tl.to(sizeSelection, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.4");
    }
    
    if (productActions) {
        tl.to(productActions, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.3");
    }
    
    if (productAccordion) {
        tl.to(productAccordion, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.4");
    }
    
    // Animate related products section
    if (relatedTitle) {
        gsap.to(relatedTitle, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.related-products-section',
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });
    }
    
    if (relatedProducts.length > 0) {
        gsap.to(relatedProducts, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.related-products-grid',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    }
}

// Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

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

// Console message
console.log('🎉 ZeeClothes Product Detail page loaded!');
console.log('✨ Dynamic product loading with Akke-inspired design');