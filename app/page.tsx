"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [currentSlide2, setCurrentSlide2] = useState(1);

  const mobileImages = [
    { src: "/Onboarding.png", alt: "Pruviu Mobile Onboarding" },
    { src: "/SelamatDatang.png", alt: "Pruviu Mobile Welcome" },
    { src: "/Homepage.png", alt: "Pruviu Mobile Homepage" },
  ];

  const mobileImages2 = [
    { src: "/konsul.png", alt: "Pruviu Mobile Konsultasi" },
    { src: "/pencatatan.png", alt: "Pruviu Mobile Pencatatan" },
    { src: "/tren.png", alt: "Pruviu Mobile Tren" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mobileImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + mobileImages.length) % mobileImages.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="Pruviu Logo"
                width={150}
                height={79}
                className="w-32 md:w-40 h-auto"
                priority
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#beranda"
                className="text-gray-600 font-bold hover:text-navy-600 transition-colors"
              >
                Beranda
              </a>
              <a
                href="#pengaduan"
                className="text-gray-600 font-bold hover:text-navy-600 transition-colors"
              >
                Pengaduan
              </a>
              <Link
                href="/kontak"
                className="text-gray-600 font-bold hover:text-navy-600 transition-colors"
              >
                Kontak
              </Link>
              <a
                href="/privacy-policy"
                className="text-gray-600 hover:text-navy-600 font-bold transition-colors"
              >
                Kebijakan Privasi
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="https://app.pruviu.com"
                className="px-6 py-2 text-navy-600 hover:text-navy-700 transition-colors font-medium"
              >
                Masuk
              </Link>
              <Link
                href="https://app.pruviu.com"
                className="px-6 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium"
              >
                Daftar
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-navy-600"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <a
                href="#beranda"
                className="block text-gray-600 font-bold hover:text-navy-600 transition-colors py-2"
              >
                Beranda
              </a>
              <a
                href="#pengaduan"
                className="block text-gray-600 font-bold hover:text-navy-600 transition-colors py-2"
              >
                Pengaduan
              </a>
              <Link
                href="/kontak"
                className="block text-gray-600 font-bold hover:text-navy-600 transition-colors py-2"
              >
                Kontak
              </Link>
              <a
                href="/privacy-policy"
                className="block text-gray-600 font-bold hover:text-navy-600 transition-colors py-2"
              >
                Kebijakan Privasi
              </a>
              <div className="pt-4 space-y-2">
                <Link
                  href="https://app.pruviu.com"
                  className="block text-center px-6 py-2 text-navy-600 hover:text-navy-700 transition-colors font-medium border border-navy-600 rounded-lg"
                >
                  Masuk
                </Link>
                <Link
                  href="https://app.pruviu.com"
                  className="block text-center px-6 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium"
                >
                  Daftar
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="beranda"
        className="container mx-auto px-4 md:px-6 py-10 md:py-20"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="flex-1 space-y-4 md:space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-navy-700 leading-tight md:leading-none tracking-wide md:tracking-widest">
              Sistem Monitoring dan Mitigasi Risiko Keuangan Terpadu{" "}
              <span className="bg-clip-text text-red-600">
                Pertama di Indonesia
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              Platform digital yang dilengkapi berbagai fitur infomasi
              perkreditan terpercaya serta analitik berbasis kecerdasan buatan
              untuk koperasi, anggota koperasi, dan masyarakat umum.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <Link
                href="https://app.pruviu.com"
                className="px-6 md:px-8 py-3 md:py-4 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium text-base md:text-lg shadow-lg text-center"
              >
                Daftar
              </Link>
              <Link
                href="https://app.pruviu.com"
                className="px-6 md:px-8 py-3 md:py-4 bg-white text-navy-600 rounded-lg hover:bg-gray-50 transition-colors font-medium text-base md:text-lg border-2 border-navy-600 text-center"
              >
                Masuk
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-4">
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-navy-700">
                  500+
                </p>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  Koperasi User Web
                </p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-navy-700">
                  50K+
                </p>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  User Mobile untuk Anggota Koperasi
                </p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-navy-700">
                  75K+
                </p>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  User Mobile untuk Umum
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full hidden lg:block">
            <div className="relative mt-0 lg:-mt-40">
              <Image
                src="/ImageContent - Hero.png"
                alt="Pruviu Dashboard Preview"
                width={800}
                height={533}
                className="w-full h-auto scale-110 lg:scale-125"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          {/* Desktop Dashboard Section */}
          <div className="mb-32 md:mb-40">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-6xl font-semibold text-navy-700 mb-2 tracking-tight">
                Pruviu <span className="text-red-600">Web</span>
              </h2>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 max-w-7xl mx-auto">
              <div className="flex-1 lg:order-2">
                <Image
                  src="/Laptop - ImageContent.png"
                  alt="Pruviu Web"
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <div className="flex-1 lg:order-1 text-center lg:text-left space-y-6">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-navy-700 tracking-tight">
                  Tingkatkan Kualitas Pinjaman Koperasi Anda
                </h3>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                  Dirancang untuk kebutuhan koperasi sektor jasa keuangan
                  menerapkan prinsip kehati-hatian,{" "}
                  <i className="italic">know-your-customer</i>, serta
                  memininalisir risiko pinjaman bermasalah yang disalurkan
                  kepada anggota{" "}
                </p>

                <div className="space-y-2 font-style: italic">
                  <div className="bg-navy-50 text-navy-700 text-xs sm:text-sm font-medium px-3 py-2 rounded-lg">
                    Didukung sumber data serta analitik lengkap dan terpercaya
                  </div>
                  <div className="bg-navy-50 text-navy-700 text-xs sm:text-sm font-medium px-3 py-2 rounded-lg">
                    Dilengkapi fitur konfigurasi pengaturan Pruviu Mobile
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile App Section */}
          <div>
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-6xl font-semibold text-navy-700 mb-2 tracking-tight">
                Pruviu <span className="text-red-600">Mobile</span>
              </h2>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto">
              <div className="flex-1 flex justify-center w-full mb-6 lg:mb-0">
                {/* Carousel Container */}
                <div className="relative w-full max-w-2xl">
                  {/* Images Container with 3D Perspective */}
                  <div
                    className="relative h-[400px] sm:h-[450px] md:h-[500px]"
                    style={{ perspective: "1200px" }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center gap-4">
                      {mobileImages.map((image, index) => {
                        const isActive = index === currentSlide;
                        const isPrev =
                          index ===
                          (currentSlide - 1 + mobileImages.length) %
                            mobileImages.length;
                        const isNext =
                          index === (currentSlide + 1) % mobileImages.length;
                        const isVisible = isActive || isPrev || isNext;

                        let transformStyle = "";
                        if (isActive) {
                          transformStyle =
                            "translateX(0) rotateY(0deg) scale(1)";
                        } else if (isPrev) {
                          transformStyle =
                            "translateX(-80%) rotateY(25deg) scale(0.75)";
                        } else if (isNext) {
                          transformStyle =
                            "translateX(80%) rotateY(-25deg) scale(0.75)";
                        }

                        return (
                          <div
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`
                              absolute transition-all duration-700 ease-in-out cursor-pointer
                              ${
                                !isVisible
                                  ? "opacity-0 pointer-events-none"
                                  : "opacity-100"
                              }
                              ${
                                isActive
                                  ? "w-40 sm:w-48 md:w-56 z-20"
                                  : "w-32 sm:w-40 md:w-48 z-10"
                              }
                            `}
                            style={{
                              transform: transformStyle,
                              transformStyle: "preserve-3d",
                            }}
                          >
                            <Image
                              src={image.src}
                              alt={image.alt}
                              width={800}
                              height={1300}
                              className={`w-full h-auto rounded-2xl shadow-2xl transition-all duration-700 ${
                                isActive ? "brightness-100" : "brightness-75"
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dots Indicator */}
                  <div className="flex justify-center gap-2 mt-6">
                    {mobileImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`
                          w-2 h-2 rounded-full transition-all
                          ${
                            index === currentSlide
                              ? "bg-navy-600 w-8"
                              : "bg-gray-300"
                          }
                        `}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left space-y-3 sm:space-y-4 md:space-y-6 px-4 sm:px-6 md:px-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-navy-700 tracking-tight leading-tight">
                  Monitor Risiko Keuangan Keluarga Anda
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                  Dirancang untuk menjembatani interaksi antara koperasi dengan
                  anggota. Memungkinkan anggota memonitor risiko keuangan
                  pribadi dan keluarga melalui akses konsultasi dengan koperasi
                  tempat bernaung{" "}
                </p>

                <div className="space-y-2 font-style: italic">
                  <div className="bg-navy-50 text-navy-700 text-xs sm:text-sm font-medium px-3 py-2 rounded-lg">
                    Khusus untuk anggota koperasi
                  </div>
                  <div className="bg-navy-50 text-navy-700 text-xs sm:text-sm font-medium px-3 py-2 rounded-lg">
                    Daftarkan diri anda ke koperasi terdekat untuk mengakses
                    layanan Pruviu Mobile
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Features Section with Carousel on Right */}
            <div className="mt-32 md:mt-40">
              <div className="flex flex-col lg:flex-row-reverse items-center gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto">
                <div className="flex-1 flex justify-center w-full mb-6 lg:mb-0">
                  {/* Second Carousel Container */}
                  <div className="relative w-full max-w-2xl">
                    {/* Images Container with 3D Perspective */}
                    <div
                      className="relative h-[400px] sm:h-[450px] md:h-[500px]"
                      style={{ perspective: "1200px" }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center gap-4">
                        {mobileImages2.map((image, index) => {
                          const isActive = index === currentSlide2;
                          const isPrev =
                            index ===
                            (currentSlide2 - 1 + mobileImages2.length) %
                              mobileImages2.length;
                          const isNext =
                            index ===
                            (currentSlide2 + 1) % mobileImages2.length;
                          const isVisible = isActive || isPrev || isNext;

                          let transformStyle = "";
                          if (isActive) {
                            transformStyle =
                              "translateX(0) rotateY(0deg) scale(1)";
                          } else if (isPrev) {
                            transformStyle =
                              "translateX(-80%) rotateY(25deg) scale(0.75)";
                          } else if (isNext) {
                            transformStyle =
                              "translateX(80%) rotateY(-25deg) scale(0.75)";
                          }

                          return (
                            <div
                              key={index}
                              onClick={() => setCurrentSlide2(index)}
                              className={`
                                absolute transition-all duration-700 ease-in-out cursor-pointer
                                ${
                                  !isVisible
                                    ? "opacity-0 pointer-events-none"
                                    : "opacity-100"
                                }
                                ${
                                  isActive
                                    ? "w-40 sm:w-48 md:w-56 z-20"
                                    : "w-32 sm:w-40 md:w-48 z-10"
                                }
                              `}
                              style={{
                                transform: transformStyle,
                                transformStyle: "preserve-3d",
                              }}
                            >
                              <Image
                                src={image.src}
                                alt={image.alt}
                                width={800}
                                height={1300}
                                className={`w-full h-auto rounded-2xl shadow-2xl transition-all duration-700 ${
                                  isActive ? "brightness-100" : "brightness-75"
                                }`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                      {mobileImages2.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide2(index)}
                          className={`
                            w-2 h-2 rounded-full transition-all
                            ${
                              index === currentSlide2
                                ? "bg-navy-600 w-8"
                                : "bg-gray-300"
                            }
                          `}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left space-y-3 sm:space-y-4 md:space-y-6 px-4 sm:px-6 md:px-8">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-navy-700 tracking-tight leading-tight">
                    Pantau Pengeluaran & Bangun Reputasi Keuangan Anda
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                    Dirancang untuk memudahkan pencatatan pengeluaran dari
                    pembayaran tunai maupun non-tunai. Bermanfaat untuk evaluasi
                    belanja bulanan/tahunan sekaligus membangun reputasi
                    keuangan Anda.{" "}
                  </p>

                  <div className="space-y-2 font-style: italic">
                    <div className="bg-navy-50 text-navy-700 text-xs sm:text-sm font-medium px-3 py-2 rounded-lg">
                      Untuk Umum (Anggota dan Bukan Anggota Koperasi)
                    </div>
                    <div className="bg-navy-50 text-navy-700 text-xs sm:text-sm font-medium px-3 py-2 rounded-lg">
                      Dilengkapi fitur analitik yang insightful
                    </div>
                    <div className="bg-navy-50 text-navy-700 text-xs sm:text-sm font-medium px-3 py-2 rounded-lg">
                      Menghasilkan Pruviu Score guna meningkatkan kelayakan
                      kredit Anda
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pengaduan Section */}
      <section id="pengaduan" className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-navy-700 mb-3 md:mb-4 tracking-tight">
              Form Pengaduan
            </h2>
            {/* <p className="text-base sm:text-lg md:text-xl text-gray-600 font-light">
              Sampaikan keluhan atau laporan Anda kepada kami
            </p> */}
          </div>

          <div className="bg-white shadow-sm p-6 md:p-8 lg:p-12 rounded-xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const nama = formData.get("nama");
                const nik = formData.get("nik");
                const email = formData.get("email");
                const noTelpon = formData.get("noTelpon");
                const pengaduan = formData.get("pengaduan");

                const emailBody = `
Nama: ${nama}
NIK: ${nik}
Email: ${email}
No. Telepon: ${noTelpon}

Pengaduan:
${pengaduan}
                `.trim();

                const mailtoLink = `mailto:support@pruviu.com?subject=Pengaduan%20dari%20${encodeURIComponent(
                  nama as string
                )}&body=${encodeURIComponent(emailBody)}`;
                window.location.href = mailtoLink;
              }}
              className="space-y-5 md:space-y-6"
            >
              {/* First Row: Nama and NIK */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Nama */}
                <div>
                  <label
                    htmlFor="nama"
                    className="block text-sm md:text-base font-medium text-navy-700 mb-2"
                  >
                    Nama Lengkap <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    required
                    className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-lg focus:border-navy-600 focus:ring-2 focus:ring-navy-600 focus:ring-opacity-20 focus:outline-none transition-all text-gray-800 text-base"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                {/* NIK */}
                <div>
                  <label
                    htmlFor="nik"
                    className="block text-sm md:text-base font-medium text-navy-700 mb-2"
                  >
                    NIK <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="nik"
                    name="nik"
                    required
                    pattern="[0-9]{16}"
                    maxLength={16}
                    className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-lg focus:border-navy-600 focus:ring-2 focus:ring-navy-600 focus:ring-opacity-20 focus:outline-none transition-all text-gray-800 text-base"
                    placeholder="16 digit NIK"
                  />
                </div>
              </div>

              {/* Second Row: Email and No Telepon */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email-pengaduan"
                    className="block text-sm md:text-base font-medium text-navy-700 mb-2"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email-pengaduan"
                    name="email"
                    required
                    className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-lg focus:border-navy-600 focus:ring-2 focus:ring-navy-600 focus:ring-opacity-20 focus:outline-none transition-all text-gray-800 text-base"
                    placeholder="contoh@email.com"
                  />
                </div>

                {/* No Telepon */}
                <div>
                  <label
                    htmlFor="noTelpon"
                    className="block text-sm md:text-base font-medium text-navy-700 mb-2"
                  >
                    No. Telepon <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="noTelpon"
                    name="noTelpon"
                    required
                    pattern="[0-9+\-\s()]+"
                    className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-lg focus:border-navy-600 focus:ring-2 focus:ring-navy-600 focus:ring-opacity-20 focus:outline-none transition-all text-gray-800 text-base"
                    placeholder="08123456789"
                  />
                </div>
              </div>

              {/* Pengaduan - Full Width */}
              <div>
                <label
                  htmlFor="pengaduan"
                  className="block text-sm md:text-base font-medium text-navy-700 mb-2"
                >
                  Isi Pengaduan <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="pengaduan"
                  name="pengaduan"
                  required
                  rows={5}
                  minLength={20}
                  className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-lg focus:border-navy-600 focus:ring-2 focus:ring-navy-600 focus:ring-opacity-20 focus:outline-none transition-all resize-vertical text-gray-800 text-base"
                  placeholder="Jelaskan pengaduan Anda secara detail..."
                />
                <p className="text-xs md:text-sm text-gray-500 mt-2">
                  Minimal 20 karakter
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full px-8 py-3 md:py-4 bg-navy-600 text-white rounded-lg hover:bg-navy-700 active:bg-navy-800 transition-colors font-medium text-base md:text-lg shadow-sm"
                >
                  Kirim Pengaduan
                </button>
                <p className="text-xs md:text-sm text-center text-gray-500 mt-3 md:mt-4 leading-relaxed">
                  Dengan menekan tombol ini, aplikasi email Anda akan terbuka
                  dengan pengaduan yang telah Anda isi
                </p>
              </div>
            </form>
          </div>

          {/* Additional Info */}
          {/* <div className="mt-8 md:mt-12 bg-blue-50 p-6 md:p-8 rounded-xl">
            <div className="flex items-start space-x-3 md:space-x-4">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-navy-600 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
               <div>
                <h3 className="text-base md:text-lg font-semibold text-navy-700 mb-3">
                  Informasi Penting
                </h3>
                <ul className="text-sm md:text-base text-gray-600 space-y-2 md:space-y-3">
                  <li>
                    • Semua pengaduan akan ditindaklanjuti dalam waktu maksimal
                    3x24 jam kerja
                  </li>
                  <li>• Pastikan data yang Anda masukkan benar dan valid</li>
                  <li>
                    • Pengaduan akan dikirim melalui aplikasi email default Anda
                  </li>
                  <li>
                    • Untuk pertanyaan lebih lanjut, hubungi{" "}
                    <Link
                      href="/kontak"
                      className="text-navy-600 font-semibold hover:underline"
                    >
                      layanan kontak kami
                    </Link>
                  </li>
                </ul>
              </div> 
            </div>
          </div> */}
        </div>
      </section>

      {/* Features Section */}
      {/* <section id="fitur" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-700 mb-4">Fitur Lengkap Anti Fraud</h2>
            <p className="text-xl text-gray-600">Lindungi koperasi Anda dengan verifikasi kredit yang akurat dan terpercaya</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-50 rounded-xl hover:shadow-lg transition-shadow border-2 border-navy-600">
              <div className="w-12 h-12 bg-navy-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-700 mb-2">Koperasi Checking</h3>
              <p className="text-gray-600">Verifikasi riwayat pinjaman anggota di berbagai koperasi secara real-time untuk mencegah peminjaman ganda.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl hover:shadow-lg transition-shadow border-2 border-navy-600">
              <div className="w-12 h-12 bg-navy-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-700 mb-2">SLIK OJK</h3>
              <p className="text-gray-600">Akses informasi kredit resmi dari Sistem Layanan Informasi Keuangan OJK untuk validasi kredit yang akurat.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl hover:shadow-lg transition-shadow border-2 border-navy-600">
              <div className="w-12 h-12 bg-navy-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-700 mb-2">Credit Scoring</h3>
              <p className="text-gray-600">Sistem penilaian kredit otomatis dengan algoritma canggih untuk keputusan pemberian pinjaman yang lebih tepat.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-navy-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-700 mb-2">Anti Fraud</h3>
              <p className="text-gray-600">Deteksi otomatis terhadap pola peminjaman mencurigakan dan potensi fraud dengan teknologi AI.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-navy-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-700 mb-2">Laporan & Analitik</h3>
              <p className="text-gray-600">Dashboard lengkap dengan laporan riwayat pengecekan dan analitik tren risiko kredit koperasi Anda.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-navy-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-700 mb-2">Riwayat Pencairan</h3>
              <p className="text-gray-600">Lacak dan monitor riwayat pencairan pinjaman untuk memastikan transparansi dan akuntabilitas.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="bg-navy-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Lindungi Koperasi Anda Sekarang</h2>
          <p className="text-xl text-blue-100 mb-8">Bergabunglah bersama Pruviu untuk melindungi koperasi seluruh Indonesia</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/coming-soon" className="px-8 py-4 bg-white text-navy-600 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg">
              Daftar Sekarang
            </Link>
            <Link href="/coming-soon" className="px-8 py-4 bg-navy-700 text-white rounded-lg hover:bg-navy-800 transition-colors font-medium text-lg border-2 border-white">
              Kontak Pruviu
            </Link>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
            <div>
              <Image
                src="/Pruviu.svg"
                alt="Pruviu Logo"
                width={100}
                height={33}
                className="mb-4 brightness-200"
              />
              <p className="text-sm md:text-base text-gray-400">
                Platform Monitoring dan Mitigasi Risiko Keuangan untuk Koperasi
                dan Anggota Koperasi
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 md:mb-4 text-sm md:text-base">
                Produk
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors text-sm md:text-base"
                  >
                    Fitur
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors text-sm md:text-base"
                  >
                    Harga
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors text-sm md:text-base"
                  >
                    Keamanan
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 md:mb-4 text-sm md:text-base">
                Perusahaan
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors text-sm md:text-base"
                  >
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/pt-pruden-visi-utama/jobs/"
                    className="hover:text-white transition-colors text-sm md:text-base"
                  >
                    Karir
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/pt-pruden-visi-utama/posts/?feedView=all"
                    className="hover:text-white transition-colors text-sm md:text-base"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 md:mb-4 text-sm md:text-base">
                Dukungan
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/kontak"
                    className="hover:text-white transition-colors text-sm md:text-base"
                  >
                    Kontak
                  </Link>
                </li>
                <li>
                  <a
                    href="#pengaduan"
                    className="hover:text-white transition-colors text-sm md:text-base"
                  >
                    Pengaduan
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors text-sm md:text-base"
                  >
                    Dokumentasi
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    className="hover:text-white transition-colors text-sm md:text-base"
                  >
                    Kebijakan Privasi
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 md:pt-8 text-center text-gray-400">
            <p className="text-sm md:text-base">
              &copy; 2025 PT Pruden Visi Utama. Hak Cipta Dilindungi.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-2 text-sm md:text-base">
              <a
                href="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Kebijakan Privasi
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
