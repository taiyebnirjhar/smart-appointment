import { HeaderBar } from "@/app/(dashboard)/_components/header-bar/header-bar";
import PageContainer from "./_component/page-container";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
      <HeaderBar
        breadcrumbs={[
          {
            name: "Appointment",
            href: "/appointment",
          },
          { name: "Edit Appointment" },
        ]}
      />

      <div className="p-4 pt-0">
        <PageContainer id={id} />
      </div>
    </>
  );
}
