import { notFound } from 'next/navigation';
import { getAllProjects, getProjectBySlug } from '@/components/projectsContent';
import Layout from '@/app/layout';
import Head from 'next/head';
import Image from 'next/image';

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <Layout>
      <Head>
        <meta name="Proyecto individual" content="Proyecto realizado por Paula Villamarin" />
        <title>{project.title}</title>
      </Head>
      <section className="flex min-h-screen items-center px-24 mt-12">
        <main className="w-[50%]">
          <h1 className="font-montserrat font-bold text-whiteCream uppercase leading-none">{project.title}</h1>
          <h3 className="font-robotoMono text-green">{project.subtitle}</h3>
          <p className='italic'>{project.client}</p>
          <p className="mt-4">{project.description}</p>
          {project.url && project.url.trim() !== "" && (
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
          <Image src={project.image} alt={project.title} width={200} height={200} className="w-full mb-4" />
        </div>
      </section>
    </Layout>
  );
}