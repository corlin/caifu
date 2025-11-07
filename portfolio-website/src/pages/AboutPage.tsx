import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Lightbulb, 
  TrendingUp, 
  BookOpen,
  Target,
  Rocket,
  Building2,
  GraduationCap
} from 'lucide-react';
import {
  personalInfo,
  professionalBackground,
  techMethodology,
  bestPractices,
  techEvolution,
  learningPath,
  currentFocus,
  achievements,
  certifications,
  recommendations
} from '../data/aboutData';
import Achievements from '../components/about/Achievements';

const AboutPage: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    '🎯': <Target className="w-8 h-8 text-blue-600" />,
    '🚀': <Rocket className="w-8 h-8 text-blue-600" />,
    '🏗️': <Building2 className="w-8 h-8 text-blue-600" />,
    '📚': <BookOpen className="w-8 h-8 text-blue-600" />
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            关于我
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {personalInfo.bio}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              {personalInfo.experience}
            </span>
            <span>•</span>
            <span>{personalInfo.title}</span>
          </div>
        </motion.div>

        {/* Professional Background */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-blue-600" />
            专业背景
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {professionalBackground.summary}
          </p>
          <div className="grid gap-4">
            {professionalBackground.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700">{highlight}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech Methodology */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Target className="w-8 h-8 text-blue-600" />
            {techMethodology.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {techMethodology.principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">
                  {iconMap[principle.icon]}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {principle.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Best Practices */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Code2 className="w-8 h-8 text-blue-600" />
            技术最佳实践
          </h2>
          <div className="space-y-8">
            {bestPractices.map((practice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {practice.category}
                </h3>
                <ul className="space-y-3">
                  {practice.practices.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech Evolution */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            技术栈演进历程
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200" />
            
            <div className="space-y-8">
              {techEvolution.map((evolution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="relative pl-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-2.5 top-2 w-3 h-3 bg-blue-600 rounded-full border-4 border-white" />
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-blue-600">
                        {evolution.period}
                      </span>
                      <span className="text-sm text-gray-500">
                        {evolution.focus}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{evolution.milestone}</p>
                    <div className="flex flex-wrap gap-2">
                      {evolution.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Learning Path */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            学习路径与技术成长
          </h2>
          <div className="space-y-6">
            {learningPath.map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {path.phase}
                </h3>
                <p className="text-gray-600 mb-4">{path.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    核心技能
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {path.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {path.projects && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      实践项目
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {path.projects.map((project, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-lg"
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Current Focus */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Rocket className="w-8 h-8 text-blue-600" />
            当前研究方向
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {currentFocus.areas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {area.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      area.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {area.status === 'active' ? '进行中' : '探索中'}
                  </span>
                </div>
                <p className="text-gray-600">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Achievements
            achievements={achievements}
            recommendations={recommendations}
            certifications={certifications}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
