import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TinyReminder Demo | Niv Buskila',
  description: 'Live demonstration of TinyReminder - An Android app that prevents children from being left behind in vehicles with real-time alerts and GPS tracking.',
  openGraph: {
    title: 'TinyReminder Demo - Child Safety App',
    description: 'Watch the demo of TinyReminder, an Android app with event-driven architecture for child safety.',
  },
};

export default function TinyReminderDemoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-10 px-4 transition-colors duration-500">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white transition-colors duration-500">TinyReminder Demo</h1>

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

      <p className="mt-6 text-gray-600 dark:text-gray-300 text-center max-w-xl transition-colors duration-500">
        This video is hosted on YouTube as an unlisted link. 
        <br />
        If you have any issues, please visit{' '}
        <a
          href="https://youtu.be/6WYPOGxUxes"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
        >
          this direct link
        </a>.
      </p>
    </div>
  );
}
