import { type TechEvolution, type LearningPath } from '../types';

export const personalInfo = {
  name: 'AI技术专家',
  title: 'AI/LLM应用架构师',
  bio: '专注于大语言模型应用开发、智能Agent系统设计和RAG技术实践。致力于将前沿AI技术转化为实用的解决方案，帮助企业和开发者构建智能化应用。',
  experience: '5+ 年AI/ML开发经验',
  location: '中国',
  email: 'info@caifu.social'
};

export const professionalBackground = {
  summary: '从传统软件开发转型到AI领域，深耕大语言模型应用开发和智能系统架构设计。擅长将复杂的AI技术转化为可落地的产品方案，在LLM应用、Agent开发、RAG系统等领域积累了丰富的实战经验。',
  highlights: [
    '主导多个企业级LLM应用项目，服务用户超过10万+',
    '开源项目累计获得5000+ GitHub Stars',
    '在AI技术社区发表20+篇深度技术文章',
    '为多家企业提供AI技术咨询和架构设计服务'
  ]
};

export const techMethodology = {
  title: '技术方法论',
  principles: [
    {
      name: '实用主义优先',
      description: '技术选型以解决实际问题为导向，避免过度工程化。选择成熟稳定的技术栈，确保系统的可维护性和可扩展性。',
      icon: '🎯'
    },
    {
      name: '快速迭代验证',
      description: '采用MVP方法快速验证想法，通过用户反馈持续优化。重视原型开发和A/B测试，数据驱动决策。',
      icon: '🚀'
    },
    {
      name: '系统化思维',
      description: '从全局视角设计系统架构，考虑性能、安全、成本等多维度因素。注重代码质量和文档完善，便于团队协作。',
      icon: '🏗️'
    },
    {
      name: '持续学习成长',
      description: '保持对新技术的好奇心，定期学习前沿论文和开源项目。通过实践项目深化理解，分享经验回馈社区。',
      icon: '📚'
    }
  ]
};

export const bestPractices = [
  {
    category: 'LLM应用开发',
    practices: [
      'Prompt工程：结构化提示词设计，提高输出质量和稳定性',
      '上下文管理：优化token使用，平衡成本和效果',
      '错误处理：实现重试机制和降级策略，提升系统鲁棒性',
      '评估体系：建立多维度评估指标，持续优化模型表现'
    ]
  },
  {
    category: 'Agent系统设计',
    practices: [
      '任务分解：将复杂任务拆解为可执行的子任务',
      '工具集成：设计灵活的工具调用接口，支持动态扩展',
      '状态管理：实现可靠的状态追踪和恢复机制',
      '安全控制：设置权限边界和执行限制，防止异常行为'
    ]
  },
  {
    category: 'RAG系统优化',
    practices: [
      '文档处理：智能分块策略，保持语义完整性',
      '检索优化：混合检索方法，提高召回率和准确率',
      '重排序：使用Cross-Encoder提升相关性排序',
      '缓存策略：实现多级缓存，降低延迟和成本'
    ]
  }
];

export const techEvolution: TechEvolution[] = [
  {
    period: '2018-2019',
    focus: '传统Web开发',
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
    milestone: '构建多个全栈Web应用，积累工程化经验'
  },
  {
    period: '2020-2021',
    focus: '机器学习入门',
    technologies: ['Python', 'TensorFlow', 'scikit-learn', 'Pandas'],
    milestone: '完成ML基础学习，实现图像分类和NLP项目'
  },
  {
    period: '2022',
    focus: 'NLP深度学习',
    technologies: ['PyTorch', 'Transformers', 'BERT', 'GPT-2'],
    milestone: '深入研究Transformer架构，开发文本生成应用'
  },
  {
    period: '2023',
    focus: 'LLM应用开发',
    technologies: ['GPT-4', 'LangChain', 'Vector DB', 'FastAPI'],
    milestone: '转型LLM应用开发，构建多个商业化产品'
  },
  {
    period: '2024-至今',
    focus: 'AI Agent & RAG',
    technologies: ['AutoGPT', 'LlamaIndex', 'Pinecone', 'Weaviate'],
    milestone: '专注Agent系统和RAG技术，探索AI应用边界'
  }
];

