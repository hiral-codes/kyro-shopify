// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    menuToggle.style.transform = mobileMenu.style.display === 'block' ? 'rotate(90deg)' : 'rotate(0deg)';
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
        menuToggle.style.transform = 'rotate(0deg)';
    });
});

// Add to Cart Functionality
let cartCount = 0;
const cartCountEl = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        cartCount++;
        cartCountEl.textContent = cartCount;
        
        // Visual feedback
        button.style.background = '#D4A574';
        button.textContent = '✓ Added';
        
        setTimeout(() => {
            button.style.background = '';
            button.textContent = 'Add to Cart';
        }, 1500);
        
        // Show notification
        showNotification('Product added to cart!');
    });
});

// Wishlist Toggle
const wishlistButtons = document.querySelectorAll('.btn-wishlist');

wishlistButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === '♡') {
            button.textContent = '♥';
            button.style.color = '#D4A574';
            showNotification('Added to wishlist!');
        } else {
            button.textContent = '♡';
            button.style.color = '';
            showNotification('Removed from wishlist!');
        }
    });
});

// Newsletter Signup
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            showNotification(`✨ Welcome! Check your email at ${email} for 15% off!`);
            newsletterForm.reset();
        }
    });
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #D4A574;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add scroll animations for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .category-card, .review-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Search functionality (placeholder)
document.querySelector('.search-icon').addEventListener('click', () => {
    showNotification('Search functionality coming soon!');
});

// Account functionality (placeholder)
document.querySelector('.account-icon').addEventListener('click', () => {
    showNotification('Account page coming soon!');
});

// Cart functionality (placeholder)
document.querySelector('.cart-icon').addEventListener('click', () => {
    if (cartCount > 0) {
        showNotification(`You have ${cartCount} items in your cart`);
    } else {
        showNotification('Your cart is empty');
    }
});

// Filter buttons on product cards
const categoryLinks = document.querySelectorAll('.category-link');
categoryLinks.forEach(link => {
    link.addEventListener('click', () => {
        showNotification('Filtering products...');
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Product quantity selector (for future integration)
function initProductQuantitySelector() {
    // This function can be expanded for product detail pages
    console.log('Product quantity selectors ready');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('KYRO Beauty Store initialized');
    initProductQuantitySelector();
});

// Track page views and user interactions (analytics ready)
function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // This can be connected to Google Analytics or other tracking services
}

// Track add to cart
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.closest('.product-card').querySelector('h3').textContent;
        trackEvent('Add to Cart', { product: productName });
    });
});