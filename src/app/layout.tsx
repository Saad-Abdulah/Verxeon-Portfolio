import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Roboto, Titillium_Web } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./Providers";
import Navigation from '@/components/shared/Navigation'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
});

const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-titillium",
});


export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/logos/Black-Logo.png?v=2", media: "(prefers-color-scheme: light)" },
      { url: "/logos/White-Logo.png?v=2", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: [
      { url: "/logos/Black-Logo.png?v=2", media: "(prefers-color-scheme: light)" },
      { url: "/logos/White-Logo.png?v=2", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [
      { url: "/logos/Black-Logo.png?v=2", media: "(prefers-color-scheme: light)" },
      { url: "/logos/White-Logo.png?v=2", media: "(prefers-color-scheme: dark)" },
    ],
  },
  title: "Verxeon",
  description: "Verxeon develops next-gen AI and web solutions for tomorrow's challenges. We deliver innovative solutions to empower your business with cutting-edge technology.",
  keywords: "AI, web development, next-gen, technology, innovation, Verxeon, business solutions",
  authors: [{ name: "Verxeon Team" }],
  openGraph: {
    title: "Verxeon",
    description: "Verxeon develops next-gen AI and web solutions for tomorrow's challenges. We deliver innovative solutions to empower your business with cutting-edge technology.",
    type: "website",
    locale: "en_US",
    siteName: "Verxeon",
    url: "https://Verxeon.com",
    images: [
      {
        url: "https://Verxeon.com/Home/Verxeon-Landing.png?v=3",
        width: 1200,
        height: 630,
        alt: "Verxeon",
      },
    ],
  },  
  twitter: {
    card: "summary_large_image",
    title: "Verxeon",
    description: "Verxeon develops next-gen AI and web solutions for tomorrow's challenges. We deliver innovative solutions to empower your business with cutting-edge technology.",
    images: ["https://Verxeon.com/Home/Verxeon-Landing.png?v=3"],
  },
  other: {
    "theme-color": "#000000",
    "msapplication-TileColor": "#000000",
    "msapplication-TileImage": "/logos/Black-Logo.png?v=2",
    // Additional meta tags for better platform compatibility
    "og:image": "https://Verxeon.com/Home/Verxeon-Landing.png?v=3",
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:alt": "Verxeon",
    "og:image:type": "image/png",
    // WhatsApp specific
    "og:image:secure_url": "https://Verxeon.com/Home/Verxeon-Landing.png?v=3",
    // LinkedIn specific
    "og:image:url": "https://Verxeon.com/Home/Verxeon-Landing.png?v=3",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth lg:scroll-auto ${ibmPlexSans.variable} ${roboto.variable} ${titilliumWeb.variable}`}>
      <body
        className={`bg-page-background text-card-primary antialiased`}
        suppressHydrationWarning={true}
      >
        <AppProviders>
          <Navigation />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
