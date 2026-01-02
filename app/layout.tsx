import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pruviu - Sistem Mitigasi Risiko Terpadu Pertama di Indonesia",
  description: "Platform lengkap untuk verifikasi kredit dan pengecekan riwayat keuangan anggota koperasi. Koperasi Checking, SLIK OJK, dan Credit Scoring dalam satu sistem.",
  keywords: ["koperasi", "credit scoring", "SLIK OJK", "anti fraud", "koperasi checking", "verifikasi kredit"],
  openGraph: {
    title: "Pruviu - Sistem Mitigasi Risiko Terpadu Pertama di Indonesia",
    description: "Platform lengkap untuk verifikasi kredit dan pengecekan riwayat keuangan anggota koperasi. Koperasi Checking, SLIK OJK, dan Credit Scoring.",
    type: "website",
    locale: "id_ID",
    siteName: "Pruviu",
    images: [
      {
        url: "/Pruviu.svg",
        width: 1200,
        height: 630,
        alt: "Pruviu - Platform Anti Fraud Koperasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pruviu - Sistem Mitigasi Risiko Terpadu Pertama di Indonesia",
    description: "Platform lengkap untuk verifikasi kredit dan pengecekan riwayat keuangan anggota koperasi.",
    images: ["/Pruviu.svg"],
  },
  icons: {
    icon: "/Pruviu.svg",
    apple: "/Pruviu.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
