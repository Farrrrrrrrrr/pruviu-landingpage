---
title: "Akun, Aktivasi & Pengaturan"
slug: "akun-pengaturan"
category: "akun-langganan"
summary: "Cara koperasi mengelola profil dan password sendiri, serta penjelasan status aktivasi akun yang mengunci sebagian fitur untuk koperasi baru."
---

# Akun, Aktivasi & Pengaturan

## Ringkasan (Tim Sales)

Saat koperasi baru mendaftar dan login pertama kali ke Pruviu, akun mereka bisa berada dalam status "belum aktif" sampai ditinjau oleh tim Pruviu. Selama status ini, beberapa fitur premium — seperti Kredit Lain, Credit Scoring, Pemohon & Penjamin, dan Konsul — akan terkunci sementara. Kalau pelanggan mengklik salah satu fitur tersebut saat akunnya belum aktif, mereka akan melihat pesan bahwa akun masih dalam proses peninjauan dan otomatis diarahkan kembali ke dashboard. Fitur-fitur dasar lain seperti SLIK Koperasi (koperasi checking), Anti Fraud, data Nasabah, riwayat pencarian, dan Top Up Poin tetap bisa diakses meskipun status aktivasi belum selesai.

Penting untuk dijelaskan ke prospek: aktivasi ini bukan berarti akun mereka bermasalah, melainkan proses standar peninjauan oleh Pruviu sebelum koperasi diberi akses penuh ke fitur-fitur yang lebih sensitif/berbiaya. Tim sales tidak perlu khawatir menjelaskan detail teknis di baliknya — cukup sampaikan bahwa tim Pruviu akan meninjau dan mengaktifkan akun, dan sementara itu koperasi sudah bisa mulai eksplorasi fitur dasar.

Untuk pengaturan sehari-hari, koperasi bisa mengelola sendiri lewat halaman "Profil & Pengaturan" tanpa perlu menghubungi Pruviu: mengubah nama lengkap pengguna, mengganti password, dan memperbarui data koperasi (nama koperasi, alamat lengkap, nomor telepon). Yang tidak bisa diubah sendiri lewat halaman ini adalah username pengguna dan Nomor Induk Koperasi (NIKop) — kedua data ini ditampilkan dalam kondisi terkunci (read-only) di form.

Jika pelanggan lupa password, mereka bisa memakai fitur "Lupa Password" di halaman login untuk menerima link reset lewat email terdaftar — tidak perlu campur tangan tim Pruviu untuk kasus ini. Setiap kali koperasi berhasil mengganti password lewat halaman Profil & Pengaturan (bukan lewat lupa password), sistem otomatis akan mengeluarkan mereka dari sesi login dan meminta login ulang dengan password baru, sebagai langkah keamanan standar.

## Cara Kerja (Tim Teknis)

Status aktivasi akun disimpan pada field `isActive` di objek `User` (lihat `hooks/useAuth.ts`). Saat login berhasil (`login()` di `useAuth`), field ini diambil dari respons API: `isActive: responseData.isActive !== false` — artinya jika backend tidak mengirim field `isActive` sama sekali, sistem akan default menganggap akun **aktif** (`true`). Field ini disimpan lewat `tokenService.setUser(userData)` dan dipakai lintas komponen melalui state `user` dari `useAuth`.

Penguncian fitur dilakukan oleh `components/auth/ActiveRouteGuard.tsx`. Komponen ini membaca `user` dari `useAuth()`; jika `user.isActive === false`, ia menampilkan `alert("Akun Anda masih dalam proses peninjauan. Fitur ini sementara dikunci.")` lalu me-redirect ke `/dashboard` lewat `<Navigate to="/dashboard" replace />`. Jika `isActive` bukan `false` (termasuk `undefined`/`true`), route dibiarkan render normal (`<Outlet />` atau `children`).

Berdasarkan `App.tsx`, `ActiveRouteGuard` saat ini membungkus route berikut:
- `/kredit-lain` (KreditLainPage)
- `/credit-scoring` (CreditScoringPage)
- `/penjamin` (PemohonPage)
- `/konsul` (KonsulPage)

Route lain seperti `/koperasi-checking` (SLIK Koperasi), `/anti-fraud`, `/nasabah`, `/riwayat-pencarian`, dan `/top-up-point` **tidak** dibungkus `ActiveRouteGuard` di kode saat ini, sehingga tetap bisa diakses tanpa syarat aktivasi.

Halaman pengaturan (`components/dashboard/ProfileSettingsPage.tsx`, route `/profil-pengaturan`) memuat data awal lewat `apiService.getProfileSettings()`, memisahkan data `user` dan `koperasi` dari respons. Tiga form terpisah masing-masing memanggil endpoint berbeda:
- `handleProfileSave` → `apiService.updateProfile({ namaLengkap })` — hanya mengubah nama lengkap; username ditampilkan `disabled`.
- `handlePasswordSave` → `apiService.updatePassword({ currentPassword, newPassword, confirmPassword })`, dengan validasi client-side bahwa `newPassword === confirmPassword`. Setelah sukses, `tokenService.clearAuth()` dipanggil dan pengguna diarahkan paksa ke `/login` (`window.location.href = '/login'`) setelah jeda 1.5 detik.
- `handleKoperasiSave` → `apiService.updateKoperasiSettings({ namaKoperasi, nikop, alamat, noTelpon })` — NIKop (`nomorIndukKoperasi`) ditampilkan `disabled` sehingga tidak bisa diubah dari form ini.

