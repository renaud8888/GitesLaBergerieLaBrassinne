import { NextResponse } from 'next/server';

import { getContactDestinationEmail, parseContactRequest, validateContactRequest } from '@/lib/contact-request';

export async function POST(request: Request) {
  const payload = parseContactRequest(await request.json());
  const destinationEmail = getContactDestinationEmail();

  if (payload.company) {
    return NextResponse.json({ ok: true, destinationEmail });
  }

  const validation = validateContactRequest(payload);

  if (!validation.valid) {
    return NextResponse.json(
      { ok: false, error: validation.error, destinationEmail },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const senderEmail = process.env.CONTACT_FORM_FROM?.trim() || 'La Bergerie & La Brassine <onboarding@resend.dev>';

  if (!resendApiKey) {
    return NextResponse.json(
      { ok: false, error: 'not_configured', destinationEmail },
      { status: 503 },
    );
  }

  const subject = `[Demande de reservation] ${payload.firstName} ${payload.lastName}`.trim();
  const text = [
    `Prenom: ${payload.firstName || '-'}`,
    `Nom: ${payload.lastName || '-'}`,
    `Email: ${payload.email || '-'}`,
    `Telephone: ${payload.phone || '-'}`,
    `Dates: ${payload.dates || '-'}`,
    `Gite: ${payload.gite || '-'}`,
    `Voyageurs: ${payload.guests || '-'}`,
    '',
    'Message:',
    payload.message || '-',
  ].join('\n');

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: senderEmail,
      to: [destinationEmail],
      reply_to: payload.email,
      subject,
      text,
    }),
  });

  if (!resendResponse.ok) {
    const resendError = await resendResponse.text();

    return NextResponse.json(
      {
        ok: false,
        error: 'send_failed',
        destinationEmail,
        details: resendError,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, destinationEmail });
}
