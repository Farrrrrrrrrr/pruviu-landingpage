import fs from "fs";
import path from "path";

const WIKI_DIR = path.join(process.cwd(), "content", "wiki");

// Unlisted by design: no login, but the URL itself is the access control.
// Not linked from any nav/footer, not in sitemap.xml, and kept out of
// robots.txt (listing it there would leak the path to anyone reading the
// file). Only the noindex/nofollow meta tags on the pages themselves are a
// safety net in case the URL ever leaks to a crawler.
export const WIKI_BASE_PATH =
  "/yfjui3tyjcfrjh/fzfbnd5nwfron7/gkgacmwtoxbr0h/wiki";

export type WikiCategory =
  | "skor-pengecekan"
  | "manajemen-data"
  | "laporan-riwayat"
  | "akun-langganan";

export const CATEGORY_LABELS: Record<WikiCategory, string> = {
  "skor-pengecekan": "Skor & Pengecekan",
  "manajemen-data": "Manajemen Data",
  "laporan-riwayat": "Laporan & Riwayat",
  "akun-langganan": "Akun & Langganan",
};

export const CATEGORY_ORDER: WikiCategory[] = [
  "skor-pengecekan",
  "manajemen-data",
  "laporan-riwayat",
  "akun-langganan",
];

export interface WikiArticle {
  title: string;
  slug: string;
  category: WikiCategory;
  summary: string;
  html: string;
}

interface Frontmatter {
  title: string;
  slug: string;
  category: WikiCategory;
  summary: string;
}

function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    throw new Error("Wiki markdown file is missing frontmatter");
  }
  const [, fmBlock, body] = match;
  const data: Record<string, string> = {};
  for (const line of fmBlock.split("\n")) {
    const lineMatch = line.match(/^(\w+):\s*"?(.*?)"?\s*$/);
    if (lineMatch) {
      data[lineMatch[1]] = lineMatch[2];
    }
  }
  return { data: data as unknown as Frontmatter, body: body.trim() };
}

/** Escape raw HTML-significant characters before re-inserting our own tags. */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** http(s)/mailto/tel and relative/anchor links only — blocks `javascript:` etc. */
const SAFE_URL_SCHEME = /^(https?:|mailto:|tel:|\/|#)/i;

/** Sanitize a URL already run through escapeHtml() before it lands in an href attribute. */
function sanitizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!SAFE_URL_SCHEME.test(trimmed)) {
    return "#";
  }
  // escapeHtml() doesn't touch quotes, which matter once the value sits
  // inside an href="..." attribute rather than as text content.
  return trimmed.replace(/"/g, "&quot;");
}

/** Inline formatting: **bold**, `code`, [text](url). Applied after escaping. */
function renderInline(text: string): string {
  let out = escapeHtml(text);
  out = out.replace(/`([^`]+)`/g, '<code class="wiki-code">$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_match, label: string, url: string) =>
      `<a href="${sanitizeUrl(url)}" class="text-navy-600 underline hover:text-navy-700">${label}</a>`
  );
  return out;
}

/** Minimal, purpose-built markdown -> HTML renderer for our own controlled content shape. */
function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  const html: string[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      // Q/A pairs (**Q: ...** on one line, A: ... on the next) get a line
      // break instead of running together as one sentence.
      const isQaPair =
        paragraph.length === 2 &&
        /^\*\*Q:/.test(paragraph[0]) &&
        /^A:/.test(paragraph[1]);
      const text = isQaPair
        ? paragraph.map(renderInline).join("<br />")
        : renderInline(paragraph.join(" "));
      html.push(`<p>${text}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (listItems.length) {
      html.push(
        `<ul>${listItems.map((li) => `<li>${renderInline(li)}</li>`).join("")}</ul>`
      );
      listItems = [];
    }
  };

  let inCodeBlock = false;
  let codeLines: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        html.push(`<pre class="wiki-pre"><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        codeLines = [];
        inCodeBlock = false;
      } else {
        flushParagraph();
        flushList();
        inCodeBlock = true;
      }
      continue;
    }
    if (inCodeBlock) {
      codeLines.push(rawLine);
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    const h3 = line.match(/^###\s+(.*)$/);
    const h2 = line.match(/^##\s+(.*)$/);
    const h1 = line.match(/^#\s+(.*)$/);
    const li = line.match(/^[-*]\s+(.*)$/);

    if (h3) {
      flushParagraph();
      flushList();
      html.push(`<h3>${renderInline(h3[1])}</h3>`);
    } else if (h2) {
      flushParagraph();
      flushList();
      html.push(`<h2>${renderInline(h2[1])}</h2>`);
    } else if (h1) {
      flushParagraph();
      flushList();
      html.push(`<h1>${renderInline(h1[1])}</h1>`);
    } else if (li) {
      flushParagraph();
      listItems.push(li[1]);
    } else {
      flushList();
      paragraph.push(line.trim());
    }
  }
  flushParagraph();
  flushList();

  return html.join("\n");
}

export function getAllWikiSlugs(): string[] {
  if (!fs.existsSync(WIKI_DIR)) return [];
  return fs
    .readdirSync(WIKI_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getWikiArticle(slug: string): WikiArticle {
  const filePath = path.join(WIKI_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, body } = parseFrontmatter(raw);
  return {
    title: data.title,
    slug: data.slug,
    category: data.category,
    summary: data.summary,
    html: renderMarkdown(body),
  };
}

export function getAllWikiArticles(): WikiArticle[] {
  return getAllWikiSlugs()
    .map(getWikiArticle)
    .sort((a, b) => a.title.localeCompare(b.title, "id"));
}
