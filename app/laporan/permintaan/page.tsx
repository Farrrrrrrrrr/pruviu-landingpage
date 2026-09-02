import type { Metadata } from "next";
import Link from "next/link";
import { PdpRequestForm } from "../../components/pdp-request-form";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

const title = "Formulir Permintaan Hak Subjek Data Pribadi";
const description =
  "Formulir pengajuan hak Subjek Data Pribadi Pruviu sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.";

export const metadata: Metadata = {
  title,
  description,
  // Kept out of search results on purpose: the form is a deliberate step from
  // /laporan, not a landing page, and indexing it invites automated pengiriman.
  robots: { index: false, follow: true },
};

export default function PermintaanPdpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader currentPath="/laporan" />

      <main id="main-content">
        <section className="container mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-10 md:pb-20">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/laporan"
              className="inline-flex items-center gap-2 text-sm text-navy-600 hover:text-navy-700 mb-6"
            >
              &larr; Kembali ke Laporan &amp; Hak Data Pribadi
            </Link>

            <h1 className="text-3xl sm:text-4xl font-bold text-navy-700 mb-4">
              Permintaan Hak Subjek Data Pribadi
            </h1>
            <p className="text-gray-600 leading-relaxed mb-8">
              Gunakan formulir ini untuk mengajukan hak Anda berdasarkan UU No.
              27 Tahun 2022 tentang Pelindungan Data Pribadi. Penjelasan lengkap
              mengenai setiap hak, jangka waktu penanganan, dan batasannya
              tersedia pada halaman{" "}
              <Link
                href="/laporan"
                className="text-navy-600 underline underline-offset-2 hover:text-navy-700"
              >
                Laporan &amp; Hak Data Pribadi
              </Link>
              .
            </p>

            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-2 border-blue-100">
              <PdpRequestForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
