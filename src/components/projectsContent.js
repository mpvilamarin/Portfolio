/**
 * Proyectos del portafolio.
 *
 * Cada proyecto tiene:
 * - Datos de tarjeta: slug, category, title, tagline, description (SEO), featured (orden en el hero).
 * - cover: { main, secondary? } — capturas de portada (CoverMockup en la home).
 * - hero: { image, alt } — imagen del hero del detalle (si falta, se usa cover.main).
 * - link: { href, label } | null — si es null no se muestra el botón ni "Ver sitio".
 * - sector: texto de la barra vertical del hero (ej. Ciberseguridad).
 * - card: tarjeta HTML sobre la imagen del hero (ver HeroDetailCard): screenshot | palette | type | post | page.
 * - meta: { client, year, role, roleShort?, stack[] } — role con "+" se muestra separado por "·".
 *   roleShort: versión corta del rol para la línea bajo el título (si el rol es largo).
 *   Proyectos académicos: agregar chair (cátedra) y subject (materia); el hero muestra
 *   Cátedra / Materia / Año / Tipo en lugar de Cliente / Año / Rol.
 * - blocks: bloques del caso de estudio, renderizados en orden:
 *     intro        { problem, goal }
 *     feature      { title, text, images[], video? }   (1–3 imágenes; con video: video + pieza juntos)
 *     flow         { title, text, images[] }   (pantallas conectadas con flechas)
 *     decision     { title, text, image | images[] }
 *     grid-overlay { title, text, image, columns, margin, gutter }
 *                  (margin y gutter: número = % del ancho de la imagen, o string CSS)
 *     spec         { title, text, fontName, sample, weights[], colors: [{ name, hex }] }
 *     stat         { items: [{ value, label }] }
 *     compare      { title, text, before, after, aspect? }  (antes/después con deslizador;
 *                  se omite si falta alguna de las dos imágenes)
 *     image-full   { image, alt }
 *     band         { image, alt, caption }    (a todo el ancho del viewport)
 *     video        { label, src: { webm, mp4 }, poster, alt, caption, ratio }  ('1/1' por defecto; '9/16' vertical)
 *                  src también puede ser un array [{ webm, mp4, poster, alt }]: varios videos en fila
 *     gallery      { images[], ratio, layout } (ratio solo se usa si las proporciones no coinciden;
 *                  layout: 'column' → una columna a ancho completo, sin recorte;
 *                  layout: 'masonry' → columnas que conservan la proporción de cada imagen)
 *   Cualquier bloque acepta group para cambiar su sección en el índice (ej. un spec que es una decisión).
 *   Opcionales en feature/decision/grid-overlay/flow/band: label (reemplaza la etiqueta
 *   automática) y aspect: '16/9' | '4/3' | '1/1' | … | 'auto' (sin recorte).
 *   Cada imagen puede llevar position (object-position al recortar, ej. 'center top').
 *
 * Los textos pueden ser un string o { es, en }; se leen con loc(valor, lang).
 * Las imágenes pueden ser un string (ruta) o { src, alt, caption }.
 */

const BOT = '/projects/botanico';
const MOODLE = '/projects/moodle';
const RES = '/projects/resistance-web';
const RRSS = '/projects/resistance-rrss';
const VEN = '/projects/venecia';
const VM = '/projects/vulnmaster';
const VMW = '/projects/vulnmaster-web';
const TIPO = '/projects/tipografia';
const REV = '/projects/revista';
const TOTEM = '/projects/totem';

