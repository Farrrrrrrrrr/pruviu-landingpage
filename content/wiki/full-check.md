---
title: "Full Check"
slug: "full-check"
category: "skor-pengecekan"
summary: "Pengecekan kredit paling lengkap di Pruviu, menggabungkan data SLIK OJK dan data internal koperasi dalam satu laporan, khusus akun yang sudah aktif."
---

# Full Check

## Ringkasan (Tim Sales)

Full Check adalah fitur pengecekan kredit paling menyeluruh yang tersedia di Pruviu. Berbeda dari fitur pengecekan lain yang hanya menampilkan satu sumber data, Full Check menggabungkan dua sumber sekaligus dalam satu kali pencarian: data SLIK OJK (data resmi dari Otoritas Jasa Keuangan) dan data SLIK Koperasi (riwayat pinjaman nasabah di koperasi-koperasi lain yang menggunakan Pruviu). Hasilnya adalah satu laporan gabungan yang memperlihatkan seluruh riwayat kredit nasabah, baik dari lembaga keuangan formal maupun dari sesama koperasi.

Bagi koperasi pengguna, ini menjawab kebutuhan paling mendasar sebelum menyetujui pinjaman: apakah calon nasabah punya riwayat kredit yang sehat, dan apakah ia sedang punya pinjaman aktif di tempat lain yang tidak diketahui koperasi. Full Check menampilkan status setiap pinjaman (lancar, macet, lunas), sisa utang, tunggakan, denda, hingga skor kredit gabungan — semuanya dalam satu tampilan, tanpa perlu membuka beberapa fitur terpisah.

Fitur ini juga otomatis menjalankan pengecekan Anti Fraud di belakang layar begitu Full Check selesai diproses, jadi tim koperasi sekaligus mendapat sinyal potensi manipulasi data tanpa perlu membuka halaman Anti Fraud secara terpisah.

Full Check mendukung dua jenis pengecekan: "Pengajuan Baru" (untuk calon nasabah baru, memerlukan data diri lengkap dan dokumen seperti KTP, KK, dan surat persetujuan/consent) dan "Monitoring" (untuk memantau nasabah yang datanya sudah pernah tercatat, cukup dengan NIK dan nomor referensi). Ada juga opsi untuk mengecek data penjamin (guarantor), bukan hanya pemohon utama.

Karena kedalaman datanya, Full Check hanya bisa diakses oleh akun koperasi yang sudah diaktivasi oleh tim Pruviu — akun yang masih dalam proses peninjauan tidak bisa membuka fitur ini.

## Cara Kerja (Tim Teknis)

Full Check diimplementasikan di `components/dashboard/CreditScoringPage.tsx` (komponen `CreditScoringPage`), diakses lewat rute `/credit-scoring`. Rute ini dibungkus `ActiveRouteGuard` (`components/auth/ActiveRouteGuard.tsx`) di `App.tsx`: guard ini membaca `user.isActive` dari `useAuth()`, dan jika `false`, langsung menampilkan alert "Akun Anda masih dalam proses peninjauan. Fitur ini sementara dikunci." lalu redirect ke `/dashboard`. Di sisi navigasi, item "Full Check" pada Sidebar juga diberi `isLocked={!isUserActive}`.

Ada dua mode enquiry:
- **NAE (Pengajuan Baru)** — mengirim data form lengkap (identitas, alamat, pekerjaan, penjamin, file KTP/KK/consent) sebagai `multipart/form-data` lewat `apiService.checkFullNAE(...)` (untuk pemohon) atau `apiService.checkFullPenjaminNAE(...)` (untuk penjamin).
- **ME (Monitoring)** — mengirim `{ nik, reference }` sebagai JSON lewat `apiService.checkFullME(...)`.

Respons API diharapkan berisi `slikOJK` dan `slikKoperasi`. Data OJK dipetakan ke struktur `Pinjaman[]` lewat `mapNewClikToPinjaman(ojkData, 'SLIK-OJK', nik)`, dan data koperasi lewat `mapNewClikToPinjaman(koperasiData, 'SLIK-KOPERASI', nik)`; keduanya digabung jadi `mergedLoans`. Ringkasan (`summary`) menjumlahkan `totalPlafon`, `totalBakiDebet`, `totalTunggakan`, `totalDenda` dari kedua sumber, dan mengambil `skorKredit` dari `ojkData.cbScore.scoreRaw` (ditampilkan sebagai `angka/850`, sesuai definisi KOL Score di FAQ in-app: rentang 300–850 berdasarkan riwayat pembayaran, jumlah pinjaman aktif, dan sisa utang).

Skor kolektibilitas (KOL, skala 1–5) yang ditampilkan lewat komponen `KolektibilitasScoreCard` (dan duplikatnya `KolScoreCard`, lihat Catatan Terbuka) dihitung sebagai kolektibilitas terburuk dari seluruh pinjaman OJK nasabah: `worstKolektibilitas = Math.max(...ojkLoans.map(getLoanKolektibilitas))`. Fungsi `getLoanKolektibilitas` membaca `kodeKualitasKredit` per pinjaman (1=Lancar … 5=Macet), dengan status `Lunas`/`Lancar` otomatis dianggap 1 dan `Macet` dianggap 5 jika kode tidak tersedia.

