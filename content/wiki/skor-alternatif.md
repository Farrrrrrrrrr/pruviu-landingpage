---
title: "Skor Alternatif (Telco Score, Deteksi Judol, Prediksi Income)"
slug: "skor-alternatif"
category: "skor-pengecekan"
summary: "Tiga sub-fitur skor alternatif yang sudah muncul di navigasi produk namun belum dibangun — saat ini hanya menampilkan halaman coming soon."
---

# Skor Alternatif (Telco Score, Deteksi Judol, Prediksi Income)

## Ringkasan (Tim Sales)

Coba buka sidebar dashboard, ada grup menu "Skor Alternatif" dengan tiga sub-item: Telco Score (`/telco-score`), Deteksi Judol (`/deteksi-judol`), dan Prediksi Income (`/prediksi-income`). Yang perlu diingat baik-baik sebelum ngobrol sama prospek: **ketiga fitur ini belum jalan di Pruviu**. Kalau diklik, yang muncul cuma halaman placeholder bertuliskan "Fitur ini masih dalam proses pengembangan" — belum ada data, belum ada skor yang dihitung, belum ada apa-apa di baliknya.

Rencananya, tiga fitur ini bakal masuk lewat kerja sama dengan **Trusting Social Indonesia (TSI)** — mereka penyedia skor kredit alternatif berbasis data telko, sudah terdaftar resmi di OJK sebagai penyelenggara Innovative Credit Scoring (ICS). TSI beroperasi di Indonesia, Vietnam, Filipina, dan India, dengan klaim sudah menilai 328 juta+ profil di Indonesia saja, dan punya akses data dari operator telko besar seperti Telkomsel, Indosat, dan XL. Penjelasan di bawah ini kami ambil langsung dari pitch deck resmi mereka ("Trusting Social Indonesia - Introduction 2025"), jadi anggap ini **gambaran konsep dari vendor**, bukan spesifikasi final Pruviu — cakupan, harga, dan cara kerja aslinya masih bisa berubah begitu kontrak dan integrasinya benar-benar jalan.

### Telco Score

Ini skor kredit alternatif dengan rentang **300–850**, dihitung cukup dari nomor HP nasabah dan hasilnya keluar real-time via API (hitungan milidetik). Sumber datanya dari operator telko yang sudah dianonimkan: riwayat telepon & SMS, data lokasi, riwayat transaksi VAS — **bukan dari data di HP nasabah (device data)**. Skor akhirnya gabungan dari beberapa aspek: pendapatan, pekerjaan, kemampuan finansial, modal sosial, kebiasaan konsumsi, dan profil hidup. TSI mengklaim skor ini bisa memangkas kerugian kredit hingga ~50%, dengan GINI coefficient sampai 0.8, dan sudah dites di 100+ backtest di Indonesia untuk berbagai produk pinjaman (KTA, PayLater, cicilan barang, kartu kredit, KPR — GINI-nya di kisaran 0.47–0.53 tergantung produknya). Idenya, skor ini nanti dipadukan dengan skor internal lender sendiri: kalau ada calon nasabah yang tadinya ditolak tapi Telco Score-nya bagus, bisa dipertimbangkan lagi (swap-in); sebaliknya kalau calon yang tadinya di-approve ternyata Telco Score-nya kurang meyakinkan, bisa ditinjau ulang juga (swap-out).

### Deteksi Judol (Risky App Score)

Fitur ini menilai kebiasaan browsing di HP nasabah buat mengendus aktivitas berisiko — **judi online, situs dewasa, dan sumber-sumber ilegal lainnya**. Cukup masukkan nomor HP, keluar level risikonya: Very Good, Good, Medium, Bad, atau Very Bad (dari risiko rendah ke tinggi). Menurut TSI, ini biasanya dipakai buat tiga hal: (1) menyaring lead di awal — misalnya calon peminjam online atau referral dari partner, sebelum masuk lebih jauh ke proses; (2) bantu kepatuhan APU-PPT (anti pencucian uang & pendanaan terorisme) untuk skrining nasabah funding/investasi; dan (3) jadi bahan pertimbangan buat debitur yang mulai telat bayar — kalau skornya jelek, kemungkinan memang karakternya bermasalah dan perlu ditagih ketat; kalau skornya masih oke meski telat, mungkin masih layak dibina dulu.

### Prediksi Income

Fitur ini bukan menebak angka gaji persis, tapi memvalidasi/mengestimasi *rentang* pendapatan seseorang pakai data telko. Input-nya nomor HP, hasilnya rentang income dalam **5 tingkatan** (contoh di deck TSI kira-kira seperti jenjang jabatan: Head, Manager, Supervisor, Associate, sampai Entry-level). Gunanya buat bantu bank menentukan limit kredit atau plafon pinjaman berdasarkan rentang income yang sudah tervalidasi, dan tentunya lebih hemat waktu & biaya dibanding verifikasi income manual. Sama seperti Telco Score, hasilnya keluar real-time lewat API.

Jadi, untuk sekarang tolong jangan jual atau demokan tiga fitur ini seolah sudah bisa dipakai di Pruviu ya. Penjelasan di atas boleh dipakai buat ngobrol soal **arah dan konsepnya** kalau ada prospek yang tanya, tapi hindari janji soal tanggal rilis, harga, atau angka performa (GINI, tingkat akurasi, dll.) — semua angka itu klaim dari materi marketing TSI sendiri, belum tentu persis sama hasilnya kalau sudah terintegrasi di Pruviu. Kalau ada pertanyaan soal kontrak atau timeline, lempar saja ke tim produk.

