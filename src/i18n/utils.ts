import { defaultLocale, locales, type Locale } from './locales';
import { ui, type Translations } from './ui';

/**
 * Get locale from a URL — works outside Astro components (no Astro.currentLocale).
 * Inside components, prefer Astro.currentLocale.
 */
export function getLocaleFromUrl(url: URL): Locale {
  const segment = url.pathname.split('/')[1];
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
  return locale === defaultLocale ? p : `/${locale}${p}`;
}

/**
 * Strip locale prefix from a pathname.
 * "/en/blog/post/" → "/blog/post/"
 * "/pt/" → "/"
 * "/" → "/"
 */
export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split('/');
  if (segments.length > 1 && (locales as readonly string[]).includes(segments[1])) {
    segments.splice(1, 1);
  }
  return segments.join('/') || '/';
}
