export interface TechProject {
  id: string;
  title: string;
  subtitle?: string;
  category: TechCategory;
  techStack: string[];
  thumbnail: string;
  description: string;
  technicalDetails?: string;
  architecture?: string;
  challenges?: string[];
  solutions?: string[];
  year: number;
  featured: boolean;
  githubUrl?: string;
  demoUrl?: string;
  documentation?: string;
}

export const TechCategory = {
  LLM_APPLICATION: 'llm-application',
  AGENT_DEVELOPMENT: 'agent-development',
  RAG_SYSTEM: 'rag-system',
  MODEL_FINETUNING: 'model-finetuning',
  ML_INFRASTRUCTURE: 'ml-infrastructure',
  OPEN_SOURCE: 'open-source',
  RESEARCH: 'research'
} as const;

export type TechCategory = typeof TechCategory[keyof typeof TechCategory];

export interface TechExpertInfo {
  name: string;
  title: string;
  specialization: string[];
  bio: string;
  techStack: TechStack;
  social: {
    email: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface TechStack {
  languages: string[];
  frameworks: string[];
  aiTools: string[];
  databases: string[];
  cloud: string[];
}

export interface TechAchievement {
  title: string;
  organization: string;
  year: number;
  description?: string;
  type: 'award' | 'certification' | 'publication' | 'speaking' | 'contribution';
}

export interface TechRecommendation {
  content: string;
  author: string;
  position: string;
  company: string;
  avatar?: string;
  projectContext?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
}

export interface TechEvolution {
  period: string;
  focus: string;
  technologies: string[];
  milestone: string;
}

export interface LearningPath {
  phase: string;
  description: string;
  skills: string[];
  projects?: string[];
}
