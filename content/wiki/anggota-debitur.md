---
title: "Anggota Debitur"
slug: "anggota-debitur"
category: "manajemen-data"
summary: "Database internal anggota/nasabah milik koperasi sendiri, terpisah dari data SLIK Koperasi maupun SLIK OJK."
---

# Anggota Debitur

## Ringkasan (Tim Sales)

Halaman "Anggota Debitur" adalah daftar nasabah/anggota yang sudah terdaftar di koperasi itu sendiri — ibaratnya buku induk anggota koperasi yang sudah dipindahkan ke sistem Pruviu. Ini berbeda dari fitur SLIK Koperasi atau SLIK OJK, yang fungsinya mengecek riwayat pinjaman seseorang di institusi LAIN (koperasi lain, bank, dsb). Anggota Debitur murni menyimpan data anggota yang menjadi nasabah koperasi yang bersangkutan.

Bagi koperasi, halaman ini menjawab kebutuhan dasar: "siapa saja anggota/debitur kami, dan bagaimana kondisi pinjaman mereka sejauh ini?" Setiap baris menampilkan nama, NIK, tanggal registrasi, nomor CIF (Customer Identification File — nomor identitas internal nasabah di sistem), total pinjaman, dan berapa dari pinjaman itu yang berstatus lancar. Ini memudahkan staf koperasi memantau portofolio anggotanya tanpa harus membuka berkas fisik satu per satu.

Klik ikon "Lihat Detail" pada satu baris akan membuka profil lengkap anggota tersebut: data identitas (tempat/tanggal lahir, jenis kelamin, pendidikan, pekerjaan, nama ibu kandung, NPWP), data domisili dan kontak (alamat, kelurahan, kecamatan, kota, HP, email), serta ringkasan keuangan (total baki debet/pinjaman dan status pinjaman lancar) dan informasi sistem (CIF, tanggal registrasi, status data).

Nilai jual ke prospek: koperasi mendapat satu tempat terpusat untuk melihat profil dan kondisi kredit anggotanya sendiri, mempercepat analisis kredit internal, dan memudahkan audit data anggota dibanding menyimpan data tersebar di Excel atau berkas kertas.

## Cara Kerja (Tim Teknis)

- **Route & komponen**: nav "Anggota Debitur" → route `/nasabah` → komponen `NasabahPage` (`components/dashboard/NasabahPage.tsx`), dengan halaman terkait `NasabahFormPage` (tambah/edit, route berbasis `/nasabah/:nik` — lihat `components/dashboard/NasabahFormPage.tsx`) dan `DetailNasabahPage` (`components/dashboard/DetailNasabahPage.tsx`) sebagai halaman detail penuh (selain modal detail di `NasabahPage`).
- **List data**: `NasabahPage` memanggil `apiService.getNasabahList(page, limit, search, sortBy, order)` yang hit endpoint `GET /nasabah` dengan parameter `page`, `limit`, `sort_by`, `order`, dan `search` (server-side pagination & sorting via `react-data-table-component`, prop `paginationServer` dan `sortServer`). Default sort adalah `created_at DESC`.
- **Detail data**: klik "Lihat Detail" memanggil `apiService.getNasabahDetail(nik)` → `GET /nasabah/{nik}`, mengembalikan objek `NasabahDetail` yang dipetakan ke kartu-kartu info di modal (Profil Identitas, Domisili & Kontak, Total Baki Debet, Status Lancar, Informasi Sistem).
- **Mapping kode ke label**: `NasabahPage` punya dua fungsi lookup lokal, `getEducationLabel` (kode `00`–`06`,`99` sesuai kode pendidikan OJK/BI) dan `getOccupationLabel` (kode pekerjaan `001`–`037`,`099`), untuk menerjemahkan kode master data OJK/BI menjadi label yang bisa dibaca manusia.
- **Form tambah/edit (`NasabahFormPage`)**: form ini cukup panjang dan mengikuti struktur field CIF (Customer Identification File) khas pelaporan SLIK — mencakup data pokok (CIF, nama, NIK, NPWP, tempat/tanggal lahir, alamat, kontak), data detail (golongan pemilik/debitur, keterkaitan, sumber dana, jenis pekerjaan, bidang usaha, account officer, dll — sebagian besar pakai pola `PairedSelect` yang menampilkan kode sekaligus dropdown pilihan), dan data pasangan (nama, NIK, pekerjaan pasangan). Referensi jenis pekerjaan dan bidang usaha diambil dari `apiService.getMasterReferences()` (`GET /master/references`); jika API tidak mengembalikan data, form fallback ke daftar opsi statis dari `constants.ts` (`OCCUPATION_TYPE_OPTIONS`, `BIDANG_USAHA_OPTIONS`, dst).
- **Validasi submit**: sebelum simpan, form mewajibkan NIK (harus persis 16 digit angka) dan Nama Lengkap terisi, serta memvalidasi sesi user (`sessionStorage.getItem('user')`) untuk memastikan `idKoperasi` dan `id` user tersedia.
- **Komponen `AddNasabahModal`**: sudah tidak dipakai — isinya sekarang hanya komentar bahwa komponen ini digantikan oleh `NasabahFormPage` dan aman untuk dihapus.

