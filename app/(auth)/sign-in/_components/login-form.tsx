/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { demoAccount } from "@/constant/demo-account";
import { signIn } from "@/service/sign-in";
import { ILoginPayload } from "@/types/api-payload/api-payload";
import Link from "next/link";
import { formSchema, FormValues } from "../_schema";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const apiBody: ILoginPayload = {
        email: data.email,
        password: data.password,
      };

      const result = await signIn(apiBody);

      console.log(result);

      if (!result?.ok) {
        toast.error(result?.error || "Something went wrong. Please try again.");
        return;
      }

      window.location.href = `/?t=${Date.now()}`;
    } catch (error: any) {
      console.error("Login Error:", error);
      toast.error(error?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoAccount = async (data: FormValues) => {
    await onSubmit(data);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-sm z-50"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <Label> Email</Label>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <Label> Password</Label>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </button>
                  </div>
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <div className="space-y-3">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
              variant="default"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              className="w-full"
              onClick={() => {
                handleDemoAccount(demoAccount);
              }}
            >
              {isLoading ? "Logging in..." : "Demo Account"}
            </Button>
          </div>
        </form>
      </Form>

      <p className="mt-8 text-center text-[#2D2D2D] text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-[#1E3A8A] hover:underline font-bold"
        >
          Register
        </Link>
      </p>
    </>
  );
}
