'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FormField from '@/components/FormField';
import { Field, FieldGroup } from '@/components/ui/field';
import { resetPasswordSchema } from '@pulsetrack/validations';
import AuthLayout from '@/components/AuthLayout';
import { FadeIn } from '@/components/MotionWrapper';
import { Suspense } from 'react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (data) => {
    console.log('🚀 Sending to Express:', { newPassword: data.password, resetToken: token });
    router.replace('/');
  };

  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardHeader className="text-center">
        <FadeIn delay={0.1}>
          <CardTitle className="text-2xl font-semibold tracking-tight">Set new password</CardTitle>
          <CardDescription>
            Your new password must be different from previously used passwords.
          </CardDescription>
        </FadeIn>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FadeIn delay={0.2}>
              <FormField
                control={control}
                label="New Password"
                name="password"
                type="password"
                placeholder="••••••••"
              />
            </FadeIn>

            <FadeIn delay={0.3}>
              <FormField
                control={control}
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
              />
            </FadeIn>

            <FadeIn delay={0.4}>
              <Field className="pt-2">
                <Button type="submit" className="w-full transition-all hover:scale-[1.02]">
                  Reset Password
                </Button>
              </Field>
            </FadeIn>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="h-48 w-full animate-pulse rounded-xl bg-muted/20" />}>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
