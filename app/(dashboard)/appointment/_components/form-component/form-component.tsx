/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DateTimePicker } from "@/components/shared/date-time-picker/date-time-picker";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IService, IStaff } from "@/types/api-response/api-response";
import { useRouter } from "next/navigation";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface FormComponentProps {
  form: UseFormReturn<
    {
      customerName: string;
      serviceId: string;
      startTime: string;
      staffId?: string | null | undefined;
      status?:
        | "SCHEDULED"
        | "IN_PROGRESS"
        | "COMPLETED"
        | "CANCELLED"
        | "NO_SHOW"
        | undefined;
    },
    any,
    {
      customerName: string;
      serviceId: string;
      startTime: string;
      staffId?: string | null | undefined;
      status?:
        | "SCHEDULED"
        | "IN_PROGRESS"
        | "COMPLETED"
        | "CANCELLED"
        | "NO_SHOW"
        | undefined;
    }
  >;
  onSubmit: (data: any) => void;

  isLoading: boolean;
  services: Partial<IService>[];
  staffs: Partial<IStaff>[];
}

export default function FormComponent({
  form,
  onSubmit,
  isLoading,
  services = [],
  staffs = [],
}: FormComponentProps) {
  const router = useRouter();

  // Get selected service and staff values
  const selectedServiceId = form.watch("serviceId");
  const selectedStaffId = form.watch("staffId");

  const selectedService = services.find((s) => s._id === selectedServiceId);
  const selectedStaff = staffs.find((s) => s._id === selectedStaffId);

  // Filter staff based on selected service
  const filteredStaffs = selectedService
    ? staffs.filter((s) => s.staffType === selectedService.requiredStaffType)
    : staffs;

  // Reset staff if it doesn't match service
  React.useEffect(() => {
    if (
      selectedServiceId &&
      selectedStaffId &&
      selectedStaff?.staffType !== selectedService?.requiredStaffType
    ) {
      form.setValue("staffId", null);
    }
  }, [
    selectedServiceId,
    selectedStaffId,
    selectedStaff,
    selectedService,
    form,
  ]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>
                  Customer Name <span className="text-red-500">*</span>
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
            name="serviceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Service <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    key={field.value}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full col-span-2 capitalize">
                      <SelectValue
                        placeholder="Select Service"
                        className="w-full capitalize"
                      />
                    </SelectTrigger>

                    <SelectContent>
                      {services.map((item) => (
                        <SelectItem
                          className="capitalize"
                          key={item._id}
                          value={item._id ?? ""}
                        >
                          {item.name}
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
            name="staffId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Staff <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? ""}
                    key={field.value}
                    disabled={isLoading || !selectedServiceId}
                  >
                    <SelectTrigger className="w-full col-span-2 capitalize">
                      <SelectValue
                        placeholder="Select Staff"
                        className="w-full capitalize"
                      />
                    </SelectTrigger>

                    <SelectContent>
                      {filteredStaffs.map((staff) => (
                        <SelectItem
                          className="capitalize"
                          key={staff._id}
                          value={staff._id ?? ""}
                        >
                          {staff.name}
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
            name="startTime"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>
                  Start Time <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <DateTimePicker
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(date) => field.onChange(date.toISOString())}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
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
