---
title: "Top Up Poin & Model Billing"
slug: "top-up-poin"
category: "akun-langganan"
summary: "Penjelasan fitur Top Up Poin dan perbedaan model billing prabayar vs pascabayar untuk koperasi."
---

# Top Up Poin & Model Billing

## Ringkasan (Tim Sales)

Pruviu punya dua model pembayaran untuk koperasi: **prabayar** dan **pascabayar**. Ini adalah salah satu pertanyaan paling sering dari prospek, jadi penting untuk dipahami dengan baik.

Koperasi dengan model **prabayar** harus mengisi saldo poin terlebih dahulu sebelum bisa memakai layanan berbayar (SLIK OJK, Credit Scoring, Anti Fraud, Konsul, dan lain-lain). Setiap kali koperasi melakukan pengecekan, saldo poinnya akan berkurang sesuai biaya layanan tersebut. Koperasi jenis ini akan melihat menu "Top Up Poin" dan widget saldo poin di sidebar dashboard mereka. Model ini cocok untuk koperasi yang ingin kontrol penuh atas pengeluaran mereka — mereka hanya bisa memakai layanan sebatas saldo yang tersedia.

Koperasi dengan model **pascabayar** tidak perlu top up sama sekali. Mereka langsung memakai semua layanan, dan tagihannya diurus di belakang layar sesuai perjanjian/kontrak yang disepakati dengan Pruviu — bukan lewat sistem poin di aplikasi. Untuk koperasi jenis ini, menu "Top Up Poin" dan widget saldo poin di sidebar disembunyikan sepenuhnya, karena memang tidak relevan. Yang mereka lihat di dashboard adalah riwayat jumlah pemakaian (berapa kali cek SLIK, berapa kali Credit Scoring, dst), bukan riwayat biaya dalam Rupiah.

Secara default, jika sistem belum sempat mengambil data billing koperasi (misalnya saat baru login atau terjadi gangguan jaringan), aplikasi akan menganggap koperasi tersebut prabayar sampai data yang benar berhasil diambil. Ini penting diketahui tim sales: kalau prospek bertanya "saya pascabayar tapi kok sempat lihat menu Top Up Poin?", kemungkinan itu hanya kondisi sesaat saat aplikasi masih memuat data, bukan kesalahan konfigurasi akun.

Untuk koperasi prabayar, halaman Top Up Poin menyediakan beberapa paket top up siap pakai (Rp500rb, Rp1jt, Rp5jt, Rp10jt) atau nominal custom minimal Rp1.000, dengan konversi tetap Rp1.000 = 10 Poin. Pembayaran dilakukan lewat Virtual Account bank (BNI, BRI, Mandiri, BSI), dan koperasi bisa melihat riwayat semua transaksi top up mereka di halaman yang sama.

## Cara Kerja (Tim Teknis)

Model billing koperasi ditentukan oleh hook `useBilling` (`hooks/useBilling.ts`). Hook ini memanggil `apiService.getKoperasiInfo(user.idKoperasi)` dan membaca field `billingType` dari respons (`'prabayar'` atau `'pascabayar'`). Jika field tersebut kosong atau request gagal, nilai fallback-nya selalu `'prabayar'`. Hook mengekspos flag turunan `isPrabayar` dan `isPascabayar` yang dipakai di banyak komponen untuk menyembunyikan/menampilkan elemen UI, contohnya:
- `components/Sidebar.tsx` — item nav "Top Up Poin" dan widget saldo poin di-render hanya jika `!isPascabayar`.
- `components/dashboard/DashboardPage.tsx` dan `DashboardChart.tsx` — mengganti label kartu statistik antara "Biaya X" (prabayar, dalam Rupiah) vs "Total X" (pascabayar, dalam jumlah kali pengecekan).
- Beberapa halaman fitur (`CreditScoringPage.tsx`, `AntiFraudPage.tsx`, `KreditLainPage.tsx`, `KonsulPage.tsx`, `KoperasiCheckingPage.tsx`, `RiwayatPencarianPage.tsx`) juga memakai `isPascabayar` untuk menyembunyikan elemen terkait biaya/poin yang tidak relevan bagi koperasi pascabayar.

Saldo poin sendiri diambil lewat hook `useWallet` (`hooks/useWallet.ts`), yang memanggil `apiService.getPointBalance()` saat mount dan menyimpan hasilnya di state `balance`. Hook ini juga membersihkan sisa data lama di localStorage (`cached_wallet_balance`, `dummy_wallet_balance`, `topup_history`) setiap kali di-mount — jadi saldo poin sekarang murni berasal dari API, bukan dari cache browser. Update saldo antar-komponen dalam satu window dilakukan lewat `CustomEvent('wallet-update')` yang di-dispatch dan didengarkan lintas komponen, bukan lewat localStorage.

