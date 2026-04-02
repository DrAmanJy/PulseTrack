'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// 🛡️ Importing your specific Field components!
import FormField from '@/components/FormField';
import { Field, FieldGroup } from '@/components/ui/field';
import { resetPasswordSchema } from '@pulsetrack/validations';

export default function ResetPasswordPage() {
  const router = useRouter();

  // Grab the ?token=... from the URL
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  // Initialize React Hook Form
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    console.log('🚀 Sending to Express:', {
      newPassword: data.password,
      resetToken: token,
    });

    // On success:
    router.replace('/');
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Set new password</CardTitle>
              <CardDescription>
                Your new password must be different from previously used passwords.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                  <FormField
                    control={control}
                    label="New Password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                  />

                  <FormField
                    control={control}
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                  />

                  <Field className="pt-2">
                    <Button type="submit" className="w-full">
                      Reset Password
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
