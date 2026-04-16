import { NextResponse } from 'next/server';

import { isAdminAuthenticated } from '@/lib/admin-auth';
import { getAdminContentEntries, updateAdminContentEntry } from '@/lib/content-store';

export const runtime = 'nodejs';

export async function GET() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const entries = await getAdminContentEntries();
  return NextResponse.json({ entries });
}

export async function PATCH(request: Request) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null) as { key?: string; value?: string } | null;

  if (!body?.key || typeof body.value !== 'string') {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }

  try {
    const entry = await updateAdminContentEntry({
      key: body.key,
      value: body.value,
    });

    return NextResponse.json({ success: true, entry });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'update_failed' },
      { status: 400 },
    );
  }
}
