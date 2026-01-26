"use client";

import FormCardHeaderWithReset from "@/components/shared/card-header-with-reset/card-header-with-reset";
import { Card, CardContent } from "@/components/ui/card";
import { useFormAutosave } from "@/hooks/use-form-autosave";
import { useCreateServiceMutation } from "@/redux/api/service/service.api";
import { IService } from "@/types/api-response/api-response";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { HeaderBar } from "../../_components/header-bar/header-bar";
import { formSchema, FormValues } from "../_components/_schema";
import FormComponent from "../_components/form-component/form-component";

export default function CreateServicePage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // Use the autosave hook
  const { clearSavedData } = useFormAutosave({
    form,
    key: "service-form-draft",
    debounceMs: 1000,
  });

  const [create] = useCreateServiceMutation();

  const handleReset = () => {
    // Clear saved data from storage
    clearSavedData();
    window.location.reload();
  };

  async function onSubmit(data: FormValues) {
    const payload: Partial<IService> = {
      name: data.name,
      requiredStaffType: data.requiredStaffType,
      durationMinutes: data.durationMinutes,
    };

    setIsLoading(true);
    try {
      const response = await create({ data: payload }).unwrap();

      if (response?.success) {
        clearSavedData();

        router.push("/service");
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
          { name: "Service", href: "/service" },
          { name: "Create Service" },
        ]}
      />

      <div className="p-4 pt-0">
        <Card>
          <FormCardHeaderWithReset
            title={"Service Details"}
            onResetConfirm={handleReset}
          />
          <CardContent>
            <FormComponent
              form={form}
              onSubmit={onSubmit}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
