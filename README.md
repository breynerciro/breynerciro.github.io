# Breyner Ciro — Portafolio Personal

> 🌐 **Visita el sitio:** **[https://breynerciro.github.io](https://breynerciro.github.io)**

Portafolio profesional de **Breyner Ciro**, Desarrollador FullStack Senior — construido con **Astro 7**, **Tailwind CSS v4** y desplegado en **GitHub Pages**.

[![Sitio en vivo](https://img.shields.io/badge/🌐_Sitio_en_vivo-breynerciro.github.io-blue?style=for-the-badge)](https://breynerciro.github.io)

---

## ✨ Características

- 🌍 **i18n en 3 idiomas** — Español (default), English, Português (con routing nativo de Astro)
- 🌓 **Modo claro/oscuro** con persistencia en `localStorage` y prevención de *flash* (FOUC)
- 📝 **Blog** con content collections (MD/MDX) y artículos localizados
- 🎨 **Design tokens** CSS-first con Tailwind v4 (`@theme`)
- 🧭 **SEO completo** — Open Graph, Twitter Cards, canonical, hreflang por idioma, sitemap
- ⚡ **100% estático** — build en `dist/`, sin JS en el runtime salvo interactividad mínima

## 🗂️ Estructura

```text
/
├── public/            # favicon, robots.txt
├── src/
│   ├── components/    # Header, Footer, secciones, tarjetas
│   ├── content/       # Collections por idioma: es/ en/ pt/
│   │   ├── blog/
│   │   ├── certifications/
│   │   ├── experience/
│   │   └── projects/
│   ├── i18n/          # locales, diccionario de UI, utils
│   ├── layouts/       # BaseLayout, BlogPost
│   ├── pages/         # /, /en/, /pt/, /blog/[...slug]/
│   ├── styles/        # global.css (Tailwind v4 + tokens)
│   └── utils/         # content, seo
├── astro.config.mjs   # i18n, sitemap, tailwind
└── package.json
```

## 🧞 Comandos

| Comando          | Acción                                             |
| :--------------- | :------------------------------------------------- |
| `npm install`    | Instala dependencias                               |
| `npm run dev`    | Servidor local en `localhost:4321`                 |
| `npm run build`  | Build de producción a `./dist/`                    |
| `npm run preview`| Previsualiza el build localmente                   |
| `npx astro check`| Verificación de tipos                              |
