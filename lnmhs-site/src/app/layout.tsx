import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Latif Niazi Memorial Higher Secondary School | Quality Education Since 1977",
  description:
    "Latif Niazi Memorial Higher Secondary School — nurturing confident, capable, and responsible students through quality education and a strong foundation for the future. Established 1977, Hyderabad, Sindh, Pakistan.",
  keywords: [
    "Latif Niazi Memorial",
    "Higher Secondary School",
    "Hyderabad",
    "Sindh",
    "Pakistan",
    "Quality Education",
    "Admissions",
    "Pre-Medical",
    "Pre-Engineering",
    "Computer Science",
    "School in Hyderabad",
    "Latifabad",
  ],
  openGraph: {
    title: "Latif Niazi Memorial Higher Secondary School | Quality Education Since 1977",
    description:
      "Nurturing confident, capable, and responsible students through quality education and a strong foundation for the future.",
    type: "website",
    locale: "en_PK",
    siteName: "Latif Niazi Memorial Higher Secondary School",
    images: [
      {
        url: "/images/logo/logo.jpeg",
        width: 800,
        height: 800,
        alt: "Latif Niazi Memorial Higher Secondary School Logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo/logo.jpeg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Noto+Nastaliq+Urdu:wght@400..700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
