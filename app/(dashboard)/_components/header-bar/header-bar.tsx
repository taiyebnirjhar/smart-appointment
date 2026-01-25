import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export type HeaderBreadcrumbItem = {
  name: string;
  href?: string;
};

type HeaderBarProps = {
  breadcrumbs: HeaderBreadcrumbItem[];
  showSidebarTrigger?: boolean;
  className?: string;
  children?: React.ReactNode; // right-section actions
};

export function HeaderBar({
  breadcrumbs,
  showSidebarTrigger = true,
  className,
  children,
}: HeaderBarProps) {
  return (
    <header
      className={cn(
        "flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear",
        "group-has-data-[collapsible=icon]/sidebar-wrapper:h-12",
        className,
      )}
    >
      {/* LEFT SECTION */}
      <div className="flex items-center gap-2 px-4">
        {showSidebarTrigger && (
          <SidebarTrigger className="-ml-1 cursor-pointer" />
        )}

        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />

        <nav className="flex items-center space-x-1 text-base font-medium text-muted-foreground">
          {breadcrumbs.map((item, i) => (
            <span key={i} className="flex items-center">
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors max-md:text-sm"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="text-foreground max-md:text-sm">
                  {item.name}
                </span>
              )}

              {i < breadcrumbs.length - 1 && (
                <ChevronRight className="h-4 w-4 mx-1 inline" />
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* RIGHT SECTION — optional */}
      {children && (
        <div className="flex items-center gap-2 px-4 ">{children}</div>
      )}
    </header>
  );
}

// ? example uses :

{
  /* <HeaderBar
  breadcrumbs={[
    { name: "Building Your Application", href: "#" },
    { name: "Data Fetching" },
  ]}
/>; */
}

{
  /* <HeaderBar
  breadcrumbs={[
    { name: "Roles", href: "/roles" },
    { name: "Create New Role" },
  ]}
>
  <Button variant="default">Create</Button>
</HeaderBar> */
}

{
  /* <HeaderBar
  breadcrumbs={[
    { name: "Products", href: "/products" },
    { name: "Edit Product" },
  ]}
>
  <>
    <Button variant="outline">Cancel</Button>
    <Button>Update</Button>
  </>
</HeaderBar> */
}
