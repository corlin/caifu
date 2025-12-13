import { type TechEvolution, type LearningPath } from '../types';

// Helper function to get nested values from translations object
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
};

// Personal info now uses translation keys
export const getPersonalInfo = (t: (key: string) => string, _translations: any) => ({
  name: t('about.personalInfo.name'),
  title: t('about.personalInfo.title'),
  bio: t('about.personalInfo.bio'),
  experience: t('about.personalInfo.experience'),
  location: t('about.personalInfo.location'),
  email: t('about.personalInfo.email')
});

export const getProfessionalBackground = (t: (key: string) => string, translations: any) => ({
  summary: t('about.professionalBackgroundData.summary'),
  highlights: getNestedValue(translations, 'about.professionalBackgroundData.highlights') || []
});

export const getTechMethodology = (t: (key: string) => string, translations: any) => ({
  title: t('about.techMethodologyData.title'),
  principles: getNestedValue(translations, 'about.techMethodologyData.principles') || []
});

export const getBestPractices = (_t: (key: string) => string, translations: any) => 
  getNestedValue(translations, 'about.bestPracticesData') || [];

export const getTechEvolution = (_t: (key: string) => string, translations: any): TechEvolution[] => 
  getNestedValue(translations, 'about.techEvolutionData') || [];

export const getLearningPath = (_t: (key: string) => string, translations: any): LearningPath[] => 
  getNestedValue(translations, 'about.learningPathData') || [];

export const getCurrentFocus = (_t: (key: string) => string, translations: any) => 
  getNestedValue(translations, 'about.currentFocusData') || { areas: [] };

export const getAchievements = (_t: (key: string) => string, translations: any) => 
  getNestedValue(translations, 'about.achievementsData') || [];

export const getCertifications = (_t: (key: string) => string, translations: any) => 
  getNestedValue(translations, 'about.certificationsData') || [];

export const getRecommendations = (_t: (key: string) => string, translations: any) => 
  getNestedValue(translations, 'about.recommendationsData') || [];
