"use client";

import FormCardHeaderWithReset from "@/components/shared/card-header-with-reset/card-header-with-reset";
import { Card, CardContent } from "@/components/ui/card";
import {
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/service/service.api";
import { IService } from "@/types/api-response/api-response";
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
    defaultValues: {},
  });

  const [update] = useUpdateServiceMutation();
  const { data, isLoading: getSingleServiceLoading } = useGetSingleServiceQuery(
    {
      id: id,
    },
  );

  async function onSubmit(data: FormValues) {
    const payload: Partial<IService> = {
      name: data.name,
      requiredStaffType: data.requiredStaffType,
      durationMinutes: data.durationMinutes,
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
    if (!data?.service) return;

    const cp = data.service;

    form.setValue("name", cp.name || "");
    form.setValue("requiredStaffType", cp.requiredStaffType || "");
    form.setValue("durationMinutes", cp.durationMinutes as number);
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
          isLoading={isLoading || getSingleServiceLoading}
        />
      </CardContent>
    </Card>
  );
}
