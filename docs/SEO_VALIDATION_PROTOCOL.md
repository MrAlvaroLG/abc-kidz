# 🎯 PROTOCOLO DE VALIDACIÓN Y RE-INDEXACIÓN EN GOOGLE SEARCH CONSOLE

## PREREQUISITOS

Antes de validar en Google Search Console, asegúrate de que los cambios estén desplegados en producción:

```bash
# 1. Instalar dependencias (si es necesario para el script)
npm install cheerio node-fetch

# 2. Verificar en local que todo funciona
npm run dev

# 3. Ejecutar validación de enlaces internos local
node scripts/check-internal-links.js http://localhost:3000/en

# 4. Si todo está OK, desplegar a producción
git add .
git commit -m "fix(seo): Implement 301 redirects, dynamic canonicals, and optimized sitemap"
git push origin main

# 5. Esperar deploy en Vercel (2-3 minutos)
```

---

## ✅ PASO 1: VERIFICAR QUE LOS CAMBIOS SE APLICARON

### 1.1 Verificar Middleware (Redirecciones 301)

Abre estas URLs en tu navegador con **DevTools > Network** abierto:

```
❌ ANTES: https://www.abckidzpreschool.com/vpk
✅ DESPUÉS: Debe hacer 301 → https://www.abckidzpreschool.com/en/programs/vpk

❌ ANTES: https://www.abckidzpreschool.com/gallery  
✅ DESPUÉS: Debe hacer 301 → https://www.abckidzpreschool.com/en/about

❌ ANTES: https://www.abckidzpreschool.com/?ref=aftership
✅ DESPUÉS: Debe hacer 301 → https://www.abckidzpreschool.com/en (sin query params)
```

**Cómo verificar el código de estado:**
- Chrome DevTools > Network tab
- Buscar el request por la URL
- Debe mostrar: **Status Code: 301 Moved Permanently**
- Header `Location:` debe apuntar a la nueva URL

**Herramienta alternativa:**
```bash
# Usando curl en terminal
curl -I https://www.abckidzpreschool.com/vpk

# Debe mostrar:
# HTTP/2 301
# location: https://www.abckidzpreschool.com/en/programs/vpk
```

### 1.2 Verificar Canonical Tags

Abre estas páginas y busca en el **View Page Source** (`Ctrl+U` o `Cmd+U`):

```html
<!-- En https://www.abckidzpreschool.com/en/about -->
<link rel="canonical" href="https://www.abckidzpreschool.com/en/about" />

<!-- También debe tener hreflang tags -->
<link rel="alternate" hreflang="en" href="https://www.abckidzpreschool.com/en/about" />
<link rel="alternate" hreflang="es" href="https://www.abckidzpreschool.com/es/about" />
<link rel="alternate" hreflang="x-default" href="https://www.abckidzpreschool.com/en/about" />
```

**Herramienta de validación rápida:**
```bash
# Instalar extensión de Chrome: "SEO Meta in 1 Click"
# O usar este comando:
curl -s https://www.abckidzpreschool.com/en/about | grep -i canonical
```

### 1.3 Verificar Sitemap.xml

Abre: https://www.abckidzpreschool.com/sitemap.xml

**Debe contener SOLO URLs válidas:**
```xml
<url>
  <loc>https://www.abckidzpreschool.com/en</loc>
  <lastmod>2026-02-04</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1</priority>
</url>
<url>
  <loc>https://www.abckidzpreschool.com/en/about</loc>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
<!-- ... más URLs -->
```

**NO debe contener:**
- ❌ `/vpk` (antigua)
- ❌ `/gallery` (antigua)
- ❌ URLs con `?ref=aftership`
- ❌ `/studio/` (Sanity admin)

### 1.4 Ejecutar Script de Validación de Enlaces

```bash
# En producción
node scripts/check-internal-links.js https://www.abckidzpreschool.com/en

# Debe reportar:
# ✅ 0 enlaces rotos
# ✅ Todas las páginas tienen canonical
# ⚠️  Algunas redirecciones son normales (http->https, no-www->www)
```

