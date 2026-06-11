import Hero from '../components/Hero';
import Ticker from '../components/Ticker';
import ProjectGrid from '../components/ProjectGrid';
import About from '../components/About';
import { getProjects } from '../lib/store';

export const dynamic = 'force-dynamic';

export default function Home() {
  const projects = getProjects();
  return (
    <>
      <Hero />
      <Ticker />
      <ProjectGrid projects={projects} />
      <About />
      <section className="contact" id="contact">
        <div className="container">
          <h2 className="contact-title">Let&rsquo;s make something joyful.</h2>
          <div className="contact-actions">
            <a className="btn-primary" href="mailto:suhasanayak@gmail.com">Say hello</a>
            <a className="btn-ghost" href="/api/resume" target="_blank" rel="noopener" aria-label="Download resume PDF (opens in new tab)">
              Download resume
            </a>
            <a className="btn-ghost" href="https://linkedin.com/in/suhasa-nayak" target="_blank" rel="noopener" aria-label="LinkedIn profile (opens in new tab)">
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
