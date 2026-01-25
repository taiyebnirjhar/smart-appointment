import { IQuery } from "@/types/common/common";
import { HeaderBar } from "../_components/header-bar/header-bar";
import WaitingListContainer from "./_components/container/waiting-list-container";

interface PageProps {
  searchParams?: Promise<IQuery>;
}

export default async function WaitingListPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  return (
    <>
      <HeaderBar breadcrumbs={[{ name: "Waiting List" }]} />

      <div className="p-4 pt-0">
        <WaitingListContainer searchParams={resolvedSearchParams} />
      </div>
    </>
  );
}
