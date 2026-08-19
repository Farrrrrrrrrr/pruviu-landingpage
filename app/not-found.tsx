import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <SiteHeader />
      <main id="main-content" className="px-6 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-8">
            <Link href="/">
              <Image
                src="/Pruviu.svg"
                alt="Pruviu Logo"
                width={180}
                height={60}
                priority
                className="drop-shadow-lg cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          <div className="space-y-6">
           

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-700 leading-tight">
              Halaman Tidak Ditemukan
            </h1>

            <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed">
              <p>
                Maaf, halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
                Silakan periksa kembali alamat URL, atau kembali ke halaman utama <span className="font-semibold text-navy-600">Pruviu</span>.
              </p>
            </div>

            <div className="pt-8">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-navy-600 text-white rounded-lg shadow-lg hover:bg-navy-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-semibold text-lg">Kembali ke Beranda</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
