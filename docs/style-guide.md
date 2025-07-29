## Brand Colors
- Primary Red: #FF0000
- Primary Blue: #0000FF
- Primary Yellow: #FFFF00
- Bauhaus Black: #000000
- Bauhaus White: #FFFFFF
- Light Gray: #f5f5f5
- Medium Gray: #e0e0e0

## Typography
- Primary Font: 'Roboto Mono', monospace
- Weights Used: 100, 300, 400, 500, 700
- Base Font Size: 16px
- Line Height: 1.6

## CSS Architecture

### Base Styles
- CSS Reset/Normalize
- Typography defaults
- Color variables
- Common utilities
- Animation timing variables

### Layout Components
- Container system
- Grid definitions
- Responsive breakpoints
- Section spacing rules
- Vertical rhythm rules

### UI Components
- Buttons (primary, secondary)
- Cards (service, article)
- Forms and inputs
- Navigation elements
- Footer components

### Animation Styles
- Transition definitions
- Highlight square styling
- Keyframe animations
- Motion paths
- Easing functions

## CSS Organization

### File Structure
- styles.css: Main CSS file with imports
- base.css: Reset, variables, and base styles
- layout.css: Container and grid systems
- components.css: Reusable UI components
- animations.css: Animation-specific styles
- responsive.css: Media queries and breakpoints

### Naming Convention
- BEM (Block, Element, Modifier) methodology
- Semantic class names
- Component-based organization
- Limited use of ID selectors

## Responsive Breakpoints
- Mobile: Up to 767px
- Tablet: 768px to 1023px
- Desktop: 1024px and above

## Animation Specifications
- Transition Speed: 0.3s (general UI)
- Highlight Square Transition: 0.24s cubic-bezier(0.22, 1, 0.36, 1)
- Sequence Delay: 180ms (between square movements)
- Movement Delay: 240ms (for each position change)

## Design Principles
- Geometric shapes for visual interest
- Clean typography with strong hierarchy
- Generous white space
- Bold color accents
- Bauhaus-inspired minimalism
- Interactive elements with clear affordance