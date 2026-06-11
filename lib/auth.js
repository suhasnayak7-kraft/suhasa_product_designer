export function isAuthed(req) {
  const password = process.env.ADMIN_PASSWORD || 'change-me';
  return req.headers.get('x-admin-password') === password;
}

export const unauthorized = () =>
  Response.json({ error: 'Unauthorized' }, { status: 401 });
