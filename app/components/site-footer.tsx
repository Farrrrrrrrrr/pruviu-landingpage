import Image from "next/image";
import Link from "next/link";

type SiteFooterProps = {
  complaintHref?: string;
};

export function SiteFooter({ complaintHref = "/#compliance" }: SiteFooterProps) {
  return (
    <footer className="bg-navy-700 text-white/80 py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
          <div>
            <Image
              src="/Pruviu.svg"
              alt="Pruviu Logo"
              width={100}
              height={33}
              className="mb-4 brightness-200"
            />
            <p className="text-sm md:text-base text-white/60">
              Platform Monitoring dan Mitigasi Risiko Keuangan untuk Koperasi
              dan Anggota Koperasi
            </p>
            <hr className="border-white/10 my-4" />
            <p className="text-sm md:text-base text-white/60">
              51st Floor, Gedung Treasury Tower, Kawasan District 8 LOT 28, Jl. Tulodong Atas 2 No.28, Senayan, Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12190
            </p>
          </div>
          <div>
            <h2 className="font-bold text-white mb-3 md:mb-4 text-sm md:text-base">
              Produk
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/fitur" className="hover:text-white transition-colors text-sm md:text-base">
                  Fitur
                </Link>
              </li>
              <li>
                <Link href="/#compliance" className="hover:text-white transition-colors text-sm md:text-base">
                  Keamanan
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-white mb-3 md:mb-4 text-sm md:text-base">
              Perusahaan
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/tentang-kami" className="hover:text-white transition-colors text-sm md:text-base">
                  Tentang Kami
                </Link>
              </li>
              {/* <li>
                <a href="https://www.linkedin.com/company/pt-pruden-visi-utama/jobs/" className="hover:text-white transition-colors text-sm md:text-base">
                  Karir
                </a>
              </li> */}
              <li>
                <a href="https://www.linkedin.com/company/pt-pruden-visi-utama/posts/?feedView=all" className="hover:text-white transition-colors text-sm md:text-base">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-white mb-3 md:mb-4 text-sm md:text-base">
              Dukungan
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/kontak" className="hover:text-white transition-colors text-sm md:text-base">
                  Kontak
                </Link>
              </li>
              <li>
                <Link href={complaintHref} className="hover:text-white transition-colors text-sm md:text-base">
                  Pengaduan
                </Link>
              </li>
              <li>
                <span className="text-sm md:text-base text-white/40">
                  Dokumentasi
                  <span className="ml-1.5 text-xs">(segera hadir)</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center gap-4 border-t border-white/10 pt-6 md:pt-8 mb-6 md:mb-8">
          <a
            href="https://www.linkedin.com/company/pt-pruden-visi-utama/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pruviu di LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/pruviu.id/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pruviu di Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@pruviu.id"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pruviu di TikTok"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
              <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
            </svg>
          </a>
        </div>
        <div className="text-center text-white/60">
          <p className="text-sm md:text-base">
            &copy; 2026 PT Pruden Visi Utama. Hak Cipta Dilindungi.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <a
              href="/Privacy-Policy-Pruviu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Kebijakan Privasi
              <span className="sr-only"> (buka di tab baru)</span>
            </a>
            <a
              href="/General-Terms-and-Conditions-Pruviu%20.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Syarat & Ketentuan
              <span className="sr-only"> (buka di tab baru)</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}