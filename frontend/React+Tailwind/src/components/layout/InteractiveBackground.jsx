import React, { useRef, useEffect, useCallback, useState } from 'react';

// Configuration 
const CONFIG = {
  particleCount: 120,
  connectionDistance: 180,
  mouseInfluenceRadius: 300,
  mouseAttractionStrength: 0.018,
  mouseRepelOnClick: 8,
  baseSpeed: 0.35,
  particleMinSize: 1.8,
  particleMaxSize: 5,
  colors: {
    primary: { r: 139, g: 92, b: 246 },    // violet-500
    secondary: { r: 99, g: 102, b: 241 },   // indigo-500
    accent: { r: 192, g: 132, b: 252 },     // purple-400
    glow: { r: 167, g: 139, b: 250 },       // violet-400
    bright: { r: 224, g: 204, b: 255 },     // lavender-200
  },
  fps: 60,
};

//  Particle Class 
class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * CONFIG.baseSpeed * 2;
    this.vy = (Math.random() - 0.5) * CONFIG.baseSpeed * 2;
    this.size = CONFIG.particleMinSize + Math.random() * (CONFIG.particleMaxSize - CONFIG.particleMinSize);
    this.baseSize = this.size;
    this.pulseOffset = Math.random() * Math.PI * 2;
    this.pulseSpeed = 0.01 + Math.random() * 0.02;
    this.opacity = 0.3 + Math.random() * 0.5;
    this.baseOpacity = this.opacity;

    // Assign a random color blend
    const colors = Object.values(CONFIG.colors);
    const c = colors[Math.floor(Math.random() * colors.length)];
    this.color = { ...c };
  }

  update(canvasWidth, canvasHeight, mouseX, mouseY, mouseActive, time) {
    // Pulse size
    this.size = this.baseSize + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.8;
    this.opacity = this.baseOpacity + Math.sin(time * this.pulseSpeed * 0.7 + this.pulseOffset) * 0.15;

    // Mouse attraction
    if (mouseActive) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONFIG.mouseInfluenceRadius) {
        const force = (1 - dist / CONFIG.mouseInfluenceRadius) * CONFIG.mouseAttractionStrength;
        this.vx += dx * force;
        this.vy += dy * force;

        // Brighten particles near the mouse
        this.opacity = Math.min(1, this.baseOpacity + (1 - dist / CONFIG.mouseInfluenceRadius) * 0.5);
        this.size = this.baseSize + (1 - dist / CONFIG.mouseInfluenceRadius) * 2;
      }
    }

    // Apply friction
    this.vx *= 0.98;
    this.vy *= 0.98;

    // Clamp velocity
    const maxV = CONFIG.baseSpeed * 3;
    this.vx = Math.max(-maxV, Math.min(maxV, this.vx));
    this.vy = Math.max(-maxV, Math.min(maxV, this.vy));

    // Move
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around edges with padding
    const pad = 20;
    if (this.x < -pad) this.x = canvasWidth + pad;
    if (this.x > canvasWidth + pad) this.x = -pad;
    if (this.y < -pad) this.y = canvasHeight + pad;
    if (this.y > canvasHeight + pad) this.y = -pad;
  }
}

// Floating Orb Class (Ambient Background Blobs) 
class FloatingOrb {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.radius = 80 + Math.random() * 200;
    this.baseX = this.x;
    this.baseY = this.y;
    this.driftX = 30 + Math.random() * 60;
    this.driftY = 20 + Math.random() * 50;
    this.speed = 0.0003 + Math.random() * 0.0006;
    this.phase = Math.random() * Math.PI * 2;
    this.opacity = 0.06 + Math.random() * 0.08;

