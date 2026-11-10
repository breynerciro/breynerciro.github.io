// Habilidades y títulos: los usan las secciones del inicio y la hoja de vida (/cv/).
import type { Locale } from '../i18n/locales';

export function skillGroups(locale: Locale) {
  const l10n = {
    es: { ai: ['Agentes con herramientas (MCP)', 'Salidas estructuradas con Zod', 'Extracción de datos de documentos'], langs: ['Español (nativo)', 'Inglés (B1)', 'Portugués (B1)'], obs: 'Observabilidad', multi: 'Arquitectura multitenant' },
    en: { ai: ['Tool-using agents (MCP)', 'Structured outputs with Zod', 'Document data extraction'], langs: ['Spanish (native)', 'English (B1)', 'Portuguese (B1)'], obs: 'Observability', multi: 'Multi-tenant architecture' },
    pt: { ai: ['Agentes com ferramentas (MCP)', 'Saídas estruturadas com Zod', 'Extração de dados de documentos'], langs: ['Espanhol (nativo)', 'Inglês (B1)', 'Português (B1)'], obs: 'Observabilidade', multi: 'Arquitetura multitenant' },
  }[locale];

  return [
    { titleKey: 'skills.frontend', layer: 'ui', skills: ['Vue 3 / Pinia', 'React / React Native', 'TypeScript', 'Tailwind CSS', 'PWA', 'Expo', 'Astro'] },
    { titleKey: 'skills.backend', layer: 'api', skills: ['Node.js / Express', 'Python (FastAPI / Django)', 'REST / Webhooks / SSE', 'Socket.IO', 'BullMQ', 'Supabase Edge Functions (Deno)'] },
    { titleKey: 'skills.ai', layer: 'ai', skills: ['Claude (API de Anthropic / Vertex AI)', 'Gemini', ...l10n.ai] },
    { titleKey: 'skills.databases', layer: 'data', skills: ['PostgreSQL (Row-Level Security)', 'Supabase', 'Firestore', 'BigQuery', 'MySQL', 'MongoDB', 'Redis'] },
    { titleKey: 'skills.devops', layer: 'cloud', skills: ['Docker / Compose', 'GCP (Cloud Run / Firebase)', 'Cloudflare Workers', 'AWS', 'GitHub Actions', 'Nginx / Caddy', `${l10n.obs} (OpenTelemetry / Prometheus / Sentry)`] },
    { titleKey: 'skills.methods', skills: ['Vitest', 'Playwright', 'Cypress', 'k6 / JMeter', l10n.multi, 'Scrum', 'GitFlow', 'Code reviews'] },
    { titleKey: 'skills.languages', skills: l10n.langs },
  ];;
}

export const degrees = {
  es: [
    ['Ingeniería de Sistemas y Computación', 'Universidad Nacional de Colombia', '2018 – 2026'],
    ['Técnico Laboral en Sistemas Informáticos', 'POLINTEC', '2016'],
  ],
  en: [
    ['B.Eng. in Systems and Computing Engineering', 'Universidad Nacional de Colombia', '2018 – 2026'],
    ['Technical Diploma in Computer Systems', 'POLINTEC', '2016'],
  ],
  pt: [
    ['Engenharia de Sistemas e Computação', 'Universidad Nacional de Colombia', '2018 – 2026'],
    ['Técnico em Sistemas de Informática', 'POLINTEC', '2016'],
  ],
} satisfies Record<Locale, string[][]>;
