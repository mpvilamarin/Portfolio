/**
 * Datos globales del sitio. La URL sale de NEXT_PUBLIC_SITE_URL (dominio propio)
 * o, en Vercel, de VERCEL_PROJECT_PRODUCTION_URL, que se define en cada build.
 */
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000')
).replace(/\/$/, '');

export const SITE_NAME = 'Paula Villamarín';
export const EMAIL = 'mpvillamarin@gmail.com';

export const SOCIALS = [
  { key: 'github',   name: 'GitHub',   href: 'https://github.com/mpvilamarin',                      label: 'GH' },
  { key: 'behance',  name: 'Behance',  href: 'https://www.behance.net/marapvillama',                label: 'BE' },
  { key: 'linkedin', name: 'LinkedIn', href: 'https://www.linkedin.com/in/maria-paula-villamarin/', label: 'LI' },
  { key: 'whatsapp', name: 'WhatsApp', href: 'https://wa.me/5491164117527',                         label: 'WA' },
];

export const CV_LINKS = [
  { lang: 'en', href: '/cv/paula-villamarin-cv-en.pdf', label: 'English' },
  { lang: 'es', href: '/cv/paula-villamarin-cv-es.pdf', label: 'Español' },
];