Riwayat pembayaran 12 bulan per tahun ditampilkan sebagai grid warna lewat `mapCreditProfileToGrid` (di `utils/mapCreditProfileToGrid.ts`), yang memetakan `qualityCode` (1–5) tiap `creditProfile` bulanan ke warna dan label (contoh: `1` → hijau "OK", `5` → merah "180+").

Setelah data Full Check berhasil dimuat, komponen otomatis memanggil `apiService.checkAntiFraud` dua kali secara paralel (`Promise.allSettled`) — sekali dengan sumber `SLIK` (pakai `reference` dari respons) dan sekali dengan sumber `KOPERASI` — lalu menggabungkan hasilnya (`isFraud`, `reasons`, `analysis.flags`, `details`) menjadi satu `AntiFraudResponse` yang disimpan di state `antiFraudResult`.

Biaya pengecekan ditampilkan di UI sebagai "Checking Fee: 99 POIN" saat akun berstatus prabayar (`!isPascabayar`, dari hook `useBilling`); untuk akun pascabayar, badge biaya ini disembunyikan.

## Pertanyaan yang Sering Diajukan

**Q: Apa yang membuat Full Check lebih "lengkap" dibanding fitur cek lainnya seperti SLIK Koperasi atau Kredit Lain?**
A: Full Check adalah satu-satunya fitur yang menggabungkan data SLIK OJK dan data SLIK Koperasi dalam satu kali pencarian, plus otomatis menjalankan pengecekan Anti Fraud di baliknya. Fitur lain umumnya hanya menampilkan satu sumber data pada satu waktu.

**Q: Kenapa Full Check terkunci untuk akun saya?**
A: Full Check hanya bisa diakses oleh akun koperasi yang sudah diaktivasi oleh tim Pruviu. Jika akun masih berstatus "belum aktif" (`isActive: false`), sistem akan otomatis mengarahkan kembali ke dashboard dengan pesan bahwa akun masih dalam proses peninjauan.

**Q: Apa itu KOL Score yang muncul di hasil Full Check?**
A: Berdasarkan FAQ resmi di aplikasi, KOL (Kualitas Kredit) Score adalah metrik kesehatan kredit nasabah dengan rentang 300 (Buruk) hingga 850 (Sangat Baik), dihitung dari riwayat pembayaran, jumlah pinjaman aktif, dan total sisa utang. Perlu dicatat, di layar hasil Full Check ada juga kartu "Skor Kolektibilitas (KOL)" berskala 1–5 (Lancar sampai Macet) — ini adalah metrik berbeda dari skor 300–850 tadi meski sama-sama disingkat "KOL". Lihat Catatan Terbuka.

**Q: Apakah Full Check bisa dipakai untuk mengecek penjamin, bukan hanya pemohon pinjaman?**
A: Bisa. Ada toggle "PEMOHON" vs "PENJAMIN" di form; untuk penjamin, sistem memanggil endpoint pengecekan khusus penjamin (`checkFullPenjaminNAE`).

**Q: Apa bedanya mode "Pengajuan Baru (NAE)" dan "Monitoring (ME)"?**
A: NAE dipakai untuk calon nasabah baru — memerlukan data diri lengkap (NIK, nama, alamat, pekerjaan, dll.) beserta upload KTP, KK, dan surat persetujuan (consent). ME dipakai untuk memantau ulang nasabah yang datanya sudah tercatat sebelumnya — cukup dengan NIK dan nomor referensi, tanpa perlu mengisi ulang form atau upload dokumen.

**Q: Berapa biaya sekali pengecekan Full Check?**
A: Untuk akun prabayar, UI menampilkan biaya 99 poin per pengecekan. Untuk akun pascabayar, badge biaya ini tidak ditampilkan — kebijakan tagihan pascabayar sebaiknya dikonfirmasi ke tim billing.

**Q: Apakah hasil Full Check bisa diunduh sebagai laporan?**
A: Ya, jika respons API menyertakan file PDF, tersedia tombol unduh "PDF Lengkap" dan/atau "PDF Tabel", serta opsi "Cetak Ringkasan" untuk mencetak langsung dari browser.

## Catatan Terbuka

- File `KolScoreCard.tsx` dan `KolektibilitasScoreCard.tsx` di kode saat ini isinya identik persis (duplikat, sama-sama menampilkan skor 1–5 "SKOR KOLEKTIBILITAS (KOL)"). Belum jelas apakah ini disengaja (refactor belum selesai) atau salah satu file seharusnya menampilkan skor 300–850 yang dijelaskan di FAQ in-app. Perlu konfirmasi ke tim teknis sebelum menjelaskan detail ini ke calon pelanggan secara teknis.
- Nama "KOL Score" dipakai untuk dua metrik berbeda di kode: skor 300–850 (`cbScore.scoreRaw`, dijelaskan di FAQ) dan skor kolektibilitas 1–5 (Lancar–Macet, ditampilkan di kartu skor). Sales sebaiknya berhati-hati membedakan keduanya saat menjelaskan ke prospek.
