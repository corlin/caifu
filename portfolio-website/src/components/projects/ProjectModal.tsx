import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, FileText } from 'lucide-react';
import type { TechProject } from '../../types';

interface ProjectModalProps {
  project: TechProject | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // 关闭模态框时禁用背景滚动
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  // ESC键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* 模态框内容 */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 关闭按钮 */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
                  aria-label="关闭"
                >
                  <X size={20} className="text-gray-600" />
                </button>

                {/* 项目头部 */}
                <div className="relative h-64 bg-gradient-to-br from-blue-500 to-purple-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-8xl opacity-20">🚀</span>
                  </div>
                </div>

                {/* 项目内容 */}
                <div className="p-8">
                  {/* 标题和副标题 */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h2>
                  {project.subtitle && (
                    <p className="text-lg text-gray-600 mb-6">{project.subtitle}</p>
                  )}

                  {/* 链接按钮 */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <Github size={18} />
                        <span>查看代码</span>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <ExternalLink size={18} />
                        <span>在线演示</span>
                      </a>
                    )}
                    {project.documentation && (
                      <a
                        href={project.documentation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <FileText size={18} />
                        <span>技术文档</span>
                      </a>
                    )}
                  </div>

                  {/* 项目描述 */}
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">项目简介</h3>
                    <p className="text-gray-700 leading-relaxed">{project.description}</p>
                  </section>

                  {/* 技术栈 */}
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">技术栈</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>

                  {/* 技术细节 */}
                  {project.technicalDetails && (
                    <section className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">技术细节</h3>
                      <p className="text-gray-700 leading-relaxed">{project.technicalDetails}</p>
                    </section>
                  )}

                  {/* 技术架构 */}
                  {project.architecture && (
                    <section className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">技术架构</h3>
                      <p className="text-gray-700 leading-relaxed">{project.architecture}</p>
                    </section>
                  )}

                  {/* 挑战与解决方案 */}
                  {(project.challenges || project.solutions) && (
                    <section className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">挑战与解决方案</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {project.challenges && project.challenges.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">技术挑战</h4>
                            <ul className="space-y-2">
                              {project.challenges.map((challenge, index) => (
                                <li key={index} className="flex items-start gap-2 text-gray-700">
                                  <span className="text-red-500 mt-1">•</span>
                                  <span>{challenge}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {project.solutions && project.solutions.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">解决方案</h4>
                            <ul className="space-y-2">
                              {project.solutions.map((solution, index) => (
                                <li key={index} className="flex items-start gap-2 text-gray-700">
                                  <span className="text-green-500 mt-1">✓</span>
                                  <span>{solution}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </section>
                  )}

                  {/* 项目年份 */}
                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">完成时间: {project.year}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
