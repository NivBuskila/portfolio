'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/personalInfo';

interface SkillCategory {
  name: string;
  skills: string[];
  icon: string;
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Programming Languages',
    skills: personalInfo.skills.languages,
    icon: '💻',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Frontend Development',
    skills: personalInfo.skills.frontend,
    icon: '🎨',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Backend Development',
    skills: personalInfo.skills.backend,
    icon: '⚙️',
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'AI & Machine Learning',
    skills: personalInfo.skills.ai,
    icon: '🤖',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    name: 'Cloud & DevOps',
    skills: personalInfo.skills.cloud,
    icon: '☁️',
    color: 'from-sky-500 to-blue-500',
  },
  {
    name: 'Databases',
    skills: personalInfo.skills.databases,
    icon: '🗄️',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'Mobile Development',
    skills: personalInfo.skills.mobile,
    icon: '📱',
    color: 'from-green-400 to-blue-500',
  },
  {
    name: 'Development Tools',
    skills: personalInfo.skills.tools,
    icon: '🛠️',
    color: 'from-gray-600 to-gray-800',
  },
];

const SkillTag: React.FC<{ skill: string; index: number; color: string }> = ({ skill, index, color }) => {
  return (
    <motion.div
      initial={false}
      whileHover={{ scale: 1.05 }}
      className={`
        inline-flex items-center px-3 py-2 rounded-full
        bg-gradient-to-r ${color}
        text-white font-medium shadow-md
        hover:shadow-lg transition-all duration-300
        text-sm
      `}
    >
      {skill}
    </motion.div>
  );
};

const SkillCategoryCard: React.FC<{ 
  category: SkillCategory;
  index: number;
}> = ({ category, index }) => {
  if (category.skills.length === 0) return null;
  
  return (
    <motion.div
      initial={false}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{category.icon}</span>
        <h3 className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${category.color}`}>
          {category.name}
        </h3>
        <span className="ml-auto text-sm text-gray-500 dark:text-gray-400 font-medium">
          {category.skills.length} skills
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, skillIndex) => (
          <SkillTag 
            key={skill} 
            skill={skill} 
            index={skillIndex} 
            color={category.color} 
          />
        ))}
      </div>
    </motion.div>
  );
};

export default function SkillsVisualization() {

  const totalSkills = skillCategories.reduce((total, category) => total + category.skills.length, 0);
  const visibleCategories = skillCategories.filter(category => category.skills.length > 0);

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4 transition-colors duration-500">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-500">
            Comprehensive expertise across {visibleCategories.length} technology domains with {totalSkills}+ proven skills
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {visibleCategories.map((category, index) => (
            <SkillCategoryCard
              key={category.name}
              category={category}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={false}
          className="mt-12 bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Skills Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <motion.div
              initial={false}
              className="p-4"
            >
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {totalSkills}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Total Skills
              </div>
            </motion.div>
            <motion.div
              initial={false}
              className="p-4"
            >
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {visibleCategories.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Tech Domains
              </div>
            </motion.div>
            <motion.div
              initial={false}
              className="p-4"
            >
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {personalInfo.skills.languages.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Programming Languages
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 