import type { Metadata } from "next";
import "./globals.css";
import { WhatsAppFloatingButton } from "@/features/chat";
import { LanguageProvider } from "@/features/i18n";
import { ThemeProvider } from "@/features/theme";

export const metadata: Metadata = {
  title: "Gustavo Mota | AI Assistant",
  description: "Chat with AI - Powered by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <WhatsAppFloatingButton />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
