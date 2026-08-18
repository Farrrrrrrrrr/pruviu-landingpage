"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type SiteHeaderProps = {
  currentPath?: "/" | "/fitur" | "/kontak" | "/tentang-kami" | string;
};

function getNavClass(isActive: boolean) {
  return isActive
    ? "text-navy-600 font-bold transition-colors"
    : "text-navy-700 font-bold hover:text-navy-600 transition-colors";
}

function getHomeNavClass(isActive: boolean) {
  return isActive
    ? "text-white font-bold transition-colors"
    : "text-white/85 font-bold hover:text-white transition-colors";
}

export function SiteHeader({ currentPath = "/" }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const isHome = currentPath === "/";
  const homeHref = isHome ? "#beranda" : "/#beranda";

  const headerClassName = isHome
    ? "bg-[linear-gradient(155deg,_#1f1d52_0%,_#273b93_52%,_#336ab3_100%)] border-b border-white/10 shadow-[0_2px_18px_rgba(18,21,58,0.22)]"
    : "bg-white shadow-sm";

  const navClass = isHome ? getHomeNavClass : getNavClass;

  useEffect(() => {
    const header = headerRef.current;
    if (!header) {
      return;
    }

    const setOffset = () => {
      document.documentElement.style.setProperty(
        "--header-offset",
        `${header.offsetHeight}px`,
      );
    };

    setOffset();

    const observer = new ResizeObserver(setOffset);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header ref={headerRef} className={`sticky top-0 z-50 ${headerClassName}`}>
      <nav
        className="edge-safe-header container mx-auto py-4 md:px-6"
        aria-label="Navigasi utama"
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3" aria-label="Pruviu beranda">
            <Image
              src="/logo.webp"
              alt="Pruviu Logo"
              width={150}
              height={79}
              className="w-32 md:w-40 h-auto"
              priority
            />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href={homeHref} className={navClass(isHome)} aria-current={isHome ? "page" : undefined}>
              Beranda
            </Link>
            {/* <Link href="/fitur" className={getNavClass(currentPath === "/fitur")}>
              Fitur
            </Link> */}
            <Link href="/kontak" className={navClass(currentPath === "/kontak")} aria-current={currentPath === "/kontak" ? "page" : undefined}>
              Kontak
            </Link>
            <Link href="/tentang-kami" className={navClass(currentPath === "/tentang-kami")} aria-current={currentPath === "/tentang-kami" ? "page" : undefined}>
              Tentang Kami
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="https://app.pruviu.com"
              className={
                isHome
                  ? "px-6 py-2 text-white/90 hover:text-white transition-colors font-medium"
                  : "px-6 py-2 text-navy-600 hover:text-navy-700 transition-colors font-medium"
              }
            >
              Masuk
            </Link>
            <Link
              href="https://app.pruviu.com"
              className={
                isHome
                  ? "px-6 py-2 bg-white text-navy-700 rounded-lg hover:bg-white/90 transition-colors font-medium"
                  : "px-6 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium"
              }
            >
              Daftar
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isHome
                ? "text-white/90 hover:text-white"
                : "text-navy-700 hover:text-navy-600"
            }`}
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="site-mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
          <div
            id="site-mobile-menu"
            className={`md:hidden mt-4 pb-4 space-y-4 rounded-xl px-4 py-3 ${
              isHome
                ? "bg-navy-800/90 backdrop-blur-sm border border-white/10"
                : "bg-white"
            }`}
          >
            <Link href={homeHref} className={navClass(isHome) + " block py-2"} aria-current={isHome ? "page" : undefined}>
              Beranda
            </Link>
            {/* <Link href="/fitur" className={getNavClass(currentPath === "/fitur") + " block py-2"}>
              Fitur
            </Link> */}
            <Link href="/kontak" className={navClass(currentPath === "/kontak") + " block py-2"} aria-current={currentPath === "/kontak" ? "page" : undefined}>
              Kontak
            </Link>
            <Link href="/tentang-kami" className={navClass(currentPath === "/tentang-kami") + " block py-2"} aria-current={currentPath === "/tentang-kami" ? "page" : undefined}>
              Tentang Kami
            </Link>
            <div className="pt-4 space-y-2">
              <Link
                href="https://app.pruviu.com"
                className={
                  isHome
                    ? "block text-center px-6 py-2 text-white hover:text-white transition-colors font-medium border border-white/30 rounded-lg"
                    : "block text-center px-6 py-2 text-navy-600 hover:text-navy-700 transition-colors font-medium border border-navy-600 rounded-lg"
                }
              >
                Masuk
              </Link>
              <Link
                href="https://app.pruviu.com"
                className={
                  isHome
                    ? "block text-center px-6 py-2 bg-white text-navy-700 rounded-lg hover:bg-white/90 transition-colors font-medium"
                    : "block text-center px-6 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium"
                }
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