'use client';
import { useEffect, useRef, useState } from 'react';
import { FaExpand, FaPause, FaPlay } from 'react-icons/fa';
import FadeIn from '@/components/FadeIn';
import { loc, toMedia, blockImages } from '@/components/projectsContent';
import { fontFor, readableOn } from './typography';

/* ── Utilidades ─────────────────────────────────── */

const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src);
const pad = (n) => String(n + 1).padStart(2, '0');

/** '16/9' → '16 / 9' para la propiedad CSS aspect-ratio; 'auto' o vacío → null */
const cssRatio = (ratio) => (!ratio || ratio === 'auto' ? null : String(ratio).replace('/', ' / '));

export function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-4 mb-6 lg:mb-8">
      <span className="font-mono text-xs text-muted tracking-[3px] uppercase whitespace-nowrap">
        {text}
      </span>
      <div className="flex-1 h-px bg-line" />
    </div>
  );
}

/** Etiqueta + título + texto, alineados arriba (columna de texto de los bloques divididos). */
function BlockText({ eyebrow, title, text, children }) {
  return (
    <div>
      {eyebrow && (
        <p className="font-mono text-xs text-accent tracking-[2px] uppercase mb-3">{eyebrow}</p>
      )}
      {title && (
        <h2 className="font-montserrat font-bold text-white text-2xl lg:text-3xl leading-tight mb-4">
          {title}
        </h2>
      )}
      {text && (
        <p className="font-montserrat text-[1rem]/6 lg:text-lg text-muted leading-relaxed">{text}</p>
      )}
      {children}
    </div>
  );
}

/** Imagen o video que llena su contenedor; si recibe onOpen, abre el lightbox. */
export function MediaTile({ media, onOpen, openLabel, position, natural = false, fit = 'cover' }) {
  // natural: la imagen conserva su proporción (sin recorte) y define la altura del contenedor.
  // fit 'contain': entra completa en la caja, sin recorte.
  const fill = natural
    ? 'block w-full h-auto'
    : `absolute inset-0 w-full h-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`;
  const { src, alt } = media;
  const style = !natural && position ? { objectPosition: position } : undefined;
  const content = isVideo(src) ? (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      aria-label={alt || undefined}
      style={style}
      className={`${fill} transition-transform duration-500 group-hover:scale-[1.03]`}
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width={media.w ?? undefined}
      height={media.h ?? undefined}
      style={style}
      className={`${fill} transition-transform duration-500 group-hover:scale-[1.03]`}
    />
  );

  if (!onOpen) return content;

  return (
    <button
      type="button"
      onClick={() => onOpen(src)}
      aria-label={alt ? `${openLabel}: ${alt}` : openLabel}
      className={`group overflow-hidden text-left ${natural ? 'relative block w-full' : 'absolute inset-0 w-full h-full'}`}
    >
      {content}
      <span className="absolute inset-0 bg-base/0 group-hover:bg-base/30 transition-colors duration-300" />
      <span className="absolute inset-0 flex items-center justify-center opacity-0
        group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
        <span className="flex items-center justify-center w-10 h-10 rounded-full
          border border-white/40 bg-base/70 backdrop-blur-sm text-white">
          <FaExpand size={13} />
        </span>
      </span>
    </button>
  );
}

/**
 * Tratamiento único de imagen para toda la plantilla: mismo radio, borde sutil,
 * sin marcos internos ni relleno. Ocupa todo el ancho de su columna.
 * ratio: '16/9', '1/1', … o 'auto' (proporción natural, sin recorte).
 */
