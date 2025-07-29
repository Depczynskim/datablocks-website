// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Remove any featured elements that might be dynamically added
    removeFeaturedElements();
    
    // Get all article cards
    const articleCards = document.querySelectorAll('.article-card');
    
    // Add staggered entrance animation to article cards
    articleCards.forEach((card, index) => {
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Clean any featured elements from this card
        cleanFeaturedFromCard(card);
        
        // Stagger the animations
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 150)); // Increasing delay for each card
    });
    
    // Add hover interactions for article image shapes
    setupArticleShapeAnimations();
    
    // Make cards keyboard accessible
    enhanceArticleAccessibility();
    
    // Optional: Track which articles receive the most interest
    trackArticleInteractions();
    
    // Set up a mutation observer to remove any dynamically added featured elements
    setupFeaturedElementRemover();
});

// Add interactive effects to the geometric shapes in article cards
function setupArticleShapeAnimations() {
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        const shape = card.querySelector('.article-image-shape');
        const image = card.querySelector('.article-image');
        
        if (!shape || !image) return;
        
        // Add mouse movement effect to shapes
        image.addEventListener('mousemove', function(e) {
            // Get mouse position relative to the image
            const rect = image.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate position as a percentage of the image dimensions
            const percentX = mouseX / rect.width;
            const percentY = mouseY / rect.height;
            
            // Create a slight movement effect (max 10px in any direction)
            const moveX = (percentX - 0.5) * 20;
            const moveY = (percentY - 0.5) * 20;
            
            // Apply transform
            shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX + moveY}deg)`;
        });
        
        // Reset when mouse leaves
        image.addEventListener('mouseleave', function() {
            shape.style.transform = 'translate(0, 0) rotate(0deg)';
        });
    });
}

// Enhance keyboard accessibility for article cards
function enhanceArticleAccessibility() {
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        // Make entire card focusable if it's not already
        if (!card.querySelector('a, button, input, select, textarea')) {
            card.setAttribute('tabindex', '0');
        }
        
        // Trigger "Read More" click when Enter key is pressed on card
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

// Optional: Track user interactions with articles
function trackArticleInteractions() {
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        const button = card.querySelector('.btn');
        const title = card.querySelector('.article-title').textContent.trim();
        
        if (button) {
            button.addEventListener('click', function(e) {
                // Here you would typically send analytics data
                // This is just a placeholder example
                console.log(`Article clicked: "${title}"`);
                
                // If you have an analytics service, you'd use it here:
                // analytics.trackEvent('article_click', { title, date: new Date() });
            });
        }
    });
}

// Dynamic Content Loading (Simulation)

// Simulate loading more articles when clicking the "View All" button
document.addEventListener('DOMContentLoaded', function() {
    const viewAllButton = document.querySelector('.articles-cta .btn');
    
    if (!viewAllButton) return;
    
    viewAllButton.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default navigation
        
        // Change button text to indicate loading
        viewAllButton.textContent = 'Loading...';
        viewAllButton.disabled = true;
        
        // Simulate an API call delay
        setTimeout(() => {
            // Load more articles
            loadMoreArticles();
            
            // Reset button
            viewAllButton.textContent = 'View All Articles';
            viewAllButton.disabled = false;
        }, 1000);
    });
});

// Function to add more articles to the grid
function loadMoreArticles() {
    const articlesGrid = document.querySelector('.articles-grid');
    if (!articlesGrid) return;
    
    // Sample article data (in a real app, this would come from an API)
    const moreArticles = [
        {
            title: 'Ethical Considerations in Government AI',
            excerpt: 'Examining the ethical frameworks necessary for responsible AI implementation in public services.',
            date: 'February 20, 2025'
        },
        {
            title: 'AI Tools for Small Business Productivity',
            excerpt: 'A review of cost-effective AI solutions that can help small businesses improve efficiency and growth.',
            date: 'February 15, 2025'
        },
        {
            title: 'Demystifying Machine Learning for Non-Technical Teams',
            excerpt: 'Breaking down complex ML concepts into approachable frameworks for business teams without technical backgrounds.',
            date: 'February 8, 2025'
        }
    ];
    
    // Create and add new article cards to the grid
    moreArticles.forEach(article => {
        // Create new article card
        const card = document.createElement('div');
        card.className = 'article-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Add card content (no image or featured label)
        card.innerHTML = `
            <div class="article-content">
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <p class="article-date">${article.date}</p>
                <a href="#" class="btn btn-secondary">Read More</a>
            </div>
        `;
        
        // Add to grid
        articlesGrid.appendChild(card);
        
        // Animate in with a delay
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // Re-apply interaction effects to new cards
    setupArticleShapeAnimations();
    enhanceArticleAccessibility();
    trackArticleInteractions();
}

// Animation Hook Integration

// Set up animation hook for this section
document.addEventListener('DOMContentLoaded', function() {
    // Get reference to the animation hook
    const articlesHighlight = document.getElementById('articles-highlight');
    
    // Add data attributes for the animation system
    if (articlesHighlight) {
        articlesHighlight.setAttribute('data-section-index', '3');
        articlesHighlight.setAttribute('data-animation-ready', 'true');
    }
});

// Intersection Observer for Scroll Animations

// Add scroll-based reveal animations for articles section
document.addEventListener('DOMContentLoaded', function() {
    // Create observer for section title
    const sectionTitle = document.querySelector('.articles .section-title');
    
    if (sectionTitle) {
        // Set initial state
        sectionTitle.style.opacity = '0';
        sectionTitle.style.transform = 'translateY(20px)';
        sectionTitle.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Create observer
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    titleObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Start observing
        titleObserver.observe(sectionTitle);
    }
    
    // Create observer for CTA button
    const ctaButton = document.querySelector('.articles-cta .btn');
    
    if (ctaButton) {
        // Set initial state
        ctaButton.style.opacity = '0';
        ctaButton.style.transform = 'translateY(20px)';
        ctaButton.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Create observer
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    ctaObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Start observing
        ctaObserver.observe(ctaButton);
    }
});

// Function to remove any featured elements from the page
function removeFeaturedElements() {
    const selectors = [
        '[class*="featured"]',
        '[class*="Featured"]', 
        '[class*="FEATURED"]',
        '.featured-badge',
        '.featured-tag',
        '.featured-label',
        '.article-featured',
        '[data-featured]',
        'div[style*="background-color: rgb(0, 0, 255)"]',
        'div[style*="background: rgb(0, 0, 255)"]',
        'div[style*="background-color: blue"]',
        'div[style*="background: blue"]'
    ];
    
    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (el && el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });
    });
}

// Function to clean featured elements from a specific card
function cleanFeaturedFromCard(card) {
    if (!card) return;
    
    // Remove any child elements that might be featured badges
    const featuredElements = card.querySelectorAll('[class*="featured"], [data-featured], .featured-badge, .featured-tag, .featured-label');
    featuredElements.forEach(el => {
        if (el && el.parentNode) {
            el.parentNode.removeChild(el);
        }
    });
    
    // Remove any blue background elements
    const blueElements = card.querySelectorAll('div[style*="background-color: rgb(0, 0, 255)"], div[style*="background: blue"]');
    blueElements.forEach(el => {
        if (el && el.parentNode) {
            el.parentNode.removeChild(el);
        }
    });
}

// Function to set up mutation observer to remove dynamically added featured elements
function setupFeaturedElementRemover() {
    const articlesSection = document.querySelector('.articles');
    if (!articlesSection) return;
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if the added node is a featured element
                        if (node.classList && (
                            node.classList.toString().toLowerCase().includes('featured') ||
                            node.style.backgroundColor === 'blue' ||
                            node.style.backgroundColor === 'rgb(0, 0, 255)' ||
                            node.getAttribute('data-featured')
                        )) {
                            if (node.parentNode) {
                                node.parentNode.removeChild(node);
                            }
                        }
                        
                        // Check if any child elements are featured elements
                        cleanFeaturedFromCard(node);
                    }
                });
            }
        });
    });
    
    observer.observe(articlesSection, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style', 'data-featured']
    });
}
