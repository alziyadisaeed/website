import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { Calendar, User, Clock } from 'lucide-react';
import { connectDB } from '@/lib/mongodb';
import Article from '@/lib/models/Article';
import { sanitizeHtml } from '@/lib/sanitize';
import JsonLd from '@/components/seo/JsonLd';
import RequestForm from '@/components/sections/RequestForm';
import Link from 'next/link';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://Alziyadi Med.com";

interface ArticleDoc {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  locale: string;
  publishedAt: Date | string;
  updatedAt: Date | string;
  author: string;
  wordCount?: number;
}

const getArticle = unstable_cache(
  async (slug: string, locale: string): Promise<ArticleDoc | null> => {
    await connectDB();
    const doc = await Article.findOne({ slug, locale: locale as 'ar' | 'en' | 'ru' }).lean();
    if (!doc) return null;
    return {
      _id: String(doc._id),
      title: doc.title,
      slug: doc.slug,
      excerpt: doc.excerpt,
      content: doc.content,
      locale: doc.locale,
      publishedAt: doc.publishedAt ?? doc.createdAt ?? new Date(),
      updatedAt: doc.updatedAt ?? new Date(),
      author: doc.author,
      wordCount: doc.wordCount,
    };
  },
  ['article-detail'],
  { tags: ['articles'], revalidate: 86400 }
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  let article: ArticleDoc | null = null;
  try {
    article = await getArticle(slug, locale);
  } catch {
    article = null;
  }
  if (!article) return { title: 'Article Not Found' };

  return {
		title: `${article.title} | Alziyadi Med`,
		description: article.excerpt,
		alternates: {
			canonical: `${baseUrl}/${locale}/blog/${slug}`,
		},
		openGraph: {
			title: article.title,
			description: article.excerpt,
			type: "article",
			publishedTime: String(article.publishedAt),
			modifiedTime: String(article.updatedAt),
			authors: [article.author],
		},
  };
}

const backLabels: Record<string, string> = {
  ar: '← العودة إلى المدونة',
  en: '← Back to Blog',
  ru: '← Назад к блогу',
};

const waLabels: Record<string, string> = {
  ar: 'هل لديك سؤال؟ تواصل معنا عبر واتساب',
  en: 'Have a question? Contact us on WhatsApp',
  ru: 'Есть вопрос? Свяжитесь с нами в WhatsApp',
};

const waButtons: Record<string, string> = {
  ar: 'تواصل الآن',
  en: 'Contact Now',
  ru: 'Связаться',
};

const updatedLabels: Record<string, string> = {
  ar: 'آخر تحديث',
  en: 'Last updated',
  ru: 'Последнее обновление',
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  let article: ArticleDoc | null = null;
  try {
    article = await getArticle(slug, locale);
  } catch {
    notFound();
  }

  if (!article) notFound();

  const safeHtml = sanitizeHtml(article.content);

  const articleJsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: article.title,
		datePublished: new Date(article.publishedAt).toISOString(),
		dateModified: new Date(article.updatedAt).toISOString(),
		author: {
			"@type": "Person",
			"@id": `${baseUrl}/#dr-saeed`,
			name: article.author,
		},
		publisher: {
			"@type": "MedicalOrganization",
			"@id": `${baseUrl}/#organization`,
			name: "Alziyadi Med Treatment in Russia",
		},
		description: article.excerpt,
		inLanguage: locale,
		wordCount: article.wordCount,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${baseUrl}/${locale}/blog/${slug}`,
		},
		speakable: {
			"@type": "SpeakableSpecification",
			cssSelector: ["h1", ".article-excerpt", ".article-content h2"],
		},
  };

  const readingTime = article.wordCount
    ? Math.ceil(article.wordCount / 200)
    : null;

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div
          className="py-16 sm:py-20 text-white"
          style={{ background: 'linear-gradient(135deg, #0F1F3D 0%, #1A6DB5 100%)' }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href={`/${locale}/blog`}
              className="inline-block text-white/70 hover:text-white text-sm mb-6 transition-colors"
            >
              {backLabels[locale] ?? backLabels.en}
            </Link>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>
            <p className="article-excerpt text-white/80 text-lg mb-6">{article.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <User size={14} />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                <time dateTime={String(article.publishedAt)}>
                  {new Date(article.publishedAt).toLocaleDateString(
                    locale === 'ar' ? 'ar-SA' : locale === 'ru' ? 'ru-RU' : 'en-US',
                    { year: 'numeric', month: 'long', day: 'numeric' }
                  )}
                </time>
              </span>
              {readingTime && (
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {readingTime} min read
                </span>
              )}
            </div>
            <div className="mt-4 text-xs text-white/50">
              {updatedLabels[locale]}: {new Date(article.updatedAt).toLocaleDateString(
                locale === 'ar' ? 'ar-SA' : locale === 'ru' ? 'ru-RU' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div
            className="article-content prose prose-lg max-w-none prose-headings:text-[var(--color-text)] prose-a:text-[var(--color-primary)] prose-strong:text-[var(--color-text)]"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />

          {/* WhatsApp CTA */}
          <div
            className="mt-12 rounded-2xl p-8 text-white text-center"
            style={{ background: 'linear-gradient(135deg, #1A6DB5 0%, #00C2A8 100%)' }}
          >
            <p className="text-lg font-semibold mb-4">{waLabels[locale] ?? waLabels.en}</p>
            <a
              href="https://wa.me/79252500066"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[var(--color-primary)] font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors"
            >
              {waButtons[locale] ?? waButtons.en}
            </a>
          </div>
        </div>

        <RequestForm source="blog" articleSlug={article.slug} locale={locale} />
      </div>
    </>
  );
}
