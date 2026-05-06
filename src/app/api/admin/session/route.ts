import { NextResponse } from 'next/server';

import { clearAdminSessionCookie, setAdminSessionCookie, verifyAdminPassword } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { password?: string } | null;

  if (!body?.password || !verifyAdminPassword(body.password)) {
    return NextResponse.json({ error: 'invalid_credentials' }, { status: 401 });
  }

  await setAdminSessionCookie();

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  await clearAdminSessionCookie();
  return NextResponse.json({ success: true });
}
