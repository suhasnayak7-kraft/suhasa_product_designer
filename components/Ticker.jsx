'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ITEMS = ['Interaction Design', 'Product Strategy', 'Design Systems', 'Motion', 'Research', 'Prototyping'];

export default function Ticker() {
  const innerRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tween = gsap.to(innerRef.current, { xPercent: -50, duration: 18, ease: 'none', repeat: -1 });
    return () => tween.kill();
  }, []);
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-inner" ref={innerRef}>
        {row.map((t, i) => <span key={i}>{t} ✦</span>)}
      </div>
    </div>
  );
}
