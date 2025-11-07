import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  GitBranch,
  Users,
  Star,
  Trophy,
  BookOpen,
  Mic,
  Code2
} from 'lucide-react';
import { type TechAchievement, type TechRecommendation, type Certification } from '../../types';

interface AchievementsProps {
  achievements: TechAchievement[];
  recommendations: TechRecommendation[];
  certifications: Certification[];
}

const Achievements: React.FC<AchievementsProps> = ({
  achievements,
  recommendations,
  certifications
}) => {
  const getAchievementIcon = (type: TechAchievement['type']) => {
    const iconClass = "w-6 h-6";
    switch (type) {
      case 'award':
        return <Trophy className={iconClass} />;
      case 'certification':
        return <Award className={iconClass} />;
      case 'publication':
        return <BookOpen className={iconClass} />;
      case 'speaking':
        return <Mic className={iconClass} />;
      case 'contribution':
        return <GitBranch className={iconClass} />;
      default:
        return <Star className={iconClass} />;
    }
  };

  const getAchievementColor = (type: TechAchievement['type']) => {
    switch (type) {
      case 'award':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'certification':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'publication':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'speaking':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'contribution':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-16">
      {/* Achievements Section */}
      <section>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3"
        >
          <Trophy className="w-8 h-8 text-blue-600" />
          技术成就
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg border ${getAchievementColor(achievement.type)}`}>
                  {getAchievementIcon(achievement.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {achievement.organization} • {achievement.year}
                  </p>
                  {achievement.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3"
        >
          <Award className="w-8 h-8 text-blue-600" />
          专业认证
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {cert.name}
                </h3>
                <Award className="w-5 h-5 text-blue-600 flex-shrink-0" />
              </div>
              <p className="text-sm text-gray-600 mb-2">{cert.issuer}</p>
              <p className="text-sm text-gray-500 mb-3">{cert.date}</p>
              {cert.credentialId && (
                <p className="text-xs text-gray-500 mb-2">
                  证书编号: {cert.credentialId}
                </p>
              )}
              {cert.verificationUrl && (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  验证证书
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open Source Contributions */}
      <section>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3"
        >
          <Code2 className="w-8 h-8 text-blue-600" />
          开源贡献
        </motion.h2>
        
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-xl border border-gray-200">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
              <div className="text-gray-600">GitHub Stars</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
              <div className="text-gray-600">开源项目</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">PR贡献</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">主要贡献项目</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: 'LangChain', contribution: 'RAG优化和文档改进', stars: '2.1k' },
                { name: 'LlamaIndex', contribution: '检索算法优化', stars: '1.5k' },
                { name: 'AutoGPT', contribution: 'Agent工具集成', stars: '800' },
                { name: 'Transformers', contribution: 'Bug修复和示例代码', stars: '600' }
              ].map((project, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{project.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {project.stars}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{project.contribution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3"
        >
          <Users className="w-8 h-8 text-blue-600" />
          技术推荐
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                {rec.avatar ? (
                  <img
                    src={rec.avatar}
                    alt={rec.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{rec.author}</h3>
                  <p className="text-sm text-gray-600">
                    {rec.position} @ {rec.company}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-3 italic">
                "{rec.content}"
              </p>
              
              {rec.projectContext && (
                <p className="text-sm text-gray-500">
                  项目背景: {rec.projectContext}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Influence */}
      <section>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3"
        >
          <Star className="w-8 h-8 text-blue-600" />
          技术影响力
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">技术社区</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className="text-gray-700">GitHub 5000+ followers</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className="text-gray-700">技术博客月均10万+阅读</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className="text-gray-700">Stack Overflow 贡献者</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className="text-gray-700">AI技术社区活跃成员</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">演讲与分享</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className="text-gray-700">AI技术大会演讲嘉宾</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className="text-gray-700">企业内训讲师</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className="text-gray-700">技术播客嘉宾</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className="text-gray-700">在线课程讲师</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Achievements;
