/* ============================================
   Particle Background Animation — T1 Theme
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  const PARTICLE_COUNT = 80;
  const MAX_DISTANCE = 120;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function getThemeColors() {
    const style = getComputedStyle(document.documentElement);
    return {
      color1: style.getPropertyValue('--particle-color-1').trim() || 'rgba(226, 1, 45, 0.6)',
      color2: style.getPropertyValue('--particle-color-2').trim() || 'rgba(201, 168, 76, 0.5)',
      color3: style.getPropertyValue('--particle-color-3').trim() || 'rgba(255, 255, 255, 0.3)',
      line: style.getPropertyValue('--particle-line').trim() || 'rgba(201, 168, 76, 0.15)',
    };
  }

  function createParticle() {
    const colors = getThemeColors();
    const colorOptions = [colors.color1, colors.color2, colors.color3];
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
    };
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const colors = getThemeColors();

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_DISTANCE) {
          const opacity = 1 - dist / MAX_DISTANCE;
          ctx.beginPath();
          ctx.strokeStyle = colors.line.replace(/[\d.]+\)$/, (opacity * 0.3) + ')');
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
  }

  function update() {
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
  }

  function animate() {
    update();
    draw();
    animationId = requestAnimationFrame(animate);
  }

  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    init();
    draw(); // Draw once, no animation
  } else {
    init();
    animate();
  }

  // Handle resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resize();
      // Reposition out-of-bounds particles
      particles.forEach(p => {
        if (p.x > canvas.width) p.x = canvas.width * Math.random();
        if (p.y > canvas.height) p.y = canvas.height * Math.random();
      });
    }, 200);
  });
});
