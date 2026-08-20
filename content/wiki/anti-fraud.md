---
title: "Anti Fraud"
slug: "anti-fraud"
category: "skor-pengecekan"
summary: "Pengecekan anomali data nasabah (kontak, alamat, pekerjaan, pendidikan, nama ibu kandung) untuk mendeteksi indikasi manipulasi data, tersedia untuk semua akun."
---

# Anti Fraud

## Ringkasan (Tim Sales)

Anti Fraud adalah fitur yang membantu koperasi mendeteksi kemungkinan nasabah memalsukan atau mengubah-ubah data pribadinya untuk menyembunyikan riwayat kredit yang buruk atau menipu proses pengajuan pinjaman. Sistem membandingkan data nasabah — kontak, alamat, pekerjaan, pendidikan, dan nama ibu kandung — dari berbagai titik waktu (berbagai laporan/pengajuan sebelumnya), lalu menandai bagian mana yang berubah-ubah secara mencurigakan.

Ini penting karena pemalsuan data adalah salah satu modus umum dalam penipuan kredit: seseorang bisa mengaku punya pekerjaan atau alamat berbeda di setiap pengajuan agar riwayat buruknya sulit dilacak, atau mengganti nama ibu kandung (yang seharusnya tidak pernah berubah) sebagai indikasi identitas ganda. Dengan Anti Fraud, tim koperasi mendapat sinyal visual berupa warna (dari hijau hingga merah) yang menunjukkan tingkat keparahan anomali pada setiap kategori data, sehingga bisa memutuskan apakah perlu klarifikasi lebih lanjut ke nasabah sebelum menyetujui pinjaman.

Berbeda dengan Full Check, fitur Anti Fraud bisa diakses oleh semua akun koperasi, baik yang sudah maupun belum diaktivasi — jadi ini bisa jadi alat verifikasi awal yang tersedia sejak akun koperasi baru terdaftar.

Perlu dicatat, hasil Anti Fraud bersifat sebagai alat bantu analisis (memberi indikator dan flag), bukan keputusan otomatis "tolak/terima" — keputusan akhir tetap ada di tangan tim koperasi.

## Cara Kerja (Tim Teknis)

Anti Fraud diimplementasikan di `components/dashboard/AntiFraudPage.tsx` (komponen `AntiFraudPage`), diakses lewat rute `/anti-fraud`. Di `App.tsx`, rute ini **tidak** dibungkus `ActiveRouteGuard` (`<Route path="/anti-fraud" element={<Layout><AntiFraudPage /></Layout>} />`), dan pada Sidebar, item navigasinya tidak diberi prop `isLocked` — sehingga tersedia untuk akun aktif maupun belum aktif.

Pengguna memasukkan NIK nasabah dan memilih sumber data: `KOPERASI` (data internal koperasi) atau `SLIK` (data SLIK OJK, memerlukan Reference ID tambahan). Pemanggilan dilakukan lewat `apiService.checkAntiFraud(true, nik, source, idToUse)` — parameter pertama `true` membedakan pemanggilan manual dari halaman ini dengan pemanggilan otomatis yang dilakukan Full Check (lihat artikel Full Check, yang memanggil `checkAntiFraud(false, ...)` dua kali untuk sumber SLIK dan KOPERASI sekaligus lalu menggabungkan hasilnya).

Hasil (`AntiFraudResponse`) berisi array `details`, masing-masing baris memiliki `tanggal`, dan lima kategori data (`kontak`, `alamat`, `pekerjaan`, `pendidikan`, `namaIbuKandung`) beserta kode warna per kategori (`kontakColor`, `alamatColor`, dst.). Kode warna dipetakan lewat fungsi `getBgColor`:
- `GREEN` → "PERLU DIPERHATIKAN"
- `YELLOW` → "PERLU DIKLARIFIKASI"
- `BROWN` → "KLARIFIKASI LEBIH DALAM"
- `RED` → "INDIKASI FRAUD"

