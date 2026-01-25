"use client";

import FormCardHeaderWithReset from "@/components/shared/card-header-with-reset/card-header-with-reset";
import { Card, CardContent } from "@/components/ui/card";
import {
  useGetSingleAppointmentQuery,
  useUpdateAppointmentMutation,
} from "@/redux/api/appointment/appointment.api";
import { useGetServicesQuery } from "@/redux/api/service/service.api";
import { useGetStaffsQuery } from "@/redux/api/staff/staff.api";
import { IAppointment } from "@/types/api-response/api-response";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { formSchema, FormValues } from "../../../_components/_schema";
import FormComponent from "../../../_components/form-component/form-component";

export default function PageContainer({ id }: { id: string }) {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const [update] = useUpdateAppointmentMutation();
  const { data: servicesData } = useGetServicesQuery({});
  const { data: staffsData } = useGetStaffsQuery({});
  const { data, isLoading: getSingleAppointmentLoading } =
    useGetSingleAppointmentQuery({ id });

  async function onSubmit(data: FormValues) {
    const payload: Partial<IAppointment> = {
      customerName: data.customerName,
      staffId: data.staffId,
      serviceId: data.serviceId,
      startTime: data.startTime,
      status: data.status,
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
    if (!data?.appointment) return;

    const cp = data.appointment;

    form.setValue("customerName", cp.customerName || "");
    form.setValue("staffId", cp.staffId || "");
    form.setValue("serviceId", cp.serviceId || "");
    form.setValue("startTime", cp.startTime || "");
    form.setValue("status", cp.status || "");
  }, [data, form]);

  return (
    <Card>
      <FormCardHeaderWithReset
        title={"Appointment Details"}
        showResetButton={false}
      />
      <CardContent>
        <FormComponent
          form={form}
          services={servicesData?.services ?? []}
          staffs={staffsData?.staffs ?? []}
          onSubmit={onSubmit}
          isLoading={isLoading || getSingleAppointmentLoading}
        />
      </CardContent>
    </Card>
  );
}
