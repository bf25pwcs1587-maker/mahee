import { useEffect, useRef } from 'react';

interface ConfettiCanvasProps {
  burstKey: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  life: number;
  maxLife: number;
  shape: 'rect' | 'circle';
}

const PALETTE = [
  '#E11D48', // Coral Rose
  '#F59E0B', // Marigold
  '#2563EB', // Cobalt
  '#059669', // Emerald
  '#7C3AED', // Violet
  '#FB7185', // Soft Pink
];

export function ConfettiCanvas({ burstKey }: ConfettiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (burstKey === 0) {
      return;
    }
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const originX = canvas.width * 0.5;
    const originY = canvas.height * 0.28;
    const newParticles: Particle[] = Array.from({ length: 95 }, (_, idx) => {
      const angle = (Math.PI * 2 * idx) / 95 + (Math.random() - 0.5) * 0.35;
      const speed = 4 + Math.random() * 10;
      return {
        x: originX + (Math.random() - 0.5) * 140,
        y: originY + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: 6 + Math.random() * 7,
        color: PALETTE[idx % PALETTE.length],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.24,
        life: 0,
        maxLife: 110 + Math.random() * 50,
        shape: idx % 3 === 0 ? 'circle' : 'rect',
      };
    });

    particlesRef.current = [...particlesRef.current, ...newParticles];

    const render = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      ctx.clearRect(0, 0, width, height);

      particlesRef.current = particlesRef.current.filter(
        (p) => p.life < p.maxLife && p.y < height + 40,
      );

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22; // gravity
        p.vx *= 0.99;
        p.rotation += p.vRot;
        p.life += 1;

        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.65);
        }
        ctx.restore();
      }

      if (particlesRef.current.length > 0) {
        rafRef.current = window.requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        rafRef.current = null;
      }
    };

    if (!rafRef.current) {
      rafRef.current = window.requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [burstKey]);

  return (
    <canvas
      ref={canvasRef}
      data-testid="confetti-canvas"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
    />
  );
}
