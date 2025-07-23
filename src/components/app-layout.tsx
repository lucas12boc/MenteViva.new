    sueños en el menú lateral:

"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { getAuth, signOut } from "firebase/auth"
import React, { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { CrisisModal } from "./crisis-modal"
import { LanguageSwitcher } from "./language-switcher"
import { useDictionary } from "@/lib/i18n/dictionary-provider"
import { useToast } from "@/hooks/use-toast"
import { getOnboardingStatus } from "@/lib/firebase/services"
import { useAuth } from "@/context/auth-context"

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { dictionary } = useDictionary()
  const { isMobile, setOpenMobile } = useSidebar()
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);

    const checkOnboarding = async () => {
        if (user) {
            const hasCompleted = await getOnboardingStatus();
            if (!hasCompleted && pathname !== "/welcome") {
                router.replace("/welcome");
            }
        }
    }

    checkOnboarding();
  }, [pathname, router, user]);

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      router.push('/');
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
      });
    } catch (error) {
      console.error("Logout Error:", error);
      toast({
        title: "Error",
        description: "No se pudo cerrar la sesión. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  }

  const mainMenuItems = [
    { href: "/dashboard", label: dictionary.navigation.home, icon: Icons.smile },
    { href: "/mood-tracker", label: dictionary.navigation.moodTracker, icon: Icons.bot },
    { href: "/dream-journal", label: "Diario de Sueños", icon: Icons.moon },
    { href: "/garden", label: dictionary.navigation.emotionalGarden, icon: Icons.sprout },
    { href: "/sanctuary", label: dictionary.navigation.resilienceSanctuary, icon: Icons.gem },
    { href: "/training", label: dictionary.navigation.training, icon: Icons.brain },
    { href: "/safe-space", label: dictionary.navigation.safeSpace, icon: Icons.heart },
  ]

  const secondaryMenuItems = [
      { href: "/profile", label: dictionary.navigation.profile, icon: Icons.user },
      { href: "/settings", label: dictionary.navigation.settings, icon: Icons.settings },
  ]
  
  if (pathname === '/welcome' || !isMounted) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen">
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2" onClick={handleLinkClick}>
            <Icons.logo className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-headline font-bold">MenteViva</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {mainMenuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                 <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                  >
                    <Link href={item.href} onClick={handleLinkClick}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarSeparator />
          <SidebarMenu>
             {secondaryMenuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                 <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                  >
                    <Link href={item.href} onClick={handleLinkClick}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 space-y-2">
           <Button asChild variant="soft" className="bg-accent/80 text-accent-foreground font-bold">
              <Link href="/for-business" onClick={handleLinkClick}>
                  {dictionary.navigation.forBusiness}
              </Link>
          </Button>
          <SidebarSeparator />
          <div className="text-center text-xs text-muted-foreground px-2">
              ©️ Lucas Leandro Guzmán 2025 todos los derechos reservados
          </div>
          <Button variant="destructive" className="w-full" onClick={handleLogout}>
            <Icons.logout className="mr-2" />
            <span>{dictionary.navigation.logout}</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
          <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
            <div className="flex gap-2 items-center">
               <SidebarTrigger className="md:hidden" />
               <h1 className="text-xl font-headline hidden md:block">{dictionary.appHeader}</h1>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-4">
              <LanguageSwitcher />
            </div>
          </div>
        </header>
        <main className="relative">
          {children}
          <CrisisModal />
        </main>
      </SidebarInset>
    </div>
  )
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  )
}
