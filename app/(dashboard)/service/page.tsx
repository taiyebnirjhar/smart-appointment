import { IQuery } from "@/types/common/common";
import { HeaderBar } from "../_components/header-bar/header-bar";
import ServiceContainer from "./_components/container/service-container";

interface PageProps {
  searchParams?: Promise<IQuery>;
}

export default async function ServicePage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  return (
    <>
      <HeaderBar breadcrumbs={[{ name: "Service" }]} />

      <div className="p-4 pt-0">
        <ServiceContainer searchParams={resolvedSearchParams} />
      </div>
    </>
  );
}