export const projects = [
  {
    slug: 'cursos-elearning-resistance',
    category: 'E-learning',
    title:    { es: 'Cursos e-learning', en: 'E-learning Courses' },
    tagline: {
      es: 'Cursos de ciberseguridad como aplicaciones interactivas, empaquetadas en SCORM para Moodle.',
      en: 'Cybersecurity courses built as interactive apps, packaged as SCORM for Moodle.',
    },
    description: {
      es: 'Diseño UX/UI y desarrollo de cursos de ciberseguridad para Resistance: aplicaciones en React empaquetadas como SCORM que registran el avance en Moodle.',
      en: 'UX/UI design and development of cybersecurity courses for Resistance: React apps packaged as SCORM that track progress in Moodle.',
    },
    cover: {
      main: {
        src: `${MOODLE}/curso-modulo-02.webp`,
        alt: { es: 'Curso «Ciberseguridad cotidiana» con la barra lateral de módulos', en: '"Ciberseguridad cotidiana" course with the module sidebar' },
      },
    },
    hero: {
      image: `${MOODLE}/hero-moodle_resistance.png`,
      alt: { es: 'Curso Ciberseguridad Cotidiana en un laptop', en: 'Ciberseguridad Cotidiana course on a laptop' },
    },
    link: null,
    sector: { es: 'Ciberseguridad', en: 'Cybersecurity' },
    card: {
      type: 'screenshot',
      label: { es: 'Contenido anotado', en: 'Annotated content' },
      image: `${MOODLE}/detalle-phishing-senales.webp`,
      alt: {
        es: 'Correo de phishing con sus cinco señales de alerta marcadas y explicadas',
        en: 'Phishing email with its five warning signs highlighted and explained',
      },
    },
    meta: {
      client: 'Resistance',
      year:   '2026',
      role:   { es: 'Diseño UX/UI y desarrollo frontend', en: 'UX/UI design and frontend development' },
      roleShort: { es: 'UX/UI + Frontend', en: 'UX/UI + Frontend' },
      stack:  ['React (JSX)', 'Vite', 'JavaScript', 'SCORM', 'Moodle'],
    },
    blocks: [
      {
        type: 'intro',
        problem: {
          es: 'Resistance necesitaba capacitar en ciberseguridad a personas sin conocimientos técnicos, tanto en su propia empresa como en las de sus clientes. Los cursos tradicionales de Moodle son páginas de texto o PDFs: poco atractivos y difíciles de recordar.',
          en: 'Resistance needed to train non-technical people in cybersecurity, both in its own company and at its clients. Traditional Moodle courses are text pages or PDFs: unappealing and hard to remember.',
        },
        goal: {
          es: 'Cursos que se sientan como un producto digital (navegación clara, contenido visual e interacción) y que sigan funcionando dentro de Moodle, registrando el avance de cada persona.',
          en: 'Courses that feel like a digital product (clear navigation, visual content and interaction) while still working inside Moodle and tracking each person\'s progress.',
        },
      },
      {
        type: 'stat',
        items: [
          { value: '6',    label: { es: 'cursos en uso', en: 'courses in use' } },
          { value: 'B2B',  label: { es: 'para Resistance y sus clientes corporativos', en: 'for Resistance and its corporate clients' } },
          { value: '100%', label: { es: 'diseño y desarrollo propios', en: 'designed and built by me' } },
        ],
      },
      {
        type: 'feature',
        label: { es: 'Funcionalidad 01', en: 'Feature 01' },
        title: { es: 'Siempre sabes dónde estás', en: 'You always know where you are' },
        text: {
          es: 'Una barra lateral con los módulos y sus temas, el tiempo estimado de cada uno y el progreso del curso, que también se ve arriba.',
          en: 'A sidebar with the modules and their topics, the estimated time for each one and the course progress, which is also shown at the top.',
        },
        images: [
          {
            src: `${MOODLE}/curso-modulo-02.webp`,
            alt: { es: 'Módulo 2 «¿Cómo intentan engañarme?» con la barra lateral de módulos y el progreso', en: 'Module 2 "¿Cómo intentan engañarme?" with the module sidebar and progress' },
          },
        ],
      },
      {
        type: 'decision',
        label: { es: 'Decisión 01', en: 'Decision 01' },
        title: { es: 'Mostrar el engaño, no describirlo', en: 'Show the scam, don\'t describe it' },
        text: {
          es: 'En vez de listar las señales de un correo de phishing, el curso muestra uno realista y marca cada señal sobre el texto: remitente falso, urgencia, amenaza, enlace acortado y saludo genérico. Se aprende a mirar donde hay que mirar.',
          en: 'Instead of listing the signs of a phishing email, the course shows a realistic one and marks each sign on the text: fake sender, urgency, threat, shortened link and generic greeting. You learn to look where you need to look.',
        },
        images: [
          {
            src: `${MOODLE}/detalle-phishing-senales.webp`,
            alt: { es: 'Las cinco señales de alerta del correo, numeradas y explicadas', en: 'The email\'s five warning signs, numbered and explained' },
          },
        ],
      },
      {
        type: 'decision',
        label: { es: 'Decisión 02', en: 'Decision 02' },
        title: { es: 'Información densa, en capas', en: 'Dense information, in layers' },
        text: {
          es: 'Las infografías aparecen resumidas y se expanden a pedido, o se abren en pantalla completa. El texto acompaña sin repetir lo que ya cuenta la imagen.',
          en: 'Infographics appear summarized and expand on request, or open in full screen. The text supports them without repeating what the image already says.',
        },
        images: [
          {
            src: `${MOODLE}/detalle-infografia-disparadores.webp`,
            alt: { es: 'Infografía «Los 4 disparadores psicológicos que usa la ingeniería social»', en: '"Los 4 disparadores psicológicos que usa la ingeniería social" infographic' },
          },
          {
            src: `${MOODLE}/detalle-mapa-recorrido.webp`,
            alt: { es: 'Mapa del recorrido del curso con sus cinco módulos', en: 'Course journey map with its five modules' },
          },
        ],
      },
      {
        type: 'decision',
        label: { es: 'Decisión 03', en: 'Decision 03' },
        title: { es: 'Evaluar mientras se aprende', en: 'Assessing while learning' },
        text: {
          es: 'No hay un examen al final: la evaluación es continua, con preguntas en cada módulo. El curso abre con un quiz sin calificación, con situaciones cotidianas simuladas en un celular, para que cada persona vea su punto de partida.',
          en: 'There is no final exam: assessment is continuous, with questions in every module. The course opens with an ungraded quiz with everyday situations simulated on a phone, so each person can see their starting point.',
        },
        image: {
          src: `${MOODLE}/detalle-quiz.webp`,
          alt: { es: 'Quiz diagnóstico con un mensaje simulado en un celular y cuatro opciones de respuesta', en: 'Diagnostic quiz with a message simulated on a phone and four answer options' },
        },
      },
      {
        type: 'feature',
        label: { es: 'Funcionalidad 02', en: 'Feature 02' },
        title: { es: 'Una app que Moodle entiende', en: 'An app Moodle understands' },
        text: {
          es: 'Cada curso es una aplicación en React compilada con Vite y empaquetada como SCORM. Se sube a Moodle como cualquier actividad y se comunica con la plataforma para registrar el avance, las respuestas y la finalización de cada módulo.',
          en: 'Each course is a React app built with Vite and packaged as SCORM. It is uploaded to Moodle like any activity and communicates with the platform to record progress, answers and the completion of each module.',
        },
        images: [
          {
            src: `${MOODLE}/curso-modulo-00.webp`,
            alt: { es: 'Módulo inicial «Pon a prueba tu intuición»', en: 'Opening module "Pon a prueba tu intuición"' },
          },
        ],
      },
      {
        type: 'feature',
        label: { es: 'Funcionalidad 03', en: 'Feature 03' },
        title: { es: 'Un sistema que mejora con cada curso', en: 'A system that improves with every course' },
        text: {
          es: 'Los componentes se reutilizan entre cursos, así que cada curso nuevo parte de una base probada y suma mejoras de navegación e interfaz a partir de lo aprendido en el anterior.',
          en: 'Components are reused across courses, so each new course starts from a proven base and adds navigation and interface improvements based on what was learned in the previous one.',
        },
        images: [
          {
            src: `${MOODLE}/curso-infografia-disparadores.webp`,
            alt: { es: 'Infografía dentro del curso, con los controles para expandirla o verla en pantalla completa', en: 'Infographic inside the course, with controls to expand it or view it full screen' },
          },
        ],
      },
      {
        type: 'gallery',
        images: [
          { src: `${MOODLE}/curso-phishing-anotado.webp`, alt: { es: 'Pantalla del curso con el correo de phishing anotado', en: 'Course screen with the annotated phishing email' } },
          { src: `${MOODLE}/curso-quiz.webp`,             alt: { es: 'Pantalla del curso con el quiz diagnóstico', en: 'Course screen with the diagnostic quiz' } },
        ],
      },
    ],
  },

  {
    slug: 'app-experiencia-botanico',
    category: 'University',
    title:    { es: 'Experiencia Botánico', en: 'Botanical Garden Experience' },
    tagline: {
      es: 'Una app que convierte la visita al Jardín Botánico en un recorrido guiado, en tu idioma.',
      en: 'An app that turns a visit to the Botanical Garden into a guided tour, in your language.',
    },
    description: {
      es: 'Investigación UX, diseño UI y prototipo de una app para el Jardín Botánico: recorridos guiados, identificación de plantas y un pasaporte para volver (Diseño Gráfico 3, FADU).',
      en: 'UX research, UI design and prototype of an app for the Botanical Garden: guided tours, plant identification and a passport to come back (Graphic Design 3, FADU).',
    },
    // TODO: cuando estén las fotos, usar `${BOT}/home.webp` (u otra) como portada
    cover: { main: null },
    hero: {
      image: `${BOT}/hero-app_botanico.png`,
      alt: {
        es: 'Pantallas de la app Experiencia Botánico en dos celulares',
        en: 'Experiencia Botánico app screens on two phones',
      },
    },
    link: null,
    sector: { es: 'Académico', en: 'Academic' },
    card: {
      type: 'screenshot',
      label: { es: 'Escaneo de plantas', en: 'Plant scanning' },
      image: `${BOT}/planta-identificada.webp`,
      alt: { es: 'Planta identificada con la cámara y su ficha', en: 'Plant identified with the camera and its profile' },
    },
    meta: {
      client:  { es: 'Diseño Gráfico 3 · FADU', en: 'Graphic Design 3 · FADU' },
      subject: { es: 'Diseño Gráfico 3 · FADU', en: 'Graphic Design 3 · FADU' },
      year:    '2026',
      // TODO: confirmar el rol (venía con "[?]")
      role:    {
        es: 'UX research · Diseño UI · Prototipo (equipo de 4)',
        en: 'UX research · UI design · Prototype (team of 4)',
      },
      roleShort: { es: 'UX research + UI + Prototipo', en: 'UX research + UI + Prototype' },
      stack:   [
        'Figma',
        { es: 'Investigación UX', en: 'UX research' },
        { es: 'Prototipado', en: 'Prototyping' },
      ],
    },
    blocks: [
      {
        type: 'intro',
        problem: {
          es: 'El Jardín Botánico recibe turistas, familias, vecinos y fotógrafos, pero la visita depende de carteles fijos y de lo que cada uno descubra solo. Mucha gente se va sin saber qué vio ni qué se perdió.',
          en: 'The Botanical Garden welcomes tourists, families, neighbors and photographers, but the visit depends on fixed signs and on what each person discovers alone. Many people leave without knowing what they saw or what they missed.',
        },
        goal: {
          es: 'Una app que oriente, informe en el idioma de cada visitante y dé motivos para volver.',
          en: 'An app that guides visitors, informs them in their own language and gives them reasons to come back.',
        },
      },
      {
        type: 'stat',
        items: [
          { value: '30+', label: { es: 'visitantes entrevistados', en: 'visitors interviewed' } },
          { value: '70%', label: { es: 'no sabe qué hacer ni adónde ir', en: 'don\'t know what to do or where to go' } },
          { value: '35%', label: { es: 'no habla español ni entiende los carteles', en: 'don\'t speak Spanish or understand the signs' } },
          { value: '85%', label: { es: 'no conoce las actividades del jardín', en: 'don\'t know about the garden\'s activities' } },
        ],
      },
      {
        type: 'feature',
        group: 'research',
        label: { es: 'Investigación', en: 'Research' },
        title: { es: 'Ocho formas de visitar el jardín', en: 'Eight ways to visit the garden' },
        text: {
          es: 'A partir de las entrevistas definimos proto-personas (turista, familia, vecina, fotógrafo, docente, persona mayor…) y seis dificultades: orientarse, encontrar información clara, conocer las actividades, el idioma, la falta de personalización y la falta de propuestas interactivas.',
          en: 'From the interviews we defined proto-personas (tourist, family, neighbor, photographer, teacher, older adult…) and six pain points: getting oriented, finding clear information, knowing about activities, language, lack of personalization and lack of interactive proposals.',
        },
        images: [
          { src: `${BOT}/investigacion-personas.webp`, alt: { es: 'Proto-personas y dificultades de la investigación', en: 'Research proto-personas and pain points' } },
        ],
      },
      {
        type: 'decision',
        label: { es: 'Decisión 01', en: 'Decision 01' },
        title: { es: 'El idioma, en la primera pantalla', en: 'Language on the very first screen' },
        text: {
          es: 'Como un tercio de los visitantes no habla español, el onboarding empieza eligiendo el idioma y después los intereses, para que todo el recorrido se adapte desde el inicio.',
          en: 'Since a third of visitors don\'t speak Spanish, onboarding starts by choosing the language and then interests, so the whole tour adapts from the start.',
        },
        images: [
          { src: `${BOT}/onboarding-idioma.webp`,     alt: { es: 'Onboarding: elección de idioma', en: 'Onboarding: language selection' } },
          { src: `${BOT}/onboarding-intereses.webp`,  alt: { es: 'Onboarding: elección de intereses', en: 'Onboarding: interest selection' } },
        ],
      },
      {
        type: 'decision',
        label: { es: 'Decisión 02', en: 'Decision 02' },
        title: { es: 'Un mapa que propone recorridos', en: 'A map that suggests routes' },
        text: {
          es: 'Para el 70% que no sabía adónde ir, el mapa no solo ubica: sugiere recorridos con paradas, como una playlist del jardín.',
          en: 'For the 70% who didn\'t know where to go, the map doesn\'t just locate: it suggests routes with stops, like a playlist of the garden.',
        },
        images: [
          { src: `${BOT}/mapa.webp`,               alt: { es: 'Mapa del jardín con recorridos sugeridos', en: 'Garden map with suggested routes' } },
          { src: `${BOT}/detalle-recorrido.webp`,  alt: { es: 'Detalle de un recorrido con sus paradas', en: 'Detail of a route with its stops' } },
        ],
      },
      {
        type: 'flow',
        title: { es: 'De la planta a su historia', en: 'From the plant to its story' },
        text: {
          es: 'Se apunta la cámara a una planta, la app la identifica y abre su ficha: nombre, origen y cuidados, sin depender del cartel.',
          en: 'You point the camera at a plant, the app identifies it and opens its profile: name, origin and care, without relying on the sign.',
        },
        images: [
          { src: `${BOT}/camara.webp`,               caption: { es: 'Cámara', en: 'Camera' },     alt: { es: 'Cámara apuntando a una planta', en: 'Camera pointed at a plant' } },
          { src: `${BOT}/escaneando.webp`,           caption: { es: 'Escaneo', en: 'Scanning' },  alt: { es: 'La app escaneando la planta', en: 'The app scanning the plant' } },
          { src: `${BOT}/planta-identificada.webp`,  caption: { es: 'Ficha', en: 'Profile' },     alt: { es: 'Planta identificada y su ficha', en: 'Identified plant and its profile' } },
        ],
      },
      {
        type: 'decision',
        label: { es: 'Decisión 03', en: 'Decision 03' },
        title: { es: 'Un pasaporte para volver', en: 'A passport to come back' },
        text: {
          es: 'Frente a la falta de propuestas interactivas, cada sector del jardín es un continente para completar. El pasaporte convierte la visita en un juego y da una razón para regresar.',
          en: 'To address the lack of interactive proposals, each section of the garden is a continent to complete. The passport turns the visit into a game and gives a reason to return.',
        },
        images: [
          { src: `${BOT}/pasaporte.webp`,           alt: { es: 'Pasaporte del jardín con los continentes', en: 'Garden passport with the continents' } },
          { src: `${BOT}/detalle-continente.webp`,  alt: { es: 'Detalle de un continente del pasaporte', en: 'Detail of a passport continent' } },
        ],
      },
      {
        type: 'gallery',
        ratio: '9/19.5',
        images: [
          { src: `${BOT}/home.webp`,    alt: { es: 'Pantalla de inicio', en: 'Home screen' } },
          { src: `${BOT}/agenda.webp`,  alt: { es: 'Agenda de actividades', en: 'Activities schedule' } },
          { src: `${BOT}/fichas.webp`,  alt: { es: 'Fichas de plantas', en: 'Plant profiles' } },
          { src: `${BOT}/perfil.webp`,  alt: { es: 'Perfil del visitante', en: 'Visitor profile' } },
        ],
      },
    ],
  },

  {
    slug: 'rediseno-web-resistance',
    category: 'Website Design',
    featured: 2,
    title:    { es: 'Rediseño web', en: 'Web Redesign' },
    tagline: {
      es: 'El sitio de una consultora de ciberseguridad, rediseñado para hablarle a empresas y a familias.',
      en: 'A cybersecurity consultancy website, redesigned to speak to both businesses and families.',
    },
    description: {
      es: 'Rediseño del sitio de Resistance, consultora de ciberseguridad: diseño UX/UI y desarrollo frontend en Next.js para dos públicos, empresas y familias.',
      en: 'Redesign of the Resistance website, a cybersecurity consultancy: UX/UI design and frontend development in Next.js for two audiences, businesses and families.',
    },
    cover: {
      main: {
        src: `${RES}/web-hero.webp`,
        alt: { es: 'Hero del sitio de Resistance: «Seguridad digital»', en: 'Resistance website hero: "Seguridad digital"' },
      },
    },
    hero: {
      image: `${RES}/hero-web_resistance.png`,
      alt: { es: 'Sitio de Resistance en un laptop', en: 'Resistance website on a laptop' },
    },
    link: { href: 'https://resistance.com.co', label: { es: 'Ver sitio', en: 'View site' } },
    sector: { es: 'Ciberseguridad', en: 'Cybersecurity' },
    card: {
      type: 'palette',
      label: { es: 'Identidad', en: 'Identity' },
      colors: [
        { name: { es: 'Índigo', en: 'Indigo' },     hex: '#2B2B64' },
        { name: { es: 'Lima', en: 'Lime' },         hex: '#BFED45' },
        { name: { es: 'Lavanda', en: 'Lavender' },  hex: '#F0F0F8' },
      ],
    },
    meta: {
      client: 'Resistance',
      year:   '2024',
      role:   { es: 'Diseño UX/UI y desarrollo frontend', en: 'UX/UI design and frontend development' },
      roleShort: { es: 'UX/UI + Frontend', en: 'UX/UI + Frontend' },
      stack:  ['Next.js', 'Tailwind CSS'],
    },
    blocks: [
      {
        type: 'intro',
        // TODO: sumar una frase sobre cómo era el sitio anterior (ver web.archive.org)
        problem: {
          es: 'Resistance ofrece servicios a dos públicos muy distintos, empresas y familias o colegios, y el sitio tenía que hablarle a los dos sin mezclarlos.',
          en: 'Resistance offers services to two very different audiences, businesses and families or schools, and the site had to speak to both without mixing them up.',
        },
        goal: {
          es: 'Un sitio que transmita confianza técnica, explique servicios complejos en lenguaje simple y lleve a una conversación por WhatsApp o un diagnóstico.',
          en: 'A site that conveys technical trust, explains complex services in plain language and leads to a WhatsApp conversation or an assessment.',
        },
      },
      {
        // Se muestra solo cuando exista antes-home.webp (captura del sitio anterior)
        type: 'compare',
        title: { es: 'Antes y después', en: 'Before and after' },
        before: {
          src: `${RES}/antes-home.webp`,
          alt: { es: 'Home del sitio anterior de Resistance', en: 'Home page of the previous Resistance website' },
        },
        after: {
          src: `${RES}/web-hero.webp`,
          alt: { es: 'Home del sitio rediseñado de Resistance', en: 'Home page of the redesigned Resistance website' },
        },
      },
      {
        type: 'decision',
        label: { es: 'Decisión 01', en: 'Decision 01' },
        title: { es: 'Dos públicos, un selector', en: 'Two audiences, one switch' },
        text: {
          es: 'En la home, un selector entre Empresas y Familias y colegios cambia los servicios sin salir de la página. Cada público tiene además su propia página, con su lenguaje y sus ejemplos.',
          en: 'On the home page, a switch between Businesses and Families & schools changes the services without leaving the page. Each audience also has its own page, with its own language and examples.',
        },
        images: [
          {
            src: `${RES}/web-servicios.webp`,
            alt: {
              es: 'Sección «Servicios destacados» con el selector Empresas / Familias y colegios',
              en: '"Servicios destacados" section with the Businesses / Families & schools switch',
            },
          },
          {
            src: `${RES}/web-empresas-hero.webp`,
            alt: {
              es: 'Página para empresas: «Ciberseguridad que protege tu negocio»',
              en: 'Business page: "Ciberseguridad que protege tu negocio"',
            },
          },
        ],
      },
      {
        type: 'decision',
        label: { es: 'Decisión 02', en: 'Decision 02' },
        title: { es: 'La confianza va primero', en: 'Trust comes first' },
        text: {
          es: 'Desde el hero, las cifras (50+ clientes, 9+ certificaciones, ISO 27001) responden la primera duda de quien busca seguridad. Más abajo, casos reales con nombre de cliente y los estándares que respaldan el trabajo.',
          en: 'From the hero, the figures (50+ clients, 9+ certifications, ISO 27001) answer the first question of anyone looking for security. Further down, real cases with client names and the standards behind the work.',
        },
        images: [
          {
            src: `${RES}/web-hero.webp`,
            alt: {
              es: 'Hero con las cifras 50+ clientes, 9+ certificaciones e ISO 27001',
              en: 'Hero with the figures 50+ clients, 9+ certifications and ISO 27001',
            },
          },
          {
            src: `${RES}/web-casos.webp`,
            alt: {
              es: 'Sección «La experiencia con nuestros clientes» con tres casos y el nombre de cada cliente',
              en: '"La experiencia con nuestros clientes" section with three cases and each client\'s name',
            },
          },
        ],
      },
      {
        type: 'decision',
        label: { es: 'Decisión 03', en: 'Decision 03' },
        title: { es: 'Un proceso que se entiende', en: 'A process people understand' },
        text: {
          es: 'La metodología se explica en cuatro fases numeradas (diagnóstico, estrategia, implementación y acompañamiento), para que un cliente no técnico sepa qué va a pasar después de contactar.',
          en: 'The methodology is explained in four numbered phases (assessment, strategy, implementation and support), so a non-technical client knows what will happen after getting in touch.',
        },
        image: {
          src: `${RES}/web-empresas-fases.webp`,
          alt: {
            es: 'Sección «Metodología en 4 fases» con las fases numeradas del 01 al 04',
            en: '"Metodología en 4 fases" section with phases numbered 01 to 04',
          },
        },
      },
      {
        type: 'feature',
        label: { es: 'Funcionalidad 01', en: 'Feature 01' },
        title: { es: 'Captar sin interrumpir', en: 'Capturing leads without interrupting' },
        text: {
          es: 'Un modal ofrece un análisis OSINT gratis a nuevos clientes con un solo campo, y un botón de WhatsApp acompaña toda la navegación, que es el canal que más usa el público local.',
          en: 'A modal offers new clients a free OSINT analysis with a single field, and a WhatsApp button stays with you throughout the site, since it is the channel the local audience uses most.',
        },
        images: [
          {
            src: `${RES}/web-modal-osint.webp`,
            alt: {
              es: 'Modal «Descubre qué expone tu empresa» con un campo de correo y el botón «Solicitar análisis»',
              en: '"Descubre qué expone tu empresa" modal with an email field and a "Solicitar análisis" button',
            },
          },
        ],
      },
      {
        type: 'feature',
        label: { es: 'Funcionalidad 02', en: 'Feature 02' },
        // BORRADOR: revisar el texto y sumar capturas del modo oscuro y del blog
        title: { es: 'Modo oscuro y blog', en: 'Dark mode and blog' },
        text: {
          es: 'Un botón en la barra de navegación cambia todo el sitio a modo oscuro, para leer cómodo en cualquier momento. El blog suma contenido propio sobre ciberseguridad y le da al sitio una razón para volver.',
          en: 'A button in the navigation bar switches the whole site to dark mode, for comfortable reading at any time. The blog adds original cybersecurity content and gives people a reason to come back.',
        },
      },
      {
        type: 'gallery',
        images: [
          { src: `${RES}/web-metodologia.webp`, alt: { es: 'Sección «Metodología innovadora»', en: '"Metodología innovadora" section' } },
          { src: `${RES}/web-valores.webp`,     alt: { es: 'Sección «Nuestros valores»', en: '"Nuestros valores" section' } },
          { src: `${RES}/web-beneficios.webp`,  alt: { es: 'Sección «Beneficios de trabajar con nosotros»', en: '"Beneficios de trabajar con nosotros" section' } },
          { src: `${RES}/web-cierre.webp`,      alt: { es: 'Sección «Estándares y certificaciones»', en: '"Estándares y certificaciones" section' } },
        ],
      },
    ],
  },

  {
    slug: 'contenido-redes-resistance',
    category: 'Social Media',
    title:    { es: 'Contenido RRSS', en: 'Social Media Content' },
    tagline: {
      es: 'De publicaciones sueltas a un sistema visual para las redes de una consultora de ciberseguridad.',
      en: 'From scattered posts to a visual system for a cybersecurity consultancy\'s social media.',
    },
    description: {
      es: 'Sistema visual y contenido para las redes de Resistance, consultora de ciberseguridad: posts, carruseles e historias animadas.',
      en: 'Visual system and content for the social media of Resistance, a cybersecurity consultancy: posts, carousels and animated stories.',
    },
    cover: {
      main: {
        src: `${RRSS}/post-ethical-hacking.webp`,
        alt: { es: 'Post «Ethical Hacking, el escudo de tu empresa»', en: '"Ethical Hacking, el escudo de tu empresa" post' },
      },
    },
    hero: {
      image: `${RRSS}/hero-rrss_resistance.png`,
      alt: {
        es: 'Carrusel sobre seguridad en apps e historia de Ethical Hacking de Resistance',
        en: 'Resistance carousel on app security and Ethical Hacking story',
      },
    },
    link: {
      href: 'https://www.instagram.com/resistancetips/',
      label: { es: 'Ver en Instagram', en: 'View on Instagram' },
    },
    sector: { es: 'Ciberseguridad', en: 'Cybersecurity' },
    card: {
      type: 'palette',
      label: { es: 'Sistema', en: 'System' },
      colors: [
        { name: { es: 'Azul noche', en: 'Night blue' }, hex: '#1E2542' },
        { name: { es: 'Magenta', en: 'Magenta' },       hex: '#E83FA8' },
        { name: { es: 'Lima', en: 'Lime' },             hex: '#CFF462' },
      ],
    },
    meta: {
      client: 'Resistance',
      year:   '2025',
      role:   { es: 'Diseño de contenido para redes', en: 'Social media content design' },
      // TODO: confirmar herramientas (venía "[?] Canva / Photoshop / Illustrator")
      stack:  ['Photoshop', 'Illustrator', 'After Effects'],
    },
    blocks: [
      {
        type: 'intro',
        problem: {
          es: 'El perfil acumulaba años de publicaciones sin línea visual: portadas de reels, memes, fechas especiales y estilos distintos en cada post. No se reconocía como una marca ni se leía como una fuente confiable.',
          en: 'The profile had years of posts with no visual line: reel covers, memes, special dates and a different style in every post. It wasn\'t recognizable as a brand or read as a reliable source.',
        },
        goal: {
          es: 'Un sistema reconocible a primera vista, que explique ciberseguridad en lenguaje simple y lleve a los servicios de Resistance.',
          en: 'A system recognizable at first sight that explains cybersecurity in plain language and leads to Resistance\'s services.',
        },
      },
      {
        type: 'compare',
        title: { es: 'El perfil, antes y después', en: 'The profile, before and after' },
        before: {
          src: `${RRSS}/grilla-antes.webp`,
          alt: { es: 'Grilla del perfil antes: publicaciones con estilos distintos', en: 'Profile grid before: posts in different styles' },
        },
        after: {
          src: `${RRSS}/grilla-despues.webp`,
          alt: { es: 'Grilla del perfil después: posts con el sistema azul, magenta y lima', en: 'Profile grid after: posts using the blue, magenta and lime system' },
        },
      },
      {
        type: 'decision',
        label: { es: 'Decisión 01', en: 'Decision 01' },
        title: { es: 'Tres colores y un recurso fijo', en: 'Three colors and one fixed device' },
        text: {
          es: 'Fondo azul noche, fotos en duotono magenta y lima para lo que hay que leer sí o sí. Con tan pocos recursos, cualquier post se reconoce como de Resistance aunque cambie el tema.',
          en: 'Night blue background, magenta duotone photos and lime for what must be read. With so few resources, any post is recognizable as Resistance\'s even when the topic changes.',
        },
        images: [
          {
            src: `${RRSS}/post-reflexion-ia.webp`,
            alt: { es: 'Post «Domingo de reflexión: ¿usas IA en el trabajo?»', en: '"Domingo de reflexión: ¿usas IA en el trabajo?" post' },
          },
          {
            src: `${RRSS}/post-26-millones.webp`,
            alt: { es: 'Post «26 millones de ataques cibernéticos en Colombia»', en: '"26 millones de ataques cibernéticos en Colombia" post' },
          },
        ],
      },
      {
        type: 'decision',
        label: { es: 'Decisión 02', en: 'Decision 02' },
        title: { es: 'Formatos que se repiten', en: 'Repeating formats' },
        text: {
          es: 'Cada tipo de contenido tiene su estructura: el tip en carrusel (problema y después un consejo por slide), la noticia con la fuente siempre citada y el "Domingo de reflexión" con una pregunta y un dato. La audiencia aprende a leerlos.',
          en: 'Each type of content has its structure: the tip as a carousel (problem, then one tip per slide), the news item with its source always cited, and "Domingo de reflexión" with a question and a fact. The audience learns to read them.',
        },
        images: [
          { src: `${RRSS}/apps-01-portada.webp`,    alt: { es: 'Portada del carrusel «¿Son seguras tus apps?»', en: '"¿Son seguras tus apps?" carousel cover' } },
          { src: `${RRSS}/apps-02-permisos.webp`,   alt: { es: 'Slide «Revisa los permisos que solicitan»', en: '"Revisa los permisos que solicitan" slide' } },
          { src: `${RRSS}/apps-04-desinstala.webp`, alt: { es: 'Slide «Desinstala las apps que no uses»', en: '"Desinstala las apps que no uses" slide' } },
        ],
      },
      {
        type: 'flow',
        title: { es: 'Un carrusel que cuenta una noticia', en: 'A carousel that tells a news story' },
        text: {
          es: 'Portada con el titular, desarrollo con la fuente y cierre con la conclusión. El lima marca el texto y las flechas invitan a seguir deslizando.',
          en: 'A cover with the headline, a body with the source and a closing with the takeaway. Lime highlights the text and the arrows invite you to keep swiping.',
        },
        images: [
          {
            src: `${RRSS}/banca-01-importante.webp`,
            caption: { es: 'Titular', en: 'Headline' },
            alt: { es: 'Portada: «Ciberamenazas en el sector bancario colombiano aumentan un 35%»', en: 'Cover: "Ciberamenazas en el sector bancario colombiano aumentan un 35%"' },
          },
          {
            src: `${RRSS}/banca-02-cisco-splunk.webp`,
            caption: { es: 'Desarrollo', en: 'Body' },
            alt: { es: 'Slide con el desarrollo de la noticia y la fuente', en: 'Slide with the news body and its source' },
          },
          {
            src: `${RRSS}/banca-03-cierre.webp`,
            caption: { es: 'Cierre', en: 'Closing' },
            alt: { es: 'Slide de cierre con la conclusión', en: 'Closing slide with the takeaway' },
          },
        ],
      },
      {
        type: 'video',
        label: { es: 'Historias animadas', en: 'Animated stories' },
        ratio: '9/16',
        src: [
          {
            webm: `${RRSS}/historia-evita-riesgos.webm`,
            mp4: `${RRSS}/historia-evita-riesgos.mp4`,
            poster: `${RRSS}/historia-evita-riesgos-poster.webp`,
            alt: { es: 'Historia animada «¡Evita riesgos en tu empresa!»', en: 'Animated story "¡Evita riesgos en tu empresa!"' },
          },
          {
            webm: `${RRSS}/historia-analisis-gap.webm`,
            mp4: `${RRSS}/historia-analisis-gap.mp4`,
            poster: `${RRSS}/historia-analisis-gap-poster.webp`,
            alt: { es: 'Historia animada sobre el servicio de Análisis GAP', en: 'Animated story about the GAP Analysis service' },
          },
          {
            webm: `${RRSS}/historia-empresa-protegida.webm`,
            mp4: `${RRSS}/historia-empresa-protegida.mp4`,
            poster: `${RRSS}/historia-empresa-protegida-poster.webp`,
            alt: { es: 'Historia animada «¿Tu empresa está protegida?»', en: 'Animated story "¿Tu empresa está protegida?"' },
          },
          {
            webm: `${RRSS}/historia-perdidas.webm`,
            mp4: `${RRSS}/historia-perdidas.mp4`,
            poster: `${RRSS}/historia-perdidas-poster.webp`,
            alt: { es: 'Historia animada sobre las pérdidas por ataques cibernéticos', en: 'Animated story about losses from cyberattacks' },
          },
        ],
        caption: { es: 'Historias de 5 segundos para presentar servicios', en: '5-second stories to introduce services' },
      },
      {
        type: 'gallery',
        layout: 'masonry', // mezcla posts 1:1 e historias 9:16: cada una en su proporción
        images: [
          { src: `${RRSS}/post-ethical-hacking.webp`,         alt: { es: 'Post «Ethical Hacking, el escudo de tu empresa»', en: '"Ethical Hacking, el escudo de tu empresa" post' } },
          { src: `${RRSS}/banca-03-cierre.webp`,              alt: { es: 'Slide de cierre del carrusel sobre el sector bancario', en: 'Closing slide of the banking sector carousel' } },
          { src: `${RRSS}/apps-03-versiones.webp`,            alt: { es: 'Slide «Mantén las versiones actualizadas»', en: '"Mantén las versiones actualizadas" slide' } },
          { src: `${RRSS}/historia-ethical-hacking.webp`,     alt: { es: 'Historia «Ethical Hacking, tu mejor defensa»', en: '"Ethical Hacking, tu mejor defensa" story' } },
          { src: `${RRSS}/historia-evaluacion-riesgos.webp`,  alt: { es: 'Historia «Protege tu empresa con una evaluación de riesgos»', en: '"Protege tu empresa con una evaluación de riesgos" story' } },
          { src: `${RRSS}/post-reflexion-ia.webp`,            alt: { es: 'Post «¿Usas IA en el trabajo?»', en: '"¿Usas IA en el trabajo?" post' } },
        ],
      },
    ],
  },

  {
    slug: 'branding-pequena-venecia',
    category: 'Branding',
    title:    { es: 'Identidad visual', en: 'Visual Identity' },
    tagline: {
      es: 'Una marca desde cero para un bodegón de productos venezolanos en Buenos Aires.',
      en: 'A brand from scratch for a Venezuelan food store in Buenos Aires.',
    },
    description: {
      es: 'Identidad visual, manual de marca y piezas gráficas para el Bodegón La Pequeña Venecia, un comercio de productos venezolanos en Buenos Aires.',
      en: 'Visual identity, brand guidelines and graphic pieces for Bodegón La Pequeña Venecia, a Venezuelan food store in Buenos Aires.',
    },
    cover: {
      main: {
        src: `${VEN}/logo-sobre-patron-rojo.webp`,
        alt: { es: 'Logo de La Pequeña Venecia sobre el patrón rojo', en: 'La Pequeña Venecia logo over the red pattern' },
      },
    },
    hero: {
      image: `${VEN}/hero-branding_venecia.png`,
      alt: {
        es: 'Volante, invitación, imán y post de La Pequeña Venecia',
        en: 'Flyer, invitation, magnet and post for La Pequeña Venecia',
      },
    },
    link: null,
    sector: { es: 'Gastronomía', en: 'Food & retail' },
    card: {
      type: 'palette',
      label: { es: 'Paleta', en: 'Palette' },
      colors: [
        { name: { es: 'Rojo', en: 'Red' },        hex: '#F23853' },
        { name: { es: 'Amarillo', en: 'Yellow' }, hex: '#F9D50F' },
        { name: { es: 'Azul', en: 'Blue' },       hex: '#0081C5' },
        { name: { es: 'Crema', en: 'Cream' },     hex: '#F9F4E0' },
      ],
    },
    meta: {
      client: 'Bodegón La Pequeña Venecia',
      year:   '2023',
      role:   {
        es: 'Identidad visual · Manual de marca · Piezas gráficas',
        en: 'Visual identity · Brand guidelines · Graphic pieces',
      },
      roleShort: { es: 'Identidad + Manual + Piezas', en: 'Identity + Guidelines + Pieces' },
      stack:  ['Illustrator', 'Photoshop'],
    },
    blocks: [
      {
        type: 'intro',
        problem: {
          es: 'Un bodegón de comida congelada y productos venezolanos abría en Buenos Aires sin nombre visual: no había logo, colores ni forma de comunicar.',
          en: 'A store selling frozen food and Venezuelan products was opening in Buenos Aires with no visual identity: no logo, no colors and no way to communicate.',
        },
        goal: {
          es: 'Crear una marca que se sienta venezolana y cercana para la comunidad, pero clara para cualquier cliente, y dejar un sistema que el negocio pueda usar solo.',
          en: 'Create a brand that feels Venezuelan and close to the community, yet clear to any customer, and leave a system the business can use on its own.',
        },
      },
      {
        type: 'decision',
        label: { es: 'Decisión 01', en: 'Decision 01' },
        title: { es: 'Un sello que habla de comunidad', en: 'A seal that speaks of community' },
        text: {
          es: 'El isotipo une las iniciales LPV dentro de un círculo, que representa comunidad y unión. El trazo artesanal y los colores cálidos le dan un tono amigable, más de barrio que de cadena.',
          en: 'The symbol joins the initials LPV inside a circle that stands for community and togetherness. The handmade stroke and warm colors give it a friendly, neighborhood tone rather than a chain-store one.',
        },
        images: [
          { src: `${VEN}/isotipo.webp`,   alt: { es: 'Isotipo con las iniciales LPV dentro de un círculo', en: 'Symbol with the initials LPV inside a circle' } },
          { src: `${VEN}/logotipo.webp`,  alt: { es: 'Logotipo de La Pequeña Venecia', en: 'La Pequeña Venecia logotype' } },
        ],
      },
      {
        type: 'spec',
        group: 'decisions',
        label: { es: 'Decisión 02', en: 'Decision 02' },
        title: { es: 'Colores de bandera, tono juvenil', en: 'Flag colors, a youthful tone' },
        text: {
          es: 'La paleta parte de los colores de Venezuela, ajustados para que se vean vibrantes y no institucionales. Atma, redondeada y con carácter, para los títulos; Lato para leer con comodidad. El tono acompaña: "Pa\' que no te compliques".',
          en: 'The palette starts from Venezuela\'s colors, adjusted to look vibrant rather than institutional. Atma, rounded and full of character, for headings; Lato for comfortable reading. The tone follows suit: "Pa\' que no te compliques".',
        },
        fontName: 'Atma',
        sample: 'Aa',
        weights: ['Medium', 'Bold'],
        colors: [
          { name: { es: 'Rojo', en: 'Red' },         hex: '#F23853' },
          { name: { es: 'Amarillo', en: 'Yellow' },  hex: '#F9D50F' },
          { name: { es: 'Azul', en: 'Blue' },        hex: '#0081C5' },
          { name: { es: 'Naranja', en: 'Orange' },   hex: '#F46F36' },
          { name: { es: 'Verde', en: 'Green' },      hex: '#10916A' },
          { name: { es: 'Crema', en: 'Cream' },      hex: '#F9F4E0' },
        ],
      },
      {
        type: 'decision',
        label: { es: 'Decisión 03', en: 'Decision 03' },
        title: { es: 'Tres patrones, tres intensidades', en: 'Three patterns, three intensities' },
        text: {
          es: 'Dibujé íconos de comida venezolana (arepas, tequeños, maíz) y armé tres patrones: solo íconos para acompañar sin distraer, con elementos tropicales para ocasiones especiales y con el logotipo para reforzar la marca.',
          en: 'I drew icons of Venezuelan food (arepas, tequeños, corn) and built three patterns: icons only to accompany without distracting, with tropical elements for special occasions, and with the logotype to reinforce the brand.',
        },
        images: [
          { src: `${VEN}/patron-iconos.webp`,    alt: { es: 'Patrón de íconos de comida venezolana', en: 'Pattern of Venezuelan food icons' } },
          { src: `${VEN}/patron-tropical.webp`,  alt: { es: 'Patrón con íconos y elementos tropicales', en: 'Pattern with icons and tropical elements' } },
          { src: `${VEN}/patron-logotipo.webp`,  alt: { es: 'Patrón con el logotipo', en: 'Pattern with the logotype' } },
        ],
      },
      {
        type: 'decision',
        label: { es: 'Decisión 04', en: 'Decision 04' },
        title: { es: 'Etiquetas que se leen en góndola', en: 'Shelf labels you can read at a glance' },
        text: {
          es: 'Los precios normales usan un marco azul y fondo limpio; las ofertas, un encabezado rojo con "¡Ofertón!" y marco amarillo. La diferencia se nota desde lejos, sin leer.',
          en: 'Regular prices use a blue frame and a clean background; deals get a red header with "¡Ofertón!" and a yellow frame. The difference shows from afar, without reading.',
        },
        image: {
          src: `${VEN}/etiquetas.webp`,
          alt: { es: 'Etiquetas de precio normal y de oferta', en: 'Regular price and deal labels' },
        },
      },
      {
        type: 'feature',
        label: { es: 'Pieza destacada', en: 'Featured piece' },
        title: { es: 'La apertura', en: 'The opening' },
        text: {
          es: 'Volante, invitación e imán para el lanzamiento, todos con la misma estructura: marca arriba, mensaje en Atma, datos en Lato y QR para seguir en redes.',
          en: 'Flyer, invitation and magnet for the launch, all with the same structure: brand at the top, message in Atma, details in Lato and a QR code to follow on social media.',
        },
        images: [
          { src: `${VEN}/pieza-volante.webp`,     alt: { es: 'Volante de la apertura', en: 'Opening flyer' } },
          { src: `${VEN}/pieza-invitacion.webp`,  alt: { es: 'Invitación a la apertura', en: 'Opening invitation' } },
          { src: `${VEN}/pieza-imanes.webp`,      alt: { es: 'Imanes de la marca', en: 'Brand magnets' } },
        ],
      },
      {
        type: 'feature',
        label: { es: 'Pieza destacada', en: 'Featured piece' },
        title: { es: 'Un sistema para redes', en: 'A system for social media' },
        text: {
          es: 'Plantillas para posts, historias destacadas, perfil e íconos, para que el negocio publique por su cuenta sin perder coherencia.',
          en: 'Templates for posts, story highlights, profile and icons, so the business can publish on its own without losing consistency.',
        },
        images: [
          { src: `${VEN}/post-arepas.webp`,        alt: { es: 'Post sobre arepas', en: 'Post about arepas' } },
          { src: `${VEN}/post-oferton-3x2.webp`,   alt: { es: 'Post de oferta 3x2', en: '3-for-2 deal post' } },
          { src: `${VEN}/post-receta.webp`,        alt: { es: 'Post con una receta', en: 'Recipe post' } },
        ],
      },
      {
        type: 'gallery',
        images: [
          { src: `${VEN}/camisetas.webp`,             alt: { es: 'Camisetas con la marca', en: 'Branded T-shirts' } },
          { src: `${VEN}/gorras.webp`,                alt: { es: 'Gorras con la marca', en: 'Branded caps' } },
          { src: `${VEN}/post-ofertones.webp`,        alt: { es: 'Post «¡Llegaron los ofertones de la semana!»', en: '"¡Llegaron los ofertones de la semana!" post' } },
          { src: `${VEN}/redes-highlights.webp`,      alt: { es: 'Portadas de historias destacadas', en: 'Story highlight covers' } },
          { src: `${VEN}/post-rekolita.webp`,         alt: { es: 'Post de producto', en: 'Product post' } },
          { src: `${VEN}/post-nuevas-unidades.webp`,  alt: { es: 'Post de nuevos productos', en: 'New products post' } },
        ],
      },
    ],
  },

  {
    slug: 'web-vulnmaster',
    category: 'Website Design',
    title:    { es: 'Diseño y frontend', en: 'Design & Frontend' },
    tagline: {
      es: 'La landing de una plataforma de ciberseguridad con IA, diseñada desde cero, marca incluida.',
      en: 'The landing page for an AI-powered cybersecurity platform, designed from scratch, brand included.',
    },
    description: {
      es: 'Identidad y landing de Vulnmaster, una plataforma de ciberseguridad con IA: diseño UX/UI y frontend en Next.js y Tailwind CSS.',
      en: 'Identity and landing page for Vulnmaster, an AI-powered cybersecurity platform: UX/UI design and frontend in Next.js and Tailwind CSS.',
    },
    cover: {
      main: {
        src: `${VMW}/landing-hero.webp`,
        alt: { es: 'Hero de la landing de Vulnmaster', en: 'Vulnmaster landing page hero' },
      },
    },
    hero: {
      image: `${VMW}/hero-web_vulnmaster.png`,
      alt: { es: 'Landing de Vulnmaster en un laptop', en: 'Vulnmaster landing page on a laptop' },
    },
    link: { href: 'https://vulnmaster.us', label: { es: 'Ver sitio', en: 'View site' } },
    sector: { es: 'Ciberseguridad', en: 'Cybersecurity' },
    card: {
      type: 'palette',
      label: { es: 'Identidad', en: 'Identity' },
      colors: [
        { name: { es: 'Azul noche', en: 'Night blue' }, hex: '#042141' },
        { name: { es: 'Violeta', en: 'Violet' },        hex: '#E976F5' },
        { name: { es: 'Cian', en: 'Cyan' },             hex: '#19C7E5' },
      ],
    },
    meta: {
      client: 'Vulnmaster',
      year:   '2024',
      role:   {
        es: 'Diseño UX/UI, identidad y frontend, en equipo con un desarrollador backend',
        en: 'UX/UI design, identity and frontend, working with a backend developer',
      },
      roleShort: { es: 'UX/UI + Identidad + Frontend', en: 'UX/UI + Identity + Frontend' },
      stack:  ['Next.js', 'Tailwind CSS', 'Figma'],
    },
    blocks: [
      {
        type: 'intro',
        problem: {
          es: 'Vulnmaster es un producto técnico (escaneos automáticos, priorización de riesgos y recomendaciones con IA) que tenía que entenderlo tanto un equipo de seguridad como alguien que decide la compra sin ser técnico. No había nada previo: ni sitio ni marca.',
          en: 'Vulnmaster is a technical product (automated scans, risk prioritization and AI recommendations) that had to make sense both to a security team and to a non-technical buyer. There was nothing before: no site and no brand.',
        },
        goal: {
          es: 'Crear la identidad y la landing desde cero: explicar qué hace el producto en segundos, transmitir confianza y llevar a probarlo.',
          en: 'Create the identity and the landing page from scratch: explain what the product does in seconds, build trust and lead people to try it.',
        },
      },
      {
        type: 'spec',
        group: 'decisions',
        label: { es: 'Decisión 01', en: 'Decision 01' },
        title: { es: 'Una marca técnica, pero no fría', en: 'A technical brand, but not a cold one' },
        text: {
          es: 'El azul noche da la seriedad que se espera de la ciberseguridad, y el violeta y el cian la alejan del típico estilo oscuro de "hacker". Para los títulos elegí una sans extendida, Normalidad Extended, que se lee firme y tecnológica sin perder claridad.',
          en: 'Night blue brings the seriousness expected from cybersecurity, while violet and cyan steer it away from the typical dark "hacker" look. For headings I chose an extended sans, Normalidad Extended, which reads as solid and technological without losing clarity.',
        },
        fontName: 'Normalidad Extended',
        // Fuente comercial (no está en Google Fonts): hasta tener el archivo se muestra
        // una sans extendida del sistema. Para usar la real: fontSrc: '/fonts/....woff2'
        googleFont: false,
        fontFallback: "'Arial Black', 'Helvetica Neue', Arial, sans-serif",
        sample: 'Aa',
        weights: ['Wide', 'Extended'],
        colors: [
          { name: { es: 'Azul noche', en: 'Night blue' }, hex: '#042141' },
          { name: { es: 'Violeta', en: 'Violet' },        hex: '#E976F5' },
          { name: { es: 'Cian', en: 'Cyan' },             hex: '#19C7E5' },
          { name: { es: 'Blanco', en: 'White' },          hex: '#FFFFFF' },
        ],
      },
      {
        type: 'feature',
        label: { es: 'Funcionalidad 01', en: 'Feature 01' },
        title: { es: 'Qué hace, antes que cómo lo hace', en: 'What it does before how it does it' },
        text: {
          es: 'El hero responde en una frase qué es el producto y muestra la plataforma en pantalla. Debajo, cuatro tarjetas resumen las funcionalidades principales con un título claro y una línea de explicación.',
          en: 'The hero answers in one sentence what the product is and shows the platform on screen. Below, four cards summarize the main features with a clear title and a one-line explanation.',
        },
        images: [
          {
            src: `${VMW}/landing-hero.webp`,
            alt: {
              es: 'Hero de la landing: «AI-powered Ethical Hacking and Vulnerability Analysis» junto a la plataforma en un laptop',
              en: 'Landing hero: "AI-powered Ethical Hacking and Vulnerability Analysis" next to the platform on a laptop',
            },
          },
          {
            src: `${VMW}/landing-features.webp`,
            alt: {
              es: 'Sección «Unlock the Power of Automated Cybersecurity» con tarjetas de funcionalidades',
              en: '"Unlock the Power of Automated Cybersecurity" section with feature cards',
            },
          },
        ],
      },
      {
        type: 'decision',
        label: { es: 'Decisión 02', en: 'Decision 02' },
        title: { es: 'El degradado como pausa', en: 'The gradient as a pause' },
        text: {
          es: 'Entre tanto texto técnico, una banda con el degradado de la marca resume la propuesta en una sola frase. Corta el ritmo de la página y separa el qué hace del con qué lo hace.',
          en: 'Amid so much technical text, a band with the brand gradient sums up the proposal in a single sentence. It breaks the page rhythm and separates what it does from what it does it with.',
        },
        image: {
          src: `${VMW}/landing-banda.webp`,
          alt: {
            es: 'Banda con degradado de azul a violeta y la frase de la propuesta en mayúsculas',
            en: 'Band with a blue-to-violet gradient and the value proposition in capitals',
          },
        },
      },
      {
        type: 'decision',
        label: { es: 'Decisión 03', en: 'Decision 03' },
        title: { es: 'Planes fáciles de comparar', en: 'Plans that are easy to compare' },
        text: {
          es: 'Los tres planes comparten estructura y orden de beneficios, así que la diferencia se ve de un vistazo. El selector mensual/anual cambia los precios sin salir de la sección.',
          en: 'The three plans share the same structure and order of benefits, so the difference is visible at a glance. The monthly/annual switch changes the prices without leaving the section.',
        },
        image: {
          src: `${VMW}/landing-precios.webp`,
          alt: {
            es: 'Sección de precios con el selector mensual/anual y los planes Free, Basic y Premium',
            en: 'Pricing section with the monthly/annual switch and the Free, Basic and Premium plans',
          },
        },
      },
      {
        type: 'feature',
        label: { es: 'Funcionalidad 02', en: 'Feature 02' },
        title: { es: 'Lista de espera antes del lanzamiento', en: 'Waitlist before launch' },
        text: {
          es: 'Mientras la plataforma no estaba abierta al público, un modal captaba el email de los interesados, con aceptación explícita de términos, para avisarles en el lanzamiento.',
          en: 'While the platform was not yet open to the public, a modal collected the email of interested people, with explicit acceptance of the terms, to notify them at launch.',
        },
        images: [
          {
            src: `${VMW}/landing-lista-espera.webp`,
            alt: {
              es: 'Modal «Coming Soon» con campo de email, casilla de términos y botón «Notify Me!»',
              en: '"Coming Soon" modal with an email field, a terms checkbox and a "Notify Me!" button',
            },
          },
        ],
      },
      {
        type: 'gallery',
        layout: 'column', // proporciones distintas: una columna, a ancho completo, sin recorte
        images: [
          {
            src: `${VMW}/landing-servicios.webp`,
            alt: { es: 'Sección «Services» con tarjetas de servicios', en: '"Services" section with service cards' },
          },
          {
            src: `${VMW}/landing-herramientas.webp`,
            alt: { es: 'Sección «Powerful tools for comprehensive security analysis»', en: '"Powerful tools for comprehensive security analysis" section' },
          },
          {
            src: `${VMW}/landing-footer.webp`,
            alt: { es: 'Footer de la landing con logo, redes y navegación', en: 'Landing footer with logo, social links and navigation' },
          },
        ],
      },
    ],
  },

  {
    slug: 'dashboard-vulnmaster',
    category: 'Website Design',
    featured: 1,
    title:    { es: 'Dashboard interactivo', en: 'Interactive Dashboard' },
    tagline: {
      es: 'Convertir datos de seguridad complejos en decisiones claras.',
      en: 'Turning complex security data into clear decisions.',
    },
    hero: {
      image: `${VM}/hero-dashboard_vulnmaster.png`,
      alt: {
        es: 'Dashboard de Vulnmaster en un laptop, con el detalle de una vulnerabilidad y sus pasos de corrección',
        en: 'Vulnmaster dashboard on a laptop, with a vulnerability detail and its remediation steps',
      },
    },
    description: {
      es: 'Diseño y desarrollo del dashboard de Vulnmaster: análisis de sitios, priorización de riesgos por severidad, remediación guiada, escaneos programados y consultas con IA.',
      en: 'Design and development of the Vulnmaster dashboard: site analysis, risk prioritization by severity, guided remediation, scheduled scans and AI consultations.',
    },
    cover: {
      main:      { src: `${VM}/dashboard.webp`, alt: { es: 'Dashboard de Vulnmaster con el resumen del último escaneo por severidad', en: 'Vulnmaster dashboard with the latest scan summary by severity' } },
      secondary: { src: `${VM}/detalle.webp`,   alt: { es: 'Detalle de una vulnerabilidad con descripción, mitigación y código para resolverla', en: 'Vulnerability detail with description, mitigation and code to fix it' } },
    },
    link: { href: 'https://vulnmaster.us', label: { es: 'Ver landing', en: 'View landing' } },
    sector: { es: 'Ciberseguridad', en: 'Cybersecurity' },
    card: {
      type: 'screenshot',
      label: { es: 'Revelado progresivo', en: 'Progressive disclosure' },
      image: `${VM}/hero-card_vulnmaster.webp`,
      alt: {
        es: 'Detalle expandido de una vulnerabilidad con descripción, mitigación y bloques de código para corregirla',
        en: 'Expanded vulnerability detail with description, mitigation and code blocks to fix it',
      },
    },
    meta: {
      client: 'Vulnmaster',
      year:   '2025',
      role:   { es: 'UX/UI + Frontend', en: 'UX/UI + Frontend' },
      stack:  ['Next.js', 'Tailwind CSS', 'Figma'],
    },
    // BORRADOR: contenido armado a partir de las capturas y la descripción del proyecto.
    blocks: [
      {
        type: 'intro',
        problem: {
          es: 'Las herramientas de escaneo (Burp Suite, NMAP, OpenVAS) devuelven listas largas de hallazgos técnicos. Sin una vista que ordene esa información, es difícil saber qué atender primero y cómo resolverlo.',
          en: 'Scanning tools (Burp Suite, NMAP, OpenVAS) return long lists of technical findings. Without a view that organizes that information, it is hard to know what to address first and how to fix it.',
        },
        goal: {
          es: 'Diseñar y desarrollar un dashboard donde el equipo vea el estado de sus sitios de un vistazo, priorice los riesgos por severidad y pase del hallazgo a la solución sin salir de la plataforma.',
          en: 'Design and build a dashboard where the team can see the state of their sites at a glance, prioritize risks by severity and go from finding to fix without leaving the platform.',
        },
      },
      {
        type: 'feature',
        title: { es: 'El estado de seguridad, al entrar', en: 'Security status, right on arrival' },
        text: {
          es: 'La pantalla inicial resume el último escaneo en cinco tarjetas, de informativo a crítico, y debajo lista los riesgos recientes con su tipo y la URL afectada. Las pestañas separan análisis recientes, riesgos recientes y riesgos anteriores para no mezclar contextos.',
          en: 'The home screen summarizes the latest scan in five cards, from informational to critical, and lists recent risks below with their type and affected URL. Tabs separate recent analyses, recent risks and previous risks so contexts don\'t mix.',
        },
        images: [
          { src: `${VM}/dashboard.webp`,    alt: { es: 'Dashboard con tarjetas de severidad', en: 'Dashboard with severity cards' } },
          { src: `${VM}/recent-risks.webp`, alt: { es: 'Tabla de riesgos recientes', en: 'Recent risks table' } },
        ],
      },
      {
        type: 'feature',
        title: { es: 'Reportes y escaneos programados', en: 'Reports and scheduled scans' },
        text: {
          es: 'Cada sitio tiene una vista de información con fechas de análisis, un gráfico de alertas por severidad y el reporte en PDF. Los escaneos se pueden programar por fecha y hora, con la zona horaria visible para evitar confusiones.',
          en: 'Each site has an information view with analysis dates, a chart of alerts by severity and the PDF report. Scans can be scheduled by date and time, with the time zone visible to avoid confusion.',
        },
        images: [
          { src: `${VM}/information.webp`, alt: { es: 'Información del sitio y gráfico de alertas', en: 'Site information and alerts chart' } },
          { src: `${VM}/schedule.webp`,    alt: { es: 'Programación de escaneos', en: 'Scan scheduling' } },
        ],
      },
      {
        type: 'stat',
        items: [
          { value: '5', label: { es: 'Niveles de severidad', en: 'Severity levels' } },
          { value: '3', label: { es: 'Formatos de reporte (Excel, PDF, HTML)', en: 'Report formats (Excel, PDF, HTML)' } },
          { value: 'IA', label: { es: 'Explicación y mitigación por hallazgo', en: 'Explanation and mitigation per finding' } },
        ],
      },
      {
        type: 'flow',
        title: { es: 'Del análisis a la remediación', en: 'From analysis to remediation' },
        text: {
          es: 'El flujo principal tiene tres pasos: ingresar la URL a analizar, revisar los hallazgos filtrados por severidad y abrir cada uno para ver la descripción, la mitigación y el código listo para copiar en Apache o Nginx.',
          en: 'The main flow has three steps: enter the URL to analyze, review findings filtered by severity and open each one to see the description, the mitigation and ready-to-copy code for Apache or Nginx.',
        },
        images: [
          { src: `${VM}/analyze.webp`, alt: { es: 'Pantalla para analizar una URL', en: 'Screen to analyze a URL' },                 caption: { es: 'Analizar', en: 'Analyze' } },
          { src: `${VM}/lista.webp`,   alt: { es: 'Lista de hallazgos con filtros por severidad', en: 'Findings list with severity filters' }, caption: { es: 'Priorizar', en: 'Prioritize' } },
          { src: `${VM}/detalle.webp`, alt: { es: 'Detalle de un hallazgo con pasos para resolverlo', en: 'Finding detail with steps to fix it' }, caption: { es: 'Resolver', en: 'Fix' } },
        ],
      },
      {
        type: 'decision',
        title: { es: 'Severidad legible sin depender del color', en: 'Severity readable without relying on color' },
        text: {
          es: 'Cada nivel de riesgo se indica con una cantidad de barras (de una a cuatro) además del color. Así la prioridad se entiende de un vistazo y sigue siendo clara para personas con daltonismo o en pantallas con poco contraste.',
          en: 'Each risk level is shown with a number of bars (one to four) in addition to color. Priority reads at a glance and stays clear for color-blind users or on low-contrast screens.',
        },
        image: { src: `${VM}/severidad.webp`, alt: { es: 'Indicadores de severidad con barras y colores', en: 'Severity indicators with bars and colors' } },
      },
      {
        type: 'decision',
        title: { es: 'La IA como siguiente paso, no como pantalla aparte', en: 'AI as the next step, not a separate screen' },
        text: {
          es: 'Desde cada hallazgo se puede abrir la consulta con IA con la pregunta ya armada sobre esa vulnerabilidad. El usuario no tiene que saber qué preguntar: llega a una explicación del riesgo y pasos concretos para mitigarlo, con historial de conversaciones.',
          en: 'From each finding, users can open the AI consultation with the question about that vulnerability already filled in. They don\'t need to know what to ask: they get an explanation of the risk and concrete mitigation steps, with conversation history.',
        },
        image: { src: `${VM}/ai-chat.webp`, alt: { es: 'Consulta con IA sobre una vulnerabilidad', en: 'AI consultation about a vulnerability' } },
      },
    ],
  },

  {
    slug: 'tipografia-ii-vignelli',
    category: 'University',
    featured: 3,
    title:    { es: 'Sistema tipográfico', en: 'Typographic System' },
    tagline: {
      es: 'Seis piezas que traducen los principios de Massimo Vignelli a un sistema propio.',
      en: 'Six pieces that translate Massimo Vignelli\'s principles into a system of my own.',
    },
    description: {
      es: 'Sistema gráfico de seis piezas cuadradas basado en los principios de Massimo Vignelli: una familia tipográfica, una grilla y tres colores (Tipografía II, FADU).',
      en: 'A graphic system of six square pieces based on Massimo Vignelli\'s principles: one type family, one grid and three colors (Typography II, FADU).',
    },
    cover: { main: `${TIPO}/sistema-completo.webp` },
    link: {
      href: 'https://www.instagram.com/p/C7H_CQfvP_W/?img_index=1',
      label: { es: 'Ver en Instagram', en: 'View on Instagram' },
    },
    sector: { es: 'Académico', en: 'Academic' },
    // TODO: pasar a la variante 'type' cuando estén confirmados la fuente y sus pesos:
    // card: { type: 'type', label: { es: 'Una sola familia', en: 'A single family' }, fontName: '…', sample: 'Aa', weights: [...] },
    card: {
      type: 'page',
      label: { es: 'Puesta tipográfica', en: 'Typographic layout' },
      image: `${TIPO}/pieza-design-is-one.webp`,
      alt: {
        es: 'Pieza en rojo y negro con el texto «Design is one» y una lista numerada',
        en: 'Red and black piece with the text "Design is one" and a numbered list',
      },
    },
    meta: {
      client:  { es: 'Cátedra Carbone', en: 'Carbone Course' },
      chair:   'Carbone',
      subject: { es: 'Tipografía II · FADU', en: 'Typography II · FADU' },
      year:    '2024',
      role:    { es: 'Diseño editorial', en: 'Editorial design' },
      stack:   [
        { es: 'Tipografía', en: 'Typography' },
        { es: 'Grillas', en: 'Grids' },
        { es: 'Diseño editorial', en: 'Editorial design' },
      ],
    },
    blocks: [
      {
        type: 'intro',
        problem: {
          es: 'La consigna era construir un sistema gráfico de seis piezas cuadradas a partir de la obra de un diseñador. Me tocó Massimo Vignelli.',
          en: 'The brief was to build a graphic system of six square pieces based on a designer\'s work. I got Massimo Vignelli.',
        },
        goal: {
          es: 'Que las piezas no imitaran su estilo, sino que aplicaran su forma de pensar: pocas tipografías, grillas estrictas y jerarquía clara.',
          en: 'For the pieces not to imitate his style but to apply his way of thinking: few typefaces, strict grids and clear hierarchy.',
        },
      },
      {
        type: 'decision',
        aspect: '5/4',
        title: { es: 'La escala hace la jerarquía', en: 'Scale creates the hierarchy' },
        text: {
          es: 'En lugar de sumar recursos, la jerarquía sale del contraste de tamaño: palabras gigantes que se cortan en el borde conviven con bloques de texto chicos y ordenados.',
          en: 'Instead of adding resources, hierarchy comes from contrast in size: giant words cut off at the edge sit alongside small, orderly blocks of text.',
        },
        images: [
          {
            src: `${TIPO}/detalle-escala-gel.webp`,
            alt: {
              es: 'Detalle de la pieza «Semántica»: las letras gigantes «gel» cortadas por el borde bajo el título «El buen diseño es un lenguaje, no un estilo»',
              en: 'Detail of the "Semántica" piece: giant letters "gel" cut off at the edge under the title "Good design is a language, not a style"',
            },
          },
          {
            src: `${TIPO}/detalle-escala-1931.webp`,
            alt: {
              es: 'Detalle de la pieza «1931»: números gigantes en negro y blanco junto a tres bloques de texto numerados',
              en: 'Detail of the "1931" piece: giant black and white numbers next to three numbered text blocks',
            },
          },
        ],
      },
      {
        type: 'decision',
        aspect: '16/9',
        title: { es: 'Una grilla para las seis piezas', en: 'One grid for all six pieces' },
        // TODO: confirmar la cantidad de columnas de la grilla para completar el texto
        text: {
          es: 'Basé la grilla en el Vignelli Canon sobre el formato cuadrado. Los bloques de texto, los títulos y los elementos gráficos se alinean siempre a esa estructura.',
          en: 'I based the grid on the Vignelli Canon over the square format. Text blocks, headings and graphic elements always align to that structure.',
        },
        image: {
          src: `${TIPO}/detalle-grilla.webp`,
          alt: {
            es: 'Detalle de la pieza «Vignelli Canon»: el título y tres columnas de texto alineadas a la grilla',
            en: 'Detail of the "Vignelli Canon" piece: the title and three text columns aligned to the grid',
          },
        },
      },
      {
        type: 'decision',
        aspect: '1/1',
        title: { es: 'Una tipografía, tres colores', en: 'One typeface, three colors' },
        text: {
          es: 'Me limité a una sola familia sans, cercana a la Helvetica que usaba Vignelli, y a rojo, negro y blanco. Con tan pocos recursos, las seis piezas se leen como un sistema aunque cada una tenga su propia composición.',
          en: 'I limited myself to a single sans family, close to the Helvetica Vignelli used, and to red, black and white. With so few resources, the six pieces read as a system even though each has its own composition.',
        },
        image: {
          src: `${TIPO}/sistema-completo.webp`,
          alt: {
            es: 'Las seis piezas del sistema juntas, en rojo, negro y blanco',
            en: 'All six pieces of the system together, in red, black and white',
          },
        },
      },
      {
        type: 'feature',
        aspect: '1/1',
        title: { es: 'Semántica', en: 'Semantics' },
        text: {
          es: 'Mi pieza favorita. La frase de Vignelli, "el buen diseño es un lenguaje, no un estilo", resume el sistema: la tipografía es la imagen.',
          en: 'My favorite piece. Vignelli\'s phrase, "good design is a language, not a style", sums up the system: typography is the image.',
        },
        video: {
          label: { es: 'El sistema en movimiento', en: 'The system in motion' },
          src: {
            webm: `${TIPO}/animacion-sistema.webm`,
            mp4: `${TIPO}/animacion-sistema.mp4`,
          },
          poster: `${TIPO}/animacion-sistema-poster.webp`,
          alt: {
            es: 'Animación de las seis piezas del sistema construyéndose con tipografía en movimiento',
            en: 'Animation of the six pieces of the system being built with moving typography',
          },
          caption: { es: 'Animación de las seis piezas · 33 s', en: 'Animation of the six pieces · 33 s' },
        },
        images: [
          {
            src: `${TIPO}/pieza-semantica.webp`,
            caption: { es: 'Pieza «Semántica»', en: '"Semántica" piece' },
            alt: {
              es: 'Pieza «Semántica»: las letras «gel» en blanco sobre rojo con el título «El buen diseño es un lenguaje, no un estilo»',
              en: '"Semántica" piece: the letters "gel" in white on red with the title "Good design is a language, not a style"',
            },
          },
        ],
      },
      {
        type: 'gallery',
        ratio: '1/1',
        // TODO: los mockup-*.webp de la lista nueva todavía no existen; por ahora se usan
        // las fotos pieza-*.webp equivalentes. Reemplazar cuando estén los archivos.
        images: [
          { src: `${TIPO}/sistema-completo.webp`,    alt: { es: 'Las seis piezas del sistema juntas', en: 'All six pieces of the system together' } },
          { src: `${TIPO}/pieza-semantica.webp`,     alt: { es: 'Pieza «Semántica»', en: '"Semántica" piece' } },
          { src: `${TIPO}/pieza-design-is-one.webp`, alt: { es: 'Pieza «Design is one»', en: '"Design is one" piece' } },
          { src: `${TIPO}/pieza-canon-blanca.webp`,  alt: { es: 'Pieza «Vignelli Canon» en blanco', en: 'White "Vignelli Canon" piece' } },
          { src: `${TIPO}/pieza-canon-roja.webp`,    alt: { es: 'Pieza «Vignelli Canon» en rojo', en: 'Red "Vignelli Canon" piece' } },
          { src: `${TIPO}/pieza-1931.webp`,          alt: { es: 'Pieza «1931»', en: '"1931" piece' } },
        ],
      },
    ],
  },

  {
    slug: 'tipografia-ii-revista-vignelli',
    category: 'University',
    title:    { es: 'Revista .TIP', en: '.TIP Magazine' },
    tagline: {
      es: 'La entrevista completa a Massimo Vignelli en 10 páginas interiores.',
      en: 'The complete interview with Massimo Vignelli in 10 inside pages.',
    },
    description: {
      es: 'Revista de 12 páginas que lleva a formato editorial el sistema tipográfico basado en Massimo Vignelli, con su entrevista completa (Tipografía II, FADU).',
      en: 'A 12-page magazine that brings the Massimo Vignelli-based typographic system into an editorial format, with his complete interview (Typography II, FADU).',
    },
    cover: {
      main: {
        src: `${REV}/mockup-tapas.webp`,
        alt: {
          es: 'Tapa y contratapa de la revista .tip, con letras gigantes que cruzan de una a otra',
          en: 'Front and back cover of .tip magazine, with giant letters running from one to the other',
        },
      },
    },
    link: null,
    sector: { es: 'Académico', en: 'Academic' },
    card: {
      type: 'page',
      label: { es: 'Sumario', en: 'Contents' },
      image: `${REV}/mockup-sumario.webp`,
      alt: {
        es: 'Revista abierta en el sumario y la apertura de Diseño atemporal',
        en: 'Magazine open at the contents page and the "Diseño atemporal" opener',
      },
    },
    meta: {
      client:  { es: 'Cátedra Carbone', en: 'Carbone Course' },
      chair:   'Carbone',
      subject: { es: 'Tipografía II · FADU', en: 'Typography II · FADU' },
      year:    '2024',
      role:    { es: 'Diseño editorial', en: 'Editorial design' },
      stack:   [
        { es: 'Diseño editorial', en: 'Editorial design' },
        { es: 'Retícula', en: 'Grid' },
        { es: 'Tipografía', en: 'Typography' },
      ],
    },
    blocks: [
      {
        type: 'intro',
        problem: {
          es: 'Continuación del sistema anterior: llevarlo a una revista de 12 páginas, con tapa y contratapa, en la que tenía que entrar completa una entrevista a Vignelli que nos dio la cátedra.',
          en: 'A follow-up to the previous system: turning it into a 12-page magazine, with front and back covers, that had to fit a complete interview with Vignelli provided by the course.',
        },
        goal: {
          es: 'Que el sistema resistiera un formato largo: mantener la identidad, ordenar mucho texto y que la lectura fuera cómoda de principio a fin.',
          en: 'For the system to hold up in a long format: keep the identity, organize a lot of text and make reading comfortable from start to finish.',
        },
      },
      {
        type: 'decision',
        aspect: '1/1',
        title: { es: 'Tapa y contratapa como una sola pieza', en: 'Front and back cover as a single piece' },
        text: {
          es: 'Las letras gigantes cruzan el lomo: abierta, la revista forma una sola composición. Es el mismo recurso de escala del sistema anterior, ahora pensado para el objeto.',
          en: 'The giant letters cross the spine: opened, the magazine forms a single composition. It is the same scale device from the previous system, now designed for the object.',
        },
        image: {
          src: `${REV}/mockup-tapas.webp`,
          alt: {
            es: 'Tapa y contratapa de la revista .tip, con letras gigantes que cruzan de una a otra',
            en: 'Front and back cover of .tip magazine, with giant letters running from one to the other',
          },
        },
      },
      {
        type: 'decision',
        aspect: 'auto',
        title: { es: '24 preguntas, un solo recurso', en: '24 questions, a single device' },
        text: {
          es: 'Cada pregunta de la entrevista lleva su número en rojo y una línea que la separa de la respuesta. Así un texto largo se puede recorrer, retomar y escanear sin perder el hilo.',
          en: 'Each interview question carries its number in red and a line that separates it from the answer. That way a long text can be browsed, picked up again and scanned without losing the thread.',
        },
        image: {
          src: `${REV}/detalle-preguntas.webp`,
          alt: {
            es: 'Detalle de la pregunta 06, «¿Qué piensas ante un nuevo proyecto?», con el número en rojo, una línea y la respuesta',
            en: 'Detail of question 06, "What do you think about when facing a new project?", with the number in red, a rule and the answer',
          },
        },
      },
      {
        type: 'decision',
        aspect: 'auto',
        title: { es: 'Una sans para títulos, una serif para leer', en: 'A sans for headings, a serif for reading' },
        text: {
          es: 'Los títulos van en Nimbus Sans, cercana a la Helvetica de Vignelli, y el texto corrido en Meta Serif, más cómoda para la lectura larga. La Didot aparece una sola vez, en "Verdi y Bodoni", porque el contenido lo pedía.',
          en: 'Headings are set in Nimbus Sans, close to Vignelli\'s Helvetica, and body text in Meta Serif, more comfortable for long reading. Didot appears only once, in "Verdi y Bodoni", because the content called for it.',
        },
        image: {
          src: `${REV}/detalle-tipografias.webp`,
          alt: {
            es: 'Título «Verdi y Bodoni» compuesto en Didot, con el número 24 en rojo y la bajada «Fuerza y elegancia»',
            en: '"Verdi y Bodoni" heading set in Didot, with the number 24 in red and the subtitle "Fuerza y elegancia"',
          },
        },
      },
      {
        type: 'feature',
        aspect: 'auto',
        title: { es: 'Ritmo entre páginas', en: 'Rhythm across pages' },
        text: {
          es: 'Alterné páginas de texto denso a dos columnas con aperturas de mucho aire, como el "03" gigante o "La esencia del diseño", para que la revista respire.',
          en: 'I alternated pages of dense two-column text with airy openers, like the giant "03" or "La esencia del diseño", so the magazine can breathe.',
        },
        images: [
          {
            src: `${REV}/doble-canon.webp`,
            alt: {
              es: 'Doble página con un «03» rojo gigante, el título «El Canon Vignelli» y texto a dos columnas',
              en: 'Spread with a giant red "03", the heading "El Canon Vignelli" and two-column text',
            },
          },
          {
            src: `${REV}/doble-esencia.webp`,
            alt: {
              es: 'Doble página «Transporte Vignelli» y «La esencia del diseño», con cuatro claves numeradas',
              en: '"Transporte Vignelli" and "La esencia del diseño" spread, with four numbered keys',
            },
          },
        ],
      },
      {
        type: 'gallery',
        ratio: '4/3', // mezcla mockups cuadrados y dobles páginas: se recortan a 4:3
        images: [
          {
            src: `${REV}/mockup-tapas.webp`,
            alt: { es: 'Tapa y contratapa de la revista .tip', en: 'Front and back cover of .tip magazine' },
          },
          {
            src: `${REV}/mockup-sumario.webp`,
            alt: { es: 'Revista abierta en el sumario', en: 'Magazine open at the contents page' },
          },
          {
            src: `${REV}/mockup-canon.webp`,
            alt: {
              es: 'Revista abierta en «El Canon Vignelli» y «Diseño atemporal»',
              en: 'Magazine open at "El Canon Vignelli" and "Diseño atemporal"',
            },
          },
          {
            src: `${REV}/doble-entrevista.webp`,
            alt: {
              es: 'Doble página de la entrevista «Los estilos vienen y van, design is one», con las preguntas numeradas',
              en: 'Interview spread "Los estilos vienen y van, design is one", with numbered questions',
            },
          },
          {
            src: `${REV}/doble-esencia.webp`,
            alt: {
              es: 'Doble página «La esencia del diseño»',
              en: '"La esencia del diseño" spread',
            },
          },
        ],
      },
    ],
  },

  {
    slug: 'tipografia-ii-totem-nobel',
    category: 'University',
    featured: 4,
    title:    { es: 'Interfaz para tótem digital', en: 'Digital Signage Totem Interface' },
    tagline: {
      es: 'Un tótem interactivo para recorrer los Premios Nobel y sus laureados argentinos y latinos.',
      en: 'An interactive totem to explore the Nobel Prizes and their Argentine and Latin American laureates.',
    },
    description: {
      es: 'Diseño y prototipo en Adobe XD de la interfaz de un tótem informativo sobre los Premios Nobel y sus laureados argentinos y latinos (Tipografía II, FADU).',
      en: 'Design and Adobe XD prototype of an information totem interface about the Nobel Prizes and their Argentine and Latin American laureates (Typography II, FADU).',
    },
    cover: {
      main: {
        src: `${TOTEM}/pantalla-01-inicio.webp`,
        alt: { es: 'Pantalla de inicio de Los Premios Nobel', en: 'Los Premios Nobel home screen' },
      },
    },
    hero: {
      image: `${TOTEM}/hero-totem_nobel.png`,
      alt: {
        es: 'Tótem digital con la pantalla de inicio de Los Premios Nobel',
        en: 'Digital totem showing the Los Premios Nobel home screen',
      },
    },
    link: null,
    sector: { es: 'Académico', en: 'Academic' },
    card: {
      type: 'screenshot',
      label: { es: 'Detalle en capas', en: 'Layered detail' },
      image: `${TOTEM}/pantalla-05-modal-houssay.webp`,
      alt: {
        es: 'Ventana emergente con el logro de Bernardo Houssay',
        en: 'Pop-up window with Bernardo Houssay\'s achievement',
      },
    },
    meta: {
      client:  { es: 'Cátedra Carbone', en: 'Carbone Course' },
      chair:   'Carbone',
      subject: { es: 'Tipografía II · FADU', en: 'Typography II · FADU' },
      year:    '2024',
      role:    { es: 'Diseño UI · Prototipado (individual)', en: 'UI design · Prototyping (solo)' },
      stack:   [
        'Adobe XD',
        { es: 'Diseño de interfaz', en: 'Interface design' },
        { es: 'Arquitectura de información', en: 'Information architecture' },
      ],
    },
    blocks: [
      {
        type: 'intro',
        problem: {
          es: 'La consigna era diseñar y prototipar la interfaz de un tótem informativo sobre un tema asignado. Me tocaron los Premios Nobel.',
          en: 'The brief was to design and prototype the interface of an information totem about an assigned topic. I got the Nobel Prizes.',
        },
        goal: {
          es: 'Que cualquier persona, de pie y en pocos segundos, pudiera entender qué son los premios y explorar los logros argentinos y latinos sin perderse.',
          en: 'For anyone, standing and in a few seconds, to understand what the prizes are and explore Argentine and Latin American achievements without getting lost.',
        },
      },
      {
        type: 'video',
        label: { es: 'El prototipo en uso', en: 'The prototype in use' },
        ratio: '9/16',
        src: {
          webm: `${TOTEM}/prototipo-totem.webm`,
          mp4: `${TOTEM}/prototipo-totem.mp4`,
        },
        poster: `${TOTEM}/prototipo-totem-poster.webp`,
        alt: {
          es: 'Recorrido por el prototipo del tótem: inicio, logros, mapa y categorías',
          en: 'Walkthrough of the totem prototype: home, achievements, map and categories',
        },
        caption: { es: 'Prototipo navegable en Adobe XD · 1:30', en: 'Clickable prototype in Adobe XD · 1:30' },
      },
      {
        type: 'flow',
        title: { es: 'Cuatro puertas de entrada', en: 'Four ways in' },
        text: {
          es: 'El inicio ofrece cuatro caminos (Logros, Los premios, Categorías y Personajes) y cada uno se abre en pantallas cortas, con una sola idea por pantalla.',
          en: 'The home screen offers four paths (Achievements, The prizes, Categories and Laureates), and each opens into short screens with a single idea per screen.',
        },
        images: [
          {
            src: `${TOTEM}/pantalla-01-inicio.webp`,
            caption: { es: 'Inicio', en: 'Home' },
            alt: { es: 'Pantalla de inicio con los cuatro caminos', en: 'Home screen with the four paths' },
          },
          {
            src: `${TOTEM}/pantalla-03-impacto.webp`,
            caption: { es: 'Impacto', en: 'Impact' },
            alt: {
              es: 'Pantalla «Impacto» con una línea de tiempo de logros argentinos por año',
              en: '"Impacto" screen with a timeline of Argentine achievements by year',
            },
          },
          {
            src: `${TOTEM}/pantalla-06-detras-de-los-logros.webp`,
            caption: { es: 'Detrás de los logros', en: 'Behind the achievements' },
            alt: {
              es: 'Pantalla «Detrás de los logros» con la lista de laureados y su formación',
              en: '"Detrás de los logros" screen listing laureates and their education',
            },
          },
        ],
      },
      {
        type: 'decision',
        label: { es: 'Decisión 01', en: 'Decision 01' },
        title: { es: 'Un color para cada sección', en: 'A color for each section' },
        text: {
          es: 'Cada sección tiene su color en la banda del título: amarillo para la historia de los premios, naranja para las categorías, rosa para los personajes, azul para los datos. Así se sabe dónde se está sin leer.',
          en: 'Each section has its own color in the title band: yellow for the history of the prizes, orange for the categories, pink for the laureates, blue for the data. That way you know where you are without reading.',
        },
        images: [
          {
            src: `${TOTEM}/pantalla-11-categorias.webp`,
            alt: {
              es: 'Pantalla «Categorías» con la banda del título en naranja y la lista de las seis categorías',
              en: '"Categorías" screen with an orange title band and the list of six categories',
            },
          },
          {
            src: `${TOTEM}/pantalla-13-categoria-medicina.webp`,
            alt: {
              es: 'Pantalla de la categoría Medicina con la banda del título en naranja y datos resaltados',
              en: 'Medicine category screen with an orange title band and highlighted data',
            },
          },
        ],
      },
      {
        type: 'decision',
        label: { es: 'Decisión 02', en: 'Decision 02' },
        title: { es: 'La navegación siempre en el mismo lugar', en: 'Navigation always in the same place' },
        text: {
          es: 'Los botones para avanzar y retroceder están siempre abajo a la derecha, grandes y al alcance de la mano en un tótem. Arriba, una ruta (Los premios / Qué son / Origen) indica en qué parte del recorrido se está.',
          en: 'The forward and back buttons are always at the bottom right, large and within reach on a totem. At the top, a path (The prizes / What they are / Origin) shows where you are in the journey.',
        },
        image: {
          src: `${TOTEM}/pantalla-16-alfred-nobel.webp`,
          alt: {
            es: 'Pantalla sobre Alfred Nobel con los botones de navegación abajo a la derecha',
            en: 'Alfred Nobel screen with the navigation buttons at the bottom right',
          },
        },
      },
      {
        type: 'decision',
        label: { es: 'Decisión 03', en: 'Decision 03' },
        title: { es: 'El detalle, solo si se pide', en: 'Detail only on request' },
        text: {
          es: 'La pantalla principal muestra lo esencial y el resto se abre en ventanas emergentes: la biografía de Nobel o los laureados de cada país en el mapa. El fondo se oscurece para que el foco quede en la ventana.',
          en: 'The main screen shows the essentials and the rest opens in pop-up windows: Nobel\'s biography or each country\'s laureates on the map. The background darkens so the focus stays on the window.',
        },
        images: [
          {
            src: `${TOTEM}/pantalla-08-mapa.webp`,
            alt: {
              es: 'Mapa de Latinoamérica con la cantidad de laureados por país',
              en: 'Map of Latin America with the number of laureates per country',
            },
          },
          {
            src: `${TOTEM}/pantalla-10-modal-argentina.webp`,
            alt: {
              es: 'Ventana emergente con los laureados argentinos sobre el mapa oscurecido',
              en: 'Pop-up window with Argentina\'s laureates over the darkened map',
            },
          },
        ],
      },
      {
        type: 'feature',
        label: { es: 'Pieza destacada', en: 'Featured piece' },
        title: { es: 'Datos que se leen de lejos', en: 'Data you can read from afar' },
        text: {
          es: 'Los datos clave de cada categoría van resaltados con un fondo de color, para leerse de lejos y de un vistazo.',
          en: 'The key data in each category is highlighted with a colored background, so it can be read from afar and at a glance.',
        },
        images: [
          {
            src: `${TOTEM}/pantalla-12-categoria-paz.webp`,
            alt: {
              es: 'Pantalla de la categoría Paz con los datos clave resaltados en celeste',
              en: 'Peace category screen with key data highlighted in light blue',
            },
          },
        ],
      },
      {
        type: 'gallery',
        ratio: '9/16',
        images: [
          { src: `${TOTEM}/pantalla-04-logros-argentinos.webp`,    alt: { es: 'Pantalla «Logros argentinos»', en: '"Logros argentinos" screen' } },
          { src: `${TOTEM}/pantalla-14-los-premios.webp`,          alt: { es: 'Pantalla «Los premios» con la medalla Nobel', en: '"Los premios" screen with the Nobel medal' } },
          { src: `${TOTEM}/pantalla-15-origen.webp`,               alt: { es: 'Pantalla «Origen» de los premios', en: '"Origen" screen about the prizes\' history' } },
          { src: `${TOTEM}/pantalla-18-personajes-argentinos.webp`, alt: { es: 'Línea de tiempo de los laureados argentinos', en: 'Timeline of Argentine laureates' } },
          { src: `${TOTEM}/pantalla-19-modal-esquivel.webp`,       alt: { es: 'Ventana emergente sobre Adolfo Pérez Esquivel', en: 'Pop-up window about Adolfo Pérez Esquivel' } },
        ],
      },
    ],
  },
];

