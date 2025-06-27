'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';
import { projects, Project } from '@/data/projects';

const filterCategories = [
  { label: 'All', value: 'all' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'AI/ML', value: 'ai' },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(project => {
        switch (activeFilter) {
          case 'frontend':
            return project.tech.some(tech => 
              ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript'].includes(tech)
            );
          case 'backend':
            return project.tech.some(tech => 
              ['Node.js', 'Flask', 'FastAPI', 'Python', 'MongoDB', 'Firebase', 'AWS Rekognition', 'Supabase', 'Express.js'].includes(tech)
            );
          case 'mobile':
            return project.tech.some(tech => 
              ['Java', 'Android SDK', 'ML Kit', 'CameraX', 'Retrofit'].includes(tech)
            );
          case 'ai':
            return project.tech.some(tech => 
              ['AWS Rekognition', 'ML Kit', 'AI', 'LangChain', 'Gemini API', 'RAG'].includes(tech)
            ) || project.title.toLowerCase().includes('ai') || project.title.toLowerCase().includes('chatbot');
          default:
            return true;
        }
      });
    }

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  }, [activeFilter, searchTerm]);

  return (
    <div
      className="
        relative
        min-h-screen
        bg-gradient-to-b
        from-purple-50
        to-pink-50
        dark:from-gray-900
        dark:to-purple-900
        py-16
        transition-colors
        duration-500
      "
    >
      <motion.div
        className="
          absolute
          w-80
          h-80
          bg-purple-200
          dark:bg-purple-800/30
          rounded-full
          mix-blend-multiply
          filter
          blur-3xl
          opacity-50
          top-[-8rem]
          left-[-8rem]
        "
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
      />

      <motion.div
        className="
          absolute
          w-96
          h-96
          bg-pink-200
          dark:bg-pink-800/30
          rounded-full
          mix-blend-multiply
          filter
          blur-3xl
          opacity-50
          bottom-[-8rem]
          right-[-8rem]
        "
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white mb-4 transition-colors duration-500">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Projects</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto transition-colors duration-500">
            Here are some of the projects I&apos;ve built, showcasing my skills across different technologies and domains
          </p>
        </motion.div>

                  <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
                      <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                  w-full
                  px-4
                  py-3
                  pl-12
                  rounded-full
                  border
                  border-gray-300
                  dark:border-gray-600
                  bg-white/80
                  dark:bg-gray-800/80
                  backdrop-blur-md
                  text-gray-900
                  dark:text-white
                  placeholder-gray-500
                  dark:placeholder-gray-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-500
                  focus:border-transparent
                  transition-all
                  duration-300
                "
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

                      <div className="flex flex-wrap justify-center gap-3">
            {filterCategories.map((category) => (
              <motion.button
                key={category.value}
                onClick={() => setActiveFilter(category.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  px-6 py-3 rounded-full font-medium transition-all duration-300
                  ${activeFilter === category.value
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }
                  backdrop-blur-md
                `}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

                  <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-500">
            Showing {filteredProjects.length} of {projects.length} projects
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </motion.div>

                  <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter + searchTerm}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-8 lg:grid-cols-2"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <FadeIn key={`${project.title}-${activeFilter}`} delay={index * 0.1}>
              <GlassProjectCard project={project} />
            </FadeIn>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-full text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-500">
                  No projects found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-500">
                  Try adjusting your search terms or filters
                </p>
                <button
                  onClick={() => {
                    setActiveFilter('all');
                    setSearchTerm('');
                  }}
                  className="
                    px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500
                    text-white rounded-full font-medium
                    hover:scale-105 transition-transform duration-300
                  "
                >
                  Show All Projects
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function GlassProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="
        bg-white/80
        dark:bg-gray-800/80
        backdrop-blur-md
        border
        border-gray-200
        dark:border-gray-700
        rounded-2xl
        shadow-lg
        dark:shadow-2xl
        overflow-hidden
        flex
        flex-col
        transition-all
        duration-300
        hover:shadow-xl
      "
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3 transition-colors duration-500">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 flex-grow mb-4 leading-relaxed transition-colors duration-500">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="
                inline-flex
                items-center
                px-3
                py-1
                rounded-full
                text-sm
                font-medium
                bg-purple-100
                dark:bg-purple-900/30
                text-purple-800
                dark:text-purple-300
                border
                border-purple-200
                dark:border-purple-700
                transition-colors
                duration-500
              "
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              flex-1
              inline-flex
              items-center
              justify-center
              gap-2
              px-4
              py-3
              border
              border-transparent
              text-sm
              font-medium
              rounded-full
              shadow-lg
              text-white
              bg-gradient-to-r
              from-purple-600
              to-blue-600
              hover:from-purple-700
              hover:to-blue-700
              transition-all
              duration-300
            "
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </motion.a>
          
          {project.title === 'TinyReminder' ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
            <Link
              href="/tinyreminder-demo"
              className="
                  w-full
                inline-flex
                items-center
                  justify-center
                  gap-2
                px-4
                  py-3
                border
                border-gray-300
                  dark:border-gray-600
                text-sm
                font-medium
                rounded-full
                text-gray-700
                  dark:text-gray-300
                bg-white
                  dark:bg-gray-700
                hover:bg-gray-50
                  dark:hover:bg-gray-600
                  transition-all
                  duration-300
                  shadow-lg
              "
            >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              Live Demo
            </Link>
            </motion.div>
          ) : project.demo ? (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                flex-1
                inline-flex
                items-center
                justify-center
                gap-2
                px-4
                py-3
                border
                border-gray-300
                dark:border-gray-600
                text-sm
                font-medium
                rounded-full
                text-gray-700
                dark:text-gray-300
                bg-white
                dark:bg-gray-700
                hover:bg-gray-50
                dark:hover:bg-gray-600
                transition-all
                duration-300
                shadow-lg
              "
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </motion.a>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
