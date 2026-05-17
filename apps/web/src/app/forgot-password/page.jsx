'use client';
import FormField from '@/components/FormField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailOnlySchema } from '@pulsetrack/validations';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import AuthLayout from '@/components/AuthLayout';
import { FadeIn } from '@/components/MotionWrapper';

const ForgotPasswordPage = () => {
  const {
    control,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(emailOnlySchema),
    defaultValues: { email: '' },
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <AuthLayout>
      <Card className="border-none bg-transparent shadow-none">
        <CardHeader>
          <FadeIn delay={0.1}>
            <CardTitle className="text-2xl font-semibold tracking-tight">Reset your password</CardTitle>
            <CardDescription>
              Enter your email address and a reset link will be sent to your inbox.
            </CardDescription>
          </FadeIn>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <FadeIn delay={0.2}>
                <FormField
                  control={control}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="developer@example.com"
                />
              </FadeIn>

              <FadeIn delay={0.3}>
                <Field className="flex flex-col gap-2 pt-2">
                  <Button type="submit" className="w-full transition-all hover:scale-[1.02]">
                    Send Reset Link
                  </Button>
                  <Button variant="outline" type="button" className="w-full bg-background/50 backdrop-blur-sm transition-all hover:scale-[1.02] hover:bg-background/80" asChild>
                    <Link href="/signin">Back to Login</Link>
                  </Button>
                </Field>
              </FadeIn>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
