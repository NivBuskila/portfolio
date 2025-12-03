import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'TinyReminder Demo | Niv Buskila',
  description:
    'Live demonstration of TinyReminder - An Android app that prevents children from being left behind in vehicles with real-time alerts and GPS tracking.',
  openGraph: {
    title: 'TinyReminder Demo - Child Safety App',
    description:
      'Watch the demo of TinyReminder, an Android app with event-driven architecture for child safety.',
  },
};

export default function TinyReminderDemoPage() {
  return (
    <div className="container py-20 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-foreground text-center">
        TinyReminder Demo
      </h1>

      <Card className="w-full max-w-4xl overflow-hidden border-border/50 shadow-xl">
        <CardContent className="p-0 aspect-video relative bg-black">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/6WYPOGxUxes?si=FtgaRQ_O8Uz_1JFF"
            title="YouTube video player - TinyReminder Demo"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          />
        </CardContent>
      </Card>

      <div className="mt-8 text-center space-y-6">
        <p className="text-muted-foreground max-w-xl mx-auto">
          This video is hosted on YouTube as an unlisted link.
          <br />
          If you have any issues, you can watch it directly on YouTube.
        </p>

        <Button asChild variant="outline" className="gap-2">
          <a
            href="https://youtu.be/6WYPOGxUxes"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on YouTube <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
