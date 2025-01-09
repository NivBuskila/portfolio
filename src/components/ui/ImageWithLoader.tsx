// PATH: src/components/ui/ImageWithLoader.tsx

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithLoader = ({ src, alt, className = '' }: ImageWithLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover duration-700 ease-in-out ${
          isLoading ? 'scale-105 blur-lg' : 'scale-100 blur-0'
        } ${className}`}
        onLoadingComplete={() => setIsLoading(false)}
        sizes="(max-width: 768px) 50vw, 33vw"
        quality={90}
      />
    </div>
  );
};

export default ImageWithLoader;