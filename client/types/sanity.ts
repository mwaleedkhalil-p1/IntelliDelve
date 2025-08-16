// Base Sanity types
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SanityImageWithUrl extends SanityImage {
  url?: string;
}

// Portable Text types
export interface PortableTextBlock {
  _type: 'block';
  _key: string;
  style?: string;
  listItem?: string;
  level?: number;
  children: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
}

export interface PortableTextSpan {
  _type: 'span';
  _key: string;
  text: string;
  marks?: string[];
}

export interface PortableTextMarkDef {
  _type: string;
  _key: string;
  [key: string]: any;
}

export interface PortableTextImageBlock {
  _type: 'image';
  _key: string;
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
}

export interface PortableTextCodeBlock {
  _type: 'code';
  _key: string;
  language?: string;
  code: string;
}

export type PortableTextContent = (
  | PortableTextBlock
  | PortableTextImageBlock
  | PortableTextCodeBlock
)[];

// Blog Post Interface
export interface SanityBlog extends SanityDocument {
  _type: 'blog';
  title: string;
  slug: SanitySlug;
  author: string;
  publishedAt: string;
  excerpt: string;
  featuredImage?: SanityImageWithUrl;
  content: PortableTextContent;
  category: string;
  tags: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  status: 'draft' | 'published' | 'archived';
}

// Case Study Interfaces
export interface CaseStudyMetric {
  _key: string;
  metric: string;
  label: string;
  improvement?: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  author: string;
  position: string;
  authorImage?: SanityImageWithUrl;
}

export interface SanityCaseStudy extends SanityDocument {
  _type: 'caseStudy';
  title: string;
  slug: SanitySlug;
  client: string;
  industry: string;
  location?: string;
  duration?: string;
  completedDate?: string;
  featuredImage?: SanityImageWithUrl;
  challenge: PortableTextContent;
  solution: PortableTextContent;
  implementation?: string[];
  results: CaseStudyMetric[];
  testimonial?: CaseStudyTestimonial;
  gallery?: SanityImageWithUrl[];
  tags: string[];
  publishedAt: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
}

// API Response types
export interface SanityApiResponse<T> {
  result: T;
  ms: number;
  query: string;
}

export interface SanityListResponse<T> {
  result: T[];
  ms: number;
  query: string;
}

// Query filter types
export interface BlogFilters {
  category?: string;
  tag?: string;
  status?: 'draft' | 'published' | 'archived';
  limit?: number;
  offset?: number;
  search?: string;
}

export interface CaseStudyFilters {
  industry?: string;
  tag?: string;
  status?: 'draft' | 'published' | 'archived';
  featured?: boolean;
  limit?: number;
  offset?: number;
  search?: string;
}

// Utility types for transformed data
export interface BlogListItem {
  _id: string;
  title: string;
  slug: string;
  author: string;
  publishedAt: string;
  excerpt: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  readTime?: number;
  status: string;
}

export interface CaseStudyListItem {
  _id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  featuredImage?: string;
  results: CaseStudyMetric[];
  tags: string[];
  publishedAt: string;
  featured: boolean;
  status: string;
}

// Image transformation options
export interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpg' | 'png' | 'webp' | 'auto';
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
  auto?: 'format' | 'compress';
}

// Content source type for fallback mechanism
export type ContentSource = 'sanity' | 'legacy';

export interface ContentWithSource<T> {
  data: T;
  source: ContentSource;
  isLoading: boolean;
  error: Error | null;
}