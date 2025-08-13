document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('snakeCanvas');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get canvas context!');
        return;
    }

    const startButton = document.getElementById('startGame');
    const pauseButton = document.getElementById('pauseGame');
    const scoreElement = document.getElementById('scoreValue');
    const btnUp = document.getElementById('snakeUp');
    const btnDown = document.getElementById('snakeDown');
    const btnLeft = document.getElementById('snakeLeft');
    const btnRight = document.getElementById('snakeRight');

    if (!startButton || !pauseButton || !scoreElement) {
        console.error('Required elements not found:', {
            startButton: !!startButton,
            pauseButton: !!pauseButton,
            scoreElement: !!scoreElement
        });
        return;
    }

    let gridSize = 20;
    let snake = [];
    let food = {};
    let direction = 'right';
    let nextDirection = 'right';
    let score = 0;
    let gameLoop = null;
    let isPaused = false;

    // Colors matching website theme
    const colors = {
        snake: '#0000FF',
        food: '#FF0000',
        background: '#FFFFFF',
        grid: '#f5f5f5'
    };

    function resizeCanvas() {
        // Get the computed style to account for border
        const style = window.getComputedStyle(canvas);
        const width = parseInt(style.width, 10);
        const height = parseInt(style.height, 10);

        // Set canvas dimensions to match CSS dimensions
        canvas.width = width;
        canvas.height = height;

        // Adjust grid size based on canvas size
        gridSize = Math.floor(Math.min(width, height) / 30);

        console.log('Canvas resized:', {
            width,
            height,
            gridSize,
            style: {
                width: style.width,
                height: style.height
            }
        });
    }

    function drawGrid() {
        ctx.strokeStyle = colors.grid;
        ctx.lineWidth = 0.5;
        
        for (let x = 0; x <= canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        for (let y = 0; y <= canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }

    function initGame() {
        // Ensure canvas is properly sized
        resizeCanvas();

        // Calculate center position
        const centerX = Math.floor(canvas.width / (2 * gridSize)) * gridSize;
        const centerY = Math.floor(canvas.height / (2 * gridSize)) * gridSize;

        // Initialize snake
        snake = [
            { x: centerX, y: centerY },
            { x: centerX - gridSize, y: centerY },
            { x: centerX - (2 * gridSize), y: centerY }
        ];

        // Reset game state
        direction = 'right';
        nextDirection = 'right';
        score = 0;
        scoreElement.textContent = score;
        isPaused = false;
        pauseButton.textContent = 'Pause';

        // Generate initial food
        generateFood();

        // Clear existing game loop if any
        if (gameLoop) {
            clearInterval(gameLoop);
        }

        // Start game loop
        gameLoop = setInterval(gameStep, 150);

        console.log('Game initialized:', {
            canvasSize: { width: canvas.width, height: canvas.height },
            gridSize,
            snake,
            food
        });

        // Initial draw
        draw();
    }

    function generateFood() {
        const maxX = Math.floor((canvas.width - gridSize) / gridSize);
        const maxY = Math.floor((canvas.height - gridSize) / gridSize);
        
        do {
            food = {
                x: Math.floor(Math.random() * maxX) * gridSize,
                y: Math.floor(Math.random() * maxY) * gridSize
            };
        } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
        
        console.log('Food generated:', food);
    }

    function gameStep() {
        if (isPaused) return;

        const head = { ...snake[0] };
        direction = nextDirection;

        switch (direction) {
            case 'up': head.y -= gridSize; break;
            case 'down': head.y += gridSize; break;
            case 'left': head.x -= gridSize; break;
            case 'right': head.x += gridSize; break;
        }

        if (isCollision(head)) {
            gameOver();
            return;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreElement.textContent = score;
            generateFood();
        } else {
            snake.pop();
        }

        draw();
    }

    function isCollision(head) {
        // Wall collision
        if (head.x < 0 || head.x >= canvas.width || 
            head.y < 0 || head.y >= canvas.height) {
            return true;
        }

        // Self collision (check against all segments except the tail which will be removed)
        return snake.slice(0, -1).some(segment => segment.x === head.x && segment.y === head.y);
    }

    function draw() {
        // Clear canvas
        ctx.fillStyle = colors.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        drawGrid();

        // Draw snake
        ctx.fillStyle = colors.snake;
        snake.forEach(segment => {
            ctx.fillRect(segment.x + 1, segment.y + 1, gridSize - 2, gridSize - 2);
        });

        // Draw food
        ctx.fillStyle = colors.food;
        ctx.fillRect(food.x + 1, food.y + 1, gridSize - 2, gridSize - 2);
    }

    function gameOver() {
        clearInterval(gameLoop);
        gameLoop = null;
        alert(`Game Over! Score: ${score}`);
        startButton.textContent = 'Restart Game';
    }

    // Event Listeners
    startButton.addEventListener('click', () => {
        console.log('Start button clicked');
        startButton.textContent = 'Restart Game';
        initGame();
    });

    pauseButton.addEventListener('click', () => {
        isPaused = !isPaused;
        pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
        console.log('Game paused:', isPaused);
    });

    // Helper to update direction with safety against reversing
    function setDirection(next) {
        if (!gameLoop) return;
        if ((next === 'up' && direction !== 'down') ||
            (next === 'down' && direction !== 'up') ||
            (next === 'left' && direction !== 'right') ||
            (next === 'right' && direction !== 'left')) {
            nextDirection = next;
        }
    }

    // Touch/click mobile controls
    if (btnUp && btnDown && btnLeft && btnRight) {
        const handle = (dir) => (e) => { e.preventDefault(); setDirection(dir); };
        btnUp.addEventListener('click', handle('up'));
        btnDown.addEventListener('click', handle('down'));
        btnLeft.addEventListener('click', handle('left'));
        btnRight.addEventListener('click', handle('right'));

        // Also support touchstart to reduce tap delay on some browsers
        btnUp.addEventListener('touchstart', handle('up'), { passive: false });
        btnDown.addEventListener('touchstart', handle('down'), { passive: false });
        btnLeft.addEventListener('touchstart', handle('left'), { passive: false });
        btnRight.addEventListener('touchstart', handle('right'), { passive: false });
    }

    // Handle keyboard controls
    document.addEventListener('keydown', (e) => {
        if (!gameLoop) return;

        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                if (direction !== 'down') nextDirection = 'up';
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                if (direction !== 'up') nextDirection = 'down';
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (direction !== 'right') nextDirection = 'left';
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (direction !== 'left') nextDirection = 'right';
                break;
        }
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            if (gameLoop) {
                clearInterval(gameLoop);
                initGame();
            } else {
                draw();
            }
        }, 250);
    });

    // Initial setup
    resizeCanvas();
    draw();

    console.log('Snake game initialized and ready to start');
}); 