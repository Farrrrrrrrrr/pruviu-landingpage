import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../../../../components/site-footer";
import { SiteHeader } from "../../../../../components/site-header";
import {
  CATEGORY_LABELS,
  WIKI_BASE_PATH,
  getAllWikiSlugs,
  getWikiArticle,
} from "../../../../../lib/wiki";

export function generateStaticParams() {
  return getAllWikiSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugs = getAllWikiSlugs();
  if (!slugs.includes(slug)) return {};
  const article = getWikiArticle(slug);
  return {
    title: `${article.title} — Wiki Internal Pruviu`,
    description: article.summary,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function WikiArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugs = getAllWikiSlugs();
  if (!slugs.includes(slug)) {
    notFound();
  }
  const article = getWikiArticle(slug);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <SiteHeader currentPath={WIKI_BASE_PATH} />

      <main id="main-content">
        <section className="bg-white py-10 md:py-14 border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-3">
              <Link
                href={WIKI_BASE_PATH}
                className="text-sm font-medium text-navy-600 hover:text-navy-700"
              >
                ← Wiki Internal
              </Link>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                {CATEGORY_LABELS[article.category]}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-navy-700">
                {article.title}
              </h1>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4 md:px-6">
            <article
              className="wiki-article max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
