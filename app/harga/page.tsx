import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Harga",
  description:
    "Struktur harga Pruviu untuk layanan SLIK OJK, SLIK Koperasi, dan Full Check - dirancang agar koperasi mendapatkan verifikasi dan mitigasi risiko yang presisi dan terjangkau.",
  alternates: {
    canonical: "/harga",
  },
};

const valuePoints = [
  "Biaya lebih terjangkau (kolektif)",
  "Operasional lebih sederhana",
  "Pelaporan otomatis (dikerjakan sistem)",
  "Pengawasan KEMENKOP (close loop)",
];

const pricingItems = [
  {
    name: "SLIK OJK",
    description:
      "Mengecek riwayat pinjaman anggota/debitur pada ekosistem industri jasa keuangan yang diawasi oleh OJK.",
    price: "Rp 7.900",
    cardClass: "bg-gradient-to-br from-red-600 to-red-500",
    priceClass: "bg-red-600",
  },
  {
    name: "SLIK Koperasi",
    description:
      "Mengecek riwayat pinjaman anggota/debitur pada koperasi lain.",
    price: "Rp 3.000",
    cardClass: "bg-gradient-to-br from-emerald-600 to-emerald-500",
    priceClass: "bg-emerald-600",
  },
  {
    name: "Anti-Fraud",
    description:
      "Mengecek riwayat profil anggota/debitur yang tercatat dalam sistem SLIK OJK dan SLIK Koperasi.",
    price: "Rp 2.000",
    cardClass: "bg-gradient-to-br from-navy-600 to-navy-500",
    priceClass: "bg-navy-600",
  },
  {
    name: "Full Check",
    description:
      "Menampilkan riwayat pinjaman dan profil anggota/debitur pada SLIK OJK, SLIK Koperasi, ditambah skor kredit komprehensif.",
    price: "Rp 9.900",
    cardClass: "bg-gradient-to-br from-navy-700 to-navy-600",
    priceClass: "bg-navy-700",
  },
  {
    name: "Konsul",
    description:
      "Menampilkan Full Check ke akun Pruviu Mobile milik anggota.",
    price: "Rp 10.900",
    cardClass: "bg-gradient-to-br from-violet-700 to-violet-600",
    priceClass: "bg-violet-700",
  },
  {
    name: "Pengecekan via Pruviu Mobile",
    description:
      "Anggota membeli kuota pengecekan ke koperasi melalui akun Pruviu Mobile.",
    price: "Tidak ada batas harga maksimal",
    cardClass: "bg-gradient-to-br from-red-700 to-red-600",
    priceClass: "bg-red-700",
  },
];

export default function HargaPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <SiteHeader currentPath="/harga" />

      <main id="main-content">
        <section className="relative overflow-hidden bg-navy-700 text-white py-16 md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(242,109,114,0.30),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(51,106,179,0.30),transparent_40%),linear-gradient(140deg,#1f1d52_0%,#273b93_70%,#282561_100%)]" />
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative max-w-5xl mx-auto text-center space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-400">
                Harga Program
              </p>
              <h1 className="text-4xl md:text-6xl font-bold">
                Pricing Pruviu
              </h1>
              <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
                Struktur harga dirancang agar koperasi mendapatkan layanan
                verifikasi dan mitigasi risiko yang presisi, operasional, dan
                mudah diimplementasikan dalam alur harian.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto pt-3 text-left">
                {valuePoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm md:text-base"
                  >
                    {point}
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <Link
                  href="/kontak"
                  className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-white font-medium transition-colors hover:bg-red-500"
                >
                  Hubungi Kami
                </Link>
                <Link
                  href="https://app.pruviu.com"
                  className="inline-flex items-center justify-center rounded-lg border border-white/40 px-6 py-3 text-white font-medium transition-colors hover:bg-white/10"
                >
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto space-y-4">
              <div className="text-center">
                <h2 className="text-2xl md:text-4xl font-bold text-navy-700">
                  Paket dan Harga Layanan
                </h2>
                <p className="text-gray-600 mt-2">
                  Ringkasan harga inti untuk setiap jenis pengecekan dan layanan Pruviu.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {pricingItems.map((item) => (
                  <article
                    key={item.name}
                    className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm"
                  >
                    <div className={item.cardClass + " min-h-52 p-6 text-white"}>
                      <h3 className="text-2xl font-bold leading-tight mb-3">{item.name}</h3>
                      <div className="h-px bg-white/35 mb-3" />
                      <p className="text-sm md:text-base text-white/90 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className={item.priceClass + " px-6 py-4 text-white"}>
                      <p className="text-3xl font-bold leading-tight">{item.price}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="rounded-xl border border-navy-200 bg-navy-50 px-4 py-3 text-center text-navy-700 font-medium">
                *Harga berlaku hingga 31 Desember 2026.
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
