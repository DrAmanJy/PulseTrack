'use client';
import FormField from '@/components/FormField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailOnlySchema } from '@pulsetrack/validations';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

const page = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailOnlySchema),
    defaultValues: { email: '', password: '' },
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn('flex flex-col gap-6')}>
          <Card>
            <CardHeader>
              <CardTitle>Reset your password</CardTitle>
              <CardDescription>
                Enter your email address and a reset link will be sent to your inbox.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                  <FormField
                    control={control}
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="developer@example.com"
                  />

                  <Field className="flex flex-col gap-2 pt-2">
                    {/* Primary action */}
                    <Button type="submit" className="w-full">
                      Send Reset Link
                    </Button>

                    {/* Secondary action (Routing back to sign in) */}
                    <Button variant="outline" type="button" className="w-full" asChild>
                      <Link href="/signin">Back to Login</Link>
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
};

export default page;
