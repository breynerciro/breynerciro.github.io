import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/locales';

type CollectionName = 'blog' | 'projects' | 'experience' | 'certifications';

/**
 * Get content entries for a specific locale, filtered by draft status, sorted by date.
 */
export async function getLocalized<T extends CollectionName>(
  collection: T,
  locale: Locale,
): Promise<CollectionEntry<T>[]> {
  const entries = await getCollection(collection, ({ id, data }) =>
    id.startsWith(`${locale}/`) && data.draft !== true,
  );

  return entries.sort((a, b) => {
    const aDate = 'pubDate' in a.data ? a.data.pubDate.valueOf() : 0;
    const bDate = 'pubDate' in b.data ? b.data.pubDate.valueOf() : 0;
    return bDate - aDate;
  });
}

/**
 * Get a single entry by key and locale.
 */
export async function getLocalizedByKey<T extends CollectionName>(
  collection: T,
  locale: Locale,
  key: string,
): Promise<CollectionEntry<T> | undefined> {
  const entries = await getCollection(collection, ({ id, data }) =>
    id.startsWith(`${locale}/`) && data.key === key && data.draft !== true,
  );
  return entries[0];
}

/**
 * Convert collection entry ID "es/mi-post" → "mi-post" slug.
 */
export function slugFromId(id: string): string {
  return id.replace(/^[a-z]{2}\//, '');
}

/**
 * Get all entries for a given key (all locales) — useful for hreflang.
 */
export async function getAllLocalesByKey<T extends CollectionName>(
  collection: T,
  key: string,
): Promise<CollectionEntry<T>[]> {
  const entries = await getCollection(collection, ({ data }) => data.key === key);
  return entries;
}

/**
 * Format a date for display.
 */
export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(
    locale === 'pt' ? 'pt-BR' : locale === 'en' ? 'en-US' : 'es-CO',
    { year: 'numeric', month: 'long' },
  ).format(date);
}
