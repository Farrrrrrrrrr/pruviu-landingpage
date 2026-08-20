---
title: "Pemohon & Penjamin"
slug: "pemohon-penjamin"
category: "manajemen-data"
summary: "Daftar berkas pengajuan kredit beserta penjamin/penanggung yang terkait, terkunci sampai akun koperasi diaktivasi."
---

# Pemohon & Penjamin

## Ringkasan (Tim Sales)

Halaman "Pemohon & Penjamin" menampilkan daftar berkas pengajuan kredit yang tercatat di koperasi — siapa yang mengajukan pinjaman (pemohon), berapa besar plafon yang diajukan, kapan diajukan, dan status berkasnya. Untuk setiap berkas, koperasi juga bisa melihat siapa saja penjamin (penanggung/co-signer) yang didaftarkan atas pengajuan tersebut.

Fitur ini berguna bagi koperasi yang ingin melacak proses pengajuan kredit secara terstruktur: dari sekadar catatan manual atau berkas fisik, menjadi satu daftar digital yang bisa dicari dan diurutkan. Ini juga membantu koperasi memastikan setiap pinjaman punya penjamin yang jelas tercatat — penting untuk mitigasi risiko kredit macet, karena penjamin adalah pihak yang ikut bertanggung jawab bila pemohon gagal bayar.

Satu hal penting yang perlu disampaikan ke prospek: fitur ini terkunci untuk akun koperasi yang statusnya belum diaktivasi. Jadi calon pelanggan yang masih dalam proses onboarding/peninjauan akun tidak akan bisa mengakses halaman ini sampai akun mereka disetujui/diaktifkan oleh tim Pruviu.

Nilai jual: sentralisasi data pengajuan dan penjamin membuat proses persetujuan kredit koperasi lebih rapi dan auditable, serta mempercepat verifikasi siapa saja yang menjamin sebuah pinjaman ketika suatu saat dibutuhkan (misalnya saat penagihan).

## Cara Kerja (Tim Teknis)

- **Route & komponen**: nav "Pemohon & Penjamin" → route `/penjamin` → komponen `PemohonPage` (`components/dashboard/PemohonPage.tsx`).
- **Kunci akses**: route ini dibungkus oleh `ActiveRouteGuard` (`components/auth/ActiveRouteGuard.tsx`). Guard ini membaca `user.isActive` dari `useAuth()`; jika `isActive === false`, muncul `alert("Akun Anda masih dalam proses peninjauan. Fitur ini sementara dikunci.")` dan user di-redirect ke `/dashboard` (`Navigate to="/dashboard"`). Jika `isActive` bernilai `true` atau tidak ada (undefined), halaman tetap bisa diakses — jadi lock hanya aktif kalau field `isActive` eksplisit `false`.
- **List data**: `PemohonPage` memanggil `apiService.getPengajuanList(page, limit, search, sortBy, order)` → `GET /pengajuan` dengan parameter `page`, `limit`, `sort_by`, `order`, `search` (server-side pagination & sort, sama pola dengan halaman Anggota Debitur). Default sort `tanggal_pengajuan DESC`. Kolom pencarian mencari nama nasabah, NIK, atau Reference ID.
- **Kolom tabel**: Tanggal Pengajuan + kode kontrak, Data Nasabah (nama & NIK), Reference ID, Plafon Kredit (`jumlahPengajuan`), Status (badge, membedakan visual antara status `PEMOHON` dan status lain), dan tombol aksi "Lihat Detail".
- **Detail data & penjamin**: klik "Lihat Detail" memanggil `apiService.getPengajuanDetail(id)` → `GET /pengajuan/{id}`, mengembalikan objek bertipe `PengajuanDetailResponse` yang mencakup data pemohon (identitas, domisili, pekerjaan), data kredit (plafon, tanggal pengajuan, nomor kontrak, jatuh tempo, reference), dan array `penjamin` — setiap item penjamin punya `namaSesuaiIdentitas`, `nomorIdentitas`, dan `createdAt` (waktu pendaftaran sebagai penjamin). Modal menampilkan jumlah penjamin dalam badge ("N PENJAMIN") dan kartu per penjamin; jika array kosong, tampil pesan "Tidak ada penjamin terdaftar".
- Style tabel dan pola modal sama persis dengan `NasabahPage` (memakai `react-data-table-component` dan `customStyles` yang identik), sehingga secara UX kedua halaman terasa konsisten.

## Pertanyaan yang Sering Diajukan

**Q: Apa bedanya Pemohon & Penjamin dengan Anggota Debitur?**
A: Anggota Debitur adalah database anggota/nasabah koperasi secara umum. Pemohon & Penjamin lebih spesifik ke berkas pengajuan kredit — siapa yang mengajukan pinjaman dan siapa penjamin yang mendukung pengajuan tersebut, lengkap dengan data plafon dan status berkas.

**Q: Kenapa halaman ini terkunci untuk akun saya?**
A: Halaman ini hanya bisa diakses jika akun koperasi sudah berstatus aktif. Jika akun masih dalam proses peninjauan (belum diaktivasi tim Pruviu), sistem akan menampilkan peringatan dan mengarahkan kembali ke dashboard.

**Q: Berapa lama proses aktivasi akun?**
A: Tergantung kebijakan tim — konfirmasi ke tim onboarding/operasional Pruviu untuk SLA aktivasi akun.

**Q: Apakah satu pengajuan bisa punya lebih dari satu penjamin?**
A: Bisa. Data penjamin disimpan sebagai daftar (array) per pengajuan, jadi satu berkas bisa menampilkan beberapa penjamin sekaligus, masing-masing dengan nama, NIK, dan tanggal pendaftaran sebagai penjamin.

**Q: Informasi apa yang tersedia untuk penjamin?**
A: Dari data yang ditampilkan saat ini: nama sesuai identitas, nomor identitas (NIK), dan tanggal ia terdaftar sebagai penjamin pada pengajuan tersebut. Detail lain seperti alamat/pekerjaan penjamin tidak ditampilkan di kartu penjamin pada halaman ini.

**Q: Bisa cari pengajuan berdasarkan apa saja?**
A: Kolom pencarian mendukung pencarian berdasarkan nama nasabah, NIK, atau Reference ID pengajuan.

**Q: Apa arti badge status "PEMOHON" pada tabel?**
A: Status ini menandakan jenis/tahap berkas. Tabel membedakan tampilan visual antara status "PEMOHON" (badge biru) dan status lain (badge indigo/ungu), namun daftar lengkap kemungkinan nilai status dan artinya tidak terlihat di kode ini — konfirmasi ke tim teknis atau tim produk untuk daftar status yang berlaku.

## Catatan Terbuka

- Logika `ActiveRouteGuard` mengunci halaman hanya bila `user.isActive` secara eksplisit `false`. Jika field tersebut tidak terisi (undefined) pada respons API, guard tidak mengunci akses — perlu dipastikan ke tim teknis apakah backend selalu mengisi field ini agar lock berfungsi konsisten untuk akun yang belum diaktivasi.
- Kode tidak menunjukkan daftar lengkap nilai `status` pengajuan selain contoh "PEMOHON" — sebaiknya dikonfirmasi ke tim produk agar tim sales bisa menjelaskan tahapan status secara akurat ke prospek.
