'use client';

import React from 'react';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  thumbnail: string;
  github: string;
  demo?: string;
  
}

const ProjectCard = React.memo<ProjectCardProps>(({
  title,
  description,
  tech,
  thumbnail,
  github,
  demo,
}) => {
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
      <div className="relative h-48">
        <Image
          src={thumbnail}
          alt={`${title} thumbnail`}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
          <p className="text-base text-gray-500 mb-4">{description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800"
              >
                {item}
              </span>
            ))}
          </div>

        </div>

        <div className="mt-6 flex gap-4">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            GitHub
          </a>
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