function MediaBox({ media, ratio, fit = 'cover', ctx, className = '', children }) {
  // ratio 'fill': ocupa la altura de su celda (la proporción la define el contenedor)
  const fillCell = ratio === 'fill';
  const css = fillCell ? null : cssRatio(ratio);
  const position = media.position ?? (ctx.isWeb ? 'center top' : 'center');
  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg border border-line bg-surface
        ${fillCell ? 'h-full' : ''} ${className}`}
      style={css ? { aspectRatio: css } : undefined}
    >
      <MediaTile
        media={media}
        onOpen={ctx.openLightbox}
        openLabel={ctx.tx.openImage}
        position={position}
        natural={!css && !fillCell}
        fit={fit}
      />
      {children}
    </div>
  );
}

/* Todos los bloques texto + imagen usan la misma caja, para que las filas tengan el mismo alto */
const SPLIT_RATIO = '3 / 2';

/* Proporción de cada celda cuando hay 2 imágenes en la caja 3:2 (descontando el gap) */
const PAIR_CELLS = { cols: 0.73, rows: 2.9 };
/* Fracción de la imagen que queda visible al recortarla a una celda (1 = sin recorte) */
const kept = (r, cell) => Math.min(r, cell) / Math.max(r, cell);

/** Para 2 imágenes: lado a lado o apiladas, según qué disposición las recorta menos. */
function pairLayout(images) {
  const ratios = images.map((m) => (m.w && m.h ? m.w / m.h : 16 / 9));
  const score = (cell) => ratios.reduce((sum, r) => sum + kept(r, cell), 0);
  return score(PAIR_CELLS.rows) > score(PAIR_CELLS.cols) ? 'rows' : 'cols';
}

/* Imagen claramente vertical (ej. pantallas de un tótem o un celular) */
const isPortrait = (m) => Boolean(m?.w && m?.h && m.h / m.w > 1.25);

/**
 * fit del bloque: `fit` en los datos manda; aspect 'auto' → contain (sin recorte);
 * si no, 'smart': cada imagen se recorta solo si pierde poco al llenar su celda
 * (≤ 12%). Si no, se muestra completa (pantallas verticales, capturas muy apaisadas
 * como una banda o una landing, que perderían contenido).
 */
const fitOf = (block) => {
  if (block.fit) return block.fit;
  if (block.aspect === 'auto') return 'contain';
  return 'smart';
};
const SMART_KEEP = 0.88;
const resolveFit = (fit, m, cellRatio) => {
  if (fit !== 'smart') return fit;
  if (!m.w || !m.h) return 'cover';
  return kept(m.w / m.h, cellRatio) >= SMART_KEEP ? 'cover' : 'contain';
};

/**
 * Imágenes del bloque dentro de la caja común 3:2:
 * 1 → la llena · 2 → lado a lado o apiladas (la disposición que menos recorta), iguales
 * 3 → una alta a la izquierda y dos apiladas a la derecha.
 */
function SplitMedia({ images, fit, ctx, children }) {
  if (!images.length) return null;
  const box = (m, cell, extra = '') => (
    <MediaBox key={m.src} media={m} ratio="fill" fit={resolveFit(fit, m, cell)} ctx={ctx} className={extra} />
  );
  let content;
  if (images.length === 1) {
    content = (
      <MediaBox media={images[0]} ratio="fill" fit={resolveFit(fit, images[0], 1.5)} ctx={ctx}>{children}</MediaBox>
    );
  } else if (images.length === 2) {
    const stacked = pairLayout(images) === 'rows';
    const cell = stacked ? PAIR_CELLS.rows : PAIR_CELLS.cols;
    content = (
      <div className={`grid gap-3 h-full ${stacked ? 'grid-rows-2' : 'grid-cols-2'}`}>
        {images.map((m) => box(m, cell))}
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
        {box(images[0], PAIR_CELLS.cols, 'row-span-2')}
        {images.slice(1, 3).map((m) => box(m, 1.45))}
      </div>
    );
  }
  return <div className="relative w-full" style={{ aspectRatio: SPLIT_RATIO }}>{content}</div>;
}

/**
 * Bloque dividido texto + imagen. Alterna de lado según `alt` (el primero con la
 * imagen a la derecha). En móvil la imagen va siempre arriba. La columna de texto
 * es un poco más ancha para que la imagen no domine.
 */
function Split({ alt = 0, text, media }) {
  const imageLeft = alt % 2 === 1;
  if (!media) return text;
  return (
    <div className={`grid grid-cols-1 gap-8 lg:gap-14 items-start
      ${imageLeft
        ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]'
        : 'lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]'}`}>
      <div className={`order-2 ${imageLeft ? 'lg:order-2' : 'lg:order-1'}`}>{text}</div>
      <div className={`order-1 ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>{media}</div>
    </div>
  );
}

