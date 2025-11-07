export interface LabExperiment {
  id: string;
  title: string;
  category: 'research' | 'prototype' | 'open-source' | 'innovation';
  status: 'active' | 'completed' | 'archived';
  description: string;
  technologies: string[];
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
  documentation?: string;
  startDate?: string;
  impact?: string;
}

export const labExperiments: LabExperiment[] = [
  {
    id: 'exp-1',
    title: 'Multi-Agent协作框架',
    category: 'research',
    status: 'active',
    description: '探索多智能体系统中的协作机制，实现Agent之间的高效通信和任务分配。基于LangChain和AutoGen构建，支持动态角色分配和任务编排。',
    technologies: ['Python', 'LangChain', 'AutoGen', 'Redis', 'FastAPI'],
    highlights: [
      '支持10+种Agent角色动态组合',
      '实现分布式任务调度算法',
      '提供可视化协作流程监控',
      '降低30%的任务完成时间'
    ],
    githubUrl: 'https://github.com/corlin/multi-agent-framework',
    impact: '已被3个生产项目采用'
  },
  {
    id: 'exp-2',
    title: 'RAG性能优化工具包',
    category: 'open-source',
    status: 'completed',
    description: '开源的RAG系统性能优化工具集，包含向量检索优化、Chunk策略分析、召回率评估等功能。帮助开发者快速诊断和优化RAG系统性能。',
    technologies: ['Python', 'LlamaIndex', 'Pinecone', 'Streamlit'],
    highlights: [
      '提供5种Chunk策略对比分析',
      '支持多种向量数据库性能测试',
      '可视化召回率和准确率指标',
      '集成A/B测试框架'
    ],
    githubUrl: 'https://github.com/corlin/rag-optimizer',
    demoUrl: 'https://rag-optimizer.demo.com',
    documentation: 'https://docs.rag-optimizer.com',
    startDate: '2024-01',
    impact: '获得500+ GitHub Stars'
  },
  {
    id: 'exp-3',
    title: 'Prompt工程实验平台',
    category: 'prototype',
    status: 'active',
    description: '用于Prompt设计、测试和优化的实验平台。支持多模型对比、版本管理、A/B测试，帮助团队系统化地优化Prompt效果。',
    technologies: ['TypeScript', 'React', 'Node.js', 'OpenAI API', 'PostgreSQL'],
    highlights: [
      '支持GPT-4、Claude、Gemini等多模型',
      '内置Prompt模板库和最佳实践',
      '实时性能和成本分析',
      '团队协作和版本控制'
    ],
    githubUrl: 'https://github.com/corlin/prompt-lab',
    demoUrl: 'https://prompt-lab.demo.com',
    startDate: '2024-03'
  },
  {
    id: 'exp-4',
    title: '轻量级向量数据库',
    category: 'innovation',
    status: 'active',
    description: '专为边缘设备和小规模应用设计的向量数据库，支持本地部署，无需外部依赖。采用创新的索引算法，在保持高性能的同时大幅降低内存占用。',
    technologies: ['Rust', 'HNSW', 'SQLite', 'WebAssembly'],
    highlights: [
      '内存占用降低70%',
      '支持WASM在浏览器中运行',
      '毫秒级查询响应',
      '完全离线可用'
    ],
    githubUrl: 'https://github.com/corlin/mini-vector-db',
    startDate: '2024-02',
    impact: '适用于隐私敏感场景'
  },
  {
    id: 'exp-5',
    title: 'LLM微调自动化流水线',
    category: 'open-source',
    status: 'completed',
    description: '端到端的模型微调自动化工具，从数据准备、训练、评估到部署的完整流程。支持LoRA、QLoRA等高效微调方法，集成MLOps最佳实践。',
    technologies: ['Python', 'PyTorch', 'Hugging Face', 'MLflow', 'Docker'],
    highlights: [
      '一键式微调流程配置',
      '支持分布式训练',
      '自动超参数优化',
      '集成模型版本管理'
    ],
    githubUrl: 'https://github.com/corlin/llm-finetune-pipeline',
    documentation: 'https://docs.llm-finetune.com',
    startDate: '2023-11',
    impact: '帮助团队节省60%微调时间'
  },
  {
    id: 'exp-6',
    title: 'AI代码审查助手',
    category: 'prototype',
    status: 'active',
    description: '基于LLM的智能代码审查工具，自动检测代码质量问题、安全漏洞和性能瓶颈。支持多种编程语言，可集成到CI/CD流程。',
    technologies: ['Python', 'GPT-4', 'GitHub API', 'FastAPI'],
    highlights: [
      '识别10+类代码问题',
      '提供具体修改建议',
      '学习团队代码风格',
      '支持自定义规则'
    ],
    githubUrl: 'https://github.com/corlin/ai-code-reviewer',
    startDate: '2024-04'
  }
];

export const researchAreas = [
  {
    title: '多模态AI',
    description: '探索文本、图像、音频的融合处理',
    icon: '🎨'
  },
  {
    title: 'Agent自主性',
    description: '提升AI Agent的决策和学习能力',
    icon: '🧠'
  },
  {
    title: '知识图谱',
    description: '结合符号推理与神经网络',
    icon: '🕸️'
  },
  {
    title: '边缘AI',
    description: '在资源受限环境中部署AI',
    icon: '📱'
  }
];

export const openSourceContributions = [
  {
    project: 'LangChain',
    contributions: '贡献了3个核心功能和15+个bug修复',
    url: 'https://github.com/langchain-ai/langchain'
  },
  {
    project: 'LlamaIndex',
    contributions: '优化了向量检索性能，提升20%效率',
    url: 'https://github.com/run-llama/llama_index'
  },
  {
    project: 'Hugging Face Transformers',
    contributions: '添加了新的模型支持和文档改进',
    url: 'https://github.com/huggingface/transformers'
  }
];
