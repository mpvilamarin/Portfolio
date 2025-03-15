"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "./projectsContent";

export default function ProjectsContainer() {
  const categories = [
    "All",
    "Website Design",
    "Social Media",
    "University",
    "Branding",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const initialCount = 6; // Valor inicial para "Ver menos"

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleShowLess = () => {
    setVisibleCount((prev) => Math.max(prev - 3, initialCount));
  };

  return (
    <div className="w-full mx-auto px-4 py-8">
      {/* Filtro de categorías */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-md font-robotoMono font-medium text-sm transition-colors
              ${
                selectedCategory === cat
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
        {displayedProjects.map((project, index) => (
          <div key={index} className="rounded-md shadow-lg hover:opacity-70 transition-opacity">
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
              <h3 className="text-base font-semibold font-montserrat text-purple">
                {project.title}
              </h3>
              <p className="text-xs font-robotoMono font-thin text-whiteCream italic">
                {project.category}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de "Ver más" y "Ver menos" */}
      <div className="flex justify-center mt-6 space-x-4">
        {filteredProjects.length > visibleCount && (
          <button
            onClick={handleShowMore}
            className="bg-green text-blackLight text-sm font-semibold rounded-md px-4 py-2 font-robotoMono hover:translate-y-1 transition ease-in-out duration-300"
          >
            Ver más
          </button>
        )}
        {visibleCount > initialCount && (
          <button
            onClick={handleShowLess}
            className="bg-transparent border-solid border-2 border-purple hover:translate-y-1 text-whiteCream text-sm font-medium rounded-md px-4 py-2 transition ease-in-out duration-300"
          >
            Ver menos
          </button>
        )}
      </div>
    </div>
  );
}