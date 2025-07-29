# Development Notes

## Animation System

### Square Animation
The square animation system is implemented in `js/animation.js` and uses the following key components:

1. **Configuration**
- Square size: 24px × 24px
- Gap between squares: 10px
- Number of squares: 4
- Colors defined in CSS variables (--primary-red)

2. **Intersection Observer**
```javascript
const observerOptions = {
    root: null,
    threshold: [0.4, 0.6],
    rootMargin: '-10% 0px -10% 0px'
}
```
- Triggers when sections are 40-60% visible
- Includes margins to prevent edge-case triggers

3. **Animation Timing**
- Sequence delay: 180ms between squares
- Move delay: 240ms between points
- Debounce: 1000ms between animations

4. **Error Recovery**
- Implemented for animation failures
- Resets squares to current row position
- Prevents stuck animations

## Typewriter Effect

Located in `js/section1-header-hero.js`, the typewriter effect:
- Uses dynamic text array for phrases
- Supports custom timing per phrase
- Handles backspace animation
- Includes cursor animation

## Known Edge Cases

1. **Animation System**
- Fast scrolling can trigger multiple transitions
- Fourth section (articles) may have positioning issues
- Window resize during animation needs handling

2. **Typewriter**
- Text container needs minimum height
- Font loading can affect timing
- Mobile devices may need adjusted delays

## Future Improvements

1. **Animation System**
- Consider implementing animation queue
- Add smooth path interpolation
- Optimize for mobile performance

2. **General**
- Add error logging system
- Implement performance monitoring
- Consider adding animation disable option

## Development Tips

1. **Testing**
- Test on different screen sizes
- Verify both scroll directions
- Check different scroll speeds
- Monitor CPU usage during animations

2. **Debugging**
- Use browser dev tools Animation panel
- Check IntersectionObserver triggers
- Monitor for error recovery events
- Verify timing constants

3. **Performance**
- Use requestAnimationFrame where possible
- Minimize DOM operations
- Batch style updates
- Monitor memory usage 