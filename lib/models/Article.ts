import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  slug: string;
  locale: 'ar' | 'en' | 'ru';
  excerpt: string;
  content: string;
  publishedAt: Date;
  wordCount: number;
  author: string;
  ogImage?: string;
  updatedAt: Date;
  createdAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title:       { type: String, required: true, trim: true },
    slug:        { type: String, required: true, trim: true, lowercase: true },
    locale:      { type: String, required: true, enum: ['ar', 'en', 'ru'] },
    excerpt:     { type: String, required: true, trim: true },
    content:     { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
    wordCount:   { type: Number, default: 0 },
    author:      { type: String, default: 'Dr. Saeed Al-Ziyadi' },
    ogImage:     { type: String },
  },
  { timestamps: true }
);

ArticleSchema.index({ slug: 1, locale: 1 }, { unique: true });

const Article: Model<IArticle> =
  mongoose.models.Article ?? mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
