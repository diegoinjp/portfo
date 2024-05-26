'use strict';
import type { APIRoute } from 'astro';
import { MailtrapClient } from 'mailtrap';

export const POST: APIRoute = async ({ request }): Promise<Response> => {
  const data = await request.formData();

  // Check if data is undefined
  if (!data) {
    return new Response(
      JSON.stringify({
        message: 'Missing required fields',
      }),
      { status: 400 }
    );
  }

  const subject = data.get('subject');
  const message = data.get('message');
  const email = data.get('email');
  const client = new MailtrapClient({ token: import.meta.env.SECRET_TOKEN });

  if (!subject || !message) {
    return new Response(
      JSON.stringify({
        message: 'Missing required fields',
      }),
      { status: 400 }
    );
  }

  const text = `From: ${email}\n\n${message}`;

  await client.send({
    from: { email: 'info@demomailtrap.com' },
    to: [{ email: 'diego.vpda@gmail.com' }],
    subject: 'Notification: ' + subject,
    text,
  });

  return new Response(
    JSON.stringify({
      message: 'Email sent!',
    }),
    { status: 200 }
  );
};