## Pertanyaan yang Sering Diajukan

**Q: Apa bedanya "Anggota Debitur" dengan "SLIK Koperasi" atau "SLIK OJK"?**
A: Anggota Debitur adalah database internal — daftar anggota/nasabah yang terdaftar di koperasi itu sendiri. SLIK Koperasi dan SLIK OJK adalah fitur pengecekan yang menampilkan riwayat pinjaman seseorang di institusi lain (koperasi lain atau bank), sifatnya read-only, dan tidak menyimpan data koperasi sendiri.

**Q: Bagaimana cara menambahkan anggota/nasabah baru?**
A: Melalui form entri data nasabah (NasabahFormPage) yang bisa diakses dari halaman Anggota Debitur. Minimal wajib mengisi NIK (16 digit) dan Nama Lengkap, plus banyak field detail lain (alamat, pekerjaan, data pasangan, dll) sesuai kebutuhan pelaporan.

**Q: Data apa saja yang tersimpan untuk setiap anggota?**
A: Identitas lengkap (NIK, nama, tempat/tanggal lahir, jenis kelamin, pendidikan, nama ibu kandung, NPWP), domisili dan kontak, data pekerjaan/bidang usaha, status pernikahan dan data pasangan, serta ringkasan pinjaman (total pinjaman dan porsi yang berstatus lancar).

**Q: Apakah tabel ini menunjukkan riwayat kredit dari koperasi lain juga?**
A: Tidak. Angka "Total Pinjaman" dan "Pinjaman Lancar" di halaman ini adalah data yang tercatat di koperasi tersebut sendiri melalui field `totalPinjaman`/`pinjamanLancar` pada profil nasabah. Untuk melihat riwayat pinjaman di koperasi/lembaga lain, gunakan fitur SLIK Koperasi/SLIK OJK.

**Q: Bisa cari anggota berdasarkan apa saja?**
A: Kolom pencarian di halaman Anggota Debitur mencari berdasarkan nama nasabah atau NIK, dengan hasil yang bisa diurutkan (misalnya berdasarkan waktu registrasi atau nama).

**Q: Apakah nomor CIF dibuat otomatis?**
A: Di form saat ini ada tombol "Auto" dan "Verifikasi" di sebelah kolom CIF, tapi keduanya dalam kondisi disabled — jadi belum ada mekanisme otomatis yang aktif untuk pengisian/verifikasi CIF; konfirmasi ke tim teknis untuk status fitur ini.

## Catatan Terbuka

- **Form simpan/edit belum aktif secara fungsional**: pada `NasabahFormPage.tsx`, fungsi `handleSubmit` memanggil placeholder — pemanggilan API penyimpanan nyata (`saveNasabah`) dikomentari dan digantikan hasil simulasi `{ success: false, message: "Simulasi penyimpanan dinonaktifkan." }`. Artinya submit form saat ini tidak benar-benar menyimpan data ke backend. Perlu konfirmasi ke tim teknis apakah ini sengaja dinonaktifkan sementara atau sedang dalam pengembangan, sebelum tim sales menjanjikan fitur tambah/edit nasabah ke prospek.
- **Mode edit belum terhubung ke data nyata**: saat `isEditMode` aktif (mengedit nasabah lewat NIK di URL), kode mencari data existing lewat variabel yang di-hardcode `null` (baris komentar `// dataKoperasi.nasabah.find(...)`), sehingga saat ini mode edit akan selalu menampilkan pesan "Nasabah tidak ditemukan" dan redirect kembali ke daftar.
- **`AddNasabahModal` adalah komponen mati**: filenya hanya berisi komentar bahwa komponen sudah digantikan `NasabahFormPage` dan boleh dihapus — jangan merujuk ke modal ini saat menjelaskan alur ke prospek.
- FAQ bawaan aplikasi (`HelpCenterPage.tsx`) menyebutkan tombol "Tambah Nasabah" dengan alur sederhana (isi NIK & Nama, klik Simpan) — namun form aktual jauh lebih panjang (banyak field detail CIF) dan penyimpanannya belum aktif seperti dijelaskan di atas, jadi FAQ tersebut kemungkinan belum diperbarui mengikuti kondisi form terbaru.
