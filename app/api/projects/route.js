import { getProjects, upsertProject, deleteProject } from '../../../lib/store';
import { isAuthed, unauthorized } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({ projects: getProjects() });
}

export async function POST(req) {
  if (!isAuthed(req)) return unauthorized();
  const project = await req.json();
  if (!project.slug || !project.title) {
    return Response.json({ error: 'slug and title are required' }, { status: 400 });
  }
  project.slug = project.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  upsertProject(project);
  return Response.json({ ok: true, project });
}

export async function DELETE(req) {
  if (!isAuthed(req)) return unauthorized();
  const { slug } = await req.json();
  deleteProject(slug);
  return Response.json({ ok: true });
}
