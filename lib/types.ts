export type Media = { src: string; sourceUrl: string; alt: string };
export type Product = {
  id: string;
  slug: string;
  name: string;
  sourceUrl: string;
  categoryIds: string[];
  description: string[];
  specifications: { label: string; value: string }[];
  images: Media[];
  documents: { name: string; url: string; sourceUrl: string }[];
  condition: string;
  brand?: string;
};
export type Category = {
  description?: string[];
  id: string;
  slug: string;
  name: string;
  parentId: string | null;
  sourceUrl: string;
};
export type ContentPage = {
  slug: string;
  title: string;
  sourceUrl: string;
  paragraphs: string[];
  images?: Media[];
};
