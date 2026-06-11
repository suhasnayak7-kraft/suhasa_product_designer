'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const EXPERIENCE = [
  { role: 'Senior UI/UX Designer · CEO’s Office', org: 'BlueTree', years: '2025 – Present' },
  { role: 'UI/UX Designer', org: 'BlueTree', years: '2023 – 2025' },
  { role: 'UI/UX Designer', org: 'Ritual Softech', years: '2022 – 2023' },
  { role: 'Lecturer, Mechanical Engineering', org: 'Govt. Polytechnic', years: '2018 – 2021' },
];

const TOOLKIT = [
  { group: 'AI & Prototyping', items: ['Figma Make', 'Claude Code', 'Cursor', 'v0', 'Antigravity', 'Lovable.dev'] },
  { group: 'Design', items: ['Figma', 'Framer', 'FigJam', 'Balsamiq'] },
  { group: 'Systems', items: ['Design tokens', 'Component libraries', 'Auto-layout', 'Responsive grids'] },
  { group: 'Process', items: ['Journey mapping', 'Information architecture', 'A/B testing', 'Design docs'] },
];

const QA = [
  {
    q: 'How did a mechanical engineer end up in design?',
    a: 'Three years of teaching engineering taught me that explaining complex systems clearly IS design. The structured thinking and communication carried straight over — the tools just changed from CAD to Figma.',
  },
  {
    q: 'What does “AI-first” actually mean in your process?',
    a: 'Ideas get validated as working prototypes, not static mocks. I sketch, build it with Claude Code or Antigravity, put it in front of people, and only then does engineering start. It collapses weeks into days.',
  },
  {
    q: 'What kind of problems do you enjoy most?',
    a: 'The unglamorous enterprise ones — payroll, approvals, 150-field forms. When someone says “this used to be painful and now it isn’t,” that’s the win.',
  },
  {
    q: 'What do you do when you are not designing?',
    a: 'Probably building something anyway — a prototype, a side tool, this website. Curiosity doesn’t clock out.',
  },
];

function useReveal(ref, selector) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray(selector).forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%' },
          y: 30, opacity: 0, duration: 0.7, ease: 'power2.out',
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [ref, selector]);
}

export function Experience() {
  const ref = useRef(null);
  useReveal(ref, '.exp-row');
  return (
    <section className="exp light" id="about" ref={ref}>
      <div className="container">
        <div className="section-head">
          <span className="section-num" aria-hidden="true">01</span>
          <h2 className="section-title">I work design</h2>
        </div>
        <ul className="exp-list" role="list">
          {EXPERIENCE.map((e, i) => (
            <li className="exp-row" key={i}>
              <span className="exp-role">{e.role}</span>
              <span className="exp-org">@ {e.org}</span>
              <span className="exp-years">{e.years}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Toolkit() {
  const ref = useRef(null);
  useReveal(ref, '.toolkit-group');
  return (
    <section className="toolkit" ref={ref}>
      <div className="container">
        <div className="section-head">
          <span className="section-num" aria-hidden="true">03</span>
          <h2 className="section-title">I build with</h2>
        </div>
        <div className="toolkit-groups">
          {TOOLKIT.map((g) => (
            <div className="toolkit-group" key={g.group}>
              <p className="label">{g.group}</p>
              <div className="toolkit-pills">
                {g.items.map((t, i) => (
                  <span key={t} className={`tag ${i % 2 ? 'pink' : ''}`}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QASection() {
  const ref = useRef(null);
  useReveal(ref, '.qa-item');
  return (
    <section className="qa light" ref={ref}>
      <div className="container">
        <div className="section-head">
          <span className="section-num" aria-hidden="true">04</span>
          <h2 className="section-title">Q&amp;A</h2>
        </div>
        <div className="qa-list">
          {QA.map((item, i) => (
            <div className="qa-item" key={i}>
              <p className="qa-q">{item.q}</p>
              <p className="qa-a">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
