/**
 * template.jsx se re-monta en cada navegación (a diferencia de layout.js).
 * La transición de página es una animación CSS corta: corre sin esperar a que
 * cargue JavaScript, así el contenido nunca queda oculto.
 */
export default function Template({ children }) {
  return <div className="animate-page-enter">{children}</div>;
}
