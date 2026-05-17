'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field';
import FormField from '@/components/FormField';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@pulsetrack/validations';
import AuthLayout from '@/components/AuthLayout';
import { FadeIn, SlideTransition } from '@/components/MotionWrapper';
import { AnimatePresence } from 'framer-motion';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  
  const { control: signupControl, handleSubmit: handleSignupSubmit, trigger } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const { control: otpControl, handleSubmit: handleOtpSubmit } = useForm({
    defaultValues: { otp: '' },
  });

  const onSignupSubmit = async (data) => {
    const isValid = await trigger();
    if (isValid) {
      console.log('Signup Data:', data);
      // Simulate API call delay then change step
      setTimeout(() => setStep(2), 500); 
    }
  };

  const onVerifySubmit = (data) => {
    console.log('🚀 Sending OTP to Express API:', data);
    // Proceed to dashboard or onboarding
  };

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <SlideTransition stepKey="signup">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader>
                <FadeIn delay={0.1}>
                  <CardTitle className="text-2xl font-semibold tracking-tight">Create an account</CardTitle>
                  <CardDescription>Enter your information below to create your account</CardDescription>
                </FadeIn>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignupSubmit(onSignupSubmit)}>
                  <FieldGroup>
                    <FadeIn delay={0.2}>
                      <FormField
                        control={signupControl}
                        name="name"
                        label="Full Name"
                        type="text"
                        placeholder="John Doe"
                      />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                      <FormField
                        control={signupControl}
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="m@example.com"
                      />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                      <FormField
                        control={signupControl}
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="********"
                      />
                    </FadeIn>

                    <FadeIn delay={0.5}>
                      <FieldGroup>
                        <Field className="pt-2">
                          <Button type="submit" className="w-full transition-all hover:scale-[1.02]">Create Account</Button>
                          <Button variant="outline" type="button" className="w-full bg-background/50 backdrop-blur-sm transition-all hover:scale-[1.02] hover:bg-background/80">
                            Sign up with Google
                          </Button>
                          <FieldDescription className="px-6 pt-2 text-center">
                            Already have an account? <Link href="/signin" className="text-primary transition-colors hover:text-primary/80 hover:underline">Sign in</Link>
                          </FieldDescription>
                        </Field>
                      </FieldGroup>
                    </FadeIn>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
          </SlideTransition>
        )}

        {step === 2 && (
          <SlideTransition stepKey="verify">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="text-center">
                <FadeIn delay={0.1}>
                  <CardTitle className="text-2xl font-semibold tracking-tight">Verify your account</CardTitle>
                  <CardDescription>
                    We sent a 6-digit verification code to your email. Enter it below to continue.
                  </CardDescription>
                </FadeIn>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleOtpSubmit(onVerifySubmit)} className="space-y-6">
                  <FieldGroup>
                    <FadeIn delay={0.2}>
                      <div className="flex justify-center py-4">
                        <Controller
                          control={otpControl}
                          name="otp"
                          render={({ field }) => (
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup>
                                <InputOTPSlot index={0} className="bg-background/50 backdrop-blur-sm" />
                                <InputOTPSlot index={1} className="bg-background/50 backdrop-blur-sm" />
                                <InputOTPSlot index={2} className="bg-background/50 backdrop-blur-sm" />
                                <InputOTPSlot index={3} className="bg-background/50 backdrop-blur-sm" />
                                <InputOTPSlot index={4} className="bg-background/50 backdrop-blur-sm" />
                                <InputOTPSlot index={5} className="bg-background/50 backdrop-blur-sm" />
                              </InputOTPGroup>
                            </InputOTP>
                          )}
                        />
                      </div>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                      <Field className="flex flex-col gap-2 pt-2">
                        <Button type="submit" className="w-full transition-all hover:scale-[1.02]">
                          Verify Account
                        </Button>
                        <Button variant="outline" type="button" className="w-full bg-background/50 backdrop-blur-sm transition-all hover:scale-[1.02] hover:bg-background/80" onClick={() => setStep(1)}>
                          Back to Sign up
                        </Button>
                      </Field>
                    </FadeIn>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
          </SlideTransition>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
