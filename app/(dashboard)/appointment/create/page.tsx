"use client";

import FormCardHeaderWithReset from "@/components/shared/card-header-with-reset/card-header-with-reset";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateAppointmentMutation } from "@/redux/api/appointment/appointment.api";
import { useGetServicesQuery } from "@/redux/api/service/service.api";
import { useGetStaffsQuery } from "@/redux/api/staff/staff.api";
import { IAppointment } from "@/types/api-response/api-response";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { HeaderBar } from "../../_components/header-bar/header-bar";
import { formSchema, FormValues } from "../_components/_schema";
import FormComponent from "../_components/form-component/form-component";

export default function CreateStaffPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const [create] = useCreateAppointmentMutation();
  const { data: servicesData } = useGetServicesQuery({});
  const { data: staffsData } = useGetStaffsQuery({});

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
      const response = await create({ data: payload }).unwrap();

      if (response?.success) {
        router.push("/appointment");
      } else {
        console.log(response?.error?.message);
        throw new Error(response?.error?.message || "Something went wrong.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <HeaderBar
        breadcrumbs={[
          { name: "Appointment", href: "/appointment" },
          { name: "Create Appointment" },
        ]}
      />

      <div className="p-4 pt-0">
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
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
