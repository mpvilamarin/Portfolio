// app/projects/[slug]/page.jsx

import { notFound } from 'next/navigation';
import { getAllProjects, getProjectBySlug } from '@/components/projectsContent';
import Layout from '@/app/layout';
import Head from 'next/head';
import Image from 'next/image';

// Genera las rutas estáticas en build time
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// El componente principal de la página
export default function ProjectPage({ params }) {
  // params.slug viene del folder [slug]
  const project = getProjectBySlug(params.slug);

  if (!project) {
    // Muestra la página 404
    notFound();
  }

  return (
    <Layout>
      <Head>
        <meta name="contacto" content="pagina para contactarse con Paula Villamarin" />
        <title>Contacto | </title>
      </Head>
      <section className='flex min-h-screen items-center px-24 mt-8'>
        <main className='w-[40%] '>
          <h1 className="font-montserrat text-6xl font-bold text-whiteCream">{project.title}</h1>
          <h3 className='font-robotoMono mt-4'>{project.subtitle}</h3>
          <p className="text-lg">{project.description}</p>
        </main>
        <div className="max-w-4xl mx-auto p-4">
          <Image src={project.image} alt={project.title} width={200} height={200} className="w-full mb-4" />
        </div>
      </section>
    </Layout>
  );
}
