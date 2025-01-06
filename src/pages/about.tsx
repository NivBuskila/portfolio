import React from 'react';

const skills = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'Express', 'MongoDB'] },
  { category: 'Tools & Others', items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Agile'] },
];

export default function About() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* About Me Section */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">About Me</h2>
            <div className="mt-6 text-gray-500 space-y-6">
              <p className="text-lg">
                I&apos;m a software developer with a passion for building efficient and scalable applications.
                My journey in software development began with curiosity and has evolved into a
                professional career focused on creating impactful solutions.
              </p>
              <p className="text-lg">
                I enjoy taking on complex problems and turning them into simple and beautiful interface
                designs. I also love the logic and structure of coding and always strive to write
                elegant and efficient code.
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Skills</h2>
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {skillGroup.category}
                  </h3>
                  <ul className="space-y-2">
                    {skillGroup.items.map((skill) => (
                      <li key={skill} className="text-gray-600">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Experience</h2>
            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="space-y-8">
                {/* Add your experience items here */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Software Developer</h3>
                  <p className="text-lg text-gray-500">Company Name • 2020 - Present</p>
                  <ul className="mt-4 text-gray-500 list-disc list-inside space-y-2">
                    <li>Developed and maintained various web applications</li>
                    <li>Collaborated with cross-functional teams</li>
                    <li>Implemented new features and optimized existing ones</li>
                  </ul>
                </div>
                {/* Add more experience items as needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}