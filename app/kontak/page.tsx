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

          <div className="flex justify-center">
            {/* Email Support Card Only */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-2 border-blue-100 max-w-md w-full">
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
