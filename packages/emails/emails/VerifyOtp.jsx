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
  Link,
  Img,
} from '@react-email/components';
import * as React from 'react';

// Use this for the logo image later when you host your images
// const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';

export default function VerifyOtpEmailAwesome({ validationCode = '{{OTP_CODE}}' }) {
  return (
    <Html>
      <Head />
      <Preview>PulseTrack: Almost There! Verify your email with code {validationCode}</Preview>
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
              {/* Replace with your logo image or text-based logo */}
              {/* <Img src={`${baseUrl}/static/pulsetrack-logo.png`} width="180" height="40" alt="PulseTrack" className="mx-auto" /> */}
              <Heading className="text-slate-800 text-[26px] font-bold p-0 my-0 flex items-center justify-center gap-2">
                <span className="text-brand-500 text-[30px]">♥</span> PulseTrack
              </Heading>
            </Section>
            <Section className="mt-[30px] mb-[20px] text-center">
              <Heading className="text-slate-700 text-[20px] font-semibold m-0">
                Almost There!
              </Heading>
            </Section>
            <Text className="text-slate-600 text-[14px] leading-[22px]">
              Thank you for choosing PulseTrack. To unlock your activity insights, please verify
              your email with the code below:
            </Text>
            <Section className="bg-brand-50 border border-solid border-brand-100 rounded-[12px] my-[24px] py-[25px] text-center">
              <Text className="text-[36px] font-bold tracking-[12px] text-slate-800 m-0">
                {validationCode}
              </Text>
            </Section>
            <Text className="text-slate-600 text-[14px] leading-[22px]">
              Enter this code on the verification screen. It expires in{' '}
              <strong className="text-slate-700">10 minutes</strong> (at 14:10 PM UTC).
            </Text>
            <Section className="mt-[40px] pt-[20px] border-t border-solid border-slate-100 text-center">
              <Text className="text-slate-500 text-[12px] leading-[20px] m-0">
                PulseTrack Inc., 123 Analytics Way, San Francisco, CA
              </Text>
              <Text className="text-slate-500 text-[12px] leading-[20px] mt-[10px] mb-0">
                Didn't request this? You can safely ignore this email; your account security is
                uncompromised.
              </Text>
              {/* If you add dynamic links or a custom domain, you can use Link */}
              {/* <Link href="https://pulsetrack.com/support" className="text-brand-600 underline">Contact Support</Link> */}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
