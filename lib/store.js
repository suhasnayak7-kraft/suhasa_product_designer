import fs from 'fs';
import path from 'path';

const DATA = path.join(process.cwd(), 'data', 'projects.json');
const UPLOADS = path.join(process.cwd(), 'public', 'uploads');
const RESUME = path.join(process.cwd(), 'data', 'resume.pdf');

export function getProjects() {
  const raw = JSON.parse(fs.readFileSync(DATA, 'utf8'));
  return raw.projects || [];
}

export function getProject(slug) {
  return getProjects().find((p) => p.slug === slug) || null;
}

export function saveProjects(projects) {
  fs.writeFileSync(DATA, JSON.stringify({ projects }, null, 2));
}

export function upsertProject(project) {
  const projects = getProjects();
  const i = projects.findIndex((p) => p.slug === project.slug);
  if (i >= 0) projects[i] = { ...projects[i], ...project };
  else projects.push(project);
  saveProjects(projects);
  return project;
}

export function deleteProject(slug) {
  saveProjects(getProjects().filter((p) => p.slug !== slug));
}

export function saveResume(buffer) {
  fs.mkdirSync(path.dirname(RESUME), { recursive: true });
  fs.writeFileSync(RESUME, buffer);
}

export function getResumePath() {
  return fs.existsSync(RESUME) ? RESUME : null;
}

export function saveUpload(name, buffer) {
  fs.mkdirSync(UPLOADS, { recursive: true });
  const safe = name.replace(/[^a-zA-Z0-9_.-]/g, '_');
  const file = `${Date.now()}-${safe}`;
  fs.writeFileSync(path.join(UPLOADS, file), buffer);
  return `/uploads/${file}`;
}
