"use client"

import { useState } from "react"
import { Link } from "@/i18n/routing"
import { usePathname } from "@/i18n/routing"
import { useTranslations } from "next-intl"

import { SearchForm } from "@/components/sidebar/search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/registry/dga/ui/sidebar"

type Component = {
  name: string
  slug: string
}

export function AppSidebar({ components }: { components: Component[] }) {
  const pathname = usePathname()
  const [query, setQuery] = useState("")
  const t = useTranslations("Sidebar")

  const filtered = components.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#006838] to-[#004d2a]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L21 7V17L12 22L3 17V7L12 2Z"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M10 8L6 12L10 16"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M14 8L18 12L14 16"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{t("title")}</span>
                  <span className="text-muted-foreground text-xs">
                    {t("subtitle")}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm onSearch={setQuery} />
      </SidebarHeader>

      <SidebarContent
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 30px, black calc(100% - 60px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 60px, black calc(100% - 60px), transparent 100%)",
        }}
      >
        <SidebarGroup className="mt-5">
          <SidebarGroupLabel className="text-[var(--text-text-display)] font-bold">
            {t("gettingStarted")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link href="/">{t("introduction")}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/changelog"}>
                  <Link href="/changelog">{t("changelog")}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-[var(--text-text-display)]">
            {t("installation")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/installation/nextjs"}
                >
                  <Link href="/installation/nextjs">Next.js</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/installation/vite"}
                >
                  <Link href="/installation/vite">Vite</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/installation/laravel"}
                >
                  <Link href="/installation/laravel">Laravel</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-[var(--text-text-display)]">
            {t("components")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filtered.map((component) => (
                <SidebarMenuItem key={component.slug}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/${component.slug}`}
                  >
                    <Link href={`/${component.slug}`}>{component.name}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
