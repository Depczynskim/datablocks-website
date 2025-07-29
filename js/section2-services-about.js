// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Add hover/interaction effects to service cards
    serviceCards.forEach((card, index) => {
        // Add slight delay to card appearance for staggered effect
        setTimeout(() => {
            card.classList.add('card-visible');
        }, 100 * index);
        
        // Optional: Track which services get the most interest
        card.querySelector('.btn').addEventListener('click', function(e) {
            // You could add analytics tracking here
            console.log(`Service clicked: ${card.querySelector('.service-title').textContent}`);
        });
    });
    
    // Make cards tabbable for accessibility
    enhanceCardAccessibility();
});

// Improve keyboard navigation through service cards
function enhanceCardAccessibility() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Make entire card focusable if it doesn't have focusable elements
        if (!card.querySelector('a, button, input, select, textarea')) {
            card.setAttribute('tabindex', '0');
        }
        
        // Trigger button click when Enter key is pressed on card
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.target === card) {
                const button = card.querySelector('.btn');
                if (button) {
                    button.click();
                }
            }
        });
    });
}

// Interactive elements in About section
document.addEventListener('DOMContentLoaded', function() {
    const aboutBox = document.querySelector('.about-box');
    const shapes = document.querySelectorAll('.about-box-shape');
    
    if (!aboutBox) return;
    
    // Add interactive hover effects for the geometric shapes
    aboutBox.addEventListener('mousemove', function(e) {
        // Get mouse position relative to the box
        const rect = aboutBox.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calculate movement based on mouse position (subtle parallax effect)
        shapes.forEach((shape, index) => {
            const factor = (index + 1) * 0.02;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate movement based on distance from center
            const moveX = (mouseX - centerX) * factor;
            const moveY = (mouseY - centerY) * factor;
            
            // Apply transform with slight delay based on index
            shape.style.transition = 'transform 0.3s ease';
            shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // Reset shapes when mouse leaves
    aboutBox.addEventListener('mouseleave', function() {
        shapes.forEach(shape => {
            shape.style.transition = 'transform 0.5s ease';
            shape.style.transform = 'translate(0, 0)';
        });
    });
});

// Add scroll-based reveal animations
document.addEventListener('DOMContentLoaded', function() {
    // Elements to animate on scroll
    const animatedElements = [
        ...document.querySelectorAll('.service-card'),
        ...document.querySelectorAll('.about-text p'),
        document.querySelector('.about-box')
    ].filter(Boolean); // Remove null elements
    
    // Set initial state (invisible)
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger the animation slightly for each element
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                // Stop observing once animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Slight offset to trigger before fully in view
    });
    
    // Start observing elements
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Set up animation hooks for this section
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the animation hooks
    const servicesHighlight = document.getElementById('services-highlight');
    const aboutHighlight = document.getElementById('about-highlight');
    
    // Add data attributes that the animation system will use
    if (servicesHighlight) {
        servicesHighlight.setAttribute('data-section-index', '1');
        servicesHighlight.setAttribute('data-animation-ready', 'true');
    }
    
    if (aboutHighlight) {
        aboutHighlight.setAttribute('data-section-index', '2');
        aboutHighlight.setAttribute('data-animation-ready', 'true');
    }
    
    // The core animation module will detect these hooks and handle animations
    // We just need to make sure they're properly positioned in the DOM
});

// Ensure Section 2 components work well with dark mode
document.addEventListener('DOMContentLoaded', function() {
    // Check if dark mode toggle exists and is handled by global functionality
    const darkModeToggle = document.querySelector('.toggle-theme');
    
    if (darkModeToggle) {
        // Listen for dark mode changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isDarkMode = document.body.classList.contains('dark-mode');
                    updateSectionForDarkMode(isDarkMode);
                }
            });
        });
        
        // Start observing body for class changes
        observer.observe(document.body, { attributes: true });
        
        // Initial check
        const isDarkMode = document.body.classList.contains('dark-mode');
        updateSectionForDarkMode(isDarkMode);
    }
});

// Update section styles for dark mode
function updateSectionForDarkMode(isDarkMode) {
    const serviceCards = document.querySelectorAll('.service-card');
    const aboutBox = document.querySelector('.about-box');
    
    // Update service cards for dark mode
    serviceCards.forEach(card => {
        if (isDarkMode) {
            card.style.backgroundColor = '#333';
            card.style.color = '#f5f5f5';
        } else {
            card.style.backgroundColor = 'var(--bauhaus-white)';
            card.style.color = 'var(--bauhaus-black)';
        }
    });
    
    // Update about box for dark mode
    if (aboutBox) {
        if (isDarkMode) {
            aboutBox.style.backgroundColor = '#444';
        } else {
            aboutBox.style.backgroundColor = 'var(--gray-medium)';
        }
    }
}

// Modal logic for E-commerce Strategy & Analytics

document.addEventListener('DOMContentLoaded', function() {
    // E-commerce modal
    const ecomModal = document.getElementById('ecom-modal');
    const ecomBtn = document.getElementById('ecom-learn-more');
    const ecomClose = document.getElementById('ecom-modal-close');

    ecomBtn.onclick = function() {
        ecomModal.style.display = "flex";
        document.body.style.overflow = 'hidden';
    }

    ecomClose.onclick = function() {
        ecomModal.style.display = "none";
        document.body.style.overflow = 'auto';
    }

    // Analytics modal
    const analyticsModal = document.getElementById('analytics-modal');
    const analyticsBtn = document.getElementById('analytics-learn-more');
    const analyticsClose = document.getElementById('analytics-modal-close');

    analyticsBtn.onclick = function() {
        analyticsModal.style.display = "flex";
        document.body.style.overflow = 'hidden';
    }

    analyticsClose.onclick = function() {
        analyticsModal.style.display = "none";
        document.body.style.overflow = 'auto';
    }

    // Implementation modal
    const implementationModal = document.getElementById('implementation-modal');
    const implementationBtn = document.getElementById('implementation-learn-more');
    const implementationClose = document.getElementById('implementation-modal-close');

    implementationBtn.onclick = function() {
        implementationModal.style.display = "flex";
        document.body.style.overflow = 'hidden';
    }

    implementationClose.onclick = function() {
        implementationModal.style.display = "none";
        document.body.style.overflow = 'auto';
    }

    // Close modals when clicking outside
    window.onclick = function(event) {
        if (event.target == ecomModal) {
            ecomModal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
        if (event.target == analyticsModal) {
            analyticsModal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
        if (event.target == implementationModal) {
            implementationModal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    }
});
