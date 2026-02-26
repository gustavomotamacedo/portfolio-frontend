import type { Metadata } from "next";
import "./globals.css";
import { WhatsAppFloatingButton } from "@/features/chat";
import { LanguageProvider } from "@/features/i18n";
import { ThemeProvider } from "@/features/theme";
import Script from "next/script";

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
        {/* Hotjar Tracking Code for Site 6656104 */}
        <Script id="hotjar-script" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6656104,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
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
