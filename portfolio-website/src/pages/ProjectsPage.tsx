import React, { useState, useMemo, Suspense } from 'react';
import { projects } from '../data/projects';
import ProjectGrid from '../components/projects/ProjectGrid';
import ProjectModal from '../components/projects/ProjectModal';
import PageTransition from '../components/animations/PageTransition';
import ScrollReveal from '../components/animations/ScrollReveal';
import { ProjectGridSkeleton } from '../components/ui/Skeleton';
import type { TechProject } from '../types';
import { TechCategory } from '../types';
import { useTranslation } from '../i18n/hooks/useTranslation';

const ProjectsPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<TechProject | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<TechCategory | 'all'>('all');

  const categoryLabels: Record<TechCategory | 'all', string> = {
    all: t('projects.categories.all'),
    [TechCategory.LLM_APPLICATION]: t('projects.categories.llmApplication'),
    [TechCategory.AGENT_DEVELOPMENT]: t('projects.categories.agentDevelopment'),
    [TechCategory.RAG_SYSTEM]: t('projects.categories.ragSystem'),
    [TechCategory.MODEL_FINETUNING]: t('projects.categories.modelFinetuning'),
    [TechCategory.ML_INFRASTRUCTURE]: t('projects.categories.mlInfrastructure'),
    [TechCategory.OPEN_SOURCE]: t('projects.categories.openSource'),
    [TechCategory.RESEARCH]: t('projects.categories.research')
  };

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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('projects.title')}</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              {t('projects.description')}
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
              {t('projects.projectCount', { count: filteredProjects.length.toString() })}
            </p>
          </div>
        </ScrollReveal>

        {/* 项目网格 */}
        <ScrollReveal delay={0.3}>
          <Suspense fallback={<ProjectGridSkeleton count={6} />}>
            <ProjectGrid 
              projects={filteredProjects} 
              onProjectClick={setSelectedProject}
            />
          </Suspense>
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
