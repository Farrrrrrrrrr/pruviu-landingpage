import type { Metadata } from "next";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

const title = "Tentang Kami";
const description =
  "Profil perusahaan PT Pruden Visi Utama (Pruviu) yang dapat dibaca online dan diunduh.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tentang-kami",
  },
  openGraph: {
    title: `${title} | Pruviu`,
    description,
    url: "https://pruviu.com/tentang-kami",
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
    title: `${title} | Pruviu`,
    description,
    images: ["/pruviu-logo-redblue.png"],
  },
};

const companyProfilePath = "/PRUVIU_Company_Profile-2026-04-10.pdf";

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader currentPath="/tentang-kami" />

      <main id="main-content" className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <section className="max-w-6xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-navy-700 mb-3">
              Tentang Kami
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              Lihat profil perusahaan Pruviu langsung di browser atau unduh dokumen PDF
              untuk dibaca offline.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <a
              href={companyProfilePath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center items-center px-5 py-3 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-semibold"
            >
              Buka PDF di Tab Baru
            </a>
            <a
              href={companyProfilePath}
              download
              className="inline-flex justify-center items-center px-5 py-3 border-2 border-navy-600 text-navy-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              Download Company Profile
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <iframe
              src={companyProfilePath}
              title="PRUVIU Company Profile"
              className="w-full h-[65vh] min-h-[420px] md:min-h-[640px]"
            />
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Jika PDF tidak tampil di perangkat Anda, gunakan tombol
            &quot;Buka PDF di Tab Baru&quot; atau &quot;Download Company Profile&quot;.
          </p>
        </section>
      </main>

      <div className="mt-12">
        <SiteFooter />
      </div>
    </div>
  );
}