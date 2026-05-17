'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import FormField from '@/components/FormField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@pulsetrack/validations';
import Link from 'next/link';
import AuthLayout from '@/components/AuthLayout';
import { FadeIn } from '@/components/MotionWrapper';

export default function SigninPage({}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <AuthLayout>
      <Card className="border-none bg-transparent shadow-none">
        <CardHeader>
          <FadeIn delay={0.1}>
            <CardTitle className="text-2xl font-semibold tracking-tight">Login to your account</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
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
                  placeholder="m@example.com"
                />
              </FadeIn>

              <FadeIn delay={0.3}>
                <Field data-invalid={Boolean(errors?.password)}>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">
                      {errors?.password ? errors?.password?.message : 'Password'}
                    </FieldLabel>
                    <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm text-foreground/80 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    className="bg-background/50 backdrop-blur-sm"
                    {...register('password')}
                  />
                </Field>
              </FadeIn>
              <FadeIn delay={0.4}>
                <Field className="pt-2">
                  <Button type="submit" className="w-full transition-all hover:scale-[1.02]">Login</Button>
                  <Button variant="outline" type="button" className="w-full bg-background/50 backdrop-blur-sm transition-all hover:scale-[1.02] hover:bg-background/80">
                    Login with Google
                  </Button>
                  <FieldDescription className="pt-2 text-center">
                    Don&apos;t have an account? <Link href="/signup" className="text-primary transition-colors hover:text-primary/80 hover:underline">Sign up</Link>
                  </FieldDescription>
                </Field>
              </FadeIn>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
