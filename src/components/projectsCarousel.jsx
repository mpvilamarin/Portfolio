"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { projects } from "./projectsContent";
import Link from "next/link";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProjectsCarousel() {
  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    cssEase: "linear",
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <Slider {...settings}>
        {projects.map((project, index) => (
          <div key={index} className="p-4">
            <div className="relative group overflow-hidden rounded-sm shadow-lg h-[340px] cursor-pointer">
              <Link href={`/projects/${project.slug}`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </Link>
              <div className="absolute inset-0 pt-8 bg-black bg-opacity-95 flex flex-col justify-top items-center px-4 transition-transform duration-500 ease-in-out group-hover:translate-y-full">
                <h3 className="text-xl font-bold text-white uppercase text-center">{project.title}</h3>
                <p className="text-sm text-gray-300 text-center">{project.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
