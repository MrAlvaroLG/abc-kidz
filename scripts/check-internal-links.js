#!/usr/bin/env node

/**
 * ==========================================
 * SCRIPT DE VALIDACIÓN DE ENLACES INTERNOS
 * ==========================================
 * 
 * Este script rastrea tu sitio web para detectar:
 * 1. Enlaces internos rotos (404s)
 * 2. Enlaces sin canonical correcto
 * 3. Redirecciones innecesarias
 * 4. URLs duplicadas
 * 
 * USO:
 * ```bash
 * # En desarrollo (localhost:3000)
 * node scripts/check-internal-links.js http://localhost:3000/en
 * 
 * # En producción
 * node scripts/check-internal-links.js https://www.abckidzpreschool.com/en
 * ```
 * 
 * PREREQUISITOS:
 * npm install cheerio node-fetch
 */

import * as cheerio from 'cheerio';

// Usar import dinámico para node-fetch si es necesario
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// ==========================================
// CONFIGURACIÓN
// ==========================================

const SITE_URL = process.argv[2] || 'http://localhost:3000/en';
const MAX_PAGES = 100; // Límite de páginas a rastrear
const TIMEOUT = 10000; // Timeout de 10 segundos por petición

// Colecciones para tracking
const visitedUrls = new Set();
const urlsToVisit = [SITE_URL];
const brokenLinks = [];
const missingCanonicals = [];
const redirects = [];
const externalLinks = new Set();

// ==========================================
// UTILIDADES
// ==========================================

/**
 * Normaliza una URL para comparación
 */
function normalizeUrl(url) {
    try {
        const urlObj = new URL(url);
        // Eliminar trailing slash para consistencia
        urlObj.pathname = urlObj.pathname.replace(/\/$/, '') || '/';
        // Eliminar hash
        urlObj.hash = '';
        return urlObj.toString();
    } catch {
        return null;
    }
}

/**
 * Verifica si una URL es interna al sitio
 */
function isInternalUrl(url, baseUrl) {
    try {
        const urlObj = new URL(url, baseUrl);
        const baseObj = new URL(baseUrl);
        return urlObj.hostname === baseObj.hostname;
    } catch {
        return false;
    }
}

/**
 * Verifica el estado de una URL
 */
async function checkUrlStatus(url) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
        
        const response = await fetch(url, {
            method: 'HEAD',
            signal: controller.signal,
            redirect: 'manual', // No seguir redirecciones automáticamente
        });
        
        clearTimeout(timeoutId);
        
        return {
            status: response.status,
            ok: response.ok,
            redirected: [301, 302, 307, 308].includes(response.status),
            location: response.headers.get('location'),
        };
    } catch (error) {
        console.error(`❌ Error checking ${url}:`, error.message);
        return { status: 0, ok: false, error: error.message };
    }
}

/**
 * Extrae enlaces de una página HTML
 */
function extractLinks(html, baseUrl) {
    const $ = cheerio.load(html);
    const links = [];
    
    $('a[href]').each((i, elem) => {
        const href = $(elem).attr('href');
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
            try {
                const absoluteUrl = new URL(href, baseUrl).toString();
                links.push(absoluteUrl);
            } catch {
                // Ignorar URLs inválidas
            }
        }
    });
    
    return links;
}

/**
 * Verifica la presencia de canonical tag
 */
function checkCanonical(html, currentUrl) {
    const $ = cheerio.load(html);
    const canonical = $('link[rel="canonical"]').attr('href');
    
    if (!canonical) {
        return { found: false };
    }
    
    const canonicalNormalized = normalizeUrl(canonical);
    const currentNormalized = normalizeUrl(currentUrl);
    
    return {
        found: true,
        url: canonical,
        matchesCurrent: canonicalNormalized === currentNormalized,
    };
}

/**
 * Rastrea una página
 */
