'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/personalInfo';
import SkillsVisualization from './SkillsVisualization';

export default function About() {
  return (
    <div className="relative min-h-screen">
      <div
        className="
          relative
          bg-gradient-to-b
          from-blue-50
          to-purple-50
          dark:from-gray-900
          dark:to-purple-900
          overflow-hidden
          py-20
          transition-colors
          duration-500
        "
      >
        <motion.div
          className="
            absolute
            w-80
            h-80
            bg-purple-200
            dark:bg-purple-800/30
            rounded-full
            mix-blend-multiply
            filter
            blur-3xl
            opacity-50
            top-[-5rem]
            left-[-5rem]
          "
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse' }}
        />

        <motion.div
          className="
            absolute
            w-96
            h-96
            bg-blue-200
            dark:bg-blue-800/30
            rounded-full
            mix-blend-multiply
            filter
            blur-3xl
            opacity-50
            bottom-[-8rem]
            right-[-8rem]
          "
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-white mb-6 transition-colors duration-500">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Me</span>
            </h1>
            <p className="max-w-4xl mx-auto text-xl text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-500">
              {personalInfo.about}
            </p>
          </motion.div>
        </div>
      </div>

      <SkillsVisualization />

      <div className="bg-gray-50 dark:bg-gray-800 py-16 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <SectionBlock title="Education" icon="🎓">
              <div className="space-y-6">
                {personalInfo.education.map((edu, idx) => (
                  <EducationCard
                    key={idx}
                    degree={edu.degree}
                    school={edu.school}
                    duration={edu.duration}
                    index={idx}
                  />
                ))}
              </div>
            </SectionBlock>

            <SectionBlock title="Experience" icon="💼">
              <div className="space-y-6">
                {personalInfo.experience.map((exp, idx) => (
                  <ExperienceCard
                    key={idx}
                    title={exp.title}
                    company={exp.company}
                    duration={exp.duration}
                    description={exp.description}
                    index={idx}
                  />
                ))}
              </div>
            </SectionBlock>
          </div>
        </div>
      </div>

              <div className="bg-white dark:bg-gray-900 py-16 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionBlock title="Personal Highlights" icon="⭐">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <HighlightCard
                title="Problem Solver"
                description="Passionate about finding elegant solutions to complex technical challenges"
                icon="🧠"
                index={0}
              />
              <HighlightCard
                title="Continuous Learner"
                description="Always exploring new technologies and staying updated with industry trends"
                icon="📚"
                index={1}
              />
              <HighlightCard
                title="Team Player"
                description="Strong communication skills and experience working in collaborative environments"
                icon="🤝"
                index={2}
              />
            </div>
          </SectionBlock>
        </div>
      </div>
    </div>
  );
}

function SectionBlock({ 
  title, 
  children, 
  icon 
}: { 
  title: string; 
  children: React.ReactNode; 
  icon?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-8">
        {icon && <span className="text-3xl">{icon}</span>}
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white transition-colors duration-500">
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

function EducationCard({
  degree,
  school,
  duration,
  index
}: {
  degree: string;
  school: string;
  duration: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="
        relative
        bg-white/80
        dark:bg-gray-800/80
        backdrop-blur-md
        border
        border-gray-200
        dark:border-gray-700
        rounded-2xl
        p-6
        shadow-lg
        transition-all
        duration-300
        hover:shadow-xl
      "
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 transition-colors duration-500">
            {degree}
          </h3>
          <p className="text-purple-600 dark:text-purple-400 font-medium mb-1 transition-colors duration-500">
            {school}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500">
            {duration}
          </p>
        </div>
        <div className="text-2xl">🎓</div>
      </div>
    </motion.div>
  );
}

function ExperienceCard({
  title,
  company,
  duration,
  description,
  index
}: {
  title: string;
  company: string;
  duration: string;
  description: string[];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="
        relative
        bg-white/80
        dark:bg-gray-800/80
        backdrop-blur-md
        border
        border-gray-200
        dark:border-gray-700
        rounded-2xl
        p-6
        shadow-lg
        transition-all
        duration-300
        hover:shadow-xl
      "
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 transition-colors duration-500">
            {title}
          </h3>
          <p className="text-purple-600 dark:text-purple-400 font-medium mb-1 transition-colors duration-500">
            {company}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500">
            {duration}
          </p>
        </div>
        <div className="text-2xl">💼</div>
      </div>
      
      <ul className="space-y-2">
        {description.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (index * 0.1) + (i * 0.05) }}
            className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm transition-colors duration-500"
          >
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function HighlightCard({
  title,
  description,
  icon,
  index
}: {
  title: string;
  description: string;
  icon: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="
        bg-gradient-to-br
        from-purple-50
        to-blue-50
        dark:from-purple-900/20
        dark:to-blue-900/20
        border
        border-purple-200
        dark:border-purple-800
        rounded-2xl
        p-6
        text-center
        transition-all
        duration-300
        hover:shadow-lg
      "
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 transition-colors duration-500">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed transition-colors duration-500">
        {description}
      </p>
    </motion.div>
  );
}