/* ── Helpers ─────────────────────────────────────── */

/** Devuelve el texto en el idioma pedido si el valor es { es, en }. */
export function loc(value, lang) {
  if (value && typeof value === 'object' && !Array.isArray(value) && 'es' in value) {
    return value[lang] ?? value.es;
  }
  return value;
}

/** Normaliza una imagen a { src, alt, caption } (acepta string u objeto). */
export function toMedia(item, lang, fallbackAlt = '') {
  if (!item) return null;
  if (typeof item === 'string') return { src: item, alt: fallbackAlt, caption: null };
  return {
    src: item.src,
    alt: loc(item.alt, lang) ?? fallbackAlt,
    caption: loc(item.caption, lang) ?? null,
    position: item.position ?? null, // object-position al recortar (ej. 'center top', '30% 50%')
    w: item.w ?? null,               // dimensiones reales (las agrega el servidor)
    h: item.h ?? null,
  };
}

/** Imágenes de un bloque, sin importar si usa `image`, `images` o ninguna. */
export function blockImages(block) {
  if (block.images) return block.images.filter(Boolean);
  if (block.image) {
    const img = typeof block.image === 'string' ? { src: block.image } : block.image;
    return [block.alt && !img.alt ? { ...img, alt: block.alt } : img];
  }
  return [];
}