---

## 🔴 PASO 2: FORZAR RE-INDEXACIÓN EN GOOGLE SEARCH CONSOLE

### 2.1 Enviar Sitemap Actualizado

1. Ve a: https://search.google.com/search-console
2. Selecciona tu propiedad: **abckidzpreschool.com**
3. Menú lateral > **Sitemaps**
4. Si ya hay un sitemap listado, **elimínalo primero**:
   - Click en los 3 puntitos > **"Eliminar sitemap"**
5. Añadir nuevo sitemap:
   - Campo de texto: `sitemap.xml`
   - Click **"ENVIAR"**
6. Esperar 1-2 minutos
7. Refrescar la página
8. Estado debe cambiar a: **"Operación correcta"** o **"Sin errores"**

**Análisis esperado:**
```
✅ Detectadas: 22 URLs (11 rutas × 2 idiomas)
✅ Enviadas: 22
❌ Errores: 0
```

### 2.2 Solicitar Indexación de URLs Corregidas

Para cada URL que tenía problemas, solicita indexación manual:

#### URLs con 404 (ahora redirigen 301):

1. En Search Console > **Inspección de URLs**
2. Pegar URL: `https://www.abckidzpreschool.com/contact`
3. Click **"ENTER"** o **"Inspeccionar"**
4. Esperar análisis (10-30 segundos)
5. Resultado esperado: **"URL no está en Google"** (porque era 404)
6. Click botón: **"SOLICITAR INDEXACIÓN"**
7. Esperar confirmación (puede tardar 1-2 minutos)
8. Repetir para: `/programs/toddlers`

#### URL duplicada (ahora tiene canonical):

1. Inspeccionar: `https://www.abckidzpreschool.com/en`
2. Debería mostrar ahora:
   ```
   ✅ "La URL está en Google"
   Canonical declarada por el usuario: https://www.abckidzpreschool.com/en
   Canonical seleccionada por Google: https://www.abckidzpreschool.com/en
   ```
3. Si está bien, no hacer nada
4. Si sigue mostrando problema, click **"SOLICITAR INDEXACIÓN"**

### 2.3 Validar Correcciones (Coverage Report)

1. Menú lateral > **Cobertura** o **"Indexación > Páginas"**
2. Deberías ver:
   ```
   🟢 Válidas: Aumentando (de 7 a ~20+)
   🟠 Advertencias: 0
   🔴 Errores: Disminuyendo (de 2 a 0)
   ⚪ Excluidas: 9-17 (normal, son las redirecciones)
   ```

3. Click en **"Página con redirección"** (5 URLs)
   - Verificar que son: `http://` → `https://` y redes sociales
   - Estado esperado: **"Página con redirección"** (esto es normal)
   - No hacer nada, Google entiende que son 301 permanentes

4. Click en **"Página alternativa con etiqueta canónica correcta"** (9 URLs)
   - Estas son URLs antiguas que redirigen correctamente
   - Estado esperado: **Sin cambios** (Google ya las maneja bien)
   - No hacer nada

### 2.4 Eliminar URLs 404 del Índice

Para las 2 URLs que devolvían 404 y ahora redirigen:

1. En Search Console > **Quitar contenido** o **"Eliminaciones"**
2. Click **"Nueva solicitud"**
3. Tipo: **"Eliminar temporalmente esta URL del índice"**
4. Pegar:
   ```
   https://www.abckidzpreschool.com/contact
   ```
5. Click **"NEXT"** > **"ENVIAR SOLICITUD"**
6. Repetir para: `https://www.abckidzpreschool.com/programs/toddlers`

**Nota:** Esto acelera el proceso. Las URLs se eliminarán del índice en ~1 día, y cuando Google las recrawlee, seguirán la redirección 301 automáticamente.

---

## ⏱️ PASO 3: CRONOGRAMA DE RE-INDEXACIÓN

Google no re-indexa inmediatamente. Espera estos tiempos:

