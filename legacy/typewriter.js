document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.getElementById('typewriter-text');
    const phrases = [
        'Transform your business with AI',
        'Make data-driven decisions',
        'Automate repetitive tasks',
        'Enhance customer experience',
        'Stay ahead of the competition'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Deleting text
            charIndex--;
            typewriterElement.textContent = currentPhrase.substring(0, charIndex);
            
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                isPaused = true;
                setTimeout(type, 1000); // Pause before typing next phrase
                return;
            }
            
            setTimeout(type, 50); // Delete speed
        } else {
            // Typing text
            if (isPaused) {
                isPaused = false;
                setTimeout(type, 200);
                return;
            }
            
            charIndex++;
            typewriterElement.textContent = currentPhrase.substring(0, charIndex);
            
            if (charIndex === currentPhrase.length) {
                isPaused = true;
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, 2000); // Pause at the end of phrase
                return;
            }
            
            setTimeout(type, 100); // Type speed
        }
    }
    
    // Start the typewriter effect
    type();
}); 