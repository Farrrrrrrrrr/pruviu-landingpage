---
title: "Unggah & Revisi Laporan"
slug: "unggah-revisi-laporan"
category: "manajemen-data"
summary: "Cara koperasi mengunggah data debitur/fasilitas baru ke Pruviu dan mengunduh hasil revisi laporan CLIK dari server."
---

# Unggah & Revisi Laporan

## Ringkasan (Tim Sales)

Menu **Unggah Laporan** adalah pintu masuk data ke sistem Pruviu. Lewat halaman ini, petugas koperasi mengunggah satu file Excel yang berisi data nasabah (debitur) dan data pinjaman (fasilitas) mereka. Pruviu menyediakan template Excel resmi yang bisa diunduh langsung dari halaman ini, sehingga koperasi tidak perlu menyusun format sendiri — cukup isi template, lalu unggah. Ini adalah fitur inti yang memungkinkan koperasi memasukkan data SLIK/CLIK mereka ke dalam sistem Pruviu untuk kemudian diproses, dicek, atau dianalisis.

Setelah file diunggah dan diproses, sistem menampilkan hasilnya secara rinci: berapa baris data debitur yang berhasil masuk, berapa yang gagal, dan alasan kegagalannya (misalnya nomor identitas tidak valid, atau CIF debitur di sheet fasilitas tidak cocok dengan sheet debitur). Hal yang sama juga berlaku untuk data fasilitas. Ini penting untuk dijelaskan ke prospek: sistem tidak "menolak mentah-mentah" seluruh file jika ada satu baris error — melainkan memproses baris per baris dan melaporkan mana saja yang bermasalah, sehingga petugas koperasi bisa memperbaiki data spesifik itu saja tanpa mengulang dari nol.

Menu **Revisi Laporan** adalah fitur yang berbeda tujuannya: bukan untuk mengunggah data baru, melainkan untuk **mengunduh** hasil olahan/ekstraksi dari proses submission CLIK yang sebelumnya sudah dikirim ke biro/server CLIK. Di sini koperasi bisa mencari dan mengunduh arsip ZIP berisi output ekstraksi data atau log error dari suatu batch submission, misalnya untuk keperluan audit, verifikasi ulang, atau menelusuri riwayat pengiriman data koperasi ke CLIK.

Perbedaan intinya untuk dijelaskan ke prospek: **Unggah Laporan = memasukkan data koperasi ke Pruviu**, sedangkan **Revisi Laporan = mengambil kembali arsip hasil proses submission CLIK yang tersimpan di server**. Keduanya saling melengkapi dalam alur kerja pelaporan SLIK/CLIK koperasi, tapi arah alirannya berlawanan (upload vs download).

## Cara Kerja (Tim Teknis)

**Unggah Laporan** (`ImportDataPage.tsx`, route `/import-data`):
- Menggunakan komponen `FileUpload` dengan atribut `accept=".xlsx,.xls"` — hanya menerima file Excel.
- Template resmi diunduh langsung sebagai file statis dari `/template_import_data.xlsx` (bukan digenerate dinamis).
- File wajib berisi 2 sheet: `D01_Debitur` dan `F01_Fasilitas`. Kolom `Nomor Identitas` harus diformat sebagai teks (Text) di Excel agar NIK 16 digit tidak berubah format, dan kolom tanggal harus format `YYYY-MM-DD` atau format tanggal standar Excel.
- Saat tombol "Proses File" ditekan, file dikirim via `apiService.importSlik(file)` yang melakukan `POST /import/slik` dengan `multipart/form-data`.
- Response diharapkan berbentuk objek `ImportResult` dengan struktur `{ debitur: { successCount, errorCount, errors[] }, fasilitas: { successCount, errorCount, errors[] } }`, di mana setiap item error mengikuti tipe `ImportError` (`types/models.ts`): `{ rowIndex, rowData, reason }`. Baris error ditampilkan lengkap dengan nomor baris, NIK/nomor rekening, dan alasan kegagalan.
- Ada tombol cetak (`handlePrint`, `window.print()`) untuk mencetak hasil impor.
- Catatan kode: komponen meng-import library `xlsx` tapi tidak lagi memakainya untuk parsing header/contoh data secara langsung di frontend (komentar di kode menyebut "Headers and Sample Code removed as we now use static template file") — validasi/parsing utama dilakukan di backend setelah file dikirim.

