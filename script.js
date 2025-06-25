// CutCraft Media Website JavaScript

// EmailJS Configuration
const EMAILJS_CONFIG = {
    serviceID: 'service_q6nmupp',
    templateID: 'template_etj0y5o',
    publicKey: 'Ffh6s4a6_5ED8X0uS'
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
    
    // Initialize all functionality
    initNavigation();
    initContactForm();
    initSmoothScrolling();
    initButtonClicks();
    
});

// Navigation functionality
function initNavigation() {
    // Update active navigation links based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    const footerLinks = document.querySelectorAll('.footer-link');
    
    // Update nav links
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Update footer links
    footerLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                projectType: formData.get('projectType'),
                message: formData.get('message')
            };
            
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                showAlert('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }
            
            // Send email via EmailJS
            sendEmail(data, contactForm);
        });
    }
}

// Send email using EmailJS
function sendEmail(data, form) {
    // Show loading state
    const submitBtn = form.querySelector('.form-submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
    
    // Check if EmailJS is available
    if (typeof emailjs === 'undefined') {
        showAlert('Email service is not available. Please try again later.', 'error');
        resetSubmitButton(submitBtn, originalBtnText);
        return;
    }
    
    // Prepare template parameters
    const templateParams = {
        from_name: data.name,
        from_email: data.email,
        project_type: data.projectType || 'Not specified',
        message: data.message,
        to_name: 'CutCraft Media Team'
    };
    
    // Send email
    emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, templateParams)
        .then(function(response) {
            console.log('Email sent successfully:', response.status, response.text);
            showAlert('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
            form.reset();
        })
        .catch(function(error) {
            console.error('Email sending failed:', error);
            showAlert('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
        })
        .finally(function() {
            resetSubmitButton(submitBtn, originalBtnText);
        });
}

// Reset submit button state
function resetSubmitButton(button, originalText) {
    button.innerHTML = originalText;
    button.disabled = false;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show alert messages
function showAlert(message, type) {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        alert.style.backgroundColor = '#10b981';
    } else if (type === 'error') {
        alert.style.backgroundColor = '#ef4444';
    }
    
    // Add to document
    document.body.appendChild(alert);
    
    // Remove after 5 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(alert);
        }, 300);
    }, 5000);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Button click handlers
function initButtonClicks() {
    // Get Started buttons
    const getStartedButtons = document.querySelectorAll('.btn-primary, .btn-primary-large');
    getStartedButtons.forEach(button => {
        if (button.textContent.includes('Get Started')) {
            button.addEventListener('click', function() {
                window.location.href = 'contact.html';
            });
        }
    });
    
    // Quote buttons
    const quoteButtons = document.querySelectorAll('button');
    quoteButtons.forEach(button => {
        if (button.textContent.includes('Get Quote')) {
            button.addEventListener('click', function() {
                window.location.href = 'contact.html';
            });
        }
    });
    
    // Schedule Call buttons
    const scheduleButtons = document.querySelectorAll('button');
    scheduleButtons.forEach(button => {
        if (button.textContent.includes('Schedule')) {
            button.addEventListener('click', function() {
                showAlert('Please contact us at hello@cutcraftmedia.com to schedule a call.', 'success');
            });
        }
    });
    
    // Portfolio buttons
    const portfolioButtons = document.querySelectorAll('button');
    portfolioButtons.forEach(button => {
        if (button.textContent.includes('Portfolio') || button.textContent.includes('View Our Work')) {
            button.addEventListener('click', function() {
                showAlert('Portfolio coming soon! Contact us for samples of our work.', 'success');
            });
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .alert {
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(style);

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-open');
}

// Utility function to debounce events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Handle any resize-specific functionality here
}, 250));

// Console welcome message
console.log('🎬 CutCraft Media - Professional Video Editing Services');
console.log('Website loaded successfully!');