export const learningPath: LearningPath[] = [
  {
    phase: '基础阶段',
    description: '掌握编程基础和Web开发技能',
    skills: ['JavaScript/TypeScript', 'React生态', 'Node.js后端', 'SQL/NoSQL数据库'],
    projects: ['个人博客系统', '电商平台', '实时聊天应用']
  },
  {
    phase: '机器学习阶段',
    description: '学习ML基础理论和经典算法',
    skills: ['Python数据科学栈', '监督/无监督学习', '特征工程', '模型评估'],
    projects: ['房价预测', '情感分析', '推荐系统']
  },
  {
    phase: '深度学习阶段',
    description: '深入神经网络和NLP技术',
    skills: ['PyTorch框架', 'CNN/RNN/Transformer', '迁移学习', '模型优化'],
    projects: ['图像识别', '文本分类', '机器翻译']
  },
  {
    phase: 'LLM应用阶段',
    description: '掌握大模型应用开发技能',
    skills: ['Prompt Engineering', 'LangChain/LlamaIndex', 'Vector Database', 'API集成'],
    projects: ['智能客服', '文档问答', '代码助手']
  },
  {
    phase: '高级应用阶段',
    description: '探索Agent和复杂AI系统',
    skills: ['Agent架构设计', 'RAG优化', '多模态应用', '模型微调'],
    projects: ['自主Agent系统', '企业知识库', '多模态搜索']
  }
];

export const currentFocus = {
  areas: [
    {
      title: 'Agent系统架构',
      description: '研究自主Agent的规划、执行和反思机制，探索多Agent协作模式',
      status: 'active'
    },
    {
      title: 'RAG技术优化',
      description: '优化检索增强生成系统，提升准确率和响应速度',
      status: 'active'
    },
    {
      title: '模型微调实践',
      description: '探索高效微调方法（LoRA、QLoRA），适配特定领域任务',
      status: 'exploring'
    },
    {
      title: '多模态应用',
      description: '结合视觉和语言模型，开发图文理解应用',
      status: 'exploring'
    }
  ]
};

export const achievements = [
  {
    title: 'AI创新应用奖',
    organization: '中国人工智能大会',
    year: 2024,
    description: '基于LLM的智能客服系统获得最佳应用创新奖',
    type: 'award' as const
  },
  {
    title: 'GitHub Star项目',
    organization: 'GitHub',
    year: 2023,
    description: '开源RAG框架获得5000+ stars，被多家企业采用',
    type: 'contribution' as const
  },
  {
    title: 'AI技术峰会演讲',
    organization: 'AI开发者大会',
    year: 2024,
    description: '分享《Agent系统架构设计与实践》主题演讲',
    type: 'speaking' as const
  },
  {
    title: 'LLM应用最佳实践',
    organization: '技术社区',
    year: 2023,
    description: '发表系列技术文章，累计阅读量超过50万',
    type: 'publication' as const
  },
  {
    title: 'AWS机器学习专家',
    organization: 'Amazon Web Services',
    year: 2023,
    description: '获得AWS Machine Learning Specialty认证',
    type: 'certification' as const
  },
  {
    title: '开源社区贡献者',
    organization: 'LangChain/LlamaIndex',
    year: 2023,
    description: '为主流AI框架贡献代码和文档，被社区认可',
    type: 'contribution' as const
  }
];

export const certifications = [
  {
    name: 'AWS Certified Machine Learning - Specialty',
    issuer: 'Amazon Web Services',
    date: '2023年6月',
    credentialId: 'AWS-ML-2023-XXXXX',
    verificationUrl: 'https://aws.amazon.com/verification'
  },
  {
    name: 'Google Cloud Professional ML Engineer',
    issuer: 'Google Cloud',
    date: '2023年3月',
    credentialId: 'GCP-ML-2023-XXXXX',
    verificationUrl: 'https://cloud.google.com/certification'
  },
  {
    name: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI (Coursera)',
    date: '2022年8月',
    credentialId: 'DL-SPEC-2022-XXXXX',
    verificationUrl: 'https://coursera.org/verify'
  },
  {
    name: 'TensorFlow Developer Certificate',
    issuer: 'TensorFlow',
    date: '2022年5月',
    credentialId: 'TF-DEV-2022-XXXXX'
  }
];

export const recommendations = [
  {
    content: '在LLM应用开发方面展现了卓越的技术能力和创新思维。他设计的RAG系统架构优雅且高效，显著提升了我们产品的用户体验。',
    author: '张伟',
    position: 'CTO',
    company: '某AI创业公司',
    projectContext: '企业知识库问答系统'
  },
  {
    content: '对AI技术有深刻理解，能够将复杂的技术概念转化为可落地的解决方案。在Agent系统开发中展现了出色的架构设计能力。',
    author: '李明',
    position: '技术总监',
    company: '某互联网大厂',
    projectContext: '智能营销Agent平台'
  },
  {
    content: '技术功底扎实，代码质量高，文档完善。在开源项目中的贡献帮助我们解决了多个关键技术难题。',
    author: 'Sarah Chen',
    position: 'Senior Engineer',
    company: 'AI Startup',
    projectContext: 'LangChain框架优化'
  },
  {
    content: '在模型微调和Prompt工程方面有独到见解，帮助我们的团队快速掌握了LLM应用开发的最佳实践。',
    author: '王芳',
    position: '产品负责人',
    company: '某教育科技公司',
    projectContext: 'AI教学助手'
  }
];