| Acción | Tiempo Estimado |
|--------|----------------|
| Sitemap procesado | 1-2 horas |
| URLs nuevas descubiertas | 1-3 días |
| 404s eliminados del índice | 1-5 días |
| Canonicals reconocidos | 3-7 días |
| Redirecciones 301 consolidadas | 7-14 días |
| Índice completamente limpio | 30 días |

**Verificaciones recomendadas:**
- **Día 1:** Verificar que sitemap fue procesado
- **Día 3:** Verificar que nuevas URLs aparecen en cobertura
- **Día 7:** Verificar que 404s desaparecieron de errores
- **Día 14:** Verificar que solo quedan URLs válidas indexadas

---

## 🔍 PASO 4: MONITOREO CONTINUO

### 4.1 Configurar Alertas en Search Console

1. Menú > **Configuración** (icono de engranaje)
2. **"Notificaciones por correo electrónico"**
3. Activar:
   - ✅ Todos los problemas de indexación
   - ✅ Errores de sitemap
   - ✅ Problemas de seguridad

### 4.2 Ejecutar Script Mensualmente

Añade a tu `package.json`:

```json
{
  "scripts": {
    "seo:check": "node scripts/check-internal-links.js https://www.abckidzpreschool.com/en",
    "seo:check-local": "node scripts/check-internal-links.js http://localhost:3000/en"
  }
}
```

Ejecutar:
```bash
npm run seo:check
```

### 4.3 Checklist Mensual

```
□ Verificar Search Console > Cobertura (sin errores nuevos)
□ Ejecutar npm run seo:check (0 enlaces rotos)
□ Verificar sitemap.xml en producción
□ Verificar que Google Analytics muestra tráfico orgánico creciente
□ Buscar en Google: "site:abckidzpreschool.com" (solo URLs válidas)
```

---

## 🚨 TROUBLESHOOTING

### Problema: Sitemap devuelve 404

**Solución:**
```bash
# Verificar que el archivo existe
curl https://www.abckidzpreschool.com/sitemap.xml

# Si devuelve 404, verificar en Vercel:
# 1. Vercel Dashboard > Project > Deployments
# 2. Buscar el archivo sitemap.xml en el build
# 3. Si no está, verificar que app/sitemap.ts fue desplegado
```

### Problema: Redirecciones no funcionan

**Solución:**
```bash
# Verificar que middleware.ts fue desplegado
curl -I https://www.abckidzpreschool.com/vpk

# Si no redirige:
# 1. Verificar Vercel logs en tiempo real
# 2. Asegurar que middleware.ts está en la raíz del proyecto
# 3. Verificar que tiene export const config = { matcher: [...] }
```

### Problema: Canonical tags no aparecen

**Solución:**
```javascript
// Verificar en app/[locale]/PAGINA/page.tsx:
import { generateAlternates } from '@/lib/seo-utils';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    alternates: generateAlternates(locale, '/ruta-de-la-pagina'),
  };
}
```

---

## 📊 MÉTRICAS DE ÉXITO

Después de 30 días, deberías ver en Search Console:

```
✅ Páginas indexadas: 20-25 (de 7 anteriormente)
✅ Errores: 0 (de 2 anteriormente)
✅ Advertencias: 0
✅ Excluidas con canonical: 9 (normal)
✅ Cobertura: 100% de páginas válidas indexadas
```

---

## 🎯 PRÓXIMOS PASOS (OPCIONAL)

1. **Añadir posts de blog dinámicamente al sitemap** (ver TODO en sitemap.ts)
2. **Configurar Google Analytics 4** con seguimiento de conversiones
3. **Implementar Schema.org** adicional (FAQPage, HowTo, etc.)
4. **Optimizar Core Web Vitals** (performance)
5. **Crear contenido nuevo** para posicionar keywords importantes

---

## 📚 RECURSOS ADICIONALES

- [Google: Directrices para redirecciones 301](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- [Google: Canonical tags correctos](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Next.js: Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Vercel: Redirects y Rewrites](https://vercel.com/docs/edge-network/redirects)

---

**Autor:** Senior Technical SEO Agent  
**Fecha:** 2026-02-04  
**Versión:** 1.0