Alur lupa password ditangani `components/auth/ForgotPasswordPage.tsx`, yang memanggil endpoint `POST {VITE_API_BASE_URL}/auth/forgot-password` dengan body `{ email }`, lalu menampilkan pesan bahwa link reset dikirim ke email terdaftar (route lanjutan `/reset-password` ditangani `ResetPasswordPage`, tidak dibaca detail di sini). Login sendiri ditangani `components/auth/LoginPage.tsx` lewat `useAuth().login()`, yang mewajibkan checkbox persetujuan Syarat & Ketentuan sebelum submit ke endpoint `POST {VITE_API_BASE_URL}/auth/login`.

## Pertanyaan yang Sering Diajukan

**Q: Kenapa fitur Kredit Lain / Credit Scoring / Pemohon & Penjamin / Konsul saya terkunci padahal sudah bisa login?**
A: Karena akun koperasi Anda masih berstatus belum aktif (`isActive: false`) dan sedang dalam proses peninjauan oleh tim Pruviu. Fitur-fitur tersebut memang sengaja dikunci sementara sampai aktivasi selesai; fitur dasar lain seperti SLIK Koperasi, Anti Fraud, dan data Nasabah tetap bisa diakses.

**Q: Berapa lama proses aktivasi akun?**
A: Durasi peninjauan tidak diatur di dalam kode aplikasi — ini kebijakan operasional tim Pruviu, konfirmasi ke tim onboarding/CS untuk SLA aktivasi yang berlaku saat ini.

**Q: Apa yang memicu aktivasi akun (jadi aktif)?**
A: Proses ini dilakukan di sisi backend/tim Pruviu (bukan otomatis dari sisi aplikasi frontend) — kriteria persisnya tidak ditemukan di kode frontend, konfirmasi ke tim terkait (kemungkinan verifikasi dokumen/data koperasi saat onboarding).

**Q: Bisakah saya mengubah email akun sendiri?**
A: Berdasarkan form di halaman Profil & Pengaturan, hanya "Nama Lengkap" pengguna dan data koperasi (nama, alamat, no. telepon) yang bisa diubah sendiri. Field email tidak muncul di form profil ini (yang ada adalah field "Username", yang ditampilkan terkunci/disabled) — untuk perubahan email/username, konfirmasi ke tim teknis atau CS.

**Q: Bagaimana jika saya lupa password?**
A: Gunakan tautan "Lupa Password" di halaman login, masukkan email terdaftar, dan sistem akan mengirimkan link reset password ke email tersebut secara otomatis — tidak perlu menghubungi Pruviu untuk kasus ini.

**Q: Apakah saya bisa mengubah Nomor Induk Koperasi (NIKop)?**
A: Tidak lewat halaman Profil & Pengaturan — field NIKop ditampilkan dalam kondisi terkunci (read-only). Perubahan NIKop kemungkinan perlu proses khusus lewat tim Pruviu.

**Q: Apa yang terjadi setelah saya berhasil ganti password?**
A: Sistem otomatis logout dan mengarahkan Anda ke halaman login setelah jeda singkat, sehingga Anda perlu login ulang dengan password baru.

**Q: Apakah semua anggota tim koperasi punya akses yang sama di aplikasi?**
A: Data `role` memang tercatat pada objek pengguna saat login, tetapi detail perbedaan hak akses antar role tidak dibahas di file-file yang dicek untuk artikel ini — konfirmasi ke tim teknis jika prospek menanyakan manajemen multi-user/role secara spesifik.

## Catatan Terbuka

- Deskripsi tugas awal menyebut bahwa SLIK OJK dan Full Check turut terkunci oleh status aktivasi, namun berdasarkan `App.tsx` saat ini, `ActiveRouteGuard` hanya membungkus route `/kredit-lain`, `/credit-scoring`, `/penjamin`, dan `/konsul` — route `/koperasi-checking` (SLIK) dan `/anti-fraud` tidak dibungkus guard tersebut. Artikel ini mengikuti kondisi kode yang sebenarnya; jika daftar fitur terkunci berbeda dengan yang dikomunikasikan ke pelanggan, perlu diselaraskan dengan tim produk/teknis.
- `ActiveRouteGuard` memakai `window.alert()` browser bawaan untuk pesan peninjauan akun, bukan komponen UI kustom — pengalaman ini agak kasar (blocking alert) dan mungkin akan diganti dengan halaman "Pending Activation" khusus di masa depan (ada komentar TODO terkait ini di kode).
