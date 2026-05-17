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

export default function TaskReminderEmail({
  userName = '{{USER_NAME}}',
  taskTitle = '{{TASK_TITLE}}',
  dueDate = '{{DUE_DATE}}',
}) {
  return (
    <Html>
      <Head />
      <Preview>PulseTrack Reminder: "{taskTitle}" is due soon!</Preview>
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
                rose: {
                  50: '#fff1f2',
                  500: '#f43f5e',
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
                You have a task due soon!
              </Heading>
            </Section>
            <Text className="text-slate-600 text-[14px] leading-[22px]">Hi {userName},</Text>
            <Text className="text-slate-600 text-[14px] leading-[22px]">
              This is a friendly reminder that you have an upcoming task in your PulseTrack
              workspace.
            </Text>

            <Section className="bg-rose-50 border border-solid border-rose-500 rounded-[12px] my-[24px] p-[20px]">
              <Text className="text-slate-800 text-[16px] font-bold m-0">{taskTitle}</Text>
              <Text className="text-rose-500 text-[14px] font-semibold mt-[8px] mb-0">
                Due: {dueDate}
              </Text>
            </Section>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-brand-500 rounded text-white text-[14px] font-semibold no-underline text-center px-6 py-3"
                href="{{TASK_URL}}"
              >
                View Task
              </Button>
            </Section>

            <Text className="text-slate-600 text-[14px] leading-[22px]">
              Get it done and keep your streak alive! 🚀
            </Text>
            <Section className="mt-[40px] pt-[20px] border-t border-solid border-slate-100 text-center">
              <Text className="text-slate-500 text-[12px] leading-[20px] m-0">
                PulseTrack Inc., 123 Analytics Way, San Francisco, CA
              </Text>
              <Text className="text-slate-500 text-[12px] leading-[20px] mt-[10px] mb-0">
                You can manage your notification preferences in your account settings.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
