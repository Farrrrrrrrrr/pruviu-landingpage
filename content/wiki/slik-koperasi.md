---
title: "SLIK Koperasi"
slug: "slik-koperasi"
category: "skor-pengecekan"
summary: "Fitur andalan Pruviu untuk mengecek riwayat pinjaman calon nasabah di koperasi lain secara read-only sebelum pencairan."
---

# SLIK Koperasi

## Ringkasan (Tim Sales)

SLIK Koperasi adalah fitur andalan (flagship) Pruviu yang memungkinkan sebuah koperasi mengecek riwayat pinjaman seorang calon nasabah atau anggota — bukan hanya di koperasi mereka sendiri, tapi juga di koperasi-koperasi lain yang tergabung dalam jaringan Pruviu. Cukup masukkan NIK (dan beberapa data identitas pendukung), dan sistem akan menampilkan seluruh riwayat kredit yang tercatat untuk NIK tersebut: berapa banyak pinjaman aktif, berapa yang sudah lunas, berapa yang macet, total plafon, sisa utang, tunggakan, hingga denda.

Masalah bisnis yang diselesaikan fitur ini adalah "blind spot" klasik di industri koperasi: sebelum ada visibilitas lintas-koperasi, sebuah koperasi hanya bisa melihat riwayat pinjaman anggotanya sendiri. Akibatnya, seorang nasabah bisa saja sudah punya banyak pinjaman aktif atau bahkan macet di koperasi lain, tapi tetap lolos pengajuan pinjaman baru karena koperasi yang memprosesnya tidak tahu riwayat tersebut. SLIK Koperasi menutup celah ini dengan memberi gambaran kredit yang lebih lengkap, sehingga petugas koperasi bisa membuat keputusan pencairan yang lebih hati-hati dan mengurangi risiko kredit macet.

Yang membuat fitur ini berbeda dari sekadar "lihat data koperasi sendiri" adalah sifatnya yang read-only lintas-koperasi: data pinjaman dari koperasi lain bisa dilihat untuk keperluan analisis kelayakan kredit, tapi tidak bisa diubah, dihapus, atau diklaim sebagai milik koperasi yang sedang login — ini menjaga privasi dan keamanan data setiap koperasi anggota jaringan sambil tetap memberi manfaat visibilitas bersama.

Selain mode pengecekan untuk pengajuan baru, ada juga mode monitoring untuk memantau nasabah yang sudah ada (misalnya untuk evaluasi berkala), serta fitur pelengkap seperti deteksi anti-fraud otomatis yang berjalan bersamaan dengan pengecekan, dan opsi ekspor laporan ke PDF untuk didokumentasikan atau dilampirkan ke berkas pengajuan.

## Cara Kerja (Tim Teknis)

Komponen utamanya adalah `KoperasiCheckingPage` (`components/dashboard/KoperasiCheckingPage.tsx`), dirender di route `/koperasi-checking` dengan nav label "SLIK Koperasi".

**Dua mode pengecekan (enquiryType):**
- **NAE (Pengajuan Baru)** — form lengkap: identitas nasabah (NIK, nama, tanggal/tempat lahir, nama ibu kandung, alamat, dsb), detail pengajuan (tanggal pengajuan, jatuh tempo, jumlah pengajuan), upload dokumen (KTP, KK, consent clause), dan opsi penjamin (maks 3, hanya untuk `subjectType === 'PEMOHON'`). Mengirim ke `apiService.checkKoperasiNAE()` → `POST /slik-koperasi/nae` (multipart form-data berisi field data diri + file `fileKtp`, `fileKk`, `fileConsent`, dan `pengajuanDetail` untuk data penjamin).
- **ME (Monitoring)** — form minimal: NIK + reference. Mengirim ke `apiService.checkKoperasiME()` → `POST /slik-koperasi/me`.

Ada juga fitur **Autofill** (`handleAutofill`) yang memanggil `apiService.getPengajuanByReference({ nik, reference })` (`POST /pengajuan/reference`) untuk mengisi otomatis form NAE dari data pengajuan yang sudah ada sebelumnya.

