import type { TechProject } from '../types';
import { TechCategory } from '../types';

export const projects: TechProject[] = [
  {
    id: 'llm-chatbot',
    title: 'AI客服助手',
    subtitle: '基于GPT-4的智能客服系统',
    category: TechCategory.LLM_APPLICATION,
    techStack: ['GPT-4', 'LangChain', 'React', 'FastAPI', 'PostgreSQL'],
    thumbnail: '/projects/llm-chatbot.jpg',
    description: '企业级智能客服系统，支持多轮对话、上下文理解和情感分析，显著提升客户服务效率。',
    technicalDetails: '采用LangChain框架构建对话流程，集成GPT-4实现自然语言理解，使用PostgreSQL存储对话历史和用户画像。',
    architecture: '前后端分离架构，React前端 + FastAPI后端 + PostgreSQL数据库 + Redis缓存',
    challenges: [
      '多轮对话的上下文管理和记忆保持',
      '高并发场景下的响应速度优化',
      '敏感信息的安全处理和隐私保护'
    ],
    solutions: [
      '实现基于向量数据库的对话历史检索机制',
      '采用流式响应和异步处理提升用户体验',
      '建立完善的数据脱敏和权限控制体系'
    ],
    year: 2024,
    featured: true,
    githubUrl: 'https://github.com/example/llm-chatbot',
    demoUrl: 'https://demo.example.com/chatbot',
    documentation: 'https://docs.example.com/chatbot'
  },
  {
    id: 'autonomous-agent',
    title: '自主任务Agent',
    subtitle: '多工具调用的智能代理系统',
    category: TechCategory.AGENT_DEVELOPMENT,
    techStack: ['LangGraph', 'OpenAI', 'Python', 'Redis', 'Docker'],
    thumbnail: '/projects/autonomous-agent.jpg',
    description: '能够自主规划和执行复杂任务的AI Agent，支持工具调用、记忆管理和错误恢复机制。',
    technicalDetails: '基于LangGraph构建状态机驱动的Agent系统，支持动态工具注册和调用，实现任务分解和执行。',
    architecture: 'Agent核心引擎 + 工具库 + 记忆系统 + 任务调度器',
    challenges: [
      '复杂任务的自动分解和规划',
      '工具调用失败时的错误恢复',
      '长期记忆的有效管理和检索'
    ],
    solutions: [
      '实现基于ReAct模式的推理和行动循环',
      '设计多层次的错误处理和重试机制',
      '采用向量数据库存储和检索历史经验'
    ],
    year: 2024,
    featured: true,
    githubUrl: 'https://github.com/example/autonomous-agent',
    demoUrl: 'https://demo.example.com/agent'
  },
  {
    id: 'rag-knowledge-base',
    title: '企业知识库RAG系统',
    subtitle: '向量检索增强生成系统',
    category: TechCategory.RAG_SYSTEM,
    techStack: ['LlamaIndex', 'Pinecone', 'OpenAI Embeddings', 'Next.js', 'TypeScript'],
    thumbnail: '/projects/rag-system.jpg',
    description: '基于RAG架构的企业知识库问答系统，支持多文档类型、语义检索和答案溯源。',
    technicalDetails: '使用LlamaIndex构建文档索引和检索管道，Pinecone提供高性能向量存储，支持PDF、Word、Markdown等多种文档格式。',
    architecture: '文档处理层 + 向量索引层 + 检索层 + 生成层 + Web界面',
    challenges: [
      '大规模文档的高效索引和检索',
      '答案准确性和相关性的保证',
      '多文档类型的统一处理'
    ],
    solutions: [
      '实现分块策略和元数据过滤优化检索',
      '采用混合检索（向量+关键词）提升准确性',
      '构建统一的文档解析和预处理管道'
    ],
    year: 2023,
    featured: true,
    githubUrl: 'https://github.com/example/rag-knowledge-base',
    documentation: 'https://docs.example.com/rag'
  },
  {
    id: 'model-finetuning',
    title: 'LLM领域微调平台',
    subtitle: '低代码模型微调工具',
    category: TechCategory.MODEL_FINETUNING,
    techStack: ['PyTorch', 'Hugging Face', 'LoRA', 'Weights & Biases', 'Kubernetes'],
    thumbnail: '/projects/finetuning.jpg',
    description: '简化LLM微调流程的平台，支持LoRA、QLoRA等高效微调方法，提供可视化训练监控。',
    year: 2023,
    featured: false,
    githubUrl: 'https://github.com/example/finetuning-platform'
  },
  {
    id: 'ml-pipeline',
    title: 'MLOps自动化流水线',
    subtitle: '端到端机器学习工作流',
    category: TechCategory.ML_INFRASTRUCTURE,
    techStack: ['Kubeflow', 'MLflow', 'Airflow', 'TensorFlow', 'AWS'],
    thumbnail: '/projects/ml-pipeline.jpg',
    description: '完整的MLOps解决方案，涵盖数据处理、模型训练、评估、部署和监控的全生命周期。',
    year: 2023,
    featured: false,
    githubUrl: 'https://github.com/example/ml-pipeline',
    documentation: 'https://docs.example.com/mlops'
  }
];

export const getFeaturedProjects = (): TechProject[] => {
  return projects.filter(project => project.featured);
};

export const getProjectsByCategory = (category: TechCategory): TechProject[] => {
  return projects.filter(project => project.category === category);
};

export const getProjectById = (id: string): TechProject | undefined => {
  return projects.find(project => project.id === id);
};
