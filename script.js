// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const STORAGE_KEY = 'theme-preference';

// Utility functions
const getStoredTheme = () => localStorage.getItem(STORAGE_KEY);
const setStoredTheme = theme => localStorage.setItem(STORAGE_KEY, theme);
const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) return storedTheme;
    return prefersDarkScheme.matches ? 'dark' : 'light';
};

// Theme application
const setTheme = theme => {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.innerHTML = `<i class="fas fa-${theme === 'dark' ? 'sun' : 'moon'}" aria-hidden="true"></i>`;
};

// Initialize theme
const initializeTheme = () => {
    setTheme(getPreferredTheme());
    
    // Event listeners
    themeToggle.addEventListener('click', () => {
        const newTheme = getStoredTheme() === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        setStoredTheme(newTheme);
    });
    
    prefersDarkScheme.addEventListener('change', e => {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        setStoredTheme(newTheme);
    });
};

// Form Handling
const initializeForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const validateEmail = email => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const showFormMessage = (type, message) => {
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();

        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        form.appendChild(messageElement);

        setTimeout(() => messageElement.remove(), 5000);
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        if (!data.name?.trim()) {
            showFormMessage('error', 'Please enter your name');
            return;
        }
        
        if (!validateEmail(data.email)) {
            showFormMessage('error', 'Please enter a valid email address');
            return;
        }
        
        if (!data.message?.trim()) {
            showFormMessage('error', 'Please enter a message');
            return;
        }

        try {
            // Here you would typically send the data to a server
            // For now, we'll just simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            showFormMessage('success', 'Message sent successfully!');
            form.reset();
        } catch (error) {
            showFormMessage('error', 'Failed to send message. Please try again.');
            console.error('Form submission error:', error);
        }
    });
};

// Smooth Scrolling
const initializeSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Lazy Loading Images
const initializeLazyLoading = () => {
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeForm();
    initializeSmoothScroll();
    initializeLazyLoading();
});

// Performance optimization for animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