**Pemetaan hasil:** respons API dipetakan lewat `mapNewClikToPinjaman(response, 'SLIK-KOPERASI', nik)` dari `utils/clikMapper.ts` menjadi array `Pinjaman[]`. Dari situ, `KoperasiCheckingPage` menghitung `uniqueKoperasiIds` (daftar ID koperasi unik pelapor pinjaman, dari `p.idKoperasi`) untuk menunjukkan bahwa data berasal dari beberapa koperasi berbeda — inilah mekanisme "cross-koperasi visibility"-nya. Skor kolektibilitas terburuk (`worstKolektibilitas`) dihitung dari seluruh pinjaman via `getLoanKolektibilitas()`, yang membaca `statusPinjaman` (Lunas/Lancar → 1, Macet → 5) atau `kodeKualitasKredit` mentah dari API.

**Anti-fraud paralel:** setiap pencarian juga memanggil `apiService.checkAntiFraud(false, nik, 'KOPERASI')` secara paralel (`Promise.all`) dengan pengecekan utama. Jika terdeteksi anomali, banner peringatan berwarna (GREEN/YELLOW/BROWN/RED, ditentukan oleh `getFraudSeverity()`) muncul di atas hasil, dengan tautan ke halaman `/anti-fraud`.

**Tampilan hasil** ada dua mode, dikontrol `viewMode`:
- `card` → `PinjamanDetailCard` (`components/dashboard/LoanResultComponents.tsx`) — kartu detail lengkap per kontrak pinjaman, termasuk grid riwayat pembayaran bulanan (`DynamicHistoryGrid`, memakai `mapCreditProfileToGrid` dari `utils/mapCreditProfileToGrid.ts` — **bukan** `utils/koperasiCheckMapper.ts`, lihat catatan di bawah).
- `table` → `LoanSummaryCard` — ringkasan per baris (nominal, sisa, kondisi, tanggal mulai/jatuh tempo, badge status).

Setiap kartu menampilkan nama pelapor (`pinjaman.pelapor` atau `koperasiNama`) sehingga jelas pinjaman itu berasal dari koperasi mana.

**Filter hasil pencarian:** `FilterPanelKoperasi` (`components/dashboard/FilterPanelKoperasi.tsx`) menyediakan filter client-side atas hasil yang sudah dimuat — pencarian teks nama koperasi, jenis pinjaman (multi-checkbox), rentang nominal pinjaman, rentang sisa pinjaman, tenor, bunga, dan rentang tanggal. Filter ini tidak memanggil API baru; ia menyaring array `Pinjaman[]` yang sudah ada di state.

**Ekspor:** ada dua jalur — unduh PDF native dari server (`pdfBase64` untuk laporan lengkap, `pdfBase64Tabel` untuk versi tabel, dikirim balik oleh backend saat `withPdf: 'true'`), dan "Cetak Ringkasan" yang men-generate PDF di sisi klien dari elemen `#export-content` memakai `html2canvas` + `jsPDF`.

**Biaya & billing:** ada indikator "Checking Fee: 30 POIN" yang hanya ditampilkan jika `!isPascabayar` (hook `useBilling`, `hooks/useBilling.ts`). Untuk koperasi dengan `billingType === 'pascabayar'`, biaya poin per-cek tidak ditampilkan (ditagih end-to-end sesuai perjanjian, bukan potong poin langsung). Sumber `billingType` adalah `apiService.getKoperasiInfo(user.idKoperasi)`.

## Pertanyaan yang Sering Diajukan

**Q: Apakah koperasi kami bisa melihat data pinjaman anggota kami di koperasi lain?**
A: Ya. Itulah inti fitur SLIK Koperasi — begitu Anda mengecek NIK seseorang, sistem menampilkan riwayat pinjaman dari seluruh koperasi pelapor yang tercatat untuk NIK tersebut, bukan hanya dari koperasi Anda sendiri.

**Q: Apakah koperasi lain juga bisa melihat data pinjaman nasabah kami?**
A: Sesuai mekanisme yang sama, data pinjaman yang koperasi Anda laporkan akan ikut terlihat oleh koperasi lain yang melakukan pengecekan atas NIK yang sama. Namun sifatnya read-only — koperasi lain hanya bisa melihat untuk keperluan analisis, tidak bisa mengubah atau menghapus data pinjaman milik koperasi Anda.

**Q: Apa maksud "read-only" pada data lintas-koperasi ini?**
A: Data pinjaman yang berasal dari koperasi lain hanya bisa dibaca/dilihat di layar hasil pencarian — tidak ada mekanisme untuk mengedit, menghapus, atau mengklaim data tersebut sebagai milik koperasi yang sedang login. Ini yang menjaga keamanan dan privasi data setiap koperasi anggota jaringan.

