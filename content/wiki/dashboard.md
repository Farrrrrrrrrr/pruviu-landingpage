---
title: "Dashboard"
slug: "dashboard"
category: "laporan-riwayat"
summary: "Halaman utama yang menampilkan status akun, ringkasan pemakaian bulan ini, grafik pemakaian, dan riwayat pengecekan/aktivitas hari ini."
---

# Dashboard

## Ringkasan (Tim Sales)

Dashboard adalah halaman pertama yang dilihat pengguna koperasi setelah login ke Pruviu. Tujuannya adalah memberi gambaran cepat: apakah akun koperasi sudah aktif, seberapa banyak layanan yang sudah dipakai bulan ini, dan apa saja yang terjadi hari ini di akun mereka.

Di bagian atas, pengguna langsung melihat status akun mereka (misalnya "Aktif" atau "Tidak Aktif"). Jika akun koperasi masih dalam tahap peninjauan oleh tim admin Pruviu, akan muncul notifikasi kuning yang menjelaskan bahwa fitur-fitur utama seperti SLIK OJK dan Full Check masih terkunci, dengan estimasi waktu tinjauan 2-3 hari kerja. Ini penting untuk dijelaskan ke calon pelanggan: begitu mendaftar, tidak semua fitur langsung bisa dipakai sampai proses verifikasi admin selesai.

Di bawahnya ada ringkasan pemakaian bulan berjalan untuk lima layanan: SLIK Koperasi, SLIK OJK, Anti Fraud, Credit Scoring, dan Konsul. Tampilannya berbeda tergantung skema tagihan koperasi tersebut: koperasi dengan skema pascabayar (tagihan diurus di belakang, tidak perlu top up di muka) akan melihat jumlah "kali" pemakaian, sedangkan koperasi dengan skema prabayar (harus top up poin dulu) akan melihat nominal biaya yang sudah dikeluarkan (dalam Rupiah). Ini membantu koperasi memantau pemakaian mereka tanpa harus menghubungi tim Pruviu.

Di bagian bawah ada grafik tren pemakaian bulanan, tabel riwayat pengecekan NIK hari ini (siapa yang dicek dan jenis pengecekan apa), serta daftar aktivitas pengguna hari ini (login, tambah nasabah, ubah profil, dan sebagainya). Semua ini membantu admin koperasi mengaudit aktivitas timnya sendiri.

## Cara Kerja (Tim Teknis)

Komponen utama: `components/dashboard/DashboardPage.tsx`, memakai sub-komponen `DashboardChart` dari `components/dashboard/DashboardChart.tsx`.

Sumber data:
- `apiService.getDashboardStats()` → `GET /dashboard/stats`, mengembalikan objek `DashboardStats` (mencakup `pruviuStatus`, serta `totalCount*`/`totalCost*` untuk KoperasiChecking, SlikOjk, AntiFraud, CreditScoring, dan Konsul).
- `apiService.getDashboardCheckings(page, limit)` → `GET /dashboard/checkings`, dipanggil dengan paginasi 10 item/halaman melalui state `checkingPage` dan komponen `Pagination`.
- `apiService.getDashboardActivities(page, limit)` → `GET /dashboard/activities`, juga paginasi 10 item/halaman.
- Ketiganya dipanggil paralel via `Promise.all` di `useEffect` saat mount (fungsi `initData`).

Logika kondisional penting:
- `useAuth()` menyediakan `loggedInUser`. Jika `loggedInUser.isActive === false`, banner peringatan kuning "Akun Sedang Ditinjau" ditampilkan di atas halaman.
- `useBilling()` (di `hooks/useBilling.ts`) mengembalikan `isPascabayar`, hasil fetch `apiService.getKoperasiInfo(user.idKoperasi)` yang membaca field `billingType` ('prabayar' | 'pascabayar', default 'prabayar' jika gagal fetch atau field kosong). Semua `StatCard` di grid "RINGKASAN BULAN INI" berubah label dan format nilai tergantung `isPascabayar`: jika true, tampilkan `totalCount*` dengan suffix "kali"; jika false, tampilkan `totalCost*` diformat via `formatRupiah()` (catatan: fungsi ini mengalikan `amount * 100` sebelum diformat — perhatikan satuan angka dari backend).
- Nilai "Total Pengecekan"/"Total Pengeluaran" pada kartu pertama adalah penjumlahan manual kelima `totalCount*`/`totalCost*` di frontend, bukan field agregat tersendiri dari API.
- Riwayat aktivitas memetakan `activity.activityType` ke ikon lewat `activityIconMap` (mendukung tipe lama seperti `Login`, `Tambah Nasabah`, dan tipe baru seperti `CHECK_ANTIFRAUD`, `CHECK_KOPERASI`, `CHECK_CLIK_ME`, `CHECK_CLIK_SCORING_ME`); tipe yang tidak dikenal jatuh ke ikon default `ClipboardDocumentListIcon`.

