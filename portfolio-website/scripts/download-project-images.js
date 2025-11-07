/**
 * 下载项目背景图片脚本
 * 使用 Unsplash API 获取免费高质量图片
 * 
 * 使用方法：
 * 1. 注册 Unsplash 开发者账号：https://unsplash.com/developers
 * 2. 获取 Access Key
 * 3. 设置环境变量：export UNSPLASH_ACCESS_KEY=your_key
 * 4. 运行：node scripts/download-project-images.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Unsplash API 配置
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || '';
const OUTPUT_DIR = path.join(__dirname, '../public/projects');

// 项目图片配置
const projectImages = [
  {
    filename: 'llm-chatbot.jpg',
    query: 'artificial intelligence chatbot',
    description: 'AI客服助手背景图'
  },
  {
    filename: 'autonomous-agent.jpg',
    query: 'robot automation technology',
    description: '自主任务Agent背景图'
  },
  {
    filename: 'rag-system.jpg',
    query: 'knowledge base library books',
    description: '企业知识库RAG系统背景图'
  },
  {
    filename: 'finetuning.jpg',
    query: 'machine learning neural network',
    description: 'LLM领域微调平台背景图'
  },
  {
    filename: 'ml-pipeline.jpg',
    query: 'data pipeline infrastructure',
    description: 'MLOps自动化流水线背景图'
  }
];

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 从 Unsplash 下载图片
async function downloadImage(config) {
  if (!UNSPLASH_ACCESS_KEY) {
    console.error('❌ 请设置 UNSPLASH_ACCESS_KEY 环境变量');
    console.log('📝 获取方法：https://unsplash.com/developers');
    return;
  }

  const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(config.query)}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`;

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.urls && json.urls.regular) {
            downloadFile(json.urls.regular, config.filename)
              .then(() => {
                console.log(`✅ ${config.description} - ${config.filename}`);
                resolve();
              })
              .catch(reject);
          } else {
            reject(new Error('无法获取图片URL'));
          }
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

// 下载文件
function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(OUTPUT_DIR, filename);
    const file = fs.createWriteStream(filepath);

    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// 主函数
async function main() {
  console.log('🚀 开始下载项目背景图片...\n');

  for (const config of projectImages) {
    try {
      await downloadImage(config);
      // 添加延迟避免 API 限流
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      console.error(`❌ 下载失败 ${config.filename}:`, err.message);
    }
  }

  console.log('\n✨ 完成！');
}

main();