**Q: Data pinjaman apa saja yang muncul di hasil pencarian?**
A: Detail per kontrak pinjaman meliputi status (Lancar/Macet/Lunas), plafon, sisa pinjaman (baki debet), tunggakan pokok dan bunga, denda, tanggal akad, jatuh tempo, jenis dan sifat kredit, sektor ekonomi, hingga riwayat kualitas pembayaran bulanan (grid 24 bulan). Ada juga ringkasan total di bagian atas: saldo pinjaman, plafon, tunggakan, denda, serta jumlah pinjaman aktif/lunas/macet.

**Q: Bagaimana cara mempersempit hasil pencarian kalau nasabah punya banyak pinjaman?**
A: Setelah pencarian NIK selesai, ada panel filter yang bisa menyaring hasil berdasarkan jenis pinjaman, rentang nominal pinjaman, rentang sisa pinjaman, tenor, bunga, dan rentang tanggal pinjaman. Filter ini bekerja langsung di hasil yang sudah dimuat, jadi responsnya instan tanpa perlu pencarian ulang ke server.

**Q: Apakah ada dua cara pengecekan yang berbeda?**
A: Ya. Ada mode "Pengajuan Baru (NAE)" yang memerlukan data identitas lengkap plus dokumen (KTP, consent clause) — cocok untuk verifikasi calon peminjam baru — dan mode "Monitoring (ME)" yang lebih ringkas (cukup NIK dan reference) untuk memantau nasabah yang datanya sudah pernah diajukan sebelumnya.

**Q: Apakah pengecekan ini otomatis mendeteksi indikasi fraud?**
A: Ya, setiap pengecekan SLIK Koperasi juga menjalankan pengecekan anti-fraud secara paralel. Jika sistem mendeteksi anomali (misalnya ketidaksesuaian data alamat, kontak, pekerjaan, dsb.), akan muncul banner peringatan berwarna di atas hasil dengan tautan ke halaman Anti Fraud untuk detail lebih lanjut.

**Q: Berapa biaya sekali pengecekan, dan bagaimana skema pembayarannya?**
A: Untuk koperasi dengan skema prabayar, biaya yang ditampilkan di halaman adalah 30 poin per pengecekan. Untuk koperasi dengan skema pascabayar, biaya poin per-cek tidak ditampilkan langsung di halaman — penagihan diatur sesuai perjanjian kerja sama. Untuk detail kebijakan tarif dan skema kontrak, konfirmasikan ke tim billing/founder karena angka pasti dan kebijakan pascabayar tidak sepenuhnya terlihat dari kode aplikasi ini.

## Catatan Terbuka

- Ada file `utils/koperasiCheckMapper.ts` (fungsi `mapKoperasiCheckToGrid`) yang secara fungsi mirip dengan grid riwayat pembayaran (mapping kode kualitas kredit → label & warna sel), tapi berdasarkan penelusuran kode, komponen `KoperasiCheckingPage` dan `LoanResultComponents` yang aktif dipakai justru memanggil `mapCreditProfileToGrid` dari `utils/mapCreditProfileToGrid.ts`, bukan file ini. Kemungkinan `koperasiCheckMapper.ts` adalah kode versi lama/duplikat yang sudah tidak terpakai — perlu konfirmasi ke tim teknis apakah file ini aman dihapus atau masih dipakai di alur lain.
- Label "SALDO PINJAMAN" di kartu ringkasan besar sebenarnya menampilkan `summary.totalSisaUtang`, yang secara default dihitung dari total sisa pinjaman untuk pinjaman yang belum lunas — penamaan "saldo" di sini merujuk pada sisa utang berjalan, bukan saldo tabungan/rekening.
- Terdapat komentar kode yang menonaktifkan (comment-out) langkah verifikasi OCR untuk dokumen consent clause pada mode NAE — artinya saat ini dokumen consent yang diunggah tidak diverifikasi otomatis secara OCR sebelum pengecekan dijalankan. Perlu konfirmasi ke tim teknis apakah ini disengaja (dinonaktifkan sementara) atau sisa pekerjaan yang belum selesai.
- Ada juga endpoint lama `checkKoperasi` (single-file consent, tanpa NAE/ME) di `services/api.ts` yang tampaknya sudah digantikan oleh `checkKoperasiNAE`/`checkKoperasiME` — tidak dipakai oleh `KoperasiCheckingPage` saat ini.
