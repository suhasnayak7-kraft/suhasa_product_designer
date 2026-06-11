'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CaseMetrics({ metrics }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ref.current.querySelectorAll('dd').forEach((el) => {
        const text = el.textContent;
        const num = parseFloat(text.replace(/[^\d.]/g, ''));
        if (isNaN(num)) return;
        const prefix = text.match(/^[^\d]*/)[0];
        const suffix = text.match(/[^\d.]*$/)[0];
        gsap.from({ val: 0 }, {
          val: num, duration: 1.6, ease: 'power1.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%' },
          onUpdate() {
            el.textContent = prefix + Math.round(this.targets()[0].val) + suffix;
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  if (!metrics.length) return null;
  return (
    <dl className="case-metrics" ref={ref}>
      {metrics.map((m, i) => (
        <div key={i}>
          <dd>{m.value}</dd>
          <dt>{m.label}</dt>
        </div>
      ))}
    </dl>
  );
}
