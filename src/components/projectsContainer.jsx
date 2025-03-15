"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "./projectsContent";

export default function ProjectsContainer() {
  // Categorías
  const categories = [
    "All",
    "Website Design",
    "Social Media",
    "University",
    "Branding",
  ];

  // Estado para la categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filtrado de proyectos según la categoría
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full mx-auto px-4 py-8">
      {/* Filtro de categorías */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-md font-robotoMono font-medium text-sm transition-colors
              ${selectedCategory === cat
                ? "bg-purple text-blackLight font-bold"
                : "border-2 border-solid border-green text-whiteCream hover:border-purple"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <div key={index} className="rounded-md shadow-lg">
            <Link href={`/projects/${project.slug}`}>
              <Image
                src={project.image}
                alt={project.title}
                width={500}
                height={300}
                className="w-full h-[300px] object-cover object-top"
              />
            </Link>
            <div className="flex justify-between items-center bg-black px-4 py-2">
              <h3 className="text-base font-semibold font-montserrat text-purple">{project.title}</h3>
              <p className="text-xs font-robotoMono font-thin text-whiteCream italic">{project.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}