**Revisi Laporan** (`RevisiLaporanPage.tsx`, route `/revisi-laporan`):
- **Halaman ini saat ini memakai data contoh statis (`sampleData`) yang di-hardcode di kode frontend — belum terhubung ke API/backend nyata.** Tidak ada pemanggilan `apiService` di file ini.
- Data yang ditampilkan berupa daftar batch dengan nama file (format `[kode]_[kode]_SUBMISSION_[timestamp]_EXTRACTION_OUTPUT.zip` atau `..._ERROR_OUTPUT.zip`), tanggal dibuat, ukuran file, dan deskripsi.
- Pencarian (`searchTerm`) memfilter berdasarkan nama batch atau deskripsi, dilakukan di sisi klien (client-side filter) atas data statis tersebut.
- Tombol "Download ZIP" (`handleDownload`) saat ini hanya memunculkan `alert()` simulasi — belum benar-benar mengunduh file dari server FTP.
- Teks di UI menyebutkan bahwa file bersumber dari folder FTP `/output/clik/zip/`, dan ada catatan footer "Dokumen otomatis dihapus setelah 14 hari sesuai kebijakan penyimpanan FTP" — namun ini adalah teks statis di UI, bukan hasil query kebijakan retensi dari backend.

## Pertanyaan yang Sering Diajukan

**Q: Format file apa yang bisa diunggah di Unggah Laporan?**
A: File Excel dengan ekstensi `.xlsx` atau `.xls`, menggunakan template resmi Pruviu (bisa diunduh langsung dari halaman tersebut). File harus berisi dua sheet: `D01_Debitur` untuk data nasabah dan `F01_Fasilitas` untuk data pinjaman.

**Q: Apakah kolom NIK harus diformat khusus?**
A: Ya, kolom "Nomor Identitas" di Excel wajib diformat sebagai "Text", bukan angka/number, agar NIK 16 digit tidak berubah format (misalnya kehilangan digit nol di depan atau berubah jadi notasi ilmiah).

**Q: Apa yang terjadi kalau ada baris data yang salah/tidak valid saat diunggah?**
A: Sistem tetap memproses baris-baris yang valid dan menandai baris yang gagal secara terpisah, lengkap dengan nomor baris dan alasan kegagalannya. Jadi tidak perlu mengulang unggah seluruh file — cukup perbaiki baris yang gagal berdasarkan keterangan error yang ditampilkan.

**Q: Bagaimana sistem memastikan data fasilitas terhubung dengan data debitur yang benar?**
A: Lewat kolom "Nomor CIF Debitur" di sheet F01_Fasilitas, yang harus sama persis dengan CIF yang diisi di sheet D01_Debitur. Jika tidak cocok, baris fasilitas tersebut akan gagal diimpor dengan keterangan alasannya.

**Q: Apa bedanya Unggah Laporan dan Revisi Laporan?**
A: Unggah Laporan untuk memasukkan/mengirim data debitur dan fasilitas koperasi ke Pruviu. Revisi Laporan untuk mengunduh kembali arsip hasil ekstraksi/output dari proses submission CLIK yang sebelumnya sudah dikirim — jadi arahnya kebalikan (upload vs download arsip hasil proses).

**Q: Berapa lama file di Revisi Laporan tersimpan sebelum dihapus?**
A: Di teks UI tertulis "otomatis dihapus setelah 14 hari sesuai kebijakan penyimpanan FTP", namun perlu dikonfirmasi ke tim teknis/tim FTP karena halaman ini masih memakai data contoh dan belum terhubung ke server FTP sungguhan — jadi angka 14 hari ini belum tentu mencerminkan kebijakan produksi aktual. Konfirmasi ke tim teknis sebelum menjanjikan angka ini ke prospek.

**Q: Siapa saja yang bisa mengunggah data di menu Unggah Laporan?**
A: Kode di halaman ini tidak menunjukkan pembatasan role/akses spesifik pada level komponen — tergantung kebijakan hak akses (role/permission) yang diterapkan di level routing/backend. Konfirmasi ke tim teknis untuk detail siapa saja yang berwenang.

## Catatan Terbuka

- **Halaman Revisi Laporan belum terhubung ke backend/API nyata.** Seluruh daftar batch (`sampleData`), tombol download, dan pernyataan kebijakan retensi "14 hari" masih berupa data contoh/simulasi (`alert()`) di kode frontend. Sebelum mendemokan atau menjanjikan fitur ini ke prospek, konfirmasi dulu ke tim teknis apakah fitur ini sudah live di backend produksi.
- Frontend `ImportDataPage.tsx` mengasumsikan backend mengembalikan struktur `ImportResult` yang cocok dengan tipe `{ debitur, fasilitas }` di atas, tapi ada komentar di kode yang menyiratkan ketidakpastian format response backend ("Assuming backend returns a similar structure... For now, we'll assume the backend handles it"). Jika response backend tidak sesuai struktur ini, halaman hanya menampilkan notifikasi sukses generik tanpa rincian hasil impor.
