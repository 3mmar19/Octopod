import "@/styles/globals.css";
import { ibmPlexArabic } from "./fonts";

export const metadata = {
  title: "Octopod - البحث في البودكاست",
  description: "ابحث واكتشف البودكاست العربية والعالمية",
  icons: {
    icon: [
      { url: '/favicon-android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className={`${ibmPlexArabic.variable} ${ibmPlexArabic.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
