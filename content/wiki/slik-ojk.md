---
title: "SLIK OJK"
slug: "slik-ojk"
category: "skor-pengecekan"
summary: "Fitur pengecekan riwayat kredit resmi debitur di lembaga keuangan berizin OJK (bank, multifinance), terkunci sampai akun koperasi diaktifkan Pruviu."
---

# SLIK OJK

## Ringkasan (Tim Sales)

SLIK OJK adalah fitur di dashboard Pruviu yang memungkinkan koperasi mengecek riwayat kredit seorang calon nasabah/anggota di lembaga keuangan resmi yang diawasi OJK — seperti bank, perusahaan pembiayaan (multifinance), dan sejenisnya. Ini berbeda dari "SLIK Koperasi", yang isinya hanya data pinjaman antar-koperasi yang terdaftar di jaringan Pruviu. Dengan kata lain, SLIK OJK memberi koperasi gambaran apakah calon peminjam punya cicilan/pinjaman aktif atau riwayat macet di bank/finance company di luar dunia koperasi — sesuatu yang koperasi biasanya tidak bisa lihat sendiri.

Manfaat bisnisnya jelas: sebelum koperasi mencairkan pinjaman, mereka bisa tahu apakah calon anggota tersebut sedang menunggak di tempat lain, punya banyak pinjaman aktif di berbagai lembaga (indikasi gali lubang tutup lubang), atau punya riwayat macet (skor kolektibilitas/KOL buruk). Ini membantu koperasi mengambil keputusan kredit yang lebih aman dan mengurangi risiko kredit macet yang selama ini jadi masalah besar buat koperasi kecil-menengah.

Hasil pengecekan ditampilkan dalam bentuk skor Kolektibilitas (KOL 1-5, dari "Lancar" sampai "Macet"), daftar semua kontrak/pinjaman yang ditemukan di lembaga lain (jenis pinjaman, sisa pinjaman, status, riwayat pembayaran per bulan dalam bentuk grid warna), dan laporan PDF yang bisa diunduh atau dicetak untuk keperluan dokumentasi kredit internal koperasi.

Poin penting yang paling sering ditanyakan: fitur ini **terkunci** (ikon gembok, menu berwarna abu-abu/tidak bisa diklik) untuk akun koperasi yang baru daftar dan belum diverifikasi/diaktifkan oleh tim Pruviu. Begitu tim internal Pruviu meninjau dan mengaktifkan akun koperasi tersebut, menu SLIK OJK otomatis terbuka tanpa perlu tindakan apa pun dari koperasi. Sayangnya, dari sisi kode tidak ada informasi tentang berapa lama proses peninjauan ini biasanya berlangsung atau kriteria apa yang dicek — ini murni kebijakan tim internal, jadi untuk pertanyaan soal estimasi waktu aktivasi, konfirmasikan ke tim terkait (operasional/onboarding) sebelum menjawab prospek.

## Cara Kerja (Tim Teknis)

**Lokasi kode**: komponen utama ada di `components/dashboard/KreditLainPage.tsx`, dengan sub-komponen `components/dashboard/FilterPanelKreditLain.tsx` (panel filter hasil), `components/dashboard/KolektibilitasScoreCard.tsx` (kartu skor KOL), dan `components/dashboard/HistoryTable.tsx` (tabel riwayat pembayaran per kontrak yang bisa di-expand).

**Mekanisme kunci akun**: route `/kredit-lain` dibungkus `ActiveRouteGuard` di `App.tsx` (`<Route path="/kredit-lain" element={<ActiveRouteGuard><Layout><KreditLainPage /></Layout></ActiveRouteGuard>} />`). `ActiveRouteGuard` (`components/auth/ActiveRouteGuard.tsx`) mengambil `user` dari `useAuth()`, dan jika `user.isActive === false`, langsung menampilkan `alert("Akun Anda masih dalam proses peninjauan. Fitur ini sementara dikunci.")` lalu redirect ke `/dashboard` — jadi walaupun user memaksa masuk via URL langsung, mereka akan dilempar balik. Di sisi navigasi, `components/Sidebar.tsx` menghitung `isUserActive = user?.isActive !== false` dan mengoper `isLocked={!isUserActive}` ke `NavItem` untuk item "SLIK OJK" (`to="/kredit-lain"`), yang membuat menu tampil abu-abu dengan ikon gembok dan `cursor-not-allowed`. Nilai `isActive` sendiri berasal dari response login (`hooks/useAuth.ts`, baris `isActive: responseData.isActive !== false` — default `true` jika field tidak dikirim backend).

