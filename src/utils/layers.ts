// Capas del producto que dibuja la escena 3D del inicio, de la interfaz a la nube.
// Cada proyecto, experiencia y grupo de habilidades declara qué capas toca
// (data-layers) y la escena ilumina esas capas mientras se lee.
export const LAYERS = ['ui', 'api', 'ai', 'data', 'cloud'] as const;
export type Layer = (typeof LAYERS)[number];

const TECH: Record<Layer, string[]> = {
  ui: ['Vue 3', 'Pinia', 'React', 'React Native', 'Expo', 'Expo Router', 'Tailwind CSS', 'Vite', 'Reanimated', 'Frontend'],
  api: ['Node.js', 'Express', 'FastAPI', 'Python', 'Vert.x', 'Socket.IO', 'BullMQ', 'Deno Edge Functions', 'WhatsApp Cloud API', 'JWT', 'Backend', 'API'],
  ai: ['Claude', 'Gemini', 'MCP', 'TensorFlow Lite'],
  data: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'BigQuery', 'Supabase', 'AsyncStorage'],
  cloud: ['Docker', 'Nginx', 'Cloud Run', 'Cloudflare Workers', 'Raspberry Pi', 'GitHub Actions', 'CI/CD', 'Hostinger'],
};

/** "ui api data" para una lista de tecnologías; undefined si no reconoce ninguna. */
export function layersOf(techs: string[]): string | undefined {
  const found = LAYERS.filter((l) => techs.some((t) => TECH[l].includes(t)));
  return found.length ? found.join(' ') : undefined;
}
