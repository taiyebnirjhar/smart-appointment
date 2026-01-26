/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
import { useRegisterUserMutation } from "@/redux/api/auth/auth.api";
import { IRegisterPayload } from "@/types/api-payload/api-payload";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formSchema, FormValues } from "../_schema";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const [registerUser] = useRegisterUserMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      orgName: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const apiBody: IRegisterPayload = {
        email: data.email,
        password: data.password,
        name: data.name,
        orgName: data.orgName,
      };

      const result: any = await registerUser({ data: apiBody });

      console.log(result.data.success);
      if (result.data.success) {
        router.push("/");
      }
    } catch (error: any) {
      console.error("Login Error:", error);
    } finally {
      setIsLoading(false);
    }
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
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <Label>
                  Name <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your name"
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
            name="orgName"
            render={({ field, fieldState }) => (
              <FormItem>
                <Label>
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your company name"
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
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <Label>
                  Email <span className="text-red-500">*</span>
                </Label>
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
                <Label>
                  Password <span className="text-red-500">*</span>
                </Label>
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

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
            variant="default"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </Form>
      <p className="mt-8 text-center text-[#2D2D2D] text-sm">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-[#1E3A8A] hover:underline font-bold"
        >
          Sign In
        </Link>
      </p>
    </>
  );
}