async function crawlPage(url) {
    if (visitedUrls.has(url) || visitedUrls.size >= MAX_PAGES) {
        return;
    }
    
    visitedUrls.add(url);
    console.log(`🔍 Rastreando [${visitedUrls.size}/${MAX_PAGES}]: ${url}`);
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
        
        const response = await fetch(url, {
            signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        // Verificar si hay redirección
        if (response.redirected) {
            redirects.push({
                from: url,
                to: response.url,
                status: response.status,
            });
        }
        
        // Solo procesar HTML
        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('text/html')) {
            return;
        }
        
        const html = await response.text();
        
        // Verificar canonical
        const canonicalInfo = checkCanonical(html, url);
        if (!canonicalInfo.found) {
            missingCanonicals.push({ url });
        } else if (!canonicalInfo.matchesCurrent) {
            console.log(`⚠️  Canonical diferente: ${url} -> ${canonicalInfo.url}`);
        }
        
        // Extraer y procesar enlaces
        const links = extractLinks(html, url);
        
        for (const link of links) {
            const normalized = normalizeUrl(link);
            if (!normalized) continue;
            
            if (isInternalUrl(link, SITE_URL)) {
                // Verificar estado del enlace interno
                if (!visitedUrls.has(normalized)) {
                    const status = await checkUrlStatus(normalized);
                    
                    if (!status.ok) {
                        brokenLinks.push({
                            broken: normalized,
                            foundOn: url,
                            status: status.status,
                        });
                    } else if (status.redirected) {
                        redirects.push({
                            from: normalized,
                            to: status.location,
                            foundOn: url,
                        });
                    } else {
                        urlsToVisit.push(normalized);
                    }
                }
            } else {
                externalLinks.add(normalized);
            }
        }
    } catch (error) {
        console.error(`❌ Error rastreando ${url}:`, error.message);
    }
}

/**
 * Función principal
 */
async function main() {
    console.log('==========================================');
    console.log('🔍 VALIDADOR DE ENLACES INTERNOS');
    console.log('==========================================\n');
    console.log(`Sitio base: ${SITE_URL}`);
    console.log(`Límite de páginas: ${MAX_PAGES}\n`);
    
    // Rastrar páginas
    while (urlsToVisit.length > 0 && visitedUrls.size < MAX_PAGES) {
        const url = urlsToVisit.shift();
        await crawlPage(url);
    }
    
    // ==========================================
    // REPORTE FINAL
    // ==========================================
    
    console.log('\n==========================================');
    console.log('📊 REPORTE FINAL');
    console.log('==========================================\n');
    
    console.log(`✅ Páginas rastreadas: ${visitedUrls.size}`);
    console.log(`🌍 Enlaces externos encontrados: ${externalLinks.size}`);
    
    // Enlaces rotos
    console.log(`\n🔴 ENLACES ROTOS (${brokenLinks.length}):`);
    if (brokenLinks.length === 0) {
        console.log('   ✅ No se encontraron enlaces rotos');
    } else {
        brokenLinks.forEach(link => {
            console.log(`   ❌ [${link.status}] ${link.broken}`);
            console.log(`      Encontrado en: ${link.foundOn}\n`);
        });
    }
    
    // Canonicals faltantes
    console.log(`\n⚠️  PÁGINAS SIN CANONICAL (${missingCanonicals.length}):`);
    if (missingCanonicals.length === 0) {
        console.log('   ✅ Todas las páginas tienen canonical');
    } else {
        missingCanonicals.forEach(item => {
            console.log(`   ⚠️  ${item.url}`);
        });
    }
    
    // Redirecciones
    console.log(`\n🔄 REDIRECCIONES ENCONTRADAS (${redirects.length}):`);
    if (redirects.length === 0) {
        console.log('   ✅ No hay redirecciones');
    } else {
        redirects.slice(0, 10).forEach(redir => {
            console.log(`   🔄 ${redir.from}`);
            console.log(`      -> ${redir.to}\n`);
        });
        if (redirects.length > 10) {
            console.log(`   ... y ${redirects.length - 10} más`);
        }
    }
    
    // Resumen de acciones
    console.log('\n==========================================');
    console.log('🎯 ACCIONES RECOMENDADAS');
    console.log('==========================================\n');
    
    if (brokenLinks.length > 0) {
        console.log('1. ENLACES ROTOS:');
        console.log('   - Actualiza los enlaces internos en las páginas indicadas');
        console.log('   - O añade redirecciones 301 en middleware.ts\n');
    }
    
    if (missingCanonicals.length > 0) {
        console.log('2. CANONICALS FALTANTES:');
        console.log('   - Añade generateAlternates() en generateMetadata()');
        console.log('   - Ver ejemplo en /app/[locale]/about/page.tsx\n');
    }
    
    if (redirects.length > 5) {
        console.log('3. DEMASIADAS REDIRECCIONES:');
        console.log('   - Revisa middleware.ts');
        console.log('   - Actualiza enlaces internos para apuntar directamente\n');
    }
    
    console.log('==========================================\n');
}

// Ejecutar
main().catch(console.error);