/** Imagen del hero del detalle como { src, alt }; usa la portada si no hay `hero`. */
export function heroMedia(project, lang) {
  if (project.hero?.image) {
    return {
      src: project.hero.image,
      alt: loc(project.hero.alt, lang) ?? loc(project.title, lang),
      fallback: false,
      w: project.hero.w ?? 2400, // dimensiones reales (las agrega el servidor)
      h: project.hero.h ?? 1600,
    };
  }
  const cover = toMedia(project.cover?.main, lang, loc(project.title, lang));
  return cover ? { ...cover, fallback: true } : null;
}

/** Tarjeta del hero con sus textos en el idioma pedido, o null. */
export function heroCard(project, lang) {
  const card = project.card;
  if (!card?.type) return null;
  return {
    ...card,
    label:  loc(card.label, lang),
    alt:    loc(card.alt, lang),
    sample: loc(card.sample, lang),
    colors: card.colors?.map((c) => ({ ...c, name: loc(c.name, lang) })),
  };
}

/** Ruta de la imagen principal de portada, o null. */
export function coverSrc(project) {
  const main = project.cover?.main;
  return typeof main === 'string' ? main : main?.src ?? null;
}

export function getAllProjects() {
  return projects;
}

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

/** Proyectos del collage del hero, ordenados por `featured` y con portada. */
export function getFeaturedProjects(limit = 4) {
  return projects
    .filter((p) => p.featured && coverSrc(p))
    .sort((a, b) => a.featured - b.featured)
    .slice(0, limit);
}
