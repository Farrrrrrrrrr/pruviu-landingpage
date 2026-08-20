---
title: "Konsul"
slug: "konsul"
category: "skor-pengecekan"
summary: "Konsul adalah fitur koperasi untuk mengelola member/user pemohon yang bisa melakukan konsultasi/checking lewat aplikasi mobile, lengkap dengan kuota dan harga label."
---

# Konsul

## Ringkasan (Tim Sales)

Konsul adalah menu di dashboard koperasi untuk mengelola "user pemohon" — yaitu member atau nasabah koperasi yang diberi akses melakukan konsultasi/pengecekan (checking) lewat aplikasi mobile milik koperasi. Di halaman ini, admin koperasi bisa melihat daftar user pemohon lengkap dengan status aktivasi (Active/Inactive), sisa kuota check, harga label yang dikenakan ke member tersebut, serta daftar penjamin (nama dan NIK) yang terkait dengan masing-masing user.

Dari sisi operasional, admin koperasi bisa melakukan tiga aksi utama terhadap setiap user pemohon: (1) mengaktivasi member yang masih berstatus Inactive dengan menetapkan "harga label" (harga yang akan dikenakan ke member itu untuk setiap check), (2) menambah kuota check untuk member yang sudah aktif — pembelian kuota ini dihitung dengan tarif Rp 109 per kuota (khusus untuk koperasi dengan skema prabayar; untuk koperasi pascabayar, penambahan kuota tidak langsung memotong saldo karena tagihan diurus terpisah sesuai perjanjian), dan (3) mengedit harga label yang sudah ditetapkan sebelumnya.

Selain daftar member, ada tab "Pengaturan" yang berisi informasi rekening bank koperasi (nama bank, kantor cabang, nomor rekening, atas nama rekening) serta upload logo koperasi. Logo ini akan tampil di halaman utama aplikasi mobile member saat mereka melakukan konsultasi/checking — jadi ini semacam white-labeling ringan agar aplikasi terasa seperti milik koperasi tersebut, bukan Pruviu.

Secara singkat, Konsul bisa dijelaskan ke prospek sebagai: "fitur bagi koperasi untuk mengelola siapa saja anggota/nasabah mereka yang boleh melakukan pengecekan kredit lewat aplikasi mobile, berapa kuota yang mereka punya, berapa harga yang dikenakan ke mereka, dan tampilan aplikasi mobile bisa dibranding dengan logo koperasi sendiri."

## Cara Kerja (Tim Teknis)

Komponen: `components/dashboard/KonsulPage.tsx`, dirender di route `/konsul` yang dibungkus `ActiveRouteGuard` (lihat `components/auth/ActiveRouteGuard.tsx`) — jika `user.isActive === false`, guard ini langsung menampilkan `alert("Akun Anda masih dalam proses peninjauan. Fitur ini sementara dikunci.")` lalu redirect ke `/dashboard`. Jadi Konsul hanya bisa diakses oleh akun koperasi yang sudah diaktivasi oleh tim Pruviu.

Halaman punya dua tab (`activeTab`: `'members'` | `'settings'`):

- **Tab Members**: fetch data lewat `apiService.getMembers()`, ditampilkan sebagai array `KonsulMember[]` (tipe didefinisikan di `types/models.ts`): `id, name, email, phoneNumber, joinDate, creditQuota, status ('Active'|'Inactive'), penjamin[], priceLabel?`. Tiga aksi memanggil endpoint berbeda: `apiService.activateMember(id, price)`, `apiService.setMemberQuota(id, newTotalQuota)`, `apiService.editMember(id, newPrice)`. Harga tambah kuota dihitung fixed di frontend: `quotaInput * 109`. Logika prabayar/pascabayar diambil dari hook `useBilling` (`hooks/useBilling.ts`) yang membaca `koperasi.billingType` dari `apiService.getKoperasiInfo`; jika `isPascabayar`, modal tidak menampilkan kalkulasi harga/saldo dan pesan konfirmasi berbeda ("Tambah kuota" vs "Beli kuota dengan harga X").
- **Tab Settings**: fetch lewat `apiService.getKoperasiInfo(koperasiId)` (koperasiId diambil dari JWT lewat `tokenService.decodeToken`), mengisi form `bankName, kantorCabang, bankAccountNumber, bankAccountName`, dan preview logo dari `logoPath`. Simpan lewat `apiService.updateKonsulSettings(settingsForm)`. Tipe payload yang dipakai untuk update adalah `KonsulSettingsPayload` (`types/form.ts`): `{ bankName, kantorCabang, bankAccountNumber, bankAccountName, priceLabel, logo }` — catatan: field `priceLabel` ada di tipe ini tapi tidak terlihat diisi/dipakai eksplisit di form state `KonsulPage.tsx` (kemungkinan legacy field atau dihandle di layer lain).

Tidak ada logika skoring atau kalkulasi kredit di komponen ini — Konsul murni CRUD manajemen member, kuota, dan pengaturan tampilan/pembayaran koperasi.

## Pertanyaan yang Sering Diajukan

**Q: Apa itu "user pemohon" di Konsul?**
A: Itu adalah member/nasabah koperasi yang diberi akses melakukan konsultasi atau pengecekan kredit lewat aplikasi mobile koperasi. Koperasi yang mengelola siapa saja yang aktif dan berapa kuotanya.

**Q: Kenapa menu Konsul terkunci untuk beberapa akun?**
A: Konsul hanya bisa diakses jika akun koperasi sudah diaktivasi (status `isActive`). Jika akun masih dalam proses peninjauan, sistem akan menampilkan pesan bahwa fitur ini sementara dikunci dan mengarahkan kembali ke dashboard. Aktivasi akun ini kebijakan internal tim — konfirmasi ke tim yang menangani onboarding koperasi.

**Q: Berapa harga per kuota check di Konsul?**
A: Untuk koperasi dengan skema prabayar, harga yang terlihat di kode adalah Rp 109 per kuota. Untuk skema pascabayar, penambahan kuota tidak memotong saldo secara langsung karena tagihan diatur sesuai perjanjian terpisah — untuk detail perjanjian pascabayar, konfirmasi ke tim bisnis/finance.

**Q: Apa fungsi upload logo di tab Pengaturan?**
A: Logo yang diupload akan tampil di halaman utama aplikasi mobile member koperasi saat mereka melakukan konsultasi/checking — semacam branding ringan agar aplikasi terasa milik koperasi tersebut.

**Q: Apakah Konsul melakukan proses scoring/credit checking itu sendiri?**
A: Tidak. Konsul hanya mengelola data member (aktivasi, kuota, harga, data pembayaran/logo). Proses cek kredit/scoring dilakukan di fitur lain (mis. Koperasi Checking, Credit Scoring) — Konsul adalah panel administrasi untuk siapa yang boleh memakai fitur tersebut lewat aplikasi mobile.

## Catatan Terbuka

Field `priceLabel` ada di tipe `KonsulSettingsPayload` (`types/form.ts`) tetapi tidak terlihat diisi secara eksplisit di form state `KonsulPage.tsx` — perlu konfirmasi ke tim teknis apakah ini legacy/tidak terpakai atau memang di-handle di tempat lain, sebelum dijelaskan ke prospek sebagai bagian dari alur "Pengaturan".
