'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'languages' | 'tools' | 'frameworks';
  icon?: string;
}

const skillsData: Skill[] = [
  { name: 'React', category: 'frontend', icon: '⚛️' },
  { name: 'TypeScript', category: 'frontend', icon: '🔷' },
  { name: 'Next.js', category: 'frontend', icon: '▲' },
  { name: 'Tailwind CSS', category: 'frontend', icon: '🎨' },
  
  { name: 'Node.js', category: 'backend', icon: '🟢' },
  { name: 'Flask', category: 'backend', icon: '🐍' },
  { name: 'Firebase', category: 'backend', icon: '🔥' },
  
  { name: 'JavaScript', category: 'languages', icon: '🟨' },
  { name: 'Python', category: 'languages', icon: '🐍' },
  { name: 'Java', category: 'languages', icon: '☕' },
  { name: 'C', category: 'languages', icon: '⚙️' },
  
  { name: 'Git', category: 'tools', icon: '📚' },
  { name: 'Linux', category: 'tools', icon: '🐧' },
  { name: 'MongoDB', category: 'tools', icon: '🍃' },
  { name: 'AWS', category: 'tools', icon: '☁️' },
];

const categoryColors = {
  frontend: 'from-blue-500 to-cyan-500',
  backend: 'from-green-500 to-emerald-500',
  languages: 'from-purple-500 to-pink-500',
  tools: 'from-orange-500 to-red-500',
  frameworks: 'from-indigo-500 to-blue-500',
};

const SkillTag: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full
        bg-gradient-to-r ${categoryColors[skill.category]}
        text-white font-medium shadow-lg
        hover:shadow-xl transition-all duration-300
      `}
    >
      <span className="text-sm">{skill.icon}</span>
      <span className="text-sm font-medium">{skill.name}</span>
    </motion.div>
  );
};

const SkillCategory: React.FC<{ 
  title: string; 
  skills: Skill[]; 
  color: string; 
}> = ({ title, skills, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
    >
      <h3 className={`text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r ${color}`}>
        {title}
      </h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <SkillTag key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default function SkillsVisualization() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const skillsByCategory = {
    'Frontend Development': skillsData.filter(skill => skill.category === 'frontend'),
    'Backend Development': skillsData.filter(skill => skill.category === 'backend'),
    'Programming Languages': skillsData.filter(skill => skill.category === 'languages'),
    'Tools & Frameworks': skillsData.filter(skill => skill.category === 'tools'),
  };

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4 transition-colors duration-500">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-500">
            Here&apos;s an overview of the technologies and tools I work with across different domains
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <SkillCategory
            title="Frontend Development"
            skills={skillsByCategory['Frontend Development']}
            color={categoryColors.frontend}
          />
          <SkillCategory
            title="Backend Development"
            skills={skillsByCategory['Backend Development']}
            color={categoryColors.backend}
          />
          <SkillCategory
            title="Programming Languages"
            skills={skillsByCategory['Programming Languages']}
            color={categoryColors.languages}
          />
          <SkillCategory
            title="Tools & Frameworks"
            skills={skillsByCategory['Tools & Frameworks']}
            color={categoryColors.tools}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800"
        >
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            Technology Stack
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {Object.entries(skillsByCategory).map(([category, skills]) => {
              const skillCount = skills.length;
              return (
                <motion.div
                  key={category}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="p-4"
                >
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {skillCount}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {category.replace(' Development', '')} Technologies
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 