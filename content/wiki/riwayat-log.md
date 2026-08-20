---
title: "Riwayat & Log Aktivitas"
slug: "riwayat-log"
category: "laporan-riwayat"
summary: "Perbedaan antara riwayat transaksi poin/pengecekan koperasi dan log audit trail seluruh aktivitas sistem di Pruviu."
---

# Riwayat & Log Aktivitas

## Ringkasan (Tim Sales)

Menu **Riwayat Pengecekan** menampilkan riwayat transaksi penggunaan poin koperasi — setiap kali koperasi melakukan pengecekan data (misalnya cek SLIK/CLIK nasabah), sistem mencatatnya sebagai transaksi yang mengurangi atau menambah saldo poin. Halaman ini menunjukkan tanggal transaksi, layanan yang digunakan, keterangan/deskripsi transaksi, jumlah poin yang terpakai atau bertambah, dan saldo poin setelah transaksi tersebut (running balance). Ini penting bagi koperasi yang masih menggunakan skema poin prabayar untuk memantau pemakaian poin mereka secara transparan — mereka bisa melihat persis kapan dan untuk layanan apa poin mereka terpakai.

Untuk koperasi yang sudah menggunakan skema billing pascabayar (postpaid), kolom poin dan saldo ini disembunyikan secara otomatis, karena tidak relevan — mereka tidak lagi membayar per-poin di muka, jadi halaman ini akan tampil lebih sederhana, hanya menampilkan waktu, layanan, dan keterangan transaksi.

Menu **Log Aktivitas** (ditampilkan di aplikasi dengan judul "Audit Trail & Log Aktivitas") adalah fitur yang jauh lebih luas cakupannya: ini adalah rekaman audit trail dari seluruh aktivitas yang terjadi di sistem, bukan hanya transaksi poin. Log ini mencatat siapa (nama petugas/user) melakukan apa (jenis aktivitas seperti login, update, delete, dsb), kapan, dari alamat IP mana, dan dari perangkat/sumber apa. Fitur ini ditujukan untuk keperluan audit keamanan dan pemantauan operasional — misalnya untuk menelusuri siapa yang mengubah atau menghapus data tertentu, atau untuk investigasi jika ada aktivitas mencurigakan.

Jadi perbedaan utamanya: **Riwayat Pengecekan berfokus pada transaksi poin/pemakaian layanan** (relevan untuk pertanyaan billing dan pemakaian kuota), sedangkan **Log Aktivitas berfokus pada jejak audit keamanan seluruh sistem** (relevan untuk pertanyaan keamanan, akuntabilitas petugas, dan kepatuhan/compliance).

## Cara Kerja (Tim Teknis)

**Riwayat Pengecekan** (`RiwayatPencarianPage.tsx`, route `/riwayat-pencarian`):
- Mengambil data lewat `apiService.getPointLedgerHistory(page, limit, search, sortBy, order)`, yang memanggil `GET /search-history/points` dengan parameter pagination, pencarian, dan sorting (server-side, bukan client-side filter).
- Tipe data: `PointLedgerHistoryItem` (`types/models.ts`) — field-nya meliputi `id`, `time`, `event_type`, `direction` ('IN' | 'OUT'), `point_amount`, `balance_before`, `balance_after`, `source_service`, dan `description`.
- Kolom "Points" dan "Saldo Akhir" ditampilkan secara kondisional berdasarkan hook `useBilling()` — field `isPascabayar`. Jika koperasi berstatus pascabayar (`billingType === 'pascabayar'`, diambil dari `apiService.getKoperasiInfo`), kedua kolom itu disembunyikan.
- Mendukung pencarian (search bar), sorting per kolom (default: sort by `time`, DESC), dan pagination server-side lewat komponen `react-data-table-component`.
- Catatan: walau judul menu adalah "Riwayat Pengecekan" (implikasinya riwayat pencarian/pengecekan NIK per nasabah), data yang sebenarnya ditampilkan adalah **ledger transaksi poin** (endpoint `/search-history/points`), bukan detail per-pencarian seperti NIK yang dicek. Ada tipe terpisah `SearchHistoryItem` di `types/models.ts` (dengan field `nik_queried`, `nama_nasabah`, `search_type`) yang tampaknya dirancang untuk riwayat pencarian per-NIK, tapi tipe ini tidak dipakai di halaman ini.

