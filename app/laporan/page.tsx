import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

const title = "Laporan & Permintaan Hak Subjek Data";
const description =
  "Ajukan permintaan hak Anda sebagai Subjek Data Pribadi kepada Pruviu sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/laporan",
  },
  openGraph: {
    title: `${title} | Pruviu`,
    description,
    url: "https://pruviu.com/laporan",
    type: "website",
    locale: "id_ID",
    siteName: "Pruviu",
    images: [
      {
        url: "/pruviu-logo-redblue.png",
        width: 1200,
        height: 630,
        alt: "Pruviu - Platform Anti Fraud Koperasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Pruviu`,
    description,
    images: ["/pruviu-logo-redblue.png"],
  },
};

const REQUEST_EMAIL = "personaldata.enquiry@pruviu.com";
const REQUEST_MAILTO = `mailto:${REQUEST_EMAIL}?subject=%5BPDP%5D%20Permintaan%20Hak%20Subjek%20Data`;

const rights: Array<{ pasal: string; nama: string; isi: string }> = [
  {
    pasal: "Pasal 5",
    nama: "Hak atas Informasi",
    isi: "Memperoleh kejelasan mengenai identitas kami, dasar kepentingan hukum, tujuan permintaan dan penggunaan Data Pribadi, serta akuntabilitas pihak yang mengajukan permintaan.",
  },
  {
    pasal: "Pasal 6",
    nama: "Hak Melengkapi & Memperbaiki",
    isi: "Melengkapi, memperbarui, dan/atau memperbaiki kesalahan atau ketidakakuratan Data Pribadi Anda yang kami proses, sesuai dengan tujuan pemrosesannya.",
  },
  {
    pasal: "Pasal 7",
    nama: "Hak Akses & Salinan",
    isi: "Memperoleh akses dan salinan Data Pribadi Anda yang kami proses, sepanjang sesuai dengan ketentuan peraturan perundang-undangan.",
  },
  {
    pasal: "Pasal 8",
    nama: "Hak Mengakhiri & Menghapus",
    isi: "Mengakhiri pemrosesan, menghapus, dan/atau memusnahkan Data Pribadi Anda sesuai dengan ketentuan peraturan perundang-undangan.",
  },
  {
    pasal: "Pasal 9",
    nama: "Hak Menarik Persetujuan",
    isi: "Menarik kembali persetujuan pemrosesan Data Pribadi yang sebelumnya telah Anda berikan kepada kami.",
  },
  {
    pasal: "Pasal 10",
    nama: "Hak Keberatan atas Keputusan Otomatis",
    isi: "Mengajukan keberatan atas tindakan pengambilan keputusan yang hanya didasarkan pada pemrosesan otomatis, termasuk pemrofilan (profiling) seperti penilaian skor kredit, yang menimbulkan akibat hukum atau berdampak signifikan terhadap Anda.",
  },
  {
    pasal: "Pasal 11",
    nama: "Hak Menunda & Membatasi",
    isi: "Menunda atau membatasi pemrosesan Data Pribadi Anda secara proporsional sesuai dengan tujuan pemrosesan Data Pribadi.",
  },
  {
    pasal: "Pasal 12",
    nama: "Hak Menuntut Ganti Rugi",
    isi: "Menuntut dan menerima ganti rugi atas pelanggaran pemrosesan Data Pribadi Anda sesuai dengan ketentuan peraturan perundang-undangan.",
  },
  {
    pasal: "Pasal 13",
    nama: "Hak Portabilitas Data",
    isi: "Memperoleh dan/atau menggunakan Data Pribadi Anda dari kami dalam bentuk yang sesuai dengan struktur dan/atau format yang lazim digunakan serta dapat dibaca oleh sistem elektronik, serta mengirimkannya kepada Pengendali Data Pribadi lain, sepanjang sistem tersebut saling terhubung secara aman.",
  },
];

const requiredFields: string[] = [
  "Nama lengkap sesuai identitas resmi (KTP)",
  "Nomor Induk Kependudukan (NIK)",
  "Nomor telepon dan alamat email aktif yang terdaftar pada layanan",
  "Nama koperasi tempat Anda terdaftar sebagai anggota (jika ada)",
  "Jenis hak yang Anda ajukan (lihat daftar Pasal 5 sampai Pasal 13 di atas)",
  "Uraian singkat permintaan Anda, termasuk data spesifik yang dimaksud",
  "Hasil pindai atau foto KTP Anda untuk keperluan verifikasi identitas",
];

const steps: Array<{ nomor: string; judul: string; isi: string }> = [
  {
    nomor: "1",
    judul: "Pengajuan",
    isi: `Kirimkan permintaan Anda melalui email ke ${REQUEST_EMAIL} dengan subjek diawali [PDP], atau melalui kanal WhatsApp dan Call Center kami.`,
  },
  {
    nomor: "2",
    judul: "Verifikasi Identitas",
    isi: "Kami wajib memastikan permintaan benar-benar berasal dari Subjek Data yang bersangkutan. Kami akan menghubungi Anda untuk verifikasi. Permintaan yang tidak dapat diverifikasi akan kami tolak demi melindungi data Anda.",
  },
  {
    nomor: "3",
    judul: "Penelaahan",
    isi: "Kami menelaah permintaan Anda terhadap dasar hukum pemrosesan, kewajiban retensi, dan pembatasan yang berlaku pada sektor jasa keuangan.",
  },
  {
    nomor: "4",
    judul: "Tanggapan",
    isi: "Kami menyampaikan hasil secara tertulis. Apabila permintaan ditolak seluruhnya atau sebagian, kami menjelaskan alasan penolakan beserta dasar hukumnya.",
  },
];

const escalations: Array<{ lembaga: string; keterangan: string; kontak: string }> = [
  {
    lembaga: "Lembaga Pelindungan Data Pribadi / Kementerian Komunikasi dan Digital",
    keterangan:
      "Untuk dugaan pelanggaran pelindungan Data Pribadi berdasarkan UU No. 27 Tahun 2022.",
    kontak: "aduankonten.id",
  },
  {
    lembaga: "Otoritas Jasa Keuangan (OJK)",
    keterangan:
      "Untuk pengaduan terkait layanan dan data sektor jasa keuangan, termasuk data SLIK.",
    kontak: "Kontak OJK 157 / konsumen@ojk.go.id",
  },
  {
    lembaga: "Kementerian Koperasi dan Usaha Kecil dan Menengah",
    keterangan:
      "Untuk pengaduan yang berkaitan dengan penyelenggaraan koperasi tempat Anda terdaftar.",
    kontak: "kemenkopukm.go.id",
  },
];

export default function LaporanPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader currentPath="/laporan" />

      <main id="main-content">
        <div className="container mx-auto px-4 md:px-6 py-10 md:py-12 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-700 mb-4">
            Laporan &amp; Permintaan Hak Subjek Data Pribadi
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-2">
            Sebagai Subjek Data Pribadi, Anda memiliki hak-hak yang dijamin oleh
            Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi
            (&ldquo;UU PDP&rdquo;). Halaman ini menjelaskan hak tersebut dan cara
            mengajukannya kepada Pruviu.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Terakhir diperbarui: 24 Agustus 2026
          </p>

          <div className="space-y-6 md:space-y-8">
            {/* 1. Identitas Pengendali */}
            <section
              className="bg-white rounded-lg shadow-sm p-5 md:p-8"
              aria-labelledby="pengendali-title"
            >
              <h2
                id="pengendali-title"
                className="text-2xl font-bold text-navy-700 mb-4"
              >
                1. Identitas Pengendali Data Pribadi
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Pruviu diselenggarakan oleh PT Pruden Visi Utama, yang bertindak
                sebagai <strong>Pengendali Data Pribadi</strong> sebagaimana
                dimaksud dalam UU PDP. Kami menentukan tujuan dan melakukan
                kendali atas pemrosesan Data Pribadi dalam layanan kami.
              </p>
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-3 text-sm md:text-base">
                <dt className="font-semibold text-navy-700">Badan Hukum</dt>
                <dd className="sm:col-span-2 text-gray-700">
                  PT Pruden Visi Utama
                </dd>
                <dt className="font-semibold text-navy-700">Alamat</dt>
                <dd className="sm:col-span-2 text-gray-700">
                  51st Floor, Gedung Treasury Tower, Kawasan District 8 LOT 28,
                  Jl. Tulodong Atas 2 No.28, Senayan, Kby. Baru, Kota Jakarta
                  Selatan, DKI Jakarta 12190
                </dd>
                <dt className="font-semibold text-navy-700">Status</dt>
                <dd className="sm:col-span-2 text-gray-700">
                  Terdaftar pada Kementerian Komunikasi dan Digital sebagai
                  Penyelenggara Sistem Elektronik (PSE)
                </dd>
                <dt className="font-semibold text-navy-700">
                  Kanal Pelindungan Data Pribadi
                </dt>
                <dd className="sm:col-span-2 text-gray-700">
                  <a
                    href={REQUEST_MAILTO}
                    className="text-navy-600 underline underline-offset-2 hover:text-navy-700"
                  >
                    {REQUEST_EMAIL}
                  </a>
                </dd>
              </dl>
            </section>

            {/* 2. Data keuangan pribadi sebagai data spesifik */}
            <section
              className="bg-white rounded-lg shadow-sm p-5 md:p-8"
              aria-labelledby="data-spesifik-title"
            >
              <h2
                id="data-spesifik-title"
                className="text-2xl font-bold text-navy-700 mb-4"
              >
                2. Data Keuangan Pribadi sebagai Data Pribadi Spesifik
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Layanan Pruviu memproses data keuangan pribadi, termasuk
                informasi debitur yang bersumber dari Sistem Layanan Informasi
                Keuangan (SLIK) Otoritas Jasa Keuangan. Berdasarkan Pasal 4 ayat
                (2) UU PDP, data keuangan pribadi tergolong sebagai{" "}
                <strong>Data Pribadi yang bersifat spesifik</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Konsekuensinya, pemrosesan data tersebut kami lakukan
                berdasarkan persetujuan yang eksplisit dan spesifik dari Anda,
                dengan tingkat pengamanan yang lebih tinggi serta pembatasan
                akses yang lebih ketat dibandingkan Data Pribadi pada umumnya.
              </p>
            </section>

            {/* 3. Hak Subjek Data Pribadi */}
            <section
              className="bg-white rounded-lg shadow-sm p-5 md:p-8"
              aria-labelledby="hak-title"
            >
              <h2
                id="hak-title"
                className="text-2xl font-bold text-navy-700 mb-4"
              >
                3. Hak Anda sebagai Subjek Data Pribadi
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                UU PDP memberikan hak-hak berikut kepada Anda. Setiap hak dapat
                Anda ajukan melalui kanal pada bagian 4 di bawah ini.
              </p>
              <ul className="space-y-4">
                {rights.map((right) => (
                  <li
                    key={right.pasal}
                    className="border-l-4 border-navy-600 bg-gray-50 rounded-r-lg p-4"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                      <h3 className="text-base md:text-lg font-bold text-navy-700">
                        {right.nama}
                      </h3>
                      <span className="text-xs font-semibold text-white bg-navy-600 rounded px-2 py-0.5">
                        {right.pasal} UU PDP
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      {right.isi}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* 4. Cara mengajukan permintaan */}
            <section
              className="bg-white rounded-lg shadow-sm p-5 md:p-8"
              aria-labelledby="cara-title"
            >
              <h2
                id="cara-title"
                className="text-2xl font-bold text-navy-700 mb-4"
              >
                4. Cara Mengajukan Permintaan
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Permintaan hak Subjek Data Pribadi tidak dipungut biaya.
              </p>

              <div className="rounded-lg border-2 border-navy-600 bg-navy-50 p-5 md:p-6 mb-8">
                <h3 className="text-lg font-bold text-navy-700 mb-2">
                  Formulir Permintaan Hak Subjek Data Pribadi
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Isian Anda disusun di perangkat Anda sendiri, lalu dibuka
                  sebagai draf pada aplikasi email default Anda. Formulir ini
                  tidak mengirim data ke server kami.
                </p>
                <Link
                  href="/kontak#formulir-pdp"
                  className="inline-flex items-center justify-center rounded-lg bg-navy-600 px-6 py-3 font-medium text-white shadow-md transition-colors hover:bg-navy-700"
                >
                  Buka Formulir Permintaan
                </Link>
              </div>

              <h3 className="text-lg font-bold text-navy-700 mt-10 mb-3">
                Kanal alternatif
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Anda juga dapat menghubungi kami secara langsung melalui kanal
                berikut.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <a
                  href={REQUEST_MAILTO}
                  className="flex flex-col rounded-lg border-2 border-blue-100 p-4 transition-colors hover:border-navy-600"
                >
                  <span className="text-sm font-bold text-navy-700 mb-1">
                    Email (disarankan)
                  </span>
                  <span className="text-sm text-gray-600 break-all">
                    {REQUEST_EMAIL}
                  </span>
                </a>
                <a
                  href="https://wa.me/6285600777888"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col rounded-lg border-2 border-blue-100 p-4 transition-colors hover:border-navy-600"
                >
                  <span className="text-sm font-bold text-navy-700 mb-1">
                    WhatsApp
                  </span>
                  <span className="text-sm text-gray-600">085600777888</span>
                  <span className="sr-only"> (buka di tab baru)</span>
                </a>
                <a
                  href="tel:02150808165"
                  className="flex flex-col rounded-lg border-2 border-blue-100 p-4 transition-colors hover:border-navy-600"
                >
                  <span className="text-sm font-bold text-navy-700 mb-1">
                    Call Center
                  </span>
                  <span className="text-sm text-gray-600">02150808165</span>
                </a>
              </div>

              <h3 className="text-lg font-bold text-navy-700 mb-3">
                Informasi yang wajib disertakan
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Formulir di atas sudah mencakup seluruh butir berikut. Apabila
                Anda menulis email sendiri tanpa menggunakan formulir, mohon
                sertakan:
              </p>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700 mb-6">
                {requiredFields.map((field) => (
                  <li key={field} className="leading-relaxed">
                    {field}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-bold text-navy-700 mb-3">
                Alur penanganan
              </h3>
              <ol className="space-y-4">
                {steps.map((step) => (
                  <li key={step.nomor} className="flex items-start gap-4">
                    <span className="flex h-8 w-8 min-w-[2rem] items-center justify-center rounded-full bg-navy-600 text-sm font-bold text-white">
                      {step.nomor}
                    </span>
                    <div>
                      <h4 className="font-bold text-navy-700 mb-1">
                        {step.judul}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{step.isi}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* 5. Jangka waktu penanganan */}
            <section
              className="bg-white rounded-lg shadow-sm p-5 md:p-8"
              aria-labelledby="jangka-title"
            >
              <h2
                id="jangka-title"
                className="text-2xl font-bold text-navy-700 mb-4"
              >
                5. Jangka Waktu Penanganan
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kami berkomitmen untuk:
              </p>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700">
                <li className="leading-relaxed">
                  Memberikan konfirmasi penerimaan permintaan Anda paling lambat{" "}
                  <strong>3 (tiga) hari kerja</strong> sejak permintaan diterima.
                </li>
                <li className="leading-relaxed">
                  Menyampaikan tanggapan atas permintaan Anda paling lambat{" "}
                  <strong>14 (empat belas) hari kerja</strong> sejak identitas
                  Anda berhasil diverifikasi. Untuk permintaan yang kompleks,
                  jangka waktu ini dapat kami perpanjang dengan pemberitahuan
                  tertulis kepada Anda.
                </li>
                <li className="leading-relaxed">
                  Memberitahukan kepada Anda dan kepada lembaga yang berwenang
                  paling lambat{" "}
                  <strong>3 x 24 (tiga kali dua puluh empat) jam</strong> apabila
                  terjadi kegagalan pelindungan Data Pribadi, sesuai Pasal 46 UU
                  PDP.
                </li>
              </ul>
            </section>

            {/* 6. Batasan dan pengecualian */}
            <section
              className="bg-white rounded-lg shadow-sm p-5 md:p-8"
              aria-labelledby="batasan-title"
            >
              <h2
                id="batasan-title"
                className="text-2xl font-bold text-navy-700 mb-4"
              >
                6. Batasan dan Pengecualian
              </h2>
              <div className="rounded-lg border-l-4 border-red-600 bg-red-50 p-4 mb-6">
                <h3 className="font-bold text-navy-700 mb-2">
                  Penting: koreksi data SLIK tidak dapat dilakukan oleh Pruviu
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Data debitur pada SLIK dilaporkan oleh Lembaga Jasa Keuangan
                  (LJK) pelapor, bukan oleh Pruviu. Kami tidak memiliki
                  kewenangan untuk mengubah, memperbaiki, atau menghapus catatan
                  Anda pada SLIK. Permintaan koreksi data SLIK harus Anda ajukan
                  kepada LJK yang melaporkan data tersebut atau kepada Otoritas
                  Jasa Keuangan. Kami dapat membantu menjelaskan data yang kami
                  tampilkan dan mengoreksi kesalahan yang terjadi pada sistem
                  kami sendiri.
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                Sesuai Pasal 15 UU PDP, hak-hak pada bagian 3 dikecualikan untuk
                kepentingan tertentu, antara lain:
              </p>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700 mb-4">
                <li className="leading-relaxed">
                  Kepentingan pertahanan dan keamanan nasional;
                </li>
                <li className="leading-relaxed">
                  Kepentingan proses penegakan hukum;
                </li>
                <li className="leading-relaxed">
                  Kepentingan pengawasan sektor jasa keuangan, moneter, sistem
                  pembayaran, dan stabilitas sistem keuangan;
                </li>
                <li className="leading-relaxed">
                  Kepentingan statistik dan penelitian ilmiah;
                </li>
                <li className="leading-relaxed">
                  Kepentingan administrasi pemerintahan.
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Selain itu, kami dapat menahan penghapusan Data Pribadi tertentu
                sepanjang masih terikat kewajiban retensi berdasarkan peraturan
                perundang-undangan, atau apabila data tersebut masih diperlukan
                untuk penyelesaian sengketa dan pembuktian atas transaksi yang
                telah terjadi.
              </p>
            </section>

            {/* 7. Eskalasi */}
            <section
              className="bg-white rounded-lg shadow-sm p-5 md:p-8"
              aria-labelledby="eskalasi-title"
            >
              <h2
                id="eskalasi-title"
                className="text-2xl font-bold text-navy-700 mb-4"
              >
                7. Eskalasi apabila Anda Tidak Puas
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Apabila Anda tidak memperoleh tanggapan dalam jangka waktu di
                atas, atau tidak puas dengan tanggapan kami, Anda berhak
                menyampaikan pengaduan kepada:
              </p>
              <ul className="space-y-4">
                {escalations.map((item) => (
                  <li
                    key={item.lembaga}
                    className="rounded-lg border border-blue-100 p-4"
                  >
                    <h3 className="font-bold text-navy-700 mb-1">
                      {item.lembaga}
                    </h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-2">
                      {item.keterangan}
                    </p>
                    <p className="text-sm text-gray-600">{item.kontak}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* 8. Dokumen terkait */}
            <section
              className="bg-white rounded-lg shadow-sm p-5 md:p-8"
              aria-labelledby="terkait-title"
            >
              <h2
                id="terkait-title"
                className="text-2xl font-bold text-navy-700 mb-4"
              >
                8. Dokumen Terkait
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700">
                <li className="leading-relaxed">
                  <Link
                    href="/privacy-policy"
                    className="text-navy-600 underline underline-offset-2 hover:text-navy-700"
                  >
                    Kebijakan Privasi
                  </Link>{" "}
                  &mdash; penjelasan lengkap mengenai Data Pribadi yang kami
                  proses, dasar hukum, dan jangka waktu penyimpanan.
                </li>
                <li className="leading-relaxed">
                  <a
                    href="/General-Terms-and-Conditions-Pruviu%20.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy-600 underline underline-offset-2 hover:text-navy-700"
                  >
                    Syarat &amp; Ketentuan
                  </a>
                  <span className="sr-only"> (buka di tab baru)</span>
                </li>
                <li className="leading-relaxed">
                  <Link
                    href="/kontak"
                    className="text-navy-600 underline underline-offset-2 hover:text-navy-700"
                  >
                    Kontak
                  </Link>{" "}
                  &mdash; kanal bantuan umum di luar permintaan hak Subjek Data
                  Pribadi.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter complaintHref="/laporan" />
    </div>
  );
}
