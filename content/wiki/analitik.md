---
title: "Analitik"
slug: "analitik"
category: "laporan-riwayat"
summary: "Halaman ringkasan performa portofolio kredit koperasi: kualitas kredit, perkreditan, dan demografi anggota peminjam."
---

# Analitik

## Ringkasan (Tim Sales)

Halaman Analitik dirancang untuk memberi pengurus koperasi gambaran menyeluruh tentang kesehatan portofolio pinjaman mereka dalam satu layar, tanpa perlu menyusun laporan manual. Halaman ini dibagi menjadi tiga bagian besar: kualitas kredit, perkreditan, dan demografi anggota peminjam.

Bagian kualitas kredit menampilkan sebaran kolektibilitas pinjaman (Lancar, Dalam Perhatian Khusus, Kurang Lancar, Diragukan, Macet) serta rasio NPL/NPF bruto dan neto — indikator standar yang biasa dipakai koperasi dan regulator untuk menilai seberapa sehat portofolio pinjaman. Bagian perkreditan menampilkan total plafon yang sudah disalurkan, total baki debet (sisa pokok pinjaman berjalan), total tunggakan, jenis penggunaan pinjaman (konsumtif, investasi, modal kerja), dan rentang suku bunga/bagi hasil. Bagian demografi menampilkan profil anggota peminjam: jumlah anggota, jumlah pemohon dan penjamin, sebaran pekerjaan, dan sebaran tingkat pendidikan.

Konsepnya adalah membantu koperasi melihat pola risiko dan komposisi anggotanya secara visual — misalnya apakah tunggakan mulai naik, atau apakah mayoritas peminjam berasal dari sektor pekerjaan tertentu — sehingga pengambilan keputusan kredit bisa lebih berbasis data.

Penting untuk tim sales: **saat ini seluruh angka yang ditampilkan di halaman ini adalah data contoh (mock/dummy), bukan data riil dari akun koperasi manapun.** Jangan menjanjikan ke prospek bahwa angka-angka spesifik ini akan langsung tersedia dan akurat untuk akun mereka — sampaikan bahwa fitur ini masih dalam tahap pengembangan untuk terhubung ke data nyata koperasi. Lihat "Catatan Terbuka" di bawah.

## Cara Kerja (Tim Teknis)

Komponen utama: `components/dashboard/LaporanPage.tsx`. Menggunakan ulang pola visual dari `DashboardChart.tsx` di halaman Dashboard, tapi bagian analitik ini tidak memakainya secara langsung — chart di sini dibangun sendiri (`DonutChart`, `HorizontalBarChart`) sebagai komponen internal file ini.

Sumber data: **tidak ada pemanggilan API sama sekali.** Data berasal dari konstanta hardcoded `MOCK_ANALYTICS` (tipe `DashboardAnalytics`) yang didefinisikan langsung di file `LaporanPage.tsx` (baris ~42-83), berisi:
- `demographics`: `totalAnggota` (1250), `totalCalonPenjamin` (340), sebaran `pekerjaan` dan `pendidikan` (array label/value/color).
- `lending`: `totalDisalurkan`, `totalBakiDebet`, `totalTunggakan` (angka Rupiah statis), `penggunaan` (persentase per kategori), `sukuBunga` (min/max/avg string statis).
- `quality`: `kolektibilitas` (array 5 kategori kol 1-5 dengan persentase), `nplBruto` (3.5%), `nplNeto` (1.2%).

Komentar di kode secara eksplisit menandai ini: `// In real app, fetch data here. Using MOCK_ANALYTICS for now.` (baris 166) dan interface `DashboardAnalytics` diberi label `// --- Mock Data Interface ---`.

Komponen visual yang dipakai:
- `DonutChart`: donut chart custom berbasis CSS `conic-gradient`, dipakai untuk "Jenis Penggunaan Pinjaman" dan "Pekerjaan Anggota Peminjam".
- `HorizontalBarChart`: bar horizontal custom (div dengan width persentase), dipakai untuk "Pendidikan Anggota Peminjam".
- Meter kolektibilitas: stacked bar custom untuk visualisasi distribusi Kol 1-5.
- Filter bulan (`filterDate`, input type="month") ada di header, tapi state ini **tidak dipakai untuk memfilter data apapun** — data yang ditampilkan tetap sama (`MOCK_ANALYTICS`) berapa pun bulan yang dipilih.
- Threshold visual: NPL bruto > 5% memicu warna merah dan label status "Waspada"; jika ≤ 5% ditampilkan biru/hijau dengan label "Sehat".

Tidak ada logika kondisional terkait billing type (`useBilling`) atau status akun (`isActive`) di halaman ini — berbeda dari Dashboard.

## Pertanyaan yang Sering Diajukan

**Q: Apakah angka NPL, total plafon, dan data demografi di halaman Analitik ini data koperasi kami yang sebenarnya?**
A: Belum. Saat ini seluruh data di halaman Analitik adalah data contoh (statis/dummy) yang sama untuk semua pengguna, bukan hasil perhitungan dari data pinjaman koperasi Anda. Fitur ini masih dalam pengembangan.

**Q: Bisakah kami memfilter analitik berdasarkan bulan tertentu?**
A: Ada input pemilih bulan di halaman ini, tapi saat ini belum berfungsi untuk memfilter data — data yang tampil tidak berubah meski bulan diganti. Ini kemungkinan akan diaktifkan pada tahap pengembangan berikutnya.

**Q: Dari mana sumber data untuk kolektibilitas dan NPL nantinya, apakah dari SLIK OJK atau input manual koperasi?**
A: Belum bisa dipastikan dari kode saat ini karena halaman belum terhubung ke backend manapun — perlu konfirmasi ke tim produk/teknis mengenai rencana sumber data untuk fitur ini.

**Q: Apakah fitur Analitik ini termasuk dalam paket berlangganan tertentu atau tambahan biaya?**
A: Tidak ada informasi kebijakan harga di dalam kode — konfirmasikan ke tim sales/onboarding terkait paket dan biaya untuk fitur ini.

**Q: Apakah data demografi anggota (pekerjaan, pendidikan) diambil otomatis dari hasil pengecekan SLIK/Anti Fraud yang sudah dilakukan koperasi?**
A: Belum bisa dipastikan — saat ini halaman hanya menampilkan data contoh, belum ada logika pengambilan data otomatis dari riwayat pengecekan.

## Catatan Terbuka

Halaman ini sepenuhnya menggunakan data mock (`MOCK_ANALYTICS`) yang di-hardcode di dalam komponen, dan komentar di kode (`components/dashboard/LaporanPage.tsx` baris ~166: `// In real app, fetch data here. Using MOCK_ANALYTICS for now.`) mengonfirmasi ini belum terhubung ke backend. Filter tanggal (`filterDate`) juga sudah ada di UI tapi tidak memengaruhi data yang ditampilkan sama sekali. Tim sales sebaiknya memperlakukan halaman ini sebagai pratinjau/demo fitur yang akan datang, bukan fitur yang sudah live dengan data riil, sampai ada konfirmasi status pengembangan terbaru dari tim teknis.
