import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Button,
} from '@react-email/components';
import * as React from 'react';

export default function ResetPasswordEmail({ userName = '{{USER_NAME}}' }) {
  return (
    <Html>
      <Head />
      <Preview>Reset your PulseTrack password</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: {
                  50: '#ECFEFF',
                  100: '#CFFAFE',
                  500: '#06B6D4',
                  600: '#0891B2',
                },
                slate: {
                  100: '#F1F5F9',
                  500: '#64748B',
                  600: '#475569',
                  700: '#334155',
                  800: '#1E293B',
                },
              },
            },
          },
        }}
      >
        <Body className="bg-brand-50 font-sans my-auto mx-auto px-2">
          <Container className="border border-solid border-slate-100 rounded-[20px] my-[40px] mx-auto p-[30px] max-w-[465px] bg-white shadow-sm">
            <Section className="mt-[16px] text-center">
              <Heading className="text-slate-800 text-[26px] font-bold p-0 my-0 flex items-center justify-center gap-2">
                <span className="text-brand-500 text-[30px]">♥</span> PulseTrack
              </Heading>
            </Section>
            <Section className="mt-[30px] mb-[20px]">
              <Heading className="text-slate-700 text-[20px] font-semibold m-0 text-center">
                Password Reset Request
              </Heading>
            </Section>
            <Text className="text-slate-600 text-[14px] leading-[22px]">Hi {userName},</Text>
            <Text className="text-slate-600 text-[14px] leading-[22px]">
              Someone recently requested a password change for your PulseTrack account. If this was
              you, you can set a new password by clicking the button below:
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-brand-500 rounded text-white text-[14px] font-semibold no-underline text-center px-6 py-3"
                href="{{RESET_LINK}}"
              >
                Reset Password
              </Button>
            </Section>

            <Text className="text-slate-600 text-[14px] leading-[22px]">
              If you don't want to change your password or didn't request this, just ignore and
              delete this message.
            </Text>
            <Section className="mt-[40px] pt-[20px] border-t border-solid border-slate-100 text-center">
              <Text className="text-slate-500 text-[12px] leading-[20px] m-0">
                PulseTrack Inc., 123 Analytics Way, San Francisco, CA
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
