import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API);

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
