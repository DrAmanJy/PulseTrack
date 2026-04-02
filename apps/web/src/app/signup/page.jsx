'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import FormField from '@/components/FormField';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@pulsetrack/validations';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  });
  const router = useRouter();
  const onSubmit = (data) => {
    console.log(data);
    router.push('/verify');
  };
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Enter your information below to create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <FormField
                  control={control}
                  name="name"
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                />
                <FormField
                  control={control}
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="m@example.com"
                />
                <FormField
                  control={control}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="********"
                />

                <FieldGroup>
                  <Field>
                    <Button type="submit">Create Account</Button>
                    <Button variant="outline" type="button">
                      Sign up with Google
                    </Button>
                    <FieldDescription className="px-6 text-center">
                      Already have an account? <Link href="/signin">Sign in</Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
