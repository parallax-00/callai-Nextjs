"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { BotIcon, StarIcon, VideoIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import { DashboardUserButton } from "./dashboardUserButton";
import {DashboardTrial} from "./dashboardTrial";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];
const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex intems-center gap-2 px-2 pt-2">
          <Image src="/logo.svg" height={36} width={36} alt="Logo" />
          <p className="text-2xl font-semibold">Call of AI</p>
        </Link>
      </SidebarHeader>
      <Separator className="opacity-10 text-[#5D6B68]"></Separator>
      <SidebarContent>
        <SidebarGroupContent>
          <SidebarMenu>
            {firstSection.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    " h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 bg-sidebar/50 ",
                    pathname === item.href &&
                      "bg-linear-to-r/oklch border-[#5D6B68]/10"
                  )}
                  isActive={pathname === item.href}
                >
                  <Link href={item.href}>
                    <item.icon className="size-5" />
                    <span className="text-sm font-medium tracking-tight">
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <Separator className="opacity-10 text-[#5D6B68]"></Separator>
          <SidebarMenu>
            {secondSection.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    " h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 bg-sidebar/50 ",
                    pathname === item.href &&
                      "bg-linear-to-r/oklch border-[#5D6B68]/10"
                  )}
                  isActive={pathname === item.href}
                >
                  <Link href={item.href}>
                    <item.icon className="size-5" />
                    <span className="text-sm font-medium tracking-tight">
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter className="text-white ">
        <DashboardTrial />
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
