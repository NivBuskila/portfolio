'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/personalInfo';
import { Button } from '@/components/ui/button';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Home() {
  const words = [
    {
      text: 'Hi,',
    },
    {
      text: "I'm",
    },
    {
      text: 'Niv',
      className: 'text-primary dark:text-primary',
    },
    {
      text: 'Buskila',
      className: 'text-primary dark:text-primary',
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      </div>

      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8 z-10">
        <div className="space-y-4">
          <TypewriterEffect
            words={words}
            className="text-4xl md:text-6xl lg:text-7xl"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-xl md:text-2xl text-muted-foreground font-medium"
          >
            {personalInfo.title}
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
        >
          {personalInfo.about}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 min-w-[200px]"
        >
          <Button asChild size="lg" className="gap-2">
            <Link href="/projects">
              View Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Me</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="flex gap-6 mt-8"
        >
          <Link
            href="https://github.com/NivBuskila"
            target="_blank"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="View GitHub Profile"
          >
            <Github className="h-6 w-6" />
          </Link>
          <Link
            href="https://linkedin.com/in/nivbuskila"
            target="_blank"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="View LinkedIn Profile"
          >
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link
            href="mailto:nivbuskila@icloud.com"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Email Me"
          >
            <Mail className="h-6 w-6" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
