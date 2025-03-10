const canvas = document.getElementById('cursorCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

// Trail effect parameters
const points = [];
const POINT_HISTORY = 35;  // More points = longer trail
const LATENCY = 0.65;      // Higher = more latency (0-1)
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Point class for trail
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Animation function
function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Smooth follow
    currentX += (mouseX - currentX) * LATENCY;
    currentY += (mouseY - currentY) * LATENCY;

    // Add new point
    points.push(new Point(currentX, currentY));

    // Remove old points
    if (points.length > POINT_HISTORY) {
        points.shift();
    }

    // Draw trail
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    // Create smooth curve through points
    for (let i = 1; i < points.length - 2; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }

    // Connect last points
    if (points.length > 2) {
        ctx.quadraticCurveTo(
            points[points.length - 2].x,
            points[points.length - 2].y,
            points[points.length - 1].x,
            points[points.length - 1].y
        );
    }

    // Line style
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Create gradient
    const gradient = ctx.createLinearGradient(
        points[0].x, points[0].y,
        points[points.length - 1].x, points[points.length - 1].y
    );
    gradient.addColorStop(0, 'rgba(255, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');
    ctx.strokeStyle = gradient;

    // Draw the line
    ctx.stroke();

    // Add glow effect
    ctx.shadowColor = 'red';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    requestAnimationFrame(animate);
}

// Start animation
animate(); 