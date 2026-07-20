import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi Pruviu: bagaimana PT Pruden Visi Utama mengumpulkan, menggunakan, dan melindungi data pengguna platform verifikasi kredit dan mitigasi risiko koperasi.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader currentPath="/privacy-policy" />

      <main id="main-content">

      {/* Privacy Policy Content */}
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-navy-700 mb-4">
          Kebijakan Privasi
        </h1>
        <p className="text-gray-600 mb-8">
          Terakhir diperbarui: 22 Januari 2026
        </p>

        <div className="bg-white rounded-lg shadow-sm p-5 md:p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">
              1. Ketentuan Umum
            </h2>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>1.1</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Pruviu adalah platform elektronik yang menyediakan layanan
                  berupa (a) perangkat lunak klien Pruviu yang tersedia melalui
                  situs dan (b) semua informasi, halaman tertaut, fitur, data,
                  teks, gambar, foto, grafik, pemrograman, perangkat lunak,
                  layanan aplikasi (termasuk namun tidak terbatas pada, setiap
                  layanan aplikasi mobile) atau materi lainnya yang tersedia
                  melalui situs atau layanan terkait (&ldquo;Layanan&rdquo;) yang telah
                  terdaftar di Kementerian Komunikasi dan Digital sebagai
                  Penyelenggara Sistem Elektronik (PSE) atas nama PT Pruden Visi
                  Utama.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>1.2</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Kebijakan privasi layanan ini (“Kebijakan Privasi”) adalah
                  ketentuan umum dari Pruviu yang diberlakukan untuk Pengguna
                  Pruviu (“Pengguna”). Pengguna harus membaca Kebijakan Privasi
                  ini dengan seksama. Untuk mengakses atau menggunakan layanan
                  Pruviu, Pengguna harus menerima, mengerti, dan menyetujui atas
                  seluruh isi Kebijakan Privasi ini. Jika Pengguna tidak
                  menyetujui, seluruh layanan akan berhenti dan Pengguna tidak
                  akan mendapatkan layanan apapun dari Pruviu. Kebijakan ini
                  menjelaskan informasi yang Pruviu proses untuk mendukung
                  Pruviu dan produk serta fitur lainnya yang ditawarkan oleh
                  Pruviu. Pengguna dapat menemukan fitur dan informasi tambahan
                  di situs web Pruviu.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>1.3</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Dengan mendaftarkan akun pada platform Pruviu, memberikan
                  persetujuan secara eksplisit (dengan mencentang ketentuan
                  Kebijakan Privasi ini pada platform Pruviu), dan menggunakan
                  layanan Pruviu, Pengguna mengakui dan menyetujui bahwa
                  Pengguna menerima praktik, persyaratan, dan/atau kebijakan
                  yang diuraikan dalam Kebijakan Privasi ini dan dengan ini
                  mengizinkan Pruviu untuk memperoleh dan mengumpulkan data
                  pribadi, mentransfer data pribadi, melakukan pemrosesan data
                  pribadi secara otomatis, mengungkapkan data pribadi, menyimpan
                  data pribadi, menghapus data pribadi, dan memusnahkan data
                  pribadi seperti yang dijelaskan di bawah ini.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">
              2. Kepatuhan
            </h2>
            <p>
              Kepatuhan Pruviu atas ketentuan hukum yang berlaku untuk
              menjalankan layanan dalam memperoleh dan mengumpulkan data
              pribadi, mentransfer data pribadi, pemrosesan data pribadi secara
              otomatis, mengungkapkan data pribadi, menyimpan data pribadi,
              menghapus data pribadi, dan memusnahkan data pribadi serta menjaga
              kerahasiaan dan keamanan data pribadi sebagaimana diatur dalam:
            </p>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>a.</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Undang-Undang Nomor 11 Tahun 2008 tentang Informasi dan
                  Transaksi Elektronik sebagaimana diubah dengan Undang-Undang
                  Nomor 19 Tahun 2016 tentang Perubahan atas Undang-Undang Nomor
                  11 Tahun 2008 tentang Informasi dan Transaksi Elektronik dan
                  Undang-Undang Nomor 1 Tahun 2024 tentang Perubahan Kedua atas
                  Undang-Undang Nomor 11 Tahun 2008 tentang Informasi dan
                  Transaksi Elektronik.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>b.</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Undang-Undang nomor 27 tahun 2022 tentang Perlindungan Data
                  Pribadi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>c.</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Peraturan Pemerintah Nomor 71 tahun 2019 tentang
                  Penyelenggaraan Sistem dan Transaksi Elektronik.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>d.</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Peraturan Menteri Komunikasi dan Informatika Nomor 20 Tahun
                  2016 tentang Perlindungan Data Pribadi dalam Sistem
                  Elektronik.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">
              3. Informasi Pengendali Data Pribadi{" "}
            </h2>
            {/* <p>
              Kepatuhan Pruviu atas ketentuan hukum yang berlaku untuk
              menjalankan layanan dalam memperoleh dan mengumpulkan data
              pribadi, mentransfer data pribadi, pemrosesan data pribadi secara
              otomatis, mengungkapkan data pribadi, menyimpan data pribadi,
              menghapus data pribadi, dan memusnahkan data pribadi serta menjaga
              kerahasiaan dan keamanan data pribadi sebagaimana diatur dalam:
            </p> */}

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>3.1</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  PT Pruden Visi Utama, perusahaan yang bergerak di bidang
                  layanan integrator penyedia jasa informasi perkreditan secara
                  elektronik dan telah terdaftar di Kementerian Komunikasi dan
                  Digital sebagai Penyelenggara Sistem Elektronik (PSE)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>3.2</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Pruviu tunduk kepada ketentuan hukum yang berlaku dalam
                  memperoleh dan mengumpulkan data pribadi, mentransfer data
                  pribadi, melakukan pemrosesan data pribadi secara otomatis,
                  mengungkapkan data pribadi, menyimpan data pribadi, menghapus
                  data pribadi, dan memusnahkan data pribadi.
                </p>
              </div>
            </div>

            {/* <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>c.</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Peraturan Pemerintah Nomor 71 tahun 2019 tentang
                  Penyelenggaraan Sistem dan Transaksi Elektronik.
                </p>
              </div>
            </div> */}

            {/* <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>d.</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Peraturan Menteri Komunikasi dan Informatika Nomor 20 Tahun
                  2016 tentang Perlindungan Data Pribadi dalam Sistem
                  Elektronik.
                </p>
              </div>
            </div> */}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">
              4. Informasi Data Pribadi Pengguna{" "}
            </h2>
            {/* <p>
              Kepatuhan Pruviu atas ketentuan hukum yang berlaku untuk
              menjalankan layanan dalam memperoleh dan mengumpulkan data
              pribadi, mentransfer data pribadi, pemrosesan data pribadi secara
              otomatis, mengungkapkan data pribadi, menyimpan data pribadi,
              menghapus data pribadi, dan memusnahkan data pribadi serta menjaga
              kerahasiaan dan keamanan data pribadi sebagaimana diatur dalam:
            </p> */}

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>4.1</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Data pribadi Pengguna diperoleh ketika:
                </p>

                <div className="flex items-start gap-4">
                  <div className="w-12 min-w-[3rem] text-right pt-1">
                    <strong>4.1.1</strong>
                  </div>
                  <div className="flex-2">
                    <p className="text-gray-700 leading-relaxed mb-0">
                      Pengguna mendaftar akun pada Pruviu;{" "}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 min-w-[3rem] text-right pt-1">
                    <strong>4.1.2</strong>
                  </div>
                  <div className="flex-2">
                    <p className="text-gray-700 leading-relaxed mb-0">
                      Pengguna mengisi informasi sewaktu menggunakan layanan
                      pada Pruviu, mengirimkan formulir apapun yang berkaitan
                      dengan produk dan layanan Pruviu, baik secara online
                      maupun dalam bentuk fisik;{" "}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 min-w-[3rem] text-right pt-1">
                    <strong>4.1.3</strong>
                  </div>
                  <div className="flex-2">
                    <p className="text-gray-700 leading-relaxed mb-0">
                      Pengguna membuat perjanjian atau memberikan dokumen atau
                      informasi lainnya sehubungan dengan interaksi Pengguna
                      dengan Pruviu;
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 min-w-[3rem] text-right pt-1">
                    <strong>4.1.4</strong>
                  </div>
                  <div className="flex-2">
                    <p className="text-gray-700 leading-relaxed mb-0">
                      Pengguna berinteraksi dengan customer service dan/atau
                      chatbot Pruviu;
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 min-w-[3rem] text-right pt-1">
                    <strong>4.1.5</strong>
                  </div>
                  <div className="flex-2">
                    <p className="text-gray-700 leading-relaxed mb-0">
                      Pengguna menggunakan layanan elektronik, berinteraksi,
                      atau menggunakan layanan Pruviu;
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 min-w-[3rem] text-right pt-1">
                    <strong>4.1.6</strong>
                  </div>
                  <div className="flex-2">
                    <p className="text-gray-700 leading-relaxed mb-0">
                      Pengguna memberikan izin pada perangkat untuk berbagi
                      informasi dengan Pruviu;
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 min-w-[3rem] text-right pt-1">
                    <strong>4.1.7</strong>
                  </div>
                  <div className="flex-2">
                    <p className="text-gray-700 leading-relaxed mb-0">
                      Pengguna menautkan akun Pruviu dengan media sosial atau
                      akun eksternal lainnya atau menggunakan fitur media sosial
                      lainnya, sesuai dengan kebijakan penyedia;
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 min-w-[3rem] text-right pt-1">
                    <strong>4.1.8</strong>
                  </div>
                  <div className="flex-2">
                    <p className="text-gray-700 leading-relaxed mb-0">
                      Pengguna melakukan transaksi dengan layanan Pruviu; atau
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 min-w-[3rem] text-right pt-1">
                    <strong>4.1.9</strong>
                  </div>
                  <div className="flex-2">
                    <p className="text-gray-700 leading-relaxed mb-0">
                      Pengguna mengirimkan data pribadi kepada Pruviu dengan
                      alasan apapun.
                    </p>
                  </div>
                </div>
                <p>
                  Daftar di atas tidak dimaksudkan sebagai suatu daftar yang
                  lengkap dan hanya menetapkan beberapa contoh umum tentang
                  kapan data pribadi Pengguna mungkin diambil.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>4.2</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Data pribadi Pengguna yang dikelola oleh Pruviu, antara lain:
                </p>
                <div className="flex items-start gap-4">
                  <div className="w-12 min-w-[3rem] text-right pt-1">
                    <strong>4.2.1</strong>
                  </div>
                  <div className="flex-2">
                    <p className="text-gray-700 leading-relaxed mb-0">
                      Data identitas termasuk nama, nama pengguna, kata sandi,
                      kartu tanda penduduk, nomor pokok wajib pajak, kartu
                      keluarga, identitas pengguna atau pengenal lainnya,
                      jabatan, tanggal kelahiran, jenis kelamin, tempat
                      kelahiran, pekerjaan, kebangsaan, foto dan/atau data
                      biometrik.{" "}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 min-w-[3rem] text-right pt-1">
                    <strong>4.2.2</strong>
                  </div>
                  <div className="flex-2">
                    <p className="text-gray-700 leading-relaxed mb-0">
                      Data kontak termasuk alamat penagihan, alamat email, nomor
                      telepon dan daftar kontak.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 min-w-[3rem] text-right pt-1">
                    <strong>4.2.3</strong>
                  </div>
                  <div className="flex-2">
                    <p className="text-gray-700 leading-relaxed mb-0">
                      Data transaksi termasuk pembelian atau pesanan yang
                      Pengguna lakukan, minat, preferensi, masukan, dan
                      tanggapan survei Pengguna, sehubungan dengan Pengguna,
                      jenis layanan yang dicari, rincian pembayaran atau
                      transfer yang dilakukan oleh Pengguna pada Pruviu,
                      termasuk namun tidak terbatas pada data yang berkaitan
                      dengan penggunaan, pembayaran, rincian penerima (termasuk
                      rincian rekening Pengguna), metode pembayaran yang
                      digunakan, jumlah pembayaran yang dibayarkan, rincian
                      tagihan, dan rincian faktur.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 min-w-[3rem] text-right pt-1">
                    <strong>4.2.4</strong>
                  </div>
                  <div className="flex-2">
                    <p className="text-gray-700 leading-relaxed mb-0">
                      Data teknis termasuk rincian tentang penggunaan Pengguna
                      atas Layanan Pruviu seperti identifikasi yang dihasilkan
                      oleh Pruviu (user ID), alamat protokol internet (IP), data
                      sebagai halaman web yang dilihat sebelumnya atau
                      sesudahnya, durasi setiap kunjungan/sesi, identitas (ID)
                      perangkat internet atau alamat kontrol akses media, ID
                      periklanan dan informasi perangkat lainnya termasuk
                      informasi mengenai produsen, model, dan sistem operasi
                      perangkat yang Pengguna gunakan untuk mengakses Pruviu dan
                      crash logs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 min-w-[3rem] text-right pt-1">
                    <strong>4.2.5</strong>
                  </div>
                  <div className="flex-2">
                    <p className="text-gray-700 leading-relaxed mb-0">
                      Data perangkat termasuk data perangkat, diantaranya jenis
                      perangkat yang Pengguna gunakan untuk mengakses Pruviu,
                      termasuk model perangkat keras, sistem operasi dan
                      versinya, perangkat lunak, nomor IMEI, nama file dan
                      versinya, pilihan bahasa, pengenal perangkat unik,
                      pengenal iklan, nomor seri, informasi gerakan perangkat,
                      dan/atau informasi jaringan seluler.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 min-w-[3rem] text-right pt-1">
                    <strong>4.2.6</strong>
                  </div>
                  <div className="flex-2">
                    <p className="text-gray-700 leading-relaxed mb-0">
                      Data aktivitas (log) termasuk catatan pada server yang
                      menerima data seperti IP Address perangkat, tanggal dan
                      waktu akses, fitur Pruviu atau laman yang dilihat, proses
                      kerja Pruviu dan aktivitas sistem lainnya, jenis peramban
                      (browser), dan/atau situs atau layanan pihak ketiga yang
                      Pengguna gunakan sebelum berinteraksi dengan Pruviu.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 min-w-[3rem] text-right pt-1">
                    <strong>4.2.7</strong>
                  </div>
                  <div className="flex-2">
                    <p className="text-gray-700 leading-relaxed mb-0">
                      Data lokasi termasuk data lokasi geografis waktu-nyata
                      (real-time) Pengguna, titik koordinat lokasi berupa
                      longitude latitude, dan lokasi Wi-Fi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">
              5. Penyimpanan Data Pribadi
            </h2>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>5.1</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Seluruh data pribadi Pengguna yang telah diberikan kepada
                  Pruviu disimpan di perangkat dan fasilitas Pruviu dan pihak
                  ketiga (anak perusahaan, afiliasi, dan itra Pruviu) yang
                  berada di wilayah hukum Negara Republik Indonesia.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>5.2</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Perangkat penyimpanan memiliki standar keamanan yang
                  menerapkan sistem enkripsi Advanced Encryption Standard (AES)
                  256.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>5.3</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Masa penyimpanan data pribadi Pengguna adalah selama masa
                  aktif akun Pengguna.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>5.4</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Masa retensi data pribadi Pengguna adalah sesingkat-singkatnya
                  10 (sepuluh) tahun.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">
              6. Pengungkapan Data Pribadi{" "}
            </h2>
            <p>
              Priviu tidak akan mengungkapkan data pribadi Pengguna kecuali
              dengan persetujuan tertulis Pengguna atau atas suatu kewajiban
              menurut ketentuan hukum yang berlaku dan/atau perintah pengadilan.
              Pengguna membebaskan Pruviu dari segala tuntutan terhadap akibat
              yang dapat timbul dari pengungkapan data pribadi tersebut.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">
              7. Pemrosesan Data Pribadi secara Otomatis{" "}
            </h2>
            <p>
              Pruviu dapat menerapkan pemrosesan data pribadi secara otomatis
              menggunakan artificial intelligence dengan metode machine learning
              dan natural language processing. Pemrosesan data pribadi secara
              otomatis yang diterapkan Pruviu telah dilakukan dengan tunduk pada
              pedoman maupun kode etik penggunaan artificial intelligence di
              Indonesia. Tindakan ini dilakukan untuk mengembangkan promosi
              produk, penawaran-penawaran yang dapat diberikan kepada Pengguna
              sesuai preferensi masing-masing yang lebih personal, dan dalam
              pengembangan chatbot untuk memfasilitasi kebutuhan Pengguna
              Pruviu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">
              8. Hak Pengguna Sebagai Subjek Data Pribadi
            </h2>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>8.1</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Pengguna memiliki hak tertentu berdasarkan ketentuan hukum
                  yang berlaku untuk meminta kepada Pruviu terhadap akses,
                  koreksi, penarikan persetujuan, dan penghapusan dan/atau
                  pemusnahan terhadap data pribadi Pengguna yang berada dalam
                  penguasaan dan kendali Pruviu.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>8.2</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Pruviu dapat menolak permintaan Pengguna terhadap akses,
                  koreksi, dan penghapusan dan/atau pemusnahan terhadap data
                  pribadi Pengguna yang Pruviu kuasai atau kendalikan jika
                  diperbolehkan atau diperlukan berdasarkan ketentuan hukum yang
                  berlaku. Hal ini termasuk dalam keadaan di mana data pribadi
                  tersebut dapat berisi referensi kepada orang lain atau di mana
                  permintaan untuk akses atau permintaan untuk mengoreksi atau
                  menghapus dan/atau memusnahkan adalah untuk alasan yang Pruviu
                  anggap tidak relevan, tidak serius, mengada-ada, atau
                  terindikasi terkait dengan tindakan pelanggaran syarat dan
                  ketentuan atau pelanggaran ketentuan hukum yang berlaku.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>8.3</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Mekanisme terkait hak sebagaimana dimaksud pada Bagian [8.1]
                  dapat dilakukan dengan menggunakan fitur yang tersedia di
                  Pruviu.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>8.4</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Pengguna berhak untuk mengetahui standar keamanan yang
                  digunakan oleh Pruviu dan pihak ketiga (anak perusahaan,
                  afiliasi, dan perusahaan terkait dengan Pruviu) yang
                  memberikan layanan dukungan bisnis Pruviu. Terkait dengan hal
                  tersebut, Pengguna dapat mengunjungi situs web [*web address].
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>8.5</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Apabila Pengguna sudah menyerahkan data pribadinya dan tidak
                  meneruskan proses selanjutnya dalam proses pendaftaran akun
                  dalam jangka waktu 2 (dua) minggu, maka data pribadinya akan
                  dimusnahkan oleh sistem.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">
              9. Kerahasiaan Data Pribadi{" "}
            </h2>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>9.1</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Informasi rahasia berarti informasi Pengguna, baik yang
                  bersifat pribadi atau sifat lainnya.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>9.2</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Ketika Pruviu diwajibkan oleh peraturan perundang-undangan
                  untuk mengungkapkan informasi rahasia, maka Pruviu akan
                  memberikan pemberitahuan tertulis kepada Pengguna sebelum
                  pengungkapan data akan dilakukan, kecuali jika dilarang
                  melakukan hal tersebut oleh ketentuan hukum yang berlaku atau
                  melalui proses hukum.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>9.3</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Pruviu berhak melakukan penghentian Layanan secara sementara
                  apabila terdapat indikasi pelanggaran terhadap Kebijakan
                  Privasi ini maupun kegagalan data pribadi.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">
              10. Pihak Ketiga{" "}
            </h2>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>10.1</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Pruviu dapat menggunakan, memproses, mengungkapkan, dan/atau
                  mengalihkan data pribadi Pengguna kepada penyedia layanan
                  pihak ketiga, agen dan/atau afiliasi atau perusahaan terkait
                  dengan Pruviu, dan/atau pihak ketiga lainnya, yang dapat
                  berlokasi di Indonesia atau di luar Indonesia. Penyedia
                  layanan pihak ketiga, agen dan/atau afiliasi atau perusahaan
                  terkait dan/atau pihak ketiga lainnya tersebut akan mengolah
                  data pribadi Pengguna atas nama Pruviu atau pihak lainnya
                  untuk tujuan yang sah secara hukum. Pruviu memastikan bahwa
                  pihak ketiga menjaga keamanan data pribadi Pengguna dari
                  segala perlakuan yang tidak sah atau resiko serupa dan
                  menyimpan data pribadi Pengguna hanya selama data pribadi
                  Pengguna dibutuhkan untuk tujuan yang telah ditetapkan. Pihak
                  ketiga tersebut termasuk, namun tidak terbatas pada:
                </p>
                <div className="flex items-start gap-4">
                  <div className="w-12 min-w-[3rem] text-right pt-1">
                    <strong>10.1.1</strong>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed mb-0">
                      anak perusahaan, afiliasi, dan perusahaan terkait Pruviu;
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 min-w-[3rem] text-right pt-1">
                    <strong>10.1.2</strong>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed mb-0">
                      pembeli atau penerus lainnya dalam hal terjadi
                      penggabungan, divestasi, restrukturisasi, reorganisasi,
                      pembubaran, atau pengalihan lainnya atas beberapa atau
                      semua aset Pruviu, baik secara berkelanjutan atau sebagai
                      bagian dari kepailitan, likuidasi, atau proses serupa, di
                      mana data pribadi yang dimiliki oleh Pruviu tentang
                      Pengguna adalah salah satu aset yang dialihkan atau kepada
                      rekanan dalam suatu transaksi aset bisnis yang melibatkan
                      Pruviu; dan
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 min-w-[3rem] text-right pt-1">
                    <strong>10.1.3</strong>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed mb-0">
                      penyedia layanan dan pihak ketiga lainnya yang Pruviu
                      gunakan untuk mendukung bisnis dan layanan Pruviu terhadap
                      Pengguna.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>10.2</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Dalam melibatkan pihak ketiga, Pruviu harus mendapatkan
                  persetujuan secara eksplisit dari Pengguna, kecuali ditentukan
                  lain oleh ketentuan hukum yang berlaku.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>10.3</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Pruviu dapat menggunakan, memproses, mengungkapkan, dan/atau
                  mengalihkan data pribadi Pengguna kepada otoritas yang
                  berwenang apabila diwajibkan oleh ketentuan hukum yang
                  berlaku. Dalam hal ini, Pruviu akan memberikan pemberitahuan
                  kepada Pengguna bahwa data pribadinya digunakan, diproses,
                  diungkap, dan/atau dialihkan kepada otoritas yang berwenang.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">
              11. Perubahan Kebijakan Privasi
            </h2>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>11.1</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Pruviu dapat memperbarui atau mengubah isi Kebijakan Privasi
                  pada masa waktu tertentu tanpa ada pemberitahuan sebelumnya,
                  baik sebagian atau seluruhnya. Perubahan Kebijakan Privasi
                  akan berlaku sejak tanggal pengesahannya.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>11.2</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Pengguna berhak untuk memberikan persetujuannya terhadap
                  perubahan Kebijakan Privasi dalam Pruviu. Apabila Pengguna
                  tidak menyetujui perubahan tersebut, maka Pengguna dapat
                  melakukan pengakhiran layanan dan/atau akun pada Pruviu.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 min-w-[3rem] text-right pt-1">
                <strong>11.3</strong>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-0">
                  Dengan tunduk pada Kebijakan Privasi ini, Pruviu akan
                  memberikan layanan dan hak kepada setiap Pengguna.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">
              12. Informasi dan Keluhan
            </h2>
            <p>
              Seluruh informasi lainnya mengenai Kebijakan Privasi dan data
              pribadi Pengguna serta keluhan Pengguna dapat diperoleh dan
              disampaikan pada: 
              </p>
              <p>alamat; Jalan Daksa V No. 5, Selong, Kebayoran
              Baru Jakarta Selatan, DKI Jakarta 12110, Indonesia. 
              </p>
              <p>email:support@pruviu.com
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
      </main>

      <SiteFooter />
    </div>
  );
}
