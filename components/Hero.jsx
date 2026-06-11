'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

function Chars({ text }) {
  return text.split('').map((c, i) => (
    <span className="char" key={i} aria-hidden="true">{c}</span>
  ));
}

export default function Hero() {
  const canvasRef = useRef(null);
  const rootRef = useRef(null);
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard?.writeText('suhasanayak@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let ctx;
    if (!prefersReduced) {
      ctx = gsap.context(() => {
        gsap.from('.hero-name .char', {
          y: 80, opacity: 0, stagger: 0.035, duration: 0.8, ease: 'power3.out', delay: 0.3,
        });
        gsap.from('.hero-statement, .hero-loc, .hero-intro, .hero-ctas', {
          opacity: 0, y: 20, duration: 0.8, delay: 1, stagger: 0.12,
        });
      }, rootRef);

      rootRef.current.querySelectorAll('.hero-name .char').forEach((char) => {
        char.addEventListener('mouseenter', () => {
          gsap.to(char, {
            y: -8, duration: 0.2, ease: 'power2.out',
            onComplete: () => gsap.to(char, { y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' }),
          });
        });
      });
    }

    if (window.innerWidth < 768 || prefersReduced) return () => ctx?.revert();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 4;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(0.08, 0.08);
    const particles = [];
    for (let i = 0; i < 80; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00c4cc : 0xff4fa3,
        transparent: true,
        opacity: Math.random() * 0.4 + 0.1,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geometry, mat);
      mesh.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4);
      mesh.rotation.z = Math.random() * Math.PI;
      scene.add(mesh);
      particles.push(mesh);
    }

    const buildings = [
      { w: 0.4, h: 2.0, x: -3.6 }, { w: 0.6, h: 3.2, x: -2.6 }, { w: 0.5, h: 1.8, x: -1.6 },
      { w: 0.3, h: 2.6, x: -0.8 }, { w: 0.55, h: 2.2, x: 0.2 }, { w: 0.45, h: 3.0, x: 1.2 },
      { w: 0.6, h: 1.6, x: 2.2 }, { w: 0.35, h: 2.4, x: 3.1 }, { w: 0.5, h: 2.0, x: 3.9 },
    ];
    const disposables = [geometry];
    buildings.forEach(({ w, h, x }) => {
      const geo = new THREE.BoxGeometry(w, h, 0.1);
      const mat = new THREE.MeshBasicMaterial({ color: 0x0d2137 });
      const wire = new THREE.EdgesGeometry(geo);
      const wireMat = new THREE.LineBasicMaterial({ color: 0x00c4cc, transparent: true, opacity: 0.3 });
      const building = new THREE.Mesh(geo, mat);
      const wireframe = new THREE.LineSegments(wire, wireMat);
      building.position.set(x, h / 2 - 2.6, -1.5);
      wireframe.position.copy(building.position);
      scene.add(building, wireframe);
      disposables.push(geo, mat, wire, wireMat);
    });

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(scene.rotation, { y: x * 0.15, x: -y * 0.1, duration: 1, ease: 'power2.out' });
    };
    document.addEventListener('mousemove', onMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    let raf;
    let hidden = false;
    const onVis = () => { hidden = document.hidden; if (!hidden) animate(); };
    document.addEventListener('visibilitychange', onVis);

    function animate() {
      if (hidden) return;
      raf = requestAnimationFrame(animate);
      particles.forEach((p, i) => {
        p.position.y += 0.002 * (i % 2 === 0 ? 1 : -1);
        p.rotation.z += 0.003;
        if (p.position.y > 3) p.position.y = -3;
        if (p.position.y < -3) p.position.y = 3;
      });
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      ctx?.revert();
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', onResize);
      particles.forEach((p) => p.material.dispose());
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <section className="hero" ref={rootRef}>
      <div id="canvas-hero" ref={canvasRef} aria-hidden="true" />
      <div className="container hero-content">
        <h1 className="visually-hidden">Suhasa Nayak — AI-First Senior Product Designer</h1>
        <p className="hero-name" aria-hidden="true"><Chars text="SUHASA" /></p>
        <p className="hero-statement">
          Designing enterprise experiences that ease, simplify, and delight the working day.
        </p>
        <p className="hero-name" aria-hidden="true"><Chars text="NAYAK" /></p>
        <p className="hero-loc label">Bengaluru, IN</p>
        <p className="hero-intro">
          I&rsquo;m a designer with a mechanical engineering past. I untangle complex enterprise
          problems — payroll, approvals, 150-field forms — into interfaces people can actually use,
          moving from raw idea to working prototype fast with AI tools. I care just as much about
          impact as I do about craft.
        </p>
        <div className="hero-ctas">
          <a className="btn-primary" href="#work">Case studies</a>
          <button className="btn-ghost" onClick={copyEmail} aria-live="polite">
            {copied ? 'Email copied ✓' : 'Copy email'}
          </button>
        </div>
      </div>
    </section>
  );
}
