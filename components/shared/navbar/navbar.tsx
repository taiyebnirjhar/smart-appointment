/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BlueTick from "@/components/svgs/blue-tick/blue-tick";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useAuth from "@/hooks/use-auth";

import {
  ChevronsUpDown,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  ShoppingCart,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "../logo/logo";
import { UserMenu } from "../user-menu/user-menu";

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (route: string) =>
    pathname === route || pathname.startsWith(`${route}/`);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  // const { isMobile } = useSidebar();

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/all-ads", label: "All Ads", icon: ShoppingCart },
    { href: "/blogs", label: "Blogs", icon: FileText },
    { href: "/contact-us", label: "Contact Us", icon: Mail },
  ];

  const { data: session, status } = useAuth();
  const isAuthenticated = status === "authenticated";

  const name = session?.user?.name?.trim() || "anonymous user";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word: any) => word[0]?.toUpperCase())
    .join("");

  const email = session?.user?.email ?? "";
  const avatar = session?.user?.profilePicture ?? "";

  const verificationStatus = session?.user?.verificationStatus;

  const handleDashboard = () => {
    if (!isAuthenticated) return;

    router.push("/");
  };

  return (
    <nav className="bg-[#1E3A8A] text-[#F5F5F5]">
      <div className="max-w-[1432px] container mx-auto px-6 py-4">
        {/* Desktop View - Top Section */}
        <div className="hidden md:flex max-md:flex-col justify-between max-md:gap-4 items-center mb-4 text-sm">
          {!isAuthenticated && (
            <div className="flex items-center space-x-4 text-lg md:text-xl font-medium ">
              <Link
                href="/sign-in"
                className="px-3 lg:px-6 py-2 lg:py-3 bg-white text-[#1E3A8A] rounded-sm hover:bg-gray-200 transition-colors"
              >
                Sell your equipment
              </Link>
              <Link
                href="/sign-in"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Buy
              </Link>
              <Link
                href="/sign-in"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Rent
              </Link>
            </div>
          )}
          {isAuthenticated && (
            <div className="flex items-center space-x-4 text-lg md:text-xl font-medium ">
              <Button
                onClick={handleDashboard}
                className="text-white hover:text-gray-300 transition-colors  border-none bg-transparent hover:bg-transparent text-xl p-0 cursor-pointer"
                variant="ghost"
              >
                Dashboard
              </Button>
            </div>
          )}

          {!isAuthenticated && (
            <div className="flex items-center space-x-4 text-lg md:text-xl font-medium">
              <Link
                href="/sign-in"
                className={`hover:text-gray-300 transition-colors ${
                  isActive("/sign-in")
                    ? "border-b-2 border-white pb-1 mt-1.5"
                    : ""
                }`}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className={`hover:text-gray-300 transition-colors ${
                  isActive("/register")
                    ? "border-b-2 border-white pb-1 mt-1.5"
                    : ""
                }`}
              >
                Register
              </Link>
            </div>
          )}

          {isAuthenticated && (
            <UserMenu
              email={session?.user?.email ?? ""}
              name={session?.user?.name ?? ""}
              profilePicture={session?.user?.profilePicture ?? ""}
            />
          )}
        </div>

        {/* Desktop - Separator */}
        <div className="hidden md:block border-b border-[#F5F5F5]/50 mt-3 mb-6"></div>

        {/* Mobile & Desktop - Bottom Section */}
        <div className="flex justify-between items-center text-white">
          <Link href={"/"}>
            <Logo textClassName="text-xl xl:text-[28px] leading-[135%] font-bold" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex  flex-wrap justify-center md:justify-end gap-x-5 gap-y-2 text-base xl:text-xl leading-[120%]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`hover:text-gray-300 transition-colors ${
                    isActive(link.href) ||
                    (link.href === "/" && pathname === "/")
                      ? "border-b-2 border-white pb-1"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile - Burger Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Menu className="size-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#F8FAFC] border-gray-200 w-full max-w-[350px] p-0"
            >
              <div className="flex flex-col h-full">
                {/* Logo Section */}
                <div className="p-6  w-fit">
                  <Link href={"/"}>
                    <Logo textClassName="text-xl xl:text-[28px] leading-[135%] font-bold" />
                  </Link>
                </div>
                {/* Desktop - Separator */}
                <div className="border-b border-gray-200 "></div>
                {/* Navigation Section */}
                <div className="flex-1 px-4 py-6 overflow-y-auto flex flex-col items-center justify-between w-full h-full">
                  {/* Navigation Links with Icons */}
                  <nav className="flex flex-col gap-1 flex-1 w-full">
                    {isAuthenticated && (
                      <button
                        onClick={handleDashboard}
                        className="flex items-center gap-3 px-1 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-left"
                      >
                        <LayoutDashboard className="size-5 text-[#64748B]" />
                        <span className="text-[#1E293B] font-medium">
                          Dashboard
                        </span>
                      </button>
                    )}
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 px-1 py-2.5 rounded-lg hover:bg-gray-100 transition-colors ${
                            isActive(link.href) ||
                            (link.href === "/" && pathname === "/")
                              ? "bg-gray-100"
                              : ""
                          }`}
                        >
                          <Icon className="size-5 text-[#64748B]" />
                          <span className="text-[#1E293B] font-medium">
                            {link.label}
                          </span>
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Auth Buttons for Unauthenticated Users */}
                  {!isAuthenticated && (
                    <div className="mt-6 flex flex-col gap-3 w-full ">
                      <Link
                        href="/sign-in"
                        onClick={() => setIsOpen(false)}
                        className="w-full px-4 py-2.5 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A]/90 transition-colors text-center font-medium"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsOpen(false)}
                        className="w-full px-4 py-2.5 border border-[#1E3A8A] text-[#1E3A8A] rounded-lg hover:bg-gray-50 transition-colors text-center font-medium"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>

                {/* User Profile Footer (for authenticated users) */}
                {isAuthenticated && (
                  <div className="px-4 py-6 border-t border-gray-200">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center space-x-4">
                          <Avatar className="h-8 w-8 rounded-lg border-2 border-border">
                            <AvatarImage src={avatar} alt={name} />
                            <AvatarFallback className="rounded-lg">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="grid flex-1 text-left text-sm leading-tight">
                            <div className="truncate font-medium capitalize inline-flex gap-1.5 w-full">
                              {session?.user?.email ?? ""}{" "}
                              <BlueTick size={15} className="mt-0.5" />
                            </div>
                            <span className="truncate text-xs">{email}</span>
                          </div>
                          <ChevronsUpDown className="ml-auto size-4" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={"bottom"}
                        align="end"
                        sideOffset={4}
                      >
                        <DropdownMenuLabel className="p-0 font-normal">
                          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg border-2 border-border">
                              <AvatarImage src={avatar} alt={name} />
                              <AvatarFallback className="rounded-lg">
                                {initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                              <div className="truncate font-medium capitalize inline-flex gap-1.5 w-full">
                                {name} <BlueTick size={15} className="mt-0.5" />
                              </div>
                              <span className="truncate text-xs">{email}</span>
                            </div>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuSeparator />
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={async () => await signOut()}
                          className="text-red-600 focus:text-red-600"
                        >
                          <LogOut />
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
