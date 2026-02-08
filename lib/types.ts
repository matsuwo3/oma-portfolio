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

export type BlogPost = {
  title: string;
  category: string[];
  noteUrl: string;
} & MicroCMSListContent;
