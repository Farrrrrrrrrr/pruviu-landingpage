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

const SECTION_IDS = ["beranda", "web", "mobile", "telco", "compliance"] as const;

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
    // Compare visible pixel height rather than intersectionRatio - a
    // ratio-based threshold can never be crossed by a panel whose content
    // is taller than (viewport height / threshold), which silently left
    // tall panels (e.g. telco) permanently invisible on short mobile
    // viewports since their .panel-reveal opacity never got triggered.
    //
    // Each IntersectionObserver callback only reports entries that CROSSED
    // a threshold since the last callback, not a full snapshot of every
    // observed element. During a fast scroll, the final callback in the
    // sequence can contain only the outgoing section (mid-fade-out), so
    // picking the "most visible" section from that one batch alone can
    // wrongly resurrect a section that's actually scrolled out of view.
    // Track every section's last-known visible height across callbacks
    // instead, so "most visible" is always computed from complete,
    // up-to-date knowledge of all sections, not just the latest batch.
    const visibleHeights = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleHeights.set(
            entry.target,
            entry.isIntersecting ? entry.intersectionRect.height : 0,
          );
        });

        let bestIndex = -1;
        let bestHeight = 0;
        sectionRefs.current.forEach((section, index) => {
          if (!section) {
            return;
          }
          const height = visibleHeights.get(section) ?? 0;
          if (height > bestHeight) {
            bestHeight = height;
            bestIndex = index;
          }
        });

        if (bestIndex >= 0) {
          setActiveSection(bestIndex);
        }
      },
      {
        threshold: [0, 0.15, 0.3, 0.45, 0.55, 0.7],
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
    (event: globalThis.WheelEvent) => {
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

      // Most panels are exactly one viewport tall, but the hero panel is now
      // allowed to grow taller to fit a full-size image. If the active panel
      // has more of itself left to reveal in the wheel direction, let the
      // wheel scroll it natively instead of jumping straight to the next/
      // previous section - only hijack once its edge is actually reached.
      const activeElement = sectionRefs.current[activeSectionRef.current];
      if (stage && activeElement) {
        const sectionTop = activeElement.offsetTop;
        const sectionBottom = sectionTop + activeElement.offsetHeight;
        const viewTop = stage.scrollTop;
        const viewBottom = viewTop + stage.clientHeight;
        const EPSILON = 2;

        if (event.deltaY > 0 && sectionBottom - viewBottom > EPSILON) {
          return;
        }
        if (event.deltaY < 0 && viewTop - sectionTop > EPSILON) {
          return;
        }
      }

      event.preventDefault();

      if (isTransitioningRef.current) {
        return;
      }

      moveSection(event.deltaY > 0 ? 1 : -1);
    },
    [moveSection, scrollToFooter],
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) {
      return;
    }

    // React attaches onWheel as a passive listener by default (for scroll
    // performance), which silently makes event.preventDefault() inside it a
    // no-op - the browser scrolls natively regardless. That was invisible
    // while every panel was exactly one viewport tall, but breaks the
    // "let this taller panel scroll internally before jumping sections"
    // logic in handleWheel outright. A real DOM listener with
    // passive: false is required for preventDefault to actually work.
    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const handleTouchStart = useCallback((event: TouchEvent<HTMLElement>) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent<HTMLElement>) => {
      const startY = touchStartYRef.current;
      touchStartYRef.current = null;

      if (startY === null || isTransitioningRef.current) {
        return;
      }

      const endY = event.changedTouches[0]?.clientY;
      if (typeof endY !== "number") {
        return;
      }

      const delta = startY - endY;
      if (Math.abs(delta) < 45) {
        return;
      }

      // Panel-to-panel movement is left entirely to native touch scrolling +
      // CSS scroll-snap (mandatory, scroll-snap-stop: always) - it already
      // guarantees one section per gesture with proper momentum, and layering
      // a JS scrollIntoView on top of it fought the native snap and produced
      // stutter. The one thing CSS can't do is hand off to the footer, which
      // opts out of snapping, so that boundary case still needs JS.
      if (delta > 0 && activeSectionRef.current === SECTION_IDS.length - 1) {
        scrollToFooter();
      }
    },
    [scrollToFooter],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target?.isContentEditable
      ) {
        return;
      }
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      const stage = stageRef.current;
      const footer = footerRef.current;
      const footerStart = footer?.offsetTop ?? Number.POSITIVE_INFINITY;
      const isInFooter = stage ? stage.scrollTop >= footerStart - 24 : false;

      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
          if (isInFooter) {
            return;
          }
          event.preventDefault();
          if (activeSectionRef.current === SECTION_IDS.length - 1) {
            scrollToFooter();
          } else {
            moveSection(1);
          }
          break;
        case "ArrowUp":
        case "PageUp":
          if (isInFooter) {
            return;
          }
          event.preventDefault();
          moveSection(-1);
          break;
        case "Home":
          event.preventDefault();
          scrollToSection(0);
          break;
        case "End":
          event.preventDefault();
          scrollToFooter();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveSection, scrollToFooter, scrollToSection]);

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

  const telcoFeatures = [
    {
      name: "Telco Score",
      description:
        "Mengecek skor kelayakan kredit calon anggota/debitur berdasarkan nomor telepon dan data telekommunikasi 3 provider utama di Indonesia (Telkosel, Indosat, XL).",
      icon: (
        <svg
          className="h-2/3 w-2/3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M4.5 15.5a7.5 7.5 0 0 1 15 0M12 15.5V11m0 0 3-2.5"
          />
          <circle cx="12" cy="15.5" r="0.75" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      name: "Deteksi Judol",
      description:
        "Mendeteksi aktivitas calon anggota/debitur pada website atau aplikasi yang berisiko, terutama yang berkaitan dengan judi online dan sumber-sumber ilegal lainnya.",
      icon: (
        <svg
          className="h-2/3 w-2/3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M12 3.5 5 6.5v5c0 4.5 3 7 7 8.5 4-1.5 7-4 7-8.5v-5L12 3.5Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M12 9v3.5M12 15.25h.01"
          />
        </svg>
      ),
    },
    {
      name: "Prediksi Pendapatan",
      description:
        "Memprediksi penghasilan bulanan berdasarkan data konsumsi telekomunikasi, tipe device, aktivitas e-commerce, lending apps, dan internet banking dari calon anggota/debitur.",
      icon: (
        <svg
          className="h-2/3 w-2/3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M4 19V9m5 10V5m5 14v-7m5 7V11"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M4 9 9 5l5 3.5L19 4"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="h-dvh overflow-clip bg-gray-50">
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
            <div className="panel-reveal edge-safe-x mx-auto w-full max-w-5xl pb-8 pt-4 sm:pb-10 sm:pt-6 md:px-8">
              <div className="text-center">
                <h1
                  id="hero-title"
                  className="text-2xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
                >
                  Sistem Monitoring dan Mitigasi Risiko Keuangan Terpadu
                  <span className="text-red-400"> Pertama di Indonesia</span>
                </h1>
                <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-white/80 sm:mt-3 sm:text-lg">
                  Platform digital dengan informasi perkreditan terpercaya dan
                  analitik cerdas untuk koperasi, anggota koperasi, dan
                  masyarakat umum.
                </p>
                <div className="mt-3 flex flex-col justify-center gap-2 sm:mt-4 sm:flex-row sm:gap-3">
                  <Link
                    href="https://app.pruviu.com"
                    className="rounded-lg bg-white px-6 py-2 text-center text-sm font-semibold text-navy-700 shadow-lg transition hover:bg-white/90 sm:py-2.5 sm:text-base"
                  >
                    Daftar
                  </Link>
                  <Link
                    href="https://app.pruviu.com"
                    className="rounded-lg border-2 border-white/40 px-6 py-2 text-center text-sm font-medium text-white transition hover:bg-white/10 sm:py-2.5 sm:text-base"
                  >
                    Masuk
                  </Link>
                </div>
                <div className="mt-3 flex justify-center gap-8 text-center sm:mt-4 sm:gap-16">
                  <div>
                    <p className="text-lg font-bold text-white sm:text-2xl md:text-3xl">500+</p>
                    <p className="text-xs text-white/70 md:text-sm">Koperasi User Web</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white sm:text-2xl md:text-3xl">1.5jt+</p>
                    <p className="text-xs text-white/70 md:text-sm">Anggota Koperasi</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white sm:text-2xl md:text-3xl">5K+</p>
                    <p className="text-xs text-white/70 md:text-sm">Masyarakat Umum</p>
                  </div>
                </div>
              </div>

              <div className="relative mt-6 sm:mt-8">
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
                    src="/dashboard-example-pascabayar.png"
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
                <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 lg:justify-start">
                  {[
                    {
                      top: "SLIK",
                      bottom: "OJK",
                      textGradient: "from-navy-600 to-red-600",
                    },
                    {
                      top: "SLIK",
                      bottom: "Koperasi",
                      textGradient: "from-navy-600 to-red-600",
                    },
                    {
                      top: "Full",
                      bottom: "Check",
                      textGradient: "from-navy-600 to-red-600",
                    },
                  ].map((badge) => (
                    <div
                      key={badge.bottom}
                      className={`w-28 rounded-2xl bg-gradient-to-br p-[2px] shadow-sm sm:w-32 md:w-40 ${badge.textGradient}`}
                    >
                      <div className="flex h-20 w-full flex-col items-center justify-center gap-1 rounded-[calc(1rem-2px)] bg-white px-3 sm:h-24 md:h-28">
                        <span
                          className={`bg-gradient-to-br bg-clip-text text-center text-lg font-extrabold uppercase leading-tight text-transparent sm:text-xl md:text-2xl ${badge.textGradient}`}
                        >
                          {badge.top}
                        </span>
                        <span
                          className={`bg-gradient-to-br bg-clip-text text-center text-lg font-extrabold uppercase leading-tight text-transparent sm:text-xl md:text-2xl ${badge.textGradient}`}
                        >
                          {badge.bottom}
                        </span>
                      </div>
                    </div>
                  ))}
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
            id="telco"
            ref={(element) => {
              sectionRefs.current[3] = element;
            }}
            className={`snap-panel relative overflow-hidden bg-[radial-gradient(150%_120%_at_20%_-15%,_#1f1d52_0%,_#273b93_55%,_#336ab3_100%)] ${
              activeSection === 3 ? "panel-active" : ""
            }`}
            aria-labelledby="telco-title"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#8fc2ff]/25 blur-3xl md:h-96 md:w-[36rem]" />
            </div>

            <div className="panel-reveal edge-safe-x container mx-auto w-full max-w-6xl md:px-6">
              <div className="text-center">
                <h2
                  id="telco-title"
                  className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
                >
                  Lengkapi mitigasi risiko dengan{" "}
                  <span className="text-red-400">scoring telco</span>
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/85 md:text-base">
Perkuat mitigasi risiko dengan insight berbasis data telco yang membantu menghasilkan penilaian kemampuan bayar secara lebih akurat, mulai dari Telco Score, deteksi indikasi judi online, hingga prediksi pendapatan.</p> </div>

              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 md:mt-12 md:gap-8">
                {telcoFeatures.map((feature) => (
                  <div
                    key={feature.name}
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="relative aspect-square w-full max-w-[15rem]">
                      <div
                        aria-hidden="true"
                        className="absolute inset-2 rounded-3xl bg-[linear-gradient(135deg,_#5b8def_0%,_#a45e98_60%,_#ee3042_100%)] opacity-50 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
                      />
                      <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 rounded-3xl bg-[linear-gradient(135deg,_#5b8def_0%,_#a45e98_60%,_#ee3042_100%)] px-6 text-white shadow-xl ring-1 ring-white/20 transition duration-300 group-hover:-translate-y-1">
                        <div className="flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24 md:h-28 md:w-28">
                          {feature.icon}
                        </div>
                        <div className="h-px w-10 bg-white/40" />
                        <h3 className="text-base font-semibold leading-snug sm:text-lg">
                          {feature.name}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-5 max-w-[15rem] text-sm leading-relaxed text-white/70 md:text-base">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="compliance"
            ref={(element) => {
              sectionRefs.current[4] = element;
            }}
            className={`snap-panel bg-[linear-gradient(135deg,_#1f1d52,_#273b93_55%,_#ee3042)] ${
              activeSection === 4 ? "panel-active" : ""
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
