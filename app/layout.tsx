import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "./components/whatsapp-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://pruviu.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pruviu - Sistem Mitigasi Risiko Terpadu Pertama di Indonesia",
    template: "%s | Pruviu",
  },
  description: "Platform lengkap untuk verifikasi kredit dan pengecekan riwayat keuangan anggota koperasi. Koperasi Checking, SLIK OJK, dan Credit Scoring dalam satu sistem.",
  keywords: ["koperasi", "credit scoring", "SLIK OJK", "anti fraud", "koperasi checking", "verifikasi kredit"],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: "Pruviu - Sistem Mitigasi Risiko Terpadu Pertama di Indonesia",
    description: "Platform lengkap untuk verifikasi kredit dan pengecekan riwayat keuangan anggota koperasi. Koperasi Checking, SLIK OJK, dan Credit Scoring.",
    url: siteUrl,
    type: "website",
    locale: "id_ID",
    siteName: "Pruviu",
    images: [
      {
        url: "/pruviu-logo-redblue.png",
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
    images: ["/pruviu-logo-redblue.png"],
  },
  icons: {
    icon: "/icon.ico",
    apple: "/icon.ico",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PT Pruden Visi Utama (Pruviu)",
  alternateName: "Pruviu",
  url: siteUrl,
  logo: `${siteUrl}/pruviu-logo-redblue.png`,
  description:
    "Platform digital verifikasi kredit dan mitigasi risiko keuangan untuk koperasi, anggota koperasi, dan masyarakat umum di Indonesia.",
  email: "support@pruviu.com",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "51st Floor, Gedung Treasury Tower, Kawasan District 8 LOT 28, Jl. Tulodong Atas 2 No.28, Senayan, Kby. Baru",
    addressLocality: "Jakarta Selatan",
    addressRegion: "DKI Jakarta",
    postalCode: "12190",
    addressCountry: "ID",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@pruviu.com",
    telephone: "+62-21-50808165",
    areaServed: "ID",
    availableLanguage: ["Indonesian"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <a href="#main-content" className="skip-link">
          Lewati ke konten utama
        </a>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
