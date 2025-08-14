// Login Management System
class LoginManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateCartCount();
        this.checkAuthStatus();
    }

    bindEvents() {
        // Login form submission
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Password toggle
        document.getElementById('password-toggle').addEventListener('click', () => {
            this.togglePassword();
        });

        // Social login buttons
        document.querySelector('.google-btn').addEventListener('click', () => {
            this.handleSocialLogin('google');
        });

        document.querySelector('.facebook-btn').addEventListener('click', () => {
            this.handleSocialLogin('facebook');
        });

        // Forgot password
        document.querySelector('.forgot-password').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleForgotPassword();
        });
    }

    async handleLogin() {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        // Validate form
        if (!this.validateForm(email, password)) {
            return;
        }

        // Show loading state
        this.showLoadingState();

        try {
            // Simulate API call
            const user = await this.authenticateUser(email, password);
            
            if (user) {
                // Store user session
                this.createUserSession(user, remember);
                
                // Show success message
                this.showSuccessMessage('Login successful! Redirecting...');
                
                // Redirect to appropriate page
                setTimeout(() => {
                    this.redirectAfterLogin();
                }, 1500);
            } else {
                this.showErrorMessage('Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showErrorMessage('Login failed. Please try again.');
        } finally {
            this.hideLoadingState();
        }
    }

    validateForm(email, password) {
        let isValid = true;

        // Email validation
        if (!email) {
            this.showFieldError('email', 'Email is required');
            isValid = false;
        } else if (!this.isValidEmail(email)) {
            this.showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        } else {
            this.clearFieldError('email');
        }

        // Password validation
        if (!password) {
            this.showFieldError('password', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            this.showFieldError('password', 'Password must be at least 6 characters');
            isValid = false;
        } else {
            this.clearFieldError('password');
        }

        return isValid;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showFieldError(fieldId, message) {
        this.clearFieldError(fieldId);
        const field = document.getElementById(fieldId);
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    async authenticateUser(email, password) {
        // Simulate API authentication
        return new Promise((resolve) => {
            setTimeout(() => {
                // Sample user database (in real app, this would be server-side)
                const users = [
                    {
                        id: 1,
                        email: 'demo@zeeclothes.com',
                        password: 'demo123',
                        name: 'Demo User',
                        firstName: 'Demo',
                        lastName: 'User'
                    },
                    {
                        id: 2,
                        email: 'test@example.com',
                        password: 'test123',
                        name: 'Test User',
                        firstName: 'Test',
                        lastName: 'User'
                    }
                ];

                const user = users.find(u => u.email === email && u.password === password);
                
                if (user) {
                    // Remove password from user object
                    const { password, ...userWithoutPassword } = user;
                    resolve(userWithoutPassword);
                } else {
                    resolve(null);
                }
            }, 1000);
        });
    }

    createUserSession(user, remember) {
        const sessionData = {
            user: user,
            loginTime: new Date().toISOString(),
            remember: remember
        };

        if (remember) {
            // Store in localStorage for persistent session
            localStorage.setItem('zeeclothes_user_session', JSON.stringify(sessionData));
        } else {
            // Store in sessionStorage for session-only
            sessionStorage.setItem('zeeclothes_user_session', JSON.stringify(sessionData));
        }
    }

    checkAuthStatus() {
        const sessionData = localStorage.getItem('zeeclothes_user_session') || 
                           sessionStorage.getItem('zeeclothes_user_session');
        
        if (sessionData) {
            const session = JSON.parse(sessionData);
            const loginTime = new Date(session.loginTime);
            const now = new Date();
            const hoursDiff = (now - loginTime) / (1000 * 60 * 60);

            // Check if session is still valid (24 hours for remember me, 8 hours for session)
            const maxHours = session.remember ? 24 : 8;
            
            if (hoursDiff < maxHours) {
                // User is already logged in, redirect to account page
                window.location.href = 'account.html';
            } else {
                // Session expired, clear it
                this.clearUserSession();
            }
        }
    }

    clearUserSession() {
        localStorage.removeItem('zeeclothes_user_session');
        sessionStorage.removeItem('zeeclothes_user_session');
    }

    redirectAfterLogin() {
        // Check if user was trying to access a specific page
        const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
        
        if (returnUrl) {
            window.location.href = returnUrl;
        } else {
            // Default redirect to account page
            window.location.href = 'account.html';
        }
    }

    togglePassword() {
        const passwordInput = document.getElementById('password');
        const toggleBtn = document.getElementById('password-toggle');
        const icon = toggleBtn.querySelector('i');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            passwordInput.type = 'password';
            icon.className = 'fas fa-eye';
        }
    }

    handleSocialLogin(provider) {
        // Simulate social login
        this.showLoadingState();
        
        setTimeout(() => {
            this.showErrorMessage(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login is not available in demo mode.`);
            this.hideLoadingState();
        }, 1000);
    }

    handleForgotPassword() {
        const email = document.getElementById('email').value.trim();
        
        if (!email || !this.isValidEmail(email)) {
            this.showErrorMessage('Please enter a valid email address first.');
            return;
        }

        // Simulate password reset
        this.showSuccessMessage('Password reset link sent to your email!');
    }

    showLoadingState() {
        const loginBtn = document.getElementById('login-btn');
        const btnText = loginBtn.querySelector('.btn-text');
        const btnLoading = loginBtn.querySelector('.btn-loading');
        
        loginBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
    }

    hideLoadingState() {
        const loginBtn = document.getElementById('login-btn');
        const btnText = loginBtn.querySelector('.btn-text');
        const btnLoading = loginBtn.querySelector('.btn-loading');
        
        loginBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }

    showSuccessMessage(message) {
        this.showNotification(message, 'success');
    }

    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
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

    updateCartCount() {
        const savedCart = localStorage.getItem('zeeclothes_cart');
        const cart = savedCart ? JSON.parse(savedCart) : [];
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(element => {
            element.textContent = count;
        });
    }
}

// Initialize login manager
const loginManager = new LoginManager();

// Add loaded class to body
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
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
