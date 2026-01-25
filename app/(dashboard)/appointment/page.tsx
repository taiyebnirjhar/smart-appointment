import { IQuery } from "@/types/common/common";
import { HeaderBar } from "../_components/header-bar/header-bar";
import AppointmentContainer from "./_components/container/appointment-container";

interface PageProps {
  searchParams?: Promise<IQuery>;
}

export default async function StaffPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  return (
    <>
      <HeaderBar breadcrumbs={[{ name: "Appointment" }]} />

      <div className="p-4 pt-0">
        <AppointmentContainer searchParams={resolvedSearchParams} />
      </div>
    </>
  );
}
