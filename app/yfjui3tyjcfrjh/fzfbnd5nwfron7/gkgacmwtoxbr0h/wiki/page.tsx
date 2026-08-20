import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../../../../components/site-footer";
import { SiteHeader } from "../../../../components/site-header";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  WIKI_BASE_PATH,
  getAllWikiArticles,
} from "../../../../lib/wiki";

export const metadata: Metadata = {
  title: "Wiki Internal Pruviu",
  description: "Referensi fitur internal untuk tim sales dan tim teknis Pruviu.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WikiIndexPage() {
  const articles = getAllWikiArticles();
  const byCategory = CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    items: articles.filter((a) => a.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <SiteHeader currentPath={WIKI_BASE_PATH} />

      <main id="main-content">
        <section className="bg-white py-16 md:py-20 border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-600">
                Dokumen Internal
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-navy-700">
                Wiki Internal Pruviu
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Referensi fitur untuk account executive, account manager dan tim teknis: apa yang setiap
                fitur lakukan, cara kerjanya, dan jawaban untuk pertanyaan yang
                paling sering ditanyakan calon pelanggan.
              </p>
              
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 space-y-12">
            {byCategory.map((group) => (
              <div key={group.category}>
                <h2 className="text-xl font-bold text-navy-700 mb-4">
                  {group.label}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.items.map((item) => (
                    <Link
                      key={item.slug}
                      href={`${WIKI_BASE_PATH}/${item.slug}`}
                      className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-navy-400 transition-all"
                    >
                      <h3 className="font-semibold text-navy-700 mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
