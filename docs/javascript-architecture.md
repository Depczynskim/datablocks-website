# Data Blocks Website JavaScript Architecture

## Core JavaScript Modules

### 1. Main Module (main.js)
- Entry point for all JavaScript functionality
- DOMContentLoaded event listeners
- Module imports and initialization
- Global event delegation
- Responsive behavior management

### 2. Navigation Module (navigation.js)
- Mobile menu toggle functionality
- Smooth scrolling for anchor links
- Active section highlighting
- Fixed header behavior on scroll
- Responsive menu adjustments

### 3. Animation System (animation.js)
- Core animation controller
- Highlight square creation and management
- Intersection Observer implementation
- Path generation algorithms
- Animation sequence management
- Window resize handlers

### 4. UI Interactions (ui.js)
- Button hover effects
- Card interaction behaviors
- Form validation and submission
- Typewriter effect implementation
- Dark/light mode toggle functionality

## Key Functions

### Navigation Implementation
```javascript
// Mobile menu toggle
function toggleMobileMenu() {
  const navMobile = document.getElementById('navMobile');
  navMobile.classList.toggle('active');
}

// Smooth scroll for anchor links
function initSmoothScroll() {
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

Animation System Core

// Initialize animation system
function initAnimationSystem() {
  createHighlightSquares();
  setupIntersectionObserver();
  positionSquaresInFirstSection();
  setupResizeHandlers();
}

// Create highlight squares
function createHighlightSquares() {
  // Square creation logic
  // Position calculation
  // DOM insertion
}

// Intersection Observer setup
function setupIntersectionObserver() {
  // Observer configuration
  // Callback definition
  // Element observation
}

// Generate animation paths
function generatePaths(fromSection, toSection) {
  // Path calculation algorithm
  // Return array of coordinate sequences
}

Typewriter Effect

// Typewriter animation
function typeWriter() {
  // Current phrase handling
  // Character addition/deletion
  // Timing management
  // Phrase rotation
}

Event Handling
Page Load Events

DOMContentLoaded: Initialize core functionality
load: Set up animation system after all resources are loaded
readystatechange: Progressive enhancement monitoring

User Interaction Events

click: Button and navigation interactions
submit: Form handling
mouseover/mouseout: Hover effects
touchstart/touchend: Mobile interaction support

Scroll and Resize Events

scroll: Track scroll position for animations
resize: Recalculate element positions and animation paths
orientationchange: Handle device orientation shifts

Performance Considerations
Optimization Techniques

Debounced resize handlers
Throttled scroll events
requestAnimationFrame for smooth animations
Efficient DOM manipulation
Event delegation for reduced listener count

Loading Strategy

Critical JS loaded immediately
Animation system loaded after critical content
Defer non-essential functionality
Progressive enhancement approach