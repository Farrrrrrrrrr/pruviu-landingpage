import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-navy-700">
              Pruviu
            </Link>
            <Link 
              href="/" 
              className="px-6 py-2 text-navy-600 hover:text-navy-700 transition-colors font-medium"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </nav>
      </header>

      {/* Privacy Policy Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-navy-700 mb-4">Kebijakan Privasi</h1>
        <p className="text-gray-600 mb-8">Terakhir diperbarui: 31 Desember 2025</p>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">1. Pendahuluan</h2>
            <p className="text-gray-700 leading-relaxed">
              Selamat datang di Pruviu. Kami berkomitmen untuk melindungi privasi dan keamanan data pribadi Anda. 
              Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi 
              informasi pribadi Anda ketika Anda menggunakan aplikasi mobile Pruviu untuk platform verifikasi kredit koperasi.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">2. Informasi yang Kami Kumpulkan</h2>
            
            <h3 className="text-xl font-semibold text-navy-600 mb-3 mt-4">2.1 Informasi Pribadi</h3>
            <p className="text-gray-700 mb-2">Kami mengumpulkan informasi berikut:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Nama lengkap</li>
              <li>Nomor Induk Kependudukan (NIK)</li>
              <li>Nomor telepon dan alamat email</li>
              <li>Alamat tempat tinggal</li>
              <li>Informasi pekerjaan dan penghasilan</li>
              <li>Foto profil dan dokumen identitas (KTP, KK)</li>
              <li>Data biometrik (foto wajah untuk verifikasi identitas)</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy-600 mb-3 mt-4">2.2 Informasi Keuangan</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Riwayat kredit dan pinjaman</li>
              <li>Informasi rekening bank</li>
              <li>Riwayat transaksi koperasi</li>
              <li>Credit score dan assessment kredit</li>
              <li>Data SLIK OJK (Sistem Layanan Informasi Keuangan)</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy-600 mb-3 mt-4">2.3 Informasi Teknis</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Informasi perangkat (model, sistem operasi, versi aplikasi)</li>
              <li>Alamat IP dan lokasi geografis</li>
              <li>Log aktivitas aplikasi</li>
              <li>Cookie dan teknologi pelacakan serupa</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">3. Cara Kami Menggunakan Informasi</h2>
            <p className="text-gray-700 mb-2">Kami menggunakan informasi Anda untuk:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Melakukan verifikasi identitas dan kredit anggota koperasi</li>
              <li>Menghitung credit score dan kelayakan kredit</li>
              <li>Mencegah penipuan dan aktivitas yang mencurigakan (anti-fraud)</li>
              <li>Melakukan pengecekan riwayat kredit melalui koperasi lain</li>
              <li>Mengintegrasikan data dengan SLIK OJK</li>
              <li>Meningkatkan keamanan dan fungsionalitas aplikasi</li>
              <li>Memberikan dukungan pelanggan</li>
              <li>Mematuhi kewajiban hukum dan regulasi</li>
              <li>Mengirimkan notifikasi penting terkait layanan</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">4. Pembagian Informasi</h2>
            <p className="text-gray-700 mb-2">Kami dapat membagikan informasi Anda dengan:</p>
            
            <h3 className="text-xl font-semibold text-navy-600 mb-3 mt-4">4.1 Koperasi Terdaftar</h3>
            <p className="text-gray-700 mb-2">
              Informasi kredit dan riwayat keuangan Anda dapat dibagikan kepada koperasi yang terdaftar dalam sistem 
              untuk tujuan verifikasi dan pencegahan fraud.
            </p>

            <h3 className="text-xl font-semibold text-navy-600 mb-3 mt-4">4.2 Otoritas Jasa Keuangan (OJK)</h3>
            <p className="text-gray-700 mb-2">
              Kami bekerja sama dengan OJK dan dapat mengakses serta membagikan informasi melalui sistem SLIK OJK 
              sesuai dengan regulasi yang berlaku.
            </p>

            <h3 className="text-xl font-semibold text-navy-600 mb-3 mt-4">4.3 Penyedia Layanan Pihak Ketiga</h3>
            <p className="text-gray-700 mb-2">
              Kami dapat menggunakan penyedia layanan pihak ketiga untuk mendukung operasional kami, seperti:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Penyedia cloud hosting dan penyimpanan data</li>
              <li>Penyedia layanan analitik</li>
              <li>Penyedia layanan verifikasi identitas</li>
              <li>Penyedia layanan keamanan siber</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy-600 mb-3 mt-4">4.4 Kewajiban Hukum</h3>
            <p className="text-gray-700 mb-2">
              Kami dapat mengungkapkan informasi Anda jika diwajibkan oleh hukum, perintah pengadilan, atau 
              proses hukum lainnya.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">5. Keamanan Data</h2>
            <p className="text-gray-700 mb-2">
              Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang sesuai untuk melindungi 
              data pribadi Anda, termasuk:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Enkripsi data end-to-end menggunakan protokol TLS/SSL</li>
              <li>Penyimpanan data terenkripsi di server yang aman</li>
              <li>Kontrol akses berbasis peran (RBAC)</li>
              <li>Autentikasi multi-faktor (MFA)</li>
              <li>Audit keamanan dan penetration testing berkala</li>
              <li>Backup data secara teratur</li>
              <li>Monitoring sistem 24/7 untuk mendeteksi aktivitas mencurigakan</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Meskipun kami mengambil langkah-langkah untuk melindungi data Anda, tidak ada metode transmisi 
              atau penyimpanan elektronik yang 100% aman. Kami tidak dapat menjamin keamanan mutlak.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">6. Penyimpanan Data</h2>
            <p className="text-gray-700">
              Kami menyimpan data pribadi Anda selama diperlukan untuk tujuan yang dijelaskan dalam kebijakan ini, 
              atau sesuai dengan kewajiban hukum yang berlaku. Data kredit dan riwayat keuangan akan disimpan 
              minimal 5 (lima) tahun sesuai dengan regulasi OJK. Setelah periode penyimpanan berakhir, data Anda 
              akan dihapus atau dianonimkan secara permanen.
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">7. Hak Pengguna</h2>
            <p className="text-gray-700 mb-2">Anda memiliki hak untuk:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Akses:</strong> Meminta salinan data pribadi yang kami simpan tentang Anda</li>
              <li><strong>Koreksi:</strong> Meminta perbaikan data yang tidak akurat atau tidak lengkap</li>
              <li><strong>Penghapusan:</strong> Meminta penghapusan data pribadi Anda (dengan keterbatasan tertentu)</li>
              <li><strong>Pembatasan:</strong> Meminta pembatasan pemrosesan data Anda</li>
              <li><strong>Portabilitas:</strong> Menerima data Anda dalam format yang terstruktur dan umum digunakan</li>
              <li><strong>Keberatan:</strong> Menolak pemrosesan data pribadi Anda dalam situasi tertentu</li>
              <li><strong>Penarikan Persetujuan:</strong> Menarik persetujuan kapan saja (jika pemrosesan berdasarkan persetujuan)</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Untuk menggunakan hak-hak ini, silakan hubungi kami melalui informasi kontak yang tercantum di bawah.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">8. Privasi Anak-anak</h2>
            <p className="text-gray-700">
              Layanan kami tidak ditujukan untuk individu di bawah usia 17 tahun. Kami tidak secara sengaja 
              mengumpulkan informasi pribadi dari anak-anak. Jika Anda adalah orang tua atau wali dan mengetahui 
              bahwa anak Anda telah memberikan informasi pribadi kepada kami, silakan hubungi kami.
            </p>
          </section>

          {/* Consent */}
          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">9. Persetujuan</h2>
            <p className="text-gray-700">
              Dengan menggunakan aplikasi Pruviu, Anda menyetujui pengumpulan dan penggunaan informasi sesuai 
              dengan Kebijakan Privasi ini. Untuk beberapa jenis data sensitif, kami akan meminta persetujuan 
              eksplisit Anda sebelum pengumpulan atau pemrosesan. Anda dapat menarik persetujuan Anda kapan saja, 
              namun ini dapat mempengaruhi kemampuan Anda untuk menggunakan layanan tertentu.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">10. Tautan Pihak Ketiga</h2>
            <p className="text-gray-700">
              Aplikasi kami mungkin berisi tautan ke situs web atau layanan pihak ketiga. Kami tidak bertanggung 
              jawab atas praktik privasi atau konten situs web pihak ketiga. Kami mendorong Anda untuk membaca 
              kebijakan privasi setiap situs web yang Anda kunjungi.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">11. Perubahan Kebijakan</h2>
            <p className="text-gray-700">
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan perubahan dalam 
              praktik kami atau untuk alasan operasional, hukum, atau regulasi lainnya. Kami akan memberi tahu 
              Anda tentang perubahan material melalui notifikasi dalam aplikasi atau email. Penggunaan berkelanjutan 
              Anda atas layanan kami setelah perubahan tersebut akan dianggap sebagai penerimaan terhadap kebijakan 
              yang diperbarui.
            </p>
          </section>

          {/* Legal Basis */}
          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">12. Dasar Hukum</h2>
            <p className="text-gray-700 mb-2">
              Pemrosesan data pribadi Anda didasarkan pada:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi</li>
              <li>Peraturan OJK tentang Perlindungan Konsumen Sektor Jasa Keuangan</li>
              <li>UU No. 25 Tahun 1992 tentang Perkoperasian</li>
              <li>Peraturan terkait lainnya yang berlaku di Indonesia</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">13. Hubungi Kami</h2>
            <p className="text-gray-700 mb-4">
              Jika Anda memiliki pertanyaan, kekhawatiran, atau permintaan terkait Kebijakan Privasi ini atau 
              praktik data kami, silakan hubungi kami:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg space-y-2">
              <p className="text-gray-700"><strong>Pruviu</strong></p>
              <p className="text-gray-700">Email: privacy@pruviu.com</p>
              <p className="text-gray-700">Telepon: +62 21 1234 5678</p>
              <p className="text-gray-700">Alamat: Jakarta, Indonesia</p>
              <p className="text-gray-700">Jam Operasional: Senin - Jumat, 09:00 - 17:00 WIB</p>
            </div>
            <p className="text-gray-700 mt-4">
              Kami akan merespons permintaan Anda dalam waktu 14 (empat belas) hari kerja.
            </p>
          </section>

          {/* Data Protection Officer */}
          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">14. Petugas Perlindungan Data</h2>
            <p className="text-gray-700 mb-4">
              Kami telah menunjuk Petugas Perlindungan Data (Data Protection Officer) yang dapat dihubungi untuk 
              masalah terkait perlindungan data:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg space-y-2">
              <p className="text-gray-700">Email: dpo@pruviu.com</p>
              <p className="text-gray-700">Telepon: +62 21 1234 5679</p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="bg-navy-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-navy-700 mb-3">Pengakuan</h2>
            <p className="text-gray-700">
              Dengan menggunakan aplikasi Pruviu, Anda mengakui bahwa Anda telah membaca, memahami, dan menyetujui 
              untuk terikat dengan Kebijakan Privasi ini. Jika Anda tidak setuju dengan kebijakan ini, mohon untuk 
              tidak menggunakan layanan kami.
            </p>
          </section>
        </div>

        {/* Back to Home Button */}
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="inline-block px-8 py-3 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-navy-700 text-white mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-gray-300">
            <p>&copy; 2025 Pruden Visi Utama. Semua hak cipta dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