Nilai kode pekerjaan dan pendidikan diterjemahkan ke nama yang mudah dibaca lewat `getJobName`/`getEducationName`, yang mencocokkan kode terhadap data referensi dari `apiService.getMasterReferences()`. Kode wilayah 4 digit yang muncul di dalam string alamat diterjemahkan lewat `resolveRegionInAddress`, mencocokkan terhadap `apiService.getRegions()`.

Untuk akun prabayar (`!isPascabayar` dari hook `useBilling`), sebelum request dikirim sistem mengecek saldo dan memotongnya lewat `deductBalance(PRICE)` dengan `PRICE = 1965`. Catatan: badge biaya yang ditampilkan di UI berbunyi "Checking Fee: 20 POIN", angka yang berbeda dari nilai `PRICE = 1965` yang benar-benar dipotong dari saldo — lihat Catatan Terbuka.

## Pertanyaan yang Sering Diajukan

**Q: Data apa saja yang dicek oleh Anti Fraud?**
A: Lima kategori: kontak (nomor telepon), alamat, pekerjaan (termasuk tempat bekerja), pendidikan, dan nama ibu kandung. Sistem membandingkan perubahan pada kategori-kategori ini antar titik waktu/laporan.

**Q: Apakah Anti Fraud otomatis menolak nasabah yang datanya mencurigakan?**
A: Tidak. Fitur ini hanya menampilkan indikator warna (hijau hingga merah) per kategori data sebagai sinyal tingkat keparahan anomali. Keputusan untuk melanjutkan, meminta klarifikasi, atau menolak pengajuan tetap berada di tangan tim koperasi.

**Q: Apa arti warna merah pada hasil Anti Fraud?**
A: Merah berarti "INDIKASI FRAUD" — tingkat keparahan tertinggi dalam skala yang dipakai (hijau = perlu diperhatikan, kuning = perlu diklarifikasi, cokelat = klarifikasi lebih dalam, merah = indikasi fraud).

**Q: Apakah fitur ini terkunci untuk akun koperasi yang belum aktif?**
A: Tidak. Berbeda dari Full Check, Anti Fraud tidak menggunakan mekanisme penguncian akun (`ActiveRouteGuard`) dan tersedia untuk semua akun, aktif maupun belum aktif.

**Q: Apa bedanya memilih sumber data "Koperasi" vs "SLIK OJK" saat pengecekan?**
A: Sumber "Koperasi" mengecek data yang tercatat secara internal antar koperasi pengguna Pruviu memakai NIK. Sumber "SLIK" mengecek data dari SLIK OJK dan memerlukan Reference ID tambahan (mengacu ke pengajuan/pengecekan SLIK sebelumnya).

**Q: Berapa biaya sekali pengecekan Anti Fraud?**
A: Untuk akun prabayar, sistem memotong saldo sejumlah nilai tetap dari kode (`PRICE = 1965`) — namun label biaya yang tampil di layar berbunyi "20 POIN", yang tidak sama dengan angka tersebut. Sebaiknya konfirmasi ke tim produk/billing untuk angka biaya resmi yang berlaku sebelum menyampaikannya ke prospek.

**Q: Apakah hasil Anti Fraud dari halaman ini sama dengan yang muncul otomatis di dalam Full Check?**
A: Konsepnya sama (skema warna dan kategori data yang sama), tapi pengecekan di halaman Anti Fraud dijalankan manual untuk satu sumber data pilihan pengguna, sedangkan di dalam Full Check sistem otomatis menjalankan pengecekan untuk sumber SLIK dan Koperasi sekaligus lalu menggabungkan hasilnya menjadi satu laporan.

## Catatan Terbuka

- Ada perbedaan antara biaya yang benar-benar dipotong dari saldo di kode (`PRICE = 1965`) dan angka yang ditampilkan di badge UI ("Checking Fee: 20 POIN"). Ini kemungkinan sisa dari perubahan harga yang belum disinkronkan antara logika dan tampilan — perlu dikonfirmasi ke tim teknis/produk sebelum menyampaikan angka biaya resmi ke prospek.
