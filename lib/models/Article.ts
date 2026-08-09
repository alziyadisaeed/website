import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITranslation {
  title: string;
  excerpt: string;
  content: string;
  wordCount: number;
}

export interface ICoverImage {
  url?: string;
  filename?: string;
  path?: string;
}

export interface IArticle extends Document {
  slug: string;
  translations: {
    ar: ITranslation;
    en?: ITranslation;
    ru?: ITranslation;
  };
  coverImage?: ICoverImage;
  publishedAt: Date;
  author: string;
  updatedAt: Date;
  createdAt: Date;
}

const TranslationSchema = new Schema<ITranslation>(
  {
    title:     { type: String, trim: true },
    excerpt:   { type: String, trim: true },
    content:   { type: String },
    wordCount: { type: Number, default: 0 },
  },
  { _id: false }
);

function requireTranslation(value: ITranslation) {
  return !!(value && value.title && value.excerpt && value.content);
}

const ArticleSchema = new Schema<IArticle>(
  {
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
    translations: {
      ar: { type: TranslationSchema, required: true, validate: [requireTranslation, 'Arabic translation is required'] },
      en: { type: TranslationSchema, default: undefined },
      ru: { type: TranslationSchema, default: undefined },
    },
    coverImage: {
      url:      { type: String },
      filename: { type: String },
      path:     { type: String },
    },
    publishedAt: { type: Date, default: Date.now },
    author:      { type: String, default: 'Dr. Saeed Al-Ziyadi' },
  },
  { timestamps: true }
);

const Article: Model<IArticle> =
  mongoose.models.Article ?? mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
