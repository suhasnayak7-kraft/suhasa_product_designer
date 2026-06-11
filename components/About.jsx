'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STATEMENTS = [
  'She believes the best interfaces feel like a good conversation — you forget they’re there.',
  'Off-screen: city pop playlists, retro game consoles, and an unreasonable cassette tape collection.',
  'Currently obsessed with motion as a language — what a 300ms ease can say that words can’t.',
];

export default function About() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.about-statement').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 85%' },
          y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about light" id="about" ref={ref}>
      <div className="container">
        <div className="section-head">
          <span className="section-num" aria-hidden="true">02</span>
          <h2 className="section-title">About</h2>
        </div>
        <div className="about-statements">
          {STATEMENTS.map((s, i) => (
            <div className="about-statement" key={i}>
              <span className="num" aria-hidden="true">0{i + 1}</span>
              <p>{s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
