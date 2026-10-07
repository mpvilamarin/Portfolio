import fs from 'node:fs';
import path from 'node:path';

/**
 * Lee ancho y alto de una imagen de /public leyendo solo su cabecera
 * (PNG, WebP o JPEG). Devuelve null si no existe o el formato no se reconoce.
 * Se usa en el servidor para que la galería sepa la proporción real de cada
 * imagen sin esperar a que cargue en el navegador.
 */
const cache = new Map();

function readSize(buf) {
  // PNG
  if (buf.readUInt32BE(0) === 0x89504e47) {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  // WebP
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buf.toString('ascii', 12, 16);
    if (chunk === 'VP8 ') return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === 'VP8L') {
      const b = buf.readUInt32LE(21);
      return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
    }
    if (chunk === 'VP8X') return { w: buf.readUIntLE(24, 3) + 1, h: buf.readUIntLE(27, 3) + 1 };
  }
  // JPEG: busca el primer marcador SOF
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) { i += 1; continue; }
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) };
      }
      i += 2 + len;
    }
  }
  return null;
}

export function imageSize(src) {
  if (typeof src !== 'string' || !src.startsWith('/')) return null;
  if (cache.has(src)) return cache.get(src);
  let size = null;
  try {
    const file = path.join(process.cwd(), 'public', decodeURIComponent(src));
    const fd = fs.openSync(file, 'r');
    const buf = Buffer.alloc(65536);
    fs.readSync(fd, buf, 0, buf.length, 0);
    fs.closeSync(fd);
    size = readSize(buf);
  } catch {
    size = null;
  }
  cache.set(src, size);
  return size;
}

/* Convierte una imagen (string u objeto) en objeto con w/h si se pueden leer */
function withSize(item) {
  if (!item) return item;
  const obj = typeof item === 'string' ? { src: item } : item;
  const size = imageSize(obj.src);
  return size ? { ...obj, ...size } : obj;
}

const srcOf = (i) => (typeof i === 'string' ? i : i?.src);
/* Videos y rutas externas no se verifican; las imágenes de /public sí */
const exists = (i) => {
  const src = srcOf(i);
  if (!src || !src.startsWith('/') || /\.(mp4|webm|mov)$/i.test(src)) return Boolean(src);
  return Boolean(imageSize(src)) || fs.existsSync(path.join(process.cwd(), 'public', decodeURIComponent(src)));
};

/**
 * Copia del proyecto lista para renderizar:
 * - agrega ancho y alto reales a las imágenes del hero, la tarjeta y los bloques;
 * - omite las imágenes que todavía no están en /public (así un proyecto cargado antes
 *   que sus imágenes se ve solo con texto, sin imágenes rotas);
 * - omite los bloques que se quedan sin su imagen obligatoria (galería vacía, compare
 *   incompleto, image-full / band sin imagen).
 */
export function withImageSizes(project) {
  const heroOk = project.hero && exists(project.hero.image);
  const cardNeedsImage = ['screenshot', 'post', 'page'].includes(project.card?.type);
  const cardOk = project.card && (!cardNeedsImage || exists(project.card.image));
  const heroSize = heroOk ? imageSize(project.hero.image) : null;
  const cardSize = cardOk && cardNeedsImage ? imageSize(project.card.image) : null;

  const blocks = (project.blocks ?? [])
    .map((block) => {
      const out = { ...block };
      if (block.images) out.images = block.images.filter(exists).map(withSize);
      if (block.image) out.image = exists(block.image) ? withSize(block.image) : undefined;
      if (block.before) out.before = exists(block.before) ? withSize(block.before) : undefined;
      if (block.after) out.after = exists(block.after) ? withSize(block.after) : undefined;
      return out;
    })
    .filter((b) => {
      if (b.type === 'gallery') return b.images?.length > 0;
      if (b.type === 'compare') return Boolean(b.before && b.after);
      if (b.type === 'image-full' || b.type === 'band') return Boolean(b.image || b.images?.length);
      return true;
    });

  return {
    ...project,
    hero: heroOk ? { ...project.hero, ...(heroSize ?? {}) } : undefined,
    card: cardOk ? { ...project.card, ...(cardSize ?? {}) } : undefined,
    blocks,
  };
}
