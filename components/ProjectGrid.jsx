'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CATEGORIES = ['All', 'UI Design', 'Branding', 'Motion', 'Research'];

export default function ProjectGrid({ projects, sectionNum = '01' }) {
  const [filter, setFilter] = useState('All');
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.section-title', {
        scrollTrigger: { trigger: '.section-title', start: 'top 80%' },
        y: 60, opacity: 0, duration: 0.9, ease: 'power2.out',
      });
      gsap.from('.project-card', {
        scrollTrigger: { trigger: '.project-grid', start: 'top 80%' },
        y: 40, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="work" id="work" ref={ref}>
      <div className="container">
        <div className="section-head">
          <span className="section-num" aria-hidden="true">{sectionNum}</span>
          <h2 className="section-title">Case studies</h2>
        </div>
        <div className="filter-tabs" role="group" aria-label="Filter projects by category">
          {CATEGORIES.map((c) => (
            <button key={c} className="filter-tab" aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>
        <ul className="project-grid" role="list">
          {shown.map((p) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}`} className="project-card" aria-label={`View ${p.title} case study`}>
                <div className="card-thumb">
                  {p.thumbnail ? (
                    p.thumbnail.match(/\.(mp4|webm)$/i) ? (
                      <video src={p.thumbnail} autoPlay muted loop playsInline aria-hidden="true" />
                    ) : (
                      <img src={p.thumbnail} alt={`${p.title} case study cover`} />
                    )
                  ) : null}
                </div>
                <span className="card-code">{p.code} · {p.year}</span>
                <h3 className="card-title">{p.title}</h3>
                <p className="card-meta">{p.summary}</p>
                <div className="card-tags">
                  {(p.tags || []).map((t, i) => (
                    <span key={t} className={`tag ${i % 2 ? 'pink' : ''}`}>{t}</span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
