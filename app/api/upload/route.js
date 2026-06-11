import { saveUpload } from '../../../lib/store';
import { isAuthed, unauthorized } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  if (!isAuthed(req)) return unauthorized();
  const form = await req.formData();
  const file = form.get('file');
  if (!file) return Response.json({ error: 'file required' }, { status: 400 });
  const ok = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'video/mp4', 'video/webm'];
  if (!ok.includes(file.type)) {
    return Response.json({ error: 'Unsupported file type' }, { status: 400 });
  }
  const url = saveUpload(file.name, Buffer.from(await file.arrayBuffer()));
  return Response.json({ ok: true, url });
}
