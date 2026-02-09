import type { MicroCMSListContent } from "microcms-js-sdk";

export type Work = {
  title: string;
  slug: string;
  category: string[];
  description: string;
  body?: string;
  thumbnail?: {
    url: string;
    width: number;
    height: number;
  };
  tags?: string;
  url?: string;
  featured?: boolean;
} & MicroCMSListContent;

type BlogPostBase = {
  title: string;
  slug: string;
  category: string[];
  description?: string;
  thumbnail?: {
    url: string;
    width: number;
    height: number;
  };
  tags?: string;
} & MicroCMSListContent;

type ExternalBlogPost = BlogPostBase & {
  isExternal: true;
  noteUrl: string;
  body?: undefined;
};

type InternalBlogPost = BlogPostBase & {
  isExternal: false;
  noteUrl?: undefined;
  body: string;
};

export type BlogPost = ExternalBlogPost | InternalBlogPost;
