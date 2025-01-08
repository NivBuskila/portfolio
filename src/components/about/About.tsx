import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/personalInfo';

export default function About() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-16"
        >
          {/* About Section */}
          <motion.section variants={item} className="relative">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
            </div>
            
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              About Me
            </h2>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
              {personalInfo.about}
            </p>
          </motion.section>

          {/* Skills Section */}
          <motion.section variants={item}>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              Skills
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Languages */}
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
                <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Languages</h3>
                  <ul className="mt-4 space-y-3">
                    {personalInfo.skills.languages.map((skill) => (
                      <li key={skill} className="text-gray-600 dark:text-gray-300 flex items-center">
                        <span className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full mr-3" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Frameworks */}
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
                <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Frameworks</h3>
                  <ul className="mt-4 space-y-3">
                    {personalInfo.skills.frameworks.map((skill) => (
                      <li key={skill} className="text-gray-600 dark:text-gray-300 flex items-center">
                        <span className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full mr-3" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Tools */}
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
                <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Tools</h3>
                  <ul className="mt-4 space-y-3">
                    {personalInfo.skills.tools.map((skill) => (
                      <li key={skill} className="text-gray-600 dark:text-gray-300 flex items-center">
                        <span className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full mr-3" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Education Section */}
          <motion.section variants={item}>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              Education
            </h2>
            <div className="mt-8">
              {personalInfo.education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="relative group mb-8 last:mb-0"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
                  <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">{edu.school}</p>
                    <p className="text-purple-600 dark:text-purple-400">{edu.duration}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section variants={item}>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              Experience
            </h2>
            <div className="mt-8">
              {personalInfo.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative group mb-8 last:mb-0"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
                  <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">{exp.company}</p>
                    <p className="text-purple-600 dark:text-purple-400">{exp.duration}</p>
                    <ul className="mt-4 space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-gray-600 dark:text-gray-300 flex items-start">
                          <span className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full mr-3 mt-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}