**Sumber data / API**: form pencarian punya dua mode — "Pengajuan Baru (NAE)" dan "Monitoring (ME)". Submit form memanggil `apiService.checkNAE(...)` (endpoint `POST /slik-ojk/nae-*` — lihat detail di `services/api.ts`), `apiService.checkSlikOjkPenjaminNAE(...)` (endpoint `POST /slik-ojk/nae-penjamin`, khusus mengecek penjamin), atau `apiService.checkME(...)` (endpoint `POST /slik-ojk/me`) tergantung `enquiryType` dan `subjectType` (PEMOHON/PENJAMIN) yang dipilih user. Hasil response lalu dipetakan ke tipe internal `Pinjaman` lewat dua fungsi mapper di `utils/clikMapper.ts`: `mapClikToPinjaman` (format response lama) dan `mapNewClikToPinjaman` (format response baru dengan struktur `kreditPembiayaan`/`fasilitasLainnya`/`pinjamanLunas`). Ada juga pemanggilan `apiService.checkAntiFraud(false, nik, 'SLIK', reference)` setelah pengecekan berhasil, untuk deteksi indikasi fraud (kecocokan alamat/kontak/pekerjaan/nama ibu kandung) yang ditandai dengan warna GREEN/YELLOW/BROWN/RED.

**Catatan penamaan internal — "CLIK" vs "SLIK"**: label yang dilihat pengguna adalah "SLIK OJK" (breadcrumb, judul halaman, teks "Checking Fee"), tapi kode internal secara konsisten memakai istilah "CLIK" — nama file `utils/clikMapper.ts`, nama fungsi `mapClikToPinjaman`/`mapNewClikToPinjaman`, prefix ID fallback `CLIK-${Math.random()}` untuk kontrak tanpa nomor, argumen `'SLIK-OJK'` yang dioper sebagai `idKoperasi` ke mapper, dan pesan error "terjadi kesalahan pada server CLIK". Ini kemungkinan sisa penamaan lama atau nama vendor/produk data pihak ketiga yang dipakai di balik layar — perlu diklarifikasi ke tim produk (lihat bagian Catatan Terbuka).

**Skor Kolektibilitas**: `KolektibilitasScoreCard.tsx` menampilkan skor 1-5 dengan label sesuai standar OJK (1=Lancar, 2=Dalam Perhatian Khusus/tunggakan 1-90 hari, 3=Kurang Lancar/91-120 hari, 4=Diragukan/121-180 hari, 5=Macet/>180 hari). Di halaman utama, skor yang ditampilkan adalah nilai **terburuk** dari seluruh pinjaman yang ditemukan (`worstKolektibilitas = Math.max(...mappedLoans.map(getLoanKolektibilitas))`).

**Filter dan tampilan hasil**: `FilterPanelKreditLain.tsx` menyediakan filter berdasarkan lembaga keuangan (Bank/Fintech/Finance), status pinjaman (Lancar/Lunas/Macet), jenis pinjaman, rentang nominal & sisa pinjaman, tenor, bunga, dan rentang tanggal — semua filter ini nonaktif (`isDisabled`) bila belum ada hasil pencarian. Setiap kontrak pinjaman ditampilkan sebagai baris tabel (mode "table") atau kartu (mode "card") yang bisa di-expand untuk melihat detail lengkap (nomor akad, plafon, tunggakan, denda, dsb.) dan grid riwayat pembayaran bulanan berwarna (hijau=lancar, kuning/oranye/cokelat/merah=makin buruk) via `DynamicHistoryGrid`/`HistoryTable`.

