import { Resend } from 'resend';
import { env } from '../../config/env';

const resend = new Resend(env.RESEND_API_KEY);

export const sendEmail = async (to, subject, html) => {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject,
    html,
  });

  if (error) {
    console.error('Resend API Error:', error);
    throw new AppError(
      'Failed to send verification email. Please try again.',
      500,
    );
  }

  return data;
};
