import ContactContent from '@/components/ContactContent';

export const metadata = {
  title: 'Contacto',
  alternates: { canonical: '/contactform' },
  description:
    'Ponte en contacto con Paula, desarrolladora frontend y diseñadora gráfica. Estoy disponible para colaborar en proyectos y discutir ideas innovadoras en diseño y desarrollo web.',
};

export default function Contact() {
  return <ContactContent />;
}
