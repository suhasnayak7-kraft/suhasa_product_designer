'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

function Chars({ text }) {
  return text.split('').map((c, i) => (
    <span className="char" key={i} aria-hidden="true">{c}</span>
  ));
}

export default function Hero() {
  const rootRef = useRef(null);
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard?.writeText('suhasanayak@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-name .char', {
        y: 90, opacity: 0, stagger: 0.035, duration: 0.8, ease: 'power3.out', delay: 0.2,
      });
      gsap.from('.hero-statement, .hero-loc, .hero-intro, .hero-ctas', {
        opacity: 0, y: 20, duration: 0.8, delay: 0.9, stagger: 0.12,
      });
    }, rootRef);

    rootRef.current.querySelectorAll('.hero-name .char').forEach((char) => {
      char.addEventListener('mouseenter', () => {
        gsap.to(char, {
          y: -10, duration: 0.2, ease: 'power2.out',
          onComplete: () => gsap.to(char, { y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' }),
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero light" ref={rootRef}>
      {/* micro-geometry accents */}
      <span className="geo dot" style={{ top: '18%', left: '8%' }} aria-hidden="true" />
      <span className="geo sq" style={{ top: '30%', right: '12%' }} aria-hidden="true" />
      <span className="geo tri" style={{ bottom: '22%', left: '14%' }} aria-hidden="true" />
      <span className="geo dot" style={{ bottom: '15%', right: '8%' }} aria-hidden="true" />

      <div className="container hero-content">
        <h1 className="visually-hidden">Suhasa Nayak — AI-First Senior Product Designer</h1>
        <p className="hero-name" aria-hidden="true"><Chars text="SUHASA" /></p>
        <div className="hero-mid">
          <p className="hero-statement">
            Designing enterprise experiences that ease, simplify, and delight the working day.
          </p>
        </div>
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
          <button className="btn-ghost dark-ghost" onClick={copyEmail} aria-live="polite">
            {copied ? 'Email copied ✓' : 'Copy email'}
          </button>
        </div>
      </div>
    </section>
  );
}
