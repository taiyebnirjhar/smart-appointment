/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { WaitingListAlert } from "@/components/shared/alert/waiting-list-alert";
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
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { formSchema, FormValues } from "../../../_components/_schema";
import FormComponent from "../../../_components/form-component/form-component";

export default function PageContainer({ id }: { id: string }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [openQueueModal, setOpenQueueModal] = React.useState(false);
  const router = useRouter();

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
      const response: any = await update({
        id,
        data: payload,
      }).unwrap();

      if (response?.success) {
        router.back();
      } else {
        const rawMessage = response?.error?.message;

        if (rawMessage) {
          const [code, context] = rawMessage.split(",");

          if (code === "DAILY_CAPACITY_EXCEEDED") {
            setOpenQueueModal(true);
          }
        }

        throw new Error(rawMessage || "Something went wrong.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSentToWaitingList() {
    const payload: Partial<IAppointment> = {
      customerName: form.getValues("customerName"),
      staffId: null,
      serviceId: form.getValues("serviceId"),
      startTime: form.getValues("startTime"),
      status: form.getValues("status"),
    };

    try {
      const response: any = await update({
        id,
        data: payload,
      }).unwrap();

      if (response?.success) {
        router.push("/waiting-list");
      } else {
        const rawMessage = response?.error?.message;

        throw new Error(rawMessage || "Something went wrong.");
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setOpenQueueModal(false);
    }
  }

  //697710c28682c3f73ecfafe1
  //6975037c170c9b5bdcdedbf0
  useEffect(() => {
    if (!data?.appointment || !servicesData?.services || !staffsData?.staffs)
      return;

    const cp = data.appointment;

    form.reset({
      customerName: cp.customerName || "",
      staffId: cp.staffId || "",
      serviceId: cp.serviceId || "",
      startTime: cp.startTime || "",
      status: cp.status || "SCHEDULED",
    });
  }, [data, form, servicesData?.services, staffsData?.staffs]);

  console.log("servicesData", servicesData);
  console.log("staffsData", staffsData);
  console.log("data", data);

  return (
    <>
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
      <WaitingListAlert
        open={openQueueModal}
        setOpen={setOpenQueueModal}
        onChooseAnother={() => {
          setOpenQueueModal(false);
        }}
        onAddToWaitingList={handleSentToWaitingList}
      />
    </>
  );
}
