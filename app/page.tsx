import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="Pruviu Logo"
                width={210}
                height={110}
                priority
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#beranda" className="text-gray-600 font-bold hover:text-navy-600 transition-colors">Beranda</a>
              {/* <a href="#fitur" className="text-gray-600 hover:text-navy-600 transition-colors">Fitur</a> */}
              {/* <a href="#tentang" className="text-gray-600 hover:text-navy-600 transition-colors">Tentang</a> */}
              <Link href="/kontak" className="text-gray-600 font-bold hover:text-navy-600 transition-colors">Kontak</Link>
              <a href="/privacy-policy" className="text-gray-600 hover:text-navy-600 font-bold transition-colors">Kebijakan Privasi</a>

            </div>
            <div className="flex items-center space-x-4">
              <Link href="/coming-soon" className="px-6 py-2 text-navy-600 hover:text-navy-700 transition-colors font-medium">
                Masuk
              </Link>
              <Link href="/coming-soon" className="px-6 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium">
                Daftar
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="beranda" className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            {/* <div className="inline-block px-4 py-2 bg-blue-50 text-navy-600 rounded-full text-sm font-medium">
              ✨ Platform Verifikasi Kredit Koperasi
            </div> */}
            <h1 className="text-5xl lg:text-6xl font-bold text-navy-700 leading-none tracking-widest">
              Sistem Mitigasi Risiko Terpadu <span className="bg-clip-text text-red-600">Pertama di Indonesia</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Platform digital yang dilengkapi fitur-fitur informasi perkreditan terpercaya untuk koperasi sektor jasa keuangan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="https://staging.pruviu.com" className="px-8 py-4 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium text-lg shadow-lg text-center">
                Daftar
              </Link>
              <button className="px-8 py-4 bg-white text-navy-600 rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg border-2 border-navy-600">
                Masuk
              </button>
            </div>
            <div className="flex items-center space-x-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-navy-700">500+</p>
                <p className="text-gray-600">Proyeksi Koperasi Terdaftar 2026</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-navy-700">50K+</p>
                <p className="text-gray-600">Proyeksi Pengecekan perbulan</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-navy-700">99.9%</p>
                <p className="text-gray-600">Akurasi Data</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative -mt-40">
              <Image
                src="/ImageContent - Hero.png"
                alt="Pruviu Dashboard Preview"
                width={800}
                height={533}
                className="w-full h-auto scale-125"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section id="fitur" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-700 mb-4">Fitur Lengkap Anti Fraud</h2>
            <p className="text-xl text-gray-600">Lindungi koperasi Anda dengan verifikasi kredit yang akurat dan terpercaya</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-50 rounded-xl hover:shadow-lg transition-shadow border-2 border-navy-600">
              <div className="w-12 h-12 bg-navy-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-700 mb-2">Koperasi Checking</h3>
              <p className="text-gray-600">Verifikasi riwayat pinjaman anggota di berbagai koperasi secara real-time untuk mencegah peminjaman ganda.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl hover:shadow-lg transition-shadow border-2 border-navy-600">
              <div className="w-12 h-12 bg-navy-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-700 mb-2">SLIK OJK</h3>
              <p className="text-gray-600">Akses informasi kredit resmi dari Sistem Layanan Informasi Keuangan OJK untuk validasi kredit yang akurat.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl hover:shadow-lg transition-shadow border-2 border-navy-600">
              <div className="w-12 h-12 bg-navy-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-700 mb-2">Credit Scoring</h3>
              <p className="text-gray-600">Sistem penilaian kredit otomatis dengan algoritma canggih untuk keputusan pemberian pinjaman yang lebih tepat.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-navy-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-700 mb-2">Anti Fraud</h3>
              <p className="text-gray-600">Deteksi otomatis terhadap pola peminjaman mencurigakan dan potensi fraud dengan teknologi AI.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-navy-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-700 mb-2">Laporan & Analitik</h3>
              <p className="text-gray-600">Dashboard lengkap dengan laporan riwayat pengecekan dan analitik tren risiko kredit koperasi Anda.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-navy-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-700 mb-2">Riwayat Pencairan</h3>
              <p className="text-gray-600">Lacak dan monitor riwayat pencairan pinjaman untuk memastikan transparansi dan akuntabilitas.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="bg-navy-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Lindungi Koperasi Anda Sekarang</h2>
          <p className="text-xl text-blue-100 mb-8">Bergabunglah bersama Pruviu untuk melindungi koperasi seluruh Indonesia</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/coming-soon" className="px-8 py-4 bg-white text-navy-600 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg">
              Daftar Sekarang
            </Link>
            <Link href="/coming-soon" className="px-8 py-4 bg-navy-700 text-white rounded-lg hover:bg-navy-800 transition-colors font-medium text-lg border-2 border-white">
              Kontak Pruviu
            </Link>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Image
                src="/Pruviu.svg"
                alt="Pruviu Logo"
                width={100}
                height={33}
                className="mb-4 brightness-200"
              />
              <p className="text-gray-400">Platform Anti Fraud untuk Koperasi Indonesia</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Produk</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Fitur</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Harga</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Keamanan</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Perusahaan</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Karir</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Dukungan</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Bantuan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dokumentasi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontak</a></li>
                                <li><a href="/privacy-policy" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>

              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Pruden Visi Utama. Hak Cipta Dilindungi.</p>
            <div className="mt-2 space-x-4">
              <a href="/privacy-policy" className="hover:text-white transition-colors">Kebijakan Privasi</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
