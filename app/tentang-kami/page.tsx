import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tentang Kami | Pruviu",
  description:
    "Profil perusahaan PT Pruden Visi Utama (Pruviu) yang dapat dibaca online dan diunduh.",
};

const companyProfilePath = "/PRUVIU_Company_Profile-2026-04-10.pdf";

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav
          className="container mx-auto px-4 md:px-6 py-4"
          aria-label="Navigasi utama"
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3" aria-label="Pruviu beranda">
              <Image
                src="/logo.png"
                alt="Pruviu Logo"
                width={150}
                height={79}
                className="w-32 md:w-40 h-auto"
                priority
              />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-600 font-bold hover:text-navy-600 transition-colors"
              >
                Beranda
              </Link>
              <Link
                href="/tentang-kami"
                aria-current="page"
                className="text-navy-600 font-bold transition-colors"
              >
                Tentang Kami
              </Link>
              <Link
                href="/kontak"
                className="text-gray-600 font-bold hover:text-navy-600 transition-colors"
              >
                Kontak
              </Link>
              <Link
                href="/privacy-policy"
                className="text-gray-600 font-bold hover:text-navy-600 transition-colors"
              >
                Kebijakan Privasi
              </Link>
            </div>
          </div>
        </nav>
      </header>

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
              className="w-full h-[70vh] min-h-[640px]"
            />
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Jika PDF tidak tampil di perangkat Anda, gunakan tombol
            &quot;Buka PDF di Tab Baru&quot; atau &quot;Download Company Profile&quot;.
          </p>
        </section>
      </main>
    </div>
  );
}