document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    setupSmoothScrolling();
    initTypewriter();
    initAnimationHooks();
    initResponsiveHandling();
    initScrollBehavior();
});

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMobile = document.getElementById('navMobile');
    
    if (navToggle && navMobile) {
        navToggle.addEventListener('click', function() {
            navMobile.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        const mobileLinks = document.querySelectorAll('.nav-mobile a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMobile.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initTypewriter() {
    console.log('Initializing typewriter...');
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) {
        console.error('Typewriter element not found');
        return;
    }
    
    const phrases = [
        "stay ahead of your competitors",
        "implement AI on your terms",
        "protect your data from big corporations",
        "unlock insights hidden in your business",
        "harness emerging technologies with confidence",
        "be part of the future"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Deleting characters
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1) + "_";
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing characters
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1) + "_";
            charIndex++;
            typingSpeed = 100; // Normal speed when typing
        }
        
        // If we've completed typing the current phrase
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at the end of typing
            isDeleting = true;
            typingSpeed = 2000; // Wait before deleting
        } 
        // If we've deleted the entire phrase
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Move to next phrase
            phraseIndex = (phraseIndex + 1) % phrases.length;
            // Slight pause before typing new phrase
            typingSpeed = 500;
        }
        
        // Schedule the next update
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start the effect with a slight delay after page load
    setTimeout(typeWriter, 1000);
}

function initAnimationHooks() {
    const section1Highlight = document.getElementById('section1-highlight');
    if (section1Highlight) {
        section1Highlight.setAttribute('data-section-index', '0');
        section1Highlight.setAttribute('data-animation-ready', 'true');
    }
}

function initResponsiveHandling() {
    const heroShapes = document.querySelectorAll('.hero .shape');
    
    function handleResize() {
        const width = window.innerWidth;
        if (width < 768) {
            adjustShapesForMobile(heroShapes);
        } else if (width < 1024) {
            adjustShapesForTablet(heroShapes);
        } else {
            resetShapesToDefault(heroShapes);
        }
    }
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 100);
    });
    
    handleResize();
}

function adjustShapesForMobile(shapes) {
    // Mobile-specific adjustments
}

function adjustShapesForTablet(shapes) {
    // Tablet-specific adjustments
}

function resetShapesToDefault(shapes) {
    // Default positions
}

function initScrollBehavior() {
    const header = document.querySelector('header');
    let lastScrollPosition = 0;
    
    function handleHeaderScroll() {
        const currentScrollPosition = window.scrollY;
        
        if (currentScrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollPosition = currentScrollPosition;
    }
    
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                handleHeaderScroll();
                scrollTimeout = null;
            }, 10);
        }
    });
    
    handleHeaderScroll();
}