**Biaya**: UI menampilkan badge "Checking Fee 79 POIN" saat kondisi `!isPascabayar` (billing prabayar via `useBilling()`/`useWallet()`), yang berarti model default adalah potong saldo poin koperasi per pengecekan. Untuk koperasi dengan mode pascabayar (billing postpaid), badge biaya ini disembunyikan — kemungkinan karena ditagih di akhir periode, bukan per transaksi. Detail kebijakan tarif dan mekanisme billing pascabayar tidak sepenuhnya terlihat dari file yang dibaca — konfirmasikan ke tim produk/finance jika prospek menanyakan detail harga.

## Pertanyaan yang Sering Diajukan

**Q: Kenapa menu SLIK OJK di dashboard saya abu-abu dan tidak bisa diklik?**
A: Akun koperasi Anda belum diaktifkan/ditinjau oleh tim Pruviu. Fitur ini (dan beberapa fitur lain seperti Full Check, Konsul, Pemohon & Penjamin) memang dikunci sampai proses peninjauan akun selesai. Setelah tim kami mengaktifkan akun, menu akan otomatis terbuka.

**Q: Berapa lama proses aktivasi akun sampai fitur ini bisa dipakai?**
A: Durasi proses peninjauan tidak diatur atau tercatat di aplikasi — ini kebijakan operasional tim internal, bukan sesuatu yang otomatis dari sistem. Konfirmasikan ke tim onboarding/operasional untuk estimasi waktu yang akurat sebelum menjanjikan sesuatu ke prospek.

**Q: Apa bedanya SLIK OJK dengan SLIK Koperasi?**
A: SLIK Koperasi (menu terpisah, route `/koperasi-checking`) berisi data pinjaman yang dilaporkan oleh koperasi-koperasi lain di jaringan Pruviu. SLIK OJK mengecek riwayat kredit di lembaga keuangan resmi yang diawasi OJK — bank, perusahaan pembiayaan (multifinance), dan sejenisnya — yaitu sumber data di luar ekosistem koperasi.

**Q: Apakah ini data resmi langsung dari OJK, atau data milik Pruviu sendiri?**
A: Berdasarkan kode, sistem ini memanggil endpoint backend Pruviu sendiri (`/slik-ojk/nae`, `/slik-ojk/me`, dll.) yang kemungkinan meneruskan permintaan ke penyedia data pihak ketiga/biro kredit resmi (kode internal menyebutnya "CLIK" — lihat Catatan Terbuka). Pruviu tidak menyimpan atau membuat data kredit sendiri untuk fitur ini; datanya berasal dari sumber eksternal yang diproses dan ditampilkan ulang oleh sistem Pruviu. Untuk kepastian nama vendor/mitra data resminya, tanyakan ke tim produk.

**Q: Apa itu skor Kolektibilitas (KOL) yang ditampilkan?**
A: Skor 1-5 sesuai standar kualitas kredit yang umum dipakai industri keuangan: 1 = Lancar, 2 = Dalam Perhatian Khusus (tunggakan 1-90 hari), 3 = Kurang Lancar (91-120 hari), 4 = Diragukan (121-180 hari), 5 = Macet (lebih dari 180 hari). Jika calon nasabah punya beberapa pinjaman di berbagai lembaga, sistem menampilkan skor terburuk dari semua pinjaman tersebut sebagai skor utama.

**Q: Apakah pengecekan ini berbayar setiap kali dipakai?**
A: Untuk koperasi dengan skema prabayar (saldo poin), UI menampilkan biaya cek sebesar 79 poin per pengecekan. Untuk koperasi dengan skema pascabayar (postpaid), badge biaya ini tidak ditampilkan di layar — kemungkinan ditagih secara periodik, bukan per transaksi. Untuk detail tarif dan skema penagihan resmi, konfirmasikan ke tim sales/finance karena ini bukan hal yang bisa dipastikan hanya dari kode aplikasi.

