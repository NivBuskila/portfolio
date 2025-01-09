'use client';

import React from 'react';

export default function TinyReminderDemoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">TinyReminder Demo</h1>

      {/* Responsive container for the YouTube embed */}
      <div className="w-full max-w-3xl aspect-video relative">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/6WYPOGxUxes?si=FtgaRQ_O8Uz_1JFF"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-md shadow-md"
        />
      </div>

      <p className="mt-6 text-gray-600 text-center max-w-xl">
        This video is hosted on YouTube as an unlisted link. 
        <br />
        If you have any issues, please visit{' '}
        <a
          href="https://youtu.be/6WYPOGxUxes"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          this direct link
        </a>.
      </p>
    </div>
  );
}
