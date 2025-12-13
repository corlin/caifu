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
    title: 'lab.experimentsData.exp1.title',
    category: 'research',
    status: 'active',
    description: 'lab.experimentsData.exp1.description',
    technologies: ['Python', 'LangChain', 'AutoGen', 'Redis', 'FastAPI'],
    highlights: [
      'lab.experimentsData.exp1.highlights.0',
      'lab.experimentsData.exp1.highlights.1',
      'lab.experimentsData.exp1.highlights.2',
      'lab.experimentsData.exp1.highlights.3'
    ],
    githubUrl: 'https://github.com/corlin/multi-agent-framework',
    impact: 'lab.experimentsData.exp1.impact'
  },
  {
    id: 'exp-2',
    title: 'lab.experimentsData.exp2.title',
    category: 'open-source',
    status: 'completed',
    description: 'lab.experimentsData.exp2.description',
    technologies: ['Python', 'LlamaIndex', 'Pinecone', 'Streamlit'],
    highlights: [
      'lab.experimentsData.exp2.highlights.0',
      'lab.experimentsData.exp2.highlights.1',
      'lab.experimentsData.exp2.highlights.2',
      'lab.experimentsData.exp2.highlights.3'
    ],
    githubUrl: 'https://github.com/corlin/rag-optimizer',
    demoUrl: 'https://rag-optimizer.demo.com',
    documentation: 'https://docs.rag-optimizer.com',
    startDate: '2024-01',
    impact: 'lab.experimentsData.exp2.impact'
  },
  {
    id: 'exp-3',
    title: 'lab.experimentsData.exp3.title',
    category: 'prototype',
    status: 'active',
    description: 'lab.experimentsData.exp3.description',
    technologies: ['TypeScript', 'React', 'Node.js', 'OpenAI API', 'PostgreSQL'],
    highlights: [
      'lab.experimentsData.exp3.highlights.0',
      'lab.experimentsData.exp3.highlights.1',
      'lab.experimentsData.exp3.highlights.2',
      'lab.experimentsData.exp3.highlights.3'
    ],
    githubUrl: 'https://github.com/corlin/prompt-lab',
    demoUrl: 'https://prompt-lab.demo.com',
    startDate: '2024-03'
  },
  {
    id: 'exp-4',
    title: 'lab.experimentsData.exp4.title',
    category: 'innovation',
    status: 'active',
    description: 'lab.experimentsData.exp4.description',
    technologies: ['Rust', 'HNSW', 'SQLite', 'WebAssembly'],
    highlights: [
      'lab.experimentsData.exp4.highlights.0',
      'lab.experimentsData.exp4.highlights.1',
      'lab.experimentsData.exp4.highlights.2',
      'lab.experimentsData.exp4.highlights.3'
    ],
    githubUrl: 'https://github.com/corlin/mini-vector-db',
    startDate: '2024-02',
    impact: 'lab.experimentsData.exp4.impact'
  },
  {
    id: 'exp-5',
    title: 'lab.experimentsData.exp5.title',
    category: 'open-source',
    status: 'completed',
    description: 'lab.experimentsData.exp5.description',
    technologies: ['Python', 'PyTorch', 'Hugging Face', 'MLflow', 'Docker'],
    highlights: [
      'lab.experimentsData.exp5.highlights.0',
      'lab.experimentsData.exp5.highlights.1',
      'lab.experimentsData.exp5.highlights.2',
      'lab.experimentsData.exp5.highlights.3'
    ],
    githubUrl: 'https://github.com/corlin/llm-finetune-pipeline',
    documentation: 'https://docs.llm-finetune.com',
    startDate: '2023-11',
    impact: 'lab.experimentsData.exp5.impact'
  },
  {
    id: 'exp-6',
    title: 'lab.experimentsData.exp6.title',
    category: 'prototype',
    status: 'active',
    description: 'lab.experimentsData.exp6.description',
    technologies: ['Python', 'GPT-4', 'GitHub API', 'FastAPI'],
    highlights: [
      'lab.experimentsData.exp6.highlights.0',
      'lab.experimentsData.exp6.highlights.1',
      'lab.experimentsData.exp6.highlights.2',
      'lab.experimentsData.exp6.highlights.3'
    ],
    githubUrl: 'https://github.com/corlin/ai-code-reviewer',
    startDate: '2024-04'
  }
];

export const researchAreas = [
  {
    title: 'lab.researchAreasData.multimodal.title',
    description: 'lab.researchAreasData.multimodal.description',
    icon: '🎨'
  },
  {
    title: 'lab.researchAreasData.agentAutonomy.title',
    description: 'lab.researchAreasData.agentAutonomy.description',
    icon: '🧠'
  },
  {
    title: 'lab.researchAreasData.knowledgeGraph.title',
    description: 'lab.researchAreasData.knowledgeGraph.description',
    icon: '🕸️'
  },
  {
    title: 'lab.researchAreasData.edgeAI.title',
    description: 'lab.researchAreasData.edgeAI.description',
    icon: '📱'
  }
];

export const openSourceContributions = [
  {
    project: 'LangChain',
    contributions: 'lab.openSourceData.langchain.contributions',
    url: 'https://github.com/langchain-ai/langchain'
  },
  {
    project: 'LlamaIndex',
    contributions: 'lab.openSourceData.llamaindex.contributions',
    url: 'https://github.com/run-llama/llama_index'
  },
  {
    project: 'Hugging Face Transformers',
    contributions: 'lab.openSourceData.huggingface.contributions',
    url: 'https://github.com/huggingface/transformers'
  }
];
