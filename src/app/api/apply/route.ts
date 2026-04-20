import { NextResponse } from 'next/server';

type ApplicationPayload = {
  name?: string;
  email?: string;
  profile?: string;
  background?: string;
  motivation?: string;
  links?: string;
  company?: string;
};

const contactEmail = process.env.CONTACT_TO_EMAIL ?? 'baowen435@gmail.com';
const fromEmail = process.env.CONTACT_FROM_EMAIL ?? 'JCIE Applications <onboarding@resend.dev>';

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function renderText(payload: Required<Omit<ApplicationPayload, 'company'>>) {
  return [
    'New JCIE application',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Profile: ${payload.profile || 'N/A'}`,
    '',
    'What have you done?',
    payload.background,
    '',
    'Why do you want to join JCIE?',
    payload.motivation,
    '',
    `Links: ${payload.links || 'N/A'}`,
  ].join('\n');
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderHtml(payload: Required<Omit<ApplicationPayload, 'company'>>) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h1>New JCIE application</h1>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Profile:</strong> ${escapeHtml(payload.profile || 'N/A')}</p>
      <h2>What have you done?</h2>
      <p>${escapeHtml(payload.background).replaceAll('\n', '<br />')}</p>
      <h2>Why do you want to join JCIE?</h2>
      <p>${escapeHtml(payload.motivation).replaceAll('\n', '<br />')}</p>
      <p><strong>Links:</strong> ${escapeHtml(payload.links || 'N/A')}</p>
    </div>
  `;
}

export async function POST(request: Request) {
  const body = (await request.json()) as ApplicationPayload;

  if (clean(body.company)) {
    return NextResponse.json({ message: 'Submission received.' });
  }

  const payload = {
    name: clean(body.name),
    email: clean(body.email),
    profile: clean(body.profile),
    background: clean(body.background),
    motivation: clean(body.motivation),
    links: clean(body.links),
  };

  if (!payload.name || !payload.email || !payload.background || !payload.motivation) {
    return NextResponse.json({ message: 'Please fill in name, email, background and motivation.' }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      {
        message:
          'The application form is not fully configured yet. Please email baowen435@gmail.com directly for now.',
      },
      { status: 503 },
    );
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [contactEmail],
      subject: `【Join JCIE】${payload.name}`,
      text: renderText(payload),
      html: renderHtml(payload),
      reply_to: payload.email,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: 'Email delivery failed. Please email baowen435@gmail.com directly for now.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: 'Application submitted. Thank you!' });
}
