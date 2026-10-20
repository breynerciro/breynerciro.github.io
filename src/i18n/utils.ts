import { defaultLocale, locales, type Locale } from './locales';
import { ui, type Translations } from './ui';

/** Base path del sitio sin slash final ('' cuando no hay base). */
export const siteBase = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Quita la base del sitio de un pathname. "/breynerciro/en/x/" → "/en/x/" */
function stripSiteBase(pathname: string): string {
  if (siteBase && pathname.startsWith(siteBase)) {
    return pathname.slice(siteBase.length) || '/';
  }
  return pathname;
}

/**
 * Get locale from a URL — works outside Astro components (no Astro.currentLocale).
 * Inside components, prefer Astro.currentLocale.
 */
export function getLocaleFromUrl(url: URL): Locale {
  const segment = stripSiteBase(url.pathname).split('/')[1];
  return (locales as readonly string[]).includes(segment)
    ? (segment as Locale)
    : defaultLocale;
}

/**
 * Translation helper — returns a function that looks up keys with fallback.
 */
export function t(locale: Locale): (key: string) => string {
  const dict = (ui as Record<string, Translations>)[locale] ?? ui[defaultLocale];
  const fallback = ui[defaultLocale];

  return (key: string): string => {
    return dict[key as keyof Translations] ?? fallback[key as keyof Translations] ?? key;
  };
}

/**
 * Build a localized href respecting prefixDefaultLocale: false.
 */
export function localizedHref(locale: Locale, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  const localized = locale === defaultLocale ? p : `/${locale}${p}`;
  return `${siteBase}${localized}`;
}

/**
 * Strip site base and locale prefix from a pathname.
 * "/breynerciro/en/blog/post/" → "/blog/post/"
 * "/pt/" → "/"
 * "/" → "/"
 */
export function stripLocalePrefix(pathname: string): string {
  const segments = stripSiteBase(pathname).split('/');
  if (segments.length > 1 && (locales as readonly string[]).includes(segments[1])) {
    segments.splice(1, 1);
  }
  return segments.join('/') || '/';
}
