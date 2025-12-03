'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/personalInfo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Code,
  Layout,
  Server,
  Brain,
  Cloud,
  Database,
  Smartphone,
  Wrench,
} from 'lucide-react';

interface SkillCategory {
  name: string;
  skills: string[];
  icon: React.ReactNode;
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Programming Languages',
    skills: personalInfo.skills.languages,
    icon: <Code className="h-5 w-5" />,
  },
  {
    name: 'Frontend Development',
    skills: personalInfo.skills.frontend,
    icon: <Layout className="h-5 w-5" />,
  },
  {
    name: 'Backend Development',
    skills: personalInfo.skills.backend,
    icon: <Server className="h-5 w-5" />,
  },
  {
    name: 'AI & Machine Learning',
    skills: personalInfo.skills.ai,
    icon: <Brain className="h-5 w-5" />,
  },
  {
    name: 'Cloud & DevOps',
    skills: personalInfo.skills.cloud,
    icon: <Cloud className="h-5 w-5" />,
  },
  {
    name: 'Databases',
    skills: personalInfo.skills.databases,
    icon: <Database className="h-5 w-5" />,
  },
  {
    name: 'Mobile Development',
    skills: personalInfo.skills.mobile,
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    name: 'Development Tools',
    skills: personalInfo.skills.tools,
    icon: <Wrench className="h-5 w-5" />,
  },
];

export default function SkillsVisualization() {
  return (
    <div className="py-16 bg-background">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Technical Skills
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and the
            technologies I work with.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map(
            (category, idx) =>
              category.skills.length > 0 && (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                      <div className="bg-primary/10 p-2 rounded-full text-primary">
                        {category.icon}
                      </div>
                      <CardTitle className="text-base font-semibold">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="font-normal"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
