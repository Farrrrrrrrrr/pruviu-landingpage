"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type SiteHeaderProps = {
  currentPath?: "/" | "/fitur" | "/kontak" | "/tentang-kami" | "/privacy-policy" | string;
};

function getNavClass(isActive: boolean) {
  return isActive
    ? "text-navy-600 font-bold transition-colors"
    : "text-navy-700 font-bold hover:text-navy-600 transition-colors";
}

export function SiteHeader({ currentPath = "/" }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = currentPath === "/";
  const homeHref = isHome ? "#beranda" : "/#beranda";
  const complaintHref = isHome ? "#pengaduan" : "/#pengaduan";

  return (
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
            <Link href={homeHref} className={getNavClass(isHome)}>
              Beranda
            </Link>
            <Link href={complaintHref} className={getNavClass(false)}>
              Pengaduan
            </Link>
            {/* <Link href="/fitur" className={getNavClass(currentPath === "/fitur")}>
              Fitur
            </Link> */}
            <Link href="/kontak" className={getNavClass(currentPath === "/kontak")}>
              Kontak
            </Link>
            <Link href="/tentang-kami" className={getNavClass(currentPath === "/tentang-kami")}>
              Tentang Kami
            </Link>
            <Link href="/privacy-policy" className={getNavClass(currentPath === "/privacy-policy")}>
              Kebijakan Privasi
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="https://app.pruviu.com"
              className="px-6 py-2 text-navy-600 hover:text-navy-700 transition-colors font-medium"
            >
              Masuk
            </Link>
            <Link
              href="https://app.pruviu.com"
              className="px-6 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium"
            >
              Daftar
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-navy-700 hover:text-navy-600"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="site-mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div id="site-mobile-menu" className="md:hidden mt-4 pb-4 space-y-4">
            <Link href={homeHref} className={getNavClass(isHome) + " block py-2"}>
              Beranda
            </Link>
            <Link href={complaintHref} className={getNavClass(false) + " block py-2"}>
              Pengaduan
            </Link>
            {/* <Link href="/fitur" className={getNavClass(currentPath === "/fitur") + " block py-2"}>
              Fitur
            </Link> */}
            <Link href="/kontak" className={getNavClass(currentPath === "/kontak") + " block py-2"}>
              Kontak
            </Link>
            <Link href="/tentang-kami" className={getNavClass(currentPath === "/tentang-kami") + " block py-2"}>
              Tentang Kami
            </Link>
            <Link href="/privacy-policy" className={getNavClass(currentPath === "/privacy-policy") + " block py-2"}>
              Kebijakan Privasi
            </Link>
            <div className="pt-4 space-y-2">
              <Link
                href="https://app.pruviu.com"
                className="block text-center px-6 py-2 text-navy-600 hover:text-navy-700 transition-colors font-medium border border-navy-600 rounded-lg"
              >
                Masuk
              </Link>
              <Link
                href="https://app.pruviu.com"
                className="block text-center px-6 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium"
              >
                Daftar
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}