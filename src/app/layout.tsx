import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { DictionaryProvider } from '@/lib/i18n/dictionary-provider';
import { AuthProvider } from '@/context/auth-context';

export const metadata: Metadata = {
  title: 'MenteViva Acompañante',
  description: 'Una app que no solo asiste, sino que abraza a quienes más lo necesitan.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background font-sans")}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DictionaryProvider>
              {children}
              <Toaster />
            </DictionaryProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
