"use client";

import FormCardHeaderWithReset from "@/components/shared/card-header-with-reset/card-header-with-reset";
import { Card, CardContent } from "@/components/ui/card";
import {
  useGetSingleStaffQuery,
  useUpdateStaffMutation,
} from "@/redux/api/staff/staff.api";
import { IStaff } from "@/types/api-response/api-response";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { formSchema, FormValues } from "../../../_components/_schema";
import FormComponent from "../../../_components/form-component/form-component";

export default function PageContainer({ id }: { id: string }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dailyCapacity: 30,
    },
  });

  const [update] = useUpdateStaffMutation();
  const { data, isLoading: getSingleStaffLoading } = useGetSingleStaffQuery({
    id: id,
  });

  async function onSubmit(data: FormValues) {
    const payload: Partial<IStaff> = {
      name: data.name,
      staffType: data.staffType,
      dailyCapacity: data.dailyCapacity,
      availabilityStatus: data.availabilityStatus,
    };

    setIsLoading(true);

    try {
      const result = await update({
        id,
        data: payload,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!data?.staff) return;

    const cp = data.staff;

    form.setValue("name", cp.name || "");
    form.setValue("staffType", cp.staffType || "");
    form.setValue("dailyCapacity", cp.dailyCapacity as number);
    form.setValue(
      "availabilityStatus",
      cp.availabilityStatus as "AVAILABLE" | "ON_LEAVE",
    );
  }, [data, form]);

  return (
    <Card>
      <FormCardHeaderWithReset
        title={"Staff Details"}
        showResetButton={false}
      />
      <CardContent>
        <FormComponent
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading || getSingleStaffLoading}
        />
      </CardContent>
    </Card>
  );
}
