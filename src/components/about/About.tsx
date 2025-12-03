'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/personalInfo';
import SkillsVisualization from './SkillsVisualization';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap,
  Briefcase,
  Star,
  BookOpen,
  Code,
  Smartphone,
} from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        </div>

        <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              About <span className="text-primary">Me</span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
              {personalInfo.about}
            </p>
          </motion.div>
        </div>
      </div>

      <SkillsVisualization />

      {/* Education & Experience */}
      <div className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Education */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold tracking-tight">Education</h2>
              </div>
              <div className="space-y-6">
                {personalInfo.education.map((edu, idx) => (
                  <Card key={idx} className="border-l-4 border-l-primary">
                    <CardHeader>
                      <CardTitle>{edu.degree}</CardTitle>
                      <CardDescription className="text-base font-medium text-primary">
                        {edu.school}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">
                        {edu.duration}
                      </p>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Briefcase className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold tracking-tight">
                  Experience
                </h2>
              </div>
              <div className="space-y-6">
                {personalInfo.experience.map((exp, idx) => (
                  <Card key={idx} className="border-l-4 border-l-primary">
                    <CardHeader>
                      <CardTitle>{exp.title}</CardTitle>
                      <CardDescription className="text-base font-medium text-primary">
                        {exp.company}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">
                        {exp.duration}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {exp.description.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="py-16 bg-background">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Star className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight text-center">
              Personal Highlights
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-muted/50 border-none shadow-none hover:bg-muted transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Problem Solver</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Passionate about finding elegant solutions to complex technical
                challenges
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-none shadow-none hover:bg-muted transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Continuous Learner</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Always exploring new technologies and staying updated with
                industry trends
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-none shadow-none hover:bg-muted transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Team Player</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Strong communication skills and experience working in
                collaborative environments
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Technologies & Resources */}
      <div className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <Smartphone className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight">
              Technologies & Resources
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Frontend Development</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Building responsive, accessible, and performant user
                  interfaces using the latest React ecosystem tools.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Backend & Mobile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">Android (Java/Kotlin)</Badge>
                  <Badge variant="secondary">Firebase</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Developing robust backend services and native mobile
                  applications with a focus on scalability.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
