import React, { useState } from 'react';
import { ExternalLink, Github, FileText, Sparkles, Beaker, Code2, Lightbulb } from 'lucide-react';
import PageTransition from '../components/animations/PageTransition';
import ScrollReveal from '../components/animations/ScrollReveal';
import { labExperiments, researchAreas, openSourceContributions, type LabExperiment } from '../data/labData';
import { useTranslation } from '../i18n/hooks/useTranslation';

const LabPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: t('lab.categories.all'), icon: Sparkles },
    { id: 'research', label: t('lab.categories.research'), icon: Beaker },
    { id: 'prototype', label: t('lab.categories.prototype'), icon: Code2 },
    { id: 'open-source', label: t('lab.categories.openSource'), icon: Github },
    { id: 'innovation', label: t('lab.categories.innovation'), icon: Lightbulb }
  ];

  const filteredExperiments = selectedCategory === 'all'
    ? labExperiments
    : labExperiments.filter(exp => exp.category === selectedCategory);

  const getStatusBadge = (status: LabExperiment['status']) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    const labels = {
      active: t('lab.status.active'),
      completed: t('lab.status.completed'),
      archived: t('lab.status.archived')
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <PageTransition>
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Beaker className="text-primary" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('lab.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('lab.subtitle')}
          </p>
        </section>

        {/* Research Areas */}
        <section>
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('lab.researchAreas')}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchAreas.map((area, index) => (
              <ScrollReveal key={area.title} delay={index * 0.1}>
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors">
                  <div className="text-4xl mb-3">{area.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t(area.title)}
                  </h3>
                  <p className="text-sm text-gray-600">{t(area.description)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Experiments Section */}
        <section>
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('lab.experiments')}</h2>
          </ScrollReveal>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={18} className="mr-2" />
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Experiments Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredExperiments.map((experiment, index) => (
              <ScrollReveal key={experiment.id} delay={index * 0.1}>
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 flex-1">
                      {t(experiment.title)}
                    </h3>
                    {getStatusBadge(experiment.status)}
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {t(experiment.description)}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {experiment.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      {t('lab.highlights')}
                    </h4>
                    <ul className="space-y-1">
                      {experiment.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{t(highlight)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact */}
                  {experiment.impact && (
                    <div className="mb-4 p-3 bg-primary/5 rounded-lg">
                      <p className="text-sm text-primary font-medium">
                        💡 {t(experiment.impact)}
                      </p>
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                    {experiment.githubUrl && (
                      <a
                        href={experiment.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
                      >
                        <Github size={16} className="mr-1" />
                        GitHub
                      </a>
                    )}
                    {experiment.demoUrl && (
                      <a
                        href={experiment.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
                      >
                        <ExternalLink size={16} className="mr-1" />
                        {t('lab.demo')}
                      </a>
                    )}
                    {experiment.documentation && (
                      <a
                        href={experiment.documentation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
                      >
                        <FileText size={16} className="mr-1" />
                        {t('lab.documentation')}
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Open Source Contributions */}
        <section className="bg-gray-50 -mx-4 px-4 py-12 rounded-lg">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('lab.openSource')}</h2>
            <p className="text-gray-600 mb-8 max-w-2xl">
              {t('lab.openSourceDescription')}
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {openSourceContributions.map((contribution, index) => (
              <ScrollReveal key={contribution.project} delay={index * 0.1}>
                <a
                  href={contribution.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white p-6 rounded-lg border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <div className="flex items-center mb-3">
                    <Github className="text-gray-900 mr-2" size={24} />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {contribution.project}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    {t(contribution.contributions)}
                  </p>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('lab.cta.title')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('lab.cta.description')}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              {t('lab.cta.contact')}
              <ExternalLink className="ml-2" size={18} />
            </a>
          </ScrollReveal>
        </section>
      </div>
    </PageTransition>
  );
};

export default LabPage;
