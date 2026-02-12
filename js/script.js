// ===== INITIALIZE ELEMENTS =====
document.addEventListener('DOMContentLoaded', () => {
    const giftBox = document.getElementById('giftBox');
    const giftContainer = document.querySelector('.gift-container');
    const surpriseContent = document.getElementById('surpriseContent');
    const closeBtn = document.getElementById('closeBtn');
    const loveButton = document.getElementById('loveButton');
    const heartsBackground = document.getElementById('heartsBackground');
    const fireworksContainer = document.getElementById('fireworksContainer');
    const particleCanvas = document.getElementById('particleCanvas');
    const ctx = particleCanvas.getContext('2d');

    // Set canvas size
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;

    // ===== FLOATING HEARTS BACKGROUND =====
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        heartsBackground.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    // Create hearts periodically
    setInterval(createFloatingHeart, 300);

    // Initial hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(createFloatingHeart, i * 200);
    }

    // ===== PARTICLE SYSTEM =====
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 2;
            this.speedX = Math.random() * 6 - 3;
            this.speedY = Math.random() * 6 - 3;
            this.color = this.getRandomColor();
            this.life = 100;
        }

        getRandomColor() {
            const colors = [
                '#ff6b9d',
                '#c9184a',
                '#ff8fa3',
                '#ffd700',
                '#ffed4e',
                '#ff1493',
                '#ff69b4'
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 1;
            this.size *= 0.98;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life / 100;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    let particles = [];

    function createParticles(x, y, count = 30) {
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(x, y));
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

        particles = particles.filter(particle => particle.life > 0);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // ===== GIFT BOX CLICK EVENT =====
    let isOpened = false;

    giftBox.addEventListener('click', () => {
        if (!isOpened) {
            isOpened = true;
            
            // Add opening animation
            giftBox.classList.add('opening');
            
            // Create particle explosion
            const rect = giftBox.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            createParticles(centerX, centerY, 50);

            // Play sound effect (optional)
            playOpenSound();

            // Hide gift box and show surprise
            setTimeout(() => {
                giftContainer.classList.add('hide');
                surpriseContent.classList.add('active');
                
                // Create celebratory fireworks
                setTimeout(() => {
                    createMultipleFireworks();
                }, 500);
            }, 800);
        }
    });

    // ===== CLOSE BUTTON =====
    closeBtn.addEventListener('click', () => {
        surpriseContent.classList.remove('active');
        
        setTimeout(() => {
            giftContainer.classList.remove('hide');
            giftBox.classList.remove('opening');
            isOpened = false;
        }, 500);
    });

    // ===== LOVE BUTTON =====
    loveButton.addEventListener('click', (e) => {
        const rect = loveButton.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Create heart particles
        createHeartParticles(x, y);
        
        // Create fireworks
        createMultipleFireworks();
        
        // Show message
        showLoveMessage();
    });

    // ===== HEART PARTICLES =====
    function createHeartParticles(x, y) {
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.transition = 'all 1.5s ease-out';
            
            document.body.appendChild(heart);

            setTimeout(() => {
                const angle = (Math.PI * 2 * i) / 20;
                const distance = Math.random() * 200 + 100;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                
                heart.style.transform = `translate(${tx}px, ${ty}px) scale(0) rotate(${Math.random() * 360}deg)`;
                heart.style.opacity = '0';
            }, 10);

            setTimeout(() => {
                heart.remove();
            }, 1600);
        }
    }

    // ===== FIREWORKS =====
    function createFirework(x, y) {
        const colors = ['#ff6b9d', '#c9184a', '#ffd700', '#ffed4e', '#ff1493'];
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const firework = document.createElement('div');
            firework.classList.add('firework');
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = Math.random() * 100 + 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            firework.style.left = x + 'px';
            firework.style.top = y + 'px';
            firework.style.background = colors[Math.floor(Math.random() * colors.length)];
            firework.style.setProperty('--tx', tx + 'px');
            firework.style.setProperty('--ty', ty + 'px');
            
            fireworksContainer.appendChild(firework);

            setTimeout(() => {
                firework.remove();
            }, 1000);
        }
    }

    function createMultipleFireworks() {
        const count = 5;
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight * 0.6;
                createFirework(x, y);
            }, i * 300);
        }
    }

    // ===== LOVE MESSAGE POPUP =====
    function showLoveMessage() {
        const messages = [
            "You're amazing! 💕",
            "You light up my world! ✨",
            "Forever grateful for you! 🌹",
            "You make every day special! 💖",
            "Lucky to have you! 🍀"
        ];

        const message = document.createElement('div');
        message.textContent = messages[Math.floor(Math.random() * messages.length)];
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: linear-gradient(145deg, #ff6b9d, #c9184a);
            color: white;
            padding: 20px 40px;
            border-radius: 20px;
            font-size: 24px;
            font-weight: 600;
            z-index: 1001;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            pointer-events: none;
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);

        setTimeout(() => {
            message.style.transform = 'translate(-50%, -50%) scale(0)';
        }, 2000);

        setTimeout(() => {
            message.remove();
        }, 2500);
    }

    // ===== SOUND EFFECTS (OPTIONAL) =====
    function playOpenSound() {
        // Create a simple beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }

    // ===== 3D HEART INTERACTION =====
    const heart3d = document.querySelector('.heart-3d');
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    if (heart3d) {
        heart3d.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            mouseX = e.clientX;
            mouseY = e.clientY;
            heart3d.style.animationPlayState = 'paused';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;

            const deltaX = e.clientX - mouseX;
            const deltaY = e.clientY - mouseY;

            currentRotationY += deltaX * 0.5;
            currentRotationX -= deltaY * 0.5;

            heart3d.style.transform = `rotateY(${currentRotationY}deg) rotateX(${currentRotationX}deg)`;

            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        document.addEventListener('mouseup', () => {
            if (isMouseDown) {
                isMouseDown = false;
                heart3d.style.animationPlayState = 'running';
            }
        });
    }

    // ===== WINDOW RESIZE =====
    window.addEventListener('resize', () => {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    });

    // ===== PREVENT CONTEXT MENU ON LONG PRESS =====
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // ===== CONFETTI EFFECT ON PAGE LOAD =====
    window.addEventListener('load', () => {
        setTimeout(() => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            createParticles(centerX, centerY, 30);
        }, 500);
    });

    // ===== EASTER EGG: KONAMI CODE =====
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated!
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        // Create massive fireworks display
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createFirework(x, y);
            }, i * 100);
        }

        // Show secret message
        const secret = document.createElement('div');
        secret.textContent = '🎉 You found the secret! 🎉';
        secret.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) scale(0);
            background: linear-gradient(145deg, #ffd700, #ffed4e);
            color: #333;
            padding: 20px 40px;
            border-radius: 20px;
            font-size: 24px;
            font-weight: 700;
            z-index: 1002;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;

        document.body.appendChild(secret);

        setTimeout(() => {
            secret.style.transform = 'translateX(-50%) scale(1)';
        }, 10);

        setTimeout(() => {
            secret.style.transform = 'translateX(-50%) scale(0)';
        }, 3000);

        setTimeout(() => {
            secret.remove();
        }, 3500);
    }

    // ===== TOUCH SUPPORT FOR MOBILE =====
    let touchStartX = 0;
    let touchStartY = 0;

    giftBox.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    giftBox.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        // If tap (minimal movement)
        if (Math.abs(diffX) < 10 && Math.abs(diffY) < 10) {
            // Trigger click
            giftBox.click();
        }
    });

    console.log('💝 Valentine\'s Day Gift Loaded Successfully! 💝');
    console.log('🎁 Click the gift box to reveal your surprise!');
    console.log('✨ Try the Konami Code for a special surprise! ✨');
});