`DashboardChart.tsx` (grafik "Riwayat Biaya/Jumlah Pengecekan"):
- Memanggil `apiService.getDashboardChartData(startDate, endDate, backendType)` → `GET /dashboard/chart?startDate=...&endDate=...&serviceType=...`, di-trigger ulang otomatis tiap kali `startDate`, `endDate`, atau `selectedType` berubah (via `useCallback` + `useEffect`).
- Default rentang tanggal adalah 1 Januari s.d. 31 Desember tahun berjalan.
- `selectedType` memfilter per layanan (`slikKoperasi`, `slikOjk`, `antiFraud`, `creditScoring`, `konsul`) atau `ALL`; dipetakan ke kode backend lewat `BACKEND_TYPE_MAP` (mis. `creditScoring` → `FULL_CHECK`, `konsul` → `CONSUL_QUOTA`).
- Sama seperti halaman utama, tampilan chart dan kartu ringkasan (`SummaryCards`) berubah berdasarkan `isPascabayar` dari `useBilling()`: mode pascabayar menampilkan jumlah kali (`totalSlikKoperasi`, dst.), mode prabayar menampilkan nominal biaya.
- Dibangun dengan library Recharts (`BarChart`, `Bar`, `Tooltip` kustom).

## Pertanyaan yang Sering Diajukan

**Q: Setelah daftar, apakah semua fitur Pruviu langsung bisa dipakai?**
A: Tidak selalu. Jika akun koperasi masih berstatus "belum aktif" (`isActive === false`), sistem menampilkan notifikasi bahwa fitur seperti SLIK OJK dan Full Check masih terkunci sampai proses tinjauan admin selesai, dengan estimasi 2-3 hari kerja.

**Q: Kenapa dashboard koperasi kami menampilkan "Rp" sementara koperasi lain menampilkan "kali"?**
A: Itu tergantung skema tagihan (`billingType`) koperasi Anda. Skema pascabayar menampilkan jumlah pemakaian ("kali"), sedangkan skema prabayar menampilkan nominal biaya yang harus di-top up. Jenis skema mana yang berlaku untuk koperasi tertentu adalah kebijakan internal — konfirmasikan ke tim billing/onboarding.

**Q: Apakah dashboard menampilkan seluruh riwayat pengecekan, atau hanya hari ini?**
A: Tabel "Riwayat Pengecekan" dan "Riwayat Aktivitas" di dashboard hanya menampilkan data hari ini, dengan paginasi 10 item per halaman. Untuk riwayat lengkap lintas tanggal, gunakan halaman riwayat pencarian/aktivitas terpisah (di luar cakupan dashboard ini).

**Q: Grafik pemakaian bisa difilter per tanggal atau per jenis layanan?**
A: Bisa. Ada input rentang tanggal (default: 1 Jan - 31 Des tahun berjalan) dan dropdown filter jenis layanan (Semua Fitur, SLIK Koperasi, SLIK OJK, Anti Fraud, Credit Scoring, Konsul).

**Q: Apakah angka "Total Pengecekan"/"Total Pengeluaran" di kartu utama adalah data resmi dari server?**
A: Angka itu dihitung di sisi aplikasi dengan menjumlahkan lima kategori layanan (SLIK Koperasi, SLIK OJK, Anti Fraud, Credit Scoring, Konsul) dari data yang sama yang dikirim server (`/dashboard/stats`), bukan field agregat terpisah.

**Q: Apakah ada notifikasi jika belum ada pengecekan/aktivitas hari ini?**
A: Ya, jika belum ada data, tabel dan daftar menampilkan pesan "Belum ada pengecekan hari ini" atau "Belum ada aktivitas hari ini" (atau "Memuat data..." saat masih loading).

## Catatan Terbuka

Perhitungan `formatRupiah()` dan `formatValue()` di dalam chart mengalikan nilai dari API dengan 100 sebelum ditampilkan sebagai Rupiah (`amount * 100`). Ini kemungkinan mengasumsikan backend mengirim nilai dalam satuan sen/ratusan rupiah — perlu dikonfirmasi ke tim teknis backend agar tidak salah menjelaskan nominal ke pelanggan jika terlihat janggal.
