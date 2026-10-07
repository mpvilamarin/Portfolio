import Image from 'next/image';
import { FaRegHeart, FaRegComment, FaRegBookmark } from 'react-icons/fa';
import { fontFor, readableOn } from './typography';

/**
 * Tarjeta HTML que flota sobre la imagen del hero del detalle.
 * Muestra un detalle del proyecto según `card.type`:
 *   screenshot { label, image, alt, aspect?, position? }
 *   palette    { label, colors: [{ name, hex }] }
 *   type       { label, fontName, sample, weights: [] }
 *   post       { label, image, alt }   (4:5, marco genérico de publicación)
 *   page       { label, image, alt }   (página editorial vertical)
 * Es decorativa: no es link ni botón. La entrada es una animación CSS
 * (sin esperar a JavaScript) y se desactiva con prefers-reduced-motion.
 */

function ScreenshotCard({ card }) {
  // Pantallas verticales (ej. un tótem) se recortan a 4:5; el resto a 16:10.
  // `aspect` y `position` en los datos permiten ajustar el encuadre.
  const portrait = card.w && card.h && card.h > card.w;
  const ratio = (card.aspect ?? (portrait ? '4/5' : '16/10')).replace('/', ' / ');
  return (
    <div className="relative overflow-hidden rounded-md border border-line bg-elevated" style={{ aspectRatio: ratio }}>
      <Image
        src={card.image}
        alt={card.alt ?? ''}
        fill
        sizes="(min-width: 1024px) 360px, 90vw"
        className="object-cover"
        style={{ objectPosition: card.position ?? (portrait ? 'center 30%' : 'left top') }}
      />
    </div>
  );
}

function PaletteCard({ card }) {
  const colors = card.colors ?? [];
  return (
    <ul className={`grid gap-2 ${colors.length > 4 || colors.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
      {colors.map(({ name, hex }) => {
        const fg = readableOn(hex);
        return (
          <li
            key={hex + name}
            className="flex flex-col justify-end min-h-[76px] rounded-md p-2.5 border border-white/10"
            style={{ backgroundColor: hex, color: fg }}
          >
            <span className="font-montserrat font-semibold text-xs leading-tight">{name}</span>
            <span className="font-mono text-xs uppercase mt-0.5 opacity-90">{hex}</span>
          </li>
        );
      })}
    </ul>
  );
}

function TypeCard({ card }) {
  const weights = card.weights?.length ? card.weights : [400];
  const { family, href: fontsHref } = fontFor(card.fontName, weights, {
    fallback: card.fontFallback, googleFont: card.googleFont,
  });

  return (
    <div>
      {/* Carga la fuente solo si el sitio no la tiene ya */}
      {fontsHref && <link rel="stylesheet" href={fontsHref} precedence="default" />}
      <div className="flex items-end justify-between gap-4">
        <span className="leading-none text-white" style={{ fontFamily: family, fontSize: '4.5rem', fontWeight: Math.max(...weights) }}>
          Aa
        </span>
        <span className="font-montserrat font-semibold text-white text-[1rem]/6 text-right">{card.fontName}</span>
      </div>
      {card.sample && (
        <p className="mt-3 text-[1rem]/6 text-primary/85 leading-snug" style={{ fontFamily: family }}>
          {card.sample}
        </p>
      )}
      <ul className="flex flex-wrap gap-1.5 mt-4">
        {weights.map((w) => (
          <li
            key={w}
            className="text-xs text-primary/85 border border-line rounded px-2 py-1"
            style={{ fontFamily: family, fontWeight: w }}
          >
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PostCard({ card }) {
  return (
    <div className="rounded-lg border border-line bg-base overflow-hidden">
      {/* Cabecera genérica de publicación (sin marcas reales) */}
      <div className="flex items-center gap-2 px-3 py-2.5" aria-hidden>
        <span className="w-6 h-6 rounded-full bg-accent/60" />
        <span className="h-2 w-20 rounded-full bg-line" />
      </div>
      <div className="relative aspect-[4/5] bg-elevated">
        <Image src={card.image} alt={card.alt ?? ''} fill sizes="(min-width: 1024px) 300px, 90vw" className="object-cover" />
      </div>
      <div className="flex items-center gap-3 px-3 py-2.5 text-muted" aria-hidden>
        <FaRegHeart size={14} />
        <FaRegComment size={14} />
        <FaRegBookmark size={14} className="ml-auto" />
      </div>
    </div>
  );
}

function PageCard({ card }) {
  return (
    <div className="px-6 py-3">
      <div
        className="relative aspect-[3/4] bg-white -rotate-[1.5deg]
          shadow-[0_1px_2px_rgba(0,0,0,0.35),0_18px_40px_-12px_rgba(0,0,0,0.75)]"
      >
        <Image src={card.image} alt={card.alt ?? ''} fill sizes="(min-width: 1024px) 260px, 80vw" className="object-cover" />
      </div>
    </div>
  );
}

const VARIANTS = {
  screenshot: ScreenshotCard,
  palette:    PaletteCard,
  type:       TypeCard,
  post:       PostCard,
  page:       PageCard,
};

/* Las variantes verticales usan una tarjeta más angosta */
const WIDTHS = {
  post: 'lg:w-[300px]',
  page: 'lg:w-[300px]',
};

export default function HeroDetailCard({ card, compact = false, className = '' }) {
  const Variant = card && VARIANTS[card.type];
  if (!Variant) return null;

  return (
    <figure
      className={`animate-card-enter w-full max-w-[420px] ${compact ? 'lg:w-[300px]' : WIDTHS[card.type] ?? 'lg:w-[380px]'}
        rounded-xl border border-accent bg-surface p-4
        shadow-[0_40px_80px_-24px_rgba(0,0,0,0.9),0_12px_24px_-12px_rgba(0,0,0,0.6)] ${className}`}
    >
      {card.label && (
        <figcaption className="flex items-center gap-2 mb-3 font-mono text-xs text-muted tracking-[2px] uppercase">
          <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-accent" />
          {card.label}
        </figcaption>
      )}
      <Variant card={card} />
    </figure>
  );
}
