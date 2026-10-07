'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import FadeIn from '@/components/FadeIn';
import HeroDetailCard from './HeroDetailCard';
import { trackEvent } from '@/lib/analytics';

/**
 * Hero del detalle de proyecto.
 * Desktop: texto a la izquierda (~45%), la imagen en absoluto a la derecha
 * (cortada por el borde del viewport) con la tarjeta HTML flotando sobre su
 * esquina inferior izquierda, el número del proyecto en contorno, una barra
 * vertical con el sector y una franja inferior con los datos del proyecto.
 * Móvil: una columna; imagen, tarjeta y datos debajo del texto.
 */

/* "Dashboard interactivo" → primera palabra en negro, el resto en light */
function splitTitle(title) {
  const [first, ...rest] = title.split(' ');
  return [first, rest.join(' ')];
}

function Fact({ label, children }) {
  return (
    <div className="py-4 lg:py-5">
      <dt className="font-mono text-xs text-muted tracking-[2px] uppercase mb-1.5">{label}</dt>
      <dd className="font-montserrat font-semibold text-white text-[1rem]/6">{children}</dd>
    </div>
  );
}

export default function ProjectHero({
  slug,
  title,
  tagline,
  categoryLabel,
  metaLine,
  projectNum,
  sector,
  image,
  card,
  link,
  facts,
  labels,
}) {
  const [titleStrong, titleLight] = splitTitle(title);
  // Imagen vertical (ej. un tótem): se limita por alto en lugar de por ancho
  const portrait = Boolean(image && !image.fallback && image.w && image.h && image.h > image.w);
  const trackSite = () => trackEvent('project_site_click', { slug });

  return (
    <section className="relative overflow-hidden flex flex-col lg:min-h-[min(100svh,900px)] pt-24 lg:pt-28">

      {/* Número del proyecto en contorno, detrás de la imagen */}
      <span
        aria-hidden
        className="hero-number-outline hidden lg:block absolute right-[9%] top-[5%]
          font-montserrat font-black leading-none select-none pointer-events-none"
        style={{ fontSize: 'clamp(14rem, 24vw, 24rem)' }}
      >
        {projectNum}
      </span>

      {/* Barra vertical con el sector del proyecto */}
      {sector && (
        <div
          aria-hidden
          className="hidden lg:flex absolute right-8 xl:right-10 top-28 bottom-28 z-20
            flex-col items-center gap-5 pointer-events-none"
        >
          <span className="w-px flex-1 bg-line" />
          <span className="font-mono text-xs text-muted tracking-[4px] uppercase [writing-mode:vertical-rl] rotate-180
            bg-base/80 backdrop-blur-sm rounded px-1.5 py-3">
            {sector}
          </span>
          <span className="w-px flex-[2] bg-line" />
        </div>
      )}

      <div className="relative flex-1 flex flex-col px-6 sm:px-12 lg:px-20 xl:px-28">

        {/* ── Texto ── */}
        <div className="relative z-10 flex flex-col lg:w-[45%] lg:flex-1">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 self-start font-mono text-xs text-muted
              hover:text-accent transition-colors duration-300 tracking-[2px] uppercase"
          >
            <FaArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform duration-300" />
            {labels.back}
          </Link>

          <div className="flex-1 flex flex-col justify-center py-10 lg:py-12">
            <FadeIn>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[1rem]/6 text-accent tracking-[2px]">{projectNum}</span>
                <span aria-hidden className="h-px w-24 bg-accent/70" />
              </div>
              <p className="font-mono text-xs sm:text-sm text-muted tracking-[4px] uppercase mt-2">
                {categoryLabel}
              </p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1
                className="font-montserrat uppercase text-white leading-[0.95] tracking-tight mt-6 lg:mt-7
                  [overflow-wrap:anywhere] [hyphens:auto]"
                style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5.75rem)' }}
              >
                <span className="block font-black">{titleStrong}</span>
                {titleLight && <span className="block font-light">{titleLight}</span>}
              </h1>
            </FadeIn>

            {tagline && (
              <FadeIn delay={0.1}>
                <p className="font-montserrat font-light text-lg sm:text-xl lg:text-2xl text-primary/85
                  leading-snug mt-6 max-w-[30ch]">
                  {tagline}
                </p>
              </FadeIn>
            )}

            {metaLine && (
              <FadeIn delay={0.15}>
                <p className="font-mono text-xs sm:text-sm text-muted tracking-[4px] uppercase mt-6">
                  {metaLine}
                </p>
              </FadeIn>
            )}

            {link && (
              <FadeIn delay={0.2}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackSite}
                  className="group inline-flex items-center gap-3 mt-8 lg:mt-10 pb-2
                    font-mono text-sm tracking-[4px] uppercase text-white
                    border-b border-accent hover:text-accent transition-colors duration-300"
                >
                  {link.label}
                  <span aria-hidden className="text-accent text-lg leading-none
                    group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                </a>
              </FadeIn>
            )}
          </div>
        </div>

        {/* ── Imagen + tarjeta (desktop: absoluta, desbordando a la derecha) ── */}
        {image?.src && (
          <div
            className={`relative mt-4 mb-10
              lg:m-0 lg:absolute lg:top-1/2 lg:-translate-y-1/2
              ${portrait
                // Objeto vertical (tótem, celular): limitado por alto y sin desbordar
                ? 'w-[min(100%,420px)] mx-auto lg:mx-0 lg:right-[14%] lg:w-auto lg:h-[min(76vh,700px)]'
                : 'w-full lg:right-0 lg:translate-x-[8%] lg:w-[60vw] lg:max-w-[1100px]'}`}
            style={portrait ? { aspectRatio: `${image.w} / ${image.h}` } : undefined}
          >
            <div
              aria-hidden
              className="absolute -inset-[15%] pointer-events-none"
              style={{
                background: 'radial-gradient(closest-side, rgba(244,63,94,0.22), rgba(244,63,94,0.08) 55%, transparent)',
                filter: 'blur(40px)',
              }}
            />
            <FadeIn delay={0.1} direction="left">
              {image.fallback ? (
                // Portada de respaldo: recortada en 3:2 para no exceder el alto del hero
                <div className="relative aspect-[3/2] overflow-hidden rounded-xl border border-line
                  shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) min(60vw, 1100px), 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.w ?? 2400}
                  height={image.h ?? 1600}
                  priority
                  sizes={portrait ? '(min-width: 1024px) 420px, 100vw' : '(min-width: 1024px) min(60vw, 1100px), 100vw'}
                  className="relative w-full h-auto"
                />
              )}
            </FadeIn>

            {card && (
              <HeroDetailCard
                card={card}
                compact={portrait}
                className={`relative z-10 mx-auto -mt-8 lg:absolute lg:m-0 lg:left-0
                  ${portrait ? 'lg:bottom-[8%] lg:-translate-x-[62%]' : 'lg:bottom-[2%] lg:-translate-x-[12%]'}`}
              />
            )}
          </div>
        )}
      </div>

      {/* ── Datos del proyecto ── */}
      {facts.length > 0 && (
        <dl
          className="relative z-10 border-t border-line bg-base/70 backdrop-blur-sm
            px-6 sm:px-12 lg:px-20 xl:px-28 grid grid-cols-2 gap-x-6 lg:flex lg:gap-x-0
            lg:divide-x divide-line"
        >
          {facts.map(({ label, value, href }) => (
            <div key={label} className="lg:flex-1 lg:max-w-[300px] lg:px-8 lg:first:pl-0">
              <Fact label={label}>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackSite}
                    className="inline-flex items-center gap-2 hover:text-accent transition-colors break-all"
                  >
                    {value}
                    <span aria-hidden className="text-accent">↗</span>
                  </a>
                ) : value}
              </Fact>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
