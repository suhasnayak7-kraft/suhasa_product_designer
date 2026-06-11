import { notFound } from 'next/navigation';
import { getProject } from '../../../lib/store';
import CaseMetrics from '../../../components/CaseMetrics';

export const dynamic = 'force-dynamic';

function renderBody(body) {
  return body.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>;
    if (line.trim() === '') return null;
    return <p key={i}>{line}</p>;
  });
}

export default function CaseStudy({ params }) {
  const p = getProject(params.slug);
  if (!p) notFound();

  return (
    <>
      <section className="case-hero">
        <div className="container">
          <p className="label">{p.code} · {p.category} · {p.year}</p>
          <h1 className="case-title">{p.title}</h1>
          <CaseMetrics metrics={p.metrics || []} />
          <div className="case-meta-bar">
            <div><p className="label">Role</p><p>{p.role}</p></div>
            <div><p className="label">Team</p><p>{p.team}</p></div>
            <div><p className="label">Timeline</p><p>{p.timeline}</p></div>
          </div>
        </div>
      </section>
      <section className="case-body light">
        <div className="container prose">
          {p.quote && <blockquote className="pull-quote">&ldquo;{p.quote}&rdquo;</blockquote>}
          {renderBody(p.body || '')}
        </div>
      </section>
    </>
  );
}
