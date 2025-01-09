// PATH: src/components/projects/ProjectGallery.tsx

import React from 'react';
import ImageWithLoader from '../ui/ImageWithLoader';

interface ProjectGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
}

const ProjectGallery = ({ images }: ProjectGalleryProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {images.map((image, index) => (
        <div 
          key={index} 
          className="relative aspect-[9/19] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
        >
          <ImageWithLoader
            src={image.src}
            alt={image.alt}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectGallery;