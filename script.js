
document.addEventListener('DOMContentLoaded', function() {
    initializeMatrix();
    initializeGlitchEffect();
    initializeFeatureCards();
    initializeMetrics();
    initializeCLIAnimation();
    initializeDownloadButton();
    initializeScrollEffects();
});

function initializeMatrix() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.insertBefore(canvas, document.body.firstChild);
    
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    const chars = "HIDEXTRACT01010101HIDSHIDSARCHIVE";
    const charArray = chars.split("");
    const fontSize = 14;
    const columns = w / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, w, h);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > h && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const matrixInterval = setInterval(draw, 50);
    
    window.addEventListener('resize', function() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });
}

function initializeGlitchEffect() {
    const glitchElement = document.querySelector('.glitch');
    
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchElement.style.animation = 'none';
            glitchElement.offsetHeight;
            glitchElement.style.animation = 'glitch-1 0.3s';
        }
    }, 2000);
}

function initializeFeatureCards() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03) rotateX(5deg)';
            
            createParticles(this);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
        });
    });
}
function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#00ff41';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.boxShadow = '0 0 10px #00ff41';
        
        const startX = rect.left + Math.random() * rect.width;
        const startY = rect.top + Math.random() * rect.height;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 100;
        const duration = 1000 + Math.random() * 1000;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            particle.remove();
        };
    }
}

// Animated Metrics Counter
function initializeMetrics() {
    const metricValues = document.querySelectorAll('.metric-value');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMetric(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    metricValues.forEach(metric => observer.observe(metric));
}

function animateMetric(element) {
    const text = element.textContent;
    const isPercentage = text.includes('%');
    const isMultiplier = text.includes('x');
    const isInfinity = text.includes('∞');
    const isTime = text.includes('ms');
    
    if (isInfinity) {
        let frame = 0;
        const animate = () => {
            frame++;
            element.style.transform = `scale(${1 + Math.sin(frame * 0.1) * 0.1})`;
            element.style.textShadow = `0 0 ${20 + Math.sin(frame * 0.1) * 10}px #00ff41`;
            requestAnimationFrame(animate);
        };
        animate();
        return;
    }
    
    let finalValue = parseFloat(text);
    let currentValue = 0;
    const increment = finalValue / 60; // 60 frames
    
    const counter = () => {
        currentValue += increment;
        if (currentValue >= finalValue) currentValue = finalValue;
        
        let displayValue = Math.floor(currentValue);
        if (isPercentage) displayValue += '%';
        if (isMultiplier) displayValue += 'x';
        if (isTime) displayValue += 'ms';
        
        element.textContent = displayValue;
        
        if (currentValue < finalValue) {
            requestAnimationFrame(counter);
        }
    };
    
    counter();
}

// CLI Animation
function initializeCLIAnimation() {
    const cliDemo = document.getElementById('cliDemo');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCLIAnimation();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(cliDemo);
}

function startCLIAnimation() {
    const lines = document.querySelectorAll('.cli-line, .cli-output, .cli-success');
    lines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
    });
    
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.transition = 'all 0.5s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
            
            // Typing effect for command lines
            if (line.classList.contains('cli-line')) {
                typeText(line.querySelector('.command'));
            }
        }, index * 300);
    });
}

function typeText(element) {
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid #00ff41';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        element.textContent += text[i];
        i++;
        
        if (i >= text.length) {
            clearInterval(typeInterval);
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 500);
        }
    }, 50);
}

// Download Button Enhancement
function initializeDownloadButton() {
    const downloadBtn = document.getElementById('downloadBtn');
    
    downloadBtn.addEventListener('click', function(e) {
        // Create download effect
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('div');
        
        ripple.style.position = 'absolute';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        ripple.animate([
            { width: '0', height: '0', opacity: 1 },
            { width: '300px', height: '300px', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => {
            ripple.remove();
        };
        
        // Success notification
        setTimeout(() => {
            showNotification('Download Started!', 'HIDS format awaits...');
        }, 100);
    });
}

// Notification System
function showNotification(title, message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #000, #001122);
        color: #00ff41;
        padding: 20px;
        border-radius: 10px;
        border: 2px solid #00ff41;
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
        z-index: 10000;
        font-family: 'Orbitron', monospace;
        font-weight: bold;
        text-transform: uppercase;
        transform: translateX(400px);
        transition: transform 0.5s ease;
    `;
    
    notification.innerHTML = `
        <div style="font-size: 1.1em; margin-bottom: 5px;">${title}</div>
        <div style="font-size: 0.9em; opacity: 0.8;">${message}</div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Scroll Effects
function initializeScrollEffects() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => observer.observe(section));
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// Easter Eggs
document.addEventListener('keydown', function(e) {
    // Konami Code: ↑↑↓↓←→←→BA
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    window.konamiIndex = window.konamiIndex || 0;
    
    if (e.keyCode === konamiCode[window.konamiIndex]) {
        window.konamiIndex++;
        if (window.konamiIndex === konamiCode.length) {
            activateEasterEgg();
            window.konamiIndex = 0;
        }
    } else {
        window.konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'pulse 0.5s infinite';
    showNotification('HIDS ACTIVATED!', 'Maximum compression engaged!');
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 3000);
}
