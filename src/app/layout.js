import Script from "next/script";

import { Inter } from "next/font/google";
import "./globals.css";
import Image from 'next/image';
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ReadChapterRoot } from "@/components/mangas/readChapterRoot";
import { AdScript } from "@/sdk/ad";
import { cn } from "@/lib/utils";

import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

import { keywords } from "@/metadata/keywords";
import { title, description } from "@/metadata/default";

export const metadata = {
  title: {
    default: title,
    template: "%s",
  },
  description,
  keywords,
  metadataBase: new URL("https://mangaslivre.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    siteName: "Mangás Livre",
    images: [
      {
        url: "/banner.png",
        width: 580,
        height: 580,
      },
    ],
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    images: "/banner.png",
  },
};

export const viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#7b39ec" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={cn("flex flex-col min-h-svh", inter.className)}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />

            <main className="container flex-1 px-4 py-9 md:px-6">
              {children}
              <ReadChapterRoot />
            </main>
            <Footer />
          </ThemeProvider>
        </Providers>
        <a
          title="Privacy-friendly Web Analytics"
          href="https://clicky.com/101462876"
        >
         <Image
            alt="Clicky"
            src="//static.getclicky.com/media/links/badge.gif"
            border="0"
          />
        </a>
      </body>
    </html>
  );
}