export type NewsList = News[];

export interface News {
  id: number;
  author: string;
  title: string;
  description: string;
  article: string;
  source: string;
  image: string;
  category: string;
  language: string;
  country: string;
  published_at: string;
}
