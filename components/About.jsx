'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STATEMENTS = [
  'Senior designer with a mechanical engineering background — bridging product strategy and hands-on craft.',
  'AI-first by habit: Figma Make, Claude Code, Cursor, v0 — raw idea to working prototype before the meeting ends.',
  'Specialised in untangling complex enterprise problems into interfaces people can actually use.',
];

const EXPERIENCE = [
  { role: 'Senior UI/UX Designer · CEO’s Office', org: 'BlueTree', years: '2025 — Present' },
  { role: 'UI/UX Designer', org: 'BlueTree', years: '2023 — 2025' },
  { role: 'UI/UX Designer', org: 'Ritual Softech', years: '2022 — 2023' },
  { role: 'Lecturer, Mechanical Engineering', org: 'Govt. Polytechnic', years: '2018 — 2021' },
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
];

export default function About() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.about-statement, .exp-row, .qa-item').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%' },
          y: 30, opacity: 0, duration: 0.7, ease: 'power2.out',
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

        <h3 className="about-subhead">I work design</h3>
        <ul className="exp-list" role="list">
          {EXPERIENCE.map((e, i) => (
            <li className="exp-row" key={i}>
              <span className="exp-role">{e.role}</span>
              <span className="exp-org">@ {e.org}</span>
              <span className="exp-years">{e.years}</span>
            </li>
          ))}
        </ul>

        <h3 className="about-subhead">Q&amp;A</h3>
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
