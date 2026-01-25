/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVICE_DURATION_OPTIONS } from "@/constant/service-duration.constant";
import { STAFF_TYPES } from "@/constant/staff-types.constant";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

interface FormComponentProps {
  form: UseFormReturn<
    {
      name: string;
      requiredStaffType: string;
      durationMinutes: number;
    },
    any,
    {
      name: string;
      requiredStaffType: string;
      durationMinutes: number;
    }
  >;
  onSubmit: (data: any) => void;

  isLoading: boolean;
}

export default function FormComponent({
  form,
  onSubmit,

  isLoading,
}: FormComponentProps) {
  const router = useRouter();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>
                  Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the name of the staff."
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="requiredStaffType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Required Staff Type <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    key={field.value}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full col-span-2 capitalize">
                      <SelectValue
                        placeholder="Select Staff Type"
                        className="w-full capitalize"
                      />
                    </SelectTrigger>

                    <SelectContent>
                      {STAFF_TYPES.map((item) => (
                        <SelectItem
                          className="capitalize"
                          key={item.value}
                          value={item.value}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="durationMinutes"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>
                  Duration (Minutes) <span className="text-red-500">*</span>
                </FormLabel>

                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={
                      field.value !== undefined
                        ? String(field.value)
                        : undefined
                    }
                    key={field.value}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full col-span-2 capitalize">
                      <SelectValue
                        placeholder="Select Daily Capacity"
                        className="w-full capitalize"
                      />
                    </SelectTrigger>

                    <SelectContent>
                      {SERVICE_DURATION_OPTIONS.map((item) => (
                        <SelectItem
                          className="capitalize"
                          key={item.value}
                          value={String(item.value)}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <CardFooter className="grid grid-cols-2 gap-4 mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
            className="transition-all duration-200 hover:bg-secondary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="min-w-[120px] transition-all duration-200"
          >
            Submit
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
