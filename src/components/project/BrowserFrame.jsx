/**
 * Marco de navegador para mostrar capturas de pantalla:
 * barra superior con tres puntos y URL opcional, bordes redondeados y sombra.
 * El contenido (children) ocupa el cuerpo; quien lo usa define su proporción.
 * Con `accent` el borde usa el color de acento (captura destacada).
 */
export default function BrowserFrame({ url, children, accent = false, className = '', bodyClassName = '' }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border ${accent ? 'border-accent' : 'border-line'} bg-elevated
        shadow-[0_24px_60px_-24px_rgba(0,0,0,0.65)] ${className}`}
    >
      <div className="flex items-center gap-3 px-3.5 py-2.5 border-b border-line bg-surface">
        <div className="flex items-center gap-1.5 shrink-0" aria-hidden>
          <span className="w-2.5 h-2.5 rounded-full bg-[#F87171]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]/80" />
        </div>
        {url && (
          <span className="flex-1 min-w-0 truncate text-center font-mono text-xs text-muted
            bg-base/70 rounded-md px-3 py-1 mx-auto max-w-[60%]">
            {url}
          </span>
        )}
      </div>
      <div className={`relative ${bodyClassName}`}>{children}</div>
    </div>
  );
}
