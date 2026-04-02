'use client';

import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Field, FieldGroup } from '@/components/ui/field';

export default function VerifyAccountPage() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = (data) => {
    console.log('🚀 Sending OTP to Express API:', data);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Verify your account</CardTitle>
              <CardDescription>
                We sent a 6-digit verification code to your email. Enter it below to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FieldGroup>
                  <div className="flex justify-center">
                    <Controller
                      control={control}
                      name="otp"
                      render={({ field }) => (
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      )}
                    />
                  </div>
                  <Field className="flex flex-col gap-2 pt-2">
                    {/* Primary action */}
                    <Button type="submit" className="w-full">
                      Verify Account
                    </Button>

                    {/* Secondary action (Routing back to sign in) */}
                    <Button variant="outline" type="button" className="w-full">
                      Didn`&apos;`t receive a code? Resend
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
