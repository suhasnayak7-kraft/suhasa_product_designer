'use client';
import { useState, useEffect } from 'react';

const EMPTY = {
  slug: '', code: '', title: '', category: 'UI Design', year: '', thumbnail: '',
  tags: '', summary: '', role: '', team: '', timeline: '', quote: '', body: '',
  metrics: '+31% | Completion rate\n26% | Fewer drop-offs',
};

function toForm(p) {
  return {
    ...p,
    tags: (p.tags || []).join(', '),
    metrics: (p.metrics || []).map((m) => `${m.value} | ${m.label}`).join('\n'),
  };
}

function fromForm(f) {
  return {
    ...f,
    tags: f.tags.split(',').map((t) => t.trim()).filter(Boolean),
    metrics: f.metrics.split('\n').map((l) => {
      const [value, label] = l.split('|').map((s) => s?.trim());
      return value && label ? { value, label } : null;
    }).filter(Boolean),
  };
}

export default function Admin() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [msg, setMsg] = useState('');

  const headers = { 'x-admin-password': password };

  const load = () =>
    fetch('/api/projects').then((r) => r.json()).then((d) => setProjects(d.projects || []));

  useEffect(() => { load(); }, []);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function login(e) {
    e.preventDefault();
    // verify by attempting a no-op save check via DELETE of a nonexistent slug
    const r = await fetch('/api/projects', {
      method: 'DELETE', headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: '__auth_check__' }),
    });
    if (r.ok) { setAuthed(true); setMsg(''); } else setMsg('Wrong password.');
  }

  async function saveProject(e) {
    e.preventDefault();
    const r = await fetch('/api/projects', {
      method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(fromForm(form)),
    });
    const d = await r.json();
    setMsg(r.ok ? `Saved "${form.title}" ✓` : d.error);
    if (r.ok) { setForm(EMPTY); load(); }
  }

  async function remove(slug) {
    if (!confirm(`Delete ${slug}?`)) return;
    await fetch('/api/projects', {
      method: 'DELETE', headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    });
    setMsg(`Deleted ${slug}`); load();
  }

  async function uploadResume(e) {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    const r = await fetch('/api/resume', { method: 'POST', headers, body: fd });
    setMsg(r.ok ? 'Resume updated ✓' : 'Resume upload failed');
  }

  async function uploadThumb(e) {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    const r = await fetch('/api/upload', { method: 'POST', headers, body: fd });
    const d = await r.json();
    if (r.ok) { setForm((f) => ({ ...f, thumbnail: d.url })); setMsg('Thumbnail uploaded ✓'); }
    else setMsg(d.error);
  }

  if (!authed) {
    return (
      <div className="admin">
        <div className="container" style={{ maxWidth: 420 }}>
          <h1>Portfolio Admin</h1>
          <form className="admin-card" onSubmit={login}>
            <label htmlFor="pw">Admin password</label>
            <input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {msg && <p className="notice">{msg}</p>}
            <br />
            <button className="btn-primary" type="submit">Enter</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="container">
        <h1>Portfolio Admin</h1>
        {msg && <p className="notice" role="status">{msg}</p>}

        <div className="admin-card">
          <h2>Resume</h2>
          <label htmlFor="resume">Upload new resume (PDF) — replaces the live one instantly</label>
          <input id="resume" type="file" accept="application/pdf" onChange={uploadResume} />
        </div>

        <div className="admin-card">
          <h2>Projects</h2>
          {projects.map((p) => (
            <div className="admin-project-row" key={p.slug}>
              <span><strong>{p.title}</strong> — {p.category} · {p.code}</span>
              <span style={{ display: 'flex', gap: 8 }}>
                <button className="btn-ghost" onClick={() => setForm(toForm(p))}>Edit</button>
                <button className="danger" onClick={() => remove(p.slug)}>Delete</button>
              </span>
            </div>
          ))}
        </div>

        <form className="admin-card" onSubmit={saveProject}>
          <h2>{projects.some((p) => p.slug === form.slug) ? 'Edit project' : 'Add project'}</h2>
          <div className="admin-row">
            <div><label>Title *</label><input type="text" value={form.title} onChange={set('title')} required /></div>
            <div><label>Slug *</label><input type="text" value={form.slug} onChange={set('slug')} required placeholder="checkout-redesign" /></div>
            <div><label>Code</label><input type="text" value={form.code} onChange={set('code')} placeholder="PRJ-0125" /></div>
          </div>
          <div className="admin-row">
            <div>
              <label>Category</label>
              <select value={form.category} onChange={set('category')}>
                <option>UI Design</option><option>Branding</option><option>Motion</option><option>Research</option>
              </select>
            </div>
            <div><label>Year</label><input type="text" value={form.year} onChange={set('year')} /></div>
            <div><label>Tags (comma separated)</label><input type="text" value={form.tags} onChange={set('tags')} /></div>
          </div>
          <label>Summary (card text)</label>
          <input type="text" value={form.summary} onChange={set('summary')} />
          <label>Thumbnail (image or video) — upload or paste URL</label>
          <input type="file" accept="image/*,video/mp4,video/webm" onChange={uploadThumb} />
          <input type="text" value={form.thumbnail} onChange={set('thumbnail')} placeholder="/uploads/..." />
          <div className="admin-row">
            <div><label>Role</label><input type="text" value={form.role} onChange={set('role')} /></div>
            <div><label>Team</label><input type="text" value={form.team} onChange={set('team')} /></div>
            <div><label>Timeline</label><input type="text" value={form.timeline} onChange={set('timeline')} /></div>
          </div>
          <label>Impact metrics — one per line, format: value | label</label>
          <textarea value={form.metrics} onChange={set('metrics')} />
          <label>User quote (pull quote)</label>
          <input type="text" value={form.quote} onChange={set('quote')} />
          <label>Case study body — use ## for section headings</label>
          <textarea style={{ minHeight: 220 }} value={form.body} onChange={set('body')} />
          <br />
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-primary" type="submit">Save project</button>
            <button className="btn-ghost" type="button" onClick={() => setForm(EMPTY)}>Clear form</button>
          </div>
        </form>
      </div>
    </div>
  );
}