Halaman `components/dashboard/TopUpPointPage.tsx` (route `/top-up-point`, komponen `TopUpPointPage`) adalah tempat koperasi prabayar melakukan top up:
- Paket top up (`TOP_UP_PACKAGES`) berisi nominal tetap: 5.000/10.000/50.000/100.000 Poin setara Rp500rb/1jt/5jt/10jt.
- Nominal custom minimal Rp1.000, dikonversi dengan rumus tetap `points = rupiah / 100` (artinya Rp1.000 = 10 Poin, sesuai teks di UI).
- Saat konfirmasi, aplikasi memanggil `apiService.createTopupDepay()` dengan `paymentMethod: "VIRTUAL_ACCOUNT"` dan channel bank yang dipilih (diambil dari `apiService.getDepayChannels()`, difilter hanya BNI/BRI/MANDIRI/BSI).
- Hasilnya berupa nomor Virtual Account dan batas waktu pembayaran (`expiredAt`) yang ditampilkan di modal sukses.
- Riwayat top up diambil dari `apiService.getTopUpHistory(page, itemsPerPage)`, dengan status `success` / `pending` / `failed`. Transaksi berstatus pending bisa diklik lagi untuk melihat ulang detail VA-nya.

## Pertanyaan yang Sering Diajukan

**Q: Apa bedanya prabayar dan pascabayar?**
A: Prabayar berarti koperasi harus mengisi saldo poin dulu sebelum bisa memakai layanan, dan saldo tersebut berkurang setiap kali dipakai. Pascabayar berarti koperasi langsung memakai semua layanan tanpa perlu top up, dan tagihannya ditangani sesuai perjanjian di luar sistem poin aplikasi — hanya riwayat pemakaian yang dicatat di dashboard.

**Q: Bagaimana koperasi memilih jadi prabayar atau pascabayar?**
A: Penentuan model billing ini adalah keputusan bisnis/perjanjian dengan tim Pruviu, bukan sesuatu yang bisa diubah sendiri oleh koperasi di aplikasi — tergantung kebijakan tim, konfirmasi ke tim sales/onboarding untuk detail kriteria dan proses penetapannya.

**Q: Apa yang terjadi kalau poin koperasi prabayar habis?**
A: Berdasarkan kode aplikasi, koperasi prabayar hanya bisa memakai layanan berbayar sebatas saldo poin yang tersedia — mereka perlu top up ulang lewat halaman Top Up Poin untuk melanjutkan pemakaian. Detail perilaku sistem saat saldo tidak cukup untuk transaksi tertentu tidak ditemukan secara eksplisit di halaman ini, jadi untuk kasus spesifik konfirmasi ke tim teknis.

**Q: Apakah ada minimum top up?**
A: Ya, untuk nominal custom minimum-nya Rp1.000 (setara 10 Poin). Selain itu tersedia empat paket siap pakai: Rp500rb, Rp1jt, Rp5jt, dan Rp10jt.

**Q: Berapa konversi Rupiah ke Poin?**
A: Rp1.000 = 10 Poin (dikonfirmasi dari halaman Top Up Poin dan logika konversi di kode).

**Q: Metode pembayaran apa saja yang tersedia untuk top up?**
A: Virtual Account dari bank BNI, BRI, Mandiri, dan BSI. Ada juga kemungkinan channel lain seperti Alfamart (terlihat dari adanya penanganan `redirectUrl` di kode), namun daftar channel yang tampil ke pengguna saat ini difilter hanya keempat bank tersebut.

**Q: Kenapa saya (koperasi pascabayar) tidak melihat menu Top Up Poin?**
A: Karena memang tidak relevan — menu "Top Up Poin" dan widget saldo poin di sidebar sengaja disembunyikan untuk koperasi pascabayar. Semua fitur tetap bisa dipakai tanpa saldo poin.

**Q: Apakah top up bisa dibatalkan atau di-refund?**
A: Tidak ada informasi kebijakan refund di kode aplikasi — ini murni pertanyaan kebijakan bisnis, konfirmasi ke tim terkait sebelum menjawab prospek.

## Catatan Terbuka

- Di `components/dashboard/TopUpPointPage.tsx`, hook `useWallet` dipanggil dengan destructuring `const { balance, addBalance } = useWallet();`, tetapi `hooks/useWallet.ts` yang saat ini ada tidak mengekspos fungsi `addBalance` (hanya `balance`, `isLoading`, `refreshBalance`, `deductBalance`, `formatCurrency`, `topUpHistory`). Ini kemungkinan sisa kode lama atau bug kecil yang belum berdampak karena `addBalance` tidak dipanggil di mana pun pada file tersebut — tidak perlu dijelaskan ke pelanggan, tapi baik diketahui tim teknis.
- Fallback billing type selalu ke "prabayar" bila API gagal atau field `billingType` kosong — perlu diperhatikan saat debugging laporan pelanggan pascabayar yang "salah" melihat elemen prabayar.
