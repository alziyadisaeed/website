import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { connectDB } from '@/lib/mongodb';
import Article from '@/lib/models/Article';
import { unstable_cache } from 'next/cache';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://drsaeedalziyadi.com';

const titles: Record<string, string> = {
  ar: 'المدونة | د. سعيد الزيادي للسياحة العلاجية',
  en: 'Blog | Dr. Saeed Alziyadi Medical Tourism',
  ru: 'Блог | Медицинский туризм Доктора Саида',
};

const descriptions: Record<string, string> = {
  ar: 'مقالات وأدلة شاملة حول السياحة الطبية في روسيا للمرضى العرب.',
  en: 'Articles and guides on medical tourism in Russia for Arab patients.',
  ru: 'Статьи и руководства по медицинскому туризму в России для арабских пациентов.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: {
        ar: `${baseUrl}/ar/blog`,
        en: `${baseUrl}/en/blog`,
        ru: `${baseUrl}/ru/blog`,
        'x-default': `${baseUrl}/ar/blog`,
      },
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }, { locale: 'ru' }];
}

interface ArticleDoc {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  locale: string;
  publishedAt: Date | string;
  author: string;
}

const getArticles = unstable_cache(
  async (locale: string): Promise<ArticleDoc[]> => {
    await connectDB();
    const docs = await Article.find({ locale: locale as 'ar' | 'en' | 'ru' }).sort({ publishedAt: -1 }).lean();
    return docs.map((d) => ({
      _id: String(d._id),
      title: d.title,
      slug: d.slug,
      excerpt: d.excerpt,
      locale: d.locale,
      publishedAt: d.publishedAt ?? d.createdAt ?? new Date(),
      author: d.author,
    }));
  },
  ['articles-list'],
  { tags: ['articles'], revalidate: 86400 }
);

const headings: Record<string, string> = {
  ar: 'المدونة والموارد الطبية',
  en: 'Blog & Medical Resources',
  ru: 'Блог и медицинские ресурсы',
};

const readMoreLabels: Record<string, string> = {
  ar: 'اقرأ المزيد',
  en: 'Read More',
  ru: 'Читать далее',
};

const comingSoonLabels: Record<string, string> = {
  ar: 'المحتوى قادم قريباً',
  en: 'Content Coming Soon',
  ru: 'Контент скоро появится',
};

const comingSoonSubLabels: Record<string, string> = {
  ar: 'نحن نعمل على إعداد مقالات مفيدة حول السياحة العلاجية في روسيا.',
  en: 'We are preparing helpful articles about medical tourism in Russia.',
  ru: 'Мы готовим полезные статьи о медицинском туризме в России.',
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let articles: ArticleDoc[] = [];
  try {
    articles = await getArticles(locale);
  } catch {
    articles = [];
  }

  return (
    <div className="min-h-screen bg-[var(--color-off-white)]">
      {/* Header */}
      <div
        className="py-16 sm:py-20 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #0F1F3D 0%, #1A6DB5 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {headings[locale] ?? headings.en}
          </h1>
          <p className="text-white/80 text-lg">{descriptions[locale] ?? descriptions.en}</p>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📝</div>
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3">
              {comingSoonLabels[locale] ?? comingSoonLabels.en}
            </h2>
            <p className="text-[var(--color-text-muted)]">
              {comingSoonSubLabels[locale] ?? comingSoonSubLabels.en}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article._id}
                href={`/${locale}/blog/${article.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--color-border)] hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-3">
                    <Calendar size={12} />
                    <time dateTime={String(article.publishedAt)}>
                      {new Date(article.publishedAt).toLocaleDateString(
                        locale === 'ar' ? 'ar-SA' : locale === 'ru' ? 'ru-RU' : 'en-US',
                        { year: 'numeric', month: 'long', day: 'numeric' }
                      )}
                    </time>
                  </div>
                  <h2 className="font-bold text-[var(--color-text)] text-lg mb-3 group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-1 text-[var(--color-primary)] text-sm font-medium">
                    <span>{readMoreLabels[locale] ?? readMoreLabels.en}</span>
                    <ArrowRight size={14} className="rtl:rotate-180" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
