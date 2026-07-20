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
                <Link href="/harga" className="hover:text-white transition-colors text-sm md:text-base">
                  Harga
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors text-sm md:text-base">
                  Keamanan
                </a>
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
              <li>
                <a href="https://www.linkedin.com/company/pt-pruden-visi-utama/jobs/" className="hover:text-white transition-colors text-sm md:text-base">
                  Karir
                </a>
              </li>
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
                <a href="#" className="hover:text-white transition-colors text-sm md:text-base">
                  Dokumentasi
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 md:pt-8 text-center text-white/60">
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