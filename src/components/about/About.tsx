'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/personalInfo';

export default function About() {
  return (
    <div
      className="
        relative
        min-h-screen
        bg-gradient-to-b
        from-blue-50
        to-purple-50
        overflow-hidden
        py-16
      "
    >
      <motion.div
        className="
          absolute
          w-80
          h-80
          bg-purple-200
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h1
          className="text-5xl font-extrabold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h1>

        <motion.p
          className="max-w-3xl text-xl text-gray-700 leading-relaxed mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {personalInfo.about}
        </motion.p>

        <SectionBlock title="Skills">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <GlassCard title="Languages" items={personalInfo.skills.languages} />
            <GlassCard title="Frameworks" items={personalInfo.skills.frameworks} />
            <GlassCard title="Tools" items={personalInfo.skills.tools} />
          </div>
        </SectionBlock>

        <SectionBlock title="Education">
          <div className="space-y-6">
            {personalInfo.education.map((edu, idx) => (
              <GlassDetail
                key={idx}
                main={edu.degree}
                sub={edu.school}
                duration={edu.duration}
              />
            ))}
          </div>
        </SectionBlock>

        <SectionBlock title="Experience">
          <div className="space-y-6">
            {personalInfo.experience.map((exp, idx) => (
              <GlassDetail
                key={idx}
                main={exp.title}
                sub={exp.company}
                duration={exp.duration}
                description={exp.description}
              />
            ))}
          </div>
        </SectionBlock>
      </div>
    </div>
  );
}

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
      {children}
    </motion.section>
  );
}

function GlassCard({ title, items }: { title: string; items: string[] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="
        relative
        bg-white/70
        backdrop-blur-sm
        border
        border-gray-200
        rounded-2xl
        p-6
        shadow-sm
      "
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <ul className="space-y-2 text-gray-700">
        {items.map((item) => (
          <li key={item} className="flex items-center">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function GlassDetail({
  main,
  sub,
  duration,
  description,
}: {
  main: string;
  sub: string;
  duration: string;
  description?: string[];
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="
        relative
        bg-white/70
        backdrop-blur-sm
        border
        border-gray-200
        rounded-2xl
        p-6
        shadow-sm
      "
    >
      <h3 className="text-xl font-semibold text-gray-800">{main}</h3>
      <p className="text-gray-600">{sub}</p>
      <p className="text-sm text-purple-600">{duration}</p>
      {description && (
        <ul className="list-disc list-inside mt-3 text-gray-700 space-y-1">
          {description.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
