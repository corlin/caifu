import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const HomePage: React.FC = () => {
  const techStack = {
    languages: ['Python', 'TypeScript', 'JavaScript'],
    frameworks: ['React', 'FastAPI', 'LangChain'],
    aiTools: ['OpenAI GPT', 'LangChain', 'LlamaIndex', 'Hugging Face'],
    databases: ['PostgreSQL', 'MongoDB', 'Redis', 'Pinecone'],
    cloud: ['AWS', 'Cloudflare', 'Docker'],
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          AI技术专家
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-4">
          专注于LLM应用、Agent开发与RAG系统
        </p>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
          致力于探索和实践前沿AI技术，构建智能化解决方案，
          推动人工智能在实际场景中的应用落地。
        </p>
        
        {/* Social Links */}
        <div className="flex justify-center space-x-4 mb-8">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:contact@example.com"
            className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
        </div>

        <Link
          to="/projects"
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          查看项目
          <ArrowRight className="ml-2" size={20} />
        </Link>
      </section>

      {/* Tech Stack Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          技术栈
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              编程语言
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.languages.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              框架与库
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.frameworks.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              AI工具
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.aiTools.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              数据库
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.databases.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              云服务
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.cloud.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specialization Section */}
      <section className="py-12 bg-gray-50 -mx-4 px-4 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          专业领域
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="font-semibold text-gray-900 mb-2">LLM应用</h3>
            <p className="text-sm text-gray-600">
              大语言模型集成与应用开发
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-900 mb-2">Agent开发</h3>
            <p className="text-sm text-gray-600">
              智能代理系统设计与实现
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="font-semibold text-gray-900 mb-2">RAG系统</h3>
            <p className="text-sm text-gray-600">
              检索增强生成系统构建
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">⚙️</div>
            <h3 className="font-semibold text-gray-900 mb-2">模型微调</h3>
            <p className="text-sm text-gray-600">
              模型优化与定制化训练
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
