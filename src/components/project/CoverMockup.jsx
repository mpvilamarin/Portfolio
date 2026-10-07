import Image from 'next/image';
import BrowserFrame from './BrowserFrame';

/**
 * Portada con dos capturas superpuestas: la principal dentro de un BrowserFrame
 * y una secundaria más chica adelante, abajo a la derecha, con borde de acento.
 * En móvil solo se muestra la captura principal.
 *
 * @param {{src: string, alt: string}} main
 * @param {{src: string, alt: string} | null} secondary
 */
export default function CoverMockup({
  main,
  secondary = null,
  url,
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  className = '',
}) {
  if (!main?.src) return null;

  return (
    <div className={`relative ${secondary ? 'sm:pr-[8%] sm:pb-[11%]' : ''} ${className}`}>
      <BrowserFrame url={url} bodyClassName="aspect-[16/9]">
        <Image
          src={main.src}
          alt={main.alt ?? ''}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top"
        />
      </BrowserFrame>

      {secondary?.src && (
        <div
          className="hidden sm:block absolute right-0 bottom-0 w-[46%] aspect-[16/10]
            overflow-hidden rounded-lg border border-accent bg-elevated
            shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)]"
        >
          <Image
            src={secondary.src}
            alt={secondary.alt ?? ''}
            fill
            sizes="(min-width: 1024px) 25vw, 45vw"
            className="object-cover object-left-top"
          />
        </div>
      )}
    </div>
  );
}