const imagesOf = (block, ctx) =>
  blockImages(block).map((i) => toMedia(i, ctx.lang, loc(block.title, ctx.lang)));

/* ── Bloques ────────────────────────────────────── */

function IntroBlock({ block, ctx }) {
  const items = [
    { label: ctx.tx.problem, text: loc(block.problem, ctx.lang) },
    { label: ctx.tx.goal,    text: loc(block.goal, ctx.lang) },
  ].filter((i) => i.text);

  return (
    <>
      <SectionLabel text={`// ${ctx.tx.overview.toLowerCase()}`} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {items.map(({ label, text }) => (
          <div key={label}>
            <h2 className="font-mono text-xs text-accent tracking-[2px] uppercase mb-3">{label}</h2>
            <p className="font-montserrat text-[1rem]/6 lg:text-lg text-primary/85 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function FeatureBlock({ block, ctx, index, alt }) {
  const images = imagesOf(block, ctx).slice(0, 3);
  // Web: "Funcionalidad 0X"; editorial / branding: "Pieza destacada". `label` lo reemplaza.
  const eyebrow = loc(block.label, ctx.lang)
    ?? (ctx.isWeb ? `${ctx.tx.feature} ${pad(index)}` : ctx.tx.featuredPiece);

  // Con `video`: una sola composición. Texto arriba y, debajo, el video y la pieza
  // en dos cuadrados iguales, cada uno con su caption.
  if (block.video) {
    const piece = images[0];
    const videoCaption = loc(block.video.caption, ctx.lang);
    const videoLabel = loc(block.video.label, ctx.lang);
    return (
      <div className="max-w-[1000px]">
        <div className="max-w-[68ch] mb-8 lg:mb-10">
          <BlockText eyebrow={eyebrow} title={loc(block.title, ctx.lang)} text={loc(block.text, ctx.lang)} />
        </div>
        <div className={`grid grid-cols-1 gap-3 ${piece ? 'sm:grid-cols-2' : ''}`}>
          <figure>
            <VideoPlayer video={block.video} ctx={ctx} />
            {(videoLabel || videoCaption) && (
              <figcaption className="mt-3 font-mono text-xs text-muted tracking-[2px] uppercase">
                {videoLabel && <span className="text-accent">{videoLabel}</span>}
                {videoLabel && videoCaption && ' · '}
                {videoCaption}
              </figcaption>
            )}
          </figure>
          {piece && (
            <figure>
              <MediaBox media={piece} ratio="1/1" ctx={ctx} />
              {piece.caption && (
                <figcaption className="mt-3 font-mono text-xs text-muted tracking-[2px] uppercase">
                  {piece.caption}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </div>
    );
  }

  return (
    <Split
      alt={alt}
      text={<BlockText eyebrow={eyebrow} title={loc(block.title, ctx.lang)} text={loc(block.text, ctx.lang)} />}
      media={images.length ? <SplitMedia images={images} fit={fitOf(block)} ctx={ctx} /> : null}
    />
  );
}

function DecisionBlock({ block, ctx, index, alt }) {
  const images = imagesOf(block, ctx);
  const eyebrow = loc(block.label, ctx.lang) ?? `${ctx.tx.decision} ${pad(index)}`;

  return (
    <Split
      alt={alt}
      text={<BlockText eyebrow={eyebrow} title={loc(block.title, ctx.lang)} text={loc(block.text, ctx.lang)} />}
      media={images.length ? <SplitMedia images={images} fit={fitOf(block)} ctx={ctx} /> : null}
    />
  );
}

function FlowBlock({ block, ctx }) {
  const images = imagesOf(block, ctx);
  // Proporción: la de los datos, o la real de las pantallas si todas coinciden, o 16:9
  const first = images[0];
  const same = first?.w && images.every((m) => m.w && Math.abs(m.w / m.h - first.w / first.h) < 0.03);
  const ratio = block.aspect ?? (same ? `${first.w}/${first.h}` : '16/9');
  const vertical = images.length > 0 && images.every(isPortrait);

  return (
    <>
      <div className="max-w-[68ch] mb-8">
        <BlockText eyebrow={loc(block.label, ctx.lang)} title={loc(block.title, ctx.lang)} text={loc(block.text, ctx.lang)} />
      </div>
      <ol className={`flex flex-col lg:flex-row gap-3 lg:gap-0 ${vertical ? 'items-center lg:items-start lg:justify-center' : ''}`}>
        {images.map((m, i) => (
          <li key={m.src} className="contents">
            {/* Pantallas verticales: ancho acotado para que no crezcan de más */}
            <div className={`min-w-0 ${vertical ? 'w-full max-w-[280px] lg:flex-1' : 'lg:flex-1'}`}>
              <MediaBox media={m} ratio={ratio} ctx={ctx} />
              <p className="mt-3 font-mono text-xs text-muted tracking-[2px] uppercase">
                <span className="text-accent">{pad(i)}</span>
                {m.caption && <> · {m.caption}</>}
              </p>
            </div>
            {i < images.length - 1 && (
              <span
                aria-hidden
                className="self-center lg:px-3 xl:px-4 lg:pb-8 text-accent text-2xl leading-none select-none"
              >
                <span className="lg:hidden">↓</span>
                <span className="hidden lg:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}

function StatBlock({ block, ctx }) {
  const items = block.items ?? [];
  return (
    <>
      <SectionLabel text={`// ${ctx.tx.highlights.toLowerCase()}`} />
      {/* Las líneas entre celdas son el fondo del contenedor asomando por el gap de 1px */}
      <dl className={`grid grid-cols-1 gap-px bg-line border border-line rounded-lg overflow-hidden
        ${items.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : items.length >= 3 ? 'sm:grid-cols-3' : items.length === 2 ? 'sm:grid-cols-2' : ''}`}>
        {items.map((item) => (
          <div key={item.value + loc(item.label, ctx.lang)} className="bg-base py-8 px-6 text-center flex flex-col-reverse">
            <dt className="font-montserrat text-[1rem]/6 text-muted mt-3">{loc(item.label, ctx.lang)}</dt>
            <dd
              className="font-montserrat font-black text-white leading-none"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function ImageFullBlock({ block, ctx }) {
  const media = toMedia(blockImages(block)[0], ctx.lang);
  if (!media) return null;
  return <MediaBox media={media} ratio={block.aspect ?? '21/9'} ctx={ctx} />;
}

/**
 * Banda: imagen a todo el ancho del viewport (rompe la columna) con el caption
 * en mono debajo. Mide dónde empieza la columna para extenderse hasta los bordes.
 */
function BandBlock({ block, ctx }) {
  const ref = useRef(null);
  const [bleed, setBleed] = useState(null);
  const media = toMedia(blockImages(block)[0], ctx.lang);
  const caption = loc(block.caption, ctx.lang);

  useEffect(() => {
    const el = ref.current;
    const column = el?.parentElement;
    if (!column) return undefined;
    const measure = () => {
      const left = column.getBoundingClientRect().left;
      setBleed({ marginLeft: -left, width: document.documentElement.clientWidth });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(column);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  if (!media) return null;
  const css = cssRatio(block.aspect ?? '21/9');

  return (
    <figure ref={ref}>
      <div
        className="relative z-20 overflow-hidden bg-surface"
        style={{ ...(bleed ?? {}), ...(css ? { aspectRatio: css } : {}) }}
      >
        <MediaTile
          media={media}
          onOpen={ctx.openLightbox}
          openLabel={ctx.tx.openImage}
          position={media.position ?? 'center'}
          natural={!css}
        />
      </div>
      {caption && (
        <figcaption className="mt-4 font-mono text-xs text-muted tracking-[2px] uppercase">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Espécimen tipográfico y muestras de color compuestos en HTML, sin imagen. */
function SpecBlock({ block, ctx }) {
  // Pesos: números (400, 700) o nombres de estilo ('Wide', 'Extended'), que se muestran
  // como etiqueta con el peso por defecto.
  const weights = block.weights?.length ? block.weights : [400];
  // Nombres de peso habituales → número; los demás ('Wide', 'Extended') quedan como etiqueta
  const NAMED = { thin: 100, extralight: 200, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 };
  const toNum = (w) => (typeof w === 'number' ? w : NAMED[String(w).toLowerCase().replace(/[\s-]/g, '')]);
  const numeric = weights.map(toNum).filter(Boolean);
  const display = numeric.length ? Math.max(...numeric) : 700;
  const colors = block.colors ?? [];
  const hasFont = Boolean(block.fontName);
  // fontSrc: archivo propio en /public (fuentes comerciales que no están en Google Fonts)
  const { family, href } = fontFor(block.fontName, numeric.length ? numeric : [400], {
    fallback: block.fontFallback, googleFont: block.googleFont && !block.fontSrc,
  });
  const faceCss = block.fontSrc
    ? `@font-face{font-family:'${block.fontName}';src:url('${block.fontSrc}');font-display:swap;}`
    : null;
  const sample = loc(block.sample, ctx.lang);
  const showSample = sample && sample !== 'Aa';

  return (
    <>
      <div className="max-w-[68ch] mb-8">
        <BlockText
          eyebrow={loc(block.label, ctx.lang) ?? ctx.tx.system}
          title={loc(block.title, ctx.lang)}
          text={loc(block.text, ctx.lang)}
        />
      </div>
      {href && <link rel="stylesheet" href={href} precedence="default" />}
      {faceCss && <style>{faceCss}</style>}
      <div className={`grid grid-cols-1 gap-3 ${hasFont && colors.length ? 'lg:grid-cols-2' : ''}`}>
        {hasFont && (
          <div className="rounded-lg border border-line bg-surface p-6 lg:p-10 flex flex-col">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-mono text-xs text-muted tracking-[2px] uppercase">{ctx.tx.typeface}</p>
              <p className="font-montserrat font-semibold text-white text-[1rem]/6">{block.fontName}</p>
            </div>
            <p
              className="text-white leading-none mt-6"
              style={{ fontFamily: family, fontSize: 'clamp(6rem, 12vw, 11rem)', fontWeight: display }}
              aria-hidden
            >
              Aa
            </p>
            {showSample && (
              <p className="text-primary/85 text-2xl lg:text-3xl leading-snug mt-6" style={{ fontFamily: family }}>
                {sample}
              </p>
            )}
            <ul className="mt-auto pt-8 flex flex-col divide-y divide-line border-t border-line">
              {weights.map((w) => (
                <li key={w} className="flex items-baseline justify-between py-2.5">
                  <span className="text-white text-xl" style={{ fontFamily: family, fontWeight: toNum(w) ?? display }}>
                    {block.fontName}
                  </span>
                  <span className="font-mono text-xs text-muted">{w}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {colors.length > 0 && (
          <ul
            className={`grid gap-3 ${colors.length > 4 || colors.length === 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2'}
              ${hasFont ? 'auto-rows-fr' : ''}`}
            aria-label={ctx.tx.palette}
          >
            {colors.map(({ name, hex }) => (
              <li
                key={hex + loc(name, ctx.lang)}
                className="flex flex-col justify-end min-h-[140px] rounded-lg border border-white/10 p-4"
                style={{ backgroundColor: hex, color: readableOn(hex) }}
              >
                <span className="font-montserrat font-semibold text-[1rem]/6">{loc(name, ctx.lang)}</span>
                <span className="font-mono text-xs uppercase mt-1 opacity-90">{hex}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

/**
 * Reproductor de video con el mismo tratamiento que las imágenes.
 * Se reproduce solo mientras está en pantalla y se pausa al salir. Con
 * prefers-reduced-motion no arranca solo: se ve el poster con un botón de play.
 * Si la persona lo pausa, no se reanuda solo al volver a verlo.
 * video: { src: { webm, mp4 }, poster, alt }
 */
function VideoPlayer({ video, ctx, className = '', style }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const src = video.src ?? {};

  useEffect(() => {
    const el = videoRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) el.play().catch(() => {});
        else if (!entry.isIntersecting) el.pause();
      },
      { threshold: 0.35 }
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      userPaused.current = false;
      el.play().catch(() => {});
    } else {
      userPaused.current = true;
      el.pause();
    }
  };

  const big = !playing && !started; // antes de la primera reproducción: botón grande sobre el poster

  return (
    <div
      ref={wrapRef}
      className={`relative w-full overflow-hidden rounded-lg border border-line bg-surface ${className}`}
      style={{ aspectRatio: cssRatio(video.ratio ?? '1/1'), ...style }}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        poster={video.poster}
        aria-label={loc(video.alt, ctx.lang)}
        onPlay={() => { setPlaying(true); setStarted(true); }}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 w-full h-full object-cover"
      >
        {src.webm && <source src={src.webm} type="video/webm" />}
        {src.mp4 && <source src={src.mp4} type="video/mp4" />}
      </video>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? ctx.tx.pauseVideo : ctx.tx.playVideo}
        className={`absolute flex items-center justify-center rounded-full text-white
          border border-white/40 bg-base/70 backdrop-blur-sm hover:bg-accent hover:border-accent
          transition-colors duration-300
          ${big ? 'inset-0 m-auto w-20 h-20' : 'right-4 bottom-4 w-11 h-11'}`}
      >
        {playing
          ? <FaPause size={big ? 22 : 13} />
          : <FaPlay size={big ? 22 : 13} className="translate-x-[1px]" />}
      </button>
    </div>
  );
}

/**
 * Video suelto, centrado, con etiqueta arriba y caption debajo.
 * ratio (por defecto '1/1'): cuadrado de hasta ~720px; vertical (ej. '9/16') con un
 * alto máximo de ~80vh.
 */
function VideoBlock({ block, ctx }) {
  const label = loc(block.label, ctx.lang);
  const caption = loc(block.caption, ctx.lang);
  const [rw, rh] = String(block.ratio ?? '1/1').split('/').map(Number);
  const vertical = rh > rw;
  // Vertical: el ancho sale del alto máximo (80vh) para no superar la pantalla
  const width = vertical ? { maxWidth: `min(720px, calc(80vh * ${rw} / ${rh}))` } : { maxWidth: '720px' };

  // src como array: varias historias en fila (de a 2 en móvil), cada una con su
  // src { webm, mp4 }, poster y alt. Cada video se reproduce/pausa por su cuenta.
  if (Array.isArray(block.src)) {
    const items = block.src;
    const cols = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' }[items.length] ?? 'lg:grid-cols-4';
    return (
      <figure>
        {label && (
          <p className="font-mono text-xs text-accent tracking-[2px] uppercase mb-4">{label}</p>
        )}
        <div className={`grid grid-cols-2 ${cols} gap-3`}>
          {items.map((item, i) => (
            <VideoPlayer
              key={item.mp4 ?? item.webm ?? i}
              video={{
                ratio: block.ratio,
                src: { webm: item.webm, mp4: item.mp4 },
                poster: item.poster,
                alt: item.alt ?? block.alt,
              }}
              ctx={ctx}
            />
          ))}
        </div>
        {caption && (
          <figcaption className="mt-4 font-mono text-xs text-muted tracking-[2px] uppercase">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="flex flex-col items-center">
      <div className="w-full flex flex-col" style={width}>
        {label && (
          <p className="font-mono text-xs text-accent tracking-[2px] uppercase mb-4">{label}</p>
        )}
        <VideoPlayer video={block} ctx={ctx} />
        {caption && (
          <figcaption className="mt-4 font-mono text-xs text-muted tracking-[2px] uppercase">
            {caption}
          </figcaption>
        )}
      </div>
    </figure>
  );
}

/**
 * Antes / después: las dos imágenes superpuestas y un deslizador (input range real,
 * accesible con teclado) que revela una u otra. { title, text, before, after, aspect? }
 */
function CompareBlock({ block, ctx }) {
  const [pos, setPos] = useState(50);
  const before = toMedia(block.before, ctx.lang, ctx.tx.before);
  const after = toMedia(block.after, ctx.lang, ctx.tx.after);
  if (!before?.src || !after?.src) return null;
  const ratio = cssRatio(block.aspect ?? (after.w && after.h ? `${after.w}/${after.h}` : '16/9'));
  const tag = 'absolute top-3 font-mono text-xs tracking-[2px] uppercase px-2.5 py-1 rounded bg-base/80 text-white pointer-events-none';

  return (
    <>
      <div className="max-w-[68ch] mb-8">
        <BlockText eyebrow={loc(block.label, ctx.lang)} title={loc(block.title, ctx.lang)} text={loc(block.text, ctx.lang)} />
      </div>
      <div
        className="relative w-full overflow-hidden rounded-lg border border-line bg-surface select-none"
        style={{ aspectRatio: ratio }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after.src} alt={after.alt} className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={before.src} alt={before.alt} className="absolute inset-0 w-full h-full object-cover object-top" />
        </div>
        <span aria-hidden className={`${tag} left-3`}>{ctx.tx.before}</span>
        <span aria-hidden className={`${tag} right-3`}>{ctx.tx.after}</span>
        <span
          aria-hidden
          className="absolute top-0 bottom-0 w-0.5 bg-accent pointer-events-none"
          style={{ left: `calc(${pos}% - 1px)` }}
        >
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full
            bg-accent text-white flex items-center justify-center text-sm shadow-lg">↔</span>
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={ctx.tx.compareSlider}
          aria-valuetext={`${pos}% ${ctx.tx.before.toLowerCase()}`}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />
      </div>
    </>
  );
}

/* Margen y medianil: número = % del ancho de la imagen; string = valor CSS tal cual */
const toCss = (v) => (typeof v === 'number' ? `${v}%` : v ?? '0');

/**
 * Imagen con la grilla dibujada encima en rojo translúcido (CSS) y un botón
 * real para mostrarla u ocultarla.
 */
function GridOverlayBlock({ block, ctx, index, alt }) {
  const [visible, setVisible] = useState(false);
  const media = toMedia(blockImages(block)[0], ctx.lang, loc(block.title, ctx.lang));
  const columns = block.columns ?? 12;
  const eyebrow = loc(block.label, ctx.lang) ?? `${ctx.tx.decision} ${pad(index)}`;
  const overlayId = `grid-overlay-${index}`;

  const toggle = (
    <button
      type="button"
      onClick={() => setVisible((v) => !v)}
      aria-pressed={visible}
      aria-controls={overlayId}
      className="mt-6 inline-flex items-center gap-2.5 font-mono text-xs tracking-[2px] uppercase
        border border-accent text-white px-5 py-3 rounded hover:bg-accent/10 transition-colors duration-300"
    >
      <span
        aria-hidden
        className={`w-2 h-2 rounded-sm border border-accent transition-colors ${visible ? 'bg-accent' : ''}`}
      />
      {visible ? ctx.tx.hideGrid : ctx.tx.showGrid}
    </button>
  );

  return (
    <Split
      alt={alt}
      text={
        <BlockText eyebrow={eyebrow} title={loc(block.title, ctx.lang)} text={loc(block.text, ctx.lang)}>
          {toggle}
        </BlockText>
      }
      media={media && (
        // Proporción natural: la grilla dibujada tiene que coincidir exactamente con la imagen
        <MediaBox media={media} ratio="auto" ctx={ctx}>
          <div
            id={overlayId}
            aria-hidden
            className={`absolute inset-0 grid pointer-events-none transition-opacity duration-300
              ${visible ? 'opacity-100' : 'opacity-0'}`}
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              columnGap: toCss(block.gutter),
              paddingLeft: toCss(block.margin),
              paddingRight: toCss(block.margin),
            }}
          >
            {Array.from({ length: columns }, (_, i) => (
              <span key={i} className="h-full bg-[rgba(244,63,94,0.18)] border-x border-[rgba(244,63,94,0.55)]" />
            ))}
          </div>
        </MediaBox>
      )}
    />
  );
}

/**
 * Galería: si todas las imágenes tienen la misma proporción, grilla pareja con esa
 * proporción; si no, se recortan a `ratio` (por defecto 1/1) con object-fit cover
 * y el object-position de cada imagen (`position`).
 */
function GalleryBlock({ block, ctx, title }) {
  const images = blockImages(block).map((i, idx) => toMedia(i, ctx.lang, `${title} — ${idx + 1}`));
  if (!images.length) return null;

  // layout: 'masonry' → columnas que conservan la proporción de cada imagen, sin recorte
  // (para mezclar posts 1:1 con historias 9:16)
  if (block.layout === 'masonry') {
    return (
      <>
        <SectionLabel text={`// ${ctx.tx.gallery.toLowerCase()}`} />
        <div className="columns-2 lg:columns-3 gap-3">
          {images.map((m) => (
            <MediaBox key={m.src} media={m} ratio="auto" ctx={ctx} className="mb-3 break-inside-avoid" />
          ))}
        </div>
      </>
    );
  }

  // layout: 'column' → una columna a ancho completo, cada imagen en su proporción, sin recorte
  if (block.layout === 'column') {
    return (
      <>
        <SectionLabel text={`// ${ctx.tx.gallery.toLowerCase()}`} />
        <div className="flex flex-col gap-3">
          {images.map((m) => <MediaBox key={m.src} media={m} ratio="auto" ctx={ctx} />)}
        </div>
      </>
    );
  }

  const ratios = images.map((m) => (m.w && m.h ? m.w / m.h : null));
  const sameRatio = ratios.every(Boolean)
    && ratios.every((r) => Math.abs(r - ratios[0]) / ratios[0] < 0.03);
  const ratio = sameRatio ? `${images[0].w}/${images[0].h}` : (block.ratio ?? '1/1');

  const n = images.length;
  const [rw, rh] = String(ratio).split('/').map(Number);
  const vertical = rh > rw;
  // Vertical (ej. 9/16): una sola fila en desktop, con scroll horizontal si no entran; de a 2 en móvil
  const cols = vertical
    ? 'grid-cols-2 lg:grid-cols-none lg:grid-flow-col lg:auto-cols-[minmax(180px,1fr)] lg:overflow-x-auto lg:pb-2'
    : n === 1 ? 'grid-cols-1' : n === 2 || n === 4 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3';

  return (
    <>
      <SectionLabel text={`// ${ctx.tx.gallery.toLowerCase()}`} />
      <div className={`grid ${cols} gap-3`}>
        {images.map((m) => <MediaBox key={m.src} media={m} ratio={ratio} ctx={ctx} />)}
      </div>
    </>
  );
}

/* ── Registro de bloques ────────────────────────── */

export const BLOCKS = {
  intro:          IntroBlock,
  feature:        FeatureBlock,
  flow:           FlowBlock,
  decision:       DecisionBlock,
  'grid-overlay': GridOverlayBlock,
  compare:        CompareBlock,
  spec:           SpecBlock,
  stat:           StatBlock,
  'image-full':   ImageFullBlock,
  band:           BandBlock,
  video:          VideoBlock,
  gallery:        GalleryBlock,
};

/** Grupo del índice lateral para cada tipo de bloque (image-full, band y video no generan entrada). */
export const BLOCK_GROUPS = {
  intro:          'overview',
  feature:        'features',
  flow:           'flow',
  decision:       'decisions',
  'grid-overlay': 'decisions',
  compare:        'compare',
  spec:           'system',
  stat:           'highlights',
  gallery:        'gallery',
};

/** Tipos que alternan la imagen de lado (texto + imagen). */
export const ALTERNATING = new Set(['decision', 'feature', 'grid-overlay']);

/** Tipos que comparten numeración (Decisión 01, 02… incluye la grilla). */
export const COUNTER_KEY = { 'grid-overlay': 'decision' };

export function ProjectBlock({ block, ctx, index, alt, title }) {
  const Component = BLOCKS[block.type];
  if (!Component) return null;
  return (
    <FadeIn>
      <Component block={block} ctx={ctx} index={index} alt={alt} title={title} />
    </FadeIn>
  );
}