**Log Aktivitas** (`LogActivityPage.tsx`, route `/log-aktivitas`):
- Mengambil data lewat `apiService.getActivityLogs(page, limit, search, sortBy, order)`, yang memanggil `GET /activity-logs` dengan parameter pagination, pencarian, dan sorting (server-side).
- Tipe data: `ActivityLogItem` (`types/models.ts`) — field-nya meliputi `time`, `user`, `activity`, `description`, `ip_address`, `source`.
- Kolom "Aktivitas" diberi warna badge berbeda berdasarkan isi teksnya: hijau jika mengandung "LOGIN", merah jika mengandung "DELETE", biru jika mengandung "UPDATE", abu-abu untuk lainnya — ini murni styling di frontend berdasarkan substring, bukan kategori resmi dari backend.
- Default sort: `created_at`, DESC. Mendukung pencarian, sorting, dan pagination server-side yang sama seperti Riwayat Pengecekan.
- Tidak ada logika pembatasan akses (role-check) di level komponen ini — jika hanya admin yang boleh melihat halaman ini, pembatasan tersebut ada di level routing atau backend, bukan terlihat di file ini.

## Pertanyaan yang Sering Diajukan

**Q: Apa isi Riwayat Pengecekan — riwayat NIK yang dicek atau riwayat transaksi poin?**
A: Berdasarkan kode saat ini, halaman ini menampilkan riwayat transaksi poin (ledger) — kapan poin terpakai/bertambah, untuk layanan apa, dan saldo poin setelahnya. Bukan daftar NIK/nasabah yang dicek satu per satu.

**Q: Apakah semua koperasi melihat kolom "Points" dan "Saldo Akhir"?**
A: Tidak. Kolom tersebut hanya muncul untuk koperasi dengan skema billing prabayar. Koperasi dengan skema pascabayar tidak melihat kolom poin/saldo karena tidak relevan dengan skema pembayaran mereka.

**Q: Berapa lama riwayat pengecekan dan log aktivitas disimpan (retensi data)?**
A: Tidak ada informasi periode retensi di kode frontend — ini murni ditentukan kebijakan backend/database. Konfirmasi ke tim teknis untuk kebijakan retensi yang berlaku.

**Q: Siapa yang bisa melihat Log Aktivitas — semua pengguna atau hanya admin?**
A: Kode komponen ini sendiri tidak menunjukkan pembatasan role. Kemungkinan ada pembatasan di level routing atau backend (misalnya hanya admin koperasi), tapi ini perlu dikonfirmasi ke tim teknis karena tidak terlihat dari kode halaman ini.

**Q: Bagaimana cara mencari transaksi atau aktivitas tertentu di kedua halaman ini?**
A: Kedua halaman punya kolom pencarian di bagian atas tabel. Pencarian dikirim ke backend (server-side search) beserta parameter sorting dan halaman, jadi hasil pencarian mencakup seluruh data di server, bukan hanya data yang sedang ditampilkan di layar.

**Q: Apakah warna badge di kolom Aktivitas (hijau/merah/biru) punya arti resmi seperti "level keparahan"?**
A: Tidak ada arti resmi tingkat keparahan; warna hanya ditentukan otomatis dari kata kunci di teks aktivitas (mengandung "LOGIN" → hijau, "DELETE" → merah, "UPDATE" → biru, selain itu abu-abu). Ini murni bantuan visual, bukan klasifikasi risiko dari backend.

**Q: Bisakah data di kedua tabel ini diunduh/diekspor?**
A: Tidak ada tombol atau fungsi ekspor/download di kedua halaman ini berdasarkan kode saat ini. Jika prospek membutuhkan fitur ekspor, sampaikan sebagai permintaan fitur ke tim produk.

## Catatan Terbuka

- Ada ketidaksesuaian antara nama menu "Riwayat Pengecekan" (mengesankan riwayat pencarian/pengecekan NIK) dengan data yang sebenarnya ditampilkan (ledger transaksi poin, endpoint `/search-history/points`). Ada tipe `SearchHistoryItem` terpisah di `types/models.ts` yang tampak dirancang untuk riwayat pencarian per-NIK (dengan field `nik_queried`, `nama_nasabah`, `search_type`) tapi belum dipakai di halaman manapun yang ditinjau. Perlu dikonfirmasi ke tim teknis apakah ini fitur terpisah yang belum dibangun UI-nya, atau penamaan menu yang perlu disesuaikan.