**Q: Data apa saja yang perlu diisi untuk melakukan pengecekan?**
A: Ada dua mode: "Pengajuan Baru (NAE)" yang butuh data lengkap calon debitur (NIK, nama, tanggal & tempat lahir, nama ibu kandung, no. HP, alamat lengkap, pekerjaan, pendidikan) plus dokumen (surat persetujuan/consent dan KTP, dan KK untuk pemohon), serta opsional data penjamin (maks. 3 orang); dan "Monitoring (ME)" yang hanya butuh NIK dan nomor referensi dari pengecekan sebelumnya untuk memantau ulang status debitur yang sama.

**Q: Bisakah hasil pengecekan diunduh atau dicetak untuk arsip koperasi?**
A: Bisa. Setelah hasil pengecekan muncul, tersedia tombol untuk mengunduh PDF laporan lengkap dan/atau PDF laporan dalam bentuk tabel, serta tombol "Cetak Ringkasan" untuk mencetak langsung dari browser.

## Catatan Terbuka

- **Inkonsistensi penamaan "SLIK" vs "CLIK"**: seluruh tampilan yang dilihat pengguna memakai label "SLIK OJK", tapi kode internal (nama file `utils/clikMapper.ts`, fungsi `mapClikToPinjaman`/`mapNewClikToPinjaman`, ID fallback `CLIK-${Math.random()}`, pesan error "server CLIK") konsisten memakai istilah "CLIK". Ini perlu diklarifikasi ke tim produk — apakah "CLIK" adalah nama vendor/produk data pihak ketiga yang dipakai di balik layar (sehingga wajar berbeda dari label UI), atau ini sisa penamaan lama dari sebelum fitur di-rebrand jadi "SLIK OJK". Tim sales sebaiknya tidak menyebut "CLIK" ke prospek sampai ini jelas.
- **Proses & durasi aktivasi akun tidak terdokumentasi di kode**: `ActiveRouteGuard` dan `Sidebar` hanya membaca flag `user.isActive` (boolean) dari hasil login — tidak ada logika, SLA, atau kriteria peninjauan yang terlihat di frontend. Proses aktivasi murni dilakukan manual oleh tim internal di luar aplikasi ini.
- **Beberapa fungsi pemetaan teks kode masih placeholder**: di `KreditLainPage.tsx`, sejumlah helper seperti `getJenisKreditText`, `getAkadKreditText`, `getKategoriDebiturText`, `getJenisPenggunaanText`, `getSektorEkonomiText`, `getKreditPemerintahText`, `getSebabMacetText`, `getKondisiText`, dan `getJenisSukuBungaText` saat ini hanya mengembalikan kode mentah apa adanya (belum dipetakan ke teks yang mudah dibaca) — komentar di kode menyebut idealnya ini datang dari tabel referensi resmi POJK. Artinya sebagian kolom detail pinjaman masih menampilkan kode angka/huruf mentah, bukan deskripsi manusiawi.
- **Simulasi riwayat 24 bulan bersifat estimasi, bukan data asli**: pada komponen `PinjamanCard`, variabel `kualitasHistory` (riwayat kualitas kredit 24 bulan terakhir yang ditampilkan per kartu pinjaman) dihitung secara sintetis dari satu titik data (`kodeKualitasKredit` dan `jumlahHariTunggakan` terakhir), bukan diambil langsung dari histori bulanan asli hasil laporan. Ini berbeda dengan grid riwayat pembayaran utama (`DynamicHistoryGrid`/`creditProfile`) yang memang berasal dari data histori asli per bulan dari response API. Tim teknis sebaiknya mengecek apakah `kualitasHistory` ini benar-benar dipakai di rendering (tampaknya didefinisikan tapi berpotensi tidak dipakai penuh di UI final) agar tidak salah menampilkan data simulasi sebagai data faktual ke pengguna.
