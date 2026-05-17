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
  Button,
} from '@react-email/components';
import * as React from 'react';

export default function WelcomeEmail({ userName = '{{USER_NAME}}' }) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to PulseTrack, {userName}!</Preview>
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
              <Heading className="text-slate-700 text-[20px] font-semibold m-0">
                Welcome aboard, {userName}!
              </Heading>
            </Section>
            <Text className="text-slate-600 text-[14px] leading-[22px]">
              We're thrilled to have you here. PulseTrack is built to help you stay on top of your
              tasks, manage projects efficiently, and unlock actionable insights to boost your
              productivity.
            </Text>
            <Text className="text-slate-600 text-[14px] leading-[22px] mt-[10px]">
              Here are a few things you can do to get started:
            </Text>
            <Section className="pl-[20px] mb-[20px]">
              <Text className="text-slate-600 text-[14px] leading-[22px] m-0">
                <span className="text-brand-500 font-bold mr-2">•</span> Create your first task or
                project.
              </Text>
              <Text className="text-slate-600 text-[14px] leading-[22px] m-0">
                <span className="text-brand-500 font-bold mr-2">•</span> Customize your dashboard
                views.
              </Text>
              <Text className="text-slate-600 text-[14px] leading-[22px] m-0">
                <span className="text-brand-500 font-bold mr-2">•</span> Invite team members to
                collaborate.
              </Text>
            </Section>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-brand-500 rounded text-white text-[14px] font-semibold no-underline text-center px-6 py-3"
                href="{{DASHBOARD_URL}}"
              >
                Go to Dashboard
              </Button>
            </Section>

            <Text className="text-slate-600 text-[14px] leading-[22px]">
              If you have any questions, our support team is always ready to help.
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
