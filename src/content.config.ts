import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const locales = ['es', 'en', 'pt'] as const;

/** Shared fields for all localized collections. */
const localized = {
  locale: z.enum(locales),
  key: z.string(), // groups translations across locales
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
};

/* ── Projects ── */
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    ...localized,
    pubDate: z.coerce.date(),
    stack: z.array(z.string()).default([]),
    demoUrl: z.url().optional(),
    repoUrl: z.url().optional(),
    featured: z.boolean().default(false),
    coverImage: z.string().optional(),
  }),
});

/* ── Blog ── */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    ...localized,
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    coverImage: z.string().optional(),
    readingTime: z.number().optional(),
  }),
});

/* ── Experience ── */
const experience = defineCollection({
  loader: glob({ base: './src/content/experience', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    ...localized,
    company: z.string(),
    role: z.string(),
    location: z.string().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    current: z.boolean().default(false),
    highlights: z.array(z.string()).default([]),
  }),
});

/* ── Certifications ── */
const certifications = defineCollection({
  loader: glob({ base: './src/content/certifications', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    ...localized,
    issuer: z.string(),
    issuedDate: z.coerce.date(),
    credentialUrl: z.url().optional(),
  }),
});

export const collections = { projects, blog, experience, certifications };
