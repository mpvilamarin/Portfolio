import { notFound } from 'next/navigation';
import { getAllProjects, getProjectBySlug } from '@/components/projectsContent';
import ProjectPageContent from '@/components/ProjectPageContent';

/* ── Metadatos dinámicos ─────────────────────────── */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Proyecto no encontrado' };

  return {
    title: `${project.title} · Paula Villamarín`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.image ?? '/project.jpg', alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.image ?? '/project.jpg'],
    },
  };
}

/* ── Rutas estáticas ────────────────────────────── */
export async function generateStaticParams() {
  const seen = new Set();
  return getAllProjects()
    .filter((p) => {
      if (seen.has(p.slug)) return false;
      seen.add(p.slug);
      return true;
    })
    .map((p) => ({ slug: p.slug }));
}

/* ── Página ─────────────────────────────────────── */
export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // Pasamos el proyecto como prop al client component que maneja el idioma
  return <ProjectPageContent project={project} />;
}
