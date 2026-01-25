import { IQuery } from "@/types/common/common";
import { HeaderBar } from "../_components/header-bar/header-bar";
import StaffContainer from "./_components/container/staff-container";

interface PageProps {
  searchParams?: Promise<IQuery>;
}

export default async function StaffPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  return (
    <>
      <HeaderBar breadcrumbs={[{ name: "Staff" }]} />

      <div className="p-4 pt-0">
        <StaffContainer searchParams={resolvedSearchParams} />
      </div>
    </>
  );
}
