import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug, loc, coverSrc } from "@/components/projectsContent";
import ProjectPageContent from "@/components/ProjectPageContent";
import { withImageSizes } from "@/lib/imageMeta";

/* ── Metadatos dinámicos ─────────────────────────── */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Proyecto no encontrado" };

  const title = loc(project.title, "es");
  const description = loc(project.description, "es");
  const image = coverSrc(project);
  const images = image ? [{ url: encodeURI(image), alt: title }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}`,
      title,
      description,
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images && { images: images.map((i) => i.url) }),
    },
  };
}

/* ── Rutas estáticas ─────────────────────────── */
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

  // Pasamos el proyecto como prop al client component que maneja el idioma,
  // con las dimensiones reales de las imágenes de sus bloques (leídas en el servidor).
  return <ProjectPageContent project={withImageSizes(project)} />;
}
