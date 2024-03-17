import { AmazonReviewEmail } from '@/components/shared/email-template';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { data } = await req.json();
  const { email } = data;
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Hello world',
      react: AmazonReviewEmail({})
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
