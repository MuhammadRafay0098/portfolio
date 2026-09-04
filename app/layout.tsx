import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muhammad Rafay | Front-End & Next.js Engineer",
  description:
    "Portfolio of Muhammad Rafay — Computer Science Graduate & Front-End Developer specializing in React, Next.js, and modern Web Applications.",
  keywords: [
    "Muhammad Rafay",
    "Front-End Developer",
    "React Developer",
    "Next.js Engineer",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Muhammad Rafay" }],
  openGraph: {
    title: "Muhammad Rafay | Front-End Developer Portfolio",
    description:
      "Building clean, fast, and responsive web interfaces with React, Next.js, and Tailwind CSS.",
    url: "https://rafay.dev",
    siteName: "Muhammad Rafay Portfolio",
    images: [
      {
        url: "/profilepic.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Rafay Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Rafay | Front-End Developer",
    description:
      "Building clean, fast, and responsive web interfaces with React & Next.js.",
    images: ["/profilepic.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans bg-base text-ink antialiased selection:bg-accent-teal/20 selection:text-accent-teal">
        {children}
      </body>
    </html>
  );
}
