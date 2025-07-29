# Core Animation Module Documentation

## Overview

The Core Animation Module manages the interactive highlight squares that guide users through the website as they scroll. This system creates visual continuity between sections and enhances user engagement.

## Key Components

### 1. Highlight Squares

- A set of 4 colored squares that move along predefined paths
- Created and appended to the DOM on page load
- Positioned initially at the first section
- Respond to scrolling in both directions

### 2. Intersection Observer

- Monitors visibility of each section
- Triggers animations when sections enter/exit the viewport
- Uses threshold configuration to determine optimal animation timing
- Tracks current section to manage animation state

### 3. Path Generation

- Dynamically calculates animation paths between sections
- Adjusts paths based on viewport dimensions
- Creates snake-like movement patterns for visual interest
- Maintains consistent timing and spacing

### 4. Animation Controller

- Manages animation sequences
- Handles timing and delays between square movements
- Prevents animation conflicts when scrolling quickly
- Provides methods for resetting or updating animations

## Implementation Requirements

### HTML Integration

Each section should include a designated container element:

```html
<div class="highlight-row" id="section-[number]-highlight"></div>

Initialization
The animation system initializes when the DOM is fully loaded:

document.addEventListener('DOMContentLoaded', initAnimationSystem);

Responsive Behavior
The system recalculates square positions and paths on window resize to maintain proper positioning across all device sizes.
Accessibility Considerations

Animations respect user preference for reduced motion
Purely decorative with no impact on content accessibility
Can be disabled without affecting core website functionality