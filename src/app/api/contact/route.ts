import { NextResponse } from 'next/server';

import { getContactDestinationEmail, parseContactRequest, validateContactRequest } from '@/lib/contact-request';

export async function POST(request: Request) {
  const payload = parseContactRequest(await request.json());
  const destinationEmail = getContactDestinationEmail();
  const successMessage = 'Votre demande a bien été envoyée. Nous vous répondrons rapidement.';

  if (payload.company) {
    return NextResponse.json({ success: true, message: successMessage });
  }

  const validation = validateContactRequest(payload);

  if (!validation.valid) {
    return NextResponse.json(
      { success: false, error: validation.error, message: 'Merci de vérifier les champs obligatoires et votre adresse e-mail.' },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const senderEmail = process.env.CONTACT_FORM_FROM?.trim() || 'La Bergerie & La Brassine <onboarding@resend.dev>';

  if (!resendApiKey) {
    return NextResponse.json(
      { success: false, error: 'not_configured', message: 'Une erreur est survenue lors de l’envoi.' },
      { status: 503 },
    );
  }

  const subject = `[Demande de réservation] ${payload.firstName} ${payload.lastName}`.trim();
  const text = [
    `Prénom: ${payload.firstName || '-'}`,
    `Nom: ${payload.lastName || '-'}`,
    `Adresse e-mail: ${payload.email || '-'}`,
    `Téléphone: ${payload.phone || '-'}`,
    `Dates souhaitées: ${payload.dates || '-'}`,
    `Gîte souhaité: ${payload.gite || '-'}`,
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
        success: false,
        error: 'send_failed',
        message: 'Une erreur est survenue lors de l’envoi.',
        details: resendError,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, message: successMessage });
}