## Cara Kerja (Tim Teknis)

Ketiga route ini didefinisikan di `App.tsx` (sekitar baris 67-70), masing-masing dirender sebagai:

```
<Route path="/telco-score" element={<Layout><ComingSoonPage title="Telco Score" /></Layout>} />
<Route path="/deteksi-judol" element={<Layout><ComingSoonPage title="Deteksi Judol" /></Layout>} />
<Route path="/prediksi-income" element={<Layout><ComingSoonPage title="Prediksi Income" /></Layout>} />
```

Ketiganya cuma manggil komponen yang sama, `components/dashboard/ComingSoonPage.tsx`, bedanya cuma di prop `title`. Komponen ini murni tampilan statis (dekorasi gradient, ikon, animasi blob/shimmer) dengan teks tetap: "Fitur ini masih dalam proses pengembangan. Kami sedang mempersiapkan inovasi terbaik untuk Anda!" — nggak ada fetch data, nggak ada state, nggak ada pemanggilan API, nggak ada logika bisnis sama sekali. Beda dari route lain (misalnya `/konsul`, `/kredit-lain`), tiga route ini juga nggak dibungkus `ActiveRouteGuard` — tapi ini nggak terlalu penting karena memang belum ada fungsi nyata yang perlu dikunci.

Intinya: dari sisi teknis nggak ada lagi yang bisa dijelasin karena fiturnya memang belum dibangun — belum ada model skoring, belum ada integrasi data telko, belum ada algoritma deteksi judi online, belum ada model prediksi income di dalam kode saat ini.

## Pertanyaan yang Sering Diajukan

**Q: Apakah Telco Score, Deteksi Judol, dan Prediksi Income sudah bisa dipakai?**
A: Belum. Ketiganya baru menu di navigasi yang mengarah ke halaman "coming soon" tanpa fungsi apa pun. Belum ada satu pun yang aktif.

**Q: Kapan fitur-fitur ini rilis?**
A: Belum ada timeline pasti dari sisi kode/sistem saat ini. Cek dulu ke tim produk untuk info roadmap terbaru sebelum janji tanggal apa pun ke prospek.

**Q: Berapa biayanya nanti?**
A: Belum ditentukan. Jangan sebut angka harga dulu ke prospek — ini kebijakan tim produk/bisnis, konfirmasi lagi kalau fiturnya sudah mendekati rilis.

**Q: Cara kerja Deteksi Judol / Telco Score / Prediksi Income nantinya gimana?**
A: Di kode Pruviu sendiri belum ada implementasinya sama sekali. Tapi secara konsep, rencananya semua berbasis integrasi dengan Trusting Social Indonesia (TSI) pakai data telko (cukup modal nomor HP): Telco Score menghasilkan skor 300–850 dari pola penggunaan telko, Deteksi Judol menilai aktivitas browsing berisiko (judi online, situs dewasa, dll.), dan Prediksi Income mengestimasi rentang pendapatan dalam 5 tingkat. Detail lengkapnya ada di bagian "Ringkasan" di atas — tapi tetap ingat, ini spesifikasi vendor/konsep, belum tentu jadi implementasi final Pruviu.

**Q: Data yang dipakai TSI termasuk data di HP nasabah (device data) nggak?**
A: Menurut materi TSI, Telco Score nggak pakai device data — cuma data anonim dari operator telko (riwayat telepon/SMS, lokasi, transaksi VAS). Ini klaim dari vendor, perlu dicek ulang lagi pas kontrak/integrasi teknisnya sudah final.

**Q: Kenapa menunya sudah muncul kalau fiturnya belum jadi?**
A: Menu/navigasinya memang sudah disiapkan dari sisi produk sebagai penanda roadmap, tapi implementasi fungsionalnya belum dikerjakan. Ini murni keputusan desain produk, bukan tanda fiturnya sudah siap pakai.

**Q: Apa yang boleh disampaikan ke prospek soal fitur ini?**
A: Boleh bilang Pruviu sedang mengembangkan skor alternatif (berbasis data telko, deteksi judi online, dan prediksi income) sebagai bagian dari roadmap, tanpa janji tanggal rilis, harga, atau detail teknis spesifik. Kalau digali lebih dalam, arahkan ke tim produk.

## Catatan Terbuka

Artikel ini masih soal item roadmap, bukan fitur yang sudah rilis. Bagian "Ringkasan" baru saja diperbarui (2026-08-19) pakai gambaran konsep dari pitch deck resmi vendor **Trusting Social Indonesia** ("Trusting Social Indonesia - Introduction 2025", v1.5) sebagai dasar rencana kemitraan skor alternatif — menggantikan tebakan awal yang cuma berdasarkan nama menu. Tapi ini tetap materi marketing vendor, bukan spesifikasi teknis yang sudah dikontrak atau diimplementasikan. Seluruh isi artikel ini perlu ditinjau ulang lagi begitu Telco Score, Deteksi Judol, dan/atau Prediksi Income benar-benar dibangun di kode Pruviu — termasuk validasi ulang semua angka performa (GINI, tingkat sukses, dll.) berdasarkan hasil aktual, bukan klaim vendor.
