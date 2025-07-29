document.addEventListener('DOMContentLoaded', () => {
    /*********************************************************
     * 1) Configuration and Setup
     *********************************************************/
    const SQUARE_COUNT = 3;
    const squareSize = 12;
    const gap = 6;
    const squares = [];

    // Define colors
    const colors = {
        square: '#000000',
        border: '#000000'
    };

    // Get all highlight row containers
    const rows = [
        document.getElementById('section1-highlight'),
        document.getElementById('services-highlight'),
        document.getElementById('about-highlight'),
        document.getElementById('articles-highlight')
    ];

    // Create a container for the squares
    const squaresContainer = document.createElement('div');
    squaresContainer.className = 'highlight-squares-container';
    document.body.appendChild(squaresContainer);

    // Calculate total width needed for all squares
    const totalWidth = SQUARE_COUNT * (squareSize + gap) - gap;

    // Center the squares in the row
    let startX = (window.innerWidth - totalWidth) / 2;

    // Create and position squares
    for (let i = 0; i < SQUARE_COUNT; i++) {
        const sq = document.createElement("div");
        sq.classList.add("highlight-square");
        sq.id = `square-${i}`;
        sq.style.opacity = '0';
        sq.style.backgroundColor = colors.square;
        sq.style.borderColor = colors.border;
        squaresContainer.appendChild(sq);
        squares.push(sq);
    }

    function positionSquaresInRow(rowIndex) {
        if (!rows[rowIndex]) return;
        
        const rowRect = rows[rowIndex].getBoundingClientRect();
        const rowTop = window.scrollY + rowRect.top;
        
        // Position squares according to their current order
        currentSquareOrder.forEach((squareIndex, positionIndex) => {
            const square = squares[squareIndex];
            const leftPos = startX + positionIndex * (squareSize + gap);
            square.style.left = `${leftPos}px`;
            square.style.top = `${rowTop}px`;
            square.style.opacity = '1';
        });
    }

    // Recalculate startX on window resize
    function updateStartX() {
        startX = (window.innerWidth - totalWidth) / 2;
    }

    window.addEventListener('resize', updateStartX);

    setTimeout(() => {
        positionSquaresInRow(0);
    }, 500);

    /*********************************************************
     * 2) Intersection Observer Setup
     *********************************************************/
    const sections = [
        document.querySelector('.hero'),
        document.querySelector('.services'),
        document.querySelector('.about'),
        document.querySelector('.articles')
    ];

    let currentSectionIndex = 0;
    let isAnimating = false;
    let lastAnimationTime = 0;
    let animationQueue = null;
    
    // Track the current order of squares (after snake movements, positions change)
    let currentSquareOrder = Array.from({ length: SQUARE_COUNT }, (_, i) => i); // Dynamic initial order

    function getCurrentSquareOrder() {
        return squares
            .map((sq, idx) => ({ idx, left: sq.getBoundingClientRect().left }))
            .sort((a, b) => a.left - b.left)
            .map(item => item.idx);
    }

    function updateCurrentSquareOrder() {
        currentSquareOrder = getCurrentSquareOrder();
    }

    // Initial order update after first positioning
    setTimeout(updateCurrentSquareOrder, 600);

    const observerOptions = {
        root: null,
        threshold: [0.4, 0.6],
        rootMargin: '-10% 0px -10% 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        if (isAnimating) {
            return;
        }

        // Find the most visible intersecting section from all entries
        let mostVisibleEntry = null;
        for (const entry of entries) {
            if (entry.isIntersecting) {
                if (!mostVisibleEntry || entry.intersectionRatio > mostVisibleEntry.intersectionRatio) {
                    mostVisibleEntry = entry;
                }
            }
        }

        // Only proceed if a section is sufficiently visible
        if (!mostVisibleEntry || mostVisibleEntry.intersectionRatio < 0.4) {
            return;
        }

        const sectionIndex = Array.from(sections).indexOf(mostVisibleEntry.target);

        // Do nothing if the most visible section is the one we're already on
        if (sectionIndex === -1 || sectionIndex === currentSectionIndex) {
            return;
        }

        // Debounce to prevent animations from firing too rapidly
        const now = Date.now();
        if (now - lastAnimationTime < 1500) {
            return;
        }

        const direction = sectionIndex > currentSectionIndex ? 'down' : 'up';
        isAnimating = true;
        lastAnimationTime = now;
        updateSquareOrder(currentSectionIndex, sectionIndex, direction);
        
    }, observerOptions);

    sections.forEach((sec) => {
        if (sec) {
            sectionObserver.observe(sec);
        }
    });

    /*********************************************************
     * 3) Animation Path Generation
     *********************************************************/
    // The path generation is now integrated into the `animateSnake` function.

    /*********************************************************
     * 4) Snake Animations
     *********************************************************/
    async function animateSnake(fromSection, toSection, direction) {
        return new Promise((resolve, reject) => {
            try {
                if (!rows[fromSection] || !rows[toSection]) {
                    throw new Error(`Invalid section indices: ${fromSection} to ${toSection}`);
                }

                updateCurrentSquareOrder();

                const toRect = rows[toSection].getBoundingClientRect();
                const toTop = window.scrollY + toRect.top;
                
                const moveDuration = 200; // ms for each step of the animation
                const newOrder = [...currentSquareOrder].reverse();
                const animationPromises = [];

                currentSquareOrder.forEach((squareId, orderIndex) => {
                    const p = new Promise(res => {
                        const square = squares[squareId];
                        const finalOrderIndex = newOrder.indexOf(squareId);
                        const finalLeft = startX + finalOrderIndex * (squareSize + gap);

                        // Chain of animations for the HEAD square
                        if (orderIndex === 0) {
                            // 1. Move vertically
                            setTimeout(() => {
                                square.style.transition = `top ${moveDuration}ms linear`;
                                square.style.top = `${toTop}px`;
                            }, 0); // Start immediately
                            
                            // 2. Move to final horizontal position
                            setTimeout(() => {
                                square.style.transition = `left ${moveDuration}ms linear`;
                                square.style.left = `${finalLeft}px`;
                            }, moveDuration);

                            // Animation for this square is done
                            setTimeout(res, 2 * moveDuration);

                        // Special path for the LAST square in the chain
                        } else if (orderIndex === SQUARE_COUNT - 1) {
                            const headStartLeft = parseFloat(squares[currentSquareOrder[0]].style.left);
                            const startDelay = moveDuration * 2; // Follows the middle square

                            // 1. Move far left to where the head was
                            setTimeout(() => {
                                square.style.transition = `left ${moveDuration}ms linear`;
                                square.style.left = `${headStartLeft}px`;
                            }, startDelay);

                            // 2. Move down
                            setTimeout(() => {
                                square.style.transition = `top ${moveDuration}ms linear`;
                                square.style.top = `${toTop}px`;
                            }, startDelay + moveDuration);
                            
                            // Done, it's already at its final horizontal position
                            setTimeout(res, startDelay + (2 * moveDuration));

                        } else { // Chain of animations for any OTHER FOLLOWER squares (i.e., the middle one)
                            const leaderId = currentSquareOrder[orderIndex - 1];
                            const leaderStartLeft = parseFloat(squares[leaderId].style.left);
                            const startDelay = orderIndex * moveDuration;

                            // 1. Move sideways into leader's previous spot
                            setTimeout(() => {
                                square.style.transition = `left ${moveDuration}ms linear`;
                                square.style.left = `${leaderStartLeft}px`;
                            }, startDelay);

                            // 2. Move vertically to new row
                            setTimeout(() => {
                                square.style.transition = `top ${moveDuration}ms linear`;
                                square.style.top = `${toTop}px`;
                            }, startDelay + moveDuration);

                            // 3. Move to final horizontal position
                            setTimeout(() => {
                                square.style.transition = `left ${moveDuration}ms linear`;
                                square.style.left = `${finalLeft}px`;
                            }, startDelay + (2 * moveDuration));
                            
                            // Animation for this square is done
                            setTimeout(res, startDelay + (3 * moveDuration));
                        }
                    });
                    animationPromises.push(p);
                });

                Promise.all(animationPromises).then(() => {
                    currentSquareOrder = newOrder;

                    squares.forEach((sq) => {
                        sq.style.transition = '';
                    });
                    
                    positionSquaresInRow(toSection); 
                    resolve();
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    /*********************************************************
     * 5) Emergency Reset Function
     *********************************************************/
    function resetAnimation() {
        isAnimating = false;
        clearTimeout(animationQueue);
        positionSquaresInRow(currentSectionIndex);
    }

    // Expose reset function globally for debugging
    window.resetSnakeAnimation = resetAnimation;

    function updateSquareOrder(fromSection, toSection, direction) {
        animateSnake(fromSection, toSection, direction)
            .then(() => {
                currentSectionIndex = toSection;
                isAnimating = false;
            })
            .catch((error) => {
                console.warn(`Snake ${direction} animation failed:`, error);
                isAnimating = false;
                positionSquaresInRow(currentSectionIndex); // Fallback
            });
    }
}); 