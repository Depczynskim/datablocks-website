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

    // Simple transition queue so we never skip sections
    let pendingTransitions = [];
    let inFlightTargetIndex = null;

    function buildPathFromTo(startIndex, targetIndex) {
        const steps = [];
        if (targetIndex > startIndex) {
            for (let i = startIndex + 1; i <= targetIndex; i++) steps.push(i);
        } else if (targetIndex < startIndex) {
            for (let i = startIndex - 1; i >= targetIndex; i--) steps.push(i);
        }
        return steps;
    }

    function processQueue() {
        if (isAnimating) return;
        if (pendingTransitions.length === 0) return;

        const nextIndex = pendingTransitions.shift();
        const direction = nextIndex > currentSectionIndex ? 'down' : 'up';
        isAnimating = true;
        inFlightTargetIndex = nextIndex;
        animateSnake(currentSectionIndex, nextIndex, direction)
            .then(() => {
                currentSectionIndex = nextIndex;
                inFlightTargetIndex = null;
                isAnimating = false;
                processQueue();
            })
            .catch((error) => {
                console.warn(`Snake ${direction} animation failed:`, error);
                isAnimating = false;
                positionSquaresInRow(currentSectionIndex); // Fallback
                pendingTransitions = [];
                inFlightTargetIndex = null;
            });
    }

    function enqueueTransitionTo(targetIndex) {
        const startIndex = inFlightTargetIndex ?? currentSectionIndex;
        if (targetIndex === startIndex) return; // Nothing to do
        // Replace any stale queued transitions with a fresh path from the effective start to target
        pendingTransitions = buildPathFromTo(startIndex, targetIndex);
        // Reset neighbor hysteresis when committing to a transition
        pendingNeighborIndex = null;
        neighborEnterSince = 0;
        processQueue();
    }

    // Track scroll direction to prevent opposite-direction moves
    let lastScrollY = window.scrollY;
    let scrollDirection = null; // 'up' | 'down' | null
    let rafToken = null;
    let directionLockUntil = 0; // timestamp until which direction is trusted
    let scrollIdleTimer = null;
    const SCROLL_IDLE_MS = 140;
    const ENTER_THRESHOLD = 0.58; // neighbor must reach this visibility
    const EXIT_THRESHOLD = 0.38;  // current should be below this visibility
    const HYSTERESIS_MS = 120;    // neighbor must stay above ENTER_THRESHOLD for this long
    let pendingNeighborIndex = null;
    let neighborEnterSince = 0;

    function getNearestSectionIndexByViewport() {
        const viewportMid = window.innerHeight / 2;
        let bestIndex = currentSectionIndex;
        let bestScore = Infinity;
        sections.forEach((sec, idx) => {
            if (!sec) return;
            const r = sec.getBoundingClientRect();
            const secMid = (r.top + r.bottom) / 2;
            const dist = Math.abs(secMid - viewportMid);
            if (dist < bestScore) {
                bestScore = dist;
                bestIndex = idx;
            }
        });
        return bestIndex;
    }

    function maybeCorrectSection() {
        if (isAnimating || pendingTransitions.length > 0) return;
        const nearest = getNearestSectionIndexByViewport();
        if (nearest !== currentSectionIndex) {
            enqueueTransitionTo(nearest);
        }
    }

    window.addEventListener('scroll', () => {
        if (rafToken) return;
        rafToken = requestAnimationFrame(() => {
            const y = window.scrollY;
            if (Math.abs(y - lastScrollY) > 2) {
                scrollDirection = y > lastScrollY ? 'down' : 'up';
                lastScrollY = y;
                directionLockUntil = performance.now() + 260; // keep direction for ~260ms
            }
            rafToken = null;
        });
        // Scroll idle correction
        if (scrollIdleTimer) clearTimeout(scrollIdleTimer);
        scrollIdleTimer = setTimeout(maybeCorrectSection, SCROLL_IDLE_MS);
    }, { passive: true });

    const observerOptions = {
        root: null,
        threshold: [0.25, 0.5, 0.8],
        rootMargin: '-10% 0px -10% 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        // Build a quick lookup for entries
        const entryByTarget = new Map(entries.map(e => [e.target, e]));

        const now = performance.now();
        const dirLocked = now < directionLockUntil ? (scrollDirection === 'down' || scrollDirection === 'up') : false;

        if (dirLocked) {
            const toward = scrollDirection; // 'down' or 'up'
            const step = toward === 'down' ? 1 : -1;
            const neighborIndex = currentSectionIndex + step;

            // Prefer neighbor if visible enough
            if (neighborIndex >= 0 && neighborIndex < sections.length) {
                const neighborEntry = entryByTarget.get(sections[neighborIndex]);
                const currentEntry = entryByTarget.get(sections[currentSectionIndex]);
                const neighborRatio = neighborEntry?.intersectionRatio ?? 0;
                const currentRatio = currentEntry?.intersectionRatio ?? 0;

                if (neighborEntry && neighborEntry.isIntersecting && neighborRatio >= ENTER_THRESHOLD && currentRatio <= EXIT_THRESHOLD && (neighborRatio - currentRatio) >= 0.1) {
                    if (pendingNeighborIndex !== neighborIndex) {
                        pendingNeighborIndex = neighborIndex;
                        neighborEnterSince = now;
                    }
                    if (now - neighborEnterSince >= HYSTERESIS_MS) {
                        enqueueTransitionTo(neighborIndex);
                        pendingNeighborIndex = null;
                        neighborEnterSince = 0;
                        return;
                    }
                } else {
                    // Reset hysteresis if conditions are not met
                    pendingNeighborIndex = null;
                    neighborEnterSince = 0;
                }
            }

            // Otherwise, find the strongest visible section in the intended direction
            let bestIdx = null;
            let bestRatio = 0;
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                const idx = sections.indexOf(e.target);
                if (idx === -1) return;
                if ((toward === 'down' && idx > currentSectionIndex) || (toward === 'up' && idx < currentSectionIndex)) {
                    if (e.intersectionRatio > bestRatio) {
                        bestRatio = e.intersectionRatio;
                        bestIdx = idx;
                    }
                }
            });
            if (bestIdx != null && bestRatio >= 0.7) {
                enqueueTransitionTo(bestIdx);
                return;
            }

            // If nothing suitable, defer to scroll idle correction
            return;
        }
 
        // Fallback: pick the most visible intersecting section when direction is unknown
        let mostVisibleEntry = null;
        for (const entry of entries) {
            if (entry.isIntersecting) {
                if (!mostVisibleEntry || entry.intersectionRatio > mostVisibleEntry.intersectionRatio) {
                    mostVisibleEntry = entry;
                }
            }
        }
        if (!mostVisibleEntry || mostVisibleEntry.intersectionRatio < 0.5) return;
        const sectionIndex = Array.from(sections).indexOf(mostVisibleEntry.target);
        if (sectionIndex === -1 || sectionIndex === currentSectionIndex) return;
        enqueueTransitionTo(sectionIndex);
         
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