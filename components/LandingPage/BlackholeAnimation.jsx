// --- NEW: Black Hole Particle Animation Component ---
const BlackHoleCanvas = () => {
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        // --- Setup and Polyfill ---
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const requestAnimFrame = (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            }
        );

        const cancelAnimFrame = (
            window.cancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            function (id) {
                clearTimeout(id);
            }
        );

        // --- Particle and Emitter Logic from your study material ---
        function Particle(x, y, distance) {
            this.angle = Math.random() * 2 * Math.PI;
            this.radius = Math.random();
            this.opacity = (Math.random() * 5 + 2) / 10;
            this.distance = (1 / this.opacity) * distance;
            this.speed = this.distance * 0.00003;

            this.position = {
                x: x + this.distance * Math.cos(this.angle),
                y: y + this.distance * Math.sin(this.angle)
            };

            this.draw = function () {
                ctx.fillStyle = "rgba(255,255,255," + this.opacity + ")";
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.closePath();
            }
            this.update = function () {
                this.angle += this.speed;
                this.position = {
                    x: x + this.distance * Math.cos(this.angle),
                    y: y + this.distance * Math.sin(this.angle)
                };
                this.draw();
            }
        }

        function Emitter(x, y) {
            this.position = { x: x, y: y };
            this.radius = 30; // Radius of the central black hole
            this.count = 3000;
            this.particles = [];

            for (var i = 0; i < this.count; i++) {
                this.particles.push(new Particle(this.position.x, this.position.y, this.radius));
            }
        }

        Emitter.prototype = {
            draw: function () {
                ctx.fillStyle = "rgba(0,0,0,1)";
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.closePath();
            },
            update: function () {
                for (var i = 0; i < this.count; i++) {
                    this.particles[i].update();
                }
                this.draw();
            }
        }

        let emitter;

        // --- Animation Loop ---
        const loop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            emitter.update();
            animationFrameId = requestAnimFrame(loop);
        }

        // --- Resize and Initialization ---
        const handleResize = () => {
            canvas.width = window.innerWidth;
            // Set a max height or link to the container height
            canvas.height = Math.min(window.innerHeight, 700);
            emitter = new Emitter(canvas.width / 2, canvas.height / 2);
        };

        handleResize(); // Initial setup
        loop(); // Start animation

        window.addEventListener('resize', handleResize);

        // --- Cleanup on component unmount ---
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimFrame(animationFrameId);
        };

    }, []); // Empty dependency array ensures this runs only once on mount

    return <canvas ref={canvasRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />;
};