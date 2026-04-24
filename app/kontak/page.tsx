"use client";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export default function Kontak() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader currentPath="/kontak" />

      <main id="main-content">

      {/* Contact Section */}
      <section className="container mx-auto px-4 md:px-6 py-10 md:py-20" aria-labelledby="contact-title">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h1 id="contact-title" className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-700 mb-3 md:mb-4">Hubungi Kami</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Kami siap membantu Anda dengan pertanyaan dan kebutuhan Anda</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Email Support */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-2 border-blue-100 w-full h-full">
              <div className="flex h-full flex-col items-center text-center space-y-4 md:space-y-6">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-navy-700 mb-2">Email Support</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">Kirim email kepada kami untuk pertanyaan detail atau bantuan teknis</p>
                </div>
                <a 
                  href="mailto:support@pruviu.com" 
                  className="mt-auto inline-flex items-center space-x-2 px-6 md:px-8 py-3 md:py-4 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium text-sm md:text-base shadow-md w-full max-w-[230px] justify-center"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="whitespace-nowrap">support@pruviu.com</span>
                </a>
              </div>
            </div>

            {/* WhatsApp Business */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-2 border-blue-100 w-full h-full">
              <div className="flex h-full flex-col items-center text-center space-y-4 md:space-y-6">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a2 2 0 011.895 1.368l1.498 4.493a2 2 0 01-.502 2.09l-1.18 1.18a16.042 16.042 0 006.748 6.748l1.18-1.18a2 2 0 012.09-.502l4.493 1.498A2 2 0 0122 18.72V22a2 2 0 01-2 2h-1C9.611 24 0 14.389 0 3V2a2 2 0 012-2h1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-navy-700 mb-2">WhatsApp Business</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">Chat langsung dengan tim kami melalui WhatsApp Business</p>
                </div>
                <a
                  href="https://wa.me/6285600777888"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center space-x-2 px-6 md:px-8 py-3 md:py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm md:text-base shadow-md w-full max-w-[230px] justify-center"
                >
                  <span>085600777888</span>
                </a>
              </div>
            </div>

            {/* Call Center */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-2 border-blue-100 w-full h-full md:col-span-2 lg:col-span-1">
              <div className="flex h-full flex-col items-center text-center space-y-4 md:space-y-6">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a2 2 0 011.895 1.368l1.498 4.493a2 2 0 01-.502 2.09l-1.18 1.18a16.042 16.042 0 006.748 6.748l1.18-1.18a2 2 0 012.09-.502l4.493 1.498A2 2 0 0122 18.72V22a2 2 0 01-2 2h-1C9.611 24 0 14.389 0 3V2a2 2 0 012-2h1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-navy-700 mb-2">Call Center</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">Hubungi kami melalui call center untuk bantuan cepat</p>
                </div>
                <a
                  href="tel:02150808165"
                  className="mt-auto inline-flex items-center space-x-2 px-6 md:px-8 py-3 md:py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm md:text-base shadow-md w-full max-w-[230px] justify-center"
                >
                  <span>02150808165</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      </main>
    </div>
  );
}
