const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // Misma lógica que src/lib/site.js: dominio propio > URL de producción de Vercel
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000'),
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/opengraph-image*'],
};
