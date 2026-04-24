import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <SiteHeader currentPath="/fitur" />

      <main id="main-content">
        {/*
        Feature diagram work from this session is intentionally disabled while
        we standardize shared navigation and footer across the site.
        */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-600">
                Halaman Fitur
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-navy-700">
                Detail fitur sedang kami rapikan
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Halaman ini sementara kami sederhanakan agar navigasi dan footer
                seluruh situs konsisten terlebih dahulu. Diagram fitur yang tadi
                dikerjakan bisa diaktifkan kembali setelah fondasi layout selesai.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-lg bg-navy-600 px-6 py-3 text-white font-medium transition-colors hover:bg-navy-700"
                >
                  Kembali ke Beranda
                </Link>
                <Link
                  href="https://app.pruviu.com"
                  className="inline-flex items-center justify-center rounded-lg border border-navy-600 px-6 py-3 text-navy-700 font-medium transition-colors hover:bg-blue-50"
                >
                  Buka Aplikasi
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}