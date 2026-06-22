"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ReactNode,
  TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from "react";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

function FeaturePointer({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-navy-50 px-3 py-2 text-left">
      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white text-navy-700 shadow-sm">
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h8m0 0l-3.5-3.5M16 12l-3.5 3.5"
          />
        </svg>
      </span>
      <p className="text-xs font-medium text-navy-800 sm:text-sm">{children}</p>
    </div>
  );
}

const SECTION_IDS = ["beranda", "web", "mobile", "compliance"] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [activeSection, setActiveSection] = useState(0);

  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const activeSectionRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const scrollToSection = useCallback((index: number) => {
    const target = clamp(index, 0, SECTION_IDS.length - 1);
    if (target === activeSectionRef.current || isTransitioningRef.current) {
      return;
    }

    const targetElement = sectionRefs.current[target];
    if (!targetElement) {
      return;
    }

    isTransitioningRef.current = true;
    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });

    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = window.setTimeout(() => {
      isTransitioningRef.current = false;
    }, 850);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) {
          return;
        }

        const index = sectionRefs.current.findIndex(
          (section) => section === visible.target,
        );

        if (index >= 0) {
          setActiveSection(index);
        }
      },
      {
        threshold: [0.55, 0.7],
      },
    );

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const moveSection = useCallback(
    (direction: 1 | -1) => {
      scrollToSection(activeSectionRef.current + direction);
    },
    [scrollToSection],
  );

  const scrollToFooter = useCallback(() => {
    if (isTransitioningRef.current || !footerRef.current) {
      return;
    }

    isTransitioningRef.current = true;
    footerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = window.setTimeout(() => {
      isTransitioningRef.current = false;
    }, 850);
  }, []);

  const handleWheel = useCallback(
    (event: WheelEvent<HTMLElement>) => {
      if (Math.abs(event.deltaY) < 25) {
        return;
      }

      const stage = stageRef.current;
      const footer = footerRef.current;
      const footerStart = footer?.offsetTop ?? Number.POSITIVE_INFINITY;
      const isInFooter = stage ? stage.scrollTop >= footerStart - 24 : false;

      if (isInFooter) {
        return;
      }

      if (
        event.deltaY > 0 &&
        activeSectionRef.current === SECTION_IDS.length - 1
      ) {
        event.preventDefault();
        scrollToFooter();
        return;
      }

      event.preventDefault();

      if (isTransitioningRef.current) {
        return;
      }

      moveSection(event.deltaY > 0 ? 1 : -1);
    },
    [moveSection, scrollToFooter],
  );

  const handleTouchStart = useCallback((event: TouchEvent<HTMLElement>) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent<HTMLElement>) => {
      if (touchStartYRef.current === null || isTransitioningRef.current) {
        return;
      }

      const endY = event.changedTouches[0]?.clientY;
      if (typeof endY !== "number") {
        return;
      }

      const delta = touchStartYRef.current - endY;
      if (Math.abs(delta) < 45) {
        return;
      }

      if (delta > 0 && activeSectionRef.current === SECTION_IDS.length - 1) {
        scrollToFooter();
        return;
      }

      moveSection(delta > 0 ? 1 : -1);
    },
    [moveSection, scrollToFooter],
  );

  const mobileImages = [
    { src: "/Onboarding.png", alt: "Pruviu Mobile Onboarding" },
    { src: "/SelamatDatang.png", alt: "Pruviu Mobile Welcome" },
    { src: "/Homepage.png", alt: "Pruviu Mobile Homepage" },
  ];

  const trustBadges = [
    {
      src: "/duns-registered.webp",
      alt: "DUNS Registered badge",
      title: "DUNS",
      subtitle: "Dun & Bradstreet Registered",
      width: 156,
      height: 46,
    },
    {
      src: "/logo-pse-small.png",
      alt: "PSE registration badge",
      title: "PSE",
      subtitle: "Penyelenggara Sistem Elektronik",
      width: 136,
      height: 38,
    },
    {
      src: "/logo-komdigi.png",
      alt: "Komdigi partnership badge",
      title: "Komdigi",
      subtitle: "Konektivitas Ekosistem Komdigi",
      width: 136,
      height: 38,
    },
    {
      src: "/iso-270012022.webp",
      alt: "ISO 27001 certified badge",
      title: "ISO 27001",
      subtitle: "Sertifikasi ISO 27001:2022",
      width: 136,
      height: 38,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader currentPath="/" />

      <main id="main-content" className="relative">
        <div className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 md:flex md:flex-col md:gap-3">
          {SECTION_IDS.map((sectionId, index) => (
            <button
              key={sectionId}
              type="button"
              onClick={() => scrollToSection(index)}
              className={`pointer-events-auto h-2.5 w-2.5 rounded-full transition-all ${
                index === activeSection
                  ? "scale-125 bg-navy-600"
                  : "bg-navy-400/60 hover:bg-navy-600"
              }`}
              aria-label={`Buka section ${sectionId}`}
              aria-current={index === activeSection}
            />
          ))}
        </div>

        <div
          className="snap-stage"
          ref={stageRef}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <section
            id="beranda"
            ref={(element) => {
              sectionRefs.current[0] = element;
            }}
            className={`snap-panel overflow-hidden items-start bg-[linear-gradient(155deg,_#1f1d52_0%,_#273b93_52%,_#336ab3_100%)] ${
              activeSection === 0 ? "panel-active" : ""
            }`}
            aria-labelledby="hero-title"
          >
            <div className="panel-reveal edge-safe-x mx-auto w-full max-w-5xl pb-0 pt-8 sm:pt-10 md:px-8">
              <div className="text-center">
                <h1
                  id="hero-title"
                  className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
                >
                  Sistem Monitoring dan Mitigasi Risiko Keuangan Terpadu
                  <span className="text-red-400"> Pertama di Indonesia</span>
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                  Platform digital dengan informasi perkreditan terpercaya dan
                  analitik cerdas untuk koperasi, anggota koperasi, dan
                  masyarakat umum.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    href="https://app.pruviu.com"
                    className="rounded-lg bg-white px-6 py-3 text-center text-base font-semibold text-navy-700 shadow-lg transition hover:bg-white/90"
                  >
                    Daftar
                  </Link>
                  <Link
                    href="https://app.pruviu.com"
                    className="rounded-lg border-2 border-white/40 px-6 py-3 text-center text-base font-medium text-white transition hover:bg-white/10"
                  >
                    Masuk
                  </Link>
                </div>
                <div className="mt-6 flex justify-center gap-8 text-center sm:gap-16">
                  <div>
                    <p className="text-2xl font-bold text-white md:text-3xl">500+</p>
                    <p className="text-xs text-white/70 md:text-sm">Koperasi User Web</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white md:text-3xl">50K+</p>
                    <p className="text-xs text-white/70 md:text-sm">Anggota Koperasi</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white md:text-3xl">75K+</p>
                    <p className="text-xs text-white/70 md:text-sm">Masyarakat Umum</p>
                  </div>
                </div>
              </div>

              <div className="relative mt-8">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                  <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8fc2ff]/40 blur-3xl md:h-80 md:w-[34rem] md:bg-[#9ec9ff]/35" />
                  <div className="absolute left-1/2 top-1/2 h-40 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-2xl md:h-56 md:w-[30rem] md:bg-white/15" />
                </div>

                <div className="relative overflow-hidden">
                  <Image
                    src="/ImageContent - Hero.png"
                    alt="Pruviu dashboard preview"
                    width={1080}
                    height={1080}
                    className="h-auto w-full md:hidden"
                    priority
                  />
                  <Image
                    src="/dashboard-example.png"
                    alt="Pruviu dashboard preview"
                    width={1512}
                    height={800}
                    className="hidden h-auto w-full md:block"
                    priority
                  />
                </div>
              </div>
            </div>
          </section>

          <section
            id="web"
            ref={(element) => {
              sectionRefs.current[1] = element;
            }}
            className={`snap-panel bg-[radial-gradient(circle_at_top_right,_#f4f7ff,_#ffffff_60%,_#e8efff)] ${
              activeSection === 1 ? "panel-active" : ""
            }`}
            aria-labelledby="web-title"
          >
            <div className="panel-reveal edge-safe-x container mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 md:px-6 lg:grid-cols-2 lg:gap-16">
              <div className="mx-auto w-full max-w-2xl">
                <Image
                  src="/Laptop - ImageContent.png"
                  alt="Pruviu web dashboard"
                  width={1200}
                  height={675}
                  className="h-auto w-full"
                />
              </div>

              <div className="space-y-4 text-center lg:text-left">
                <h2 id="web-title" className="text-3xl font-semibold text-navy-800 md:text-5xl">
                  Pruviu <span className="text-red-600">Web</span>
                </h2>
                <h3 className="text-2xl font-semibold leading-tight text-navy-700 md:text-4xl">
                  Tingkatkan Kualitas Pinjaman Koperasi Anda
                </h3>
                <p className="text-base leading-relaxed text-navy-700 md:text-lg">
                  Dirancang untuk koperasi sektor jasa keuangan dengan prinsip
                  kehati-hatian, know-your-customer, dan mitigasi risiko
                  pinjaman bermasalah.
                </p>
                <div className="space-y-3 italic">
                  <FeaturePointer>
                    Didukung sumber data serta analitik lengkap dan terpercaya
                  </FeaturePointer>
                  <FeaturePointer>
                    Dilengkapi fitur konfigurasi pengaturan Pruviu Mobile
                  </FeaturePointer>
                </div>
              </div>
            </div>
          </section>

          <section
            id="mobile"
            ref={(element) => {
              sectionRefs.current[2] = element;
            }}
            className={`snap-panel bg-[radial-gradient(circle_at_top_left,_#f4f7ff,_#ffffff_60%,_#e8efff)] ${
              activeSection === 2 ? "panel-active" : ""
            }`}
            aria-labelledby="mobile-title"
          >
            <div className="panel-reveal edge-safe-x container mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 md:items-center md:gap-8 md:px-6 lg:grid-cols-2 lg:gap-14">
              <div className="mx-auto w-full max-w-2xl">
                <div className="relative">
                  <div
                    className="relative h-[300px] sm:h-[420px] md:h-[480px]"
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
                          <button
                            type="button"
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`absolute cursor-pointer border-0 bg-transparent p-0 transition-all duration-700 ease-in-out ${
                              !isVisible
                                ? "pointer-events-none opacity-0"
                                : "opacity-100"
                            } ${
                              isActive
                                ? "z-20 w-36 sm:w-44 md:w-52"
                                : "z-10 w-28 sm:w-36 md:w-44"
                            }`}
                            style={{
                              transform: transformStyle,
                              transformStyle: "preserve-3d",
                            }}
                            aria-label={`Tampilkan slide ${index + 1}`}
                            aria-current={isActive}
                          >
                            <Image
                              src={image.src}
                              alt={image.alt}
                              width={800}
                              height={1300}
                              className={`h-auto w-full rounded-2xl shadow-2xl transition-all duration-700 ${
                                isActive ? "brightness-100" : "brightness-75"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div
                    className="mt-6 flex justify-center gap-2"
                    role="tablist"
                    aria-label="Navigasi slide aplikasi mobile"
                  >
                    {mobileImages.map((_, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentSlide ? "w-8 bg-navy-600" : "w-2 bg-gray-300"
                        }`}
                        aria-label={`Slide ${index + 1}`}
                        aria-selected={index === currentSlide}
                        role="tab"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-center lg:text-left">
                <h2 id="mobile-title" className="text-3xl font-semibold text-navy-800 md:text-5xl">
                  Pruviu <span className="text-red-600">Mobile</span>
                </h2>
                <h3 className="text-2xl font-semibold leading-tight text-navy-700 md:text-4xl">
                  Monitor Risiko Keuangan Keluarga Anda
                </h3>
                <p className="text-base leading-relaxed text-navy-700 md:text-lg">
                  Menjembatani interaksi koperasi dengan anggota melalui akses
                  pemantauan risiko keuangan pribadi dan keluarga secara cepat.
                </p>
                <div className="space-y-3 italic">
                  <FeaturePointer>Khusus untuk anggota koperasi</FeaturePointer>
                  <FeaturePointer>
                    Daftarkan diri Anda ke koperasi terdekat untuk mengakses
                    layanan Pruviu Mobile
                  </FeaturePointer>
                </div>
              </div>
            </div>
          </section>

          <section
            id="compliance"
            ref={(element) => {
              sectionRefs.current[3] = element;
            }}
            className={`snap-panel bg-[linear-gradient(135deg,_#1f1d52,_#273b93_55%,_#ee3042)] ${
              activeSection === 3 ? "panel-active" : ""
            }`}
            aria-labelledby="compliance-title"
          >
            <div className="panel-reveal edge-safe-x container mx-auto w-full max-w-6xl md:px-6">
              <div className="rounded-3xl border border-white/25 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-sm md:p-10">
                <div className="mb-8 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                    Trust • Compliance • Security
                  </p>
                  <h2
                    id="compliance-title"
                    className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
                  >
                    Dipercaya karena terhubung, terdaftar, dan tersertifikasi
                  </h2>
                  <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/85 md:text-base">
                    Komitmen tata kelola data dan keamanan diperkuat melalui
                    afiliasi global, sertifikasi internasional, dan registrasi
                    sistem elektronik di Indonesia.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {trustBadges.map((badge) => (
                    <div
                      key={badge.title}
                      className="rounded-xl border border-white/20 bg-white/95 px-3 py-3.5 text-center text-navy-800 shadow-lg"
                    >
                      <Image
                        src={badge.src}
                        alt={badge.alt}
                        width={badge.width}
                        height={badge.height}
                        className={`mx-auto w-auto object-contain ${
                          badge.title === "DUNS"
                            ? "max-h-9 md:max-h-10"
                            : "max-h-8 md:max-h-9"
                        }`}
                      />
                      <p className="mt-2 text-sm font-semibold">{badge.title}</p>
                      <p className="mt-1 text-xs text-navy-700/90">{badge.subtitle}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="https://app.pruviu.com"
                    className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-navy-700 transition hover:bg-white/90"
                  >
                    Mulai Sekarang
                  </Link>
                  <Link
                    href="/kontak"
                    className="rounded-lg border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Hubungi Kami
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <footer ref={footerRef} className="post-glide-footer">
            <SiteFooter complaintHref="#compliance" />
          </footer>
        </div>
      </main>
    </div>
  );
}
