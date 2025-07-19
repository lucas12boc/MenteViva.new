"use client";

import { AppLayout } from "@/components/app-layout";
import { AuthGuard } from "@/context/auth-context";

export default function AppRoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <AppLayout>{children}</AppLayout>
    </AuthGuard>
  )
}
