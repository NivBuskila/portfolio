'use client';

import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { personalInfo } from '@/data/personalInfo';

export default function About() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* About Me Section */}
          <FadeIn>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">About Me</h2>
              <div className="mt-6 text-gray-500 space-y-6">
                <p className="text-lg">{personalInfo.about}</p>
              </div>
            </div>
          </FadeIn>

          {/* Skills Section */}
          <FadeIn delay={0.2}>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Skills</h2>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Frontend</h3>
                  <ul className="space-y-2">
                    {personalInfo.skills.frontend.map((skill) => (
                      <li key={skill} className="text-gray-600">{skill}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Backend</h3>
                  <ul className="space-y-2">
                    {personalInfo.skills.backend.map((skill) => (
                      <li key={skill} className="text-gray-600">{skill}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Tools & Others</h3>
                  <ul className="space-y-2">
                    {personalInfo.skills.tools.map((skill) => (
                      <li key={skill} className="text-gray-600">{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Experience Section */}
          <FadeIn delay={0.4}>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Experience</h2>
              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="space-y-8">
                  {personalInfo.experience.map((exp, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                      <p className="text-lg text-gray-500">{exp.company} • {exp.duration}</p>
                      <ul className="mt-4 text-gray-500 list-disc list-inside space-y-2">
                        {exp.description.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}