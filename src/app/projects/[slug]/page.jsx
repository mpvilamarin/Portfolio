// app/projects/[slug]/page.jsx

import { notFound } from 'next/navigation';
import { getAllProjects, getProjectBySlug } from '@/components/projectsContent';
import Layout from '@/app/layout';
import Image from 'next/image';

// Función para generar metadatos dinámicos
export async function generateMetadata({ params }) {
  // Espera a que 'params' se resuelva
  const { slug } = await params;

  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Proyecto no encontrado',
      description: 'No se encontró el proyecto solicitado.',
    };
  }

  return {
    title: `${project.title} - Paula | Desarrollo Frontend & Diseño`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.image,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

// Función para generar parámetros estáticos
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Componente de la página del proyecto
export default async function ProjectPage({ params }) {
  // Espera a que 'params' se resuelva
  const { slug } = await params;

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <Layout>
      <section className="flex min-h-screen items-center px-24 mt-12">
        <main className="w-[50%]">
          <h1 className="font-montserrat font-bold text-whiteCream uppercase leading-none">
            {project.title}
          </h1>
          <h3 className="font-robotoMono text-green">{project.subtitle}</h3>
          <p className="italic">{project.client}</p>
          <p className="mt-4">{project.description}</p>
          {project.url && project.url.trim() !== '' && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-12 border-solid border-green border-2 rounded-md px-4 py-2 hover:bg-green hover:text-blackLight transition ease-in-out duration-500"
            >
              Ver Proyecto
            </a>
          )}
        </main>
        <div className="max-w-4xl mx-auto p-4">
          <Image
            src={project.image}
            alt={project.title}
            width={200}
            height={200}
            className="w-full mb-4"
          />
        </div>
      </section>
    </Layout>
  );
}