import React, { useState, useMemo } from 'react';
import { projects } from '../data/projects';
import ProjectGrid from '../components/projects/ProjectGrid';
import ProjectModal from '../components/projects/ProjectModal';
import PageTransition from '../components/animations/PageTransition';
import ScrollReveal from '../components/animations/ScrollReveal';
import type { TechProject } from '../types';
import { TechCategory } from '../types';

const categoryLabels: Record<TechCategory | 'all', string> = {
  all: '全部',
  [TechCategory.LLM_APPLICATION]: 'LLM应用',
  [TechCategory.AGENT_DEVELOPMENT]: 'Agent开发',
  [TechCategory.RAG_SYSTEM]: 'RAG系统',
  [TechCategory.MODEL_FINETUNING]: '模型微调',
  [TechCategory.ML_INFRASTRUCTURE]: 'ML基础设施',
  [TechCategory.OPEN_SOURCE]: '开源项目',
  [TechCategory.RESEARCH]: '研究项目'
};

const ProjectsPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<TechProject | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<TechCategory | 'all'>('all');

  // 筛选项目
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') {
      return projects;
    }
    return projects.filter(project => project.category === selectedCategory);
  }, [selectedCategory]);

  // 获取所有使用的分类
  const availableCategories = useMemo(() => {
    const categories = new Set(projects.map(p => p.category));
    return ['all' as const, ...Array.from(categories)];
  }, []);

  return (
    <PageTransition>
      <div className="py-12">
        {/* 页面标题和介绍 */}
        <ScrollReveal>
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">技术项目</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              探索我在AI/LLM领域的技术实践，涵盖大语言模型应用、智能代理开发、RAG系统和模型微调等方向。
            </p>
          </div>
        </ScrollReveal>

        {/* 分类筛选器 */}
        <ScrollReveal delay={0.2}>
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {availableCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              共 {filteredProjects.length} 个项目
            </p>
          </div>
        </ScrollReveal>

        {/* 项目网格 */}
        <ScrollReveal delay={0.3}>
          <ProjectGrid 
            projects={filteredProjects} 
            onProjectClick={setSelectedProject}
          />
        </ScrollReveal>

        {/* 项目详情模态框 */}
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      </div>
    </PageTransition>
  );
};

export default ProjectsPage;
