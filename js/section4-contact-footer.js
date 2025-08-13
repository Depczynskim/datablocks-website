// Contact Form Validation and Submission

// Wait for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Get reference to the contact form and success message
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (!contactForm) return;
    
    // Add form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Check if form is valid
        if (validateForm()) {
            // Simulate form submission
            submitForm();
        }
    });
    
    // Add input validation on blur
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });
    
    // Validate a single input field
    function validateInput(input) {
        // Check if the input is required and empty
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('is-invalid');
            return false;
        }
        
        // Check email format
        if (input.type === 'email' && input.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                input.classList.add('is-invalid');
                return false;
            }
        }
        
        // If all checks pass, mark as valid
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
    }
    
    // Validate entire form
    function validateForm() {
        let isValid = true;
        
        // Validate each input
        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Submit form via Netlify Forms (no JS fetch; allow native POST)
    function submitForm() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Let the native POST submit the form; show success after navigation-less submission in Netlify dev or fallback
        // If running locally without Netlify, simulate success
        if (!('netlify' in contactForm.dataset)) {
            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                formSuccess.classList.add('show');
                contactForm.reset();
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                formInputs.forEach(input => input.classList.remove('is-valid', 'is-invalid'));
            }, 800);
        } else {
            contactForm.submit();
        }
    }
});

// Footer Interactions

// Add smooth scrolling to footer navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all footer navigation links
    const footerLinks = document.querySelectorAll('.footer-nav a');
    
    // Add smooth scrolling to each link
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only apply to anchor links
            if (targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Account for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add hover effects to social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        icon.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Animation Hook Integration

// Set up animation hook for the contact section
document.addEventListener('DOMContentLoaded', function() {
    // Get reference to the animation hook
    const contactHighlight = document.getElementById('contact-highlight');
    
    // Add data attributes for the animation system
    if (contactHighlight) {
        contactHighlight.setAttribute('data-section-index', '4');
        contactHighlight.setAttribute('data-animation-ready', 'true');
    }
});

// Scroll-to-Top Button

// Add a scroll-to-top button functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll-to-top button if it doesn't exist
    let scrollTopButton = document.querySelector('.scroll-top-button');
    
    if (!scrollTopButton) {
        scrollTopButton = document.createElement('button');
        scrollTopButton.className = 'scroll-top-button';
        scrollTopButton.innerHTML = '↑';
        scrollTopButton.setAttribute('aria-label', 'Scroll to top');
        scrollTopButton.style.position = 'fixed';
        scrollTopButton.style.bottom = '20px';
        scrollTopButton.style.right = '20px';
        scrollTopButton.style.width = '40px';
        scrollTopButton.style.height = '40px';
        scrollTopButton.style.borderRadius = '50%';
        scrollTopButton.style.backgroundColor = 'var(--primary-blue)';
        scrollTopButton.style.color = 'white';
        scrollTopButton.style.border = 'none';
        scrollTopButton.style.cursor = 'pointer';
        scrollTopButton.style.opacity = '0';
        scrollTopButton.style.transition = 'opacity 0.3s ease';
        scrollTopButton.style.zIndex = '999';
        scrollTopButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        
        document.body.appendChild(scrollTopButton);
    }
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopButton.style.opacity = '1';
        } else {
            scrollTopButton.style.opacity = '0';
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Form Input Animation

// Add floating label effect to form inputs
document.addEventListener('DOMContentLoaded', function() {
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(input => {
        // Skip if input already has a placeholder
        if (input.hasAttribute('placeholder')) return;
        
        // Get the associated label
        const formGroup = input.closest('.form-group');
        const label = formGroup.querySelector('.form-label');
        
        if (!label) return;
        
        // Hide the original label
        label.style.display = 'none';
        
        // Create floating label
        const floatingLabel = document.createElement('span');
        floatingLabel.className = 'form-float-label';
        floatingLabel.textContent = label.textContent;
        
        // Add placeholder for functionality
        input.setAttribute('placeholder', ' ');
        
        // Insert floating label after input
        input.insertAdjacentElement('afterend', floatingLabel);
    });
});