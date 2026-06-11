import fs from 'fs';
import { getResumePath, saveResume } from '../../../lib/store';
import { isAuthed, unauthorized } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const path = getResumePath();
  if (!path) return new Response('Resume not uploaded yet', { status: 404 });
  return new Response(fs.readFileSync(path), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="Suhasa-Nayak-Resume.pdf"',
    },
  });
}

export async function POST(req) {
  if (!isAuthed(req)) return unauthorized();
  const form = await req.formData();
  const file = form.get('file');
  if (!file || file.type !== 'application/pdf') {
    return Response.json({ error: 'A PDF file is required' }, { status: 400 });
  }
  saveResume(Buffer.from(await file.arrayBuffer()));
  return Response.json({ ok: true });
}
