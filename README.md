# Data Blocks Website

A responsive, modern website for Data Blocks, an AI enablement charity supporting small and medium enterprises (SMEs) and local government authorities.

## Project Overview

Data Blocks is dedicated to democratizing access to AI technologies through education, resources, and implementation support. This website showcases their services and mission with a modern Bauhaus-inspired design and interactive elements.

## Features

- Responsive design that works across mobile, tablet, and desktop devices
- Interactive animation system with highlight squares that guide users through sections
- Bauhaus-inspired visual design with geometric elements and bold colors
- Modular code architecture with clear separation of concerns
- Comprehensive documentation for all components and systems

## Project Structure

```
data-blocks-website/
├── docs/                     # Documentation files
│   ├── core-animation-documentation.md
│   ├── implementation-plan.md
│   ├── style-guide.md
│   └── javascript-architecture.md
├── css/                      # CSS styles for each section
│   ├── section1-header-hero.css
│   ├── section2-services-about.css
│   ├── section3-articles.css
│   └── section4-contact-footer.css
├── js/                       # JavaScript functionality
│   ├── animation.js          # Core animation system
│   ├── section1-header-hero.js
│   ├── section2-services-about.js
│   ├── section3-articles.js
│   └── section4-contact-footer.js
└── index.html                # Main HTML file
```

## Sections

1. **Header & Hero** - Navigation and introduction with typewriter effect
2. **Services & About** - Service offerings and mission statement
3. **Articles** - Latest articles with interactive card components
4. **Contact & Footer** - Contact form and site footer with organization info

## Core Animation System

The website features a custom animation system that creates visual continuity between sections:

- Highlight squares move along predefined paths as users scroll
- Intersection Observer monitors section visibility
- Animation paths dynamically adjust based on viewport dimensions
- Supports both upward and downward scrolling directions

## Design Principles

- Geometric shapes for visual interest
- Clean typography with strong hierarchy
- Generous white space
- Bold color accents
- Bauhaus-inspired minimalism
- Interactive elements with clear affordances

## Technical Specifications

### Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest version)

### Performance Targets
- PageSpeed score > 90
- First Contentful Paint < 1.2s
- Smooth animations (60fps)
- No layout shifts during scrolling

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Support for reduced motion preferences

## Development Notes

- The animation system initializes when the DOM is fully loaded
- Each section includes a designated container element for animation hooks
- Responsive breakpoints: Mobile (up to 767px), Tablet (768px-1023px), Desktop (1024px+)
- CSS uses BEM methodology for component organization

## Getting Started

1. Clone this repository
2. Open index.html in your browser to view the site
3. Make changes to individual section files as needed
4. Test across different devices and browsers

## License

[Add appropriate license information]

## Contact

[Add contact information for the project team]

## Recent Changes (Last Updated: [Current Date])

### Header & Hero Section Improvements
- Implemented new typewriter effect with multiple phrases
- Fixed header positioning to match design requirements
- Integrated square animation with section transitions
- Improved animation performance and reliability

### Code Organization
- Created `legacy/` directory for deprecated implementations
- Consolidated typewriter functionality into section1-header-hero.js
- Improved animation system with error recovery
- Optimized intersection observer thresholds

### Known Issues & Future Tasks
- Square animation occasionally breaks in the articles section
- Consider implementing smoother transitions between sections
- Potential performance optimizations for mobile devices

## Development Guidelines

### Working with Animations
- Square animations use IntersectionObserver with 0.4 and 0.6 thresholds
- Animation timing constants are defined in animation.js
- Error recovery is implemented for animation failures
- Adjust animation speed via sequenceDelay (180ms) and moveDelay (240ms)

### Code Organization
- New features should be integrated into respective section files
- Legacy code is stored in the `legacy/` directory
- Keep animation.js focused on core animation logic
- Document any timing-sensitive dependencies

### Testing Checklist
- Verify typewriter effect across all screen sizes
- Test square animations in both scroll directions
- Check performance on mobile devices
- Validate section transitions with different scroll speeds