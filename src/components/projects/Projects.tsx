'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';
import { projects } from '@/data/projects';

export default function Projects() {
  return (
    <div
      className="
        relative
        min-h-screen
        bg-gradient-to-b
        from-purple-50
        to-pink-50
        py-16
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <motion.h1
          className="text-5xl font-extrabold text-gray-800 mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My Projects
        </motion.h1>
        <motion.p
          className="text-gray-600 text-xl max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Here are some of the projects I’ve worked on
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <GlassProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}

function GlassProjectCard({ project }: { project: any }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="
        bg-white/70
        backdrop-blur-md
        border
        border-gray-200
        rounded-2xl
        shadow-sm
        overflow-hidden
        flex
        flex-col
      "
    >
      <div className="relative w-full h-48">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-gray-800">
          {project.title}
        </h3>
        <p className="mt-3 text-gray-600 flex-grow">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech: string) => (
            <span
              key={tech}
              className="
                inline-flex
                items-center
                px-2.5
                py-0.5
                rounded-md
                text-sm
                font-medium
                bg-purple-100
                text-purple-800
              "
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-6 flex space-x-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              px-4
              py-2
              border
              border-transparent
              text-sm
              font-medium
              rounded-full
              shadow
              text-white
              bg-purple-600
              hover:bg-purple-700
            "
          >
            GitHub
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                px-4
                py-2
                border
                border-gray-300
                text-sm
                font-medium
                rounded-full
                text-gray-700
                bg-white
                hover:bg-gray-50
              "
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
