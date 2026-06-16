# Breyner Ciro — Portafolio Personal

Portafolio profesional construido con **Next.js 16**, **TypeScript** y **CSS Modules**. Desplegado en GitHub Pages como sitio estático.

🌐 **Live:** https://breynerciro.github.io

---

## 🗂 Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx        # Root layout + SEO metadata
│   ├── page.tsx          # Página principal (ensambla secciones)
│   ├── globals.css       # Design system (tokens, animaciones)
│   └── page.module.css   # Estilos del wrapper de página
├── components/
│   ├── Header/           # Hero, avatar, links de contacto
│   ├── Profile/          # Perfil profesional
│   ├── Skills/           # Grid de competencias técnicas
│   ├── Experience/       # Timeline de experiencia
│   ├── Projects/         # Tarjetas de proyectos
│   ├── Education/        # Formación y certificaciones
│   └── Footer/           # Footer con año dinámico
└── data/
    └── portfolio.ts      # ✏️ Edita aquí todo tu contenido
```

---

## 🚀 Desarrollo local

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## 📦 Deployment en GitHub Pages

### Primera vez

1. **Configura el remoto:**
   ```bash
   git remote add origin git@github.com:breynerciro/breynerciro.github.io.git
   ```

2. **Instala gh-pages (ya incluido):**
   ```bash
   npm install
   ```

3. **Despliega:**
   ```bash
   npm run deploy
   ```
   Esto hace `next build` (genera `/out`) y lo sube a la rama `gh-pages`.

4. **En GitHub → Settings → Pages:**
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` / `/ (root)`

### Deployments futuros

```bash
npm run deploy
```

---

## ✏️ Cómo actualizar el contenido

Todo el contenido está centralizado en **`src/data/portfolio.ts`**. Para actualizar:

- **Agregar un proyecto:** añade un objeto al array `projects`
- **Nueva experiencia:** añade al array `experience`
- **Nueva certificación:** añade al array `education`
- **Cambiar datos personales:** edita el objeto `personalInfo`

Después de editar, solo corre `npm run deploy`.

---

## 🛠 Stack

| Tecnología | Uso |
|---|---|
| Next.js 16 | Framework (App Router) |
| TypeScript | Tipado estático |
| CSS Modules | Estilos encapsulados por componente |
| `gh-pages` | Deploy automatizado a GitHub Pages |