    const colors = [
      { r: 139, g: 92, b: 246 },
      { r: 99, g: 102, b: 241 },
      { r: 192, g: 132, b: 252 },
      { r: 129, g: 140, b: 248 },
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(time, mouseX, mouseY, mouseActive) {
    this.x = this.baseX + Math.sin(time * this.speed + this.phase) * this.driftX;
    this.y = this.baseY + Math.cos(time * this.speed * 0.7 + this.phase) * this.driftY;

    // Subtle parallax response to mouse
    if (mouseActive) {
      const parallaxStrength = 0.02;
      this.x += (mouseX - this.baseX) * parallaxStrength * (this.radius / 200);
      this.y += (mouseY - this.baseY) * parallaxStrength * (this.radius / 200);
    }
  }

  draw(ctx) {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
    gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`);
    gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.4})`);
    gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

//  React Component 
export default function InteractiveBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const orbsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false, clicked: false });
  const animationRef = useRef(null);
  const timeRef = useRef(0);
  const rippleRef = useRef([]);

  const initParticles = useCallback((width, height) => {
    particlesRef.current = [];
    for (let i = 0; i < CONFIG.particleCount; i++) {
      particlesRef.current.push(new Particle(width, height));
    }
    orbsRef.current = [];
    for (let i = 0; i < 5; i++) {
      orbsRef.current.push(new FloatingOrb(width, height));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let width, height;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      if (particlesRef.current.length === 0) {
        initParticles(width, height);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // ── Mouse / Touch Tracking ──
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleClick = (e) => {
      // Create ripple burst — push particles away from click
      const cx = e.clientX;
      const cy = e.clientY;
      particlesRef.current.forEach((p) => {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.mouseInfluenceRadius * 1.5 && dist > 0) {
          const force = (1 - dist / (CONFIG.mouseInfluenceRadius * 1.5)) * CONFIG.mouseRepelOnClick;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      });
      // Add visual ripple ring
      rippleRef.current.push({ x: cx, y: cy, radius: 0, maxRadius: CONFIG.mouseInfluenceRadius * 1.8, opacity: 0.6 });
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('click', handleClick);

    // ── Render Loop ──
    const render = () => {
      timeRef.current++;
      const time = timeRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw ambient floating orbs
      orbsRef.current.forEach((orb) => {
        orb.update(time, mouse.x, mouse.y, mouse.active);
        orb.draw(ctx);
      });

      // 2. Update particles
      particlesRef.current.forEach((p) => {
        p.update(width, height, mouse.x, mouse.y, mouse.active, time);
      });

      // 2.5. Update and draw ripples
      rippleRef.current = rippleRef.current.filter((r) => {
        r.radius += 6;
        r.opacity *= 0.96;
        if (r.opacity < 0.01 || r.radius > r.maxRadius) return false;

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(167, 139, 250, ${r.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(192, 132, 252, ${r.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        return true;
      });

      // 3. Draw connections between nearby particles
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONFIG.connectionDistance) {
            const opacity = (1 - dist / CONFIG.connectionDistance) * 0.35;

            // Glow connections near mouse
            let lineWidth = 1;
            let glowOpacity = opacity;

            if (mouse.active) {
              const midX = (particles[i].x + particles[j].x) / 2;
              const midY = (particles[i].y + particles[j].y) / 2;
              const mouseDist = Math.sqrt(
                (midX - mouse.x) ** 2 + (midY - mouse.y) ** 2
              );

              if (mouseDist < CONFIG.mouseInfluenceRadius) {
                const mouseInfluence = 1 - mouseDist / CONFIG.mouseInfluenceRadius;
                lineWidth = 1 + mouseInfluence * 2;
                glowOpacity = opacity + mouseInfluence * 0.35;
              }
            }

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            // Create gradient line
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, `rgba(${particles[i].color.r}, ${particles[i].color.g}, ${particles[i].color.b}, ${glowOpacity})`);
            gradient.addColorStop(1, `rgba(${particles[j].color.r}, ${particles[j].color.g}, ${particles[j].color.b}, ${glowOpacity})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        }
      }

      // 4. Draw particles as glowing dots
      particles.forEach((p) => {
        // Outer glow
        const glowGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        glowGradient.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.opacity * 0.4})`);
        glowGradient.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.opacity})`;
        ctx.fill();

        // White highlight (specular)
        ctx.beginPath();
        ctx.arc(p.x - p.size * 0.3, p.y - p.size * 0.3, p.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.6})`;
        ctx.fill();
      });

      // 5. Mouse glow orb (cursor aura)
      if (mouse.active) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, CONFIG.mouseInfluenceRadius * 0.8
        );
        mouseGlow.addColorStop(0, 'rgba(139, 92, 246, 0.14)');
        mouseGlow.addColorStop(0.3, 'rgba(99, 102, 241, 0.04)');
        mouseGlow.addColorStop(0.6, 'rgba(192, 132, 252, 0.02)');
        mouseGlow.addColorStop(1, 'rgba(139, 92, 246, 0)');

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, CONFIG.mouseInfluenceRadius * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = mouseGlow;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('click', handleClick);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      id="interactive-bg-canvas"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
