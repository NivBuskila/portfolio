'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/projects/ProjectCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

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
      filtered = filtered.filter((project) => {
        switch (activeFilter) {
          case 'frontend':
            return project.tech.some((tech) =>
              [
                'React',
                'Next.js',
                'TypeScript',
                'Tailwind CSS',
                'JavaScript',
              ].includes(tech)
            );
          case 'backend':
            return project.tech.some((tech) =>
              [
                'Node.js',
                'Flask',
                'FastAPI',
                'Python',
                'MongoDB',
                'Firebase',
                'AWS Rekognition',
                'Supabase',
                'Express.js',
              ].includes(tech)
            );
          case 'mobile':
            return project.tech.some((tech) =>
              ['Java', 'Android SDK', 'ML Kit', 'CameraX', 'Retrofit'].includes(
                tech
              )
            );
          case 'ai':
            return (
              project.tech.some((tech) =>
                [
                  'AWS Rekognition',
                  'ML Kit',
                  'AI',
                  'LangChain',
                  'Gemini API',
                  'RAG',
                ].includes(tech)
              ) ||
              project.title.toLowerCase().includes('ai') ||
              project.title.toLowerCase().includes('chatbot')
            );
          default:
            return true;
        }
      });
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.tech.some((tech) =>
            tech.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    return filtered;
  }, [activeFilter, searchTerm]);

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            My Projects
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Showcasing my journey through code, from mobile apps to full-stack
            web solutions.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {filterCategories.map((category) => (
              <Button
                key={category.value}
                variant={
                  activeFilter === category.value ? 'default' : 'outline'
                }
                onClick={() => setActiveFilter(category.value)}
                size="sm"
                className="rounded-full"
              >
                {category.label}
              </Button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter + searchTerm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No projects found matching your criteria.
                </p>
                <Button
                  variant="link"
                  onClick={() => {
                    setActiveFilter('all');
                    setSearchTerm('');
                  }}
                  className="mt-2"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
