"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Kontak() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/Pruviu.svg"
                alt="Pruviu Logo"
                width={120}
                height={40}
                className="w-[100px] md:w-[120px] h-auto"
                priority
              />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#beranda" className="text-gray-600 hover:text-navy-600 transition-colors">Beranda</Link>
              <Link href="/kontak" className="text-navy-600 font-semibold transition-colors">Kontak</Link>
              <Link href="/privacy-policy" className="text-gray-600 hover:text-navy-600 transition-colors">Kebijakan Privasi</Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="https://app.pruviu.com" className="px-6 py-2 text-navy-600 hover:text-navy-700 transition-colors font-medium">
                Masuk
              </Link>
              <Link href="https://app.pruviu.com" className="px-6 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium">
                Daftar
              </Link>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-navy-600"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <Link href="/#beranda" className="block text-gray-600 hover:text-navy-600 transition-colors py-2">Beranda</Link>
              <Link href="/kontak" className="block text-navy-600 font-semibold transition-colors py-2">Kontak</Link>
              <Link href="/privacy-policy" className="block text-gray-600 hover:text-navy-600 transition-colors py-2">Kebijakan Privasi</Link>
              <div className="pt-4 space-y-2">
                <Link href="https://app.pruviu.com" className="block text-center px-6 py-2 text-navy-600 border border-navy-600 rounded-lg">
                  Masuk
                </Link>
                <Link href="https://app.pruviu.com" className="block text-center px-6 py-2 bg-navy-600 text-white rounded-lg">
                  Daftar
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Contact Section */}
      <section className="container mx-auto px-4 md:px-6 py-10 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-700 mb-3 md:mb-4">Hubungi Kami</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Kami siap membantu Anda dengan pertanyaan dan kebutuhan Anda</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Email Support Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-2 border-blue-100">
              <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-navy-700 mb-2">Email Support</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">Kirim email kepada kami untuk pertanyaan detail atau bantuan teknis</p>
                </div>
                <a 
                  href="mailto:support@pruviu.com" 
                  className="inline-flex items-center space-x-2 px-6 md:px-8 py-3 md:py-4 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium text-base md:text-lg shadow-md w-full md:w-auto justify-center"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="break-all">support@pruviu.com</span>
                </a>
              </div>
            </div>

            {/* WhatsApp Contact Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-2 border-green-100">
              <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-navy-700 mb-2">WhatsApp</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">Hubungi kami via WhatsApp untuk pertanyaan cepat dan konsultasi langsung</p>
                </div>
                <a 
                  href="https://wa.me/6281234567890?text=Halo%20Pruviu,%20saya%20ingin%20bertanya%20mengenai%20layanan%20Anda" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 md:px-8 py-3 md:py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-base md:text-lg shadow-md w-full md:w-auto justify-center"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Chat via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center bg-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-navy-700 mb-4">Jam Operasional</h3>
            <div className="space-y-2 text-gray-600">
              <p className="text-lg">Senin - Jumat: 09:00 - 17:00 WIB</p>
              <p className="text-lg">WhatsApp: 24/7 (Balasan otomatis di luar jam kerja)</p>
              <p className="text-lg">Email: Kami akan membalas dalam 1x24 jam</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
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
                <li><Link href="/#fitur" className="hover:text-white transition-colors">Fitur</Link></li>
                <li><Link href="/coming-soon-harga" className="hover:text-white transition-colors">Harga</Link></li>
                <li><Link href="/coming-soon-keamanan" className="hover:text-white transition-colors">Keamanan</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Perusahaan</h4>
              <ul className="space-y-2">
                <li><Link href="/coming-soon" className="hover:text-white transition-colors">Tentang Kami</Link></li>
                <li><Link href="/coming-soon-karir" className="hover:text-white transition-colors">Karir</Link></li>
                <li><Link href="/coming-soon-blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Dukungan</h4>
              <ul className="space-y-2">
                <li><Link href="/kontak" className="hover:text-white transition-colors">Kontak</Link></li>
                <li><Link href="/coming-soon-dokumentasi" className="hover:text-white transition-colors">Dokumentasi</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Pruden Visi Utama. Hak Cipta Dilindungi.</p>
            <div className="mt-2 space-x-4">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
              <span>•</span>
              <Link href="/coming-soon-sk" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
