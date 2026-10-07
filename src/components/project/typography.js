/**
 * Utilidades compartidas para mostrar tipografías y colores en HTML
 * (tarjeta del hero y bloque "spec").
 */

/* Fuentes que el sitio ya carga con next/font */
const SITE_FONTS = {
  montserrat:    'var(--font-montserrat)',
  'roboto mono': 'var(--font-roboto-mono)',
};

/* Fuentes que no están en Google Fonts: se usa la del sistema o la más cercana */
const SYSTEM_FONTS = {
  helvetica:         "'Helvetica Neue', Helvetica, Arial, sans-serif",
  'helvetica neue':  "'Helvetica Neue', Helvetica, Arial, sans-serif",
  'nimbus sans':     "'Nimbus Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  arial:             'Arial, Helvetica, sans-serif',
  didot:             "Didot, 'Bodoni 72', 'Bodoni Moda', serif",
};

/**
 * Devuelve la familia CSS para `fontName` y, si hace falta, la URL de Google Fonts
 * para cargarla. `fallback` es la familia genérica de respaldo (sans-serif o serif).
 * Con `googleFont: false` no se intenta cargar nada.
 */
export function fontFor(fontName, weights = [400], { fallback = 'sans-serif', googleFont = true } = {}) {
  const key = fontName?.toLowerCase().trim() ?? '';
  if (SITE_FONTS[key])   return { family: SITE_FONTS[key], href: null };
  if (SYSTEM_FONTS[key]) return { family: SYSTEM_FONTS[key], href: null };
  const family = `'${fontName}', ${fallback}`;
  if (!googleFont || !fontName) return { family, href: null };
  const name = encodeURIComponent(fontName).replace(/%20/g, '+');
  const wght = [...new Set(weights)].sort((a, b) => a - b).join(';');
  return { family, href: `https://fonts.googleapis.com/css2?family=${name}:wght@${wght}&display=swap` };
}

/** Color de texto (oscuro o claro) con mejor contraste sobre un HEX. */
export function readableOn(hex) {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const contrastWithWhite = 1.05 / (L + 0.05);
  const contrastWithDark  = (L + 0.05) / 0.0526; // #0D0709 ≈ L 0.0026
  return contrastWithWhite >= contrastWithDark ? '#FFFFFF' : '#0D0709';
}
