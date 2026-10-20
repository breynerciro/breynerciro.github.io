import type { Locale } from '../i18n/locales';
import { defaultLocale, locales } from '../i18n/locales';
import { getRelativeLocaleUrl } from 'astro:i18n';

interface SEOMeta {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  locale: Locale;
}

/**
 * Build SEO head tags for a page.
 */
export function buildSEO(meta: SEOMeta, site: string) {
  const { title, description, canonicalPath, ogImage, locale } = meta;
  const siteUrl = site.replace(/\/$/, '');
  const canonical = `${siteUrl}${getRelativeLocaleUrl(locale, canonicalPath, { normalizeLocale: false })}`;

  // Build hreflang alternates
  const hreflangs = locales.map((l) => ({
    locale: l,
    url: `${siteUrl}${getRelativeLocaleUrl(l, canonicalPath, { normalizeLocale: false })}`,
  }));

  // Default locale hreflang
  const xDefault = `${siteUrl}${getRelativeLocaleUrl(defaultLocale, canonicalPath, { normalizeLocale: false })}`;

  return {
    title,
    description,
    canonical,
    hreflangs,
    xDefault,
    ogImage: ogImage ?? `${siteUrl}/og-image.png`,
    ogUrl: canonical,
  };
}
