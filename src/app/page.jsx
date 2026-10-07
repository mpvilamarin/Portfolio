import HomeContent from '@/components/HomeContent';
import { SITE_URL, SITE_NAME, EMAIL, SOCIALS } from '@/lib/site';

export const metadata = {
  alternates: { canonical: '/' },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  alternateName: 'María Paula Villamarín',
  jobTitle: 'Desarrolladora Frontend y Diseñadora Gráfica',
  url: SITE_URL,
  email: `mailto:${EMAIL}`,
  sameAs: SOCIALS.filter((s) => s.key !== 'whatsapp').map((s) => s.href),
  knowsAbout: ['Frontend', 'React', 'Next.js', 'Tailwind CSS', 'UX/UI', 'Diseño gráfico'],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
      />
      <HomeContent />
    </>
  );
}
