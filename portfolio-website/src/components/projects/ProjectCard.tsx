import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, FileText } from 'lucide-react';
import type { TechProject } from '../../types';

interface ProjectCardProps {
  project: TechProject;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group"
      whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={onClick}
    >
      {/* 项目缩略图 */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-6xl opacity-20">🚀</span>
        </div>
        {project.featured && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold">
            精选
          </div>
        )}
      </div>

      {/* 项目内容 */}
      <div className="p-6">
        {/* 标题和副标题 */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="text-sm text-gray-500 mb-3">{project.subtitle}</p>
        )}

        {/* 描述 */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* 技术栈 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* 链接 */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} />
              <span>代码</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} />
              <span>演示</span>
            </a>
          )}
          {project.documentation && (
            <a
              href={project.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <FileText size={16} />
              <span>文档</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
