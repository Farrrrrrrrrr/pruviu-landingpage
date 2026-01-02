import Image from "next/image";
import Link from "next/link";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-6">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Pruviu Logo"
              width={180}
              height={60}
              priority
              className="drop-shadow-lg cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="inline-block px-6 py-3 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold shadow-sm">
            🚀 Segera Hadir
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-700 leading-tight">
            Terima Kasih Atas Antusiasme Anda
          </h1>
          
          <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed">
            <p>
              Kami sangat berterima kasih atas ketertarikan Anda terhadap <span className="font-semibold text-navy-600">Pruviu</span>. 
              Saat ini, platform kami masih dalam tahap pengembangan untuk memberikan pengalaman terbaik bagi Anda.
            </p>
            
            <p className="text-xl md:text-2xl font-semibold text-navy-600 py-4">
              Platform akan segera diluncurkan!
            </p>
            
            <p>
              Kami mengundang Anda untuk <span className="font-semibold text-navy-600">mengunjungi kembali halaman ini secara berkala</span> untuk 
              mendapatkan informasi terbaru tentang peluncuran resmi Pruviu.
            </p>
          </div>

          {/* CTA */}
          <div className="pt-8">
            <div className="inline-flex items-center space-x-2 px-8 py-4 bg-navy-600 text-white rounded-lg shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold text-lg">Nantikan Peluncuran Kami</span>
            </div>
          </div>

          {/* Reminder Box */}
          <div className="mt-12 p-6 bg-white rounded-xl shadow-md border-2 border-blue-100">
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-left">
                <h3 className="font-bold text-navy-700 text-lg mb-2">Jangan Lewatkan Kesempatan Bergabung!</h3>
                <p className="text-gray-600">
                  Pastikan untuk kembali ke halaman ini secara rutin agar Anda tidak melewatkan pengumuman peluncuran Pruviu 
                  dan menjadi salah satu pengguna pertama kami.
                </p>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="pt-8">
            <Link 
              href="/" 
              className="inline-flex items-center space-x-2 text-navy-600 hover:text-navy-700 font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-16 pb-8 text-gray-500 text-sm">
          <p>&copy; 2026 Pruviu. Hak Cipta Dilindungi.</p>
          <div className="mt-2">
            <a href="/privacy-policy" className="hover:text-navy-600 transition-colors">
              Kebijakan Privasi
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
